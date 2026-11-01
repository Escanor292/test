# -*- coding: utf-8 -*-
"""Dung PPT bao cao 23CT113 tren nen filenengoc.pptx (giu nguyen nen + 2 logo).

Cau truc bam theo bai mau nhom 22 (22CT115_Nhom07):
  bia -> gioi thieu (thanh vien + GVHD) -> gioi thieu de tai -> cac nhiem vu
  -> TEST PLAN (pham vi & muc tieu / tieu chi & tai nguyen / rui ro)
  -> TEST CASE (thiet ke / mot so TC tieu bieu)
  -> TEST REPORT (tong quan & theo phan he / bao cao loi)
  -> khuyen nghi - quyet dinh - ket luan.
Toan bo so lieu doc dong tu Excel, Test Plan, Test Report (khong go tay).
"""
import copy, os, re, zipfile
from collections import Counter, OrderedDict
from lxml import etree
from openpyxl import load_workbook
from docx import Document
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

BASE = "filenengoc.pptx"
DOC = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)"
OUT_DIR = os.path.join(DOC, "Word+ppt Báo Cáo")
OUT = os.path.join(OUT_DIR, "Nhom02_Final_Presentation.pptx")
EVI = os.path.join(DOC, "evidence")
XLSX = os.path.join(DOC, "Test Case_23CT113_Nhom02.xlsx")
P_NS = "http://schemas.openxmlformats.org/presentationml/2006/main"
A_NS = "http://schemas.openxmlformats.org/drawingml/2006/main"
R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"

# ---------- 1. doc so lieu that ----------
cnt = {}
for f in os.listdir(EVI):
    ext = os.path.splitext(f)[1].lower().lstrip(".")
    cnt[ext] = cnt.get(ext, 0) + 1
n_json, n_png = cnt.get("json", 0), cnt.get("png", 0)
n_log = cnt.get("log", 0) + cnt.get("txt", 0)
print("[EVIDENCE] %s" % cnt)

wb = load_workbook(XLSX, data_only=True)
tc_ws = wb["TC List"]
tcs = []
for r in range(2, tc_ws.max_row + 1):
    v = [tc_ws.cell(r, c).value for c in range(1, 13)]
    if v[1]:
        tcs.append(v)
n_tc = len(tcs)
n_pass = sum(1 for v in tcs if str(v[9]).strip().upper() == "PASS")
n_fail = sum(1 for v in tcs if str(v[9]).strip().upper() == "FAIL")
pri = Counter(str(v[4]).strip() for v in tcs)
tr_ids = {str(v[0]).strip() for v in tcs if v[0]}
sub = OrderedDict()
for v in tcs:
    key = str(v[2]).strip()
    a = sub.setdefault(key, [0, 0, 0])
    a[0] += 1
    if str(v[9]).strip().upper() == "PASS":
        a[1] += 1
    elif str(v[9]).strip().upper() == "FAIL":
        a[2] += 1
rate = 100.0 * n_pass / n_tc
print("[TC] tong=%d pass=%d fail=%d (%.1f%%) | TR=%d | uu tien=%s" % (n_tc, n_pass, n_fail, rate, len(tr_ids), dict(pri)))
print("[SUB] %s" % {k: v for k, v in sub.items()})

# ten phan he lay tu bang 2 cua Word bao cao
names = {}
try:
    bw = Document(os.path.join(OUT_DIR, "Báo Cáo Word_23CT113_Nhom02.docx"))
    for tb in bw.tables:
        hdr = [c.text.strip() for c in tb.rows[0].cells]
        if "Mã" in hdr and any("Tên Phân hệ" in h for h in hdr):
            ci = hdr.index("Mã")
            ni = [i for i, h in enumerate(hdr) if "Tên Phân hệ" in h][0]
            for row in tb.rows[1:]:
                names[row.cells[ci].text.strip()] = row.cells[ni].text.strip()
except Exception as e:
    print("[WARN] khong doc duoc ten phan he:", e)
print("[SUB NAME] %d ten" % len(names))

