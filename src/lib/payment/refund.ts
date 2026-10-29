import { Decimal } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";
import { revokeDigitalWarehouseItem } from "@/lib/digital-warehouse";
import { recalculateCampaignAmount } from "@/lib/order-fulfillment";
import { notificationService } from "@/services/pg/notification.service";
import { cleanEvidence, saveRefundEvidence, type RefundEvidence } from "@/lib/payment/refund-evidence";

import {
  canCompleteRefund,
  canRequestRefund,
  canReviewRefund,
  canSimulateRefund,
  isSimulatedPledge,
  refundStatusLabel,
} from "@/lib/payment/refund-rules";

export {
  canCompleteRefund,
  canRequestRefund,
  canReviewRefund,
  canSimulateRefund,
  isSimulatedPledge,
  refundStatusLabel,
};

function money(value: unknown) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}

export async function refundPledgeLedger(pledgeId: string, reason: string) {
  const now = new Date();
  const claimed = await prisma.$transaction(async (tx) => {
    const pledge = await tx.pledges.findUnique({
      where: { id: pledgeId },
      select: {
        id: true,
        campaignId: true,
        userId: true,
        membershipId: true,
        rewardId: true,
        quantity: true,
        amount: true,
        accountingAmount: true,
        status: true,
        refundStatus: true,
        stockReserved: true,
        cancellationReason: true,
        transactionId: true,
      },
    });
    if (!pledge || !canCompleteRefund(pledge)) return null;
    const refundAmount = money(pledge.accountingAmount) || money(pledge.amount);
    const updated = await tx.pledges.updateMany({
      where: {
        id: pledge.id,
        status: "SUCCESS",
        refundStatus: { notIn: ["COMPLETED", "PROCESSING"] },
        stockReserved: pledge.stockReserved,
      },
      data: {
        refundStatus: "COMPLETED",
        refundedAt: now,
        refundAmount: new Decimal(refundAmount),
        status: "REFUNDED",
        stockReserved: false,
        accountingReversedAt: now,
        fulfillmentStatus: pledge.rewardId ? "CANCELED" : "NOT_APPLICABLE",
        cancellationReason: pledge.cancellationReason || reason,
        updatedAt: now,
      },
    });
    if (updated.count !== 1) return null;
    if (pledge.stockReserved && pledge.rewardId) {
      await tx.rewards.update({
        where: { id: pledge.rewardId },
        data: { stock: { increment: pledge.quantity }, updatedAt: now },
      });
    }
    if (pledge.membershipId) {
      await tx.memberships.updateMany({
        where: { id: pledge.membershipId },
        data: {
          status: "CANCELED",
          canceledAt: now,
          updatedAt: now,
        },
      });
    }
    await tx.donation_certificates.deleteMany({ where: { pledgeId: pledge.id } });
    if (pledge.campaignId) await recalculateCampaignAmount(tx, pledge.campaignId);
    return { ...pledge, refundAmount };
  });
  if (!claimed) return false;
  await revokeDigitalWarehouseItem(claimed.id);
  if (claimed.userId) {
    notificationService.send({
      userId: claimed.userId,
      type: "REFUND_PROCESSED",
      title: "Đã hoàn tiền",
      message: reason,
      payload: { pledgeId: claimed.id, amount: claimed.refundAmount, href: `/don-hang/${claimed.id}` },
    });
  }
  return true;
}

async function closePendingPledges(campaignId: string, reason: string) {
  const now = new Date();
  const pending = await prisma.pledges.findMany({
    where: { campaignId, status: "PENDING" },
    select: { id: true, rewardId: true, quantity: true, stockReserved: true },
  });
  for (const pledge of pending) {
    await prisma.$transaction(async (tx) => {
      const updated = await tx.pledges.updateMany({
        where: { id: pledge.id, status: "PENDING" },
        data: {
          status: "FAILED",
          stockReserved: false,
          fulfillmentStatus: pledge.rewardId ? "CANCELED" : "NOT_APPLICABLE",
          cancellationReason: reason,
          updatedAt: now,
        },
      });
      if (updated.count !== 1) return;
      if (pledge.stockReserved && pledge.rewardId) {
        await tx.rewards.update({
          where: { id: pledge.rewardId },
          data: { stock: { increment: pledge.quantity }, updatedAt: now },
        });
      }
    });
  }
}

export async function requestRefund(pledgeId: string, reason: string, evidence: RefundEvidence[] = []) {
  const note = reason.trim().slice(0, 240);
  if (note.length < 8) return { ok: false as const, error: "Lý do hoàn tiền cần ít nhất 8 ký tự." };
  const files = cleanEvidence(evidence);
  if (files.length === 0) return { ok: false as const, error: "Hãy gửi ít nhất một ảnh hoặc video của hàng." };
  const pledge = await prisma.pledges.findUnique({
    where: { id: pledgeId },
    select: { id: true, status: true, refundStatus: true, userId: true, campaignId: true },
  });
  if (!pledge || !canRequestRefund(pledge)) {
    return { ok: false as const, error: "Đơn này không gửi yêu cầu hoàn tiền được." };
  }
  await prisma.pledges.update({
    where: { id: pledge.id },
    data: {
      refundStatus: "REQUESTED",
      cancellationReason: `Yêu cầu hoàn tiền: ${note}`,
      updatedAt: new Date(),
    },
  });
  await saveRefundEvidence(pledge.id, files);
  return { ok: true as const, status: "REQUESTED" as const };
}

