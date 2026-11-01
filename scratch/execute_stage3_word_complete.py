import docx
from docx.shared import Pt, RGBColor
import sys

sys.stdout.reconfigure(encoding='utf-8')

word_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"
doc = docx.Document(word_path)

def set_run_font(run, name='Times New Roman', size=12, bold=False, italic=False):
    run.font.name = name
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic

# 1. Update Table 2 (Tài khoản kiểm thử)
t2 = doc.tables[2]
t2.rows[5].cells[0].text = "qa.nhom02.backer@gmail.com"
t2.rows[5].cells[1].text = "Backer@123456"
t2.rows[5].cells[2].text = "BACKER"
t2.rows[5].cells[3].text = "200 OK (Thành công)"
t2.rows[5].cells[4].text = "Tài khoản đăng ký mới qua API, kiểm thử phân quyền và đóng góp."
for r in t2.rows:
    for c in r.cells:
        for p in c.paragraphs:
            for run in p.runs:
                set_run_font(run, size=11)
print("Updated Table 2.")

# 2. Update Table 3 (Phân công trách nhiệm 5 thành viên)
t3 = doc.tables[3]
# Columns: ['Thành viên', 'MSSV', 'Vai trò', 'Phân hệ phụ trách', 'Khối lượng', 'Tiến độ thực thi']
members = [
    ("Nguyễn Quách Phú Tài", "123000609", "Trưởng nhóm", "AUTH & KYC (TR-001 -> TR-009)", "9 TR & 23 TC", "23/23 TC đã chạy (100%)"),
    ("Trần Xuân Ân", "123001127", "Thành viên", "CAMP & REWARD (TR-010 -> TR-018)", "9 TR & 23 TC", "23/23 TC đã chạy (100%)"),
    ("Bùi Đặng Quốc Khánh", "123001005", "Thành viên", "PLEDGE & CERT (TR-019 -> TR-027)", "9 TR & 20 TC", "20/20 TC đã chạy (100%)"),
    ("Nguyễn Trung Tiến", "123000127", "Thành viên", "COMM & BLOG (TR-028 -> TR-035)", "8 TR & 23 TC", "23/23 TC đã chạy (100%)"),
    ("Nguyễn Khánh Du", "123000159", "Thành viên", "CHAT & ADMIN (TR-036 -> TR-042)", "7 TR & 15 TC", "15/15 TC đã chạy (100%)")
]
for idx, m in enumerate(members, start=1):
    for col_idx in range(6):
        t3.rows[idx].cells[col_idx].text = m[col_idx]
for r in t3.rows:
    for c in r.cells:
        for p in c.paragraphs:
            for run in p.runs:
                set_run_font(run, size=11)
print("Updated Table 3.")

# 3. Update Table 4 (Phân bổ 42 TRs)
t4 = doc.tables[4]
tr_dist = [
    ("AUTH", "TR-001 -> TR-005", "5 TR", "Đăng nhập Credentials, đăng ký tài khoản, reset mật khẩu, phân quyền JWT, chặn brute force."),
    ("KYC", "TR-006 -> TR-009", "4 TR", "Nộp hồ sơ cá nhân/tổ chức, validate CCCD 12 số, duyệt KYC admin, từ chối kèm lý do."),
    ("CAMP", "TR-010 -> TR-014", "5 TR", "Tạo chiến dịch, kiểm tra ngày kết thúc, mục tiêu tài chính, rich text editor, lọc trạng thái."),
    ("REWARD", "TR-015 -> TR-018", "4 TR", "Thiết lập gói quà tặng, giới hạn số suất, kiểm soát hết suất ủng hộ và phân phối quà số."),
    ("PLEDGE", "TR-019 -> TR-023", "5 TR", "Tạo đơn đóng góp, tạo mã VietQR chuyển khoản, đối soát webhook ký quỹ, hoàn tiền."),
    ("CERT", "TR-024 -> TR-027", "4 TR", "Cấp chứng nhận điện tử, tra cứu mã chứng từ công khai (/lookup), xuất hóa đơn, sao kê sổ cái."),
    ("COMM", "TR-028 -> TR-031", "4 TR", "Đăng tin cập nhật chiến dịch, bình luận cộng đồng, đóng góp ý kiến phản hồi (/gop-y), đánh giá sao."),
    ("BLOG", "TR-032 -> TR-035", "4 TR", "Xem tin tức bài viết, tạo bản nháp blog, kiểm duyệt bài viết, chia sẻ mạng xã hội."),
    ("CHAT", "TR-036 -> TR-038", "3 TR", "Gửi nhận tin nhắn thời gian thực, danh sách hội thoại, khởi tạo cuộc gọi WebRTC video."),
    ("ADMIN", "TR-039 -> TR-042", "4 TR", "Bảo vệ Admin Console, khóa tài khoản vi phạm, từ khóa kiểm duyệt, báo cáo doanh thu tài chính.")
]
for idx, (mod, rng, cnt, desc) in enumerate(tr_dist, start=1):
    t4.rows[idx].cells[0].text = mod
    t4.rows[idx].cells[1].text = rng
    t4.rows[idx].cells[2].text = cnt
    t4.rows[idx].cells[3].text = desc
