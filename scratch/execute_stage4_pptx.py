from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
import sys

sys.stdout.reconfigure(encoding='utf-8')

pptx_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Ppt Báo cáo Nhóm 2 - 23CT113.pptx"
prs = Presentation(pptx_path)

def clean_text(txt):
    return txt.replace("_x000B_", "").replace("\x0b", "\n").strip()

# ==================== SLIDE 2: Phân công nhóm ====================
s2 = prs.slides[1]
t2 = s2.shapes[2].table
members_data = [
    ("Họ và tên", "Vai trò", "Phụ trách"),
    ("Nguyễn Quách Phú Tài", "Trưởng nhóm", "AUTH & KYC (TR-001 -> TR-009, 23 TCs)"),
    ("Trần Xuân Ân", "Thành viên", "CAMP & REWARD (TR-010 -> TR-018, 23 TCs)"),
    ("Bùi Đặng Quốc Khánh", "Thành viên", "PLEDGE & CERT (TR-019 -> TR-027, 20 TCs)"),
    ("Nguyễn Trung Tiến", "Thành viên", "COMM & BLOG (TR-028 -> TR-035, 23 TCs)"),
    ("Nguyễn Khánh Du", "Thành viên", "CHAT & ADMIN (TR-036 -> TR-042, 15 TCs)")
]
for r_i, row in enumerate(members_data):
    for c_i, val in enumerate(row):
        t2.rows[r_i].cells[c_i].text = val
print("Slide 2 updated.")

# ==================== SLIDE 3: Tổng quan dự án ====================
s3 = prs.slides[2]
tf3 = s3.shapes[2].text_frame
tf3.clear()
p0 = tf3.paragraphs[0]
p0.text = "• Tử Tế Fund – Nền tảng Crowdfunding gây quỹ cộng đồng minh bạch qua VietQR và ký quỹ ngân hàng."
p1 = tf3.add_paragraph()
p1.text = "• 10 Phân hệ nghiệp vụ chuẩn hóa: AUTH, KYC, CAMP, REWARD, PLEDGE, CERT, COMM, BLOG, CHAT, ADMIN."
p2 = tf3.add_paragraph()
p2.text = "– Kiến trúc kỹ thuật: Next.js 15 App Router, React 19, Neon PostgreSQL, NextAuth RBAC đa cấp."
p3 = tf3.add_paragraph()
p3.text = "– Môi trường kiểm thử: Windows 10/11, Chromium Headless Playwright, môi trường Vercel Production."
p4 = tf3.add_paragraph()
p4.text = "• Quy trình chuẩn mực: Đặc tả IC → Test Plan → 104 Test Cases → Ba làn thực thi → 26 Bug Reports."
p5 = tf3.add_paragraph()
p5.text = "• Trọng tâm kiểm thử: Đối soát dòng tiền ký quỹ, sao kê minh bạch, tra cứu chứng nhận điện tử (/lookup)."
print("Slide 3 updated.")

# ==================== SLIDE 4: Phạm vi kiểm thử ====================
s4 = prs.slides[3]
t4 = s4.shapes[2].table
scope_data = [
    ("Phân hệ nghiệp vụ", "Số TC", "Trọng tâm nội dung kiểm thử"),
    ("AUTH & KYC", "23 TC", "Đăng nhập Credentials, OTP reset mật khẩu, RBAC, nộp/duyệt hồ sơ eKYC CCCD"),
    ("CAMP & REWARD", "23 TC", "Tạo chiến dịch, kiểm tra hạn chót, rich text editor, thiết lập gói quà tặng"),
    ("PLEDGE & CERT", "20 TC", "Tạo đơn ủng hộ VietQR, ký quỹ ngân hàng, cấp chứng nhận điện tử, tra cứu /lookup"),
    ("COMM & BLOG", "23 TC", "Đăng tin cập nhật, bình luận, đóng góp ý kiến /gop-y, soạn thảo editor, kiểm duyệt bài"),
    ("CHAT & ADMIN", "15 TC", "Tin nhắn thời gian thực, cuộc gọi WebRTC, Admin Console, khóa tài khoản vi phạm")
]
for r_i, row in enumerate(scope_data):
    for c_i, val in enumerate(row):
        t4.rows[r_i].cells[c_i].text = val
s4.shapes[3].text_frame.text = "• Phạm vi: Bao phủ toàn diện 10 phân hệ nghiệp vụ, 42 TRs và 104 Test Cases phần mềm (100% đã thực thi)."
print("Slide 4 updated.")