# rui ro lay tu Test Plan (bang co cot 'Mã Rủi ro')
risks = []
try:
    tp = Document(os.path.join(DOC, "Test Plan_23CT113_Nhom02.docx"))
    for tb in tp.tables:
        hdr = [c.text.strip() for c in tb.rows[0].cells]
        if any("Rủi ro" in h for h in hdr):
            di = [i for i, h in enumerate(hdr) if "Mô tả" in h or "Rủi ro Tiềm" in h]
            mi = [i for i, h in enumerate(hdr) if "Biện pháp" in h]
            if di and mi:
                for row in tb.rows[1:]:
                    code = row.cells[0].text.strip()
                    desc = row.cells[di[0]].text.strip()
                    mit = row.cells[mi[0]].text.strip()
                    if desc:
                        risks.append((code, desc, mit))
except Exception as e:
    print("[WARN] khong doc duoc rui ro:", e)
print("[RISK] %d dong" % len(risks))

# muc do loi lay tu Test Report
sev = Counter()
try:
    rep = Document(os.path.join(DOC, "Test Report_23CT113_Nhom02.docx"))
    for tb in rep.tables:
        hdr = [c.text.strip() for c in tb.rows[0].cells]
        if "Mức độ" in hdr:
            idx = hdr.index("Mức độ")
            for row in tb.rows[1:]:
                if row.cells[0].text.strip():
                    sev[row.cells[idx].text.strip()] += 1
except Exception as e:
    print("[WARN] khong doc duoc muc do loi:", e)
n_bug = sum(sev.values())
print("[BUG] %d phieu | %s" % (n_bug, dict(sev)))

# mau TC tieu bieu: 2 PASS + 2 FAIL mo ta ngan
sample = []
for want in ("PASS", "FAIL"):
    n = 0
    for v in tcs:
        if str(v[9]).strip().upper() == want and len(str(v[3])) <= 78:
            sample.append((str(v[1]), str(v[2]), str(v[3]).strip(), str(v[4]).strip(), want))
            n += 1
            if n == 2:
                break

def vn(x, nd=1):
    """So thap phan kieu Viet Nam: 73,1"""
    return (("%." + str(nd) + "f") % x).replace(".", ",")


INK = RGBColor(0x1F, 0x2A, 0x37)
SUB = RGBColor(0x55, 0x60, 0x6D)
ACCENT = RGBColor(0xC0, 0x39, 0x2B)

# ---------- 2. mo file nen ----------
prs = Presentation(BASE)
print("[BASE] slides=%d size=%.2fx%.2f in" % (len(prs.slides), prs.slide_width / 914400, prs.slide_height / 914400))
cover = prs.slides[0]
BLANK = prs.slide_layouts[6]


def strip_placeholders(slide):
    for ph in list(slide.placeholders):
        ph._element.getparent().remove(ph._element)


ON_DARK = RGBColor(0xE6, 0xEC, 0xF6)  # chu sang tren dai mau dam cuoi slide
FONT = "Times New Roman"
BUMP = 5  # tang ~5 co chu cho de doc (yeu cau 02/11/2026)


def _set_font(run):
    run.font.name = FONT


