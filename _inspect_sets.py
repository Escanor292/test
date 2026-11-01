import io, os, sys, glob, json
from openpyxl import load_workbook

ROOT = "."
SETS = {
    "22": "22CT115_Nhom07_QuanLyBanHang(Sweet-Sip)",
    "23": "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)",
}
out = []
def p(s=""):
    out.append(s)

def xlsx(path):
    wb = load_workbook(path, data_only=True)
    p("  sheets: %d -> %s" % (len(wb.sheetnames), wb.sheetnames))
    for ws in wb.worksheets:
        p("   - [%s] dims=%s max_row=%d max_col=%d" % (ws.title, ws.dimensions, ws.max_row, ws.max_column))
        hdr = []
        for r in range(1, min(6, ws.max_row + 1)):
            vals = []
            for c in range(1, min(ws.max_column, 14) + 1):
                v = ws.cell(r, c).value
                if v is not None:
                    vals.append("%s%d=%s" % (chr(64 + c) if c <= 26 else "A" + str(c), r, str(v)[:38].replace("\n", " ")))
            if vals:
                p("     R%d: %s" % (r, " | ".join(vals)))
        # so dong co du lieu thuc
        real = 0
        for r in range(1, ws.max_row + 1):
            if any(ws.cell(r, c).value not in (None, "") for c in range(1, min(ws.max_column, 6) + 1)):
                real += 1
        p("     rows_co_du_lieu=%d" % real)

def docx(path):
    try:
        from docx import Document
    except Exception as e:
        p("  (khong doc duoc docx: %s)" % e); return
    d = Document(path)
    p("  paragraphs=%d tables=%d sections=%d" % (len(d.paragraphs), len(d.tables), len(d.sections)))
    heads = []
    for par in d.paragraphs:
        t = (par.text or "").strip()
        if not t:
            continue
        st = (par.style.name or "")
        if st.lower().startswith("heading") or st.lower().startswith("title") or (len(t) < 90 and t[:1].isdigit()):
            heads.append("[%s] %s" % (st, t[:80]))
    p("  heading-like: %d" % len(heads))
    for h in heads[:60]:
        p("    " + h)
    for i, tb in enumerate(d.tables[:12], 1):
        p("  table%d: %dr x %dc | header=%s" % (i, len(tb.rows), len(tb.columns),
          " / ".join((c.text or "").strip()[:24] for c in tb.rows[0].cells[:6])))

def pptx(path):
    try:
        from pptx import Presentation
    except Exception as e:
        p("  (khong doc duoc pptx: %s)" % e); return
    pr = Presentation(path)
    p("  slides=%d size=%sx%s" % (len(pr.slides), pr.slide_width, pr.slide_height))
    for i, s in enumerate(pr.slides, 1):
        texts = []
        for sh in s.shapes:
            if sh.has_text_frame:
                t = " ".join(x.text.strip() for x in sh.text_frame.paragraphs if x.text.strip())
                if t:
                    texts.append(t[:70])
        p("    slide%d: shapes=%d | %s" % (i, len(s.shapes), " || ".join(texts[:2])))

for tag, folder in SETS.items():
    p("\n" + "=" * 78)
    p("BO %s  ->  %s" % (tag, folder))
    p("=" * 78)
    for f in sorted(glob.glob(os.path.join(folder, "**", "*"), recursive=True)):
        if not os.path.isfile(f):
            continue
        ext = os.path.splitext(f)[1].lower()
        size = os.path.getsize(f)
        p("\n[%s] %s  (%d bytes)" % (ext.lstrip(".").upper() or "?", f, size))
        try:
            if ext == ".xlsx":
                xlsx(f)
            elif ext == ".docx":
                docx(f)
            elif ext == ".pptx":
                pptx(f)
        except Exception as e:
            p("  LOI DOC: %s: %s" % (type(e).__name__, e))

txt = "\n".join(out)
io.open("_so_sanh_22_23.txt", "w", encoding="utf-8").write(txt)
print(txt[:14000])
print("\n[da ghi _so_sanh_22_23.txt, tong %d dong]" % len(out))
