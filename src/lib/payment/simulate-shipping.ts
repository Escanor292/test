import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "@/lib/prisma";
import { createBackerInvoice } from "@/lib/invoice-generator";
import { onPledgeSuccess } from "@/lib/tax/on-pledge-success";
import { isSimulationMode } from "@/lib/platform-settings";

function isSimulatedPledge(transactionId: string) {
  return transactionId.startsWith("SIM-") || transactionId.startsWith("SIM:");
}

export function generateCarrierTrackingNumber(carrier = "GHTK"): string {
  const c = carrier.toLowerCase();
  const randNum = Math.floor(100000 + Math.random() * 900000);
  if (c.includes("viettel")) return `VTP${randNum}VN`;
  if (c.includes("nhanh") || c.includes("ghn")) return `GHN${randNum}VN`;
  if (c.includes("shopee") || c.includes("spx")) return `SPXVN${randNum}`;
  if (c.includes("j&t") || c.includes("jt")) return `JNT${randNum}`;
  return `GHTK${randNum}`;
}

export interface SimulateShipmentOptions {
  targetStatus?: "SHIPPED" | "DELIVERED" | "DELIVERY_FAILED" | "RETURNED";
  carrier?: string;
  trackingNumber?: string;
  failureReason?: string;
}

export async function advanceSimulatedShipment(pledgeId: string, options?: SimulateShipmentOptions) {
  const pledge = await prisma.pledges.findUnique({
    where: { id: pledgeId },
    include: { rewards: true },
  });
  if (!pledge) return { ok: false as const, error: "Không tìm thấy đơn hàng" };

  const simulationModeOn = await isSimulationMode();
  const isPledgeSim = isSimulatedPledge(pledge.transactionId);

  // Cho phép giả lập nếu đơn có mã SIM- hoặc admin đang bật chế độ giả lập toàn sàn
  if (!simulationModeOn && !isPledgeSim) {
    return { ok: false as const, error: "Chế độ giả lập đang tắt. Vui lòng bật Chế độ giả lập trong Quản lý hệ thống Admin." };
  }

  if (pledge.fulfillmentType !== "PHYSICAL") {
    return { ok: false as const, error: "Đơn này không phải sản phẩm vật lý" };
  }

  const carrierName = options?.carrier || pledge.shippingProvider || "Giao Hàng Tiết Kiệm (GHTK)";
  const now = new Date();

  // Xác định trạng thái đích: nếu không truyền targetStatus, tự động chuyển sang bước kế tiếp
  let nextStatus: "SHIPPED" | "DELIVERED" | "DELIVERY_FAILED" | "RETURNED" = options?.targetStatus || "SHIPPED";
  if (!options?.targetStatus) {
    if (pledge.fulfillmentStatus === "PROCESSING" || pledge.fulfillmentStatus === "AWAITING_PAYMENT" || pledge.fulfillmentStatus === "NOT_APPLICABLE") {
      nextStatus = "SHIPPED";
    } else if (pledge.fulfillmentStatus === "SHIPPED") {
      nextStatus = "DELIVERED";
    } else {
      nextStatus = "DELIVERED";
    }
  }

  // 1. Chuyển sang "Đang vận chuyển" (SHIPPED)
  if (nextStatus === "SHIPPED") {
    const trackingNumber = options?.trackingNumber?.trim()
      || pledge.trackingNumber
      || generateCarrierTrackingNumber(carrierName);

    await prisma.pledges.update({
      where: { id: pledge.id },
      data: {
        fulfillmentStatus: "SHIPPED",
        shippingProvider: carrierName,
        trackingNumber,
        handedToCarrierAt: pledge.handedToCarrierAt || now,
        updatedAt: now,
      },
    });

    return {
      ok: true as const,
      status: "SHIPPED" as const,
      trackingNumber,
      carrier: carrierName,
      message: `Đã giả lập bưu tá tiếp nhận và xuất kho trung chuyển (${carrierName} - Mã: ${trackingNumber})`,
    };
  }

  // 2. Chuyển sang "Đã giao hàng" (DELIVERED)
  if (nextStatus === "DELIVERED") {
    const paid = pledge.isCashOnDelivery
      ? Number(pledge.orderTotalAmount || pledge.amount)
      : Math.max(Number(pledge.paidAmount), Number(pledge.amount));

    const trackingNumber = options?.trackingNumber?.trim()
      || pledge.trackingNumber
      || generateCarrierTrackingNumber(carrierName);

    await prisma.pledges.update({
      where: { id: pledge.id },
      data: {
        fulfillmentStatus: "DELIVERED",
        shippingProvider: carrierName,
        trackingNumber,
        receivedAt: now,
        paidAmount: new Decimal(paid),
        remainingAmount: new Decimal(0),
        accountingAmount: new Decimal(Number(pledge.amount)),
        updatedAt: now,
      },
    });

    try {
      await onPledgeSuccess(pledge.id);
    } catch (error) {
      console.error("[SIM SHIP] chứng từ", error instanceof Error ? error.message : "unknown");
    }
    try {
      await createBackerInvoice(pledge.id);
    } catch (error) {
      console.error("[SIM SHIP] hóa đơn", error instanceof Error ? error.message : "unknown");
    }

    return {
      ok: true as const,
      status: "DELIVERED" as const,
      trackingNumber,
      carrier: carrierName,
      message: "Đã giả lập giao hàng thành công đến tận tay người nhận",
    };
  }

  // 3. Chuyển sang "Giao hàng thất bại" (DELIVERY_FAILED)
  if (nextStatus === "DELIVERY_FAILED") {
    const failureReason = options?.failureReason || "Bưu tá đã liên hệ 3 lần nhưng người nhận không nghe máy";
    await prisma.pledges.update({
      where: { id: pledge.id },
      data: {
        fulfillmentStatus: "DELIVERY_FAILED",
        deliveryFailureReason: failureReason,
        updatedAt: now,
      },
    });

    // Hoàn lại tồn kho nếu đang giữ
    if (pledge.stockReserved && pledge.rewardId) {
      await prisma.rewards.update({
        where: { id: pledge.rewardId },
        data: { stock: { increment: pledge.quantity }, updatedAt: now },
      });
      await prisma.pledges.update({
        where: { id: pledge.id },
        data: { stockReserved: false },
      });
    }

    return {
      ok: true as const,
      status: "DELIVERY_FAILED" as const,
      trackingNumber: pledge.trackingNumber,
      carrier: carrierName,
      message: `Đã giả lập giao hàng thất bại: ${failureReason}`,
    };
  }

  // 4. Chuyển sang "Trả hàng / Hoàn về" (RETURNED)
  if (nextStatus === "RETURNED") {
    const returnReason = options?.failureReason || "Bưu cục chuyển hoàn về kho người gửi do quá hạn lưu kho";
    await prisma.pledges.update({
      where: { id: pledge.id },
      data: {
        fulfillmentStatus: "RETURNED",
        returnReason,
        updatedAt: now,
      },
    });

    if (pledge.stockReserved && pledge.rewardId) {
      await prisma.rewards.update({
        where: { id: pledge.rewardId },
        data: { stock: { increment: pledge.quantity }, updatedAt: now },
      });
      await prisma.pledges.update({
        where: { id: pledge.id },
        data: { stockReserved: false },
      });
    }

    return {
      ok: true as const,
      status: "RETURNED" as const,
      trackingNumber: pledge.trackingNumber,
      carrier: carrierName,
      message: `Đã giả lập hoàn trả bưu kiện về kho người gửi: ${returnReason}`,
    };
  }

  return { ok: false as const, error: "Trạng thái giả lập không hợp lệ" };
}
