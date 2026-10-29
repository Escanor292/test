import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { fulfillmentLabel } from "@/lib/order-fulfillment";
import { formatVND } from "@/lib/utils";
import { ChevronRight, Package, Truck } from "lucide-react";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "moving", label: "Đang giao" },
  { id: "done", label: "Đã nhận" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

function tone(status: string) {
  if (status === "DELIVERED") return "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (status === "SHIPPED") return "bg-blue-50 text-blue-800 border-blue-200";
  if (status === "DELIVERY_FAILED" || status === "RETURNED" || status === "CANCELED") {
    return "bg-rose-50 text-rose-800 border-rose-200";
  }
  return "bg-amber-50 text-amber-800 border-amber-200";
}

function stepOf(status: string) {
  if (status === "DELIVERED") return 3;
  if (status === "SHIPPED") return 2;
  if (status === "PROCESSING" || status === "AWAITING_PAYMENT") return 1;
  return 0;
}

const STEPS = ["Đặt", "Chuẩn bị", "Đang giao", "Đã nhận"];

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: Promise<{ filter?: string }>;
}) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/auth/login?callbackUrl=/don-hang");

  const params = searchParams ? await searchParams : {};
  const filter: FilterId = FILTERS.some((item) => item.id === params.filter)
    ? (params.filter as FilterId)
    : "all";

  const orders = await prisma.pledges.findMany({
    where: {
      userId,
      status: { in: ["PENDING", "SUCCESS", "REFUNDED"] },
      OR: [
        { fulfillmentType: "PHYSICAL" },
        { rewards: { fulfillmentType: "PHYSICAL" } },
        { shippingAddress: { not: null } },
      ],
    },
    orderBy: { updatedAt: "desc" },
    include: {
      rewards: { select: { title: true } },
      campaigns: { select: { title: true, slug: true } },
    },
  });

  const visible = orders.filter((order) => {
    if (filter === "moving") return ["PROCESSING", "SHIPPED", "AWAITING_PAYMENT", "DELIVERY_FAILED"].includes(order.fulfillmentStatus);
    if (filter === "done") return order.fulfillmentStatus === "DELIVERED";
    return true;
  });
  const moving = orders.filter((order) => ["PROCESSING", "SHIPPED", "AWAITING_PAYMENT"].includes(order.fulfillmentStatus)).length;

  return (
    <main className="min-h-screen bg-slate-50/70 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Tài khoản của bạn</p>
            <h1 className="mt-1 font-display text-4xl font-bold text-slate-900">Theo dõi đơn hàng</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Đơn quà vật lý và hàng bạn mua. Bấm vào đơn để xem mã vận đơn và bản đồ.
            </p>
          </div>
          <Link href="/purchases" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            Kho đã mua
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {FILTERS.map((item) => (
            <Link
              key={item.id}
              href={item.id === "all" ? "/don-hang" : `/don-hang?filter=${item.id}`}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                filter === item.id ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"
              }`}
            >
              {item.label}
              {item.id === "moving" && moving > 0 ? ` · ${moving}` : ""}
            </Link>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {visible.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
              <Package className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-3 text-sm font-semibold text-slate-700">Chưa có đơn nào trong mục này.</p>
              <Link href="/projects" className="mt-3 inline-block text-sm font-bold text-emerald-700">
                Xem chiến dịch
              </Link>
            </div>
          )}
          {visible.map((order) => {
            const step = stepOf(order.fulfillmentStatus);
            return (
              <Link
                key={order.id}
                href={`/don-hang/${order.id}`}
                className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-base font-bold text-slate-900">
                      {order.rewards?.title || "Đơn hàng"}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-slate-500">
                      {order.campaigns?.title || "Chiến dịch"} · {formatVND(Number(order.amount))}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${tone(order.fulfillmentStatus)}`}>
                    {order.status === "PENDING" ? "Chờ thanh toán" : fulfillmentLabel(order.fulfillmentStatus)}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-1">
                  {STEPS.map((label, index) => (
                    <div key={label}>
                      <div className={`h-1.5 rounded-full ${index <= step ? "bg-emerald-500" : "bg-slate-100"}`} />
                      <p className={`mt-1 text-[10px] font-semibold ${index <= step ? "text-emerald-800" : "text-slate-400"}`}>{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    {order.shippingProvider || "Chưa giao bưu cục"}
                    {order.trackingNumber ? ` · ${order.trackingNumber}` : ""}
                  </span>
                  <span className="inline-flex items-center font-semibold text-emerald-700">
                    Xem lộ trình <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
