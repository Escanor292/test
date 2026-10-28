# -*- coding: utf-8 -*-
"""
Sinh workbook Test Case cho nhóm 23CT113 - dự án TuTeFund.

Nguồn sự thật:
  - 01-IC-Product-Requirements_23CT113_Nhom02.md (PRD 2.0.0)
  - prisma/schema.prisma
  - các route/handler được ghi trong cột "Source/Reference Requirement"

Mọi sheet được sinh từ MỘT nguồn dữ liệu duy nhất (REQS / TRS / TCS) nên
các con số trong Summary không thể lệch với nội dung thực tế.
"""

from __future__ import annotations

import collections
import sys
from pathlib import Path

import openpyxl
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

# ─────────────────────────────────────────────────────────────────────────────
# 1. DỮ LIỆU GỐC
# ─────────────────────────────────────────────────────────────────────────────

ENV = "Local + Deploy (test-gamma-azure-65.vercel.app)"
ASSIGNEE = {
    "LOGIN": "Nguyễn Quách Phú Tài",
    "CAMP": "Trần Xuân Ân",
    "REWARD": "Bùi Đặng Quốc Khánh",
    "BLOG": "Nguyễn Trung Tiến",
    "KYC": "Nguyễn Khánh Du",
}
MODULE = {
    "LOGIN": "Login",
    "CAMP": "Campaign",
    "REWARD": "Reward",
    "BLOG": "Blog",
    "KYC": "KYC",
}

# (id, module, title, description, role, acceptance, priority, source)
REQS = [
    # ── LOGIN ────────────────────────────────────────────────────────────────
    ("REQ-LOGIN-001", "LOGIN", "Đăng ký tài khoản người dùng",
     "Người dùng tạo tài khoản bằng họ tên, email, mật khẩu, xác nhận mật khẩu; tùy chọn khai báo là tổ chức và bắt buộc đồng ý điều khoản.",
     "Khách", "Tài khoản được tạo với role BACKER và status NORMAL; mật khẩu lưu dưới dạng băm bcrypt.",
     "High", "FR-AUTH-01 (PRD 2.0.0)"),
    ("REQ-LOGIN-002", "LOGIN", "Đăng nhập và quản lý phiên",
     "Người dùng đăng nhập bằng email và mật khẩu; hệ thống duy trì phiên và gắn thông tin id, role, isAdmin vào phiên.",
     "Người dùng", "Đăng nhập đúng chuyển hướng tới /dashboard; người đã đăng nhập mở /auth/login được chuyển về /dashboard.",
     "High", "FR-AUTH-02 (PRD 2.0.0)"),
    ("REQ-LOGIN-003", "LOGIN", "Quên và đặt lại mật khẩu",
     "Người dùng yêu cầu đặt lại mật khẩu qua email; hệ thống sinh token lưu trong bảng password_reset_tokens và cho phép đặt mật khẩu mới bằng token.",
     "Người dùng", "Token được tạo gắn với tài khoản; đặt lại thành công cho phép đăng nhập bằng mật khẩu mới.",
     "Medium", "FR-AUTH-03 (PRD 2.0.0)"),
    ("REQ-LOGIN-004", "LOGIN", "Cập nhật hồ sơ cá nhân",
     "Người dùng cập nhật tên hiển thị, tiểu sử, địa điểm, website, số điện thoại, ảnh đại diện và ảnh bìa.",
     "Người dùng", "Thông tin mới được lưu và hiển thị lại chính xác trên hồ sơ.",
     "Medium", "FR-AUTH-04 (PRD 2.0.0)"),
    ("REQ-LOGIN-005", "LOGIN", "Nâng cấp tài khoản lên Creator",
     "Người dùng gửi yêu cầu trở thành Creator để có quyền tạo chiến dịch; Admin là người phê duyệt.",
     "Backer", "Yêu cầu được ghi nhận và role chuyển từ BACKER sang CREATOR_PENDING.",
     "Medium", "FR-AUTH-05 (PRD 2.0.0)"),

    # ── CAMPAIGN ─────────────────────────────────────────────────────────────
    ("REQ-CAMP-001", "CAMP", "Khởi tạo chiến dịch gây quỹ",
     "Creator tạo chiến dịch với tiêu đề, mô tả, danh mục, mục tiêu tài chính, mô hình gây quỹ và ngày kết thúc; hệ thống sinh mã chiến dịch và slug duy nhất.",
     "Creator", "Chiến dịch được tạo ở trạng thái DRAFT với fundingModel mặc định ALL_OR_NOTHING, feeRate 0.08, endDate mặc định 60 ngày kể từ lúc tạo.",
     "High", "FR-CAMP-02 (PRD 2.0.0)"),
    ("REQ-CAMP-002", "CAMP", "Khám phá, tìm kiếm và lọc chiến dịch",
     "Khách và người dùng xem danh sách chiến dịch công khai, tìm theo từ khóa và lọc theo danh mục, trạng thái, mô hình gây quỹ.",
     "Khách", "Chỉ chiến dịch ở trạng thái công khai (ACTIVE, SUCCESS, FAILED) xuất hiện; DRAFT và PENDING_REVIEW bị ẩn.",
     "High", "FR-CAMP-01 (PRD 2.0.0)"),
    ("REQ-CAMP-003", "CAMP", "Gửi duyệt và rút hồ sơ chiến dịch",
     "Creator gửi chiến dịch sang hàng đợi duyệt, hoặc rút lại về nháp để chỉnh sửa tiếp.",
     "Creator", "DRAFT chuyển được sang PENDING_REVIEW; PENDING_REVIEW rút được về DRAFT; chỉ chủ sở hữu thực hiện được.",
     "High", "FR-CAMP-04, FR-CAMP-06 (PRD 2.0.0)"),
    ("REQ-CAMP-004", "CAMP", "Admin duyệt hoặc từ chối chiến dịch",
     "Admin xét chiến dịch đang chờ duyệt và quyết định cho chạy hoặc từ chối kèm lý do.",
     "Admin", "Chỉ chấp nhận ACTIVE hoặc CANCELED; từ chối bắt buộc có lý do; chiến dịch không ở PENDING_REVIEW trả 409; ghi audit_logs và gửi thông báo.",
     "High", "FR-CAMP-05 (PRD 2.0.0)"),
    ("REQ-CAMP-005", "CAMP", "Hủy chiến dịch và hoàn tiền",
     "Chủ sở hữu hoặc Admin hủy chiến dịch đang chạy; hệ thống chuyển trạng thái và hoàn tiền cho các lượt ủng hộ đã thành công.",
     "Creator, Admin", "Chiến dịch chuyển FAILED; toàn bộ pledge SUCCESS được xử lý hoàn tiền; hủy lần hai trả 400.",
     "High", "FR-CAMP-07 (PRD 2.0.0)"),
    ("REQ-CAMP-006", "CAMP", "Chốt hạn chiến dịch tự động",
     "Tác vụ định kỳ quét các chiến dịch ACTIVE đã quá ngày kết thúc và chốt trạng thái cuối cùng theo mô hình gây quỹ.",
     "Hệ thống", "Có quà: luôn SUCCESS dù chưa đạt mục tiêu. Không quà và ALL_OR_NOTHING và chưa đạt mục tiêu: FAILED kèm hoàn tiền.",
     "High", "FR-CRON-01 (PRD 2.0.0)"),

    # ── REWARD ───────────────────────────────────────────────────────────────
    ("REQ-REWARD-001", "REWARD", "Tạo gói phần thưởng",
     "Creator tạo gói phần thưởng gồm tiêu đề, mô tả, mức ủng hộ tối thiểu, số lượng tối đa, tồn kho, ngày giao dự kiến và loại hình giao hàng.",
     "Creator", "Gói được lưu với isActive true, availability AVAILABLE, fulfillmentType mặc định PHYSICAL.",
     "High", "FR-REWD-01 (PRD 2.0.0)"),
    ("REQ-REWARD-002", "REWARD", "Ràng buộc số lượng và tồn kho",
     "Gói phần thưởng phải khai báo mức ủng hộ tối thiểu dương; số lượng tối đa và tồn kho kiểm soát số lượt ủng hộ.",
     "Creator", "minAmount bắt buộc và phải lớn hơn 0; maxQuantity giới hạn số lượt; stock rỗng nghĩa là không giới hạn, stock bằng 0 là hết hàng.",
     "High", "FR-REWD-01 (PRD 2.0.0)"),
    ("REQ-REWARD-003", "REWARD", "Cập nhật và bật tắt gói phần thưởng",
     "Creator chỉnh sửa thông tin gói phần thưởng hoặc tạm ngừng mở bán.",
     "Creator", "Chỉ chủ sở hữu chiến dịch cập nhật được; thao tác bật tắt đổi giá trị isActive.",
     "Medium", "FR-REWD-02 (PRD 2.0.0)"),
    ("REQ-REWARD-004", "REWARD", "Cấp phát sản phẩm số",
     "Gói phần thưởng loại số có kho sản phẩm số riêng; mỗi lượt ủng hộ nhận tối đa một sản phẩm.",
     "Creator", "Sản phẩm số gắn với pledgeId là duy nhất; vòng đời AVAILABLE, RESERVED, DELIVERED, CLAIMED, REVOKED.",
     "Medium", "FR-REWD-03 (PRD 2.0.0)"),
    ("REQ-REWARD-005", "REWARD", "Đánh giá sản phẩm",
     "Người đã ủng hộ gói quà gửi đánh giá sản phẩm; mỗi lượt ủng hộ chỉ đánh giá một lần.",
     "Backer", "Đánh giá lưu được với pledgeId; gửi lần thứ hai bị từ chối do ràng buộc duy nhất trên pledgeId.",
     "Low", "FR-REWD-04 (PRD 2.0.0)"),
    ("REQ-REWARD-006", "REWARD", "Theo dõi trạng thái giao hàng",
     "Creator cập nhật trạng thái giao hàng của từng lượt ủng hộ theo vòng đời fulfillment.",
     "Creator", "Trạng thái đi đúng thứ tự AWAITING_PAYMENT, PROCESSING, SHIPPED, DELIVERED; có nhánh lỗi và hoàn trả.",
     "Medium", "FR-REWD-05 (PRD 2.0.0)"),

    # ── BLOG ─────────────────────────────────────────────────────────────────
    ("REQ-BLOG-001", "BLOG", "Soạn thảo và lưu bài viết",
     "Tác giả soạn bài bằng trình biên tập rich text, lưu ở trạng thái nháp để tiếp tục chỉnh sửa.",
     "Creator, Backer", "Bài được lưu với status DRAFT và publishedAt rỗng; chỉ tác giả nhìn thấy.",
     "High", "FR-BLOG-01 (PRD 2.0.0)"),
    ("REQ-BLOG-002", "BLOG", "Làm sạch nội dung HTML",
     "Mọi nội dung rich text phải được lọc qua bộ làm sạch trước khi lưu để chặn mã độc.",
     "Hệ thống", "Thẻ script và thuộc tính sự kiện bị loại bỏ; không payload nào thực thi khi mở bài.",
     "High", "FR-BLOG-01 (PRD 2.0.0)"),
    ("REQ-BLOG-003", "BLOG", "Quy trình xuất bản bài viết",
     "Bài viết đi qua vòng đời nháp, chờ duyệt, đã xuất bản, lưu trữ; một số trường hợp được xuất bản trực tiếp.",
     "Creator, Admin", "Admin xuất bản trực tiếp; tác giả có quyền blog.publish_direct hoặc bài CAMPAIGN_UPDATE của tác giả đã KYC thì xuất bản trực tiếp; còn lại vào PENDING_REVIEW.",
     "High", "FR-BLOG-02 (PRD 2.0.0)"),
    ("REQ-BLOG-004", "BLOG", "Hiển thị công khai và hẹn giờ",
     "Bài viết chỉ công khai khi đã xuất bản và thời điểm xuất bản không ở tương lai.",
     "Khách", "Bài PENDING_REVIEW không hiển thị; bài PUBLISHED có publishedAt tương lai chưa hiển thị; đã qua thời điểm thì hiển thị.",
     "High", "FR-BLOG-03 (PRD 2.0.0)"),
    ("REQ-BLOG-005", "BLOG", "Tương tác với bài viết",
     "Người dùng thả tim, lưu dấu trang và bình luận; bình luận có trạng thái kiểm duyệt.",
     "Người dùng", "Tim và dấu trang lưu được theo người dùng; bình luận mới ở trạng thái PENDING; mỗi người chỉ tim một lần.",
     "Medium", "FR-BLOG-04 (PRD 2.0.0)"),
    ("REQ-BLOG-006", "BLOG", "Báo cáo bài viết vi phạm",
     "Người dùng gửi báo cáo bài viết có nội dung không phù hợp để Admin xử lý.",
     "Người dùng", "Bản ghi báo cáo được tạo với lý do và trạng thái chờ xử lý; Admin xem được trong hàng đợi.",
     "Low", "FR-BLOG-05 (PRD 2.0.0)"),

    # ── KYC ──────────────────────────────────────────────────────────────────
    ("REQ-KYC-001", "KYC", "Gửi hồ sơ xác minh danh tính",
     "Người dùng khai báo thông tin định danh và tải ảnh giấy tờ, ảnh chân dung để gửi duyệt.",
     "Người dùng", "Hồ sơ được lưu với verificationStatus PENDING; họ tên và số giấy tờ là bắt buộc; lưu thời điểm đồng ý.",
     "High", "FR-KYC-01 (PRD 2.0.0)"),
    ("REQ-KYC-002", "KYC", "Ràng buộc duy nhất của hồ sơ định danh",
     "Mỗi người dùng chỉ có một hồ sơ KYC và mỗi số giấy tờ chỉ gắn với một tài khoản.",
     "Hệ thống", "userId là duy nhất; idCardNumber là duy nhất; gửi lại thì cập nhật hồ sơ cũ.",
     "High", "FR-KYC-01 (PRD 2.0.0)"),
    ("REQ-KYC-003", "KYC", "Admin duyệt hoặc từ chối hồ sơ KYC",
     "Admin xem hồ sơ đang chờ và quyết định xác minh hoặc từ chối kèm lý do.",
     "Admin", "Duyệt chuyển VERIFIED và ghi verifiedAt, verifiedBy; từ chối chuyển REJECTED và lưu rejectedReason.",
     "High", "FR-KYC-02 (PRD 2.0.0)"),
    ("REQ-KYC-004", "KYC", "Xác minh danh tính tự động bằng eKYC",
     "Hệ thống đọc giấy tờ, kiểm tra thực thể sống và so khớp khuôn mặt qua nhà cung cấp eKYC.",
     "Hệ thống", "Điểm liveness phải đạt ngưỡng 70; dưới ngưỡng thì yêu cầu thực hiện lại.",
     "Medium", "FR-KYC-03 (PRD 2.0.0)"),
    ("REQ-KYC-005", "KYC", "Áp hạn mức giao dịch theo trạng thái KYC",
     "Hạn mức giao dịch thay đổi theo trạng thái xác minh danh tính của người dùng.",
     "Hệ thống", "Chưa xác minh: tối đa 20.000.000 VNĐ mỗi giao dịch. Đã xác minh: tối đa 500.000.000 VNĐ mỗi giao dịch.",
     "High", "FR-KYC-04 (PRD 2.0.0)"),
    ("REQ-KYC-006", "KYC", "Kiểm tra tệp tải lên",
     "Hệ thống chỉ chấp nhận ảnh và video đúng định dạng và đúng dung lượng cho phép.",
     "Hệ thống", "Ảnh tối đa 5 MB thuộc jpeg, jpg, png, webp, gif; video tối đa 30 MB; tệp khác bị từ chối.",
     "Medium", "FR-KYC-01, BR-11, BR-12 (PRD 2.0.0)"),
]

