import openpyxl
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
import sys

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.Workbook()
wb.remove(wb.active)

# Styling definitions
font_title = Font(name='Calibri', size=16, bold=True, color='1F497D')
font_sec_hdr = Font(name='Calibri', size=13, bold=True, color='1F497D')
font_tbl_hdr = Font(name='Calibri', size=11, bold=True, color='FFFFFF')
font_bold = Font(name='Calibri', size=11, bold=True, color='000000')
font_normal = Font(name='Calibri', size=11, color='000000')
font_desc = Font(name='Calibri', size=10, italic=True, color='595959')

fill_tbl_hdr = PatternFill(start_color='1F497D', end_color='1F497D', fill_type='solid')
fill_sec_hdr = PatternFill(start_color='DCE6F1', end_color='DCE6F1', fill_type='solid')

thin_gray = Side(style='thin', color='D9D9D9')
border_cell = Border(left=thin_gray, right=thin_gray, top=thin_gray, bottom=thin_gray)

align_left = Alignment(horizontal='left', vertical='center', wrap_text=True)
align_center = Alignment(horizontal='center', vertical='center', wrap_text=True)

# ----------------- DATA DEFINITIONS -----------------

en_rows = [
    # (row_idx, col_B, col_C, col_D, col_E, is_sec_hdr, is_tbl_hdr)
    (1, "PRODUCT REQUIREMENTS", None, None, None, True, False),
    (2, "PRODUCT TITLE", "Tu Te Fund — Community Crowdfunding Platform", None, None, False, False),
    (3, "AUTHOR", "Nguyen Quach Phu Tai (Project Lead / Developer)", None, None, False, False),
    (4, "PHONE", "0932299701", None, None, False, False),
    (5, "EMAIL", "nguyenquachphutai@gmail.com", None, None, False, False),
    (6, "ADDRESS", "Faculty of IT, Lac Hong University, Bien Hoa, Dong Nai, Vietnam", None, None, False, False),
    (7, "DATE", "2026-10-30", None, None, False, False),
    (8, "OVERVIEW", None, None, None, True, False),
    (9, "Tu Te Fund is a transparent community crowdfunding platform built for Vietnamese creators and backers. The platform facilitates fundraising campaigns with automated escrow financial tracking, VietQR donation processing, electronic donation certificates (/lookup), public financial ledger statements (/so), project updates, reward distribution, and real-time interaction. Tech stack: Next.js 15 (App Router), React 19, Neon PostgreSQL with Prisma ORM, NextAuth v5 beta RBAC, Cloudinary media storage, and Tailwind CSS. Web Demo: https://test-gamma-azure-65.vercel.app", None, None, None, False, False),
    (10, "PRODUCT OBJECTIVES", None, None, None, True, False),
    (11, "Core objectives and strategic goals the product aims to achieve across 10 functional modules.", None, None, None, False, False),
    (12, "OBJ-01: Transparent Community Crowdfunding", "Enable transparent fundraising with target goals, real-time progress, deadline countdown, and full DRAFT -> PENDING_REVIEW -> ACTIVE lifecycle.", None, None, False, False),
    (13, "OBJ-02: Creator Project Hub & Catalog", "Provide creators with an intuitive hub linking campaigns, multi-tier rewards/products, blogs, and public Profile Studio.", None, None, False, False),
    (14, "OBJ-03: Patronage, Escrow & Digital Locker", "Combine donation with commerce; support VietQR escrow payments; unlock digital locker assets (/purchases) and VAT invoices upon success.", None, None, False, False),
    (15, "OBJ-04: Community Engagement & Retention", "Foster community engagement via TipTap rich-text blogs, nested comments, follow/bookmark, and member 1-1 chat/WebRTC calling.", None, None, False, False),
    (16, "OBJ-05: Governance, Manual KYC & Audit Logs", "Protect platform integrity via NextAuth session authorization, manual 2-sided CCCD KYC approval, word filters, and audit logs.", None, None, False, False),
    (17, "STAKEHOLDER IDENTIFICATION", None, None, None, True, False),
    (18, "List and describe stakeholders involved in the project, specifying roles, responsibilities, and expected benefits.", None, None, None, False, False),
    (19, "STAKEHOLDER NAME", "USER ROLE", "KEY RESPONSIBILITIES", "INTERESTS & BENEFITS", False, True),
    (20, "Nguyen Quach Phu Tai", "Student / Product Owner / QA Lead", "Gather requirements, design 42 TRs and 104 TCs, coordinate testing, deploy demo", "Deliver high-quality software testing final report meeting university standards", False, False),
    (21, "Creator", "Primary Supply-side User", "Submit manual KYC, create campaigns, configure reward tiers, publish updates", "Raise VND funding with trusted identity and verified transparent escrow tracking", False, False),
    (22, "Backer / Visitor", "Primary Demand-side User", "Discover campaigns, pledge funds via VietQR, receive locker assets, track ledger", "Support community projects with familiar payment methods and verifiable receipts", False, False),
    (23, "Platform Administrator", "Trust & Operations Operator", "Review campaigns, approve/reject manual KYC, monitor word filters, reconcile ledgers", "Minimize fraud risks, enforce platform compliance, protect community reputation", False, False),
    (24, "QA / Testing Team", "Quality Assurance Engineers", "Execute 3-lane test suites, audit 10 modules, log 26 real bug reports with evidence", "Ensure zero regression, verify 76 PASS / 28 FAIL / 0 Chưa chạy on live system", False, False),
    (25, "Cloud Infrastructure Providers", "Hosting & Database Vendors", "Provide Vercel Serverless hosting, Neon PostgreSQL database, Cloudinary media storage", "High system availability, sub-second API latency, and reliable data persistence", False, False),
    (26, "FUNCTIONAL REQUIREMENTS", None, None, None, True, False),
    (27, "Detailed specification of the 10 system functional modules derived directly from system source code and routes.", None, None, None, False, False),
    (28, "MODULE 01: AUTH (Authentication & RBAC)", "NextAuth Credentials login, registration with password >= 6 chars, SHA-256 password reset tokens expiring in 30 mins, and RBAC enforcement (ADMIN, CREATOR, BACKER).", None, None, False, False),
    (29, "MODULE 02: KYC (Manual Identity Verification)", "Two-sided CCCD (12 digits) or Tax Code upload; Admin manual verification workflow (NOT_SUBMITTED -> PENDING -> VERIFIED / REJECTED); auto-upgrade to CREATOR.", None, None, False, False),
    (30, "MODULE 03: CAMP (Campaign Lifecycle Management)", "Full campaign lifecycle (DRAFT -> PENDING_REVIEW -> ACTIVE -> FINISHED/CANCELLED); future endDate and goalAmount > 0 validation; prohibited word filtering.", None, None, False, False),
    (31, "MODULE 04: REWARD (Reward Tiers & Digital Assets)", "Multi-tier reward items with minAmount > 0 enforcement, stock quantity tracking, delivery addresses, and digital asset locker access.", None, None, False, False),
    (32, "MODULE 05: PLEDGE (Pledge Donation & VietQR Escrow)", "VietQR transfer generation with unique memo, escrow bank custody; MoMo/VNPay return HTTP 410 ESCROW_BANK_ONLY; refund ledger status transition.", None, None, False, False),
    (33, "MODULE 06: CERT (Electronic Certificates & Statements)", "Public certificate verification at /lookup by unique code, electronic VAT invoice generation, and public cashflow ledger statements at /so.", None, None, False, False),
    (34, "MODULE 07: COMM (Community Feedback & Reviews)", "Feedback submission (/gop-y) with length 10-2000 chars, HTTP 429 rate limit protection, backer-only campaign star ratings, and project updates.", None, None, False, False),
    (35, "MODULE 08: BLOG (Project Stories & Editorial)", "TipTap rich-text blog editor, cover image uploads, publication status (DRAFT/PUBLISHED), and member follow/bookmark/like interactions.", None, None, False, False),
    (36, "MODULE 09: CHAT (Direct Messaging & P2P WebRTC)", "Short polling 1-1 messaging engine (POLL_MS = 1200ms), conversational participant management, and WebRTC video calling signaling channel.", None, None, False, False),
    (37, "MODULE 10: ADMIN (Administration & Financial Console)", "Centralized admin dashboard, BANNED user account locking, campaign approvals, sensitive keyword moderation, and platform revenue analytics.", None, None, False, False),
    (38, "NON-FUNCTIONAL REQUIREMENTS", None, None, None, True, False),
    (39, "Technical standards, performance metrics, security controls, and operational constraints.", None, None, None, False, False),
    (40, "NFR-01: Security & Session Authorization", "Authorize exclusively from server-side JWT session; hash passwords with bcrypt salt 10; sanitize HTML against XSS; do not store full payment credentials.", None, None, False, False),
    (41, "NFR-02: Performance & Latency Targets", "Public page read p95 < 500ms; authenticated CRUD transactions p95 < 800ms; Largest Contentful Paint (LCP) < 2.5s on broadband connections.", None, None, False, False),
    (42, "NFR-03: Cloud Infrastructure & Operations", "Vercel Serverless deployment with CI/CD build executing prisma generate and migrate deploy; 99.9% application uptime.", None, None, False, False),
    (43, "NFR-04: Relational Integrity & Schema Design", "Neon Serverless PostgreSQL with Prisma ORM (45 database models, 26 enums) enforcing foreign keys, unique constraints, and transaction rollbacks.", None, None, False, False),
    (44, "NFR-05: User Experience & Responsive Design", "Fully responsive UI across mobile (390x844 iPhone 14) and desktop (1920x1080); Tailwind CSS styling; smooth Framer Motion animations.", None, None, False, False),
    (45, "NFR-06: Scalability & Connection Pooling", "Optimized Neon connection pooling and Prisma Client caching designed to support concurrent multi-user access without resource exhaustion.", None, None, False, False),
    (46, "NFR-07: Audit Logging & Traceability", "Log all sensitive administrative actions (KYC approvals, campaign state changes, user account bans) with timestamps and operator user IDs.", None, None, False, False),
    (47, "NFR-08: Document Compliance & Exporting", "Format electronic invoices and donation certificates for A4 print-ready layout and secure public QR lookup verification.", None, None, False, False),
    (48, "ASSUMPTIONS AND CONSTRAINTS", None, None, None, True, False),
    (49, "Assumptions made during requirement formulation and constraints governing product development.", None, None, None, False, False),
    (50, "ASSUMPTIONS", None, None, None, True, False),
    (51, "Assumption 1: User Base & Currency", "Primary users reside in Vietnam and complete donation transactions in VND via VietQR / local bank transfers rather than crypto or cards.", None, None, False, False),
    (52, "Assumption 2: Cloud Infrastructure Sufficiency", "Managed cloud infrastructure (Vercel Serverless, Neon PostgreSQL, Cloudinary CDN) provides sufficient computing power for demo and testing.", None, None, False, False),
    (53, "Assumption 3: Creator Pre-requisites & Governance", "Creators complete public profile and manual KYC verification prior to receiving campaign creation privileges; Admin has final moderation authority.", None, None, False, False),
    (54, "Assumption 4: Modular Acceptance & Testing", "Software quality is verified and accepted module by module across 10 functional domains (42 TRs, 104 TCs) with objective technical evidence.", None, None, False, False),
    (55, "CONSTRAINTS", None, None, None, True, False),
    (56, "LIMIT-01: Development & Resource Scope", "Engineering resources are focused on core crowdfunding and trust modules (AUTH, KYC, CAMP, PLEDGE, CERT) prior to secondary extensions.", None, None, False, False),
    (57, "LIMIT-02: Regulatory Platform Scope", "The product functions as a technology platform for community donation and reward catalogs, not a licensed commercial payment intermediary.", None, None, False, False),
    (58, "LIMIT-03: Security & Secret Sanitization", "Project review packages exclude live environment secrets (.env); testing is conducted on demo URL with sanitized seed accounts.", None, None, False, False),
    (59, "LIMIT-04: Testing Environment Boundaries", "Test execution runs against live Vercel and Neon sandbox; missing third-party production credentials (e.g. Google OAuth) are evaluated as FAIL.", None, None, False, False),
    (60, "DEPENDENCIES", None, None, None, True, False),
    (61, "External technical dependencies and cloud services supporting platform execution.", None, None, None, False, False),
    (62, "DEP-01: Neon PostgreSQL & Prisma ORM", "Cloud relational database hosting user accounts, KYC documents, campaigns, rewards, pledges, and financial ledgers.", None, None, False, False),
    (63, "DEP-02: NextAuth v5 Beta & JWT", "Session authentication engine supporting Credentials provider, password hashing, and role-based route middleware protection.", None, None, False, False),
    (64, "DEP-03: Cloudinary Media Storage", "Cloud CDN infrastructure for hosting profile avatars, campaign banner assets, reward images, and manual KYC verification uploads.", None, None, False, False),
    (65, "DEP-04: VietQR & Banking Escrow Integration", "Standardized VietQR NAPAS transfer format and intermediary bank account routing for donation escrow custody.", None, None, False, False),
    (66, "DEP-05: Vercel Cloud Serverless Platform", "Global deployment platform providing serverless Next.js 15 execution, Edge middleware, and automated production pipelines.", None, None, False, False),
    (67, "ACCEPTANCE CRITERIA", None, None, None, True, False),
    (68, "Conditions that must be satisfied for modules to be considered successfully validated.", None, None, None, False, False),
    (69, "CRITERIA 01: Authentication & Protection", "Registration, login, and password reset succeed; BANNED users are blocked from protected routes; passwords hashed with bcrypt.", None, None, False, False),
    (70, "CRITERIA 02: Identity KYC Verification", "Submissions missing CCCD images are rejected; Admin can approve or reject manually; verification documents remain strictly confidential.", None, None, False, False),
    (71, "CRITERIA 03: Campaign Governance & Window", "Public campaign listing and filtering operate accurately; creators save drafts; only ACTIVE campaigns within date window accept pledges.", None, None, False, False),
    (72, "CRITERIA 04: VietQR Pledge & Escrow Custody", "VietQR code generated with accurate memo; pledges transition to SUCCESS upon reconciliation; digital locker assets unlock immediately.", None, None, False, False),
    (73, "CRITERIA 05: Certificate Lookup & Public Ledger", "Valid certificate codes display official electronic certificates at /lookup; financial cashflow ledger at /so matches transaction records.", None, None, False, False),
    (74, "RISK ANALYSIS AND MITIGATION", None, None, None, True, False),
    (75, "Potential technical and business risks with corresponding mitigation strategies.", None, None, None, False, False),
    (76, "IDENTIFIED RISK", "SEVERITY", "MITIGATION STRATEGY", None, False, True),
    (77, "Inactive campaign receiving pledges", "High Severity", "Enforce server-side validation rejecting pledges unless campaign status is ACTIVE and current timestamp is within window.", None, False, False),
    (78, "Fraudulent or unreadable KYC submissions", "Critical Severity", "Mandate 2-sided CCCD uploads; require manual Admin review; rejected applicants are strictly barred from campaign creation.", None, False, False),
    (79, "Concurrent pledge stock exhaustion", "High Severity", "Implement atomic database decrements and optimistic locking preventing reward stock from dropping below zero.", None, False, False),
    (80, "Cross-Site Scripting (XSS) in rich text editor", "High Severity", "Sanitize all TipTap HTML content on server before saving; restrict upload MIME types and enforce maximum file size limits.", None, False, False),
    (81, "Serverless database connection exhaustion", "Medium Severity", "Configure Neon connection pooling and Prisma connection limits to prevent connection timeouts during traffic spikes.", None, False, False),
    (82, "Production credentials leakage in public repo", "Critical Severity", "Store sensitive secrets in Vercel environment variables only; exclude .env files from Git repository and deliver sanitized tests.", None, False, False),
    (83, "PRIORITY EFFORT ALLOCATION", None, None, None, True, False),
    (84, "Priority classification and estimated testing effort for each functional domain.", None, None, None, False, False),
    (85, "FUNCTIONAL DOMAIN / MODULE", "PRIORITY LEVEL", "ESTIMATED EFFORT (HOURS)", "DELIVERABLE SCOPE", False, True),
    (86, "Module AUTH (Credentials, OTP reset, RBAC)", "High Priority", "18 Hours", "12 Test Cases (10 PASS / 2 FAIL)", False, False),
    (87, "Module KYC (CCCD upload, Admin approval)", "High Priority", "16 Hours", "11 Test Cases (10 PASS / 1 FAIL)", False, False),
    (88, "Module CAMP (Lifecycle, editor, review)", "High Priority", "24 Hours", "15 Test Cases (13 PASS / 2 FAIL)", False, False),
    (89, "Module REWARD & PLEDGE (Rewards, VietQR escrow)", "High Priority", "24 Hours", "18 Test Cases (13 PASS / 5 FAIL)", False, False),
    (90, "Module CERT & SỔ CÁI (Lookup, invoice, statement)", "High Priority", "14 Hours", "10 Test Cases (6 PASS / 4 FAIL)", False, False),
    (91, "Module COMM & BLOG (Feedback, comments, news)", "Medium Priority", "12 Hours", "23 Test Cases (15 PASS / 8 FAIL)", False, False),
    (92, "Module CHAT & ADMIN (P2P call, moderation console)", "Medium Priority", "16 Hours", "15 Test Cases (9 PASS / 6 FAIL)", False, False),
    (93, "VERSION HISTORY AND CHANGE LOG", None, None, None, True, False),
    (94, "Audit record of revisions, document updates, and verification milestones.", None, None, None, False, False),
    (95, "DOCUMENT VERSION", "AUTHOR / EDITOR", "RELEASE DATE", "SUMMARY OF CHANGES", False, True),
    (96, "v1.0.0", "Nguyen Quach Phu Tai (Project Lead)", "2026-10-10", "Initial PRD baseline specification and system architecture definition", False, False),
    (97, "v1.1.0", "Tran Xuan An (QA Engineer)", "2026-10-18", "Added technical constraints and detailed specifications for AUTH, KYC, CAMP, PLEDGE", False, False),
    (98, "v1.2.0", "Bui Dang Quoc Khanh & Nguyen Trung Tien", "2026-10-25", "Integrated VietQR escrow reconciliation rules, /lookup certificates, and ledger statements", False, False),
    (99, "v2.0.0", "Nguyen Quach Phu Tai & Nguyen Khanh Du", "2026-10-30", "Final bilingual synchronization, 10-module alignment, and official audit compliance sign-off", False, False),
    (100, "VISUAL AIDS AND VERIFICATION REFERENCES", "Architecture references: Browser -> Next.js 15 App Router -> Neon PostgreSQL + Cloudinary; Core routes: /gioi-thieu, /projects, /blog, /lookup, /so, Profile Studio; Real test evidence: 128 verified files in evidence/ directory.", None, None, False, False)
]

