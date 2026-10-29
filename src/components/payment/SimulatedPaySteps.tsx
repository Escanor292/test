"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OnlinePaymentPicker, { type OnlineChannel, type SavedPaymentMethod } from "@/components/campaign/OnlinePaymentPicker";

export default function SimulatedPaySteps({
  pledgeId,
  qrUrl,
  onDone,
}: {
  pledgeId: string;
  qrUrl?: string | null;
  onDone?: (confirmationUrl: string) => void;
}) {
  const router = useRouter();
  const [methods, setMethods] = useState<SavedPaymentMethod[]>([]);
  const [channel, setChannel] = useState<OnlineChannel>("QR");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saveMethod, setSaveMethod] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/payment-methods")
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (Array.isArray(data?.methods)) setMethods(data.methods);
      })
      .catch(() => undefined);
  }, []);

  async function confirm() {
    if (channel !== "QR" && !selectedId) {
      setError("Hãy gắn thẻ mới hoặc chọn một thẻ đã lưu. VietQR thì không cần thẻ.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/payments/simulate-settle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pledgeId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Không xác nhận được");
      if (onDone) onDone(data.confirmationUrl);
      else if (data.confirmationUrl) router.push(data.confirmationUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không xác nhận được");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4 rounded-3xl border border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-semibold text-amber-950">Giả lập đang bật. Làm các bước thanh toán bên dưới. Không trừ tiền thật.</p>
      <OnlinePaymentPicker
        savedMethods={methods}
        isAuthenticated
        channel={channel}
        selectedPaymentMethodId={selectedId}
        savePaymentMethod={saveMethod}
        onChannelChange={setChannel}
        onSelectSavedMethod={setSelectedId}
        onSavePaymentMethodChange={setSaveMethod}
        onMethodLinked={(method) => {
          setMethods((current) => [method, ...current.filter((item) => item.id !== method.id)]);
          setSelectedId(method.id);
        }}
      />
      {channel === "QR" && qrUrl ? (
        <img src={qrUrl} alt="Mã VietQR giả lập" className="mx-auto w-56 rounded-2xl border bg-white p-2" />
      ) : null}
      <button type="button" disabled={busy} onClick={confirm} className="h-11 w-full rounded-2xl bg-[#1C432B] text-sm font-bold text-white disabled:opacity-60">
        {busy ? "Đang ghi nhận..." : "Xác nhận đã thanh toán"}
      </button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