# ==================== SLIDE 5: Test Plan ====================
s5 = prs.slides[4]
for sh in s5.shapes:
    if sh.has_text_frame:
        sh.text_frame.text = clean_text(sh.text_frame.text)
print("Slide 5 cleaned.")

# ==================== SLIDE 6: Bảng kết quả 104 TCs ====================
s6 = prs.slides[5]
s6.shapes[2].text_frame.text = (
    "Thiết kế Yêu cầu (TR) và Kịch bản kiểm thử (TC):\n"
    "• Tổng số Yêu cầu kiểm thử: 42 TRs (suy ra trực tiếp từ route, API và schema)\n"
    "• Tổng số Kịch bản: 104 Test Cases phần mềm (100% đã thực thi trên hệ thống thật)\n"
    "• Phân bổ độ ưu tiên: 59 High, 33 Medium, 4 Boundary, 8 Low\n"
    "• Kết quả tổng thể: 76 PASS (73.1%), 28 FAIL (26.9%), 0 Chưa chạy / Để trống"
)
t6 = s6.shapes[3].table
results_table = [
    ("Phân hệ", "Số TR", "Số TC", "Đã chạy", "PASS", "FAIL", "Chưa chạy"),
    ("AUTH", "5", "12", "12", "10", "2", "0"),
    ("KYC", "4", "11", "11", "10", "1", "0"),
    ("CAMP", "5", "15", "15", "13", "2", "0"),
    ("REWARD", "4", "8", "8", "7", "1", "0"),
    ("PLEDGE", "5", "10", "10", "6", "4", "0"),
    ("CERT", "4", "10", "10", "6", "4", "0"),
    ("COMM", "4", "11", "11", "7", "4", "0"),
    ("BLOG", "4", "12", "12", "8", "4", "0"),
    ("CHAT", "3", "6", "6", "4", "2", "0"),
    ("ADMIN", "4", "9", "9", "5", "4", "0"),
    ("TỔNG", "42", "104", "104", "76", "28", "0")
]
for r_i, row in enumerate(results_table):
    for c_i, val in enumerate(row):
        t6.rows[r_i].cells[c_i].text = val
print("Slide 6 updated.")

# ==================== SLIDE 7: Kết quả thực thi ====================
s7 = prs.slides[6]
s7.shapes[0].text_frame.text = "Tổng kết Kết quả Thực thi Kiểm thử"
# Check if body text shape exists
body_s7 = None
for sh in s7.shapes:
    if sh != s7.shapes[0] and sh != s7.shapes[1] and sh.has_text_frame:
        body_s7 = sh
        break
if not body_s7:
    body_s7 = s7.shapes.add_textbox(Inches(0.6), Inches(1.3), Inches(8.8), Inches(4.8))

tf7 = body_s7.text_frame
tf7.clear()
bullets7 = [
    "• Tổng số kịch bản kiểm thử đã thực thi: 104 / 104 TCs (Đạt tỷ lệ 100% kế hoạch).",
    "• Số kịch bản ĐẠT (PASS): 76 TCs (Tỷ lệ đạt 73.1% trên hệ thống thực tế).",
    "• Số kịch bản KHÔNG ĐẠT (FAIL): 28 TCs (Tỷ lệ 26.9%).",
    "• Số kịch bản Chưa chạy / Để trống: 0 ca (Tuân thủ nguyên tắc trung thực tuyệt đối).",
    "• 100% ca kiểm thử đều có bằng chứng kỹ thuật khách quan lưu tại thư mục evidence/:",
    "  – 23 ảnh chụp màn hình Playwright trên giao diện web Vercel Production.",
    "  – 94 tệp JSON phản hồi HTTP/API và 11 nhật ký kiểm thử Jest runner.",
    "• Phân loại 28 ca FAIL: 8 ca do dịch vụ bên thứ ba chưa tích hợp + 20 ca lỗi hệ thống thật.",
    "• Toàn bộ 20 ca lỗi hệ thống được lập thành 26 phiếu báo lỗi (Bug Reports) chi tiết."
]
for idx, b in enumerate(bullets7):
    p = tf7.paragraphs[0] if idx == 0 else tf7.add_paragraph()
    p.text = b
    p.font.size = Pt(14)
print("Slide 7 updated.")

