'use client';

import { useEffect, useState } from 'react';
import { FlaskConical, Loader2, CreditCard, Truck, RotateCcw, CheckCircle2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SimulationToggle() {
  const [on, setOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((response) => response.json())
      .then((data) => setOn(Boolean(data.simulationMode)))
      .catch(() => toast.error('Không tải được chế độ giả lập'))
      .finally(() => setLoading(false));
  }, []);

  const toggle = async () => {
    setBusy(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulationMode: !on }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Không lưu được');
      setOn(Boolean(data.simulationMode));
      toast.success(data.simulationMode ? 'Đã bật chế độ giả lập toàn sàn (Thanh toán & Giao hàng)' : 'Đã tắt chế độ giả lập');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không lưu được');
    } finally {
      setBusy(false);
    }
  };

  const wipe = async () => {
    if (!window.confirm('Xóa mọi đơn giả lập? Số huy động, người ủng hộ, kho đồ và hội viên tạo bằng giả lập sẽ bị gỡ sạch.')) return;
    setBusy(true);
    try {
      const response = await fetch('/api/admin/simulation', { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Không xóa được');
      toast.success(data.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không xóa được');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          disabled={loading || busy}
          className={`inline-flex h-11 items-center gap-2 rounded-2xl px-5 text-sm font-black text-white shadow-sm transition active:scale-95 disabled:opacity-60 ${
            on ? 'bg-amber-500 hover:bg-amber-600' : 'bg-slate-700 hover:bg-slate-800'
          }`}
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <FlaskConical size={16} />}
          {loading ? 'Đang kiểm tra...' : on ? 'Giả lập đang BẬT (Toàn sàn)' : 'Bật chế độ giả lập'}
        </button>

        <button
          type="button"
          onClick={wipe}
          disabled={busy}
          className="inline-flex h-11 items-center gap-1.5 rounded-2xl border border-amber-200 bg-white px-4 text-sm font-bold text-amber-800 hover:bg-amber-50 shadow-sm transition active:scale-95 disabled:opacity-60"
        >
          <Trash2 size={14} />
          Xóa dữ liệu giả lập
        </button>
      </div>

      {on ? (
        <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-4 space-y-2.5 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <CheckCircle2 size={14} className="text-amber-600" />
            Các tính năng giả lập đang hoạt động trên tài khoản Admin:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-amber-950">
            <div className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-amber-100">
              <CreditCard size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">1. Giả lập Thanh toán (Checkout)</strong>
                <span className="text-slate-600">Admin ủng hộ, mua quà, giỏ hàng hoặc COD sẽ thành công ngay lập tức không cần chuyển khoản thật.</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-amber-100">
              <Truck size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">2. Giả lập Giao hàng (Shipping / Bưu cục)</strong>
                <span className="text-slate-600">Tại bất kỳ đơn hàng nào, Admin có quyền chọn hãng bưu cục (GHTK, Viettel Post, GHN...), mô phỏng từng bước xuất kho/giao hàng và xem bưu kiện di chuyển trên Map.</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-amber-100 sm:col-span-2">
              <RotateCcw size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">3. Giả lập Hoàn tiền</strong>
                <span className="text-slate-600">Trên đơn đã thanh toán, Admin bấm Giả lập hoàn tiền. Hệ thống trừ số huy động, trả tồn kho, thu hồi kho đồ và biên lai. Không gọi ngân hàng.</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-500 italic">
          * Khi tắt, hệ thống hoạt động ở chế độ thật: đơn hàng yêu cầu chuyển khoản đối soát SePay và bưu kiện tuân theo cập nhật thực tế từ nhà vận chuyển.
        </p>
      )}
    </div>
  );
}