vi_rows = [
    # (row_idx, col_B, col_C, col_D, col_E, is_sec_hdr, is_tbl_hdr)
    (1, "YÊU CẦU SẢN PHẨM", None, None, None, True, False),
    (2, "TÊN SẢN PHẨM", "Tử Tế Fund — Nền tảng gây quỹ cộng đồng", None, None, False, False),
    (3, "TÁC GIẢ", "Nguyễn Quách Phú Tài (Trưởng nhóm / Lập trình viên)", None, None, False, False),
    (4, "ĐIỆN THOẠI", "0932299701", None, None, False, False),
    (5, "E-MAIL", "nguyenquachphutai@gmail.com", None, None, False, False),
    (6, "ĐỊA CHỈ", "Khoa CNTT, Trường Đại học Lạc Hồng, Biên Hòa, Đồng Nai, Việt Nam", None, None, False, False),
    (7, "NGÀY", "30/10/2026", None, None, False, False),
    (8, "TỔNG QUAN", None, None, None, True, False),
    (9, "Tử Tế Fund là nền tảng gây quỹ cộng đồng minh bạch dành cho các dự án xã hội, thiện nguyện và sáng tạo tại Việt Nam. Hệ thống cung cấp giải pháp gây quỹ toàn diện thông qua tài khoản giữ hộ ký quỹ (Escrow), thanh toán chuyển khoản VietQR, cấp chứng nhận đóng góp điện tử công khai (/lookup), sao kê sổ quỹ minh bạch (/so), cập nhật tiến độ, trao tặng quà tri ân và kênh tương tác trực tiếp. Kiến trúc kỹ thuật: Next.js 15 (App Router), React 19, Neon PostgreSQL quản trị qua Prisma ORM, NextAuth v5 beta phân quyền RBAC, Cloudinary lưu trữ ảnh và Tailwind CSS. Web Demo: https://test-gamma-azure-65.vercel.app", None, None, None, False, False),
    (10, "MỤC TIÊU SẢN PHẨM", None, None, None, True, False),
    (11, "Xác định các mục tiêu cốt lõi và chiến lược kỹ thuật mà hệ thống hướng tới trên 10 phân hệ chức năng.", None, None, None, False, False),
    (12, "MỤC TIÊU 1: Gây quỹ cộng đồng minh bạch", "Cung cấp nền tảng gây quỹ rõ ràng với mục tiêu tài chính, tiến độ thực tế, thời hạn dự án và chu trình vòng đời DRAFT -> PENDING_REVIEW -> ACTIVE.", None, None, False, False),
    (13, "MỤC TIÊU 2: Trung tâm quản lý dự án cho Creator", "Trang bị cho chủ dự án không gian quản trị tích hợp liên kết giữa chiến dịch, danh mục phần quà/sản phẩm, nhật ký blog và Profile Studio công khai.", None, None, False, False),
    (14, "MỤC TIÊU 3: Kết hợp ủng hộ, ký quỹ và kho đồ số", "Kết hợp đóng góp thiện nguyện với tri ân sản phẩm; xử lý thanh toán VietQR giữ hộ an toàn; tự động mở khóa kho đồ số (/purchases) và hóa đơn VAT khi thành công.", None, None, False, False),
    (15, "MỤC TIÊU 4: Giữ chân và tương tác cộng đồng", "Gắn kết cộng đồng qua trình soạn thảo tin tức TipTap, bình luận phản hồi lồng nhau, theo dõi/lưu bài và kênh nhắn tin 1-1 / đàm thoại WebRTC.", None, None, False, False),
    (16, "MỤC TIÊU 5: Quản trị, định danh KYC và bảo mật", "Bảo vệ hệ thống qua xác thực phiên NextAuth, thẩm định hồ sơ CCCD 2 mặt thủ công, bộ lọc từ khóa phản cảm và nhật ký kiểm toán audit logs.", None, None, False, False),
    (17, "XÁC ĐỊNH CÁC BÊN LIÊN QUAN", None, None, None, True, False),
    (18, "Liệt kê và mô tả các bên liên quan, vai trò, trách nhiệm và quyền lợi kỳ vọng đối với sản phẩm.", None, None, None, False, False),
    (19, "TÊN ĐỐI TƯỢNG", "VAI TRÒ NGƯỜI DÙNG", "TRÁCH NHIỆM CHÍNH", "LỢI ÍCH & QUYỀN LỢI", False, True),
    (20, "Nguyễn Quách Phú Tài", "Sinh viên / Trưởng nhóm / QA Lead", "Thu thập yêu cầu, thiết kế 42 TRs và 104 TCs, điều phối kiểm thử, triển khai bản demo", "Hoàn thành đồ án học phần kiểm thử phần mềm đạt chuẩn nghiệm thu xuất sắc", False, False),
    (21, "Chủ dự án (Creator)", "Người dùng bên cung", "Nộp hồ sơ KYC thủ công, tạo chiến dịch, cấu hình gói quà tặng, đăng bài cập nhật", "Huy động nguồn vốn VNĐ tin cậy với danh tính định danh và đối soát ký quỹ rõ ràng", False, False),
    (22, "Người ủng hộ (Backer)", "Người dùng bên cầu", "Khám phá dự án, đóng góp qua VietQR, nhận chứng nhận vinh danh, theo dõi sổ quỹ", "Ủng hộ dự án yêu thích qua kênh thanh toán quen thuộc và chứng từ tra cứu minh bạch", False, False),
    (23, "Quản trị viên (Admin)", "Vận hành và kiểm duyệt", "Duyệt chiến dịch, thẩm định KYC thủ công, quản lý từ cấm, đối soát sao kê tài chính", "Ngăn chặn gian lận, bảo đảm tuân thủ quy chế vận hành và an toàn cho cộng đồng", False, False),
    (24, "Đội ngũ Kiểm thử (QA)", "Kỹ sư đảm bảo chất lượng", "Thực thi kiểm thử 3 làn, đối soát 10 phân hệ, lập 26 phiếu báo lỗi kèm bằng chứng thật", "Đảm bảo tính ổn định cao, xác minh 76 PASS / 28 FAIL / 0 Chưa chạy trên hệ thống", False, False),
    (25, "Nhà cung cấp hạ tầng", "Đối tác dịch vụ đám mây", "Cung cấp hosting Vercel Serverless, cơ sở dữ liệu Neon PostgreSQL, lưu trữ Cloudinary", "Hệ thống vận hành liên tục 99.9%, độ trễ API thấp và dữ liệu an toàn", False, False),
    (26, "YÊU CẦU CHỨC NĂNG", None, None, None, True, False),
    (27, "Đặc tả chức năng chi tiết của 10 phân hệ nghiệp vụ suy diễn trực tiếp từ mã nguồn và API hệ thống.", None, None, None, False, False),
    (28, "PHÂN HỆ 01: AUTH (Xác thực & Phân quyền)", "Đăng nhập NextAuth Credentials, đăng ký tài khoản mật khẩu >= 6 ký tự, token reset mật khẩu SHA-256 hiệu lực 30 phút, phân quyền RBAC (ADMIN, CREATOR, BACKER).", None, None, False, False),
    (29, "PHÂN HỆ 02: KYC (Định danh tài khoản thủ công)", "Nộp ảnh CCCD 2 mặt (12 chữ số) hoặc Mã số thuế; quy trình duyệt thủ công bởi Admin (NOT_SUBMITTED -> PENDING -> VERIFIED / REJECTED); tự động nâng quyền CREATOR.", None, None, False, False),
    (30, "PHÂN HỆ 03: CAMP (Quản lý vòng đời chiến dịch)", "Vòng đời chiến dịch (DRAFT -> PENDING_REVIEW -> ACTIVE -> FINISHED/CANCELLED); kiểm tra ngày kết thúc tương lai và mục tiêu > 0 VNĐ; lọc từ khóa cấm.", None, None, False, False),
    (31, "PHÂN HỆ 04: REWARD (Gói phần thưởng & Quà tặng số)", "Thiết lập các mức quà tặng với mức ủng hộ minAmount > 0, giới hạn số suất tồn kho, địa chỉ giao vận, và kho đồ tải tệp số điện tử.", None, None, False, False),
    (32, "PHÂN HỆ 05: PLEDGE (Ủng hộ gây quỹ & Ký quỹ VietQR)", "Tạo mã chuyển khoản VietQR kèm nội dung giao dịch duy nhất, ký quỹ ngân hàng trung gian; cổng MoMo/VNPay trả HTTP 410; chuyển trạng thái hoàn tiền REFUNDED.", None, None, False, False),
    (33, "PHÂN HỆ 06: CERT (Chứng nhận điện tử & Sổ cái sao kê)", "Tra cứu chứng nhận đóng góp công khai tại /lookup theo mã chứng từ, phát hành hóa đơn điện tử VAT, và công khai sổ quỹ sao kê tài chính tại /so.", None, None, False, False),
    (34, "PHÂN HỆ 07: COMM (Tương tác cộng đồng & Đánh giá)", "Gửi phản hồi góp ý (/gop-y) độ dài 10-2000 ký tự, chặn spam HTTP 429 rate limit, đánh giá sao chỉ dành riêng cho backer đã đóng góp, đăng tin cập nhật.", None, None, False, False),
    (35, "PHÂN HỆ 08: BLOG (Nhật ký dự án & Soạn thảo tin)", "Soạn thảo bài viết blog TipTap rich-text, tải ảnh bìa, trạng thái xuất bản (DRAFT/PUBLISHED), tương tác theo dõi, thích và lưu bài viết.", None, None, False, False),
    (36, "PHÂN HỆ 09: CHAT (Hội thoại trực tiếp & Đàm thoại P2P)", "Cơ chế nhắn tin thời gian thực ngắn hạn Polling (POLL_MS = 1200ms), quản lý danh sách cuộc trò chuyện, và kênh signaling khởi tạo cuộc gọi WebRTC video.", None, None, False, False),
    (37, "PHÂN HỆ 10: ADMIN (Bảng điều khiển quản trị & Kiểm soát)", "Bảng điều khiển trung tâm Admin, khóa tài khoản vi phạm (BANNED), phê duyệt chiến dịch, kiểm duyệt từ khóa nhạy cảm, và báo cáo doanh thu tài chính.", None, None, False, False),
    (38, "YÊU CẦU PHI CHỨC NĂNG", None, None, None, True, False),
    (39, "Các tiêu chuẩn kỹ thuật, chỉ tiêu hiệu năng, cơ chế bảo mật và ràng buộc vận hành hệ thống.", None, None, None, False, False),
    (40, "NFR-01: Bảo mật và Phân quyền theo phiên", "Phân quyền chặt chẽ theo phiên JWT máy chủ; băm mật khẩu Bcrypt salt 10; làm sạch mã HTML chống tấn công XSS; tuyệt đối không lưu số thẻ ngân hàng đầy đủ.", None, None, False, False),
    (41, "NFR-02: Chỉ tiêu Hiệu năng và Độ trễ phản hồi", "Tốc độ đọc dữ liệu công khai p95 < 500ms; giao dịch CRUD có xác thực p95 < 800ms; chỉ số tải trang trực quan LCP < 2.5s trên đường truyền tiêu chuẩn.", None, None, False, False),
    (42, "NFR-03: Vận hành hạ tầng Đám mây Serverless", "Triển khai trên nền tảng Vercel Serverless với quy trình CI/CD tự động chạy prisma generate và migrate deploy; độ sẵn sàng đạt 99.9%.", None, None, False, False),
    (43, "NFR-04: Toàn vẹn Cơ sở dữ liệu và Schema", "Hệ quản trị Neon PostgreSQL Serverless kết hợp Prisma ORM (45 database models, 26 enums) bảo đảm khóa ngoại, tính duy nhất và rollback giao dịch.", None, None, False, False),
    (44, "NFR-05: Trải nghiệm người dùng và Responsive", "Giao diện thích ứng linh hoạt từ thiết bị di động (390x844 iPhone 14) đến máy tính để bàn (1920x1080); sử dụng Tailwind CSS và hiệu ứng mượt mà.", None, None, False, False),
    (45, "NFR-06: Khả năng mở rộng và Gom kết nối", "Tối ưu hóa bộ gom kết nối (connection pooling) của Neon và Prisma Client bảo đảm phục vụ đồng thời nhiều người dùng không gây nghẽn kết nối.", None, None, False, False),
    (46, "NFR-07: Nhật ký Kiểm toán và Truy vết", "Ghi nhật ký kiểm toán (audit_logs) toàn bộ thao tác quản trị tài chính, duyệt KYC, duyệt chiến dịch và khóa tài khoản kèm dấu thời gian và ID thao tác.", None, None, False, False),
    (47, "NFR-08: Chuẩn hóa Định dạng Chứng từ", "Hóa đơn VAT và giấy chứng nhận đóng góp được chuẩn hóa layout khổ giấy A4 in ấn điện tử, nhúng mã QR xác thực tra cứu tức thì.", None, None, False, False),
    (48, "GIẢ ĐỊNH VÀ RÀNG BUỘC", None, None, None, True, False),
    (49, "Các giả định được thiết lập trong quá trình thu thập yêu cầu và ràng buộc chi phối quá trình phát triển.", None, None, None, False, False),
    (50, "GIẢ ĐỊNH KỸ THUẬT", None, None, None, True, False),
    (51, "Giả định 1: Đối tượng người dùng và Đơn vị tiền tệ", "Người dùng chính tại Việt Nam, đóng góp bằng đồng tiền VNĐ thông qua chuyển khoản ngân hàng VietQR nội địa thay vì ví ngoại tệ.", None, None, False, False),
    (52, "Giả định 2: Môi trường Đám mây hiện có", "Hạ tầng đám mây được quản trị (Vercel Serverless, Neon PostgreSQL, Cloudinary) đáp ứng đầy đủ yêu cầu cho môi trường demo và kiểm thử.", None, None, False, False),
    (53, "Giả định 3: Điều kiện tiên quyết của Creator", "Chủ dự án phải hoàn thiện hồ sơ cá nhân và được phê duyệt KYC thủ công trước khi tạo chiến dịch; Admin giữ quyền phê duyệt cuối cùng.", None, None, False, False),
    (54, "Giả định 4: Tiêu chuẩn Nghiệm thu theo Phân hệ", "Chất lượng phần mềm được đánh giá và nghiệm thu độc lập theo từng phân hệ (10 phân hệ, 42 TRs, 104 TCs) với bằng chứng thực tế khách quan.", None, None, False, False),
    (55, "RÀNG BUỘC PHÁT TRIỂN", None, None, None, True, False),
    (56, "Ràng buộc 1: Giới hạn Nguồn lực phát triển", "Nguồn lực kỹ thuật tập trung vào các phân hệ gây quỹ và tạo dựng niềm tin cốt lõi (AUTH, KYC, CAMP, PLEDGE, CERT) trước các tính năng phụ.", None, None, False, False),
    (57, "Ràng buộc 2: Phạm vi Pháp lý và Mô hình", "Sản phẩm định vị là nền tảng công nghệ kết nối gây quỹ và catalog quà tặng, không hoạt động như trung gian thanh toán hay sàn tài chính.", None, None, False, False),
    (58, "Ràng buộc 3: Bảo mật Thông tin Môi trường", "Bộ hồ sơ báo cáo không đính kèm tệp cấu hình bảo mật production (.env); môi trường kiểm thử vận hành trên bản demo với dữ liệu mẫu chuẩn.", None, None, False, False),
    (59, "Ràng buộc 4: Ranh giới Môi trường Kiểm thử", "Kiểm thử thực thi trên hệ thống Vercel và Neon live; các tính năng bên thứ ba chưa gắn khóa cấu hình production (Google OAuth) được ghi nhận FAIL.", None, None, False, False),
    (60, "PHỤ THUỘC KỸ THUẬT", None, None, None, True, False),
    (61, "Các thành phần kỹ thuật bên ngoài và dịch vụ đám mây tích hợp trong hệ thống.", None, None, None, False, False),
    (62, "PHỤ THUỘC 1: Neon PostgreSQL & Prisma ORM", "Cơ sở dữ liệu quan hệ lưu trữ thông tin tài khoản, hồ sơ KYC, chiến dịch, gói quà tặng, đơn ủng hộ và sổ cái tài chính.", None, None, False, False),
    (63, "PHỤ THUỘC 2: NextAuth v5 Beta & Phiên JWT", "Giải pháp quản lý xác thực phiên đăng nhập Credentials, mã hóa bcrypt và phân quyền truy cập thông qua Edge Middleware.", None, None, False, False),
    (64, "PHỤ THUỘC 3: Dịch vụ Lưu trữ Đám mây Cloudinary", "Mạng lưu trữ đa phương tiện phục vụ tải ảnh đại diện người dùng, banner chiến dịch, ảnh quà tặng và hồ sơ định danh CCCD.", None, None, False, False),
    (65, "PHỤ THUỘC 4: Cổng Ký quỹ Ngân hàng & VietQR", "Chuẩn định dạng chuyển khoản VietQR NAPAS và tài khoản ngân hàng trung gian phục vụ giữ hộ và đối soát dòng tiền ủng hộ.", None, None, False, False),
    (66, "PHỤ THUỘC 5: Nền tảng Vercel Cloud Serverless", "Máy chủ triển khai đám mây vận hành ứng dụng Next.js 15, tích hợp pipeline tự động build và triển khai phiên bản mới.", None, None, False, False),
    (67, "TIÊU CHÍ CHẤP NHẬN", None, None, None, True, False),
    (68, "Điều kiện bắt buộc cần thỏa mãn để từng phân hệ được nghiệm thu đạt yêu cầu chất lượng.", None, None, None, False, False),
    (69, "TIÊU CHÍ 01: Nghiệm thu Xác thực & Phân quyền", "Đăng ký, đăng nhập và reset mật khẩu hoạt động ổn định; tài khoản BANNED bị chặn vào API bảo vệ; mật khẩu mã hóa bcrypt an toàn.", None, None, False, False),
    (70, "TIÊU CHÍ 02: Nghiệm thu Định danh KYC", "Hồ sơ thiếu ảnh CCCD bị từ chối ngay từ form; Admin xem xét duyệt hoặc từ chối thủ công; ảnh giấy tờ cá nhân tuyệt đối bảo mật.", None, None, False, False),
    (71, "TIÊU CHÍ 03: Nghiệm thu Vòng đời Chiến dịch", "Tìm kiếm và lọc chiến dịch công khai chuẩn xác; chủ dự án lưu bản nháp; chỉ chiến dịch ACTIVE trong thời hạn mới nhận ủng hộ.", None, None, False, False),
    (72, "TIÊU CHÍ 04: Nghiệm thu Ủng hộ & Ký quỹ VietQR", "Mã VietQR sinh kèm nội dung chuyển khoản chuẩn xác; đơn chuyển trạng thái SUCCESS khi đối soát; tự động mở khóa kho đồ số.", None, None, False, False),
    (73, "TIÊU CHÍ 05: Nghiệm thu Tra cứu Chứng từ & Sổ quỹ", "Nhập mã chứng thư hợp lệ hiển thị giấy chứng nhận điện tử tại /lookup; bảng sao kê dòng tiền tại /so khớp hoàn toàn số liệu hệ thống.", None, None, False, False),
    (74, "PHÂN TÍCH RỦI RO VÀ GIẢM THIỂU", None, None, None, True, False),
    (75, "Đánh giá các rủi ro kỹ thuật, nghiệp vụ tiềm ẩn và kế hoạch đối phó giảm thiểu tương ứng.", None, None, None, False, False),
    (76, "RỦI RO KỸ THUẬT / NGHIỆP VỤ", "MỨC ĐỘ", "CHIẾN LƯỢC ĐỐI PHÓ GIẢM THIỂU", None, False, True),
    (77, "Chiến dịch chưa ACTIVE vẫn nhận ủng hộ", "Mức độ Cao", "Ràng buộc kiểm tra nghiêm ngặt từ chối tạo đơn ủng hộ nếu chiến dịch không ở trạng thái ACTIVE hoặc ngoài thời hạn gây quỹ.", None, False, False),
    (78, "Hồ sơ KYC giả mạo hoặc giấy tờ mờ", "Mức độ Nghiêm trọng", "Bắt buộc tải ảnh CCCD 2 mặt rõ nét; Admin thẩm định thủ công bằng mắt; hồ sơ bị từ chối tuyệt đối không được tạo chiến dịch.", None, False, False),
    (79, "Nhiều người ủng hộ cùng lúc làm âm suất quà", "Mức độ Cao", "Áp dụng kỹ thuật giảm tồn kho nguyên tử (atomic decrement) và khóa dữ liệu lạc quan ngăn chặn số lượng phần thưởng bị âm.", None, False, False),
    (80, "Tấn công XSS qua trình soạn thảo tin tức", "Mức độ Cao", "Làm sạch (sanitize) toàn bộ nội dung HTML TipTap trước khi lưu trữ; giới hạn định dạng MIME và kích thước tệp tải lên.", None, False, False),
    (81, "Nghẽn kết nối cơ sở dữ liệu Serverless", "Mức độ Trung bình", "Cấu hình bộ gom kết nối Neon connection pooling và giới hạn kết nối của Prisma Client ngăn chặn quá tải đường truyền.", None, False, False),
    (82, "Lộ thông tin cấu hình bí mật ra kho công khai", "Mức độ Nghiêm trọng", "Chỉ cấu hình biến môi trường trên Vercel dashboard; tuyệt đối loại trừ tệp .env khỏi Git và chỉ cung cấp bản kiểm thử an toàn.", None, False, False),
    (83, "MỨC ĐỘ ƯU TIÊN VÀ PHÂN BỔ NỖ LỰC", None, None, None, True, False),
    (84, "Phân định mức độ ưu tiên và ước tính khối lượng thời gian kiểm thử cho từng phân hệ nghiệp vụ.", None, None, None, False, False),
    (85, "PHÂN HỆ / MIỀN CHỨC NĂNG", "MỨC ĐỘ ƯU TIÊN", "NỖ LỰC DỰ KIẾN (GIỜ)", "PHẠM VI ĐẦU RA", False, True),
    (86, "Phân hệ AUTH (Đăng ký, phiên đăng nhập, RBAC)", "Ưu tiên Cao", "18 Giờ", "12 Kịch bản kiểm thử (10 PASS / 2 FAIL)", False, False),
    (87, "Phân hệ KYC (Tải ảnh CCCD, Admin phê duyệt)", "Ưu tiên Cao", "16 Giờ", "11 Kịch bản kiểm thử (10 PASS / 1 FAIL)", False, False),
    (88, "Phân hệ CAMP (Vòng đời, biên tập rich-text)", "Ưu tiên Cao", "24 Giờ", "15 Kịch bản kiểm thử (13 PASS / 2 FAIL)", False, False),
    (89, "Phân hệ REWARD & PLEDGE (Gói quà, VietQR ký quỹ)", "Ưu tiên Cao", "24 Giờ", "18 Kịch bản kiểm thử (13 PASS / 5 FAIL)", False, False),
    (90, "Phân hệ CERT & SỔ CÁI (Lookup, hóa đơn, sao kê)", "Ưu tiên Cao", "14 Giờ", "10 Kịch bản kiểm thử (6 PASS / 4 FAIL)", False, False),
    (91, "Phân hệ COMM & BLOG (Góp ý, bình luận, tin tức)", "Ưu tiên Trung bình", "12 Giờ", "23 Kịch bản kiểm thử (15 PASS / 8 FAIL)", False, False),
    (92, "Phân hệ CHAT & ADMIN (Hội thoại P2P, quản trị)", "Ưu tiên Trung bình", "16 Giờ", "15 Kịch bản kiểm thử (9 PASS / 6 FAIL)", False, False),
    (93, "LỊCH SỬ PHIÊN BẢN VÀ NHẬT KÝ THAY ĐỔI", None, None, None, True, False),
    (94, "Hồ sơ kiểm toán theo dõi các đợt phát hành, cập nhật tài liệu và mốc nghiệm thu kỹ thuật.", None, None, None, False, False),
    (95, "PHIÊN BẢN TÀI LIỆU", "NGƯỜI BIÊN SOẠN", "NGÀY PHÁT HÀNH", "NỘI DUNG SỬA ĐỔI CHÍNH", False, True),
    (96, "v1.0.0", "Nguyễn Quách Phú Tài (Trưởng nhóm)", "10/10/2026", "Khởi tạo đặc tả yêu cầu sản phẩm ban đầu và thiết kế kiến trúc hệ thống", False, False),
    (97, "v1.1.0", "Trần Xuân Ân (Kỹ sư QA)", "18/10/2026", "Bổ sung ràng buộc kỹ thuật và đặc tả chi tiết cho AUTH, KYC, CAMP, PLEDGE", False, False),
    (98, "v1.2.0", "Bùi Đặng Quốc Khánh & Nguyễn Trung Tiến", "25/10/2026", "Tích hợp quy tắc đối soát VietQR, chứng nhận tra cứu /lookup và sao kê sổ quỹ", False, False),
    (99, "v2.0.0", "Nguyễn Quách Phú Tài & Nguyễn Khánh Du", "30/10/2026", "Đồng bộ song ngữ Anh-Việt hoàn chỉnh, chuẩn hóa 10 phân hệ và ký duyệt kiểm toán", False, False),
    (100, "THAM CHIẾU HỖ TRỢ THỊ GIÁC", "Tham chiếu kiến trúc: Trình duyệt -> Next.js 15 App Router -> Neon PostgreSQL + Cloudinary; Màn hình cốt lõi: /gioi-thieu, /projects, /blog, /lookup, /so, Profile Studio; Bằng chứng kiểm thử: 128 tệp xác thực tại thư mục evidence/.", None, None, False, False)
]