# (tr_id, req_id, module, description)
TRS = [
    # LOGIN
    ("TR-LOGIN-001", "REQ-LOGIN-001", "LOGIN", "Đăng ký tài khoản thành công với dữ liệu hợp lệ"),
    ("TR-LOGIN-002", "REQ-LOGIN-001", "LOGIN", "Kiểm tra ràng buộc dữ liệu khi đăng ký"),
    ("TR-LOGIN-003", "REQ-LOGIN-002", "LOGIN", "Đăng nhập thành công và duy trì phiên"),
    ("TR-LOGIN-004", "REQ-LOGIN-002", "LOGIN", "Từ chối đăng nhập không hợp lệ"),
    ("TR-LOGIN-005", "REQ-LOGIN-003", "LOGIN", "Đặt lại mật khẩu bằng token"),
    ("TR-LOGIN-006", "REQ-LOGIN-004", "LOGIN", "Cập nhật hồ sơ cá nhân"),
    ("TR-LOGIN-007", "REQ-LOGIN-005", "LOGIN", "Gửi yêu cầu nâng cấp Creator"),
    # CAMPAIGN
    ("TR-CAMP-001", "REQ-CAMP-001", "CAMP", "Tạo chiến dịch thành công ở trạng thái nháp"),
    ("TR-CAMP-002", "REQ-CAMP-001", "CAMP", "Ràng buộc dữ liệu mục tiêu tài chính"),
    ("TR-CAMP-003", "REQ-CAMP-001", "CAMP", "Sinh mã chiến dịch và slug duy nhất"),
    ("TR-CAMP-004", "REQ-CAMP-002", "CAMP", "Tìm kiếm và lọc danh sách chiến dịch công khai"),
    ("TR-CAMP-005", "REQ-CAMP-003", "CAMP", "Luồng gửi duyệt và rút hồ sơ"),
    ("TR-CAMP-006", "REQ-CAMP-004", "CAMP", "Phân quyền và ràng buộc khi Admin duyệt"),
    ("TR-CAMP-007", "REQ-CAMP-005", "CAMP", "Hủy chiến dịch và hoàn tiền"),
    ("TR-CAMP-008", "REQ-CAMP-006", "CAMP", "Chốt hạn chiến dịch theo mô hình gây quỹ"),
    # REWARD
    ("TR-REWARD-001", "REQ-REWARD-001", "REWARD", "Tạo gói phần thưởng hợp lệ"),
    ("TR-REWARD-002", "REQ-REWARD-002", "REWARD", "Ràng buộc mức ủng hộ, số lượng và tồn kho"),
    ("TR-REWARD-003", "REQ-REWARD-003", "REWARD", "Cập nhật và bật tắt gói phần thưởng"),
    ("TR-REWARD-004", "REQ-REWARD-004", "REWARD", "Cấp phát sản phẩm số theo lượt ủng hộ"),
    ("TR-REWARD-005", "REQ-REWARD-005", "REWARD", "Đánh giá sản phẩm một lần cho mỗi lượt ủng hộ"),
    ("TR-REWARD-006", "REQ-REWARD-006", "REWARD", "Vòng đời trạng thái giao hàng"),
    # BLOG
    ("TR-BLOG-001", "REQ-BLOG-001", "BLOG", "Tạo bài viết nháp"),
    ("TR-BLOG-002", "REQ-BLOG-002", "BLOG", "Làm sạch nội dung HTML trước khi lưu"),
    ("TR-BLOG-003", "REQ-BLOG-003", "BLOG", "Kiểm soát ai được xuất bản trực tiếp"),
    ("TR-BLOG-004", "REQ-BLOG-004", "BLOG", "Điều kiện hiển thị công khai và hẹn giờ"),
    ("TR-BLOG-005", "REQ-BLOG-005", "BLOG", "Tim, dấu trang và bình luận"),
    ("TR-BLOG-006", "REQ-BLOG-006", "BLOG", "Gửi báo cáo bài viết"),
    # KYC
    ("TR-KYC-001", "REQ-KYC-001", "KYC", "Gửi hồ sơ KYC thành công"),
    ("TR-KYC-002", "REQ-KYC-002", "KYC", "Ràng buộc duy nhất của hồ sơ định danh"),
    ("TR-KYC-003", "REQ-KYC-003", "KYC", "Admin duyệt hoặc từ chối hồ sơ"),
    ("TR-KYC-004", "REQ-KYC-004", "KYC", "Ngưỡng điểm thực thể sống của eKYC"),
    ("TR-KYC-005", "REQ-KYC-005", "KYC", "Áp hạn mức giao dịch theo trạng thái KYC"),
    ("TR-KYC-006", "REQ-KYC-006", "KYC", "Kiểm tra định dạng và dung lượng tệp"),
]

