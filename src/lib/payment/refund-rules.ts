/**
 * Quy tắc hoàn tiền. Không đụng ngân hàng — chi hoàn thật vẫn làm tay.
 *
 * 1. Người ủng hộ gửi yêu cầu trên đơn đã thanh toán.
 * 2. Admin duyệt thì hoàn sổ, hoặc từ chối thì trả về chưa hoàn.
 * 3. Admin cũng hoàn trực tiếp khi chiến dịch thất bại/hủy, hoặc khi cần xử lý một đơn.
 * 4. Giả lập chỉ chạy khi bật chế độ giả lập hoặc đơn là SIM-. Hoàn sổ ngay, không gọi ngân hàng.
 */

export type RefundStatusName = "NO_REFUND" | "REQUESTED" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface RefundGate {
  status: string;
  refundStatus: string;
  transactionId?: string | null;
}

export function isSimulatedPledge(transactionId: string | null | undefined) {
  const id = transactionId || "";
  return id.startsWith("SIM-") || id.startsWith("SIM:");
}

export function canRequestRefund(pledge: RefundGate) {
  return pledge.status === "SUCCESS" && (pledge.refundStatus === "NO_REFUND" || pledge.refundStatus === "FAILED");
}

export function canReviewRefund(pledge: RefundGate) {
  return pledge.status === "SUCCESS" && pledge.refundStatus === "REQUESTED";
}

export function canCompleteRefund(pledge: RefundGate) {
  return (
    pledge.status === "SUCCESS" &&
    pledge.refundStatus !== "COMPLETED" &&
    pledge.refundStatus !== "PROCESSING"
  );
}

export function canSimulateRefund(pledge: RefundGate, simulationOn: boolean) {
  return (simulationOn || isSimulatedPledge(pledge.transactionId)) && canCompleteRefund(pledge);
}

export function refundStatusLabel(status: string) {
  switch (status) {
    case "REQUESTED":
      return "Đã gửi yêu cầu hoàn tiền";
    case "PROCESSING":
      return "Đang hoàn tiền";
    case "COMPLETED":
      return "Đã hoàn tiền";
    case "FAILED":
      return "Hoàn tiền lỗi, có thể gửi lại";
    default:
      return "Chưa hoàn tiền";
  }
}
