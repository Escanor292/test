import openpyxl
import shutil

source_path = r'C:\Users\PHU TAI\.gemini\antigravity\brain\5e465315-d926-47b1-85b2-07a16df22fee\.user_uploaded\media_1793554062432_755491d1.xlsx'
wb = openpyxl.load_workbook(source_path)

print("Original sheets:", wb.sheetnames)

# 1. Sheet: EXAMPLE Product Requirements
ws_ex = wb['EXAMPLE Product Requirements']
# Fix C6 from broken formula =GOOGLETRANSLATE(...) to string
ws_ex['C6'].value = 'sasha.petrov@example.com'

# 2. Sheet: BLANK Product Requirements
ws_en = wb['BLANK Product Requirements']

# Stakeholder 2 (Supervisor) - use Faculty of IT, LHU description
ws_en.cell(21, 5).value = "Ensure the topic meets Lac Hong University standards (Faculty of IT, LHU)."

# Ensure clean version history at rows 88-95
ver_en = [
    ("1.0.0", "Nguyen Quach Phu Tai", "07/09/2026", "Initial Product Requirements baseline"),
    ("1.1.0", "Nguyen Quach Phu Tai", "14/09/2026", "Added stakeholder roles and module boundaries"),
    ("1.2.0", "Nguyen Quach Phu Tai", "21/09/2026", "Detailed Functional Requirements for Auth, Campaign, KYC"),
    ("1.3.0", "Nguyen Quach Phu Tai", "28/09/2026", "Detailed Checkout, Reward, Escrow & Payment specs"),
    ("1.4.0", "Nguyen Quach Phu Tai", "05/10/2026", "Added Acceptance Criteria and Risk Analysis matrix"),
    ("1.5.0", "Nguyen Quach Phu Tai", "12/10/2026", "Updated module test plan references and priority effort"),
    ("1.6.0", "Nguyen Quach Phu Tai", "19/10/2026", "Finalized non-functional performance benchmarks"),
    ("2.0.0", "Nguyen Quach Phu Tai", "30/10/2026", "Final sign-off for course acceptance and demo deployment"),
]
for idx, (v, author, dt, desc) in enumerate(ver_en):
    r = 88 + idx
    ws_en.cell(r, 2).value = v
    ws_en.cell(r, 3).value = author
    ws_en.cell(r, 4).value = dt
    ws_en.cell(r, 5).value = desc

# 3. Sheet: Vi_BLANK Product Requirements
ws_vi = wb['Vi_BLANK Product Requirements']

# Clear leftover text in row 8 and row 10
ws_vi.cell(8, 3).value = None
ws_vi.cell(8, 4).value = None
ws_vi.cell(10, 4).value = None

# Fix row 19 table headers
ws_vi.cell(19, 2).value = 'TÊN'
ws_vi.cell(19, 3).value = 'VAI TRÒ'
ws_vi.cell(19, 4).value = 'TRÁCH NHIỆM'
ws_vi.cell(19, 5).value = 'LỢI ÍCH ĐỐI VỚI SẢN PHẨM'

# Fix row 20-25 stakeholders (aligning perfectly with EN sheet)
stakeholders_vi = [
    ("Nguyễn Quách Phú Tài", "Sinh viên / Chủ sản phẩm / Lập trình", "Thu thập yêu cầu, thiết kế, cài đặt, kiểm thử theo từng module và triển khai bản demo.", "Vận hành được nền tảng gây quỹ cho creator và backer tại Việt Nam."),
    ("Nguyễn Minh Phúc", "Giảng viên hướng dẫn", "Đánh giá PRD/SRS, theo dõi tiến độ hàng tuần và nghiệm thu kết quả môn học.", "Đảm bảo đề tài đạt chuẩn chuyên môn Trường Đại học Lạc Hồng (Khoa CNTT - LHU)."),
    ("Creator", "Người dùng bên cung", "Tạo project, campaign, reward, blog; nộp KYC thủ công; đăng cập nhật; giao phần quà.", "Gây quỹ VNĐ trong nước, có danh tính tin cậy và công cụ nội dung."),
    ("Backer / Visitor", "Người dùng bên cầu", "Khám phá, ủng hộ hoặc mua, theo dõi tiến độ, nhận kho đồ, chat, đánh giá.", "Ủng hộ bằng phương thức thanh toán nội địa quen thuộc, rõ quyền lợi phần quà."),
    ("Admin", "Vận hành tin cậy", "Duyệt campaign, blog và hồ sơ KYC thủ công; quản lý trạng thái user, badge, báo cáo, từ ngữ cấm.", "Giảm gian lận và giữ an toàn cộng đồng."),
    ("Nhà cung cấp dịch vụ", "Hosting, cơ sở dữ liệu và lưu trữ ảnh", "Cung cấp hạ tầng cho các module cần kiểm thử (hosting, PostgreSQL, MongoDB, ảnh).", "Tích hợp ổn định; ứng dụng vẫn phải kiểm tra phía máy chủ."),
]