# (tc_id, tr_id, title, objective, type, technique, priority, precondition, test_data, steps, expected)
TCS = [
    # ── LOGIN ────────────────────────────────────────────────────────────────
    ("TC-LOGIN-001", "TR-LOGIN-001",
     "Đăng ký tài khoản thành công với dữ liệu hợp lệ",
     "Xác minh hệ thống tạo tài khoản mới và gán quyền mặc định đúng.",
     "Functional", "Positive Testing", "High",
     "Email chưa tồn tại trong hệ thống",
     "name: Nguyễn Văn Test\nemail: newuser01@test.vn\npassword: Abc123\nconfirmPassword: Abc123\nisOrganization: false\nacceptTerms: true",
     "1. Mở trang /auth/register\n2. Nhập đầy đủ các trường hợp lệ\n3. Nhấn nút Đăng ký",
     "Tài khoản được tạo; bản ghi users có role = BACKER và status = NORMAL; chuyển hướng sang trang đăng nhập."),
    ("TC-LOGIN-002", "TR-LOGIN-002",
     "Đăng ký với mật khẩu 5 ký tự (dưới biên)",
     "Kiểm tra ràng buộc độ dài tối thiểu của mật khẩu tại giá trị ngay dưới biên.",
     "Validation", "Boundary Value Analysis", "High",
     "Email chưa tồn tại",
     "password: Abc12 (5 ký tự)\nconfirmPassword: Abc12",
     "1. Mở /auth/register\n2. Nhập mật khẩu 5 ký tự\n3. Nhấn Đăng ký",
     "Hệ thống từ chối và thông báo mật khẩu phải có tối thiểu 6 ký tự; không tạo bản ghi người dùng."),
    ("TC-LOGIN-003", "TR-LOGIN-002",
     "Đăng ký với mật khẩu đúng 6 ký tự (biên dưới)",
     "Kiểm tra giá trị biên dưới được chấp nhận.",
     "Validation", "Boundary Value Analysis", "High",
     "Email chưa tồn tại",
     "password: Abc123 (6 ký tự)\nconfirmPassword: Abc123",
     "1. Mở /auth/register\n2. Nhập mật khẩu đúng 6 ký tự\n3. Nhấn Đăng ký",
     "Hệ thống chấp nhận và tạo tài khoản thành công."),
    ("TC-LOGIN-004", "TR-LOGIN-002",
     "Đăng ký với họ tên chỉ gồm khoảng trắng",
     "Kiểm tra việc loại bỏ khoảng trắng trước khi xác định họ tên rỗng.",
     "Validation", "Equivalence Partitioning", "Medium",
     "Email chưa tồn tại",
     "name: '   ' (ba khoảng trắng)",
     "1. Mở /auth/register\n2. Nhập họ tên chỉ gồm khoảng trắng\n3. Nhấn Đăng ký",
     "Hệ thống từ chối và báo họ tên không được để trống."),
    ("TC-LOGIN-005", "TR-LOGIN-002",
     "Đăng ký khi xác nhận mật khẩu không khớp",
     "Kiểm tra ràng buộc so khớp giữa mật khẩu và xác nhận mật khẩu.",
     "Validation", "Negative Testing", "Medium",
     "Email chưa tồn tại",
     "password: Abc123\nconfirmPassword: Abc124",
     "1. Mở /auth/register\n2. Nhập hai mật khẩu khác nhau\n3. Nhấn Đăng ký",
     "Hệ thống từ chối và thông báo mật khẩu xác nhận không khớp."),
    ("TC-LOGIN-006", "TR-LOGIN-002",
     "Đăng ký với email đã tồn tại",
     "Kiểm tra ràng buộc duy nhất của email.",
     "Validation", "Negative Testing", "High",
     "Đã có tài khoản dùng email test@example.com",
     "email: test@example.com",
     "1. Mở /auth/register\n2. Nhập email đã tồn tại\n3. Nhấn Đăng ký",
     "Hệ thống từ chối và thông báo email đã được sử dụng."),
    ("TC-LOGIN-007", "TR-LOGIN-001",
     "Đăng ký tài khoản tổ chức",
     "Kiểm tra việc lưu cờ tổ chức khi người dùng chọn.",
     "Functional", "Positive Testing", "Medium",
     "Email chưa tồn tại",
     "isOrganization: true",
     "1. Mở /auth/register\n2. Chọn loại tài khoản là tổ chức\n3. Nhấn Đăng ký",
     "Tài khoản được tạo với isOrganization = true và vẫn giữ role mặc định BACKER."),
    ("TC-LOGIN-008", "TR-LOGIN-003",
     "Đăng nhập thành công và tạo phiên",
     "Xác minh xác thực đúng và chuyển hướng sau đăng nhập.",
     "Functional", "Positive Testing", "High",
     "Có tài khoản hợp lệ trong hệ thống",
     "email: test@example.com\npassword: đúng mật khẩu đã đăng ký",
     "1. Mở /auth/login\n2. Nhập email và mật khẩu đúng\n3. Nhấn Đăng nhập",
     "Đăng nhập thành công, chuyển hướng tới /dashboard; phiên chứa id, role và cờ isAdmin."),
    ("TC-LOGIN-009", "TR-LOGIN-004",
     "Đăng nhập với mật khẩu sai",
     "Xác minh hệ thống không cấp phiên khi mật khẩu không đúng.",
     "Validation", "Negative Testing", "High",
     "Có tài khoản hợp lệ",
     "email: test@example.com\npassword: SaiMatKhau",
     "1. Mở /auth/login\n2. Nhập mật khẩu sai\n3. Nhấn Đăng nhập",
     "Hệ thống từ chối, hiển thị thông báo sai thông tin đăng nhập và không tạo phiên."),
    ("TC-LOGIN-010", "TR-LOGIN-004",
     "Đăng nhập với email không tồn tại",
     "Kiểm tra thông báo lỗi không làm lộ sự tồn tại của tài khoản.",
     "Validation", "Equivalence Partitioning", "Medium",
     "Email không có trong hệ thống",
     "email: khongton-tai@test.vn",
     "1. Mở /auth/login\n2. Nhập email không tồn tại\n3. Nhấn Đăng nhập",
     "Hệ thống từ chối với thông báo chung, không tiết lộ email có tồn tại hay không."),
    ("TC-LOGIN-011", "TR-LOGIN-003",
     "Người đã đăng nhập truy cập trang đăng nhập",
     "Kiểm tra việc chặn truy cập lại trang đăng nhập khi đã có phiên.",
     "Functional", "Positive Testing", "Medium",
     "Đang đăng nhập bằng tài khoản hợp lệ",
     "URL: /auth/login",
     "1. Đăng nhập thành công\n2. Truy cập trực tiếp /auth/login",
     "Hệ thống tự chuyển hướng về /dashboard và không hiển thị lại biểu mẫu đăng nhập."),
    ("TC-LOGIN-012", "TR-LOGIN-005",
     "Gửi yêu cầu quên mật khẩu",
     "Xác minh hệ thống sinh token đặt lại mật khẩu cho tài khoản hợp lệ.",
     "Functional", "Positive Testing", "Medium",
     "Tài khoản đã tồn tại",
     "email: test@example.com",
     "1. Mở /auth/forgot-password\n2. Nhập email tài khoản\n3. Nhấn Gửi yêu cầu",
     "Hệ thống tạo bản ghi trong password_reset_tokens gắn với tài khoản và phản hồi đã gửi hướng dẫn."),
    ("TC-LOGIN-013", "TR-LOGIN-005",
     "Đặt lại mật khẩu bằng token hợp lệ",
     "Xác minh token dùng được một lần để đổi mật khẩu.",
     "Functional", "Positive Testing", "High",
     "Có token đặt lại mật khẩu còn hiệu lực",
     "token hợp lệ\nmật khẩu mới: NewPass123",
     "1. Mở liên kết đặt lại mật khẩu\n2. Nhập mật khẩu mới\n3. Xác nhận",
     "Mật khẩu được cập nhật; đăng nhập lại bằng mật khẩu mới thành công."),
    ("TC-LOGIN-014", "TR-LOGIN-006",
     "Cập nhật hồ sơ cá nhân",
     "Kiểm tra việc lưu và hiển thị lại thông tin hồ sơ sau khi sửa.",
     "Functional", "Positive Testing", "Medium",
     "Đang đăng nhập",
     "displayName: Tử Tế\nbio: Người tạo chiến dịch cộng đồng\nlocation: Hà Nội",
     "1. Mở /profile/edit\n2. Sửa tên hiển thị, tiểu sử, địa điểm\n3. Nhấn Lưu",
     "Thông tin mới được lưu vào bảng users và hiển thị đúng khi tải lại trang hồ sơ."),
    ("TC-LOGIN-015", "TR-LOGIN-007",
     "Gửi yêu cầu nâng cấp tài khoản Creator",
     "Xác minh luồng chuyển vai trò sang trạng thái chờ duyệt.",
     "Functional", "Positive Testing", "High",
     "Đang đăng nhập bằng tài khoản role BACKER",
     "Tài khoản Backer chưa từng gửi yêu cầu",
     "1. Mở /upgrade\n2. Điền thông tin yêu cầu\n3. Nhấn Gửi yêu cầu",
     "Yêu cầu được ghi nhận và role chuyển từ BACKER sang CREATOR_PENDING để chờ Admin duyệt."),

    # ── CAMPAIGN ─────────────────────────────────────────────────────────────
    ("TC-CAMP-001", "TR-CAMP-001",
     "Tạo chiến dịch thành công ở trạng thái nháp",
     "Xác minh chiến dịch mới được tạo đúng trạng thái khởi tạo.",
     "Functional", "Positive Testing", "High",
     "Đang đăng nhập bằng tài khoản Creator",
     "title: Chiến dịch cộng đồng\ncategory: Giáo dục\ngoalAmount: 50000000\nmô tả hợp lệ",
     "1. Mở /campaigns/create\n2. Nhập đầy đủ thông tin hợp lệ\n3. Nhấn Tạo chiến dịch",
     "Chiến dịch được lưu với status = DRAFT, hiển thị trong dashboard của Creator và không xuất hiện ở trang công khai."),
    ("TC-CAMP-002", "TR-CAMP-001",
     "Giá trị mặc định khi tạo chiến dịch",
     "Xác minh các giá trị mặc định đúng theo mô hình dữ liệu.",
     "Functional", "Positive Testing", "Medium",
     "Đang đăng nhập bằng tài khoản Creator",
     "Không chọn mô hình gây quỹ và không nhập ngày kết thúc",
     "1. Tạo chiến dịch mới\n2. Không thay đổi mô hình gây quỹ và ngày kết thúc\n3. Lưu",
     "fundingModel = ALL_OR_NOTHING, feeRate = 0.08, endDate = thời điểm tạo cộng 60 ngày."),
    ("TC-CAMP-003", "TR-CAMP-002",
     "Tạo chiến dịch với mục tiêu bằng 0",
     "Kiểm tra giá trị biên dưới của mục tiêu tài chính.",
     "Validation", "Boundary Value Analysis", "High",
     "Đang đăng nhập bằng tài khoản Creator",
     "goalAmount: 0",
     "1. Mở /campaigns/create\n2. Nhập mục tiêu 0\n3. Nhấn Tạo chiến dịch",
     "Hệ thống từ chối và thông báo mục tiêu phải lớn hơn 0; không tạo bản ghi."),
    ("TC-CAMP-004", "TR-CAMP-002",
     "Tạo chiến dịch với mục tiêu âm",
     "Kiểm tra việc chặn giá trị âm không hợp lệ.",
     "Validation", "Boundary Value Analysis", "High",
     "Đang đăng nhập bằng tài khoản Creator",
     "goalAmount: -1000000",
     "1. Mở /campaigns/create\n2. Nhập mục tiêu âm\n3. Nhấn Tạo chiến dịch",
     "Hệ thống từ chối và không tạo bản ghi chiến dịch."),
    ("TC-CAMP-005", "TR-CAMP-003",
     "Mã chiến dịch và slug được sinh tự động, duy nhất",
     "Xác minh hai chiến dịch cùng tiêu đề vẫn có định danh khác nhau.",
     "Functional", "Positive Testing", "Medium",
     "Đang đăng nhập bằng tài khoản Creator",
     "Hai chiến dịch có cùng title",
     "1. Tạo chiến dịch cùng tiêu đề lần thứ nhất\n2. Tạo chiến dịch cùng tiêu đề lần thứ hai\n3. So sánh campaignCode và slug",
     "Mỗi chiến dịch có campaignCode và slug riêng, không trùng nhau, và đều truy cập được bằng đường dẫn riêng."),
    ("TC-CAMP-006", "TR-CAMP-004",
     "Danh sách công khai không hiển thị chiến dịch nháp",
     "Xác minh chỉ chiến dịch ở trạng thái công khai mới xuất hiện với khách.",
     "UI", "Equivalence Partitioning", "High",
     "Có ít nhất một chiến dịch DRAFT và một chiến dịch ACTIVE",
     "Truy cập bằng phiên khách chưa đăng nhập",
     "1. Mở /campaigns khi chưa đăng nhập\n2. Quan sát danh sách\n3. Tìm chiến dịch đang DRAFT",
     "Chỉ chiến dịch ACTIVE, SUCCESS, FAILED xuất hiện; chiến dịch DRAFT và PENDING_REVIEW không hiển thị."),
    ("TC-CAMP-007", "TR-CAMP-004",
     "Tìm kiếm theo từ khóa và lọc theo danh mục",
     "Xác minh kết quả trả về đúng điều kiện tìm kiếm và lọc.",
     "Functional", "Positive Testing", "Medium",
     "Có nhiều chiến dịch ở các danh mục khác nhau",
     "q: giáo dục\ncategory: Giáo dục",
     "1. Mở /campaigns\n2. Nhập từ khóa tìm kiếm\n3. Chọn danh mục\n4. Quan sát kết quả",
     "Danh sách kết quả chỉ gồm chiến dịch khớp từ khóa và thuộc đúng danh mục đã chọn."),
    ("TC-CAMP-008", "TR-CAMP-005",
     "Creator gửi duyệt chiến dịch",
     "Xác minh chuyển trạng thái từ nháp sang chờ duyệt.",
     "Functional", "Positive Testing", "High",
     "Chiến dịch đang ở DRAFT và đăng nhập bằng chủ sở hữu",
     "Chiến dịch nháp đã nhập đủ thông tin bắt buộc",
     "1. Mở chiến dịch ở DRAFT\n2. Nhấn Gửi duyệt",
     "status chuyển sang PENDING_REVIEW và chiến dịch xuất hiện trong hàng đợi duyệt của Admin."),
    ("TC-CAMP-009", "TR-CAMP-005",
     "Creator rút hồ sơ khỏi hàng đợi duyệt",
     "Xác minh khả năng quay lại trạng thái nháp để sửa tiếp.",
     "Functional", "Positive Testing", "Medium",
     "Chiến dịch đang ở PENDING_REVIEW và đăng nhập bằng chủ sở hữu",
     "Chiến dịch đã gửi duyệt",
     "1. Mở chiến dịch đang chờ duyệt\n2. Nhấn Rút hồ sơ",
     "status quay về DRAFT và chiến dịch biến khỏi hàng đợi duyệt."),
    ("TC-CAMP-010", "TR-CAMP-005",
     "Người không phải chủ sở hữu gửi duyệt chiến dịch",
     "Kiểm tra phân quyền ở thao tác gửi duyệt.",
     "Security", "Negative Testing", "High",
     "Đăng nhập bằng tài khoản không phải chủ chiến dịch",
     "Slug của chiến dịch do người khác sở hữu",
     "1. Gọi thao tác gửi duyệt trên chiến dịch không thuộc sở hữu\n2. Quan sát phản hồi",
     "Hệ thống trả về 403 và trạng thái chiến dịch không thay đổi."),
    ("TC-CAMP-011", "TR-CAMP-006",
     "Admin duyệt chiến dịch đang chờ",
     "Xác minh quyết định duyệt hợp lệ và các tác dụng phụ.",
     "Functional", "Positive Testing", "High",
     "Đăng nhập bằng Admin; chiến dịch ở PENDING_REVIEW",
     "Chiến dịch hợp lệ đang chờ duyệt",
     "1. Mở /dashboard/admin/campaigns\n2. Chọn chiến dịch đang chờ\n3. Nhấn Duyệt",
     "status = ACTIVE; audit_logs ghi hành động APPROVE; Creator nhận thông báo CAMPAIGN_APPROVED."),
    ("TC-CAMP-012", "TR-CAMP-006",
     "Admin từ chối chiến dịch mà không nhập lý do",
     "Kiểm tra ràng buộc bắt buộc nhập lý do khi từ chối.",
     "Validation", "Negative Testing", "High",
     "Đăng nhập bằng Admin; chiến dịch ở PENDING_REVIEW",
     "Để trống ô lý do từ chối",
     "1. Mở chiến dịch đang chờ duyệt\n2. Chọn Từ chối, bỏ trống lý do\n3. Xác nhận",
     "Hệ thống trả về 400 và yêu cầu nhập lý do; trạng thái chiến dịch giữ nguyên PENDING_REVIEW."),
    ("TC-CAMP-013", "TR-CAMP-006",
     "Admin từ chối chiến dịch kèm lý do",
     "Xác minh trạng thái và thông tin phản hồi khi từ chối hợp lệ.",
     "Functional", "Positive Testing", "High",
     "Đăng nhập bằng Admin; chiến dịch ở PENDING_REVIEW",
     "reason: Nội dung mô tả chưa đủ rõ ràng",
     "1. Mở chiến dịch đang chờ duyệt\n2. Chọn Từ chối và nhập lý do\n3. Xác nhận",
     "status = CANCELED; lý do được lưu; audit_logs ghi REJECT; Creator nhận thông báo CAMPAIGN_REJECTED."),
    ("TC-CAMP-014", "TR-CAMP-007",
     "Hủy chiến dịch đang chạy và hoàn tiền",
     "Xác minh việc hoàn tiền toàn bộ cho các lượt ủng hộ đã thành công.",
     "Functional", "Positive Testing", "High",
     "Chiến dịch ACTIVE đã có ít nhất một pledge SUCCESS",
     "Chiến dịch có 3 pledge SUCCESS",
     "1. Mở chiến dịch đang ACTIVE\n2. Nhấn Hủy chiến dịch\n3. Xác nhận",
     "status = FAILED; cả 3 lượt ủng hộ chuyển sang trạng thái hoàn tiền; hệ thống báo số giao dịch đã hoàn."),
    ("TC-CAMP-015", "TR-CAMP-008",
     "Chốt hạn chiến dịch tự động theo mô hình gây quỹ",
     "Xác minh quy tắc chốt trạng thái khi quá ngày kết thúc.",
     "Functional", "Decision Table Testing", "High",
     "Có hai chiến dịch ACTIVE đã quá endDate",
     "Chiến dịch A có gói phần thưởng, chưa đạt mục tiêu\nChiến dịch B không có quà, ALL_OR_NOTHING, chưa đạt mục tiêu",
     "1. Chạy tác vụ chốt hạn chiến dịch\n2. Kiểm tra trạng thái chiến dịch A\n3. Kiểm tra trạng thái chiến dịch B",
     "Chiến dịch A chuyển SUCCESS dù chưa đạt mục tiêu; chiến dịch B chuyển FAILED và được hoàn tiền."),

    # ── REWARD ───────────────────────────────────────────────────────────────
    ("TC-REWARD-001", "TR-REWARD-001",
     "Tạo gói phần thưởng hợp lệ",
     "Xác minh gói phần thưởng mới được lưu với các giá trị mặc định đúng.",
     "Functional", "Positive Testing", "High",
     "Đang đăng nhập bằng Creator sở hữu chiến dịch",
     "title: Áo thun Tử Tế\nminAmount: 200000\nstock: 50",
     "1. Mở trang quản lý phần thưởng của chiến dịch\n2. Nhập thông tin gói quà\n3. Nhấn Lưu",
     "Gói được lưu với isActive = true, availability = AVAILABLE và fulfillmentType = PHYSICAL."),
    ("TC-REWARD-002", "TR-REWARD-002",
     "Tạo gói phần thưởng thiếu mức ủng hộ tối thiểu",
     "Kiểm tra trường bắt buộc minAmount.",
     "Validation", "Negative Testing", "High",
     "Đang đăng nhập bằng Creator",
     "minAmount: để trống",
     "1. Mở form tạo gói quà\n2. Bỏ trống mức ủng hộ tối thiểu\n3. Nhấn Lưu",
     "Hệ thống từ chối và thông báo mức ủng hộ tối thiểu là bắt buộc."),
    ("TC-REWARD-003", "TR-REWARD-002",
     "Tạo gói phần thưởng với mức ủng hộ bằng 0",
     "Kiểm tra giá trị biên dưới của mức ủng hộ.",
     "Validation", "Boundary Value Analysis", "Medium",
     "Đang đăng nhập bằng Creator",
     "minAmount: 0",
     "1. Mở form tạo gói quà\n2. Nhập mức ủng hộ 0\n3. Nhấn Lưu",
     "Hệ thống từ chối và không lưu gói quà."),
    ("TC-REWARD-004", "TR-REWARD-002",
     "Tạo gói phần thưởng với mức ủng hộ âm",
     "Kiểm tra việc chặn giá trị âm.",
     "Validation", "Boundary Value Analysis", "Medium",
     "Đang đăng nhập bằng Creator",
     "minAmount: -50000",
     "1. Mở form tạo gói quà\n2. Nhập mức ủng hộ âm\n3. Nhấn Lưu",
     "Hệ thống từ chối và không lưu gói quà."),
    ("TC-REWARD-005", "TR-REWARD-002",
     "Giới hạn số lượng tối đa bằng 1",
     "Kiểm tra biên dưới của số lượng phát hành.",
     "Validation", "Boundary Value Analysis", "Medium",
     "Gói quà có maxQuantity = 1",
     "maxQuantity: 1",
     "1. Cho một lượt ủng hộ chọn gói quà\n2. Cho lượt ủng hộ thứ hai chọn cùng gói quà",
     "Lượt thứ nhất thành công; lượt thứ hai bị chặn vì đã hết số lượng."),
    ("TC-REWARD-006", "TR-REWARD-002",
     "Gói phần thưởng không giới hạn tồn kho",
     "Kiểm tra trường hợp tồn kho rỗng nghĩa là không giới hạn.",
     "Functional", "Equivalence Partitioning", "Medium",
     "Gói quà có stock rỗng",
     "stock: để trống",
     "1. Tạo gói quà không nhập tồn kho\n2. Thực hiện nhiều lượt ủng hộ liên tiếp",
     "Hệ thống không giới hạn số lượt ủng hộ và không báo hết hàng."),
    ("TC-REWARD-007", "TR-REWARD-002",
     "Gói phần thưởng đã hết hàng",
     "Kiểm tra giá trị biên tồn kho bằng 0.",
     "Validation", "Boundary Value Analysis", "High",
     "Gói quà có stock = 0",
     "stock: 0",
     "1. Mở trang chiến dịch\n2. Quan sát gói quà hết hàng\n3. Thử chọn gói quà",
     "Gói quà hiển thị trạng thái hết hàng và không cho phép ủng hộ."),
    ("TC-REWARD-008", "TR-REWARD-006",
     "Cập nhật trạng thái giao hàng của lượt ủng hộ",
     "Xác minh vòng đời giao hàng đi đúng thứ tự.",
     "Functional", "State Transition Testing", "Medium",
     "Có lượt ủng hộ đã thanh toán thành công",
     "fulfillmentStatus hiện tại: PROCESSING",
     "1. Mở chi tiết lượt ủng hộ\n2. Chuyển trạng thái sang SHIPPED\n3. Chuyển tiếp sang DELIVERED",
     "Trạng thái lần lượt chuyển PROCESSING, SHIPPED, DELIVERED và giữ đúng thứ tự vòng đời."),
    ("TC-REWARD-009", "TR-REWARD-004",
     "Gói phần thưởng số có kho sản phẩm số",
     "Xác minh việc tạo sản phẩm số cho gói quà loại số.",
     "Functional", "Positive Testing", "Medium",
     "Đang đăng nhập bằng Creator",
     "fulfillmentType: DOWNLOAD",
     "1. Tạo gói quà loại tải xuống\n2. Mở kho sản phẩm số của gói\n3. Thêm một sản phẩm số",
     "Sản phẩm số được lưu với trạng thái AVAILABLE và sẵn sàng cấp phát."),
    ("TC-REWARD-010", "TR-REWARD-003",
     "Cập nhật gói phần thưởng thuộc sở hữu",
     "Xác minh Creator sửa được gói quà của chính mình.",
     "Functional", "Positive Testing", "Medium",
     "Đang đăng nhập bằng Creator sở hữu gói quà",
     "title mới: Áo thun Tử Tế phiên bản 2",
     "1. Mở form sửa gói quà\n2. Đổi tiêu đề\n3. Nhấn Lưu",
     "Thay đổi được lưu và hiển thị đúng giá trị mới."),
    ("TC-REWARD-011", "TR-REWARD-003",
     "Cập nhật gói phần thưởng của người khác",
     "Kiểm tra phân quyền ở thao tác cập nhật.",
     "Security", "Negative Testing", "High",
     "Đang đăng nhập bằng Creator không sở hữu gói quà",
     "ID gói quà của Creator khác",
     "1. Gọi thao tác cập nhật gói quà không thuộc sở hữu\n2. Quan sát phản hồi",
     "Hệ thống trả về 403 và dữ liệu gói quà không thay đổi."),
    ("TC-REWARD-012", "TR-REWARD-003",
     "Bật và tắt gói phần thưởng",
     "Xác minh thao tác bật tắt thay đổi trạng thái mở bán.",
     "Functional", "Positive Testing", "Medium",
     "Gói quà đang isActive = false",
     "Trạng thái hiện tại: false",
     "1. Mở danh sách gói quà\n2. Nhấn nút bật gói quà\n3. Quan sát trạng thái",
     "isActive chuyển từ false sang true và gói quà hiển thị lại trên trang chiến dịch."),
    ("TC-REWARD-013", "TR-REWARD-004",
     "Mỗi lượt ủng hộ chỉ nhận một sản phẩm số",
     "Kiểm tra ràng buộc duy nhất giữa lượt ủng hộ và sản phẩm số.",
     "Functional", "Negative Testing", "Medium",
     "Một lượt ủng hộ đã được cấp sản phẩm số",
     "Cố gán thêm sản phẩm số thứ hai cho cùng lượt ủng hộ",
     "1. Mở kho sản phẩm số\n2. Gán sản phẩm thứ hai cho lượt ủng hộ đã có sản phẩm\n3. Xác nhận",
     "Hệ thống từ chối do ràng buộc duy nhất trên mã lượt ủng hộ; chỉ một sản phẩm được gán."),
    ("TC-REWARD-014", "TR-REWARD-005",
     "Đánh giá sản phẩm lần đầu",
     "Xác minh đánh giá được lưu cho lượt ủng hộ hợp lệ.",
     "Functional", "Positive Testing", "Low",
     "Người dùng có lượt ủng hộ đã giao hàng thành công",
     "Số sao: 5\nNội dung: Chất lượng tốt",
     "1. Mở trang sản phẩm\n2. Chọn số sao và nhập nhận xét\n3. Gửi đánh giá",
     "Đánh giá được lưu, gắn với mã lượt ủng hộ và hiển thị điểm trung bình mới."),
    ("TC-REWARD-015", "TR-REWARD-005",
     "Đánh giá sản phẩm lần thứ hai với cùng lượt ủng hộ",
     "Kiểm tra ràng buộc một đánh giá cho mỗi lượt ủng hộ.",
     "Validation", "Negative Testing", "Low",
     "Lượt ủng hộ đã được đánh giá trước đó",
     "Cùng mã lượt ủng hộ, nội dung đánh giá mới",
     "1. Mở trang sản phẩm bằng tài khoản đã đánh giá\n2. Gửi đánh giá lần hai",
     "Hệ thống từ chối do ràng buộc duy nhất trên mã lượt ủng hộ."),

    # ── BLOG ─────────────────────────────────────────────────────────────────
    ("TC-BLOG-001", "TR-BLOG-001",
     "Tạo bài viết ở trạng thái nháp",
     "Xác minh bài viết mới được lưu ở trạng thái nháp, chưa công khai.",
     "Functional", "Positive Testing", "High",
     "Đang đăng nhập bằng tài khoản đã có quyền viết bài",
     "title: Câu chuyện cộng đồng\nnội dung rich text hợp lệ",
     "1. Mở /blog/editor\n2. Nhập tiêu đề và nội dung\n3. Nhấn Lưu nháp",
     "Bài được lưu với status = DRAFT, publishedAt rỗng; chỉ tác giả nhìn thấy trong /blog/my-posts."),
    ("TC-BLOG-002", "TR-BLOG-002",
     "Làm sạch mã độc trong nội dung bài viết",
     "Kiểm tra bộ lọc HTML loại bỏ thẻ nguy hiểm trước khi lưu.",
     "Security", "Negative Testing", "High",
     "Đang đăng nhập bằng tài khoản có quyền viết bài",
     "<p>Nội dung</p><script>alert(1)</script>",
     "1. Mở trình soạn thảo\n2. Chèn đoạn HTML chứa thẻ script vào nội dung\n3. Lưu và mở lại bài",
     "Thẻ script bị loại bỏ khỏi nội dung đã lưu và không có mã nào thực thi khi mở bài."),
    ("TC-BLOG-003", "TR-BLOG-001",
     "Tạo bài viết thiếu tiêu đề",
     "Kiểm tra trường bắt buộc của bài viết.",
     "Validation", "Negative Testing", "Medium",
     "Đang đăng nhập bằng tài khoản có quyền viết bài",
     "title: để trống",
     "1. Mở trình soạn thảo\n2. Chỉ nhập nội dung, bỏ trống tiêu đề\n3. Nhấn Lưu",
     "Hệ thống từ chối và thông báo tiêu đề là bắt buộc."),
    ("TC-BLOG-004", "TR-BLOG-003",
     "Tác giả thường xuất bản bài viết",
     "Xác minh bài của tác giả không có quyền xuất bản trực tiếp phải qua duyệt.",
     "Functional", "Decision Table Testing", "High",
     "Tác giả là người dùng thường, chưa KYC và không có quyền xuất bản trực tiếp",
     "Bài viết loại thường",
     "1. Mở bài đang nháp\n2. Nhấn Xuất bản",
     "Bài chuyển sang PENDING_REVIEW và chưa hiển thị công khai."),
    ("TC-BLOG-005", "TR-BLOG-003",
     "Admin xuất bản bài viết trực tiếp",
     "Xác minh Admin bỏ qua bước chờ duyệt.",
     "Functional", "Positive Testing", "High",
     "Đang đăng nhập bằng tài khoản Admin",
     "Bài viết đang nháp",
     "1. Mở bài viết\n2. Nhấn Xuất bản",
     "Bài chuyển thẳng sang PUBLISHED với publishedAt là thời điểm xuất bản."),
    ("TC-BLOG-006", "TR-BLOG-003",
     "Tác giả đã KYC xuất bản bài cập nhật chiến dịch",
     "Kiểm tra nhánh được xuất bản trực tiếp theo loại bài và trạng thái KYC.",
     "Functional", "Decision Table Testing", "High",
     "Tác giả có KYC đã xác minh, bài loại cập nhật chiến dịch",
     "type: CAMPAIGN_UPDATE\nTác giả có kyc_info VERIFIED",
     "1. Tạo bài cập nhật cho chiến dịch\n2. Nhấn Xuất bản",
     "Bài chuyển thẳng sang PUBLISHED, không qua PENDING_REVIEW."),
    ("TC-BLOG-007", "TR-BLOG-004",
     "Bài đang chờ duyệt không hiển thị công khai",
     "Xác minh bài chưa duyệt bị ẩn với khách.",
     "UI", "Equivalence Partitioning", "High",
     "Có bài viết ở trạng thái PENDING_REVIEW",
     "Truy cập bằng phiên khách",
     "1. Mở /blog khi chưa đăng nhập\n2. Tìm bài đang chờ duyệt\n3. Mở trực tiếp đường dẫn bài",
     "Bài không xuất hiện trong danh sách và mở trực tiếp không hiển thị nội dung."),
    ("TC-BLOG-008", "TR-BLOG-004",
     "Bài hẹn giờ trong tương lai chưa hiển thị",
     "Kiểm tra điều kiện thời điểm xuất bản.",
     "Functional", "Boundary Value Analysis", "Medium",
     "Bài đã PUBLISHED nhưng publishedAt ở tương lai",
     "publishedAt: hiện tại + 1 ngày",
     "1. Mở /blog bằng phiên khách\n2. Tìm bài vừa hẹn giờ",
     "Bài chưa xuất hiện cho tới khi thời điểm xuất bản đã qua."),
    ("TC-BLOG-009", "TR-BLOG-004",
     "Bài đã xuất bản hiển thị công khai",
     "Xác minh bài hợp lệ hiển thị đúng ở trang công khai.",
     "UI", "Positive Testing", "High",
     "Có bài PUBLISHED với publishedAt trong quá khứ",
     "Truy cập bằng phiên khách",
     "1. Mở /blog\n2. Quan sát danh sách\n3. Mở chi tiết bài viết",
     "Bài xuất hiện trong danh sách và trang chi tiết hiển thị đầy đủ tiêu đề, nội dung."),
    ("TC-BLOG-010", "TR-BLOG-003",
     "Admin duyệt bài viết đang chờ",
     "Xác minh quyết định duyệt của Admin.",
     "Functional", "Positive Testing", "High",
     "Đang đăng nhập Admin; có bài PENDING_REVIEW",
     "Bài đang chờ duyệt",
     "1. Mở /dashboard/admin/blog\n2. Chọn bài đang chờ\n3. Nhấn Duyệt",
     "Bài chuyển sang PUBLISHED và hiển thị công khai."),
    ("TC-BLOG-011", "TR-BLOG-003",
     "Admin từ chối bài viết đang chờ",
     "Xác minh quyết định từ chối và tác động lên hiển thị.",
     "Functional", "Negative Testing", "Medium",
     "Đang đăng nhập Admin; có bài PENDING_REVIEW",
     "Bài đang chờ duyệt",
     "1. Mở /dashboard/admin/blog\n2. Chọn bài đang chờ\n3. Nhấn Từ chối",
     "Bài chuyển sang REJECTED và không hiển thị công khai."),
    ("TC-BLOG-012", "TR-BLOG-005",
     "Thả tim bài viết",
     "Xác minh lượt tim được ghi nhận và có thể bỏ.",
     "Functional", "Positive Testing", "Medium",
     "Đang đăng nhập",
     "Bài viết đã xuất bản",
     "1. Mở bài viết\n2. Nhấn biểu tượng tim\n3. Nhấn lại lần nữa",
     "Lần đầu số lượt tim tăng 1; nhấn lại thì lượt tim của người dùng bị bỏ."),
    ("TC-BLOG-013", "TR-BLOG-005",
     "Lưu dấu trang bài viết",
     "Xác minh bài viết được thêm vào danh sách dấu trang.",
     "Functional", "Positive Testing", "Medium",
     "Đang đăng nhập",
     "Bài viết đã xuất bản",
     "1. Mở bài viết\n2. Nhấn Lưu bài viết\n3. Mở danh sách dấu trang",
     "Bài viết xuất hiện trong danh sách dấu trang của người dùng."),
    ("TC-BLOG-014", "TR-BLOG-005",
     "Bình luận bài viết",
     "Kiểm tra trạng thái kiểm duyệt của bình luận mới.",
     "Functional", "Positive Testing", "Medium",
     "Đang đăng nhập",
     "Nội dung bình luận hợp lệ",
     "1. Mở bài viết\n2. Nhập bình luận\n3. Gửi",
     "Bình luận được lưu với trạng thái PENDING và chưa hiển thị với khách cho tới khi được duyệt."),
    ("TC-BLOG-015", "TR-BLOG-006",
     "Báo cáo bài viết vi phạm",
     "Xác minh báo cáo được ghi nhận để Admin xử lý.",
     "Functional", "Positive Testing", "Low",
     "Đang đăng nhập",
     "Lý do báo cáo: Nội dung sai lệch",
     "1. Mở bài viết\n2. Chọn Báo cáo\n3. Chọn lý do và gửi",
     "Bản ghi báo cáo được tạo với lý do đã chọn và trạng thái chờ xử lý."),

    # ── KYC ──────────────────────────────────────────────────────────────────
    ("TC-KYC-001", "TR-KYC-001",
     "Gửi hồ sơ xác minh danh tính hợp lệ",
     "Xác minh hồ sơ KYC được tiếp nhận và chuyển sang chờ duyệt.",
     "Functional", "Positive Testing", "High",
     "Đang đăng nhập, chưa có hồ sơ KYC",
     "fullName: Nguyễn Văn Test\nidCardType: CCCD\nidCardNumber: 001204012345\nẢnh mặt trước và mặt sau",
     "1. Mở /kyc\n2. Điền đầy đủ thông tin định danh\n3. Tải ảnh giấy tờ và gửi",
     "Hồ sơ được lưu với verificationStatus = PENDING và hiển thị thông báo chờ Admin duyệt."),
    ("TC-KYC-002", "TR-KYC-001",
     "Gửi hồ sơ KYC thiếu họ tên",
     "Kiểm tra trường bắt buộc của hồ sơ định danh.",
     "Validation", "Negative Testing", "High",
     "Đang đăng nhập",
     "fullName: để trống",
     "1. Mở /kyc\n2. Bỏ trống họ tên\n3. Gửi hồ sơ",
     "Hệ thống từ chối và thông báo họ tên là bắt buộc."),
    ("TC-KYC-003", "TR-KYC-002",
     "Gửi hồ sơ với số giấy tờ đã dùng cho tài khoản khác",
     "Kiểm tra ràng buộc duy nhất của số giấy tờ.",
     "Validation", "Negative Testing", "High",
     "Số giấy tờ đã được một tài khoản khác sử dụng",
     "idCardNumber: trùng với hồ sơ đã tồn tại",
     "1. Mở /kyc\n2. Nhập số giấy tờ đã tồn tại\n3. Gửi hồ sơ",
     "Hệ thống từ chối do ràng buộc duy nhất trên số giấy tờ."),
    ("TC-KYC-004", "TR-KYC-002",
     "Gửi lại hồ sơ KYC lần thứ hai",
     "Xác minh mỗi người dùng chỉ có một hồ sơ và lần gửi sau cập nhật hồ sơ cũ.",
     "Functional", "Positive Testing", "Medium",
     "Người dùng đã có hồ sơ KYC ở trạng thái REJECTED",
     "Thông tin định danh đã sửa lại",
     "1. Mở /kyc\n2. Cập nhật thông tin\n3. Gửi lại hồ sơ",
     "Hồ sơ cũ được cập nhật và chuyển lại PENDING; không tạo bản ghi KYC thứ hai."),
    ("TC-KYC-005", "TR-KYC-006",
     "Tải ảnh giấy tờ dung lượng 4 MB",
     "Kiểm tra ảnh nằm trong giới hạn cho phép.",
     "Validation", "Boundary Value Analysis", "High",
     "Đang mở form KYC",
     "Ảnh JPG dung lượng 4 MB",
     "1. Mở /kyc\n2. Tải ảnh 4 MB\n3. Quan sát phản hồi",
     "Ảnh được tải lên thành công."),
    ("TC-KYC-006", "TR-KYC-006",
     "Tải ảnh giấy tờ dung lượng 6 MB",
     "Kiểm tra giá trị vượt biên trên của dung lượng ảnh.",
     "Validation", "Boundary Value Analysis", "High",
     "Đang mở form KYC",
     "Ảnh JPG dung lượng 6 MB",
     "1. Mở /kyc\n2. Tải ảnh 6 MB\n3. Quan sát phản hồi",
     "Hệ thống từ chối và thông báo ảnh tối đa 5 MB."),
    ("TC-KYC-007", "TR-KYC-006",
     "Tải tệp không phải ảnh",
     "Kiểm tra việc chặn định dạng không được phép.",
     "Validation", "Equivalence Partitioning", "Medium",
     "Đang mở form KYC",
     "Tệp setup.exe",
     "1. Mở /kyc\n2. Chọn tệp setup.exe\n3. Tải lên",
     "Hệ thống từ chối; chỉ chấp nhận jpeg, jpg, png, webp, gif."),
    ("TC-KYC-008", "TR-KYC-006",
     "Tải video dung lượng 31 MB",
     "Kiểm tra giới hạn dung lượng riêng cho video.",
     "Validation", "Boundary Value Analysis", "Medium",
     "Đang mở form tải tệp",
     "Video MP4 dung lượng 31 MB",
     "1. Mở form tải tệp\n2. Chọn video 31 MB\n3. Tải lên",
     "Hệ thống từ chối và thông báo video tối đa 30 MB."),
    ("TC-KYC-009", "TR-KYC-003",
     "Admin duyệt hồ sơ KYC",
     "Xác minh trạng thái và dấu vết kiểm toán khi duyệt.",
     "Functional", "Positive Testing", "High",
     "Đang đăng nhập Admin; có hồ sơ PENDING",
     "Hồ sơ KYC hợp lệ đang chờ",
     "1. Mở /dashboard/admin/kyc\n2. Chọn hồ sơ\n3. Nhấn Duyệt",
     "verificationStatus = VERIFIED; verifiedAt và verifiedBy được ghi nhận."),
    ("TC-KYC-010", "TR-KYC-003",
     "Admin từ chối hồ sơ KYC kèm lý do",
     "Xác minh lý do từ chối được lưu và phản hồi cho người dùng.",
     "Functional", "Negative Testing", "High",
     "Đang đăng nhập Admin; có hồ sơ PENDING",
     "reason: Ảnh giấy tờ bị mờ, không đọc được",
     "1. Mở hồ sơ đang chờ\n2. Chọn Từ chối và nhập lý do\n3. Xác nhận",
     "verificationStatus = REJECTED; rejectedReason được lưu và hiển thị lại cho người dùng."),
    ("TC-KYC-011", "TR-KYC-004",
     "eKYC với điểm thực thể sống 69",
     "Kiểm tra giá trị ngay dưới ngưỡng chấp nhận.",
     "Validation", "Boundary Value Analysis", "High",
     "Đang thực hiện phiên eKYC",
     "Điểm liveness: 69",
     "1. Bắt đầu phiên eKYC\n2. Thực hiện bước kiểm tra thực thể sống\n3. Quan sát kết quả",
     "Hệ thống không đạt ngưỡng và yêu cầu người dùng thực hiện lại."),
    ("TC-KYC-012", "TR-KYC-004",
     "eKYC với điểm thực thể sống 70",
     "Kiểm tra giá trị đúng bằng ngưỡng chấp nhận.",
     "Validation", "Boundary Value Analysis", "High",
     "Đang thực hiện phiên eKYC",
     "Điểm liveness: 70",
     "1. Bắt đầu phiên eKYC\n2. Thực hiện bước kiểm tra thực thể sống\n3. Quan sát kết quả",
     "Hệ thống đạt ngưỡng và cho phép chuyển sang bước xác minh tiếp theo."),
    ("TC-KYC-013", "TR-KYC-005",
     "Giao dịch 19.999.999 đồng khi chưa xác minh danh tính",
     "Kiểm tra giá trị ngay dưới hạn mức của người chưa KYC.",
     "Functional", "Boundary Value Analysis", "High",
     "Đang đăng nhập bằng tài khoản chưa KYC",
     "Số tiền: 19.999.999 VNĐ",
     "1. Mở trang ủng hộ\n2. Nhập số tiền 19.999.999\n3. Tiến hành thanh toán",
     "Giao dịch được phép thực hiện."),
    ("TC-KYC-014", "TR-KYC-005",
     "Giao dịch 20.000.001 đồng khi chưa xác minh danh tính",
     "Kiểm tra giá trị vượt hạn mức của người chưa KYC.",
     "Validation", "Boundary Value Analysis", "High",
     "Đang đăng nhập bằng tài khoản chưa KYC",
     "Số tiền: 20.000.001 VNĐ",
     "1. Mở trang ủng hộ\n2. Nhập số tiền 20.000.001\n3. Tiến hành thanh toán",
     "Hệ thống chặn giao dịch và thông báo vượt hạn mức 20.000.000 VNĐ."),
    ("TC-KYC-015", "TR-KYC-005",
     "Giao dịch 500.000.001 đồng khi đã xác minh danh tính",
     "Kiểm tra giá trị vượt hạn mức của người đã KYC.",
     "Validation", "Boundary Value Analysis", "Medium",
     "Đang đăng nhập bằng tài khoản đã KYC VERIFIED",
     "Số tiền: 500.000.001 VNĐ",
     "1. Mở trang ủng hộ\n2. Nhập số tiền 500.000.001\n3. Tiến hành thanh toán",
     "Hệ thống chặn giao dịch và thông báo vượt hạn mức 500.000.000 VNĐ."),
]


