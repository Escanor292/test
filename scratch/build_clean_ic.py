# -*- coding: utf-8 -*-
import openpyxl
from openpyxl.cell.cell import MergedCell
import re, sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.xlsx"
wb = openpyxl.load_workbook(file_path)

# 1. Keep only 2 target sheets
for s in list(wb.sheetnames):
    if s not in ["Product Requirements", "Vi_Product Requirements"]:
        del wb[s]

ws_en = wb["Product Requirements"]
ws_vi = wb["Vi_Product Requirements"]

def safe_set(ws, r, c, val):
    cell = ws.cell(row=r, column=c)
    if not isinstance(cell, MergedCell):
        cell.value = val

# Clear all cells first
for ws in [ws_en, ws_vi]:
    for r in range(1, 150):
        for c in range(1, 15):
            safe_set(ws, r, c, None)

# Define symmetric rows
data = [
    # (Row, Col, EN_val, VI_val)
    # R1: Header
    (1, 2, "PRODUCT REQUIREMENTS", "YÊU CẦU SẢN PHẨM"),
    # R2-R7: Metadata
    (2, 2, "PRODUCT TITLE", "TÊN SẢN PHẨM"),
    (2, 3, "Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)", "Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)"),
    (3, 2, "AUTHOR", "TÁC GIẢ"),
    (3, 3, "Nguyễn Quách Phú Tài (Trưởng nhóm), Trần Xuân Ân, Bùi Đặng Quốc Khánh, Nguyễn Trung Tiến, Nguyễn Khánh Du", "Nguyễn Quách Phú Tài (Trưởng nhóm), Trần Xuân Ân, Bùi Đặng Quốc Khánh, Nguyễn Trung Tiến, Nguyễn Khánh Du"),
    (4, 2, "PHONE", "ĐIỆN THOẠI"),
    (4, 3, "0932299701", "0932299701"),
    (5, 2, "EMAIL", "E-MAIL"),
    (5, 3, "nhom02.23ct113@lhu.edu.vn", "nhom02.23ct113@lhu.edu.vn"),
    (6, 2, "ADDRESS", "ĐỊA CHỈ"),
    (6, 3, "Khoa CNTT, Đại học Lạc Hồng, Biên Hòa, Đồng Nai", "Khoa CNTT, Đại học Lạc Hồng, Biên Hòa, Đồng Nai"),
    (7, 2, "DATE", "NGÀY"),
    (7, 3, "30/10/2026", "30/10/2026"),
    
    # R8-R9: Overview
    (8, 2, "OVERVIEW", "TỔNG QUAN"),
    (9, 2, "The 'Tu Te Fund' project is a Community Crowdfunding platform. Its main purpose is to build a transparent fundraising system allowing users to launch campaigns, donate via VietQR, and verify electronic donation certificates. Tech stack: Next.js 15, PostgreSQL (Neon DB), NextAuth RBAC, and Tailwind CSS.",
           'Dự án "Tử Tế Fund" là nền tảng Crowdfunding (gây quỹ cộng đồng). Mục đích chính là tạo ra một hệ thống minh bạch cho phép người dùng tạo chiến dịch, ủng hộ trực tuyến qua mã VietQR và cấp chứng từ điện tử. Hệ thống được xây dựng trên kiến trúc Next.js 15, PostgreSQL (Neon DB) và phân quyền NextAuth chặt chẽ.'),
    
    # R10-R16: Objectives
    (10, 2, "PRODUCT OBJECTIVES", "MỤC TIÊU SẢN PHẨM"),
    (11, 2, "Core objectives and strategic goals of the platform", "Các mục tiêu cốt lõi và định hướng chiến lược của nền tảng"),
    (12, 2, "Transparent Fundraising Platform", "Xây dựng nền tảng Gây quỹ Minh bạch"),
    (12, 3, "Friendly interface for tracking campaigns, donating via VietQR, and public certificate lookup.", "Giao diện thân thiện giúp người dùng dễ dàng theo dõi chiến dịch, đóng góp và tra cứu chứng từ."),
    (13, 2, "Comprehensive Admin Moderation", "Cung cấp Bảng điều khiển Quản trị Toàn diện"),
    (13, 3, "Equip administrators with tools for KYC verification, campaign approval, and transaction reconciliation.", "Trang bị cho Admin công cụ kiểm duyệt KYC, phê duyệt chiến dịch và đối soát giao dịch VietQR."),
    (14, 2, "Community Interaction & Engagement", "Tăng cường Tương tác Cộng đồng"),
    (14, 3, "Integrate project blogs, P2P communication, and review mechanisms connecting Backers and Creators.", "Tích hợp Blog, Chat P2P và hệ thống bình luận để gắn kết Người gọi vốn (Creator) và Người ủng hộ (Backer)."),
    (15, 2, "Escrow & Settle Workflow", "Quy trình Ký quỹ và Đối soát Trung thực"),
    (15, 3, "Ensure all pledges pass escrow accounts and automated settlement logging before disbursement.", "Đảm bảo mọi khoản đóng góp đều qua tài khoản trung gian và ghi log đối soát trước khi giải ngân."),
    (16, 2, "Public Financial Ledger Verification", "Công khai Minh bạch Sổ quỹ và Chứng từ"),
    (16, 3, "Real-time fund tracking, transparent expenditure statements, and electronic tax invoices.", "Theo dõi dòng tiền gây quỹ thời gian thực, sao kê thu chi công khai và hóa đơn điện tử hợp lệ."),

    # R17-R23: Stakeholders
    (17, 2, "STAKEHOLDER IDENTIFICATION", "XÁC ĐỊNH CÁC BÊN LIÊN QUAN"),
    (18, 2, "List and describe stakeholders, roles, responsibilities, and expected benefits", "Liệt kê và mô tả các bên liên quan, vai trò, trách nhiệm và lợi ích kỳ vọng"),
    (19, 2, "STAKEHOLDER", "BÊN LIÊN QUAN"),
    (19, 3, "USER TYPE", "LOẠI NGƯỜI DÙNG"),
    (19, 4, "RESPONSIBILITIES", "TRÁCH NHIỆM"),
    (19, 5, "EXPECTED BENEFITS", "LỢI ÍCH KỲ VỌNG"),
    (20, 2, "Backer", "Người ủng hộ (Backer)"),
    (20, 3, "Public User", "Người dùng đại chúng"),
    (20, 4, "Browse campaigns, contribute funds via VietQR, look up certificates", "Duyệt và ủng hộ chiến dịch, chuyển khoản VietQR, tra cứu chứng nhận"),
    (20, 5, "Transparent contribution tracking, digital certificates, rewards", "Theo dõi dòng tiền minh bạch, nhận chứng nhận điện tử và gói thưởng"),
    (21, 2, "Creator", "Người gọi vốn (Creator)"),
    (21, 3, "Fundraiser / Organization", "Tổ chức / Cá nhân gây quỹ"),
    (21, 4, "Complete KYC, create and manage fundraising campaigns, ship rewards", "Hoàn tất KYC định danh, tạo và quản lý chiến dịch, trả thưởng cho backer"),
    (21, 5, "Reach funding goals, build community trust through transparent updates", "Đạt mục tiêu gây quỹ, gia tăng uy tín thông qua cập nhật minh bạch"),
    (22, 2, "Administrator", "Quản trị viên (Admin)"),
    (22, 3, "System Operator", "Điều hành hệ thống"),
    (22, 4, "Verify KYC documents, approve/reject campaigns, audit ledgers", "Kiểm duyệt hồ sơ KYC, phê duyệt chiến dịch, đối soát dòng tiền và từ cấm"),
    (22, 5, "Platform integrity, regulatory compliance, fraud prevention", "Đảm bảo an toàn hệ thống, tuân thủ pháp lý, ngăn ngừa gian lận"),
    (23, 2, "QA / Testing Engineer", "Kỹ sư Kiểm thử (QA)"),
    (23, 3, "Quality Assurance", "Đảm bảo chất lượng"),
    (23, 4, "Design TR/TC, execute real E2E/API test suites, audit documents", "Thiết kế TR/TC, chạy tự động Playwright và API, đối soát tài liệu"),
    (23, 5, "High system reliability, zero regression defects, audit compliance", "Độ tin cậy hệ thống tối đa, không có lỗi hồi quy, chuẩn hóa báo cáo"),

    # R24-R36: Functional Requirements (10 Modules)
    (24, 2, "FUNCTIONAL REQUIREMENTS", "YÊU CẦU CHỨC NĂNG"),
    (25, 2, "Detailed specification of the 10 system functional modules", "Đặc tả chi tiết 10 phân hệ chức năng của nền tảng"),
    (26, 2, "MODULE CODE", "MÃ PHÂN HỆ"),
    (26, 3, "MODULE NAME & SCOPE", "TÊN PHÂN HỆ & PHẠM VI"),
    (26, 4, "FUNCTIONAL DETAILS & ENUM CONSTRAINTS", "CHI TIẾT CHỨC NĂNG & RÀNG BUỘC ENUM"),
    (27, 2, "AUTH", "AUTH - Xác thực & Phân quyền"),
    (27, 3, "Authentication & Role-Based Access Control", "Đăng nhập Credentials/Google, đăng ký, quên mật khẩu và phân quyền RBAC."),
    (27, 4, "NextAuth JWT session, password >= 6 chars, password reset token expires in 30 mins, roles: ADMIN, CREATOR, BACKER.", "Phiên JWT NextAuth, mật khẩu >= 6 ký tự, token reset hạn 30 phút, vai trò: ADMIN, CREATOR, BACKER."),
    (28, 2, "KYC", "KYC - Định danh tài khoản"),
    (28, 3, "Identity Verification & Creator Upgrade", "Người dùng tải lên CCCD/Giấy phép KD để Admin duyệt cấp quyền Creator."),
    (28, 4, "ID card front/back images, tax code, status: NOT_SUBMITTED, PENDING, VERIFIED, REJECTED.", "Ảnh CCCD 2 mặt, mã số thuế/ĐKKD, trạng thái: NOT_SUBMITTED, PENDING, VERIFIED, REJECTED."),
    (29, 2, "CAMP", "CAMP - Quản lý chiến dịch"),
    (29, 3, "Fundraising Campaign Lifecycle", "Tạo, chỉnh sửa, theo dõi tiến độ và quản lý trạng thái chiến dịch gây quỹ."),
    (29, 4, "Status: DRAFT, PENDING_REVIEW, ACTIVE, SUCCESS, FAILED, CANCELED; assertCleanContent for banned keywords.", "Trạng thái: DRAFT, PENDING_REVIEW, ACTIVE, SUCCESS, FAILED, CANCELED; lọc từ khóa cấm assertCleanContent."),
    (30, 2, "REWARD", "REWARD - Quản lý phần thưởng"),
    (30, 3, "Reward Tiers & Digital Assets", "Thiết lập gói phần thưởng, giới hạn số lượng và quản lý quà tặng số."),
    (30, 4, "Pledge reward mapping, physical item shipping metadata, digital asset access control.", "Ánh xạ gói quà theo mức ủng hộ, thông tin giao hàng vật lý, cấp quyền tải quà tặng số."),
    (31, 2, "PLEDGE", "PLEDGE - Ủng hộ gây quỹ"),
    (31, 3, "Pledge Donation & VietQR Payment", "Ủng hộ dự án thông qua phương thức chuyển khoản ngân hàng (VietQR)."),
    (31, 4, "VietQR generation with transaction memo, status: PENDING, SUCCESS, FAILED, REFUNDED; MoMo/VNPay return HTTP 410.", "Tạo mã VietQR kèm cú pháp, trạng thái: PENDING, SUCCESS, FAILED, REFUNDED; cổng ví trả HTTP 410."),
    (32, 2, "CERT", "CERT - Chứng từ minh bạch"),
    (32, 3, "Electronic Certificate & Ledger Statement", "Tra cứu lịch sử đóng góp, cấp chứng nhận điện tử và hóa đơn VAT."),
    (32, 4, "Public search by certificate code, financial cashflow ledger (so_ledgers), electronic tax receipt.", "Tra cứu công khai theo mã chứng thư, sao kê dòng tiền thực tế (so_ledgers), hóa đơn VAT điện tử."),
    (33, 2, "COMM", "COMM - Tương tác cộng đồng"),
    (33, 3, "Community Feedback & Campaign Reports", "Gửi phản hồi, báo cáo vi phạm và đánh giá các chiến dịch."),
    (33, 4, "Feedback length <= 2000 chars, rate limit 429 prevention, backer-only review verification.", "Góp ý tối đa 2000 ký tự, chống spam HTTP 429, chỉ người đã ủng hộ mới được đánh giá chiến dịch."),
    (34, 2, "BLOG", "BLOG - Nhật ký dự án"),
    (34, 3, "Project Updates & Storytelling", "Creator đăng bài cập nhật tiến độ dự án, chia sẻ câu chuyện hành trình."),
    (34, 4, "Rich text TipTap editor, status: DRAFT, PUBLISHED; like and bookmark capabilities.", "Trình soạn thảo rich text TipTap, trạng thái DRAFT, PUBLISHED; tương tác thích và đánh dấu bài viết."),
    (35, 2, "CHAT", "CHAT - Hội thoại & P2P",),
    (35, 3, "Direct Messaging & Peer-to-Peer Calling", "Nhắn tin trực tiếp giữa người dùng và Creator, hỗ trợ gọi thoại P2P."),
    (35, 4, "Short polling chat engine, call-signal messaging, CALL_TIMEOUT_MS = 45000 ms.", "Cơ chế polling tin nhắn, tín hiệu điều phối cuộc gọi call-signal, timeout cuộc gọi 45 giây."),
    (36, 2, "ADMIN", "ADMIN - Quản trị hệ thống"),
    (36, 3, "System Administration & Financial Auditing", "Dashboard thống kê, quản lý người dùng, duyệt chiến dịch, cấu hình từ cấm."),
    (36, 4, "User account block/unblock, KYC approvals, campaign feature toggle, cashflow analytics.", "Khóa/mở tài khoản, duyệt hồ sơ KYC, ghim chiến dịch tiêu biểu, biểu đồ phân tích dòng tiền."),

    # R37-R46: Non-Functional Requirements
    (37, 2, "NON-FUNCTIONAL REQUIREMENTS", "YÊU CẦU PHI CHỨC NĂNG"),
    (38, 2, "System qualities: Security, Performance, Availability, Usability", "Các tiêu chuẩn chất lượng: Bảo mật, Hiệu năng, Độ tin cậy, Trải nghiệm"),
    (39, 2, "NFR-01: Security & Encryption", "NFR-01: Bảo mật & Mã hóa"),
    (39, 3, "Passwords hashed with bcrypt, API sessions verified via NextAuth JWT, HTTPS enforcement.", "Mật khẩu băm bằng bcrypt, phiên API xác thực qua JWT NextAuth, bắt buộc HTTPS toàn hệ thống."),
    (40, 2, "NFR-02: Performance & Latency", "NFR-02: Hiệu năng & Tốc độ"),
    (40, 3, "API response time < 2000ms for standard requests; database connection pooling via Neon serverless.", "Thời gian phản hồi API < 2000ms đối với yêu cầu tiêu chuẩn; tối ưu kết nối Neon DB."),
    (41, 2, "NFR-03: System Availability", "NFR-03: Tính sẵn sàng của hệ thống"),
    (41, 3, "99.9% uptime hosted on Vercel Edge Network and Neon cloud infrastructure.", "Thời gian hoạt động liên tục 99.9% trên nền tảng Vercel Edge và hạ tầng điện toán đám mây Neon."),
    (42, 2, "NFR-04: Data Integrity", "NFR-04: Toàn vẹn Dữ liệu"),
    (42, 3, "ACID compliance for all pledge transactions and immutable audit ledger entries.", "Đảm bảo tính nhất quán ACID cho mọi giao dịch đóng góp và các dòng sao kê sổ quỹ không thể sửa đổi."),
    (43, 2, "NFR-05: User Experience & Usability", "NFR-05: Trải nghiệm người dùng"),
    (43, 3, "Responsive design on mobile, tablet, and desktop viewports with Tailwind CSS.", "Giao diện tương thích mượt mà trên di động, máy tính bảng và máy tính để bàn bằng Tailwind CSS."),
    (44, 2, "NFR-06: Content Moderation & Safety", "NFR-06: Kiểm duyệt Nội dung & An toàn"),
    (44, 3, "Automated filter for profanity and malicious campaign scripts via assertCleanContent.", "Bộ lọc tự động phát hiện từ cấm và nội dung độc hại trong bài đăng qua assertCleanContent."),
    (45, 2, "NFR-07: Error Handling & Resilience", "NFR-07: Xử lý Lỗi & Khả năng Phục hồi"),
    (45, 3, "Graceful HTTP error responses (400, 401, 403, 404, 410, 429) with localized user messages.", "Trả về mã lỗi HTTP chuẩn mực (400, 401, 403, 404, 410, 429) kèm thông báo rõ ràng cho người dùng."),
    (46, 2, "NFR-08: Auditability & Compliance", "NFR-08: Khả năng Đối soát & Tuân thủ"),
    (46, 3, "Full traceability between test cases, software requirements, and physical execution evidence.", "Truy vết hoàn toàn giữa ca kiểm thử, yêu cầu phần mềm và bằng chứng thực thi vật lý."),

    # R47-R52: Assumptions and Constraints
    (47, 2, "ASSUMPTIONS AND CONSTRAINTS", "GIẢ ĐỊNH VÀ RÀNG BUỘC"),
    (48, 2, "Operational assumptions and technical constraints of the project", "Các giả định hoạt động và ràng buộc kỹ thuật của dự án"),
    (49, 2, "Payment Simulation Constraint", "Ràng buộc Cổng Thanh toán"),
    (49, 3, "Direct e-wallets (MoMo/VNPay) return HTTP 410; transactions operate via VietQR and escrow banking.", "Các cổng ví MoMo/VNPay tạm dừng (HTTP 410); thanh toán vận hành qua VietQR và tài khoản trung gian."),
    (50, 2, "Hosting & Cloud Database Constraint", "Ràng buộc Lưu trữ và Cơ sở dữ liệu"),
    (50, 3, "Project deployed on Vercel Serverless with PostgreSQL managed by Neon Cloud.", "Dự án triển khai trên nền tảng Vercel Serverless kết nối CSDL PostgreSQL Neon Cloud."),
    (51, 2, "Identity Moderation Constraint", "Ràng buộc Định danh và Phân quyền"),
    (51, 3, "Creator privileges strictly require Administrator KYC approval; self-elevation is prohibited.", "Quyền Creator bắt buộc phải qua bước duyệt KYC của Quản trị viên; nghiêm cấm tự cấp quyền."),
    (52, 2, "Testing Timeline Constraint", "Ràng buộc Thời gian và Chi phí Kiểm thử"),
    (52, 3, "Executed within 3 academic weeks with 0 VND budget using open-source test runners.", "Hoàn thành trong 3 tuần học tập với ngân sách 0 đồng sử dụng các công cụ kiểm thử mã nguồn mở."),

    # R53-R58: Dependencies
    (53, 2, "TECHNICAL DEPENDENCIES", "CÁC PHỤ THUỘC KỸ THUẬT"),
    (54, 2, "Third-party libraries, platforms, and external APIs", "Các thư viện, nền tảng và giao diện lập trình bên ngoài"),
    (55, 2, "Next.js 15 & React 19", "Next.js 15 & React 19"),
    (55, 3, "Core modern web framework with React Server Components and Server Actions.", "Khung ứng dụng web hiện đại hỗ trợ React Server Components và Server Actions."),
    (56, 2, "PostgreSQL & Prisma ORM", "PostgreSQL & Prisma ORM"),
    (56, 3, "Cloud relational database with Prisma schema modeling and migrations.", "Cơ sở dữ liệu quan hệ đám mây kết hợp quản lý mô hình Prisma ORM."),
    (57, 2, "NextAuth.js v5 Beta", "NextAuth.js v5 Beta"),
    (57, 3, "Secure authentication engine handling credentials and Google OAuth providers.", "Cơ chế xác thực bảo mật hỗ trợ tài khoản mật khẩu và cổng Google OAuth."),
    (58, 2, "Cloudinary Media Service", "Dịch vụ Lưu trữ Đa phương tiện Cloudinary"),
    (58, 3, "Cloud storage for user avatars, campaign banners, and identity documents.", "Lưu trữ đám mây cho ảnh đại diện, banner chiến dịch và tài liệu định danh."),

    # R59-R65: Acceptance Criteria
    (59, 2, "ACCEPTANCE CRITERIA", "TIÊU CHÍ CHẤP NHẬN"),
    (60, 2, "Conditions required for each module to be certified as passed", "Điều kiện bắt buộc để từng phân hệ được nghiệm thu đạt yêu cầu"),
    (61, 2, "Authentication Acceptance", "Nghiệm thu Xác thực & Phân quyền"),
    (61, 3, "Successful login issues JWT cookie, password length enforced >= 6, invalid credentials blocked.", "Đăng nhập thành công cấp cookie JWT, chặn mật khẩu < 6 ký tự, từ chối thông tin sai."),
    (62, 2, "KYC & Creator Verification Acceptance", "Nghiệm thu Định danh KYC"),
    (62, 3, "Admin can approve valid KYC dossiers within 24h, automatically elevating user to CREATOR.", "Admin duyệt hồ sơ KYC hợp lệ trong 24h, tự động nâng cấp quyền người dùng thành CREATOR."),
    (63, 2, "Campaign Lifecycle Acceptance", "Nghiệm thu Vòng đời Chiến dịch"),
    (63, 3, "Campaigns transition through DRAFT -> PENDING_REVIEW -> ACTIVE with clean content verification.", "Chiến dịch chuyển trạng thái đúng quy trình: DRAFT -> PENDING_REVIEW -> ACTIVE, sạch từ cấm."),
    (64, 2, "Pledge & VietQR Reconciliation Acceptance", "Nghiệm thu Ủng hộ & Đối soát VietQR"),
    (64, 3, "VietQR code correctly generated with transaction memo; funds update campaign total upon settlement.", "Mã VietQR sinh chính xác kèm cú pháp; tiền ủng hộ cập nhật vào quỹ khi admin đối soát."),
    (65, 2, "Public Certificate Verification Acceptance", "Nghiệm thu Tra cứu Chứng nhận Công khai"),
    (65, 3, "Valid certificate code returns transparent digital voucher and public contribution proof.", "Mã chứng thư hợp lệ hiển thị giấy chứng nhận số và thông tin đóng góp minh bạch."),

    # R66-R72: Risk Analysis and Mitigation
    (66, 2, "RISK ANALYSIS AND MITIGATION", "PHÂN TÍCH RỦI RO VÀ GIẢM THIỂU"),
    (67, 2, "Potential risks and mitigation strategies", "Các rủi ro tiềm ẩn và chiến lược giảm thiểu tương ứng"),
    (68, 2, "IDENTIFIED RISK", "RỦI RO XÁC ĐỊNH"),
    (68, 3, "SEVERITY", "MỨC ĐỘ"),
    (68, 4, "MITIGATION STRATEGY", "CHIẾN LƯỢC GIẢM THIỂU"),
    (69, 2, "Fake KYC or Identity Theft", "Hồ sơ KYC giả mạo hoặc gian lận"),
    (69, 3, "Critical Severity", "Mức độ Nghiêm trọng"),
    (69, 4, "Mandatory admin review, ID front/back check, and business tax verification.", "Bắt buộc Admin duyệt thủ công, kiểm tra ảnh CCCD 2 mặt và mã số thuế doanh nghiệp."),
    (70, 2, "Malicious or Inappropriate Campaign Content", "Chiến dịch đăng tải nội dung phản cảm/lừa đảo"),
    (70, 3, "High Severity", "Mức độ Cao"),
    (70, 4, "Pre-screening via assertCleanContent keyword filters and manual approval before launch.", "Kiểm duyệt tự động qua từ điển từ cấm và phê duyệt bắt buộc trước khi kích hoạt."),
    (71, 2, "Payment Gateway Simulation Drift", "Sai lệch giữa mô phỏng và thanh toán thực tế"),
    (71, 3, "Medium Severity", "Mức độ Trung bình"),
    (71, 4, "Standardized VietQR NAPAS transfer syntax with strict ledger audit logs.", "Chuẩn hóa cú pháp chuyển khoản VietQR NAPAS kèm ghi log sao kê sổ quỹ chặt chẽ."),
    (72, 2, "Database Connection Exhaustion", "Quá tải kết nối cơ sở dữ liệu serverless"),
    (72, 3, "Medium Severity", "Mức độ Trung bình"),
    (72, 4, "Configured Neon connection pooling and Prisma connection management.", "Cấu hình bộ gom kết nối (connection pooling) của Neon và tối ưu hóa Prisma Client."),

    # R73-R85: Priority and Effort
    (73, 2, "PRIORITY AND EFFORT ALLOCATION", "MỨC ĐỘ ƯU TIÊN VÀ PHÂN BỔ NỖ LỰC"),
    (74, 2, "Module ranking and estimated QA effort", "Phân hạng phân hệ và ước tính nỗ lực kiểm thử"),
    (75, 2, "MODULE / SUBSYSTEM", "PHÂN HỆ / CHỨC NĂNG"),
    (75, 3, "PRIORITY LEVEL", "MỨC ĐỘ ƯU TIÊN"),
    (75, 4, "ESTIMATED EFFORT (HOURS)", "NỖ LỰC DỰ KIẾN (GIỜ)"),
    (76, 2, "AUTH - Authentication & RBAC", "AUTH - Xác thực & Phân quyền"),
    (76, 3, "Critical Priority", "Ưu tiên Tối cao"),
    (76, 4, "18 Hours", "18 Giờ"),
    (77, 2, "KYC - Creator Identification", "KYC - Định danh tài khoản"),
    (77, 3, "High Priority", "Ưu tiên Cao"),
    (77, 4, "16 Hours", "16 Giờ"),
    (78, 2, "CAMP - Campaign Management", "CAMP - Quản lý chiến dịch"),
    (78, 3, "Critical Priority", "Ưu tiên Tối cao"),
    (78, 4, "24 Hours", "24 Giờ"),
    (79, 2, "REWARD - Reward Packages", "REWARD - Quản lý phần thưởng"),
    (79, 3, "Medium Priority", "Ưu tiên Trung bình"),
    (79, 4, "12 Hours", "12 Giờ"),
    (80, 2, "PLEDGE - Donations & VietQR", "PLEDGE - Ủng hộ gây quỹ"),
    (80, 3, "Critical Priority", "Ưu tiên Tối cao"),
    (80, 4, "22 Hours", "22 Giờ"),
    (81, 2, "CERT - Certificates & Ledgers", "CERT - Chứng từ minh bạch"),
    (81, 3, "High Priority", "Ưu tiên Cao"),
    (81, 4, "14 Hours", "14 Giờ"),
    (82, 2, "COMM - Community & Feedback", "COMM - Tương tác cộng đồng"),
    (82, 3, "Medium Priority", "Ưu tiên Trung bình"),
    (82, 4, "10 Hours", "10 Giờ"),
    (83, 2, "BLOG - Project Updates", "BLOG - Nhật ký dự án"),
    (83, 3, "Low Priority", "Ưu tiên Thấp"),
    (83, 4, "8 Hours", "8 Giờ"),
    (84, 2, "CHAT - P2P Conversations", "CHAT - Hội thoại & P2P"),
    (84, 3, "Low Priority", "Ưu tiên Thấp"),
    (84, 4, "8 Hours", "8 Giờ"),
    (85, 2, "ADMIN - System Administration", "ADMIN - Quản trị hệ thống"),
    (85, 3, "Critical Priority", "Ưu tiên Tối cao"),
    (85, 4, "20 Hours", "20 Giờ"),

    # R86-R92: Version History
    (86, 2, "VERSION HISTORY AND CHANGE LOG", "LỊCH SỬ PHIÊN BẢN VÀ NHẬT KÝ THAY ĐỔI"),
    (87, 2, "Document revision records and evolution", "Hồ sơ theo dõi sửa đổi và phát triển tài liệu"),
    (88, 2, "VERSION", "PHIÊN BẢN"),
    (88, 3, "AUTHOR / ROLE", "NGƯỜI THỰC HIỆN"),
    (88, 4, "RELEASE DATE", "NGÀY PHÁT HÀNH"),
    (88, 5, "DESCRIPTION OF CHANGE", "MÔ TẢ THAY ĐỔI"),
    (89, 2, "v1.0.0", "v1.0.0"),
    (89, 3, "Nguyễn Quách Phú Tài (Leader)", "Nguyễn Quách Phú Tài (Trưởng nhóm)"),
    (89, 4, "10/10/2026", "10/10/2026"),
    (89, 5, "Initial draft of Product Requirements and Architecture", "Khởi tạo tài liệu đặc tả yêu cầu và kiến trúc hệ thống"),
    (90, 2, "v1.1.0", "v1.1.0"),
    (90, 3, "Trần Xuân Ân (QA Engineer)", "Trần Xuân Ân (Kỹ sư QA)"),
    (90, 4, "18/10/2026", "18/10/2026"),
    (90, 5, "Added detailed module constraints (AUTH, KYC, CAMP, PLEDGE)", "Bổ sung ràng buộc chi tiết cho các phân hệ AUTH, KYC, CAMP, PLEDGE"),
    (91, 2, "v1.2.0", "v1.2.0"),
    (91, 3, "Bùi Đặng Quốc Khánh & Nguyễn Trung Tiến", "Bùi Đặng Quốc Khánh & Nguyễn Trung Tiến"),
    (91, 4, "25/10/2026", "25/10/2026"),
    (91, 5, "Updated VietQR payment reconciliation and ledger audit rules", "Cập nhật cơ chế đối soát VietQR và quy tắc kiểm toán sao kê sổ quỹ"),
    (92, 2, "v2.0.0", "v2.0.0"),
    (92, 3, "Nguyễn Quách Phú Tài & Nguyễn Khánh Du", "Nguyễn Quách Phú Tài & Nguyễn Khánh Du"),
    (92, 4, "30/10/2026", "30/10/2026"),
    (92, 5, "Final bilingual synchronization and audit compliance sign-off", "Đồng bộ song ngữ Anh-Việt hoàn chỉnh và ký duyệt kiểm toán chất lượng")
]

for row_idx, col_idx, en_text, vi_text in data:
    safe_set(ws_en, row_idx, col_idx, en_text)
    safe_set(ws_vi, row_idx, col_idx, vi_text)

wb.save(file_path)
print("Saved clean symmetric IC file successfully!")