for idx, (name, role, resp, interest) in enumerate(stakeholders_vi):
    r = 20 + idx
    ws_vi.cell(r, 2).value = name
    ws_vi.cell(r, 3).value = role
    ws_vi.cell(r, 4).value = resp
    ws_vi.cell(r, 5).value = interest

# Fix row 77 table headers
ws_vi.cell(77, 2).value = 'YÊU CẦU'
ws_vi.cell(77, 3).value = 'MỨC ĐỘ ƯU TIÊN'
ws_vi.cell(77, 4).value = 'NỖ LỰC DỰ KIẾN YÊU CẦU'

# Fix row 87 table headers
ws_vi.cell(87, 2).value = 'PHIÊN BẢN '
ws_vi.cell(87, 3).value = 'NGƯỜI THỰC HIỆN'
ws_vi.cell(87, 4).value = 'NGÀY'
ws_vi.cell(87, 5).value = 'MÔ TẢ THAY ĐỔI'

# Fix version history at rows 88-95 in Vietnamese
ver_vi = [
    ("1.0.0", "Nguyễn Quách Phú Tài", "07/09/2026", "Khởi tạo đặc tả yêu cầu sản phẩm ban đầu"),
    ("1.1.0", "Nguyễn Quách Phú Tài", "14/09/2026", "Bổ sung vai trò các bên liên quan và ranh giới module"),
    ("1.2.0", "Nguyễn Quách Phú Tài", "21/09/2026", "Chi tiết yêu cầu chức năng cho Auth, Chiến dịch, KYC"),
    ("1.3.0", "Nguyễn Quách Phú Tài", "28/09/2026", "Chi tiết đặc tả Thanh toán, Phần quà, Escrow & VietQR"),
    ("1.4.0", "Nguyễn Quách Phú Tài", "05/10/2026", "Bổ sung tiêu chí chấp nhận và ma trận phân tích rủi ro"),
    ("1.5.0", "Nguyễn Quách Phú Tài", "12/10/2026", "Cập nhật tài liệu tham chiếu kế hoạch kiểm thử và nỗ lực"),
    ("1.6.0", "Nguyễn Quách Phú Tài", "19/10/2026", "Hoàn thiện chuẩn benchmark hiệu năng phi chức năng"),
    ("2.0.0", "Nguyễn Quách Phú Tài", "30/10/2026", "Nghiệm thu hoàn tất phục vụ báo cáo và triển khai demo"),
]
for idx, (v, author, dt, desc) in enumerate(ver_vi):
    r = 88 + idx
    ws_vi.cell(r, 2).value = v
    ws_vi.cell(r, 3).value = author
    ws_vi.cell(r, 4).value = dt
    ws_vi.cell(r, 5).value = desc

# 4. Sheet: - Disclaimer -
ws_disc = wb['- Disclaimer -']
ws_disc['B4'].value = (
    "Mọi bài viết, mẫu hoặc thông tin do Smartsheet cung cấp trên trang web chỉ mang tính chất tham khảo. "
    "Mặc dù chúng tôi cố gắng cập nhật và đảm bảo tính chính xác của thông tin, nhưng chúng tôi không đưa ra "
    "bất kỳ tuyên bố hoặc bảo đảm nào, dù rõ ràng hay ngụ ý, về tính đầy đủ, chính xác, độ tin cậy, sự phù hợp "
    "hoặc tính khả dụng đối với trang web hoặc thông tin, bài viết, mẫu hoặc đồ họa liên quan có trên trang web. "
    "Do đó, việc bạn dựa vào thông tin đó hoàn toàn là rủi ro của riêng bạn."
)

# Target paths
target_main = r'23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)\01-IC-Product-Requirements_23CT113_Nhom02.xlsx'
target_root = r'01-IC-Product-Requirements_23CT113_Nhom02.xlsx'

wb.save(target_main)
print(f"Saved successfully to: {target_main}")

shutil.copy2(target_main, target_root)
print(f"Copied successfully to: {target_root}")