def _est_height(items, w, h, bump):
    """Uoc chieu cao chu (inch) de khong tran khung khi tang co."""
    tot = 0.0
    for it in items:
        size = it.get("size", 19) + it.get("bump", bump)
        per = max(8, int((w - 0.1) * 72 / (0.50 * size)))
        lines = 0
        for seg in str(it["text"]).splitlines():
            lines += max(1, -(-len(seg) // per))
        tot += lines * size * it.get("line_spacing", 1.05) / 72 + it.get("space_after", 9) / 72
    return tot


def textbox(slide, l, t, w, h, items, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP):
    bump = BUMP
    while bump > 0 and _est_height(items, w, h, bump) > h:
        bump -= 1
    tb = slide.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = Inches(0.05)
    tf.margin_top = tf.margin_bottom = 0
    for i, it in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = it.get("align", align)
        p.space_after = Pt(it.get("space_after", 9))
        p.space_before = Pt(it.get("space_before", 0))
        p.line_spacing = it.get("line_spacing", 1.05)
        r = p.add_run()
        r.text = it["text"]
        r.font.size = Pt(it.get("size", 19) + it.get("bump", bump))
        r.font.bold = it.get("bold", False)
        r.font.italic = it.get("italic", False)
        _set_font(r)
        r.font.color.rgb = it.get("color", INK)
    return tb


def accent_line(slide, l, t, w):
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(l), Inches(t), Inches(w), Inches(0.055))
    bar.fill.solid()
    bar.fill.fore_color.rgb = ACCENT
    bar.line.fill.background()
    bar.shadow.inherit = False
    return bar


FOOT = "Kiểm thử và Đảm bảo Chất lượng Phần mềm  •  Nhóm 02  •  23CT113  •  Tử Tế Fund"


def content_slide(eyebrow, title, bullets, footer_no, table=None, note=None, row_h=0.6, col_w=None):
    s = prs.slides.add_slide(BLANK)
    strip_placeholders(s)
    if eyebrow:
        textbox(s, 2.85, 1.02, 14.2, 0.4,
                [dict(text=eyebrow, size=13, bold=True, color=ACCENT, space_after=0)])
    textbox(s, 2.85, 1.42, 14.4, 0.9,
            [dict(text=title, size=32, bold=True, space_after=0)], anchor=MSO_ANCHOR.MIDDLE)
    accent_line(s, 2.9, 2.32, 3.0)
    y = 2.68
    if bullets:
        n_line = sum(max(1, -(-len(b) // 78)) for b in bullets)
        table_h = (row_h * table[0]) if table is not None else 0.0
        avail = (9.55 - table_h - (0.55 if note else 0.0)) - y
        h_bul = min(1.3 + 0.42 * n_line, max(1.1, avail))
        textbox(s, 0.95, y, 18.1, h_bul,
                [dict(text=b, size=19, space_after=9) for b in bullets])
        y += h_bul + 0.12
    if table is not None:
        rows, cols, data = table
        h = row_h * rows
        if y + h > 9.9:
            h = 9.9 - y
        gt = s.shapes.add_table(rows, cols, Inches(0.95), Inches(y), Inches(18.1), Inches(h)).table
        if col_w:
            for ci, wdt in enumerate(col_w):
                gt.columns[ci].width = Inches(wdt)
        for ri, row in enumerate(data):
            for ci, val in enumerate(row):
                cell = gt.cell(ri, ci)
                cell.text = ""
                p = cell.text_frame.paragraphs[0]
                r = p.add_run()
                r.text = str(val)
                r.font.size = Pt((15 if ri == 0 else 14) + BUMP)
                r.font.bold = (ri == 0)
                _set_font(r)
                r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF) if ri == 0 else INK
                cell.margin_left = cell.margin_right = Inches(0.07)
                cell.margin_top = cell.margin_bottom = 0
                cell.vertical_anchor = MSO_ANCHOR.MIDDLE
    if note:
        textbox(s, 0.95, 9.68, 18.1, 0.42, [dict(text=note, size=14, bump=2, italic=True, color=ON_DARK, space_after=0)])
    textbox(s, 0.95, 10.5, 15.0, 0.4, [dict(text=FOOT, size=11, bump=1, color=ON_DARK, space_after=0)])
    textbox(s, 18.2, 10.5, 1.2, 0.4, [dict(text=str(footer_no), size=12, bump=1, color=ON_DARK, space_after=0)],
            align=PP_ALIGN.RIGHT)
    return s


# ---------- 3. bia ----------
textbox(cover, 1.2, 2.95, 17.6, 0.6,
        [dict(text="TRƯỜNG ĐẠI HỌC LẠC HỒNG  •  KHOA CÔNG NGHỆ THÔNG TIN",
              size=16, bold=True, color=SUB, space_after=0)], align=PP_ALIGN.CENTER)
textbox(cover, 1.2, 3.6, 17.6, 1.8,
        [dict(text="BÁO CÁO TỔNG KẾT HỌC PHẦN\nKIỂM THỬ VÀ ĐẢM BẢO CHẤT LƯỢNG PHẦN MỀM",
              size=40, bold=True, space_after=0, line_spacing=1.1)], align=PP_ALIGN.CENTER)
accent_line(cover, 8.0, 5.8, 4.0)
textbox(cover, 1.2, 6.1, 17.6, 2.4, [
    dict(text="Đề tài: Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)", size=24, bold=True, space_after=14),
    dict(text="Lớp 23CT113 — Nhóm 02  •  Giảng viên hướng dẫn: ThS. Nguyễn Minh Phúc", size=17, color=SUB, space_after=18),
    dict(text="Nguyễn Quách Phú Tài (NT)  •  Trần Xuân Ân  •  Bùi Đặng Quốc Khánh  •  Nguyễn Trung Tiến  •  Nguyễn Khánh Du",
         size=15, color=SUB, space_after=8),
    dict(text="Đồng Nai, tháng 11 năm 2026  •  https://test-gamma-azure-65.vercel.app",
         size=14, italic=True, color=SUB, space_after=0),
], align=PP_ALIGN.CENTER)

# ---------- 4. 11 slide noi dung theo cau truc nhom 22 ----------
# 2. Gioi thieu — thanh vien & GVHD
content_slide("PHẦN 1 — GIỚI THIỆU", "Thành viên nhóm và giáo viên hướng dẫn", [], 2,
              table=(6, 4, [
                  ["Thành viên", "MSSV", "Vai trò", "Phân hệ phụ trách"],
                  ["Nguyễn Quách Phú Tài", "123000609", "Nhóm trưởng", "AUTH (xác thực), KYC (định danh)"],
                  ["Trần Xuân Ân", "123001127", "Thành viên", "CAMP (chiến dịch), REWARD (quà tặng)"],
                  ["Bùi Đặng Quốc Khánh", "123001005", "Thành viên", "PLEDGE (ủng hộ), CERT (chứng nhận)"],
                  ["Nguyễn Trung Tiến", "123000127", "Thành viên", "COMM (cộng đồng), BLOG (nội dung)"],
                  ["Nguyễn Khánh Du", "123000159", "Thành viên", "CHAT (trò chuyện), ADMIN (quản trị)"],
              ]), row_h=0.85, col_w=[5.6, 2.6, 3.2, 6.7],
              note="Giảng viên hướng dẫn: ThS. Nguyễn Minh Phúc  •  Lớp 23CT113  •  Mỗi thành viên phụ trách 2 phân hệ, tham gia cả 3 làn thực thi và trình bày 2–3 phút.")

# 3. Gioi thieu de tai
content_slide("PHẦN 1 — GIỚI THIỆU", "Giới thiệu đề tài", [
    "• Tử Tế Fund là nền tảng gây quỹ cộng đồng: tạo chiến dịch, tặng quà tri ân, ủng hộ qua VietQR.",
    "• Điểm khác biệt: ký quỹ ngân hàng (escrow), sao kê công khai, chứng nhận điện tử tra cứu tại /lookup.",
    "• Sản phẩm thật đang chạy Production: https://test-gamma-azure-65.vercel.app (Next.js 15, React 19, Neon PostgreSQL).",
    "• 10 phân hệ nghiệp vụ, 42 yêu cầu kiểm thử suy ra trực tiếp từ route, API và schema Prisma.",
    "• Mục đích đồ án: áp dụng quy trình kiểm thử vào sản phẩm thật, không dùng dữ liệu mô phỏng.",
], 3, note="Nhóm chọn kiểm thử trên hệ thống đang chạy thật; mọi kết quả đều có bằng chứng trong thư mục evidence/.")

# 4. Cac nhiem vu can thuc hien
content_slide("PHẦN 1 — GIỚI THIỆU", "Các nhiệm vụ cần thực hiện", [
    "1. Lập Test Plan — mục tiêu, phạm vi, môi trường, lịch trình 3 tuần (12/10/2026 – 01/11/2026).",
    "2. Viết Test Case — từ 42 yêu cầu kiểm thử suy ra 104 kịch bản, phân mức ưu tiên.",
    "3. Thực thi kiểm thử — 3 làn: HTTP/API, giao diện Playwright, đối soát cơ sở dữ liệu.",
    "4. Lập Test Report — tổng hợp PASS/FAIL theo phân hệ, dựng ma trận truy xuất RTM.",
    "5. Báo cáo lỗi — 26 phiếu lỗi kèm đường dẫn mã nguồn và dữ liệu tái hiện.",
], 4, note="Năm nhiệm vụ tương ứng năm sản phẩm bàn giao: Test Plan, Test Case, bằng chứng, Test Report, danh sách lỗi.")

# 5. Test Plan — pham vi va muc tieu
content_slide("PHẦN 2 — TEST PLAN", "Phạm vi và mục tiêu kiểm thử", [
    "Trong phạm vi: 10 phân hệ, 42 yêu cầu kiểm thử, 104 kịch bản; kiểm thử chức năng, giao diện và đối soát dữ liệu.",
    "Ngoài phạm vi: cổng MoMo/VNPay (hệ thống trả HTTP 410 theo chính sách ký quỹ), email/SMS thật, kiểm thử tải.",
    "Mục tiêu 1: phủ 100 % yêu cầu (42/42) và thực thi 104/104 kịch bản.",
    "Mục tiêu 2: tỷ lệ PASS ≥ 85 % và phát hiện tối thiểu 2 lỗi mức High.",
    "Kết quả: phủ 100 %, chạy 104/104, phát hiện 10 lỗi High; tỷ lệ PASS 73,1 % chưa đạt mục tiêu đề ra.",
], 5, note="Phạm vi bám theo Test Plan mục 3; các hạng mục ngoài phạm vi ghi nhận là rủi ro, không tính là lỗi.")

# 6. Test Plan — tieu chi, moi truong, tai nguyen
content_slide("PHẦN 2 — TEST PLAN", "Tiêu chí chất lượng, môi trường và tài nguyên", [
    "Môi trường: Windows 11, Chromium (Playwright headless), bản Production trên Vercel, cơ sở dữ liệu Neon PostgreSQL.",
    "Tài khoản kiểm thử: 5 tài khoản đủ vai trò (ADMIN, ORGANIZER, USER…) kèm token JWT.",
    "Công cụ: Playwright, Node.js 24, Python (sinh báo cáo), Excel (TC List – TR List – RTM), Word.",
    "Ba làn thực thi: HTTP/API → giao diện trình duyệt → đối soát bản ghi Prisma trên Neon.",
    "Tiêu chí dừng: mọi kịch bản đều có PASS/FAIL, không để trống; bằng chứng lưu theo mã TC.",
], 6, note="Ba làn giúp một lỗi được nhìn từ ba góc: hợp đồng API, trải nghiệm giao diện và tính đúng của dữ liệu.")

# 7. Test Plan — rui ro
risk_lines = []
for code, desc, mit in risks[:3]:
    risk_lines.append("• %s — %s" % (code, desc.rstrip(".")))
    risk_lines.append("     Giảm thiểu: %s" % mit.rstrip("."))
if not risk_lines:
    risk_lines = ["• R-01 — Dịch vụ bên thứ ba chưa cấu hình thật.  Giảm thiểu: tách nhóm ca phụ thuộc dịch vụ.",
                  "• R-02 — Số liệu lệch giữa Excel và báo cáo.  Giảm thiểu: mọi số lấy từ một nguồn Excel."]
content_slide("PHẦN 2 — TEST PLAN", "Rủi ro chính và kế hoạch giảm thiểu", risk_lines, 7,
              note="Trích từ bảng rủi ro của Test Plan mục 8 (5 rủi ro được nhận diện, 3 rủi ro trọng yếu trình bày tại đây).")

# 8. Test Case — thiet ke
content_slide("PHẦN 3 — TEST CASE", "Thiết kế kịch bản kiểm thử", [
    "Test Case là tập bước kiểm thử xác minh một chức năng hoạt động đúng yêu cầu.",
    "Mỗi kịch bản gồm: mã TC, điều kiện tiên quyết, các bước, dữ liệu kiểm thử, kết quả mong đợi, kết quả thực thi, bằng chứng, ngày chạy.",
    "42 yêu cầu kiểm thử (TR) suy ra từ route/API/schema → 104 kịch bản phủ toàn bộ 10 phân hệ.",
    "Phân mức ưu tiên: %d High · %d Medium · %d Boundary · %d Low." % (
        pri.get("High", 0), pri.get("Medium", 0), pri.get("Boundary", 0), pri.get("Low", 0)),
    "Kỹ thuật áp dụng: Functional, Boundary, Negative, Look and Feel.",
    "Bằng chứng mỗi ca: ảnh chụp màn hình, tệp JSON phản hồi API hoặc nhật ký chạy.",
], 8, note="Workbook: Test Case_23CT113_Nhom02.xlsx — TC List (104 dòng), TR List (42 dòng), RTM, TongQuan_Dashboard.")

# 9. Test Case — mot so TC tieu bieu
tc_rows = [["Mã TC", "Phân hệ", "Mục tiêu kiểm thử", "Ưu tiên", "Kết quả"]]
for code, sid, desc, p, res in sample:
    tc_rows.append([code, sid, desc[:78], p, res])
if len(tc_rows) == 1:
    tc_rows.append(["—", "—", "Chưa đọc được dữ liệu TC List", "—", "—"])
content_slide("PHẦN 3 — TEST CASE", "Một số test case tiêu biểu", [], 9,
              table=(len(tc_rows), 5, tc_rows), row_h=0.9, col_w=[3.1, 2.2, 8.6, 2.0, 2.2],
              note="Trích nguyên văn từ TC List; kết quả PASS/FAIL là kết quả chạy thật trên hệ thống Production.")

# 10. Test Report — tong quan + theo phan he
sub_rows = [["Phân hệ", "Tên phân hệ nghiệp vụ", "Tổng TC", "PASS", "FAIL", "Tỷ lệ PASS"]]
for sid, (tot, ok, bad) in sub.items():
    sub_rows.append([sid, names.get(sid, sid)[:44], str(tot), str(ok), str(bad), "%d%%" % round(100.0 * ok / tot) if tot else "0%"])
sub_rows.append(["TỔNG", "Toàn bộ 10 phân hệ", str(n_tc), str(n_pass), str(n_fail), vn(rate) + "%"]),
content_slide("PHẦN 4 — TEST REPORT", "Tổng quan kết quả thực thi", [
    "Đã thực thi %d/%d kịch bản: %d PASS (%s%%) · %d FAIL (%s%%) · 0 ca chưa chạy." % (
        n_tc, n_tc, n_pass, vn(rate), n_fail, vn(100 - rate)),
    "Bằng chứng lưu tại evidence/: %d ảnh chụp, %d tệp JSON phản hồi API, %d nhật ký chạy." % (n_png, n_json, n_log),
], 10, table=(len(sub_rows), 6, sub_rows), row_h=0.44, col_w=[2.0, 7.4, 2.2, 2.0, 2.0, 2.5],
              note="Số liệu tính trực tiếp từ TC List; cột Tỷ lệ PASS = PASS / Tổng TC của từng phân hệ.")

# 11. Test Report — bao cao loi
content_slide("PHẦN 4 — TEST REPORT", "Báo cáo lỗi thực tế (%d phiếu)" % n_bug, [
    "%d phiếu lỗi: %d High · %d Medium · %d Low; mỗi phiếu có mã nguồn và dữ liệu tái hiện." % (
        n_bug, sev.get("High", 0), sev.get("Medium", 0), sev.get("Low", 0)),
    "High: cổng MoMo/VNPay trả HTTP 410 chặn luồng ví điện tử; eKYC và Google OAuth chưa cấu hình thật.",
    "Medium: cuộc gọi P2P dùng polling 1,2 giây thay vì WebSocket; thiếu kiểm tra dữ liệu phía giao diện.",
    "Low: form góp ý thiếu bộ đếm ký tự, chặn cứng khi nội dung dưới 10 ký tự.",
    "Đã đối chiếu lại với mã nguồn: src/hooks/useCall.ts, src/app/api/payment/*, src/app/api/feedback/route.ts.",
], 11, note="Bảng chi tiết: Test Report mục 4 (26 dòng) và Word báo cáo mục 4.3; 28 ca FAIL quy về 26 phiếu vì một số ca phát sinh nhiều lỗi.")

# 12. Khuyen nghi — quyet dinh — ket luan
content_slide("PHẦN 5 — KẾT LUẬN", "Khuyến nghị, quyết định triển khai và kết luận", [
    "Khuyến nghị ưu tiên: sửa %d lỗi High trước, sau đó nhóm Medium; chạy lại (retest) và cập nhật kết quả sau mỗi lần sửa." % sev.get("High", 0),
    "Quyết định: chưa nghiệm thu toàn bộ; các phân hệ nền tảng (AUTH, KYC, CAMP, PLEDGE, CERT) đủ điều kiện dùng thử có kiểm soát.",
    "Đã hoàn thành: IC, Test Plan, %d kịch bản, Test Report, RTM, %d phiếu lỗi, 3 biên bản họp, báo cáo Word/PDF và PPT." % (n_tc, n_bug),
    "Không chỉnh sửa số liệu: %d ca FAIL được giữ nguyên và giải thích nguyên nhân." % n_fail,
    "Bài học: kiểm thử trên sản phẩm thật bộc lộ lỗi mà đặc tả không thấy; bằng chứng phải sinh ngay khi chạy.",
], 12, note="Trân trọng cảm ơn ThS. Nguyễn Minh Phúc và các bạn đã theo dõi phần trình bày của Nhóm 02.")

tmp = OUT + ".tmp"
prs.save(tmp)
n_slides = len(Presentation(tmp).slides)
print("[TMP] %d slides" % n_slides)

# ---------- 5. chen nen + 2 logo vao moi slide noi dung (lop zip) ----------
zin = zipfile.ZipFile(tmp)
_zbase = zipfile.ZipFile(BASE)
base_xml = etree.fromstring(_zbase.read("ppt/slides/slide1.xml"))
base_rels = etree.fromstring(_zbase.read("ppt/slides/_rels/slide1.xml.rels"))
_zbase.close()
rel_target = {r.get("Id"): r.get("Target") for r in base_rels}
rel_type = {r.get("Id"): r.get("Type") for r in base_rels}

spTree = base_xml.find("{%s}cSld/{%s}spTree" % (P_NS, P_NS))
KEEP = ("{%s}sp" % P_NS, "{%s}grpSp" % P_NS, "{%s}pic" % P_NS, "{%s}graphicFrame" % P_NS)
BG_NAMES = ("Freeform 2", "Group 3", "Group 5")  # nen + logo trai + logo phai
bg_elems = []
for el in spTree:
    if el.tag not in KEEP:
        continue
    cNvPr = el.find(".//{%s}cNvPr" % P_NS)
    if cNvPr is not None and cNvPr.get("name") in BG_NAMES:
        bg_elems.append(el)
bg_elems.sort(key=lambda e: BG_NAMES.index(e.find(".//{%s}cNvPr" % P_NS).get("name")))
print("[BG] shape se chen: %s" % [el.find(".//{%s}cNvPr" % P_NS).get("name") for el in bg_elems])

modified = {}
for i in range(2, n_slides + 1):
    sname = "ppt/slides/slide%d.xml" % i
    rname = "ppt/slides/_rels/slide%d.xml.rels" % i
    sdoc = etree.fromstring(zin.read(sname))
    rdoc = etree.fromstring(zin.read(rname))
    st = sdoc.find("{%s}cSld/{%s}spTree" % (P_NS, P_NS))
    existing = {r.get("Id") for r in rdoc}
    insert_at = 2  # sau nvGrpSpPr va grpSpPr
    for el in bg_elems:
        cp = copy.deepcopy(el)
        for node in cp.iter():
            for attr in list(node.attrib):
                if attr.startswith("{%s}" % R_NS):
                    old = node.attrib[attr]
                    if old in rel_target:
                        new_id = "rIdBg" + old[3:]
                        node.attrib[attr] = new_id
                        if new_id not in existing:
                            r = etree.SubElement(rdoc, "{%s}Relationship" % REL_NS)
                            r.set("Id", new_id)
                            r.set("Type", rel_type[old])
                            r.set("Target", rel_target[old])
                            existing.add(new_id)
        st.insert(insert_at, cp)
        insert_at += 1
    modified[sname] = etree.tostring(sdoc, xml_declaration=True, encoding="UTF-8", standalone=True)
    modified[rname] = etree.tostring(rdoc, xml_declaration=True, encoding="UTF-8", standalone=True)

with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        zout.writestr(item, modified.get(item.filename, zin.read(item.filename)))
zin.close()
os.remove(tmp)
print("[SAVED]", OUT, os.path.getsize(OUT), "bytes,", n_slides, "slides")
