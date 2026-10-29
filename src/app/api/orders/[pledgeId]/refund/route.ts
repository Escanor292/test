import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { isAdminActor } from "@/lib/payment/simulate-checkout";
import { isSimulationMode } from "@/lib/platform-settings";
import { cleanEvidence } from "@/lib/payment/refund-evidence";
import { completeRefund, rejectRefund, requestRefund, simulateRefund } from "@/lib/payment/refund";

type RefundAction = "request" | "approve" | "reject" | "complete" | "simulate";

export async function POST(request: Request, context: { params: Promise<{ pledgeId: string }> }) {
  const session = await auth();
  const user = session?.user as { id?: string; role?: string; isAdmin?: boolean } | undefined;
  if (!user?.id) return NextResponse.json({ error: "Cần đăng nhập." }, { status: 401 });

  const { pledgeId } = await context.params;
  const body = await request.json().catch(() => ({}));
  const action = String(body.action || "") as RefundAction;
  const reason = String(body.reason || "");
  const evidence = cleanEvidence(body.evidence);
  const admin = isAdminActor(user);

  const pledge = await prisma.pledges.findUnique({
    where: { id: pledgeId },
    select: { id: true, userId: true },
  });
  if (!pledge) return NextResponse.json({ error: "Không thấy đơn." }, { status: 404 });
  if (!admin && pledge.userId !== user.id) {
    return NextResponse.json({ error: "Không có quyền với đơn này." }, { status: 403 });
  }

  if (action === "request") {
    const result = await requestRefund(pledgeId, reason, evidence);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({
      success: true,
      status: result.status,
      message: "Đã nhận được yêu cầu hoàn tiền. Tiền sẽ về tài khoản trong 1–2 ngày làm việc sau khi được duyệt.",
    });
  }

  if (!admin) return NextResponse.json({ error: "Chỉ admin xử lý hoàn tiền." }, { status: 403 });

  if (action === "reject") {
    const result = await rejectRefund(pledgeId, reason);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ success: true, status: result.status, message: "Đã từ chối yêu cầu hoàn tiền." });
  }

  if (action === "approve" || action === "complete") {
    const result = await completeRefund(pledgeId, reason || (action === "approve" ? "Admin duyệt hoàn tiền" : "Admin hoàn sổ"));
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({
      success: true,
      status: result.status,
      message: "Đã nhận được yêu cầu hoàn tiền. Tiền hoàn sẽ về tài khoản trong 1–2 ngày tới.",
    });
  }

  if (action === "simulate") {
    const result = await simulateRefund(pledgeId, reason, await isSimulationMode(), evidence);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({
      success: true,
      status: result.status,
      simulated: true,
      message: "Đã hoàn tiền ngay. Tiền sẽ về tài khoản trong 1–2 ngày tới.",
    });
  }

  return NextResponse.json({ error: "Hành động hoàn tiền không hợp lệ." }, { status: 400 });
}
