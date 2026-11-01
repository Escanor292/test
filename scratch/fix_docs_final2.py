# -*- coding: utf-8 -*-
"""v2 - Sua dinh dang + bo sung muc con thieu cho ho so Word do an Kiem thu (Nhom 02).
Khac ban v1: nhan dien dung khoi MUC LUC go tay (khong nham voi tieu de CHUONG o than bai),
va bo qua moi dong muc luc kieu '....  Trang N' khi gan Heading.
"""
import glob
import re
from collections import Counter

import docx
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor, Cm
from docx.text.paragraph import Paragraph

BASE = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/"
REPORT = BASE + "Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"
TEST_PLAN = BASE + "Test Plan_23CT113_Nhom02.docx"
TEST_REPORT = BASE + "Test Report_23CT113_Nhom02.docx"
KEHOACH = BASE + "TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx"
MINUTES = sorted(glob.glob(BASE + "TimeLine/Biên Bản*.docx"))

H1_RE = re.compile(r"^(CHƯƠNG\s+\d+\.|PHỤ LỤC|TÀI LIỆU THAM KHẢO|MỤC LỤC)")
H2_RE = re.compile(r"^(\d+\.\d+\.|[AB]\.\d+\.)")
SEC_RE = re.compile(r"^\d+\.\s+\S")
PCT_RE = re.compile(r"(\d)\.(\d+)\s*%")
TNR = "Times New Roman"


def is_toc_line(t):
    """True voi cac dong muc luc go tay: co dot leader / 'Trang N' / ky tu leader."""
    return (".." in t and "Trang" in t) or t.count("·") > 3 or t.count(".") > 12


def force_tnr(el):
    rpr = el.get_or_add_rPr()
    rf = rpr.get_or_add_rFonts()
    for a in ("w:ascii", "w:hAnsi", "w:eastAsia", "w:cs"):
        rf.set(qn(a), TNR)


def set_normal(doc):
    st = doc.styles["Normal"]
    st.font.name = TNR
    st.font.size = Pt(12)
    force_tnr(st.element)


def heading_style(doc, name, size, outline, before, after):
    try:
        st = doc.styles[name]
    except KeyError:
        st = doc.styles.add_style(name, WD_STYLE_TYPE.PARAGRAPH)
        st.base_style = doc.styles["Normal"]
    st.font.name = TNR
    st.font.size = Pt(size)
    st.font.bold = True
    st.font.italic = False
    st.font.color.rgb = RGBColor(0, 0, 0)
    force_tnr(st.element)
    pf = st.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    pf.line_spacing = 1.15
    pf.keep_with_next = True
    pf.alignment = WD_ALIGN_PARAGRAPH.LEFT
    ppr = st.element.get_or_add_pPr()
    for old in ppr.findall(qn("w:outlineLvl")):
        ppr.remove(old)
    ol = OxmlElement("w:outlineLvl")
    ol.set(qn("w:val"), str(outline))
    rpr_el = ppr.find(qn("w:rPr"))
    if rpr_el is not None:
        rpr_el.addprevious(ol)
    else:
        ppr.append(ol)
    return st


def clear_page_breaks(p):
    for br in p._element.findall(".//" + qn("w:br")):
        if br.get(qn("w:type")) == "page":
            br.getparent().remove(br)


def new_par_before(anchor, text="", style=None):
    p_el = OxmlElement("w:p")
    anchor._element.addprevious(p_el)
    p = Paragraph(p_el, anchor._parent)
    if style is not None:
        p.style = style
    if text:
        p.add_run(text)
    return p


def add_field(p, instr, placeholder):
    r = p.add_run()
    fc = OxmlElement("w:fldChar")
    fc.set(qn("w:fldCharType"), "begin")
    r._r.append(fc)
    r2 = p.add_run()
    it = OxmlElement("w:instrText")
    it.set(qn("xml:space"), "preserve")
    it.text = instr
    r2._r.append(it)
    r3 = p.add_run()
    sep = OxmlElement("w:fldChar")
    sep.set(qn("w:fldCharType"), "separate")
    r3._r.append(sep)
    if placeholder:
        p.add_run(placeholder)
    r4 = p.add_run()
    end = OxmlElement("w:fldChar")
    end.set(qn("w:fldCharType"), "end")
    r4._r.append(end)


def fix_percent(doc):
    n = 0
    targets = [p for p in doc.paragraphs]
    for tb in doc.tables:
        for row in tb.rows:
            for cell in row.cells:
                targets.extend(cell.paragraphs)
    for p in targets:
        for r in p.runs:
            if "%" in r.text and PCT_RE.search(r.text):
                new = PCT_RE.sub(r"\1,\2%", r.text)
                if new != r.text:
                    r.text = new
                    n += 1
    return n


def apply_headings(doc, h1, h2, report_mode=False):
    counts = {1: 0, 2: 0}
    for p in doc.paragraphs:
        t = p.text.strip()
        if not t or is_toc_line(t):
            continue
        is_h1 = bool(H1_RE.match(t)) if report_mode else bool(SEC_RE.match(t))
        if is_h1:
            clear_page_breaks(p)
            p.style = h1
            p.paragraph_format.page_break_before = True
            counts[1] += 1
        elif H2_RE.match(t) and not is_toc_line(t):
            p.style = h2
            counts[2] += 1
    return counts


