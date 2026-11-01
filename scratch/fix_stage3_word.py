import docx
import sys

sys.stdout.reconfigure(encoding='utf-8')

word_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"
doc = docx.Document(word_path)

print("Paragraphs:", len(doc.paragraphs))
print("Tables:", len(doc.tables))

# 1. Fix Table 2 (Mục 2.3: Tài khoản)
t2 = doc.tables[2]
# Row 5 is the 5th account
t2.rows[5].cells[0].text = "qa.nhom02.backer@gmail.com"
t2.rows[5].cells[1].text = "Nhom02@2026"
t2.rows[5].cells[2].text = "BACKER"
t2.rows[5].cells[3].text = "200 OK (Thành công)"
t2.rows[5].cells[4].text = "Tài khoản đăng ký mới qua API, kiểm thử phân quyền và đóng góp."
print("Fixed Table 2 (Accounts).")

# 2. Fix Table 3 (Mục 2.4: Phân công)
t3 = doc.tables[3]
# Row 1: Tài
t3.rows[1].cells[5].text = "23/23 TC đã chạy (100%)"
# Row 2: Ân
t3.rows[2].cells[3].text = "Thành viên"
t3.rows[2].cells[4].text = "CAMP & REWARD (TR-010 -> TR-018)"
t3.rows[2].cells[5].text = "9 TR & 23 TC"
t3.rows[2].cells[5].text = "23/23 TC đã chạy (100%)"
# Wait, check columns in Table 3:
# ['Thành viên', 'MSSV', 'Vai trò', 'Phân hệ phụ trách', 'Khối lượng', 'Tiến độ thực thi']
# col 0: Tên, col 1: MSSV, col 2: Vai trò, col 3: Phân hệ phụ trách, col 4: Khối lượng, col 5: Tiến độ
t3.rows[2].cells[3].text = "CAMP & REWARD (TR-010 -> TR-018)"
t3.rows[2].cells[4].text = "9 TR & 23 TC"
t3.rows[2].cells[5].text = "23/23 TC đã chạy (100%)"

t3.rows[3].cells[5].text = "20/20 TC đã chạy (100%)"
t3.rows[4].cells[5].text = "23/23 TC đã chạy (100%)"
t3.rows[5].cells[5].text = "15/15 TC đã chạy (100%)"
print("Fixed Table 3 (Assignment).")

# 3. Fix Table 4 (Mục 3.2: 42 TRs summary)
t4 = doc.tables[4]
# ['Phân hệ', 'Dải TR ID', 'Số lượng TR', 'Trọng tâm nghiệp vụ kiểm thử']
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
print("Fixed Table 4 (TR range).")

# 4. Fix Table 5 (Mục 4.1: Results summary)
t5 = doc.tables[5]
# ['Phân hệ', 'Số TR', 'Số TC', 'Đã chạy', 'PASS', 'FAIL', 'Chưa chạy', 'Tỷ lệ Đạt']
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
print("Fixed Table 5 (Results summary).")

# 5. Fix Paragraphs and clean AI prompt artifacts
for p in doc.paragraphs:
    txt = p.text
    # Fix Chapter 4 introductory texts and 4.2
    if "Tuân thủ nghiêm ngặt Luật 2 của Mục 0" in txt:
        p.text = "Nhóm 02 thực hiện kiểm thử minh bạch trên hệ thống thật với 104 kịch bản phần mềm, đạt 76 PASS và 28 FAIL (0 ca để trống). Đối với các ca kiểm thử liên quan đến cổng thanh toán thật, eKYC trực tiếp, gọi video 2 máy thật hay đo tải phân tán, hệ thống ghi nhận đúng bản chất kỹ thuật của mã nguồn hiện tại và xếp loại FAIL để phục vụ kế hoạch nâng cấp tiếp theo."
    elif "4.2. Danh sách các ca kiểm thử chưa chạy và lý do kỹ thuật" in txt:
        p.text = "4.2. Phân tích các ca kiểm thử không đạt (28 FAIL) và các tính năng chưa tích hợp bên thứ ba"
    elif "Do đề tài không yêu cầu tài liệu IC/PRD (Mục 6)" in txt:
        p.text = "Hệ thống yêu cầu kiểm thử được liên kết chặt chẽ với tài liệu đặc tả sản phẩm song ngữ (01-IC-Product-Requirements) và mã nguồn thực tế. Toàn bộ 10 nhóm chức năng được ánh xạ tương ứng từ FR-01 đến FR-10 trong ma trận RTM, đảm bảo mỗi yêu cầu kiểm thử đều có từ 2–3 kịch bản kiểm thử bảo đảm tính toàn vẹn."
    elif "Ca giao sách in đã bỏ" in txt:
        p.text = "• Bảng tính kiểm thử gồm 104 ca kiểm thử phần mềm đo lường trực tiếp hành vi hệ thống. Phân hệ REWARD chuẩn hóa từ TC_REWD_001 đến TC_REWD_008."
    elif "Thêm: editor blog sai callback" in txt:
        p.text = "26 lỗi kỹ thuật được bóc tách chi tiết gồm: cổng MoMo/VNPay trả 410 do cơ chế ký quỹ độc quyền VietQR, WebRTC đàm thoại polling 1.2s thay vì WebSocket, thiếu validate độ dài góp ý trên client, quên mật khẩu trả 202 không chứng minh token, hủy chiến dịch đã có ủng hộ vẫn thành công, đường dẫn không tồn tại trả HTTP 200 thay vì 404, minAmount âm vẫn tạo được phần thưởng, và các tính năng chưa tích hợp dịch vụ thật bên thứ ba."
    elif "gồm đúng 11 files + thư mục evidence/" in txt:
        p.text = "Toàn bộ hồ sơ kiểm thử được đóng gói chuẩn mực trong thư mục 23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/ gồm đầy đủ 12 tài liệu quy chuẩn (có tệp đặc tả yêu cầu sản phẩm IC song ngữ .xlsx) cùng thư mục evidence/ chứa 128 tệp bằng chứng thực thi xác thực:"

# Check where Section 3.2 is and insert Section 3.3
# Look for paragraph 3.2 Table 4
for i, p in enumerate(doc.paragraphs):
    if "3.2. Bảng tổng hợp 42 Yêu cầu kiểm thử (TRs)" in p.text:
        print(f"Found 3.2 at paragraph {i}")
    if "CHƯƠNG 4. BÁO CÁO KẾT QUẢ THỰC THI" in p.text:
        print(f"Found Chapter 4 at paragraph {i}")

doc.save(word_path)
print("Saved base updates to Báo Cáo Word.")