# ─────────────────────────────────────────────────────────────────────────────
# 2. KIỂM TRA TÍNH NHẤT QUÁN CỦA DỮ LIỆU GỐC
# ─────────────────────────────────────────────────────────────────────────────

def validate_source() -> list[str]:
    errors: list[str] = []
    req_ids = [r[0] for r in REQS]
    tr_ids = [t[0] for t in TRS]
    tc_ids = [c[0] for c in TCS]

    for label, ids in (("REQ", req_ids), ("TR", tr_ids), ("TC", tc_ids)):
        dup = [k for k, v in collections.Counter(ids).items() if v > 1]
        if dup:
            errors.append(f"{label} bị trùng ID: {dup}")

    req_set, tr_set = set(req_ids), set(tr_ids)

    for tr in TRS:
        if tr[1] not in req_set:
            errors.append(f"{tr[0]} tham chiếu REQ không tồn tại: {tr[1]}")

    tc_by_tr = collections.Counter(c[1] for c in TCS)
    for tr_id in tr_ids:
        if tc_by_tr[tr_id] == 0:
            errors.append(f"{tr_id} không có Test Case nào")

    for tc in TCS:
        if tc[1] not in tr_set:
            errors.append(f"{tc[0]} tham chiếu TR không tồn tại: {tc[1]}")

    tr_by_req = collections.Counter(t[1] for t in TRS)
    for req_id in req_ids:
        if tr_by_req[req_id] == 0:
            errors.append(f"{req_id} không có Test Requirement nào")

    # module phải khớp giữa ID và bảng phân công
    for tc_id, tr_id, *_ in TCS:
        prefix = tc_id.split("-")[1]
        if tr_id.split("-")[1] != prefix:
            errors.append(f"{tc_id} và {tr_id} khác module")
        if prefix not in ASSIGNEE:
            errors.append(f"{tc_id} có tiền tố module lạ: {prefix}")

    return errors