# ---------------------------------------------------------------- bug data
tr_doc = docx.Document(TEST_REPORT)
bug_tb = next(tb for tb in tr_doc.tables if [c.text.strip() for c in tb.rows[0].cells][0].upper() == "BUG-ID")
bug_rows = [[c.text.strip() for c in r.cells] for r in bug_tb.rows[1:]]
bug_cnt = Counter(r[3] for r in bug_rows)
bug_ex = {}
for sev in ("High", "Medium", "Low"):
    bug_ex[sev] = [(t[:38] + "…") if len(t) > 38 else t for t in [r[2] for r in bug_rows if r[3] == sev][:2]]
BUG_LINE = (
    "- 26 Bug Reports được phân loại chặt chẽ theo mức độ: "
    f"{bug_cnt['High']} High ({'; '.join(bug_ex['High'])}), "
    f"{bug_cnt['Medium']} Medium ({'; '.join(bug_ex['Medium'])}), "
    f"{bug_cnt['Low']} Low ({'; '.join(bug_ex['Low'])})"
)
print("BUG LINE ->", BUG_LINE)

# ---------------------------------------------------------------- report
d = docx.Document(REPORT)
set_normal(d)
h1 = heading_style(d, "Heading 1", 13, 0, 12, 6)
h2 = heading_style(d, "Heading 2", 12, 1, 8, 4)

paras = d.paragraphs
i_toc = next(i for i, p in enumerate(paras) if p.text.strip().startswith("MỤC LỤC"))
i_body = next(
    i
    for i, p in enumerate(paras)
    if i > i_toc and p.text.strip().startswith("CHƯƠNG 1.") and not is_toc_line(p.text)
)
block = paras[i_toc:i_body]
print(f"[report] khoi MUC LUC go tay: {len(block)} doan, xoa het")
for p in block:
    p._element.getparent().remove(p._element)

anchor_ch1 = next(
    p for p in d.paragraphs if p.text.strip().startswith("CHƯƠNG 1.") and not is_toc_line(p.text)
)

p_toc_title = new_par_before(anchor_ch1, "MỤC LỤC", h1)
clear_page_breaks(p_toc_title)
p_toc_title.paragraph_format.page_break_before = True
p_toc = new_par_before(anchor_ch1)
p_toc.paragraph_format.space_after = Pt(6)
add_field(p_toc, ' TOC \\o "1-2" \\h \\z \\u ', "Mục lục tự động — nhấn Ctrl+A rồi F9 để cập nhật số trang.")
for r in p_toc.runs:
    r.font.size = Pt(12)
    r.font.name = TNR

fixed_sz = 0
for p in d.paragraphs:
    for r in p.runs:
        if r.font.size is not None and r.font.size.pt in (10, 10.5):
            r.font.size = Pt(12)
            fixed_sz += 1
print(f"[report] nang {fixed_sz} run 10/10.5pt -> 12pt")

# TAI LIEU THAM KHAO + PHU LUC A
anchor_pl = next(
    p for p in d.paragraphs if p.text.strip().startswith("PHỤ LỤC") and not is_toc_line(p.text.strip())
)
for r in anchor_pl.runs:
    r.text = ""
anchor_pl.runs[0].text = "PHỤ LỤC A. DANH MỤC HỒ SƠ KIỂM THỬ ĐÍNH KÈM"

REFS = [
    "IEEE Computer Society, IEEE Std 829-2008 — IEEE Standard for Software and System Test Documentation, IEEE, New York, 2008.",
    "ISTQB, Certified Tester Foundation Level Syllabus v4.0, International Software Testing Qualifications Board, 2023 (https://www.istqb.org).",
    "G. J. Myers, C. Sandler, T. Badgett, The Art of Software Testing, 3rd edition, John Wiley & Sons, New Jersey, 2011.",
    "Vercel, Next.js 15 Documentation — App Router, Routing và Route Handlers (https://nextjs.org/docs).",
    "Prisma, Prisma ORM Documentation — Schema, Migration và Prisma Client (https://www.prisma.io/docs).",
    "Auth.js, Auth.js (NextAuth v5) Documentation — Authentication, Session và Callback (https://authjs.dev).",
    "Nhóm 02, Mã nguồn hệ thống Tử Tế Fund (bản build Production v1.0) và Web Demo https://test-gamma-azure-65.vercel.app, 2026.",
    "Nhóm 02, Hồ sơ kiểm thử đính kèm: 01-IC-Product-Requirements, Test Case (RTM/TR/TC/TR List), TimeLine và thư mục evidence/, 2026.",
]

