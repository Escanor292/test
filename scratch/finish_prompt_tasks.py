# -*- coding: utf-8 -*-
"""Hoan tat 3 viec con lai cua PROMPT_HoanThienTaiLieu_23CT113.md:
A. Doi ten file ke hoach + cap nhat moi cho nhac ten cu
D. Them caption 'Bang N.' phia tren cac bang (Bao Cao Word + Test Report)
9.3-10. Them cau neu ngay thuc thi + moi truong + noi luu bang chung
"""
import glob
import os

import docx
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt
from docx.text.paragraph import Paragraph

T = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/"
REP = T + "Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"
TRP = T + "Test Report_23CT113_Nhom02.docx"
TP = T + "Test Plan_23CT113_Nhom02.docx"
OLD_NAME = "Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky"
NEW_NAME = "Nhom2_Ke_hoach_Bao_cao_cuoi_ky"
TNR = "Times New Roman"

# ---------------------------------------------------------------- A. rename
old_path = T + "TimeLine/" + OLD_NAME + ".docx"
new_path = T + "TimeLine/" + NEW_NAME + ".docx"
if os.path.exists(old_path) and not os.path.exists(new_path):
    os.rename(old_path, new_path)
    print("[A] renamed ->", os.path.basename(new_path))
elif os.path.exists(new_path):
    print("[A] file moi da ton tai")
else:
    print("[A] KHONG TIM THAY file cu")


def repl_in_doc(path):
    d = docx.Document(path)
    n = 0
    targets = list(d.paragraphs)
    for tb in d.tables:
        for row in tb.rows:
            for cell in row.cells:
                targets.extend(cell.paragraphs)
    for p in targets:
        if OLD_NAME not in p.text:
            continue
        done = False
        for r in p.runs:
            if OLD_NAME in r.text:
                r.text = r.text.replace(OLD_NAME, NEW_NAME)
                done = True
                n += 1
        if not done and p.runs:
            p.runs[0].text = p.text.replace(OLD_NAME, NEW_NAME)
            for r in p.runs[1:]:
                r.text = ""
            n += 1
    if n:
        d.save(path)
    return n


for f in [REP, TRP, TP, new_path]:
    print("   nhac ten cu trong", os.path.basename(f), "->", repl_in_doc(f))

# ---------------------------------------------------------------- D. captions
def add_captions(path, mapping):
    d = docx.Document(path)
    added = 0
    ti = 0
    for el in list(d.element.body.iterchildren()):
        if el.tag != qn("w:tbl"):
            continue
        text = mapping.get(ti)
        if text:
            prev = el.getprevious()
            already = False
            if prev is not None and prev.tag == qn("w:p"):
                t = "".join(n.text or "" for n in prev.iter(qn("w:t")))
                already = t.strip().startswith("Bảng ")
            if not already:
                p_el = OxmlElement("w:p")
                el.addprevious(p_el)
                p = Paragraph(p_el, d._body)
                run = p.add_run(text)
                run.font.size = Pt(11)
                run.font.name = TNR
                run.bold = True
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
                p.paragraph_format.space_before = Pt(6)
                p.paragraph_format.space_after = Pt(2)
                p.paragraph_format.keep_with_next = True
                added += 1
        ti += 1
    d.save(path)
    return added


REP_CAPS = {
    1: "Bảng 1. Danh sách 10 phân hệ nghiệp vụ kiểm thử",
    2: "Bảng 2. Danh sách tài khoản kiểm thử và cơ chế cấp quyền",
    3: "Bảng 3. Phân công trách nhiệm 5 thành viên trong nhóm",
    4: "Bảng 4. Phân bổ 42 yêu cầu kiểm thử theo 10 phân hệ",
    5: "Bảng 5. Kết quả thực thi 104 kịch bản kiểm thử theo phân hệ",
    6: "Bảng 6. Danh sách 26 lỗi phát hiện được trên hệ thống thật",
    7: "Bảng 7. Danh mục hồ sơ kiểm thử đính kèm",
}
print("[D] caption them vao Bao Cao Word:", add_captions(REP, REP_CAPS))

TR_CAPS = {
    0: "Bảng 1. Kết quả thực thi kiểm thử theo 10 phân hệ",
    1: "Bảng 2. Danh sách 26 lỗi phát hiện được (Bug Reports)",
}
print("[D] caption them vao Test Report:", add_captions(TRP, TR_CAPS))

# ---------------------------------------------------------------- 9.3-10 ngay thuc thi
d = docx.Document(REP)
SENT = (" Toàn bộ 104 kịch bản được thực thi thật trên môi trường Production "
        "https://test-gamma-azure-65.vercel.app từ ngày 20/10/2026 đến ngày 01/11/2026; "
        "bằng chứng thực thi lưu tại thư mục evidence/ (92 json response, 29 ảnh chụp màn hình, 7 log kiểm thử).")
done = False
for p in d.paragraphs:
    if p.text.strip().startswith("Hệ thống kiểm thử sử dụng") and "01/11/2026" not in p.text:
        run = p.add_run(SENT)
        run.font.size = Pt(12)
        run.font.name = TNR
        done = True
        break
if not done:
    for p in d.paragraphs:
        if "tài khoản seed" in p.text and "01/11/2026" not in p.text:
            run = p.add_run(SENT)
            run.font.size = Pt(12)
            run.font.name = TNR
            done = True
            break
d.save(REP)
print("[9.3] them cau ngay thuc thi:", done)

chk = docx.Document(REP)
print("caption trong bao cao:", sum(1 for p in chk.paragraphs if p.text.strip().startswith("Bảng ")),
      "| co 01/11/2026:", any("01/11/2026" in p.text for p in chk.paragraphs))
