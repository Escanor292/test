"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FlaskConical, ImagePlus, Loader2, RotateCcw, ShieldCheck, ShieldX, X } from "lucide-react";
import { toast } from "sonner";
import { refundStatusLabel } from "@/lib/payment/refund-rules";

type RefundEvidence = { url: string; kind: "image" | "video" };

const ARRIVAL = "Đã nhận được yêu cầu hoàn tiền. Tiền hoàn sẽ về tài khoản trong 1–2 ngày tới.";

async function uploadEvidence(file: File): Promise<RefundEvidence> {
  const video = file.type.startsWith("video/");
  const images = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  const videos = ["video/mp4", "video/webm", "video/quicktime"];
  if (![...images, ...videos].includes(file.type)) throw new Error("Chỉ nhận ảnh JPG, PNG, WEBP, GIF hoặc video MP4, WEBM, MOV.");
  if (file.size > (video ? 30 : 5) * 1024 * 1024) throw new Error(video ? "Video tối đa 30MB." : "Ảnh tối đa 5MB.");
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Không tải được file.");
  const url = String(data.secure_url || data.url || "");
  if (!url) throw new Error("Máy chủ không trả về đường dẫn file.");
  return { url, kind: video ? "video" : "image" };
}

function EvidenceList({ items }: { items: RefundEvidence[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {items.map((item) => (
        item.kind === "video" ? (
          <video key={item.url} src={item.url} controls className="h-24 w-full rounded-lg bg-black object-cover" />
        ) : (
          <a key={item.url} href={item.url} target="_blank" rel="noreferrer">
            <img src={item.url} alt="" className="h-24 w-full rounded-lg object-cover" />
          </a>
        )
      ))}
    </div>
  );
}

export default function RefundActions({
  pledgeId,
  refundStatus,
  note,
  evidence,
  isOwner,
  isAdmin,
  canSimulate,
}: {
  pledgeId: string;
  refundStatus: string;
  note?: string | null;
  evidence: RefundEvidence[];
  isOwner: boolean;
  isAdmin: boolean;
  canSimulate: boolean;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [reason, setReason] = useState("");
  const [files, setFiles] = useState<RefundEvidence[]>(evidence);
  const [busy, setBusy] = useState<string | null>(null);
  const done = refundStatus === "COMPLETED";
  const requested = refundStatus === "REQUESTED";

  const addFiles = async (list: FileList | null) => {
    if (!list?.length) return;
    setBusy("upload");
    try {
      const next = [...files];
      for (const file of Array.from(list).slice(0, 6 - next.length)) {
        next.push(await uploadEvidence(file));
      }
      setFiles(next.slice(0, 6));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không tải được file.");
    } finally {
      setBusy(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const run = async (action: "request" | "approve" | "reject" | "complete" | "simulate") => {
    if (action === "request" && files.length === 0) {
      toast.error("Hãy gửi ảnh hoặc video của hàng.");
      return;
    }
    setBusy(action);
    try {
      const response = await fetch(`/api/orders/${pledgeId}/refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reason, evidence: files }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Không hoàn tiền được.");
      toast.success(data.message || ARRIVAL);
      setReason("");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không hoàn tiền được.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Hoàn tiền</h3>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
          done ? "bg-emerald-100 text-emerald-800" : requested ? "bg-amber-100 text-amber-800" : "bg-white text-slate-600"
        }`}>
          {refundStatusLabel(refundStatus)}
        </span>
      </div>
      {note ? <p className="mt-2 text-xs text-slate-600">{note}</p> : null}
      <EvidenceList items={done || requested ? evidence : files} />
      {done || requested ? (
        <p className="mt-2 text-xs text-slate-600">{ARRIVAL}</p>
      ) : (
        <>
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Lý do hoàn tiền, ví dụ hàng bị hỏng"
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400"
            rows={2}
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
              multiple
              className="hidden"
              onChange={(event) => void addFiles(event.target.files)}
            />
            <button
              type="button"
              disabled={busy !== null || files.length >= 6}
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-60"
            >
              {busy === "upload" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
              Ảnh hoặc video hàng
            </button>
            <span className="text-[11px] text-slate-400">Tối đa 6 file. Ảnh 5MB, video 30MB.</span>
          </div>
          {files.length > 0 && !requested && (
            <div className="mt-2 flex flex-wrap gap-1">
              {files.map((item) => (
                <button
                  key={item.url}
                  type="button"
                  onClick={() => setFiles(files.filter((file) => file.url !== item.url))}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] text-slate-600"
                >
                  {item.kind === "video" ? "Video" : "Ảnh"} <X className="h-3 w-3" />
                </button>
              ))}
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {isOwner && (refundStatus === "NO_REFUND" || refundStatus === "FAILED") && (
              <button
                type="button"
                disabled={busy !== null}
                onClick={() => run("request")}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white disabled:opacity-60"
              >
                {busy === "request" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
                Gửi yêu cầu hoàn tiền
              </button>
            )}
            {isAdmin && requested && (
              <>
                <button type="button" disabled={busy !== null} onClick={() => run("approve")} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-60">
                  {busy === "approve" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                  Duyệt hoàn tiền
                </button>
                <button type="button" disabled={busy !== null} onClick={() => run("reject")} className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-bold text-rose-700 disabled:opacity-60">
                  {busy === "reject" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShieldX className="h-3.5 w-3.5" />}
                  Từ chối
                </button>
              </>
            )}
            {isAdmin && canSimulate && (
              <button type="button" disabled={busy !== null} onClick={() => run("simulate")} className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-900 disabled:opacity-60">
                {busy === "simulate" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FlaskConical className="h-3.5 w-3.5" />}
                Giả lập hoàn ngay
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