p_ref_h = new_par_before(anchor_pl, "TÀI LIỆU THAM KHẢO", h1)
clear_page_breaks(p_ref_h)
p_ref_h.paragraph_format.page_break_before = True
for i, ref in enumerate(REFS, 1):
    p = new_par_before(anchor_pl, f"[{i}] {ref}")
    pf = p.paragraph_format
    pf.left_indent = Cm(0.9)
    pf.first_line_indent = Cm(-0.9)
    pf.space_after = Pt(4)
    pf.line_spacing = 1.15
    for r in p.runs:
        r.font.size = Pt(12)
        r.font.name = TNR

# PHU LUC B: tom tat 3 bien ban
p_bl = d.add_paragraph("PHỤ LỤC B. BIÊN BẢN HỌP NHÓM (03 PHIÊN)", style=h1)
clear_page_breaks(p_bl)
p_bl.paragraph_format.page_break_before = True
intro = d.add_paragraph(
    "Nhóm 02 tổ chức 03 phiên họp định kỳ trong 3 tuần thực hiện dự án. Nội dung tóm tắt dưới đây "
    "được trích nguyên văn từ 03 biên bản gốc lưu tại thư mục TimeLine/ của hồ sơ nộp bài."
)
intro.paragraph_format.space_after = Pt(6)
for r in intro.runs:
    r.font.size = Pt(12)

for n, mf in enumerate(MINUTES, 1):
    md = docx.Document(mf)
    lines = [p.text.strip() for p in md.paragraphs if p.text.strip()]
    title = next(l for l in lines if l.startswith("BIÊN BẢN HỌP NHÓM")).replace("KIỂM THỨ &", "KIỂM THỬ &")
    core = title.split("—", 1)[1].strip() if "—" in title else title
    ph = d.add_paragraph(f"B.{n}. Biên bản họp nhóm lần {n} — {core}", style=h2)
    ph.paragraph_format.space_before = Pt(10)
    for l in lines:
        if not (l.startswith("•") or l.startswith("✔") or l.startswith("- ")):
            continue
        if n > 1 and l.startswith("• Đề tài:"):
            continue
        p = d.add_paragraph(l)
        pf = p.paragraph_format
        pf.left_indent = Cm(0.6)
        pf.first_line_indent = Cm(-0.6)
        pf.space_after = Pt(2)
        pf.space_before = Pt(0)
        pf.line_spacing = 1.1
        for r in p.runs:
            r.font.size = Pt(12)
            r.font.name = TNR
    close = d.add_paragraph(
        "Biên bản kết thúc lúc 11h30 cùng ngày; 5/5 thành viên đã đọc lại, đồng ý 100% và ký xác nhận "
        "(chữ ký Thư ký Bùi Đặng Quốc Khánh và Trưởng nhóm Nguyễn Quách Phú Tài)."
    )
    close.paragraph_format.space_after = Pt(4)
    for r in close.runs:
        r.font.size = Pt(12)
        r.italic = True

p_note = d.add_paragraph(
    "Toàn văn 03 biên bản (kèm hình ảnh minh chứng phiên họp) được nộp riêng trong thư mục TimeLine/ "
    "của hồ sơ: Biên Bản Họp Nhóm Lần 1/2/3 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx kèm hình ảnh minh chứng."
)
p_note.paragraph_format.space_before = Pt(8)
for r in p_note.runs:
    r.font.size = Pt(12)

sec = d.sections[0]
fp = sec.footer.paragraphs[0]
fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
for r in list(fp.runs):
    r._r.getparent().remove(r._r)
add_field(fp, " PAGE ", "1")
for r in fp.runs:
    r.font.size = Pt(11)
    r.font.name = TNR

pc = fix_percent(d)
cnt = apply_headings(d, h1, h2, report_mode=True)
d.save(REPORT)
leftover = sum(1 for p in docx.Document(REPORT).paragraphs if is_toc_line(p.text))
print(f"[report] Heading1={cnt[1]} Heading2={cnt[2]} percent_fixed={pc} dong_muc_luc_con_lai={leftover} -> saved")

# ---------------------------------------------------------------- other docs
for f in [TEST_PLAN, TEST_REPORT, KEHOACH] + MINUTES:
    dd = docx.Document(f)
    set_normal(dd)
    h1x = heading_style(dd, "Heading 1", 13, 0, 12, 6)
    h2x = heading_style(dd, "Heading 2", 12, 1, 8, 4)
    name = f.split("/")[-1]
    if "Lần 3" in name:
        for p in dd.paragraphs:
            t = p.text.strip()
            if t.startswith("BIÊN BẢN HỌP NHÓM") and "KIỂM THỨ" in t:
                for r in list(p.runs):
                    r.text = r.text.replace("KIỂM THỨ &", "KIỂM THỬ &")
            if t.startswith("- 26 Bug Reports được phân loại"):
                for r in list(p.runs):
                    r._r.getparent().remove(r._r)
                run = p.add_run(BUG_LINE)
                run.font.size = Pt(12)
                run.font.name = TNR
    pc = fix_percent(dd)
    cnt = apply_headings(dd, h1x, h2x)
    dd.save(f)
    print(f"[{name}] Heading1={cnt[1]} Heading2={cnt[2]} percent_fixed={pc} -> saved")

print("\nDONE v2")