# ─────────────────────────────────────────────────────────────────────────────
# 3. DỰNG WORKBOOK
# ─────────────────────────────────────────────────────────────────────────────

HEADER_FILL = PatternFill("solid", fgColor="1F4E78")
HEADER_FONT = Font(bold=True, color="FFFFFF", size=11)
HEADER_ALIGN = Alignment(horizontal="center", vertical="center", wrap_text=True)
BODY_ALIGN = Alignment(vertical="top", wrap_text=True)
THIN = Side(style="thin", color="BFBFBF")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)


def style_sheet(ws, widths: dict[str, float], center_cols: set[str] | None = None):
    center_cols = center_cols or set()
    for col, w in widths.items():
        ws.column_dimensions[col].width = w
    for cell in ws[1]:
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = HEADER_ALIGN
        cell.border = BORDER
    ws.row_dimensions[1].height = 32
    ws.freeze_panes = "A2"
    for row in ws.iter_rows(min_row=2, max_row=ws.max_row):
        for cell in row:
            cell.border = BORDER
            if cell.column_letter in center_cols:
                cell.alignment = Alignment(horizontal="center", vertical="top", wrap_text=True)
            else:
                cell.alignment = BODY_ALIGN
    if ws.max_row > 1:
        ws.auto_filter.ref = f"A1:{get_column_letter(ws.max_column)}{ws.max_row}"