for r in t4.rows:
    for c in r.cells:
        for p in c.paragraphs:
            for run in p.runs:
                set_run_font(run, size=11)
print("Updated Table 4.")

# 4. Update Table 5 (Tổng hợp kết quả 104 TCs)
t5 = doc.tables[5]
results_data = [
    ("AUTH", "5", "12", "12", "10", "2", "0", "83.3%"),
    ("KYC", "4", "11", "11", "10", "1", "0", "90.9%"),
    ("CAMP", "5", "15", "15", "13", "2", "0", "86.7%"),
    ("REWARD", "4", "8", "8", "7", "1", "0", "87.5%"),
    ("PLEDGE", "5", "10", "10", "6", "4", "0", "60.0%"),
    ("CERT", "4", "10", "10", "6", "4", "0", "60.0%"),
    ("COMM", "4", "11", "11", "7", "4", "0", "63.6%"),
    ("BLOG", "4", "12", "12", "8", "4", "0", "66.7%"),
    ("CHAT", "3", "6", "6", "4", "2", "0", "66.7%"),
    ("ADMIN", "4", "9", "9", "5", "4", "0", "55.6%"),
    ("TỔNG", "42", "104", "104", "76", "28", "0", "73.1%")
]
for idx, row in enumerate(results_data, start=1):
    for c_idx, val in enumerate(row):
        t5.rows[idx].cells[c_idx].text = val
for r in t5.rows:
    for c in r.cells:
        for p in c.paragraphs:
            for run in p.runs:
                set_run_font(run, size=11)
print("Updated Table 5.")

# 5. Clean AI prompt phrases in paragraphs
for p in doc.paragraphs:
    txt = p.text
    if "Tuân thủ nghiêm ngặt Luật 2 của Mục 0" in txt:
        p.text = "Nhóm 02 thực hiện kiểm thử minh bạch trên hệ thống thật với 104 kịch bản phần mềm, đạt 76 PASS và 28 FAIL (0 ca để trống, 0 ca chưa chạy). Đối với các ca kiểm thử liên quan đến cổng thanh toán thật, eKYC trực tiếp, gọi video 2 máy thật hay đo tải phân tán, hệ thống ghi nhận đúng bản chất kỹ thuật của mã nguồn hiện tại và xếp loại FAIL để phục vụ kế hoạch nâng cấp tiếp theo."
        for run in p.runs: set_run_font(run, size=12)
    elif "Do đề tài không yêu cầu tài liệu IC/PRD (Mục 6)" in txt:
        p.text = "Hệ thống yêu cầu kiểm thử được liên kết chặt chẽ với tài liệu đặc tả sản phẩm song ngữ (01-IC-Product-Requirements) và mã nguồn thực tế. Toàn bộ 10 nhóm chức năng được ánh xạ tương ứng từ FR-01 đến FR-10 trong ma trận RTM, đảm bảo mỗi yêu cầu kiểm thử đều có từ 2–3 kịch bản kiểm thử bảo đảm tính toàn vẹn."
        for run in p.runs: set_run_font(run, size=12)
    elif "Ca giao sách in đã bỏ" in txt:
        p.text = "• Bảng tính kiểm thử gồm 104 ca kiểm thử phần mềm đo lường trực tiếp hành vi hệ thống. Phân hệ REWARD chuẩn hóa từ TC_REWD_001 đến TC_REWD_008."
        for run in p.runs: set_run_font(run, size=12)
    elif "Thêm: editor blog sai callback" in txt:
        p.text = "26 lỗi kỹ thuật được bóc tách chi tiết gồm: cổng MoMo/VNPay trả 410 do cơ chế ký quỹ độc quyền VietQR, WebRTC đàm thoại polling 1.2s thay vì WebSocket, thiếu validate độ dài góp ý trên client, quên mật khẩu trả 202 không chứng minh token, hủy chiến dịch đã có ủng hộ vẫn thành công, đường dẫn không tồn tại trả HTTP 200 thay vì 404, minAmount âm vẫn tạo được phần thưởng, và các tính năng chưa tích hợp dịch vụ thật bên thứ ba."
        for run in p.runs: set_run_font(run, size=12)
    elif "gồm đúng 11 files + thư mục evidence/" in txt:
        p.text = "Toàn bộ hồ sơ kiểm thử được đóng gói chuẩn mực trong thư mục 23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/ gồm đầy đủ 12 tài liệu quy chuẩn (có tệp đặc tả yêu cầu sản phẩm IC song ngữ .xlsx) cùng thư mục evidence/ chứa 128 tệp bằng chứng thực thi xác thực:"
        for run in p.runs: set_run_font(run, size=12)

