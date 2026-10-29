import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdminActor, wipeSimulatedPledges } from "@/lib/payment/simulate-checkout";

export async function DELETE() {
  const session = await auth();
  if (!session?.user || !isAdminActor(session.user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const result = await wipeSimulatedPledges();
  return NextResponse.json({
    success: true,
    removed: result.removed,
    total: result.total,
    message: result.total
      ? `Đã gỡ ${result.removed} đơn giả lập khỏi số huy động và danh sách người ủng hộ.`
      : "Không có đơn giả lập.",
  });
}