def add_dv(ws, col_letter: str, options: list[str], last_row: int):
    dv = DataValidation(type="list", formula1='"' + ",".join(options) + '"', allow_blank=True)
    ws.add_data_validation(dv)
    dv.add(f"{col_letter}2:{col_letter}{max(last_row, 2)}")


def build(path: Path):
    wb = openpyxl.Workbook()

    # ── Read Me ──────────────────────────────────────────────────────────────
    ws = wb.active
    ws.title = "Read Me"
    ws.append(["Section", "Content"])
    info = [
        ("Workbook Title", "Test Case Documentation - 23CT113_Nhom02"),
        ("Project", "Nền tảng Crowdfunding Tử Tế Fund (crowdfunding-vn)"),
        ("Group", "Nhóm 02 - Lớp 23CT113"),
        ("Course", "23CT113 - Kiểm thử phần mềm"),
        ("Document Version", "2.0.0"),
        ("Created Date", "2026-10-28"),
        ("Author", "Nguyễn Quách Phú Tài (123000609) - Test Lead"),
        ("Source of Truth",
         "01-IC-Product-Requirements_23CT113_Nhom02.md (PRD 2.0.0), prisma/schema.prisma, các route trong src/app/api"),
        ("Scope", "5 phân hệ: Login (AUTH), Campaign (CAMP), Reward (REWD), Blog (BLOG), KYC"),
        ("Out of Scope",
         "Pledge/thanh toán, kho đồ, badge, báo cáo vi phạm, chat, hội viên, Profile Studio, thuế, bằng cấp, quản trị hệ thống (ngoài 5 phân hệ trên)"),
        ("Total Requirements (REQ)", str(len(REQS))),
        ("Total Test Requirements (TR)", str(len(TRS))),
        ("Total Test Cases (TC)", str(len(TCS))),
        ("Execution Status",
         "Not Run - chưa thực thi. Không điền khống kết quả; Actual Result và Test Status phải được ghi khi chạy thật."),
        ("Test Environment", ENV),
        ("Execution Rule",
         "Pass = kết quả thực tế khớp kết quả mong đợi; Fail = sai khác hoặc phát hiện lỗi. Mọi Fail phải sinh một dòng trong Bug Log."),
        ("Traceability Rule",
         "Mỗi TC thuộc đúng một TR; mỗi TR thuộc đúng một REQ; mọi REQ và TR đều phải có ít nhất một TC."),
        ("Automation Note",
         "Toàn bộ test case hiện thiết kế ở dạng thủ công (black-box). Các case có thể tự động hoá bằng Playwright (luồng UI) hoặc Jest (ràng buộc dữ liệu) được ghi ở cột Automation Type."),
        ("Assignee Model", "Mỗi thành viên phụ trách một phân hệ, 15 test case mỗi người."),
    ]
    for k, v in info:
        ws.append([k, v])
    ws.column_dimensions["A"].width = 30
    ws.column_dimensions["B"].width = 95
    ws["A1"].fill = HEADER_FILL
    ws["A1"].font = HEADER_FONT
    ws["B1"].fill = HEADER_FILL
    ws["B1"].font = HEADER_FONT
    for row in ws.iter_rows(min_row=2, max_row=ws.max_row):
        row[0].font = Font(bold=True)
        row[0].alignment = Alignment(vertical="top", wrap_text=True)
        row[1].alignment = Alignment(vertical="top", wrap_text=True)

    # ── Requirements ─────────────────────────────────────────────────────────
    ws = wb.create_sheet("Requirements")
    ws.append(["Requirement ID", "Module", "Requirement Title", "Requirement Description",
               "Stakeholder Role", "Acceptance Criteria", "Priority",
               "Source/Reference Requirement", "Confirmation Status", "Requirement Type"])
    for r in REQS:
        ws.append([r[0], MODULE[r[1]], r[2], r[3], r[4], r[5], r[6], r[7], "Confirmed",
                   "Functional Requirement"])
    style_sheet(ws, {"A": 18, "B": 12, "C": 40, "D": 62, "E": 16, "F": 62, "G": 10, "H": 34,
                     "I": 16, "J": 22}, {"B", "G", "I"})
    add_dv(ws, "G", ["High", "Medium", "Low"], ws.max_row)

    # ── Test Cases ───────────────────────────────────────────────────────────
    ws = wb.create_sheet("Test Cases")
    ws.append(["Test Case ID", "Test Requirement ID", "Module", "Test Case Title", "Objective",
               "Test Approach", "Test Type", "Test Technique", "Priority", "Precondition",
               "Test Data", "Test Steps", "Expected Result", "Test Environment",
               "Execution Method", "Assignee", "Automation Type", "Actual Result", "Test Status"])
    for tc_id, tr_id, title, objective, ttype, tech, prio, pre, data, steps, expected in TCS:
        prefix = tc_id.split("-")[1]
        ws.append([tc_id, tr_id, MODULE[prefix], title, objective, "Black-box", ttype, tech, prio,
                   pre, data, steps, expected, ENV, "Manual", ASSIGNEE[prefix],
                   "Manual Black-box", "", "Not Run"])
    style_sheet(ws, {"A": 17, "B": 20, "C": 12, "D": 52, "E": 52, "F": 14, "G": 13, "H": 26,
                     "I": 10, "J": 42, "K": 42, "L": 58, "M": 62, "N": 30, "O": 16, "P": 24,
                     "Q": 20, "R": 36, "S": 13}, {"A", "B", "C", "F", "G", "I", "O", "Q", "S"})
    add_dv(ws, "G", ["Functional", "Validation", "Security", "UI"], ws.max_row)
    add_dv(ws, "H", ["Positive Testing", "Negative Testing", "Equivalence Partitioning",
                     "Boundary Value Analysis", "Decision Table Testing",
                     "State Transition Testing"], ws.max_row)
    add_dv(ws, "I", ["High", "Medium", "Low"], ws.max_row)
    add_dv(ws, "O", ["Manual", "Automated"], ws.max_row)
    add_dv(ws, "S", ["Not Run", "Pass", "Fail", "Blocked"], ws.max_row)

    # ── Test Execution ───────────────────────────────────────────────────────
    ws = wb.create_sheet("Test Execution")
    ws.append(["Execution ID", "TC ID", "Run Number", "Date Time", "Tester", "Environment",
               "Build Version", "OS", "Browser Version", "Execution Method", "Actual Result",
               "Status", "Evidence", "Bug ID", "Notes"])
    style_sheet(ws, {"A": 14, "B": 18, "C": 12, "D": 16, "E": 24, "F": 30, "G": 14, "H": 16,
                     "I": 18, "J": 16, "K": 46, "L": 12, "M": 28, "N": 14, "O": 34},
                {"A", "B", "C", "D", "J", "L", "N"})
    add_dv(ws, "J", ["Manual", "Automated"], ws.max_row)
    add_dv(ws, "L", ["Pass", "Fail", "Blocked", "Not Run"], ws.max_row)

    # ── Bug Log ──────────────────────────────────────────────────────────────
    ws = wb.create_sheet("Bug Log")
    ws.append(["Bug ID", "TC ID", "TR ID", "Module", "Title", "Bug Description", "Environment",
               "Build Version", "Severity", "Precondition", "Steps to Reproduce",
               "Expected Result", "Actual Result", "Evidence", "Status", "Retest Result"])
    style_sheet(ws, {"A": 12, "B": 22, "C": 20, "D": 12, "E": 40, "F": 52, "G": 30, "H": 14,
                     "I": 12, "J": 40, "K": 50, "L": 46, "M": 46, "N": 30, "O": 12, "P": 26},
                {"A", "B", "C", "D", "H", "I", "O"})
    add_dv(ws, "I", ["Critical", "High", "Medium", "Low"], ws.max_row)
    add_dv(ws, "O", ["Open", "In Progress", "Fixed", "Closed", "Reopened"], ws.max_row)

    # ── Traceability Matrix ──────────────────────────────────────────────────
    req_by_id = {r[0]: r for r in REQS}
    tr_by_id = {t[0]: t for t in TRS}
    ws = wb.create_sheet("Traceability Matrix")
    ws.append(["REQ ID", "TR ID", "Module", "Requirement Description",
               "Test Requirement Description", "TC ID", "Test Case Description",
               "Test Coverage Status", "Coverage Percentage", "Test Status"])
    for tc in TCS:
        tc_id, tr_id, title = tc[0], tc[1], tc[2]
        tr = tr_by_id[tr_id]
        req = req_by_id[tr[1]]
        ws.append([req[0], tr_id, MODULE[tr[2]], req[2], tr[3], tc_id, title,
                   "Fully Covered", "100%", "Designed"])
    style_sheet(ws, {"A": 18, "B": 20, "C": 12, "D": 44, "E": 52, "F": 17, "G": 56,
                     "H": 22, "I": 18, "J": 14}, {"A", "B", "C", "H", "I", "J"})

    # ── Summary ──────────────────────────────────────────────────────────────
    tc_per_mod = collections.Counter(tc[0].split("-")[1] for tc in TCS)
    req_per_mod = collections.Counter(r[1] for r in REQS)
    tr_per_mod = collections.Counter(t[2] for t in TRS)

    ws = wb.create_sheet("Summary")
    ws.append(["Category", "Count", "Note"])
    rows = [
        ("Functional Requirements (REQ)", len(REQS), "Bám theo FR-* của PRD 2.0.0"),
        ("Test Requirements (TR)", len(TRS), "Suy ra từ REQ, đúng một REQ cho mỗi TR"),
        ("Test Cases", len(TCS), "Toàn bộ 5 phân hệ trong phạm vi"),
        ("Executed", 0, "Chưa thực thi - xem ghi chú trong sheet Read Me"),
        ("Passed", 0, "Chưa có kết quả"),
        ("Failed", 0, "Chưa có kết quả"),
        ("Not Run", len(TCS), "Toàn bộ test case đang chờ thực thi"),
        ("Manual", len(TCS), "Tất cả thiết kế ở dạng thủ công (black-box)"),
        ("Automated", 0, "Đề xuất tự động hoá ghi ở cột Automation Type"),
        ("Bugs logged", 0, "Chưa có lỗi nào được ghi nhận"),
    ]
    for r in rows:
        ws.append(list(r))
    ws.append([])
    ws.append(["Phân hệ", "REQ", "TR", "TC", "Người phụ trách"])
    header2_row = ws.max_row
    for code in ["LOGIN", "CAMP", "REWARD", "BLOG", "KYC"]:
        ws.append([MODULE[code], req_per_mod[code], tr_per_mod[code], tc_per_mod[code], ASSIGNEE[code]])
    ws.append(["Tổng", sum(req_per_mod.values()), sum(tr_per_mod.values()),
               sum(tc_per_mod.values()), "5 thành viên"])

    ws.column_dimensions["A"].width = 34
    ws.column_dimensions["B"].width = 10
    ws.column_dimensions["C"].width = 58
    ws.column_dimensions["D"].width = 12
    ws.column_dimensions["E"].width = 26
    for cell in ws[1]:
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = HEADER_ALIGN
    for c in range(1, 6):
        cell = ws.cell(header2_row, c)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = HEADER_ALIGN
    for row in ws.iter_rows(min_row=2, max_row=ws.max_row):
        for cell in row:
            if cell.row == header2_row:
                continue
            cell.alignment = Alignment(vertical="center", wrap_text=True)

    path.parent.mkdir(parents=True, exist_ok=True)
    wb.save(path)
    return wb