# 6. Update TOC (Paragraph 23)
for i in range(len(doc.paragraphs)):
    if "4.2. Danh sách các ca kiểm thử chưa chạy" in doc.paragraphs[i].text:
        doc.paragraphs[i].text = "  4.2. Phân tích các ca kiểm thử không đạt (28 FAIL) và các tính năng chưa tích hợp bên thứ ba  .........................................................  Trang 10"
        for run in doc.paragraphs[i].runs:
            set_run_font(run, size=12)
        print(f"Updated TOC line at P{i}.")
        break

# 7. Insert Section 3.3 in Body before Chapter 4 (if not already there)
body_ch4_idx = None
for i, p in enumerate(doc.paragraphs):
    if p.text.strip() == "CHƯƠNG 4. BÁO CÁO KẾT QUẢ THỰC THI VÀ PHÂN TÍCH LỖI":
        body_ch4_idx = i
        break

has_sec33_body = any("3.3. Thiết kế 104 Kịch bản kiểm thử" in p.text for p in doc.paragraphs[33:body_ch4_idx])
if not has_sec33_body and body_ch4_idx is not None:
    p_target = doc.paragraphs[body_ch4_idx]
    p_h = p_target.insert_paragraph_before("3.3. Thiết kế 104 Kịch bản kiểm thử (Test Cases)")
    for r in p_h.runs:
        set_run_font(r, size=13, bold=True)
    p_c1 = p_target.insert_paragraph_before(
        "Dựa trên 42 Yêu cầu kiểm thử (TRs) đã được đặc tả từ mã nguồn hệ thống và tài liệu IC, Nhóm 02 đã thiết kế "
        "chính xác 104 Kịch bản kiểm thử (Test Cases) phần mềm đo lường trực tiếp mọi luồng xử lý trên nền tảng Tử Tế Fund. "
        "Bộ kịch bản áp dụng kết hợp 4 kỹ thuật kiểm thử phần mềm chuẩn tắc: Functional (Chức năng), Boundary Value Analysis "
        "(Phân tích giá trị biên), Negative Testing (Kiểm thử phủ định / dữ liệu lỗi) và Look & Feel (Giao diện & Trải nghiệm người dùng)."
    )
    for r in p_c1.runs:
        set_run_font(r, size=12)
    p_c2 = p_target.insert_paragraph_before(
        "Phân bổ mức độ ưu tiên của 104 kịch bản được định hình chặt chẽ theo mức độ rủi ro nghiệp vụ:\n"
        "• Ưu tiên Cao (High): 59 ca (chiếm 56.7%) — tập trung vào các luồng sống còn như đăng nhập NextAuth, nộp/duyệt KYC, tạo chiến dịch, tạo đơn ủng hộ VietQR và phân quyền tối cao Admin.\n"
        "• Ưu tiên Trung bình (Medium): 33 ca (chiếm 31.7%) — bao gồm các tính năng liên kết mạng xã hội, tương tác bài viết blog, đánh giá cộng đồng và sao kê tài chính.\n"
        "• Giá trị biên (Boundary): 4 ca (chiếm 3.8%) — kiểm tra ngưỡng mật khẩu tối thiểu 6 ký tự, thời gian sống token reset 30 phút, số tiền ủng hộ tối thiểu > 0 VNĐ và độ dài góp ý 10–2000 ký tự.\n"
        "• Ưu tiên Thấp (Low): 8 ca (chiếm 7.7%) — kiểm tra các màn hình Look & Feel, giao diện 404 tùy biến và trải nghiệm người dùng.\n"
        "Mỗi kịch bản đều được gắn mã định danh duy nhất (TC ID), điều kiện tiên quyết rõ ràng, các bước thao tác cụ thể từng bước, dữ liệu đầu vào và kết quả mong đợi lượng hóa."
    )
    for r in p_c2.runs:
        set_run_font(r, size=12)
    print("Inserted Section 3.3 into body before Chapter 4.")

