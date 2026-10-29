import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdminActor } from "@/lib/payment/simulate-checkout";
import { advanceSimulatedShipment, type SimulateShipmentOptions } from "@/lib/payment/simulate-shipping";

export async function POST(request: Request, context: { params: Promise<{ pledgeId: string }> }) {
  const session = await auth();
  if (!session?.user || !isAdminActor(session.user)) {
    return NextResponse.json({ error: "Chỉ admin mới có quyền thực hiện giả lập bưu cục/vận chuyển" }, { status: 403 });
  }

  const { pledgeId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as SimulateShipmentOptions;

  const result = await advanceSimulatedShipment(pledgeId, body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    status: result.status,
    trackingNumber: result.trackingNumber,
    carrier: result.carrier,
    message: result.message,
  });
}
