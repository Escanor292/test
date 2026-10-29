import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fulfillmentLabel } from "@/lib/order-fulfillment";
import { formatVND } from "@/lib/utils";
import { isAdminActor } from "@/lib/payment/simulate-checkout";
import ShipmentActions from "@/components/orders/ShipmentActions";
import { isSimulationMode } from "@/lib/platform-settings";
import { Package, Clock, CheckCircle2 } from "lucide-react";

const STEPS = [
  { id: "PLACED", label: "Đã lên đơn" },
  { id: "PROCESSING", label: "Đang chuẩn bị" },
  { id: "SHIPPED", label: "Đang vận chuyển" },
  { id: "DELIVERED", label: "Đã nhận hàng" },
] as const;

function stepIndex(status: string) {
  if (status === "DELIVERED") return 3;
  if (status === "SHIPPED") return 2;
  if (status === "PROCESSING" || status === "AWAITING_PAYMENT") return 1;
  return 0;
}

export default async function OrderPage({ params }: { params: Promise<{ pledgeId: string }> }) {
  const session = await auth();
  const user = session?.user as { id?: string; name?: string; role?: string; isAdmin?: boolean } | undefined;
  if (!user?.id) redirect("/auth/login?callbackUrl=/don-hang");
  const { pledgeId } = await params;
  const pledge = await prisma.pledges.findUnique({
    where: { id: pledgeId },
    include: {
      rewards: { select: { title: true } },
      campaigns: { select: { title: true, creatorId: true, slug: true } },
      donation_certificate: { select: { code: true, documentKind: true } },
      backer_invoices: { select: { invoiceNumber: true } },
    },
  });
  if (!pledge) notFound();
  const admin = isAdminActor(user);
  const creator = pledge.campaigns?.creatorId === user.id;
  if (!admin && !creator && pledge.userId !== user.id) notFound();

  const current = stepIndex(pledge.fulfillmentStatus);
  const simulated = pledge.transactionId.startsWith("SIM-") || pledge.transactionId.startsWith("SIM:");
  const codCollected = pledge.isCashOnDelivery && pledge.fulfillmentStatus === "DELIVERED";
  const simulationModeOn = await isSimulationMode();
  const canSimulate = admin && (simulated || simulationModeOn);


  return (
    <main className="min-h-screen bg-slate-50/70 py-14 px-4 sm:px-6 text-slate-800">
      <div className="mx-auto max-w-2xl rounded-[2.5rem] bg-white p-6 sm:p-9 border border-slate-100 shadow-soft">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Đơn hàng quà tặng</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            pledge.fulfillmentStatus === "DELIVERED"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : pledge.fulfillmentStatus === "SHIPPED"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}>
            {fulfillmentLabel(pledge.fulfillmentStatus)}
          </span>
        </div>

        <div className="mt-5 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {pledge.rewards?.title || "Phần quà chiến dịch"}
          </h1>
          {pledge.campaigns?.title ? (
            <p className="text-sm text-slate-500 font-medium">
              Chiến dịch: <span className="text-slate-700 font-semibold">{pledge.campaigns.title}</span>
            </p>
          ) : null}
          <p className="pt-2 text-2xl font-black text-emerald-700">
            {formatVND(Number(pledge.amount))}
          </p>
        </div>

        {/* Mốc tiến độ 4 bước */}
        <div className="mt-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Trạng thái xử lý đơn hàng
          </h3>
          <ol className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STEPS.map((step, index) => {
              const done = index <= current;
              const isCurrentStep = index === current;
              return (
                <li
                  key={step.id}
                  className={`rounded-2xl px-3 py-3 text-center transition flex flex-col items-center justify-center gap-1 border ${
                    isCurrentStep
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold shadow-sm"
                      : done
                      ? "bg-emerald-50/50 border-emerald-100 text-emerald-800 font-semibold"
                      : "bg-slate-50/80 border-slate-100 text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {done ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[9px] font-bold">
                        {index + 1}
                      </span>
                    )}
                    <span className="text-xs">{step.label}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Bảng chi tiết thông tin */}
        <dl className="mt-8 divide-y divide-slate-100 rounded-2xl bg-slate-50/50 p-4 border border-slate-100 text-sm">
          <div className="py-2.5 flex justify-between gap-4">
            <dt className="text-slate-500">Mã vận đơn</dt>
            <dd className="font-mono font-bold text-slate-900">{pledge.trackingNumber || "Chưa xuất mã"}</dd>
          </div>
          <div className="py-2.5 flex justify-between gap-4">
            <dt className="text-slate-500">Đơn vị vận chuyển</dt>
            <dd className="font-bold text-slate-900">{pledge.shippingProvider || "Đang điều phối"}</dd>
          </div>
          <div className="py-2.5 flex justify-between gap-4">
            <dt className="text-slate-500">Thanh toán</dt>
            <dd className="text-right font-bold text-slate-900">
              {pledge.isCashOnDelivery
                ? (codCollected ? "COD — đã thu khi giao" : "COD — thu khi nhận hàng")
                : "Đã thanh toán trước (Escrow)"}
            </dd>
          </div>
          {pledge.shippingAddress && (
            <div className="py-2.5">
              <dt className="text-slate-500 mb-1">Địa chỉ giao hàng</dt>
              <dd className="font-medium text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200/70">
                {pledge.shippingAddress}
              </dd>
            </div>
          )}
        </dl>

        {/* Nút thao tác biên lai & hóa đơn */}
        <div className="mt-6 flex flex-wrap gap-2.5 text-xs font-bold">
          {pledge.backer_invoices?.invoiceNumber ? (
            <Link
              className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition px-4 py-2"
              href={`/hoa-don/${encodeURIComponent(pledge.backer_invoices.invoiceNumber)}`}
            >
              Xem hóa đơn
            </Link>
          ) : (
            <span className="text-xs text-slate-400 py-2">
              Hóa đơn sẽ cấp sau khi nhận hàng hoàn tất.
            </span>
          )}
          {pledge.donation_certificate && (
            <Link
              className="rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition px-4 py-2"
              href={`/chung-tu/${pledge.donation_certificate.code}`}
            >
              Xem biên lai
            </Link>
          )}
          <Link
            className="rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition px-4 py-2"
            href="/purchases"
          >
            Kho đồ số
          </Link>
        </div>

        {canSimulate && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <ShipmentActions
              pledgeId={pledge.id}
              status={pledge.fulfillmentStatus}
              currentCarrier={pledge.shippingProvider}
              currentTrackingNumber={pledge.trackingNumber}
            />
          </div>
        )}
      </div>
    </main>
  );
}