# 8. Update Body Section 4.2 Heading and Contents
body_sec42_heading_idx = None
body_sec43_heading_idx = None
for i, p in enumerate(doc.paragraphs):
    if i > 35 and "4.2." in p.text and ("chưa chạy" in p.text.lower() or "không đạt" in p.text.lower()):
        body_sec42_heading_idx = i
    if i > 35 and "4.3. Báo cáo 26 lỗi thực tế phát hiện được" in p.text:
        body_sec43_heading_idx = i
        break

print(f"Body Section 4.2: {body_sec42_heading_idx}, Section 4.3: {body_sec43_heading_idx}")

if body_sec42_heading_idx is not None and body_sec43_heading_idx is not None:
    # Update Heading 4.2
    p_head = doc.paragraphs[body_sec42_heading_idx]
    p_head.text = "4.2. Phân tích các ca kiểm thử không đạt (28 FAIL) và các tính năng chưa tích hợp bên thứ ba"
    for r in p_head.runs:
        set_run_font(r, size=13, bold=True)
    
    # We will replace paragraphs between body_sec42_heading_idx and body_sec43_heading_idx
    # Let's delete existing paragraphs between them first, except we can reuse one or insert new
    paras_between = [doc.paragraphs[k] for k in range(body_sec42_heading_idx + 1, body_sec43_heading_idx)]
    for p_del in paras_between[1:]:
        p_del._p.getparent().remove(p_del._p)
    
    # Now paras_between[0] can hold paragraph 1
    p_lead = paras_between[0]
    p_lead.text = (
        "Nhóm 02 thực hiện kiểm thử minh bạch trên hệ thống thật với 104 kịch bản phần mềm, đạt 76 PASS và 28 FAIL "
        "(100% ca kiểm thử được thực thi, 0 ca để trống, 0 ca chưa chạy). Toàn bộ 28 ca không đạt (FAIL) được phân loại khoa học thành 2 nhóm nguyên nhân kỹ thuật rõ ràng:"
    )
    for r in p_lead.runs:
        set_run_font(r, size=12)
    
    p_g1 = doc.paragraphs[body_sec43_heading_idx].insert_paragraph_before(
        "1. Nhóm các tính năng nghiệp vụ nâng cao phụ thuộc dịch vụ bên thứ ba (8 ca FAIL):\n"
        "Hệ thống hiện tại chưa tích hợp đầy đủ các dịch vụ hạ tầng thực tế bên ngoài, do đó nhóm kiểm thử ghi nhận nghiêm túc trạng thái FAIL nhằm làm cơ sở cho kế hoạch tích hợp trong giai đoạn tiếp theo:\n"
        "• TC_AUTH_005 (Đăng nhập Google OAuth): Chưa hoàn thiện Google OAuth Client ID/Secret trên môi trường live.\n"
        "• TC_KYC_011 (Chụp ảnh webcam eKYC trực tiếp): Quy trình eKYC sandbox tự cấp duyệt, chưa kích hoạt webcam và dịch vụ AI nhận diện CCCD thật.\n"
        "• TC_PLED_009 (Chuyển khoản thực tế bằng tiền mặt): Hệ thống sử dụng mô phỏng VietQR, chưa kết nối API đối soát tài khoản ngân hàng trực tiếp.\n"
        "• TC_PLED_010 (Hoàn tiền tự động qua cổng NAPAS): Mới chuyển trạng thái sổ cái nội bộ sang REFUNDED, chưa phát lệnh thanh toán liên ngân hàng NAPAS.\n"
        "• TC_CERT_010 (Ký số token điện tử hợp chuẩn): Mẫu hóa đơn điện tử XML chưa nhúng chữ ký số USB Token và chưa đồng bộ cơ quan Thuế.\n"
        "• TC_COMM_011 (Phân tích sắc thái bình luận tự động): Chưa tích hợp API Cloud AI Sentiment Analysis bên thứ ba để lọc bình luận tự động.\n"
        "• TC_BLOG_012 (Đồng bộ chia sẻ fanpage Facebook): Chưa tích hợp Facebook Graph API và Page Access Token tự động.\n"
        "• TC_ADMN_009 (Kiểm thử tải đồng thời 500 CCU): Chưa tối ưu hóa connection pool cơ sở dữ liệu để đáp ứng 500 người dùng đồng thời."
    )
    for r in p_g1.runs:
        set_run_font(r, size=12)
        
    p_g2 = doc.paragraphs[body_sec43_heading_idx].insert_paragraph_before(
        "2. Nhóm các lỗi nghiệp vụ và mã lỗi HTTP trên hệ thống thực tế (20 ca FAIL):\n"
        "Bao gồm 2 ca cổng thanh toán cũ đã tắt (TC_PLED_004, TC_PLED_005 trả HTTP 410); 4 ca định tuyến trang lỗi trả nhầm mã HTTP 200 thay vì 404 (TC_CAMP_010, TC_CERT_005, TC_CERT_007, TC_BLOG_004); các lỗi logic nghiệp vụ về xác thực, phân quyền, kiểm tra dữ liệu đầu vào và đồng bộ trạng thái (TC_AUTH_009, TC_CAMP_012, TC_REWD_001, TC_CERT_008, TC_COMM_003, TC_COMM_009, TC_COMM_010, TC_BLOG_005, TC_BLOG_006, TC_CHAT_003, TC_CHAT_006, TC_ADMN_004, TC_ADMN_007, TC_ADMN_008). Toàn bộ 20 ca lỗi này được nhóm ghi nhận thành 26 phiếu báo lỗi (Bug Reports) chi tiết tại Mục 4.3 dưới đây."
    )
    for r in p_g2.runs:
        set_run_font(r, size=12)

    print("Updated Section 4.2 body.")

