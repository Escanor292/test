'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FlaskConical, Truck, CheckCircle2, AlertTriangle, RotateCcw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const CARRIERS = [
  'Giao Hàng Tiết Kiệm (GHTK)',
  'Viettel Post',
  'Giao Hàng Nhanh (GHN)',
  'Shopee Express (SPX)',
  'J&T Express',
];

interface ShipmentActionsProps {
  pledgeId: string;
  status: string;
  currentCarrier?: string | null;
  currentTrackingNumber?: string | null;
}

export default function ShipmentActions({
  pledgeId,
  status,
  currentCarrier,
  currentTrackingNumber,
}: ShipmentActionsProps) {
  const router = useRouter();
  const [carrier, setCarrier] = useState(currentCarrier || CARRIERS[0]);
  const [busy, setBusy] = useState(false);

  const simulateStep = async (targetStatus: 'SHIPPED' | 'DELIVERED' | 'DELIVERY_FAILED' | 'RETURNED') => {
    setBusy(true);
    try {
      const response = await fetch(`/api/orders/${pledgeId}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetStatus,
          carrier,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Không thực hiện được giả lập');
      toast.success(data.message || 'Đã cập nhật trạng thái giả lập');
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Có lỗi khi giả lập');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/50 p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
            <FlaskConical className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Giả lập bưu cục & vận chuyển</h4>
            <p className="text-[11px] text-slate-500">
              Đang bật qua Chế độ giả lập Admin. Bấm để mô phỏng tiến trình bưu tá & kho vận.
            </p>
          </div>
        </div>

        {/* Chọn đơn vị vận chuyển giả lập */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Đơn vị:</span>
          <select
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            disabled={busy}
            className="text-xs font-bold rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {CARRIERS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Các nút hành động giả lập */}
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          onClick={() => simulateStep('SHIPPED')}
          disabled={busy || status === 'SHIPPED'}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-sm transition active:scale-95 ${
            status === 'SHIPPED'
              ? 'bg-blue-100 text-blue-700 opacity-70 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Truck className="w-3.5 h-3.5" />}
          <span>1. Bưu cục xuất kho (Đang vận chuyển)</span>
        </button>

        <button
          type="button"
          onClick={() => simulateStep('DELIVERED')}
          disabled={busy || status === 'DELIVERED'}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-sm transition active:scale-95 ${
            status === 'DELIVERED'
              ? 'bg-emerald-100 text-emerald-800 opacity-70 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
          <span>2. Đã giao hàng thành công</span>
        </button>

        <button
          type="button"
          onClick={() => simulateStep('DELIVERY_FAILED')}
          disabled={busy || status === 'DELIVERY_FAILED'}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 transition shadow-sm active:scale-95"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Giao thất bại</span>
        </button>

        <button
          type="button"
          onClick={() => simulateStep('RETURNED')}
          disabled={busy || status === 'RETURNED'}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition shadow-sm active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Hoàn hàng về</span>
        </button>
      </div>

      {currentTrackingNumber && (
        <p className="text-[11px] text-slate-500 italic">
          * Đơn đã có mã vận đơn: <strong className="font-mono text-slate-700">{currentTrackingNumber}</strong>. Bấm &quot;Xem map di chuyển&quot; phía trên để xem bưu kiện cập nhật theo thời gian thực.
        </p>
      )}
    </div>
  );
}