export async function rejectRefund(pledgeId: string, note: string) {
  const reason = note.trim().slice(0, 240) || "Admin từ chối yêu cầu hoàn tiền";
  const pledge = await prisma.pledges.findUnique({
    where: { id: pledgeId },
    select: { id: true, status: true, refundStatus: true, userId: true },
  });
  if (!pledge || !canReviewRefund(pledge)) {
    return { ok: false as const, error: "Không có yêu cầu hoàn tiền để từ chối." };
  }
  await prisma.pledges.update({
    where: { id: pledge.id },
    data: {
      refundStatus: "NO_REFUND",
      cancellationReason: `Từ chối hoàn tiền: ${reason}`,
      updatedAt: new Date(),
    },
  });
  if (pledge.userId) {
    notificationService.send({
      userId: pledge.userId,
      type: "REFUND_PROCESSED",
      title: "Yêu cầu hoàn tiền bị từ chối",
      message: reason,
      payload: { pledgeId: pledge.id, href: `/don-hang/${pledge.id}` },
    });
  }
  return { ok: true as const, status: "NO_REFUND" as const };
}

export async function completeRefund(pledgeId: string, reason: string) {
  const note = reason.trim().slice(0, 240) || "Admin hoàn sổ";
  const ok = await refundPledgeLedger(pledgeId, note);
  if (!ok) return { ok: false as const, error: "Không hoàn được đơn này. Có thể đơn chưa thanh toán hoặc đã hoàn." };
  return { ok: true as const, status: "COMPLETED" as const, simulated: false as const };
}

export async function simulateRefund(
  pledgeId: string,
  reason: string,
  simulationOn: boolean,
  evidence: RefundEvidence[] = [],
) {
  const pledge = await prisma.pledges.findUnique({
    where: { id: pledgeId },
    select: { id: true, status: true, refundStatus: true, transactionId: true },
  });
  if (!pledge || !canSimulateRefund(pledge, simulationOn)) {
    return { ok: false as const, error: "Chỉ giả lập hoàn tiền khi bật chế độ giả lập, hoặc với đơn SIM- chưa hoàn." };
  }
  const files = cleanEvidence(evidence);
  if (files.length) await saveRefundEvidence(pledgeId, files);
  const note = `Giả lập hoàn tiền${reason.trim() ? `: ${reason.trim().slice(0, 200)}` : ""}`;
  const ok = await refundPledgeLedger(pledgeId, note);
  if (!ok) return { ok: false as const, error: "Không giả lập hoàn tiền được." };
  return { ok: true as const, status: "COMPLETED" as const, simulated: true as const };
}

export async function processCampaignRefund(campaignId: string) {
  try {
    const campaign = await prisma.campaigns.findUnique({ where: { id: campaignId } });
    if (!campaign) throw new Error("Campaign không tồn tại");
    if (campaign.status !== "FAILED" && campaign.status !== "CANCELED") {
      throw new Error("Dự án chưa ở trạng thái có thể hoàn tiền (phải là FAILED hoặc CANCELED)");
    }

    await closePendingPledges(campaignId, "Chiến dịch đã hủy, phiên chờ thanh toán được đóng");

    const pledges = await prisma.pledges.findMany({
      where: { campaignId, status: "SUCCESS", refundStatus: { in: ["NO_REFUND", "REQUESTED", "FAILED"] } },
    });

    if (pledges.length === 0) {
      await prisma.$transaction((tx) => recalculateCampaignAmount(tx, campaignId));
      return {
        success: true,
        refundedCount: 0,
        total: 0,
        note: "Sổ sách. Chi hoàn ngân hàng làm tay vì chưa có NH trung gian.",
      };
    }

    let refundedCount = 0;
    for (const pledge of pledges) {
      try {
        const ok = await refundPledgeLedger(pledge.id, "Hoàn sổ khi chiến dịch thất bại/hủy");
        if (ok) refundedCount++;
      } catch (err) {
        console.error(`[REFUND_ERROR] Lỗi khi hoàn tiền giao dịch ${pledge.transactionId}`, err);
        await prisma.pledges.update({ where: { id: pledge.id }, data: { refundStatus: "FAILED" } });
      }
    }

    await prisma.$transaction((tx) => recalculateCampaignAmount(tx, campaignId));

    return {
      success: true,
      refundedCount,
      total: pledges.length,
      note: "Sổ sách. Chi hoàn ngân hàng làm tay vì chưa có NH trung gian.",
    };
  } catch (error) {
    console.error("[REFUND_PROCESS_ERROR]", error);
    throw error;
  }
}

export const processRefund = processCampaignRefund;