# ─────────────────────────────────────────────────────────────────────────────
# 4. KIỂM TRA LẠI FILE ĐÃ GHI
# ─────────────────────────────────────────────────────────────────────────────

def verify(path: Path) -> int:
    wb = openpyxl.load_workbook(path, data_only=True)
    problems: list[str] = []

    ws = wb["Requirements"]
    req_ids = [ws.cell(r, 1).value for r in range(2, ws.max_row + 1) if ws.cell(r, 1).value]
    req_set = set(req_ids)

    ws = wb["Test Cases"]
    tcs = []
    for r in range(2, ws.max_row + 1):
        if ws.cell(r, 1).value:
            tcs.append({"id": ws.cell(r, 1).value, "tr": ws.cell(r, 2).value,
                        "asg": ws.cell(r, 16).value, "steps": ws.cell(r, 12).value,
                        "exp": ws.cell(r, 13).value, "status": ws.cell(r, 19).value})
    tc_ids = [t["id"] for t in tcs]

    ws_tr = wb["Traceability Matrix"]
    tm = [(ws_tr.cell(r, 2).value, ws_tr.cell(r, 1).value, ws_tr.cell(r, 6).value)
          for r in range(2, ws_tr.max_row + 1) if ws_tr.cell(r, 6).value]

    # 1. đếm phải khớp Summary
    ws_sum = wb["Summary"]
    summary = {ws_sum.cell(r, 1).value: ws_sum.cell(r, 2).value for r in range(2, ws_sum.max_row + 1)}
    if summary.get("Functional Requirements (REQ)") != len(req_set):
        problems.append(f"Summary REQ={summary.get('Functional Requirements (REQ)')} nhưng sheet có {len(req_set)}")
    tr_ids = {t["tr"] for t in tcs}
    if summary.get("Test Requirements (TR)") != len(tr_ids):
        problems.append(f"Summary TR={summary.get('Test Requirements (TR)')} nhưng thực tế {len(tr_ids)}")
    if summary.get("Test Cases") != len(tc_ids):
        problems.append(f"Summary TC={summary.get('Test Cases')} nhưng sheet có {len(tc_ids)}")

    # 2. không trùng ID
    for label, ids in (("REQ", req_ids), ("TC", tc_ids)):
        dup = [k for k, v in collections.Counter(ids).items() if v > 1]
        if dup:
            problems.append(f"{label} trùng ID: {dup}")

    # 3. traceability khép kín
    if len(tm) != len(tc_ids):
        problems.append(f"Traceability có {len(tm)} dòng nhưng Test Cases có {len(tc_ids)}")
    if {x[2] for x in tm} != set(tc_ids):
        problems.append("Traceability không phủ đủ danh sách TC")
    if {x[1] for x in tm} != req_set:
        problems.append("Traceability tham chiếu REQ không có trong sheet Requirements")
    for tr, req, tc in tm:
        if req not in req_set:
            problems.append(f"{tc}: REQ {req} không tồn tại")

    # 4. mọi TC có TR thuộc TM
    tm_pairs = {(x[1], x[0]) for x in tm}
    for t in tcs:
        if (t["id"], t["tr"]) not in {(tc, tr) for tr, req, tc in tm}:
            problems.append(f"{t['id']} không khớp TR trong Traceability")

    # 5. trường bắt buộc không rỗng
    for t in tcs:
        if not t["steps"]:
            problems.append(f"{t['id']} thiếu Test Steps")
        if not t["exp"]:
            problems.append(f"{t['id']} thiếu Expected Result")
        if not t["asg"]:
            problems.append(f"{t['id']} thiếu Assignee")

    # 6. phân bổ assignee
    dist = collections.Counter(t["asg"] for t in tcs)

    print("=" * 72)
    print("KIỂM TRA WORKBOOK")
    print("=" * 72)
    print(f"REQ: {len(req_set)} | TR: {len(tr_ids)} | TC: {len(tc_ids)} | TM rows: {len(tm)}")
    print("Phân bổ TC theo người:", dict(dist))
    print("Trạng thái TC:", dict(collections.Counter(t['status'] for t in tcs)))
    if problems:
        print("\nLỖI:")
        for p in problems:
            print("  -", p)
    else:
        print("\nKHÔNG PHÁT HIỆN LỖI: mọi ràng buộc truy vết đều thỏa.")
    return 1 if problems else 0


if __name__ == "__main__":
    errs = validate_source()
    if errs:
        print("DỮ LIỆU GỐC KHÔNG HỢP LỆ:")
        for e in errs:
            print("  -", e)
        sys.exit(1)

    out = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("Test Case_23CT113_Nhom02.NEW.xlsx")
    build(out)
    print(f"Đã ghi: {out}")
    sys.exit(verify(out))
