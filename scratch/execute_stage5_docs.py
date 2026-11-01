import docx
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')
base = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)"

# ==================== 1. Test Plan ====================
plan_path = os.path.join(base, "Test Plan_23CT113_Nhom02.docx")
dp = docx.Document(plan_path)
for p in dp.paragraphs:
    if "3.2. Phạm vi bên ngoài" in p.text or "được để trống kết quả minh bạch" in p.text:
        p.text = (
            "3.2. Phạm vi bên ngoài (Out-of-Scope):\n"
            "Các tính năng và kịch bản phụ thuộc dịch vụ hạ tầng bên ngoài được phân định ranh giới rõ ràng và ghi nhận nghiêm túc là FAIL (100% được thực thi và đánh giá, 0 ca để trống, 0 ca chưa chạy):\n"
            "• Chuyển tiền mặt thật từ ứng dụng Mobile Banking vào tài khoản ngân hàng thực tế ngoài đời (TC_PLED_009 xếp loại FAIL).\n"
            "• Hoàn tiền tự động liên ngân hàng NAPAS cho người ủng hộ khi chiến dịch thất bại (TC_PLED_010 xếp loại FAIL).\n"
            "• Cổng thanh toán ví điện tử MoMo/VNPay (hệ thống đã vô hiệu hóa, trả về HTTP 410 ESCROW_BANK_ONLY — TC_PLED_004, TC_PLED_005 xếp loại FAIL).\n"
            "• Đăng nhập tài khoản Google OAuth thực tế (yêu cầu tài khoản Google cá nhân và xác thực 2FA ngoài đời — TC_AUTH_005 xếp loại FAIL).\n"
            "• Cuộc gọi video P2P trên thiết bị di động thật và kiểm thử chịu tải đồng thời trên 500 CCU (TC_CHAT_006, TC_ADMN_009 xếp loại FAIL)."
        )
dp.save(plan_path)
print("Updated Test Plan successfully.")

# ==================== 2. Test Report ====================
report_path = os.path.join(base, "Test Report_23CT113_Nhom02.docx")
dr = docx.Document(report_path)
for p in dr.paragraphs:
    if "Ca giao sách in" in p.text:
        p.text = (
            "Kết quả kiểm thử được đối soát chính xác 100% từ bảng tính Test Case_23CT113_Nhom02.xlsx:\n"
            "• Tổng số Yêu cầu kiểm thử (TR): 42 TRs bao phủ toàn bộ 10 phân hệ nghiệp vụ.\n"
            "• Tổng số Kịch bản kiểm thử (TC): 104 (59 High, 33 Medium, 4 Boundary, 8 Low). Bộ kịch bản đo lường trực tiếp phần mềm hệ thống; phân hệ REWARD chuẩn hóa từ TC_REWD_001 đến TC_REWD_008.\n"
            "• Số TC đã thực thi: 104 / 104 (100%).\n"
            "• Kết quả: 76 PASS (73.1%), 28 FAIL (26.9%), 0 BLOCKED, 0 Chưa chạy (0 ca để trống).\n"
            "• Tỷ lệ PASS trên số đã chạy: 76 / 104 = 73.1%. Repo môn không bắt tỷ lệ pass cố định. Nhóm tự đặt mốc ≥ 85.0% và chưa đạt.\n"
            "• Độ bao phủ yêu cầu: 42 / 42 TRs (100.0%).\n"
            "• Tám ca liên quan dịch vụ bên thứ ba (Google OAuth, eKYC webcam, chuyển khoản ngân hàng, hoàn NAPAS, ký số hóa đơn Thuế, phân tích cảm xúc AI, fanpage FB và đo tải 500 CCU) được chấm FAIL minh bạch, không để trống."
        )
dr.save(report_path)
print("Updated Test Report successfully.")

# ==================== 3. Leader Plan ====================
leader_path = os.path.join(base, "TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx")
dl = docx.Document(leader_path)
for p in dl.paragraphs:
    if "56 High, 36 Medium, 13 Low" in p.text:
        p.text = "• Tổng số Kịch bản kiểm thử (TC): 104 TCs (phân bổ: 59 High, 33 Medium, 4 Boundary, 8 Low) được thiết kế theo đúng 4 kỹ thuật Functional, Boundary, Negative, LooknFeel."
    elif "Số TC chưa thực thi: 12 TCs" in p.text or "12 TCs được để trống" in p.text:
        p.text = "• Số TC chưa thực thi / để trống: 0 TC (100% 104/104 TCs đã thực thi). Các ca kiểm thử phụ thuộc dịch vụ bên ngoài được ghi nhận nghiêm túc là FAIL để phục vụ backlog nâng cấp."
    elif "3. BẢNG CHI TIẾT BUG REPORT" in p.text:
        p.text = "3. BẢNG CHI TIẾT BUG REPORT (TRÍCH XUẤT 4 LỖI TIÊU BIỂU TRONG 26 BUGS PHÁT HIỆN ĐƯỢC)"
dl.save(leader_path)
print("Updated Leader Plan successfully.")

# ==================== 4. Meeting Minutes 3 ====================
min3_path = os.path.join(base, "TimeLine/Biên Bản Họp Nhóm Lần 3 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx")
dm = docx.Document(min3_path)
for p in dm.paragraphs:
    if "4 Bug Reports (BUG-001 -> BUG-004)" in p.text:
        p.text = "• Rà soát và phân loại 26 Bug Reports sinh từ các ca kiểm thử FAIL thực tế trên hệ thống (chi tiết tại Báo cáo Word)"
    elif "4 Bug Reports gồm 2 High" in p.text:
        p.text = "- 26 Bug Reports được phân loại chặt chẽ: 8 High (cổng MoMo/VNPay trả 410, minAmount âm, JWT editor callback, khóa BANNED...), 12 Medium (polling WebRTC 1.2s, hủy campaign có pledge, rating chưa cập nhật...), 6 Low (trang 404 trả HTTP 200, form feedback thiếu validate, nội dung blog rỗng...)"
dm.save(min3_path)
print("Updated Meeting Minutes 3 successfully.")

