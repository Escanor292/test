import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "@/lib/prisma";
import { isSimulationMode } from "@/lib/platform-settings";
import { recalculateCampaignAmount } from "@/lib/order-fulfillment";
import { refundPledgeLedger } from "@/lib/payment/refund";
import { settlePledgeAsPaid } from "@/lib/payment/settle-pledge";

export function isAdminActor(user: unknown) {
  const actor = user as { role?: string; isAdmin?: boolean } | null | undefined;
  return actor?.role === "ADMIN" || actor?.isAdmin === true;
}

export async function simulationApplies(user: unknown) {
  if (!isAdminActor(user)) return false;
  return isSimulationMode();
}

async function countSimulated(ids: string[]) {
  const rows = await prisma.pledges.findMany({ where: { id: { in: ids }, status: "SUCCESS" } });
  const campaigns = new Set<string>();
  await prisma.$transaction(async (tx) => {
    for (const row of rows) {
      if (Number(row.accountingAmount) <= 0 && Number(row.amount) > 0) {
        await tx.pledges.update({
          where: { id: row.id },
          data: {
            accountingAmount: new Decimal(Number(row.amount)),
            paidAmount: new Decimal(Number(row.chargeAmount || row.amount)),
            receivedAt: row.receivedAt ?? new Date(),
            updatedAt: new Date(),
          },
        });
      }
      if (row.campaignId) campaigns.add(row.campaignId);
    }
    for (const campaignId of [...campaigns].sort()) {
      await recalculateCampaignAmount(tx, campaignId);
    }
  });
}

/**
 * Ghi nhận thanh toán giả lập cho từng pledge bằng settlePledgeAsPaid.
 * Mỗi pledge nhận transactionId riêng dạng SIM-<pledgeId> để có thể dọn sạch sau này.
 */
export async function simulatePaidPledges(ids: string[], userId: string | null) {
  const ordered = [...new Set(ids)].filter(Boolean);
  if (!ordered.length) return { ok: false as const, transactionIds: [] as string[], confirmationUrl: "" };

  const transactionIds: string[] = [];
  for (const pledgeId of ordered) {
    const transactionId = `SIM-${pledgeId}`;
    const settled = await settlePledgeAsPaid(pledgeId, {
      transactionId,
      reason: "Giả lập thanh toán",
      userId,
    });
    if (!settled.ok) return { ok: false as const, transactionIds: [] as string[], confirmationUrl: "" };
    transactionIds.push(transactionId);
  }

  await countSimulated(ordered);
  const rows = await prisma.pledges.findMany({
    where: { id: { in: ordered } },
    select: { id: true, transactionId: true, fulfillmentType: true },
  });
  const physical = rows.find((row) => row.fulfillmentType === "PHYSICAL");
  const transactionId = rows[0]?.transactionId || transactionIds[0];
  const confirmationUrl = physical
    ? `/don-hang/${physical.id}`
    : `/payment-success?status=success&ref=${encodeURIComponent(transactionId)}`;
  return { ok: true as const, transactionIds: rows.map((row) => row.transactionId), confirmationUrl };
}

export function simulatedPayload(transactionId: string, extra: Record<string, unknown> = {}) {
  return {
    simulated: true,
    status: "SUCCESS",
    paymentProvider: "SIMULATION",
    message: "Giả lập đã ghi nhận thanh toán. Đơn được cộng vào số huy động và hiện trong danh sách người ủng hộ.",
    confirmationUrl: `/payment-success?status=success&ref=${encodeURIComponent(transactionId)}`,
    ...extra,
  };
}

export async function wipeSimulatedPledges() {
  const rows = await prisma.pledges.findMany({
    where: {
      OR: [
        { transactionId: { startsWith: "SIM-" } },
        { transactionId: { startsWith: "SIM:" } },
      ],
    },
    select: { id: true, status: true, membershipId: true },
  });
  let removed = 0;
  for (const row of rows) {
    if (row.status === "SUCCESS") {
      const ok = await refundPledgeLedger(row.id, "Xóa dữ liệu giả lập");
      if (ok) removed += 1;
    }
    if (row.membershipId) {
      // Schema hiện tại chỉ có ACTIVE / PAST_DUE / CANCELED, nên membership
      // gắn với đơn giả lập bị huỷ thay vì chuyển sang EXPIRED.
      await prisma.memberships.updateMany({
        where: { id: row.membershipId },
        data: {
          status: "CANCELED",
          canceledAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
  }
  if (rows.length) {
    await prisma.donation_certificates.deleteMany({ where: { pledgeId: { in: rows.map((row) => row.id) } } });
  }
  return { removed, total: rows.length };
}
