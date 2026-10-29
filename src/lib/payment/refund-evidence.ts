import { executeRaw, queryRaw } from "@/lib/sql/raw";
function isSafeAssetUrl(value: string): boolean {
  const url = value.trim();
  if (!url || url.length > 500) return false;
  if (/[\u0000-\u001F\u007F]/.test(url)) return false;
  if (url.startsWith("/") && !url.startsWith("//")) {
    return !url.includes("\\") && !url.includes("..");
  }
  try {
    const parsed = new URL(url);
    if (parsed.username || parsed.password) return false;
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export interface RefundEvidence {
  url: string;
  kind: "image" | "video";
}

let ready: Promise<void> | null = null;

function ensureColumn() {
  ready ??= executeRaw(`ALTER TABLE pledges ADD COLUMN IF NOT EXISTS "refundEvidence" TEXT`).then(() => undefined);
  return ready;
}

export function cleanEvidence(input: unknown): RefundEvidence[] {
  if (!Array.isArray(input)) return [];
  const items: RefundEvidence[] = [];
  for (const row of input.slice(0, 6)) {
    const url = typeof row === "string" ? row : String((row as { url?: string })?.url || "");
    const kind = typeof row === "object" && row && (row as { kind?: string }).kind === "video" ? "video" : "image";
    if (!isSafeAssetUrl(url)) continue;
    items.push({ url, kind: url.match(/\.(mp4|webm|mov)(\?|$)/i) ? "video" : kind });
  }
  return items;
}

export async function saveRefundEvidence(pledgeId: string, evidence: RefundEvidence[]) {
  await ensureColumn();
  await executeRaw(
    `UPDATE pledges SET "refundEvidence" = $1 WHERE id = $2`,
    JSON.stringify(evidence),
    pledgeId,
  );
}

export async function loadRefundEvidence(pledgeId: string): Promise<RefundEvidence[]> {
  try {
    await ensureColumn();
    const rows = await queryRaw<Array<{ refundEvidence: string | null }>>(
      `SELECT "refundEvidence" FROM pledges WHERE id = $1`,
      pledgeId,
    );
    return cleanEvidence(JSON.parse(rows[0]?.refundEvidence || "[]"));
  } catch {
    return [];
  }
}
