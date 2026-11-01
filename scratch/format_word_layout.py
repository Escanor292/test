import docx
from docx.shared import Pt, Inches
import sys

sys.stdout.reconfigure(encoding='utf-8')

word_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"
doc = docx.Document(word_path)

# 1. Format TOC (P7 to P32)
p7 = doc.paragraphs[7]
p7.paragraph_format.space_before = Pt(6)
p7.paragraph_format.space_after = Pt(6)
for r in p7.runs:
    r.font.name = 'Times New Roman'
    r.font.size = Pt(13)
    r.bold = True

toc_entries = [
    ("CHƯƠNG 1. TỔNG QUAN HỆ THỐNG VÀ PHẠM VI KIỂM THỬ", "3", True),
    ("  1.1. Giới thiệu nền tảng gây quỹ cộng đồng Tử Tế Fund", "3", False),
    ("  1.2. Kiến trúc công nghệ và môi trường triển khai", "3", False),
    ("  1.3. Phân chia 10 phân hệ nghiệp vụ kiểm thử", "3", False),
    ("CHƯƠNG 2. KẾ HOẠCH KIỂM THỬ PHẦN MỀM (TEST PLAN)", "4", True),
    ("  2.1. Mục tiêu và tiêu chí hoàn thành kiểm thử", "4", False),
    ("  2.2. Phương pháp và ba làn thực thi kiểm thử", "4", False),
    ("  2.3. Danh sách tài khoản kiểm thử và cơ chế cấp quyền", "5", False),
    ("  2.4. Phân công trách nhiệm 5 thành viên trong nhóm", "5", False),
    ("CHƯƠNG 3. THIẾT KẾ YÊU CẦU VÀ KỊCH BẢN KIỂM THỬ", "6", True),
    ("  3.1. Phương pháp suy diễn TR từ mã nguồn thực tế", "6", False),
    ("  3.2. Bảng tổng hợp 42 Yêu cầu kiểm thử (TRs)", "6", False),
    ("  3.3. Thiết kế 104 Kịch bản kiểm thử (Test Cases)", "7", False),
    ("CHƯƠNG 4. BÁO CÁO KẾT QUẢ THỰC THI VÀ PHÂN TÍCH LỖI", "8", True),
    ("  4.1. Tổng hợp kết quả thực thi theo phân hệ", "8", False),
    ("  4.2. Phân tích các ca kiểm thử không đạt (28 FAIL) và các tính năng bên thứ ba", "9", False),
    ("  4.3. Báo cáo 26 lỗi thực tế phát hiện được (Bug Reports)", "9", False),
    ("CHƯƠNG 5. MA TRẬN TRUY XUẤT NGUỒN GỐC (RTM)", "11", True),
    ("  5.1. Thiết kế ma trận truy xuất nguồn gốc", "11", False),
    ("  5.2. Đánh giá độ bao phủ yêu cầu kiểm thử", "11", False),
    ("CHƯƠNG 6. ĐÁNH GIÁ, BÀI HỌC KINH NGHIỆM VÀ KẾT LUẬN", "12", True),
    ("  6.1. Đánh giá mức độ sẵn sàng của phần mềm", "12", False),
    ("  6.2. Bài học kinh nghiệm trong quá trình kiểm thử", "12", False),
    ("  6.3. Kết luận", "12", False),
    ("PHỤ LỤC. DANH MỤC HỒ SƠ KIỂM THỬ ĐÍNH KÈM", "13", True)
]

for idx, (title, page_str, is_bold) in enumerate(toc_entries, start=8):
    p = doc.paragraphs[idx]
    # Build a compact dot-leader string that fits on exactly one line (width ~ 90 chars total)
    dots_count = max(5, 78 - len(title) - len(page_str))
    p.text = f"{title}  {'.' * dots_count}  Trang {page_str}"
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(1.5)
    p.paragraph_format.line_spacing = 1.0
    for r in p.runs:
        r.font.name = 'Times New Roman'
        r.font.size = Pt(10)
        r.bold = is_bold

print("TOC formatted compactly.")

# 2. Format Tables 1 to 7 to be compact and readable
for t_idx in range(1, len(doc.tables)):
    t = doc.tables[t_idx]
    for r_idx, r in enumerate(t.rows):
        for c in r.cells:
            for p in c.paragraphs:
                p.paragraph_format.space_before = Pt(0)
                p.paragraph_format.space_after = Pt(1)
                p.paragraph_format.line_spacing = 1.0
                for run in p.runs:
                    run.font.name = 'Times New Roman'
                    run.font.size = Pt(9.5 if t_idx == 6 else 10)
                    if r_idx == 0:
                        run.bold = True

print("Tables formatted compactly.")

# 3. Format body paragraphs
for i in range(34, len(doc.paragraphs)):
    p = doc.paragraphs[i]
    if p.text.startswith("CHƯƠNG") or p.text.startswith("PHỤ LỤC"):
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(4)
        for r in p.runs:
            r.font.name = 'Times New Roman'
            r.font.size = Pt(13)
            r.bold = True
    elif any(p.text.strip().startswith(f"{c}.") for c in ["1", "2", "3", "4", "5", "6"]):
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(3)
        for r in p.runs:
            r.font.name = 'Times New Roman'
            r.font.size = Pt(12)
            r.bold = True
    else:
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.line_spacing = 1.15
        for r in p.runs:
            r.font.name = 'Times New Roman'
            if not r.font.size:
                r.font.size = Pt(12)

doc.save(word_path)
print("Saved formatted Word document successfully!")

