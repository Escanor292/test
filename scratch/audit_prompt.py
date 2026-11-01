# -*- coding: utf-8 -*-
"""Vong tu kiem theo muc 6 cua PROMPT_HoanThienTaiLieu_23CT113.md"""
import glob
import os
import re
from collections import Counter

from docx import Document
from openpyxl import load_workbook
from pptx import Presentation
from pypdf import PdfReader

T = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/"

words = [
    T + "Test Plan_23CT113_Nhom02.docx",
    T + "Test Report_23CT113_Nhom02.docx",
    T + "Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx",
] + sorted(glob.glob(T + "TimeLine/Nhom2_Ke_hoach*.docx")) + sorted(glob.glob(T + "TimeLine/Biên Bản*.docx"))

print("--- 4 file Word + 3 bien ban ---")
for f in words:
    d = Document(f)
    h1 = sum(1 for p in d.paragraphs if p.style.name == "Heading 1")
    h2 = sum(1 for p in d.paragraphs if p.style.name == "Heading 2")
    toc = "TOC \\o" in d.element.xml
    n = d.styles["Normal"]
    print("  %-46s H1=%2d H2=%2d TOC=%s tables=%d Normal=%s/%s" % (
        os.path.basename(f)[:46], h1, h2, "Y" if toc else "N", len(d.tables),
        n.font.name, n.font.size.pt if n.font.size else None))

print("--- PPT ---")
pr = Presentation(T + "Word+ppt Báo Cáo/Nhom02_Final_Presentation.pptx")
ok_bg = 0
for s in pr.slides:
    names = [sh.name for sh in list(s.shapes)[:3]]
    if names == ["Freeform 2", "Group 3", "Group 5"]:
        ok_bg += 1
print("  slides=%d size=%dx%d | slide du 3 shape nen/logo o dau: %d/%d" % (
    len(pr.slides), pr.slide_width, pr.slide_height, ok_bg, len(pr.slides)))

print("--- Excel (nguon chuan) ---")
wb = load_workbook(T + "Test Case_23CT113_Nhom02.xlsx", data_only=True)
tc = wb["TC List"]
c = Counter(str(tc.cell(r, 10).value).strip() for r in range(2, tc.max_row + 1) if tc.cell(r, 2).value)
print("  TC=%d ket qua=%s | 76/104 = %.1f%%" % (sum(c.values()), dict(c), 76 / 104 * 100))
tr = wb["TR List"]
print("  TR=%d" % sum(1 for r in range(2, tr.max_row + 1) if tr.cell(r, 1).value))

print("--- evidence (dem lai bang lenh) ---")
ext = Counter()
for root, _, files in os.walk(T + "evidence"):
    for f in files:
        ext[f.rsplit(".", 1)[-1].lower()] += 1
print("  ", dict(ext), "tong:", sum(ext.values()))

print("--- PDF ---")
pdf = glob.glob(T + "Word+ppt Báo Cáo/*.pdf")[0]
r = PdfReader(pdf)
flat = re.sub(r"\s+", "", "\n".join(p.extract_text() or "" for p in r.pages))
print("  pages=%d (can 10-15) | bytes=%d" % (len(r.pages), os.path.getsize(pdf)))
for label, needle in [("TaiLieuThamKhao", "TÀILIỆUTHAMKHẢO"), ("PhuLucA", "PHỤLỤCA"),
                      ("PhuLucB", "PHỤLỤCB"), ("73,1%", "73,1%"), ("01/11/2026", "01/11/2026")]:
    print("   %-18s %s" % (label, "OK" if needle in flat else "MISS"))

print("--- bug <-> ma nguon ---")
trd = Document(T + "Test Report_23CT113_Nhom02.docx")
tb = next(t for t in trd.tables if [c.text.strip() for c in t.rows[0].cells][0].upper() == "BUG-ID")
rows = [[c.text.strip() for c in row.cells] for row in tb.rows[1:]]
paths = set()
for row in rows:
    for m in re.findall(r"src/[\w\-./\[\]]+\.(?:tsx?|prisma|json)", row[5]):
        paths.add(m)
miss = sorted(p for p in paths if not os.path.exists(p))
print("  bug rows=%d | duong dan src/ trong bang=%d | khong ton tai=%d %s" % (len(rows), len(paths), len(miss), miss))

checks = [
    ("POLL_MS = 1200 (useCall.ts)", "src/hooks/useCall.ts", "POLL_MS = 1200"),
    ("ESCROW_BANK_ONLY (momo)", "src/app/api/payment/momo/create/route.ts", "ESCROW_BANK_ONLY"),
    ("ESCROW_BANK_ONLY (vnpay)", "src/app/api/payment/vnpay/create/route.ts", "ESCROW_BANK_ONLY"),
    ("message.length < 10 (feedback)", "src/app/api/feedback/route.ts", "message.length < 10"),
]
for label, f, needle in checks:
    txt = open(f, encoding="utf-8", errors="ignore").read() if os.path.exists(f) else ""
    print("   %s %s" % ("OK  " if needle in txt else "MISS", label))
camp = open("src/app/api/campaigns/route.ts", encoding="utf-8", errors="ignore").read()
print("   %s campaigns/route.ts KHONG co POST" % ("OK  " if "export async function POST" not in camp else "MISS"))

print("--- van phong / dinh dang ---")
BAD = ["cực kỳ", "vô cùng quan trọng", "đóng vai trò then chốt", "nhìn chung có thể thấy rằng", "một cách toàn diện"]
for f in words[:4]:
    d = Document(f)
    txt = "\n".join(p.text for p in d.paragraphs)
    hit = [w for w in BAD if w.lower() in txt.lower()]
    dot = len(re.findall(r"\d\.\d\s?%", txt))
    caps = len(re.findall(r"^Bảng \d+\.", txt, re.M))
    print("  %-40s tu_cam=%s pct_sai=%d caption_bang=%d/%d" % (
        os.path.basename(f)[:40], hit, dot, caps, len(d.tables)))

print("--- ten cu con sot ---")
old = "Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky"
found = []
cands = (glob.glob(T + "**/*.docx", recursive=True) + glob.glob(T + "**/*.xlsx", recursive=True)
         + glob.glob(T + "**/*.pptx", recursive=True) + glob.glob("*.md"))
for f in cands:
    try:
        if f.endswith(".docx"):
            t = "\n".join(p.text for p in Document(f).paragraphs)
        elif f.endswith(".xlsx"):
            w = load_workbook(f, data_only=True)
            t = "\n".join(str(cel.value) for ws in w for row in ws.iter_rows() for cel in row if cel.value)
        elif f.endswith(".pptx"):
            t = "\n".join(sh.text_frame.text for s in Presentation(f).slides for sh in s.shapes if sh.has_text_frame)
        else:
            t = open(f, encoding="utf-8").read()
    except Exception:
        continue
    if old in t or "Truong_nhom" in t:
        found.append(os.path.basename(f))
print("  file con nhac ten cu:", found or "KHONG CO")
print("=== HET VONG KIEM ===")
