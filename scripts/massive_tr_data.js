/**
 * Massive TR Dataset covering all 10 modules in TuTeFund platform
 * Total: 80 TRs covering Functional, Boundary, Negative / Security, Look & Feel
 */

const MASSIVE_TR_LIST = [
  // ── 1. LOGIN / AUTH (9 TRs) ─────────────────────────────────────────────────
  { id: 'TR-AUTH-001', module: 'LOGIN', moduleName: 'LOGIN / AUTH', title: 'Đăng nhập mật khẩu thành công & Phân luồng điều hướng theo vai trò (RBAC)', type: 'Functional', priority: 'High' },
  { id: 'TR-AUTH-002', module: 'LOGIN', moduleName: 'LOGIN / AUTH', title: 'Đăng nhập liên kết tài khoản Google OAuth', type: 'Functional', priority: 'High' },
  { id: 'TR-AUTH-003', module: 'LOGIN', moduleName: 'LOGIN / AUTH', title: 'Đăng ký tài khoản người dùng mới và xác thực định dạng email', type: 'Functional', priority: 'High' },
  { id: 'TR-AUTH-004', module: 'LOGIN', moduleName: 'LOGIN / AUTH', title: 'Quên mật khẩu và Đặt lại mật khẩu qua Email Token/OTP', type: 'Functional', priority: 'Medium' },
  { id: 'TR-AUTH-005', module: 'LOGIN', moduleName: 'LOGIN / AUTH', title: 'Thay đổi mật khẩu trong trang cài đặt bảo mật cá nhân (/profile)', type: 'Functional', priority: 'Medium' },
  { id: 'TR-AUTH-006', module: 'LOGIN', moduleName: 'LOGIN / AUTH', title: 'Kiểm tra độ dài ký tự mật khẩu và họ tên tại các giá trị biên (Boundary)', type: 'Boundary', priority: 'Medium' },
  { id: 'TR-AUTH-007', module: 'LOGIN', moduleName: 'LOGIN / AUTH', title: 'Xử lý đăng nhập sai mật khẩu liên tiếp và cơ chế chống Brute-Force (Rate Limiting)', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-AUTH-008', module: 'LOGIN', moduleName: 'LOGIN / AUTH', title: 'Chặn quyền truy cập đối với tài khoản bị khóa vi phạm (BANNED User)', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-AUTH-009', module: 'LOGIN', moduleName: 'LOGIN / AUTH', title: 'Kiểm tra giao diện Form Đăng nhập/Đăng ký UI/UX Responsive và tương thích Chrome', type: 'Look & Feel', priority: 'Low' },

  // ── 2. CAMP (QUẢN LÝ DỰ ÁN & CHIẾN DỊCH GÂY QUỸ) (10 TRs) ───────────────────
  { id: 'TR-CAMP-001', module: 'CAMP', moduleName: 'CAMP', title: 'Khởi tạo chiến dịch gây quỹ mới và lưu bản nháp (DRAFT)', type: 'Functional', priority: 'High' },
  { id: 'TR-CAMP-002', module: 'CAMP', moduleName: 'CAMP', title: 'Gửi yêu cầu phê duyệt chiến dịch (DRAFT -> PENDING_REVIEW)', type: 'Functional', priority: 'High' },
  { id: 'TR-CAMP-003', module: 'CAMP', moduleName: 'CAMP', title: 'Admin thẩm định: Phê duyệt (ACTIVE) hoặc Từ chối kèm lý do', type: 'Functional', priority: 'High' },
  { id: 'TR-CAMP-004', module: 'CAMP', moduleName: 'CAMP', title: 'Kiểm soát vòng đời chiến dịch khi hết hạn thời gian (ACTIVE -> ENDED)', type: 'Functional', priority: 'High' },
  { id: 'TR-CAMP-005', module: 'CAMP', moduleName: 'CAMP', title: 'Creator đăng bài cập nhật tiến độ (Progress Updates) cho người ủng hộ', type: 'Functional', priority: 'High' },
  { id: 'TR-CAMP-006', module: 'CAMP', moduleName: 'CAMP', title: 'Người dùng theo dõi chiến dịch (Follow/Unfollow) và nhận thông báo biến động', type: 'Functional', priority: 'Medium' },
  { id: 'TR-CAMP-007', module: 'CAMP', moduleName: 'CAMP', title: 'Kiểm tra giá trị biên số tiền mục tiêu (Min 500k, Max 10 tỷ) và thời hạn (7 - 60 ngày)', type: 'Boundary', priority: 'Medium' },
  { id: 'TR-CAMP-008', module: 'CAMP', moduleName: 'CAMP', title: 'Chặn Creator chưa hoàn tất xác thực KYC nộp hồ sơ duyệt chiến dịch', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-CAMP-009', module: 'CAMP', moduleName: 'CAMP', title: 'Chống tấn công Stored XSS trong nội dung mô tả chi tiết chiến dịch', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-CAMP-010', module: 'CAMP', moduleName: 'CAMP', title: 'Kiểm tra hiển thị giao diện chi tiết chiến dịch, thanh tiến trình & Đếm ngược ngày', type: 'Look & Feel', priority: 'Low' },

  // ── 3. REWARD / CHECKOUT (GÓI PHẦN THƯỞNG & ĐẶT HÀNG) (9 TRs) ───────────────
  { id: 'TR-REWARD-001', module: 'REWARD', moduleName: 'REWARD / CHECKOUT', title: 'Tạo gói phần thưởng có sẵn (Available) hoặc Đặt trước (Pre-order)', type: 'Functional', priority: 'High' },
  { id: 'TR-REWARD-002', module: 'REWARD', moduleName: 'REWARD / CHECKOUT', title: 'Quy trình chọn quà, nhập thông tin giao nhận và xác nhận đặt đơn (Checkout Flow)', type: 'Functional', priority: 'High' },
  { id: 'TR-REWARD-003', module: 'REWARD', moduleName: 'REWARD / CHECKOUT', title: 'Tích hợp thanh toán chuyển khoản trung gian VietQR Escrow giữ hộ', type: 'Functional', priority: 'High' },
  { id: 'TR-REWARD-004', module: 'REWARD', moduleName: 'REWARD / CHECKOUT', title: 'Lưu trữ và hiển thị lịch sử đơn đã ủng hộ trong Kho đồ số cá nhân (/purchases)', type: 'Functional', priority: 'High' },
  { id: 'TR-REWARD-005', module: 'REWARD', moduleName: 'REWARD / CHECKOUT', title: 'Đánh giá xếp hạng sao và gửi nhận xét chất lượng phần thưởng sau khi nhận hàng', type: 'Functional', priority: 'Medium' },
  { id: 'TR-REWARD-006', module: 'REWARD', moduleName: 'REWARD / CHECKOUT', title: 'Giới hạn đa phương tiện: Tối đa 10 ảnh và 1 video cho một gói phần thưởng (Boundary)', type: 'Boundary', priority: 'Medium' },
  { id: 'TR-REWARD-007', module: 'REWARD', moduleName: 'REWARD / CHECKOUT', title: 'Kiểm tra ràng buộc tồn kho số lượng suất quà còn lại (Boundary Stock: 0, 1, max)', type: 'Boundary', priority: 'Medium' },
  { id: 'TR-REWARD-008', module: 'REWARD', moduleName: 'REWARD / CHECKOUT', title: 'Xử lý đồng thời ngăn chặn mua vượt tồn kho (Overselling Concurrency Lock)', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-REWARD-009', module: 'REWARD', moduleName: 'REWARD / CHECKOUT', title: 'Kiểm tra giao diện Thẻ phần thưởng, trạng thái nút bấm và mã VietQR trên Mobile', type: 'Look & Feel', priority: 'Low' },

  // ── 4. BLOG / COMMUNITY (TIN TỨC & TƯƠNG TÁC CỘNG ĐỒNG) (9 TRs) ─────────────
  { id: 'TR-BLOG-001', module: 'BLOG', moduleName: 'BLOG / COMMUNITY', title: 'Soạn thảo và đăng bài viết blog mới bằng trình soạn thảo TipTap Rich-Text', type: 'Functional', priority: 'High' },
  { id: 'TR-BLOG-002', module: 'BLOG', moduleName: 'BLOG / COMMUNITY', title: 'Kiểm soát trạng thái bài viết: Lưu nháp (DRAFT) và Xuất bản công khai (PUBLISHED)', type: 'Functional', priority: 'High' },
  { id: 'TR-BLOG-003', module: 'BLOG', moduleName: 'BLOG / COMMUNITY', title: 'Bộ lọc tìm kiếm bài viết theo từ khóa tiêu đề và phân loại danh mục (Categories)', type: 'Functional', priority: 'High' },
  { id: 'TR-BLOG-004', module: 'BLOG', moduleName: 'BLOG / COMMUNITY', title: 'Gửi bình luận trao đổi và phản hồi bình luận lồng nhau dưới bài viết blog', type: 'Functional', priority: 'Medium' },
  { id: 'TR-BLOG-005', module: 'BLOG', moduleName: 'BLOG / COMMUNITY', title: 'Lưu bài viết yêu thích (Bookmarks) và thả tim thích bài viết (Like)', type: 'Functional', priority: 'Medium' },
  { id: 'TR-BLOG-006', module: 'BLOG', moduleName: 'BLOG / COMMUNITY', title: 'Kiểm tra giới hạn ký tự bài viết và dung lượng ảnh tải lên (Boundary)', type: 'Boundary', priority: 'Medium' },
  { id: 'TR-BLOG-007', module: 'BLOG', moduleName: 'BLOG / COMMUNITY', title: 'Làm sạch mã HTML chống tấn công Stored XSS trong trình soạn thảo TipTap', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-BLOG-008', module: 'BLOG', moduleName: 'BLOG / COMMUNITY', title: 'Ẩn tuyệt đối các bài viết trạng thái DRAFT đối với người dùng vãng lai (Guest/Backer)', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-BLOG-009', module: 'BLOG', moduleName: 'BLOG / COMMUNITY', title: 'Kiểm tra giao diện bài viết chuẩn Typography, ảnh đại diện Thumbnail và Responsive', type: 'Look & Feel', priority: 'Low' },

  // ── 5. KYC (XÁC THỰC DANH TÍNH THỦ CÔNG) (8 TRs) ────────────────────────────
  { id: 'TR-KYC-001', module: 'KYC', moduleName: 'KYC', title: 'Nộp hồ sơ định danh KYC: Ảnh CCCD 2 mặt và Video xác thực chân dung 5 giây', type: 'Functional', priority: 'High' },
  { id: 'TR-KYC-002', module: 'KYC', moduleName: 'KYC', title: 'Admin thẩm định hồ sơ KYC: Phê duyệt (VERIFIED) hoặc Từ chối (REJECTED) kèm lý do', type: 'Functional', priority: 'High' },
  { id: 'TR-KYC-003', module: 'KYC', moduleName: 'KYC', title: 'Tự động mở khóa quyền năng phát động dự án (CREATOR) ngay sau khi duyệt KYC', type: 'Functional', priority: 'High' },
  { id: 'TR-KYC-004', module: 'KYC', moduleName: 'KYC', title: 'Kiểm tra ràng buộc dung lượng tệp tải lên (Ảnh CCCD max 5MB, Video chân dung max 20MB)', type: 'Boundary', priority: 'Medium' },
  { id: 'TR-KYC-005', module: 'KYC', moduleName: 'KYC', title: 'Ràng buộc số ký tự CCCD chính xác 12 chữ số và định dạng tệp tin hợp lệ', type: 'Boundary', priority: 'Medium' },
  { id: 'TR-KYC-006', module: 'KYC', moduleName: 'KYC', title: 'Chặn tải lên tệp tin thực thi độc hại giả mạo đuôi ảnh (.exe, .php, .sh)', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-KYC-007', module: 'KYC', moduleName: 'KYC', title: 'Bảo mật quyền riêng tư: Chặn truy cập công khai vào URL ảnh CCCD của người dùng', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-KYC-008', module: 'KYC', moduleName: 'KYC', title: 'Kiểm tra giao diện tải ảnh Drag & Drop, thanh tiến trình Upload % và xem trước ảnh', type: 'Look & Feel', priority: 'Low' },

  // ── 6. ADMIN CONSOLE (QUẢN TRỊ HỆ THỐNG & BADGES) (8 TRs) ───────────────────
  { id: 'TR-ADMIN-001', module: 'ADMIN', moduleName: 'ADMIN', title: 'Quản lý danh sách người dùng, thay đổi phân quyền và Khóa/Mở khóa tài khoản', type: 'Functional', priority: 'High' },
  { id: 'TR-ADMIN-002', module: 'ADMIN', moduleName: 'ADMIN', title: 'Quản trị và trao tặng Huy hiệu danh hiệu (Badges) cho Creator & Backer tiêu biểu', type: 'Functional', priority: 'Medium' },
  { id: 'TR-ADMIN-003', module: 'ADMIN', moduleName: 'ADMIN', title: 'Cấu hình và cập nhật danh sách Từ khóa cấm / nhạy cảm (Blacklist Keywords)', type: 'Functional', priority: 'Medium' },
  { id: 'TR-ADMIN-004', module: 'ADMIN', moduleName: 'ADMIN', title: 'Thẩm định hồ sơ bằng cấp và giấy phép hoạt động của Creator (Credentials Review)', type: 'Functional', priority: 'High' },
  { id: 'TR-ADMIN-005', module: 'ADMIN', moduleName: 'ADMIN', title: 'Tiếp nhận và xử lý báo cáo vi phạm cộng đồng (Campaign/Blog/Chat Reports)', type: 'Functional', priority: 'High' },
  { id: 'TR-ADMIN-006', module: 'ADMIN', moduleName: 'ADMIN', title: 'Xem biểu đồ phân tích số liệu tài chính và hành vi người dùng (Analytics Dashboard)', type: 'Functional', priority: 'Medium' },
  { id: 'TR-ADMIN-007', module: 'ADMIN', moduleName: 'ADMIN', title: 'Chặn tuyệt đối truy cập trái phép vào trang Quản trị `/dashboard/admin` (Route Protection)', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-ADMIN-008', module: 'ADMIN', moduleName: 'ADMIN', title: 'Kiểm tra giao diện Bảng điều khiển Admin Console, Bộ lọc đa tiêu chí và Modal xác nhận', type: 'Look & Feel', priority: 'Low' },

  // ── 7. CHAT & NOTIFICATION (TƯƠNG TÁC THỜI GIAN THỰC) (7 TRs) ───────────────
  { id: 'TR-CHAT-001', module: 'CHAT', moduleName: 'CHAT / NOTI', title: 'Hội thoại trực tiếp 1-1 giữa Backer và Creator lưu trữ CSDL PostgreSQL Prisma', type: 'Functional', priority: 'High' },
  { id: 'TR-CHAT-002', module: 'CHAT', moduleName: 'CHAT / NOTI', title: 'Gửi tệp hình ảnh đính kèm trong tin nhắn hội thoại 1-1', type: 'Functional', priority: 'High' },
  { id: 'TR-CHAT-003', module: 'CHAT', moduleName: 'CHAT / NOTI', title: 'Thả biểu cảm cảm xúc (Reactions: Like, Tim, Cười) cho từng tin nhắn', type: 'Functional', priority: 'Medium' },
  { id: 'TR-CHAT-004', module: 'CHAT', moduleName: 'CHAT / NOTI', title: 'Hệ thống chuông thông báo thời gian thực khi có sự kiện quan trọng (Notifications)', type: 'Functional', priority: 'High' },
  { id: 'TR-CHAT-005', module: 'CHAT', moduleName: 'CHAT / NOTI', title: 'Giới hạn độ dài tin nhắn văn bản tối đa 2.000 ký tự (Boundary)', type: 'Boundary', priority: 'Medium' },
  { id: 'TR-CHAT-006', module: 'CHAT', moduleName: 'CHAT / NOTI', title: 'Cơ chế Rate Limiting chống spam tin nhắn liên tục trong khung chat', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-CHAT-007', module: 'CHAT', moduleName: 'CHAT / NOTI', title: 'Kiểm tra giao diện Khung chat trực tuyến, bong bóng tin nhắn và tự động cuộn', type: 'Look & Feel', priority: 'Low' },

  // ── 8. INVOICE & LOOKUP (HÓA ĐƠN & MINH BẠCH ĐÓNG GÓP) (7 TRs) ──────────────
  { id: 'TR-INV-001', module: 'INVOICE', moduleName: 'INVOICE & LOOKUP', title: 'Tự động khởi tạo Hóa đơn đóng góp (Backer Invoices) khi thanh toán thành công', type: 'Functional', priority: 'High' },
  { id: 'TR-INV-002', module: 'INVOICE', moduleName: 'INVOICE & LOOKUP', title: 'Cấp Chứng nhận vinh danh đóng góp (Donation Certificate) kèm mã QR tra cứu', type: 'Functional', priority: 'High' },
  { id: 'TR-INV-003', module: 'INVOICE', moduleName: 'INVOICE & LOOKUP', title: 'Tra cứu công khai tính hợp lệ của hóa đơn/chứng nhận tại trang `/lookup` hoặc `/chung-tu`', type: 'Functional', priority: 'High' },
  { id: 'TR-INV-004', module: 'INVOICE', moduleName: 'INVOICE & LOOKUP', title: 'Hỗ trợ tính năng đóng góp tiền tip hằng ngày cho nền tảng (Daily Tip Invoices)', type: 'Functional', priority: 'Medium' },
  { id: 'TR-INV-005', module: 'INVOICE', moduleName: 'INVOICE & LOOKUP', title: 'Xuất tệp chứng từ định dạng PDF sắc nét hỗ trợ in ấn hoặc lưu trữ', type: 'Functional', priority: 'Medium' },
  { id: 'TR-INV-006', module: 'INVOICE', moduleName: 'INVOICE & LOOKUP', title: 'Chặn tra cứu mã chứng từ không hợp lệ hoặc giả mạo số hiệu hóa đơn', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-INV-007', module: 'INVOICE', moduleName: 'INVOICE & LOOKUP', title: 'Kiểm tra giao diện Mẫu hóa đơn và Giấy chứng nhận đóng góp trang trọng, chuẩn in', type: 'Look & Feel', priority: 'Low' },

  // ── 9. PROFILE & FEEDBACK (HỒ SƠ STUDIO & GÓP Ý) (6 TRs) ────────────────────
  { id: 'TR-PROF-001', module: 'PROFILE', moduleName: 'PROFILE & FEEDBACK', title: 'Tùy biến giao diện trang cá nhân Profile Studio (Banner, Màu chủ đạo, Bố cục)', type: 'Functional', priority: 'Medium' },
  { id: 'TR-PROF-002', module: 'PROFILE', moduleName: 'PROFILE & FEEDBACK', title: 'Quản lý lịch sử các phiên bản tùy biến hồ sơ (Profile Customization Versions)', type: 'Functional', priority: 'Low' },
  { id: 'TR-PROF-003', module: 'PROFILE', moduleName: 'PROFILE & FEEDBACK', title: 'Người dùng gửi ý kiến đóng góp / phản hồi cho sàn tại trang Hòm thư góp ý (`/gop-y`)', type: 'Functional', priority: 'High' },
  { id: 'TR-PROF-004', module: 'PROFILE', moduleName: 'PROFILE & FEEDBACK', title: 'Admin tiếp nhận, phân loại và phản hồi thư góp ý của người dùng', type: 'Functional', priority: 'Medium' },
  { id: 'TR-PROF-005', module: 'PROFILE', moduleName: 'PROFILE & FEEDBACK', title: 'Chống tấn công XSS trong nội dung thư góp ý hoặc tùy biến CSS cá nhân', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-PROF-006', module: 'PROFILE', moduleName: 'PROFILE & FEEDBACK', title: 'Kiểm tra giao diện Profile Studio xem trước trực tiếp (Live Preview) trên Mobile & Laptop', type: 'Look & Feel', priority: 'Low' },

  // ── 10. REFUND & ESCROW & SIMULATION (HOÀN TIỀN & GIẢ LẬP) (7 TRs) ───────────
  { id: 'TR-REF-001', module: 'REFUND', moduleName: 'REFUND / ESCROW / SIM', title: 'Hoàn tiền tự động cho toàn bộ Backer khi chiến dịch All-or-Nothing kết thúc thất bại', type: 'Functional', priority: 'High' },
  { id: 'TR-REF-002', module: 'REFUND', moduleName: 'REFUND / ESCROW / SIM', title: 'Người mua gửi yêu cầu hoàn tiền khiếu nại kèm hình ảnh minh chứng hàng lỗi/chậm giao', type: 'Functional', priority: 'High' },
  { id: 'TR-REF-003', module: 'REFUND', moduleName: 'REFUND / ESCROW / SIM', title: 'Admin thẩm định duyệt hoặc từ chối yêu cầu hoàn tiền của người ủng hộ', type: 'Functional', priority: 'High' },
  { id: 'TR-REF-004', module: 'REFUND', moduleName: 'REFUND / ESCROW / SIM', title: 'Chế độ giả lập thanh toán (Simulation Mode mã SIM-) phục vụ kiểm thử end-to-end', type: 'Functional', priority: 'High' },
  { id: 'TR-REF-005', module: 'REFUND', moduleName: 'REFUND / ESCROW / SIM', title: 'Ghi nhận biến động dòng tiền vào Sổ cái tài chính minh bạch (So Ledgers)', type: 'Functional', priority: 'High' },
  { id: 'TR-REF-006', module: 'REFUND', moduleName: 'REFUND / ESCROW / SIM', title: 'Chống hoàn tiền trùng lặp (Idempotency Key / Duplicate Refund Lock)', type: 'Negative / Security', priority: 'High' },
  { id: 'TR-REF-007', module: 'REFUND', moduleName: 'REFUND / ESCROW / SIM', title: 'Kiểm tra giao diện Lịch sử biến động sổ cái minh bạch tại trang `/so`', type: 'Look & Feel', priority: 'Low' },
];

module.exports = { MASSIVE_TR_LIST };