# ==================== SLIDE 8: Báo cáo lỗi (26 Bugs) ====================
s8 = prs.slides[7]
s8.shapes[0].text_frame.text = "Báo cáo Lỗi Thực tế (26 Bug Reports)"
# Table on slide 8
t8 = s8.shapes[2].table
bug_summary_table = [
    ("Phân loại lỗi", "Mức độ", "Số lượng", "Trọng tâm lỗi & Mã nguồn gây lỗi"),
    ("Bảo mật & Cổng thanh toán", "High", "8 lỗi", "Cổng MoMo/VNPay trả 410, minAmount âm, JWT editor callback, khóa BANNED..."),
    ("Logic tương tác & Đàm thoại", "Medium", "12 lỗi", "WebRTC polling 1200ms, hủy campaign có pledge, rating chưa cập nhật..."),
    ("Mã trạng thái & Validation", "Low", "6 lỗi", "Trang lỗi 404 trả HTTP 200, form feedback thiếu validate, nội dung blog rỗng..."),
    ("TỔNG HỢP TOÀN HỆ THỐNG", "High: 8 | Med: 12 | Low: 6", "26 BUGS", "100% có bằng chứng kỹ thuật và đề xuất giải pháp xử lý chi tiết.")
]
for r_i, row in enumerate(bug_summary_table):
    for c_i, val in enumerate(row):
        t8.rows[r_i].cells[c_i].text = val
print("Slide 8 updated.")

# ==================== SLIDE 9: Ma trận RTM ====================
s9 = prs.slides[8]
s9.shapes[0].text_frame.text = "Ma trận Truy xuất Nguồn gốc (RTM)"
s9.shapes[2].text_frame.clear()
bullets9 = [
    "• Chuỗi truy xuất khép kín: Mã nguồn → 10 Phân hệ FR → 42 TRs → 104 Test Cases → 26 BUGs.",
    "• 100% Yêu cầu kiểm thử (42 TRs) đều có từ 2 đến 3 Test Cases liên kết bao phủ.",
    "• Mọi Test Case FAIL đều dẫn xuất trực tiếp ra mã Bug tương ứng phục vụ sửa lỗi.",
    "• Toàn bộ số liệu RTM được tính bằng công thức Excel tự động liên kết động giữa TC List và RTM.",
    "• Độ bao phủ yêu cầu kiểm thử: 42 / 42 TRs có ít nhất 1 TC đã thực thi (Bao phủ: 100%).",
    "• Bảo đảm tính nhất quán tuyệt đối giữa Dashboard, RTM, Test Plan, Test Report và Báo cáo tổng kết."
]
for idx, b in enumerate(bullets9):
    p = s9.shapes[2].text_frame.paragraphs[0] if idx == 0 else s9.shapes[2].text_frame.add_paragraph()
    p.text = b
    p.font.size = Pt(14)
print("Slide 9 updated.")

# ==================== SLIDE 10: Đánh giá & Khuyến nghị ====================
s10 = prs.slides[9]
for sh in s10.shapes:
    if sh.has_text_frame:
        sh.text_frame.text = clean_text(sh.text_frame.text)
print("Slide 10 cleaned.")

# ==================== SLIDE 11: Kết luận & Nghiệm thu ====================
s11 = prs.slides[10]
s11.shapes[0].text_frame.text = "Kết luận và Nghiệm thu Đồ án"
s11.shapes[2].text_frame.clear()
bullets11 = [
    "• Hoàn thành trọn vẹn bộ hồ sơ kiểm thử: Đầy đủ 12 tài liệu quy chuẩn (đặc tả IC song ngữ .xlsx, Test Plan, Test Report, Workbook 104 TCs, 3 Biên bản họp có ảnh, Bảng tiến độ, Báo cáo Word 13 trang, PDF và thư mục evidence/).",
    "• Kết quả kiểm thử thực tế: 104 / 104 TCs đã chạy (100%), đạt 76 PASS, 28 FAIL, 0 Chưa chạy (Tỷ lệ đạt 73.1%).",
    "• 26 Bug Reports được bóc tách chi tiết giúp đội ngũ phát triển sửa lỗi chính xác trong sprint tới.",
    "• Đảm bảo tính trung thực tuyệt đối: Không ngụy tạo số liệu, không có ca phần mềm để trống.",
    "• Bằng chứng kiểm thử xác thực 100%: 23 ảnh Playwright, 94 phản hồi JSON, 11 log kiểm thử.",
    "• Cả 5 thành viên Nhóm 02 hoàn thành 100% nhiệm vụ được giao và sẵn sàng bảo vệ đồ án."
]
for idx, b in enumerate(bullets11):
    p = s11.shapes[2].text_frame.paragraphs[0] if idx == 0 else s11.shapes[2].text_frame.add_paragraph()
    p.text = b
    p.font.size = Pt(14)
print("Slide 11 updated.")

prs.save(pptx_path)
print("Saved updated PPTX successfully!")

