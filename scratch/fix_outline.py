# -*- coding: utf-8 -*-
"""Sua 4 loi cau truc/thu tu con lai:
A. Test Plan: 3.1 dang Normal, 3.2 dang Heading 2 -> tach tieu de khoi than doan, ca hai thanh Heading 2
B. Test Report: 5.1 la Heading 2 nhung nuot ca bullet vao tieu de -> tach bullet ra doan thuong
C. Bien ban 2 & 3: thieu muc '5. HINH ANH MINH CHUNG PHIEN HOP' (bien ban 1 co) -> chen truoc anh
D. Bao Cao Word: 'MUC LUC' dang la Heading 1 nen tu lot vao TOC -> doi ve Normal
"""
import copy
import docx
from docx.oxml.ns import qn
from docx.shared import Pt
from docx.text.paragraph import Paragraph

T = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/"
TP = T + "Test Plan_23CT113_Nhom02.docx"
TR = T + "Test Report_23CT113_Nhom02.docx"
REP = T + "Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"


def set_text(p, text, style, size=12, bold=False):
    for r in list(p.runs):
        r._r.getparent().remove(r._r)
    p.style = style
    run = p.add_run(text)
    run.font.name = "Times New Roman"
    run.font.size = Pt(size)
    run.bold = bold
    return p


def clone_after(p):
    """Nhan ban paragraph p, chen ngay sau p, tra ve Paragraph cua ban sao."""
    new_el = copy.deepcopy(p._p)
    p._p.addnext(new_el)
    return Paragraph(new_el, p._parent)


# ---------- A. Test Plan 3.1 / 3.2 ----------
d = docx.Document(TP)
n = 0
for p in list(d.paragraphs):
    t = p.text.strip()
    if not (t.startswith("3.1.") or t.startswith("3.2.")):
        continue
    head, sep, rest = t.partition(":")
    head = (head + (sep or "")).strip()
    body = rest.strip()
    newp = clone_after(p)
    set_text(p, head, "Heading 2", 13, True)
    set_text(newp, body, "Normal", 12, False)
    n += 1
d.save(TP)
print("[A] Test Plan: tach tieu de 3.x ->", n, "muc")

# ---------- B. Test Report 5.1 ----------
d = docx.Document(TR)
n = 0
for p in list(d.paragraphs):
    t = p.text.strip()
    if not t.startswith("5.1."):
        continue
    head, sep, rest = t.partition(":")
    newp = clone_after(p)
    set_text(p, (head + (sep or "")).strip(), "Heading 2", 13, True)
    items = [x.strip() for x in rest.replace("\n", " • ").split("•") if x.strip()]
    if items:
        set_text(newp, "• " + items[0], "Normal", 12)
        anchor = newp
        for it in items[1:]:
            extra = clone_after(anchor)
            set_text(extra, "• " + it, "Normal", 12)
            anchor = extra
    n += 1
d.save(TR)
print("[B] Test Report: tach 5.1 ->", n, "muc, so bullet:", len(items) if n else 0)

# ---------- C. Bien ban 2 & 3: them muc 5 ----------
for i in (2, 3):
    f = T + "TimeLine/Biên Bản Họp Nhóm Lần %d – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx" % i
    b = docx.Document(f)
    if any(p.text.strip().startswith("5. HÌNH ẢNH") for p in b.paragraphs):
        print("[C] bien ban", i, "da co muc 5 - bo qua")
        continue
    done = False
    for p in b.paragraphs:
        if p._p.findall(".//" + qn("a:blip")) or p._p.findall(".//" + qn("w:drawing")):
            hp = p.insert_paragraph_before("5. HÌNH ẢNH MINH CHỨNG PHIÊN HỌP", style="Heading 1")
            for r in hp.runs:
                r.font.name = "Times New Roman"
                r.font.size = Pt(13)
            done = True
            break
    b.save(f)
    print("[C] bien ban", i, "-> chen muc 5:", done)

# ---------- D. Bao Cao: MUC LUC khong phai Heading ----------
d = docx.Document(REP)
done = False
for p in d.paragraphs:
    if p.text.strip() == "MỤC LỤC" and p.style.name == "Heading 1":
        p.style = "Normal"
        done = True
        break
d.save(REP)
print("[D] Bao Cao: MUC LUC -> Normal:", done)

# ---------- kiem lai ----------
print("\n--- KIEM LAI ---")
for f, want in [(TP, "Test Plan"), (TR, "Test Report"), (REP, "Bao Cao")]:
    dd = docx.Document(f)
    h1 = [p.text.strip()[:46] for p in dd.paragraphs if p.style.name == "Heading 1"]
    h2 = [p.text.strip()[:46] for p in dd.paragraphs if p.style.name == "Heading 2"]
    print("%-12s H1=%d H2=%d" % (want, len(h1), len(h2)))
    for x in h2:
        print("      H2:", x)
for i in (1, 2, 3):
    bb = docx.Document(T + "TimeLine/Biên Bản Họp Nhóm Lần %d – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx" % i)
    h1 = [p.text.strip()[:40] for p in bb.paragraphs if p.style.name == "Heading 1"]
    print("bien ban %d: H1=%d %s" % (i, len(h1), h1[-1] if h1 else ""))