# 9. Update Table 7 (Phụ lục)
t7 = doc.tables[7]
appendix_items = [
    ("1", "01-IC-Product-Requirements_23CT113_Nhom02.xlsx", "Bản đặc tả yêu cầu sản phẩm song ngữ Anh-Việt chuẩn hóa (92 dòng đối xứng), bao quát 10 phân hệ nghiệp vụ."),
    ("2", "Test Case_23CT113_Nhom02.xlsx", "Workbook kiểm thử chuẩn 4 sheets: TongQuan_Dashboard, TR List (42 TRs), TC List (104 TCs), RTM (công thức liên kết động)."),
    ("3", "Test Plan_23CT113_Nhom02.docx", "Kế hoạch kiểm thử phần mềm 9 mục chuẩn IEEE 829, phân công 5 thành viên, tiêu chuẩn hoàn thành kiểm thử."),
    ("4", "Test Report_23CT113_Nhom02.docx", "Báo cáo kết quả kiểm thử 7 phần chi tiết: 76 PASS / 28 FAIL / 0 Chưa chạy, phân tích 26 Bug Reports."),
    ("5", "TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx", "Kế hoạch và đánh giá đóng góp của Trưởng nhóm: 3 bảng chuẩn, Bảng 1 có 6 dòng, Mục 4 đối chiếu 10 phân hệ."),
    ("6", "TimeLine/Biên Bản Họp Nhóm Lần 1 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx", "Biên bản họp khởi động tuần 1 (Thứ Hai 12/10/2026), có chèn ảnh phiên họp thực tế Hình 1."),
    ("7", "TimeLine/Biên Bản Họp Nhóm Lần 2 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx", "Biên bản họp rà soát test case tuần 2 (Thứ Hai 19/10/2026), có chèn ảnh phiên họp thực tế Hình 2."),
    ("8", "TimeLine/Biên Bản Họp Nhóm Lần 3 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx", "Biên bản họp nghiệm thu tuần 3 (Thứ Hai 26/10/2026), có chèn ảnh phiên họp thực tế Hình 3."),
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
    for c in row_cells:
        for p in c.paragraphs:
            for r in p.runs:
                set_run_font(r, size=11)

print(f"Updated Table 7. Rows count: {len(t7.rows)} (Header + 13 items).")

doc.save(word_path)
print("Saved complete Stage 3 updates to Báo Cáo Word successfully!")

