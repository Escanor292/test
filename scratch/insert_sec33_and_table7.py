import docx
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
import sys

sys.stdout.reconfigure(encoding='utf-8')

word_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"
doc = docx.Document(word_path)

# 1. Check Section 3.3
has_sec33 = any("3.3." in p.text and "Kịch bản kiểm thử" in p.text for p in doc.paragraphs)
if has_sec33:
    print("Section 3.3 already exists, skipping insertion.")
else:
    p_target = None
    for p in doc.paragraphs:
        if "CHƯƠNG 4. BÁO CÁO KẾT QUẢ THỰC THI" in p.text:
            p_target = p
            break
            
    if p_target:
        p_h = p_target.insert_paragraph_before("3.3. Thiết kế 104 Kịch bản kiểm thử (Test Cases)")
        for r in p_h.runs:
            r.font.name = 'Times New Roman'
            r.font.size = Pt(13)
            r.font.bold = True
            
        p_c1 = p_target.insert_paragraph_before(
            "Dựa trên 42 Yêu cầu kiểm thử (TRs) đã được đặc tả từ mã nguồn hệ thống và tài liệu IC, Nhóm 02 đã thiết kế "
            "chính xác 104 Kịch bản kiểm thử (Test Cases) phần mềm đo lường trực tiếp mọi luồng xử lý trên nền tảng Tử Tế Fund. "
            "Bộ kịch bản áp dụng kết hợp 4 kỹ thuật kiểm thử phần mềm chuẩn tắc: Functional (Chức năng), Boundary Value Analysis "
            "(Phân tích giá trị biên), Negative Testing (Kiểm thử phủ định / dữ liệu lỗi) và Look & Feel (Giao diện & Trải nghiệm người dùng)."
        )
        for r in p_c1.runs:
            r.font.name = 'Times New Roman'
            r.font.size = Pt(12)
            
        p_c2 = p_target.insert_paragraph_before(
            "Phân bổ mức độ ưu tiên của 104 kịch bản được định hình chặt chẽ theo mức độ rủi ro nghiệp vụ:\n"
            "• Ưu tiên Cao (High): 59 ca (chiếm 56.7%) — tập trung vào các luồng sống còn như đăng nhập NextAuth, nộp/duyệt KYC, tạo chiến dịch, tạo đơn ủng hộ VietQR và phân quyền tối cao Admin.\n"
            "• Ưu tiên Trung bình (Medium): 33 ca (chiếm 31.7%) — bao gồm các tính năng liên kết mạng xã hội, tương tác bài viết blog, đánh giá cộng đồng và sao kê tài chính.\n"
            "• Giá trị biên (Boundary): 4 ca (chiếm 3.8%) — kiểm tra ngưỡng mật khẩu tối thiểu 6 ký tự, thời gian sống token reset 30 phút, số tiền ủng hộ tối thiểu > 0 VNĐ và độ dài góp ý 10–2000 ký tự.\n"
            "• Ưu tiên Thấp (Low): 8 ca (chiếm 7.7%) — kiểm tra các màn hình Look & Feel, giao diện 404 tùy biến và trải nghiệm người dùng.\n"
            "Mỗi kịch bản đều được gắn mã định danh duy nhất (TC ID), điều kiện tiên quyết rõ ràng, các bước thao tác cụ thể từng bước, dữ liệu đầu vào và kết quả mong đợi lượng hóa."
        )
        for r in p_c2.runs:
            r.font.name = 'Times New Roman'
            r.font.size = Pt(12)
            
        print("Inserted Section 3.3 successfully before Chapter 4.")

# 2. Check and Update Table 7 (Phụ lục)
t7 = doc.tables[7]
print(f"Current Table 7 rows before update: {len(t7.rows)}")

appendix_items = [
    ("1", "01-IC-Product-Requirements_23CT113_Nhom02.xlsx", "Bản đặc tả yêu cầu sản phẩm song ngữ Anh-Việt chuẩn hóa (92 dòng đối xứng), bao quát 10 phân hệ nghiệp vụ."),
    ("2", "Test Case_23CT113_Nhom02.xlsx", "Workbook kiểm thử chuẩn 4 sheets: TongQuan_Dashboard, TR List (42 TRs), TC List (104 TCs), RTM (công thức liên kết động)."),
    ("3", "Test Plan_23CT113_Nhom02.docx", "Kế hoạch kiểm thử phần mềm 9 mục chuẩn IEEE 829, phân công 5 thành viên, tiêu chuẩn hoàn thành kiểm thử."),
    ("4", "Test Report_23CT113_Nhom02.docx", "Báo cáo kết quả kiểm thử 7 phần chi tiết: 76 PASS / 28 FAIL / 0 Chưa chạy, phân tích 26 Bug Reports."),
    ("5", "TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx", "Kế hoạch và đánh giá đóng góp của Trưởng nhóm: 3 bảng chuẩn, Bảng 1 có 6 dòng, Mục 4 đối chiếu 10 phân hệ."),
    ("6", "TimeLine/Biên Bản Họp Nhóm Lần 1...docx", "Biên bản họp khởi động tuần 1 (Thứ Hai 12/10/2026), có chèn ảnh phiên họp thực tế Hình 1."),
    ("7", "TimeLine/Biên Bản Họp Nhóm Lần 2...docx", "Biên bản họp rà soát test case tuần 2 (Thứ Hai 19/10/2026), có chèn ảnh phiên họp thực tế Hình 2."),
    ("8", "TimeLine/Biên Bản Họp Nhóm Lần 3...docx", "Biên bản họp nghiệm thu tuần 3 (Thứ Hai 26/10/2026), có chèn ảnh phiên họp thực tế Hình 3."),
    ("9", "TimeLine/TimeLine_23CT113_Nhom02.xlsx", "Bảng tiến độ 3 tuần chi tiết theo ngày, phân công nhiệm vụ 5 thành viên đồng nhất."),
    ("10", "Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx", "Bản báo cáo tổng kết đồ án môn học hoàn chỉnh 6 chương (độ dài 13 trang A4 chuẩn)."),
    ("11", "Word+ppt Báo Cáo/Nhom02_Final_Report_Software_Testing.pdf", "Bản PDF lưu trữ kết xuất trực tiếp từ Báo cáo Word."),
    ("12", "Word+ppt Báo Cáo/Ppt Báo cáo Nhóm 2 - 23CT113.pptx", "Slide báo cáo thuyết trình 11 trang chuẩn nhận diện Tử Tế Fund, đầy đủ 10 phân hệ."),
    ("13", "evidence/", "Thư mục chứa 128 tệp bằng chứng thực thi xác thực (23 ảnh chụp màn hình Playwright, 94 json response, 11 log kiểm thử).")
]

while len(t7.rows) - 1 < len(appendix_items):
    t7.add_row()

for idx, item in enumerate(appendix_items, start=1):
    row_cells = t7.rows[idx].cells
    row_cells[0].text = item[0]
    row_cells[1].text = item[1]
    row_cells[2].text = item[2]
    # format cells
    for c in row_cells:
        for p in c.paragraphs:
            for r in p.runs:
                r.font.name = 'Times New Roman'
                r.font.size = Pt(11)

print(f"Updated Table 7. Now rows = {len(t7.rows)} (Header + 13 items).")

doc.save(word_path)
print("Saved Báo Cáo Word successfully!")
