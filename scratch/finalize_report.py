# -*- coding: utf-8 -*-
"""Hoan thien ban cuoi: nen trang bao cao (giu <= 15 trang) nhung khong mat noi dung bat buoc.
- Bo ngat trang truoc moi CHUONG (chi giu o MUC LUC / TAI LIEU THAM KHAO / PHU LUC A / PHU LUC B)
- Than bai: gian dong 1.15, khoang cach doan 3pt
- PHU LUC B: tom tat 7 dong/phien (trich tu 03 bien ban that), 11pt
- Tai lieu tham khao: 11pt, gian dong 1.0
"""
import glob
import re

import docx
from docx.shared import Pt, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH

BASE = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/"
REPORT = BASE + "Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"
MINUTES = sorted(glob.glob(BASE + "TimeLine/Biên Bản*.docx"))
TNR = "Times New Roman"

d = docx.Document(REPORT)

# ---------- 1. bo ngat trang chuong, nen than bai
for p in d.paragraphs:
    t = p.text.strip()
    if p.style.name == "Heading 1" and t.startswith("CHƯƠNG"):
        p.paragraph_format.page_break_before = False

st = d.styles["Normal"]
st.paragraph_format.line_spacing = 1.15
st.paragraph_format.space_before = Pt(0)
st.paragraph_format.space_after = Pt(3)
for p in d.paragraphs:
    if p.style.name == "Normal" and p.text.strip():
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.line_spacing = 1.15

# ---------- 2. rebuild PHU LUC B gon
idx_b = next(i for i, p in enumerate(d.paragraphs) if p.text.strip().startswith("PHỤ LỤC B"))
removed = 0
for p in d.paragraphs[idx_b + 1:]:
    p._element.getparent().remove(p._element)
    removed += 1
print("removed appendix-B paragraphs:", removed)

h1 = d.styles["Heading 1"]
h2 = d.styles["Heading 2"]


def add(text, size=11, italic=False, indent=0.55, after=1, bold=False):
    p = d.add_paragraph()
    run = p.add_run(text)
    run.font.size = Pt(size)
    run.font.name = TNR
    run.italic = italic
    run.bold = bold
    pf = p.paragraph_format
    pf.left_indent = Cm(indent)
    pf.first_line_indent = Cm(-indent)
    pf.space_after = Pt(after)
    pf.space_before = Pt(0)
    pf.line_spacing = 1.0
    return p


intro = add(
    "Nhóm 02 họp định kỳ 03 phiên trong 3 tuần thực hiện dự án (5/5 thành viên tham dự đầy đủ, chủ trì: "
    "Nguyễn Quách Phú Tài – Trưởng nhóm, thư ký: Bùi Đặng Quốc Khánh). Tóm tắt dưới đây trích từ 03 biên bản gốc "
    "lưu tại thư mục TimeLine/ của hồ sơ; toàn văn và hình ảnh minh chứng được nộp kèm.",
    size=11,
    indent=0,
    after=4,
)

for n, mf in enumerate(MINUTES, 1):
    md = docx.Document(mf)
    lines = [p.text.strip() for p in md.paragraphs if p.text.strip()]
    title = next(l for l in lines if l.startswith("BIÊN BẢN HỌP NHÓM")).replace("KIỂM THỨ &", "KIỂM THỬ &")
    core = title.split("—", 1)[1].strip() if "—" in title else title
    h = d.add_paragraph(f"B.{n}. Biên bản họp nhóm lần {n} — {core}", style=h2)
    h.paragraph_format.space_before = Pt(8)

    def pick(prefixes):
        return [l for l in lines if any(l.startswith(x) for x in prefixes)]

    time_l = pick(["• Thời gian"]) or ["• Thời gian: (theo biên bản gốc)"]
    place_l = pick(["• Địa điểm"])
    chair_l = pick(["• Chủ trì"])
    sec_l = pick(["• Thư ký"])
    attend_l = pick(["• Thành phần"])
    # noi dung chinh = cac bullet con lai (tru cac muc hanh chinh)
    skip = ("• Thời gian", "• Địa điểm", "• Chủ trì", "• Thư ký", "• Thành phần", "• Đề tài")
    content = [l[2:].strip() for l in lines if l.startswith("•") and not l.startswith(skip)]
    discuss = [l[2:].strip() for l in lines if l.startswith("- ")]
    concl = [l[2:].strip() for l in lines if l.startswith("✔")]

    add(time_l[0].replace("• ", "• Thời gian: ", 1) if "Thời gian:" not in time_l[0] else time_l[0])
    if place_l:
        add(place_l[0])
    if chair_l and sec_l:
        chair = chair_l[0].replace("• Chủ trì cuộc họp: ", "").strip()
        sec = sec_l[0].replace("• Thư ký ghi chép: ", "").strip()
        add(f"• Chủ trì: {chair} | Thư ký: {sec}")
    if attend_l and n == 1:
        add(attend_l[0])
    if content:
        add("• Nội dung chính: " + "; ".join(content) + ".")
    if discuss:
        add("• Diễn biến: " + " ".join(discuss))
    if concl:
        add("• Kết luận & phân công: " + "; ".join(concl) + ".")
    add(
        f"Biên bản kết thúc lúc 11h30 cùng ngày; 5/5 thành viên đọc lại, đồng ý 100% và ký xác nhận.",
        italic=True,
        indent=0.55,
        after=2,
    )

# ---------- 3. tai lieu tham khao 11pt
for p in d.paragraphs:
    t = p.text.strip()
    if re.match(r"^\[\d\] ", t):
        p.paragraph_format.line_spacing = 1.0
        p.paragraph_format.space_after = Pt(2)
        for r in p.runs:
            r.font.size = Pt(11)

# ---------- 4. dam bao MUC LUC + THAM KHAO + PHU LUC bat dau trang moi
for p in d.paragraphs:
    t = p.text.strip()
    if p.style.name == "Heading 1" and (t.startswith(("MỤC LỤC", "TÀI LIỆU THAM KHẢO", "PHỤ LỤC"))):
        p.paragraph_format.page_break_before = True

d.save(REPORT)
chk = docx.Document(REPORT)
print("report saved: paras", len(chk.paragraphs), "| H1:",
      sum(1 for p in chk.paragraphs if p.style.name == "Heading 1"),
      "| H2:", sum(1 for p in chk.paragraphs if p.style.name == "Heading 2"))