def build_sheet(ws, rows_data):
    ws.column_dimensions['A'].width = 4
    ws.column_dimensions['B'].width = 36
    ws.column_dimensions['C'].width = 48
    ws.column_dimensions['D'].width = 36
    ws.column_dimensions['E'].width = 40

    for item in rows_data:
        r_idx = item[0]
        b_val = item[1]
        c_val = item[2]
        d_val = item[3]
        e_val = item[4]
        is_sec = item[5]
        is_tbl = item[6]

        cell_b = ws.cell(row=r_idx, column=2, value=b_val)
        cell_c = ws.cell(row=r_idx, column=3, value=c_val)
        cell_d = ws.cell(row=r_idx, column=4, value=d_val)
        cell_e = ws.cell(row=r_idx, column=5, value=e_val)

        ws.row_dimensions[r_idx].height = 24 if is_sec or is_tbl else (36 if (c_val and len(str(c_val)) > 80) else 20)

        for col_idx, cell in enumerate([cell_b, cell_c, cell_d, cell_e], start=2):
            cell.border = border_cell
            if is_sec:
                cell.font = font_sec_hdr
                cell.fill = fill_sec_hdr
                cell.alignment = align_left
            elif is_tbl:
                cell.font = font_tbl_hdr
                cell.fill = fill_tbl_hdr
                cell.alignment = align_center
            elif col_idx == 2 and not c_val and not is_sec:
                cell.font = font_desc
                cell.alignment = align_left
            elif col_idx == 2 and c_val:
                cell.font = font_bold
                cell.alignment = align_left
            else:
                cell.font = font_normal
                cell.alignment = align_left

# Build Sheet 1: Product Requirements
ws_en = wb.create_sheet(title='Product Requirements')
build_sheet(ws_en, en_rows)

# Build Sheet 2: Vi_Product Requirements
ws_vi = wb.create_sheet(title='Vi_Product Requirements')
build_sheet(ws_vi, vi_rows)

target_path = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.xlsx'
wb.save(target_path)
print(f"Saved {target_path} successfully!")
print(f"EN rows: {len(en_rows)}, VI rows: {len(vi_rows)}")
