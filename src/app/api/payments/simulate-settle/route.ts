import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdminActor, simulatePaidPledges, simulationApplies } from "@/lib/payment/simulate-checkout";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || !isAdminActor(session.user)) {
    return NextResponse.json({ error: "Chỉ admin được xác nhận thanh toán giả lập" }, { status: 403 });
  }
  if (!await simulationApplies(session.user)) {
    return NextResponse.json({ error: "Hãy bật giả lập trong quản trị" }, { status: 403 });
  }
  const body = await request.json().catch(() => null);
  const pledgeId = typeof body?.pledgeId === "string" ? body.pledgeId.trim() : "";
  if (!pledgeId) return NextResponse.json({ error: "Thiếu đơn" }, { status: 400 });

  const pledge = await prisma.pledges.findUnique({
    where: { id: pledgeId },
    select: { id: true, status: true, transactionId: true },
  });
  if (!pledge) return NextResponse.json({ error: "Không tìm thấy đơn" }, { status: 404 });

  // Bản local chưa có khái niệm giỏ hàng (checkoutGroupId) nên chỉ giả lập từng đơn.
  const pending = pledge.status === "PENDING" ? [{ id: pledge.id }] : [];

  if (!pending.length) {
    return NextResponse.json({
      ok: true,
      alreadyPaid: true,
      confirmationUrl: `/payment-success?status=success&ref=${encodeURIComponent(pledge.transactionId)}`,
    });
  }

  const sim = await simulatePaidPledges(pending.map((row) => row.id), session.user.id || null);
  if (!sim.ok) return NextResponse.json({ error: "Không ghi nhận được thanh toán giả lập" }, { status: 409 });
  return NextResponse.json({ ok: true, confirmationUrl: sim.confirmationUrl });
}
