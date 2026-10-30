/**
 * new_tr_data.js
 * Chuẩn hóa 80 TR theo đúng 10 phân hệ Tử Tế Fund - 23CT113 Nhóm 02
 * TR-001 -> TR-080, mỗi phân hệ 8 TR (4 loại: Functional, Boundary, LooknFeel, Negative)
 */

const NEW_TR_LIST = [
  // ══════════════════════════════════════════════════════════════════
  // PHÂN HỆ 1: AUTH — Quản lý Đăng nhập & Xác thực (TR-001 -> TR-008)
  // Người phụ trách: Nguyễn Quách Phú Tài (123000609)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'TR-001', module: 'AUTH', moduleName: 'Quản lý Đăng nhập & Xác thực',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Đăng nhập mật khẩu thành công và phân luồng điều hướng theo vai trò (RBAC)',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh luồng đăng nhập với email/password hợp lệ và điều hướng đúng theo role: ADMIN -> /dashboard/admin, CREATOR -> /dashboard, USER -> /campaigns',
    acceptance: 'Hệ thống xác thực credentials qua NextAuth, tạo session JWT, chuyển hướng đúng role, hiển thị tên người dùng trên header',
    frId: 'FR-001'
  },
  {
    id: 'TR-002', module: 'AUTH', moduleName: 'Quản lý Đăng nhập & Xác thực',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Đăng nhập tích hợp Google OAuth và tự động tạo/liên kết tài khoản',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh luồng đăng nhập bằng Google, tự động tạo bản ghi User nếu chưa có hoặc liên kết với tài khoản hiện tại nếu email trùng khớp',
    acceptance: 'Tạo/liên kết account thành công, lưu provider=GOOGLE, không tạo bản ghi trùng lặp',
    frId: 'FR-001'
  },
  {
    id: 'TR-003', module: 'AUTH', moduleName: 'Quản lý Đăng nhập & Xác thực',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Đăng ký tài khoản mới và xác thực định dạng email',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh quy trình đăng ký: validate email format, mã hóa mật khẩu bcrypt, lưu User với role=USER mặc định',
    acceptance: 'Tạo bản ghi User thành công, password được hash, gửi email chào mừng, chuyển hướng sang /auth/login',
    frId: 'FR-001'
  },
  {
    id: 'TR-004', module: 'AUTH', moduleName: 'Quản lý Đăng nhập & Xác thực',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Quên mật khẩu và đặt lại mật khẩu qua email token',
    type: 'Functional', priority: 'Medium',
    desc: 'Xác minh luồng reset password: gửi email chứa token, người dùng nhập password mới, token hết hạn sau TTL',
    acceptance: 'Token hợp lệ trong TTL_MS, mật khẩu cũ không còn hiệu lực, mật khẩu mới được hash và lưu thành công',
    frId: 'FR-001'
  },
  {
    id: 'TR-005', module: 'AUTH', moduleName: 'Quản lý Đăng nhập & Xác thực',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Thay đổi mật khẩu trong trang cài đặt bảo mật cá nhân',
    type: 'Functional', priority: 'Medium',
    desc: 'Xác minh chức năng đổi mật khẩu: yêu cầu nhập mật khẩu cũ, xác nhận mật khẩu mới 2 lần, cập nhật hash',
    acceptance: 'Xác thực mật khẩu cũ đúng, mật khẩu mới được hash lưu DB, hiển thị thông báo thành công',
    frId: 'FR-001'
  },
  {
    id: 'TR-006', module: 'AUTH', moduleName: 'Quản lý Đăng nhập & Xác thực',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Kiểm tra giá trị biên độ dài mật khẩu khi đăng ký (min 8, max 64 ký tự theo PRD)',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra: mật khẩu < 8 ký tự bị từ chối, = 8 ký tự được chấp nhận, = 64 ký tự được chấp nhận, > 64 ký tự bị từ chối',
    acceptance: 'API trả 400 cho pw < 8 ký tự và > 64 ký tự; trả 201 cho pw = 8 và = 64 ký tự',
    frId: 'FR-002'
  },
  {
    id: 'TR-007', module: 'AUTH', moduleName: 'Quản lý Đăng nhập & Xác thực',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Chặn đăng nhập sai mật khẩu liên tiếp và bảo vệ chống Brute-Force (Rate Limiting)',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh cơ chế rate limiting: sau 5 lần đăng nhập sai liên tiếp trong 15 phút, API trả 429 và yêu cầu chờ',
    acceptance: 'Lần thứ 6 trong cùng IP nhận HTTP 429, hiển thị thông báo tạm khóa và thời gian chờ',
    frId: 'FR-003'
  },
  {
    id: 'TR-008', module: 'AUTH', moduleName: 'Quản lý Đăng nhập & Xác thực',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Kiểm tra giao diện Form Đăng nhập/Đăng ký responsive và hiển thị chuẩn Chrome',
    type: 'LooknFeel', priority: 'Low',
    desc: 'Kiểm tra UI/UX: layout, màu sắc, placeholder, validation inline, responsive mobile 390px và desktop 1440px',
    acceptance: 'Form hiển thị đúng thiết kế trên cả mobile (390x844) và desktop Chrome, không bị vỡ layout',
    frId: 'NFR-005'
  },

  // ══════════════════════════════════════════════════════════════════
  // PHÂN HỆ 2: DONATE — Ủng hộ, Giỏ quà & Thanh toán (TR-009 -> TR-016)
  // Người phụ trách: Nguyễn Quách Phú Tài (123000609)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'TR-009', module: 'DONATE', moduleName: 'Ủng hộ, Giỏ quà & Thanh toán',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Quy trình chọn gói quà, nhập thông tin giao nhận và xác nhận Pledge thành công',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh luồng: Backer chọn reward tier -> nhập địa chỉ giao hàng -> thanh toán VietQR -> hệ thống tạo Pledge và Invoice',
    acceptance: 'Pledge được tạo với status PENDING, Invoice tự động sinh, email xác nhận gửi cho Backer',
    frId: 'FR-006'
  },
  {
    id: 'TR-010', module: 'DONATE', moduleName: 'Ủng hộ, Giỏ quà & Thanh toán',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Tích hợp thanh toán VietQR Escrow và SimulatedPaySteps (cổng chính)',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh hiển thị mã QR VietQR với số tài khoản escrow, người dùng confirm qua SimulatedPaySteps, hệ thống cập nhật Pledge sang PAID',
    acceptance: 'QR code hiển thị đúng STK, admin settle chuyển Pledge->PAID, Backer nhận thông báo xác nhận thanh toán',
    frId: 'FR-007'
  },
  {
    id: 'TR-011', module: 'DONATE', moduleName: 'Ủng hộ, Giỏ quà & Thanh toán',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Hiển thị lịch sử đơn ủng hộ và quản lý Kho đồ cá nhân (/purchases)',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh trang /purchases hiển thị danh sách tất cả Pledge của Backer kèm trạng thái, số tiền và nút hành động phù hợp',
    acceptance: 'Hiển thị đầy đủ lịch sử pledge, lọc theo trạng thái, có nút track shipping cho đơn vật lý',
    frId: 'FR-006'
  },
  {
    id: 'TR-012', module: 'DONATE', moduleName: 'Ủng hộ, Giỏ quà & Thanh toán',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Đóng góp không nhận quà (Pledge ủng hộ thuần túy không có Reward tier)',
    type: 'Functional', priority: 'Medium',
    desc: 'Xác minh Backer có thể ủng hộ tự do số tiền tùy ý mà không cần chọn reward tier',
    acceptance: 'Tạo Pledge không có rewardId, số tiền tự do >= 10,000 VNĐ, không yêu cầu địa chỉ giao hàng',
    frId: 'FR-006'
  },
  {
    id: 'TR-013', module: 'DONATE', moduleName: 'Ủng hộ, Giỏ quà & Thanh toán',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Kiểm tra giá trị biên số tiền ủng hộ tối thiểu (10,000 VNĐ) và tối đa (100,000,000 VNĐ)',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra: < 10,000 VNĐ bị từ chối; = 10,000 VNĐ được chấp nhận; = 100,000,000 VNĐ được chấp nhận; > 100,000,000 VNĐ bị từ chối',
    acceptance: 'API /api/pledges trả 400 cho số tiền ngoài ngưỡng, trả 201 cho số tiền hợp lệ',
    frId: 'FR-008'
  },
  {
    id: 'TR-014', module: 'DONATE', moduleName: 'Ủng hộ, Giỏ quà & Thanh toán',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Giới hạn media gói quà: tối đa 10 ảnh và 1 video cho một Reward (Boundary)',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra upload giới hạn: 10 ảnh + 1 video = hợp lệ; 11 ảnh = từ chối; 2 video = từ chối',
    acceptance: 'Backend /api/upload từ chối khi vượt 10 ảnh hoặc 2 video trên 1 Reward, trả lỗi 400',
    frId: 'FR-009'
  },
  {
    id: 'TR-015', module: 'DONATE', moduleName: 'Ủng hộ, Giỏ quà & Thanh toán',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Chặn Webhook/cổng thanh toán thứ 3 (trả 410 Gone) và xử lý BLOCKED payment methods',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh API /api/payments/webhook trả 410 Gone; E_WALLET và CREDIT_CARD bị vô hiệu hóa; COD không có trong enum PaymentMethod',
    acceptance: 'Webhook trả 410 với message giải thích; giao diện không cho chọn E_WALLET/CREDIT_CARD; không có option COD',
    frId: 'FR-007'
  },
  {
    id: 'TR-016', module: 'DONATE', moduleName: 'Ủng hộ, Giỏ quà & Thanh toán',
    owner: 'Nguyễn Quách Phú Tài', mssv: '123000609',
    title: 'Kiểm tra giao diện trang thanh toán và mã QR VietQR trên mobile và desktop',
    type: 'LooknFeel', priority: 'Low',
    desc: 'Kiểm tra UI thanh toán: mã QR rõ nét, nút copy STK/số tiền có toast animation, layout responsive',
    acceptance: 'QR hiển thị rõ, toast "Đã sao chép" xuất hiện khi click copy, responsive trên mobile 390px',
    frId: 'NFR-005'
  },

  // ══════════════════════════════════════════════════════════════════
  // PHÂN HỆ 3: CAMP — Dự án & Chiến dịch Gây quỹ (TR-017 -> TR-024)
  // Người phụ trách: Trần Xuân Ân (123001127)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'TR-017', module: 'CAMP', moduleName: 'Dự án & Chiến dịch Gây quỹ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Khởi tạo chiến dịch gây quỹ mới và lưu bản nháp (DRAFT)',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh Creator tạo chiến dịch mới với đầy đủ tiêu đề, mô tả, mục tiêu, hạn ngày, lưu draft thành công',
    acceptance: 'Campaign tạo với status=DRAFT, gắn creatorId, lưu vào DB, chuyển hướng về trang edit',
    frId: 'FR-004'
  },
  {
    id: 'TR-018', module: 'CAMP', moduleName: 'Dự án & Chiến dịch Gây quỹ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Gửi yêu cầu phê duyệt chiến dịch (DRAFT -> PENDING_REVIEW)',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh Creator gửi chiến dịch DRAFT để Admin kiểm duyệt, trạng thái chuyển PENDING_REVIEW, Admin nhận thông báo',
    acceptance: 'Campaign.status -> PENDING_REVIEW, Admin nhận notification, Creator thấy badge "Đang chờ duyệt"',
    frId: 'FR-004'
  },
  {
    id: 'TR-019', module: 'CAMP', moduleName: 'Dự án & Chiến dịch Gây quỹ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Admin thẩm định phê duyệt (ACTIVE) hoặc từ chối chiến dịch kèm lý do',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh Admin duyệt campaign -> ACTIVE hoặc từ chối kèm lý do, Creator nhận email thông báo kết quả',
    acceptance: 'ACTIVE: campaign xuất hiện public trên /campaigns; REJECTED: Creator nhận email có lý do rõ ràng',
    frId: 'FR-004'
  },
  {
    id: 'TR-020', module: 'CAMP', moduleName: 'Dự án & Chiến dịch Gây quỹ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Creator đăng bài cập nhật tiến độ (Progress Updates) cho người ủng hộ',
    type: 'Functional', priority: 'Medium',
    desc: 'Xác minh Creator post progress update, Backer nhận notification, update hiển thị trong tab "Cập nhật" của chiến dịch',
    acceptance: 'Update được lưu vào bảng campaign_updates, Backer nhận push notification, nội dung hiển thị chuẩn',
    frId: 'FR-005'
  },
  {
    id: 'TR-021', module: 'CAMP', moduleName: 'Dự án & Chiến dịch Gây quỹ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Kiểm tra giá trị biên tiêu đề chiến dịch (min 10, max 120 ký tự) và ngày kết thúc',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra: title < 10 ký tự bị từ chối; title > 120 ký tự bị từ chối; endDate <= now() bị từ chối',
    acceptance: 'API /api/campaigns trả 400 cho title ngắn/dài/ngày quá khứ; 201 cho dữ liệu biên hợp lệ',
    frId: 'FR-010'
  },
  {
    id: 'TR-022', module: 'CAMP', moduleName: 'Dự án & Chiến dịch Gây quỹ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Chặn Backer Pledge vào chiến dịch chưa ACTIVE (DRAFT/PENDING_REVIEW) và hiển thị thông báo rõ ràng',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh API /api/campaigns/:id/pledges trả 403 khi campaign.status != ACTIVE, UI hiển thị thông báo tiếng Việt rõ ràng',
    acceptance: 'POST /api/campaigns/:id/pledges với DRAFT/PENDING campaign -> 403 kèm message: "Chiến dịch chưa được mở nhận ủng hộ"',
    frId: 'FR-011'
  },
  {
    id: 'TR-023', module: 'CAMP', moduleName: 'Dự án & Chiến dịch Gây quỹ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Chặn Creator chưa xác thực KYC nộp chiến dịch để duyệt',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh hệ thống kiểm tra KYC status trước khi cho phép submit campaign, chặn Creator chưa VERIFIED',
    acceptance: 'Creator với kyc=PENDING/REJECTED nhận HTTP 403 và thông báo yêu cầu xác thực danh tính trước',
    frId: 'FR-011'
  },
  {
    id: 'TR-024', module: 'CAMP', moduleName: 'Dự án & Chiến dịch Gây quỹ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Kiểm tra giao diện chi tiết chiến dịch: thanh tiến trình, đếm ngược và responsive',
    type: 'LooknFeel', priority: 'Low',
    desc: 'Kiểm tra UI trang campaign detail: progress bar % chính xác, countdown timer cập nhật realtime, responsive mobile',
    acceptance: 'Progress bar hiển thị đúng %, countdown giảm theo giây, layout không vỡ trên mobile 390px',
    frId: 'NFR-005'
  },

  // ══════════════════════════════════════════════════════════════════
  // PHÂN HỆ 4: DISBURSE — Giải ngân, Hóa đơn & Chứng từ (TR-025 -> TR-032)
  // Người phụ trách: Trần Xuân Ân (123001127)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'TR-025', module: 'DISBURSE', moduleName: 'Giải ngân, Hóa đơn & Chứng từ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Admin settle giải ngân cho Creator khi chiến dịch kết thúc thành công (SUCCESSFUL)',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh luồng Admin settle: chiến dịch ENDED -> Admin đối soát -> phê duyệt giải ngân -> Creator nhận tiền',
    acceptance: 'Disburse record được tạo, Campaign.disbursed=true, Creator nhận email và notification về khoản giải ngân',
    frId: 'FR-012'
  },
  {
    id: 'TR-026', module: 'DISBURSE', moduleName: 'Giải ngân, Hóa đơn & Chứng từ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Tự động khởi tạo Hóa đơn điện tử (Backer Invoices) khi thanh toán Pledge thành công',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh sau khi Pledge -> PAID, hệ thống tự động tạo bản ghi backer_invoice với số hóa đơn duy nhất',
    acceptance: 'Invoice được tạo với số hiệu INV-YYYY-XXXX, lưu đầy đủ thông tin thuế, gắn với pledgeId',
    frId: 'FR-013'
  },
  {
    id: 'TR-027', module: 'DISBURSE', moduleName: 'Giải ngân, Hóa đơn & Chứng từ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Cấp và hiển thị Giấy chứng nhận đóng góp kèm mã QR tra cứu (/lookup)',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh sau khi Pledge thanh toán xong, hệ thống cấp Certificate với mã QR dẫn về /lookup?code=...',
    acceptance: 'Certificate được tạo với mã duy nhất, QR quét dẫn đến trang xác thực online, thông tin chính xác',
    frId: 'FR-013'
  },
  {
    id: 'TR-028', module: 'DISBURSE', moduleName: 'Giải ngân, Hóa đơn & Chứng từ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Tra cứu công khai tính hợp lệ hóa đơn/chứng nhận tại /lookup (bao gồm Guest)',
    type: 'Functional', priority: 'Medium',
    desc: 'Xác minh trang /lookup cho phép tra cứu mã Certificate/Invoice mà không cần đăng nhập',
    acceptance: 'Nhập mã hợp lệ -> hiển thị đầy đủ thông tin; nhập mã giả -> hiển thị thông báo không tìm thấy',
    frId: 'FR-014'
  },
  {
    id: 'TR-029', module: 'DISBURSE', moduleName: 'Giải ngân, Hóa đơn & Chứng từ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Kiểm tra giá trị biên hiển thị hóa đơn khi tên chiến dịch và địa chỉ dài > 100 ký tự',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra trang /hoa-don/[number] hiển thị đúng khi tên chiến dịch và địa chỉ vượt 100 ký tự không bị tràn layout',
    acceptance: 'Layout hóa đơn không bị lệch khung, text wrap đúng, không overflow container khi tên dài',
    frId: 'FR-015'
  },
  {
    id: 'TR-030', module: 'DISBURSE', moduleName: 'Giải ngân, Hóa đơn & Chứng từ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Kiểm tra hiển thị thông tin thuế VAT động của chủ dự án trên trang Hóa đơn',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra trang /hoa-don/[number] lấy dữ liệu thuế từ DB (không hard-code), hiển thị đúng MST/tên/địa chỉ creator',
    acceptance: 'Trang hóa đơn fetch thông tin thuế từ DB, hiển thị động; không dùng template cứng',
    frId: 'FR-015'
  },
  {
    id: 'TR-031', module: 'DISBURSE', moduleName: 'Giải ngân, Hóa đơn & Chứng từ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Chặn tra cứu mã chứng từ giả mạo và bảo vệ chống Brute-Force dò mã',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh /lookup trả thông báo lỗi rõ cho mã không tồn tại; Rate Limiting trả 429 khi dò quét > 20 req/10s',
    acceptance: 'Mã giả -> thông báo "Không tìm thấy chứng từ hợp lệ"; > 20 req/10s -> HTTP 429',
    frId: 'FR-016'
  },
  {
    id: 'TR-032', module: 'DISBURSE', moduleName: 'Giải ngân, Hóa đơn & Chứng từ',
    owner: 'Trần Xuân Ân', mssv: '123001127',
    title: 'Kiểm tra giao diện trang hóa đơn điện tử trang trọng, chuẩn in PDF',
    type: 'LooknFeel', priority: 'Low',
    desc: 'Kiểm tra UI trang /hoa-don/: logo rõ, layout A4, màu sắc trang nhã, nút in/tải PDF hoạt động',
    acceptance: 'Trang hóa đơn hiển thị đúng trên Desktop Chrome, in preview đúng khổ A4, nút "Tải PDF" tải file thành công',
    frId: 'NFR-005'
  },

  // ══════════════════════════════════════════════════════════════════
  // PHÂN HỆ 5: USER — Hồ sơ cá nhân & KYC thủ công (TR-033 -> TR-040)
  // Người phụ trách: Bùi Đặng Quốc Khánh (123001005)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'TR-033', module: 'USER', moduleName: 'Hồ sơ cá nhân & KYC thủ công',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Xem và cập nhật thông tin cá nhân (tên, avatar, bio) trên trang /profile',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh người dùng có thể xem và chỉnh sửa thông tin cá nhân: tên, bio, avatar, các liên kết mạng xã hội',
    acceptance: 'Thông tin cập nhật được lưu vào DB, avatar upload thành công, trang profile public hiển thị đúng',
    frId: 'FR-017'
  },
  {
    id: 'TR-034', module: 'USER', moduleName: 'Hồ sơ cá nhân & KYC thủ công',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Nộp hồ sơ KYC: ảnh CCCD 2 mặt và video xác thực chân dung 5 giây',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh Creator nộp ảnh CCCD mặt trước + mặt sau và video 5 giây, chờ Admin thẩm định',
    acceptance: 'Files upload thành công lên storage, KYC record tạo với status=PENDING, Creator thấy trạng thái "Đang chờ xét duyệt"',
    frId: 'FR-018'
  },
  {
    id: 'TR-035', module: 'USER', moduleName: 'Hồ sơ cá nhân & KYC thủ công',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Bảo mật quyền riêng tư: chặn truy cập công khai vào URL ảnh CCCD',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh URL ảnh CCCD không thể truy cập trực tiếp; chỉ Admin có quyền xem qua dashboard',
    acceptance: 'GET trực tiếp URL ảnh CCCD của người khác -> 403; chỉ Admin authenticated mới xem được',
    frId: 'FR-019'
  },
  {
    id: 'TR-036', module: 'USER', moduleName: 'Hồ sơ cá nhân & KYC thủ công',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Kiểm tra giá trị biên độ dài Bio (max 500 ký tự) và counter tức thì trên UI',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra: Bio <= 500 ký tự được chấp nhận; > 500 ký tự bị từ chối; UI hiển thị counter "X/500" cập nhật tức thì',
    acceptance: 'API /api/profile trả 400 khi bio > 500 ký tự; UI counter cập nhật realtime khi nhập; cảnh báo khi gần giới hạn',
    frId: 'FR-020'
  },
  {
    id: 'TR-037', module: 'USER', moduleName: 'Hồ sơ cá nhân & KYC thủ công',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Kiểm tra ràng buộc dung lượng ảnh CCCD (max 5MB) và video chân dung (max 30MB)',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra: ảnh <= 5MB chấp nhận, ảnh > 5MB từ chối; video <= 30MB chấp nhận, video > 30MB từ chối',
    acceptance: 'API /api/upload trả 400 kèm message rõ khi vượt giới hạn dung lượng, không lưu file vào storage',
    frId: 'FR-019'
  },
  {
    id: 'TR-038', module: 'USER', moduleName: 'Hồ sơ cá nhân & KYC thủ công',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Chặn tải lên tệp tin không đúng định dạng ảnh trên form KYC (client và server)',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh cả client-side (input[accept]) và server-side (MIME type check) đều từ chối .exe, .pdf, .docx giả mạo đuôi .jpg',
    acceptance: 'Client: nút gửi bị khóa và cảnh báo ngay khi chọn file sai; Server: MIME check từ chối với 400',
    frId: 'FR-019'
  },
  {
    id: 'TR-039', module: 'USER', moduleName: 'Hồ sơ cá nhân & KYC thủ công',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Chặn nộp form KYC khi chưa đính kèm đủ ảnh CCCD (validation client-side)',
    type: 'Negative', priority: 'Medium',
    desc: 'Xác minh form /kyc khóa nút "Gửi hồ sơ" và hiện thông báo tức thì trên UI khi chưa attach ảnh CCCD',
    acceptance: 'Nút Submit bị disabled, cảnh báo inline "Vui lòng đính kèm ảnh CCCD" xuất hiện ngay; không gửi API request',
    frId: 'FR-018'
  },
  {
    id: 'TR-040', module: 'USER', moduleName: 'Hồ sơ cá nhân & KYC thủ công',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Kiểm tra giao diện form KYC: Drag & Drop, thanh tiến trình upload % và xem trước ảnh',
    type: 'LooknFeel', priority: 'Low',
    desc: 'Kiểm tra UX upload ảnh KYC: vùng drag-drop, thanh tiến trình upload, preview ảnh trước khi gửi',
    acceptance: 'Drag & drop hiệu quả, thanh tiến trình hiển thị %, preview ảnh rõ trước khi submit',
    frId: 'NFR-005'
  },

  // ══════════════════════════════════════════════════════════════════
  // PHÂN HỆ 6: ADMIN — Quản trị Hệ thống & Kiểm duyệt (TR-041 -> TR-048)
  // Người phụ trách: Bùi Đặng Quốc Khánh (123001005)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'TR-041', module: 'ADMIN', moduleName: 'Quản trị Hệ thống & Kiểm duyệt',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Quản lý danh sách người dùng: thay đổi vai trò, khóa/mở khóa tài khoản',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh Admin có thể tìm kiếm người dùng, thay đổi role, BAN/UNBAN tài khoản vi phạm',
    acceptance: 'Role thay đổi ngay lập tức trong DB, tài khoản BAN không thể đăng nhập, thay đổi ghi vào audit_logs',
    frId: 'FR-021'
  },
  {
    id: 'TR-042', module: 'ADMIN', moduleName: 'Quản trị Hệ thống & Kiểm duyệt',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Thẩm định hồ sơ KYC: phê duyệt VERIFIED hoặc từ chối REJECTED kèm lý do',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh Admin xem ảnh CCCD/video KYC, phê duyệt hoặc từ chối kèm lý do tối thiểu 10 ký tự',
    acceptance: 'VERIFIED: role Creator được mở; REJECTED: Creator nhận email có lý do; lý do < 10 ký tự bị từ chối',
    frId: 'FR-022'
  },
  {
    id: 'TR-043', module: 'ADMIN', moduleName: 'Quản trị Hệ thống & Kiểm duyệt',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Tiếp nhận và xử lý báo cáo vi phạm từ cộng đồng (Campaign/Blog/Chat Reports)',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh Admin xem danh sách reports, xét duyệt từng case, áp dụng hình thức xử lý phù hợp',
    acceptance: 'Reports có thể lọc theo loại, Admin có thể cảnh cáo/đình chỉ, kết quả xử lý ghi vào DB',
    frId: 'FR-023'
  },
  {
    id: 'TR-044', module: 'ADMIN', moduleName: 'Quản trị Hệ thống & Kiểm duyệt',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Cấu hình Từ khóa cấm (Blacklist Keywords) và thẩm định chứng chỉ Creator',
    type: 'Functional', priority: 'Medium',
    desc: 'Xác minh Admin thêm/xóa từ khóa cấm trong blacklist, thẩm định và phê duyệt/từ chối chứng chỉ Creator',
    acceptance: 'Từ khóa mới có hiệu lực ngay, chiến dịch chứa từ cấm bị cảnh báo khi lưu; chứng chỉ duyệt/từ chối thành công',
    frId: 'FR-024'
  },
  {
    id: 'TR-045', module: 'ADMIN', moduleName: 'Quản trị Hệ thống & Kiểm duyệt',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Kiểm tra giá trị biên lý do từ chối KYC/Chiến dịch (bắt buộc tối thiểu 10 ký tự)',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra: lý do từ chối < 10 ký tự bị từ chối; = 10 ký tự được chấp nhận; form kiểm tra ngay khi submit',
    acceptance: 'API admin reject trả 400 khi reason < 10 ký tự; form hiển thị lỗi validation rõ ràng',
    frId: 'FR-025'
  },
  {
    id: 'TR-046', module: 'ADMIN', moduleName: 'Quản trị Hệ thống & Kiểm duyệt',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Chặn tuyệt đối truy cập trái phép vào /dashboard/admin (Route Protection RBAC)',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh middleware chặn USER/CREATOR truy cập /dashboard/admin, chuyển hướng về 403 hoặc /unauthorized',
    acceptance: 'USER/CREATOR truy cập /dashboard/admin -> redirect 403; API /api/admin/* -> 403 Forbidden',
    frId: 'FR-026'
  },
  {
    id: 'TR-047', module: 'ADMIN', moduleName: 'Quản trị Hệ thống & Kiểm duyệt',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Chống SQL Injection trong tìm kiếm người dùng Admin và bảo vệ route Admin APIs',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh Prisma parameterized query chặn SQL injection; các Admin API đều kiểm tra session role=ADMIN',
    acceptance: "Nhập ' OR 1=1 -- vào tìm kiếm -> 0 kết quả không lỗi; POST admin API không có session Admin -> 401/403",
    frId: 'FR-026'
  },
  {
    id: 'TR-048', module: 'ADMIN', moduleName: 'Quản trị Hệ thống & Kiểm duyệt',
    owner: 'Bùi Đặng Quốc Khánh', mssv: '123001005',
    title: 'Kiểm tra giao diện Dashboard Admin: bộ lọc đa tiêu chí, bảng dữ liệu và modal xác nhận',
    type: 'LooknFeel', priority: 'Low',
    desc: 'Kiểm tra UI Admin Console: bộ lọc status/role, bảng phân trang, modal confirm trước khi thực hiện thao tác',
    acceptance: 'Bộ lọc hoạt động realtime, phân trang 20 items/trang, modal confirm trước BAN/REJECT/APPROVE',
    frId: 'NFR-005'
  },

  // ══════════════════════════════════════════════════════════════════
  // PHÂN HỆ 7: BLOG — Tin tức & Bài viết Cộng đồng (TR-049 -> TR-056)
  // Người phụ trách: Nguyễn Trung Tiến (123000127)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'TR-049', module: 'BLOG', moduleName: 'Tin tức & Bài viết Cộng đồng',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Soạn thảo và đăng bài viết blog mới bằng trình soạn thảo TipTap Rich-Text',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh Creator/Admin soạn bài bằng TipTap editor hỗ trợ bold/italic/link/image/heading, lưu và xuất bản',
    acceptance: 'Bài viết được lưu vào bảng blog_posts với status=PUBLISHED, nội dung HTML sanitized, xuất hiện trên /blog',
    frId: 'FR-027'
  },
  {
    id: 'TR-050', module: 'BLOG', moduleName: 'Tin tức & Bài viết Cộng đồng',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Kiểm soát vòng đời bài viết: DRAFT và xuất bản công khai PUBLISHED',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh tác giả có thể lưu nháp, xem trước, xuất bản và thu hồi bài viết về draft',
    acceptance: 'DRAFT không hiển thị với Guest/User; PUBLISHED hiển thị trên /blog; thu hồi thành công',
    frId: 'FR-027'
  },
  {
    id: 'TR-051', module: 'BLOG', moduleName: 'Tin tức & Bài viết Cộng đồng',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Bộ lọc tìm kiếm bài viết theo từ khóa và phân loại danh mục',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh trang /blog có ô tìm kiếm theo tiêu đề/nội dung và dropdown lọc danh mục (tag)',
    acceptance: 'Kết quả tìm kiếm cập nhật tức thì hoặc sau submit; lọc theo tag chính xác; không có kết quả DRAFT',
    frId: 'FR-028'
  },
  {
    id: 'TR-052', module: 'BLOG', moduleName: 'Tin tức & Bài viết Cộng đồng',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Gửi bình luận và phản hồi bình luận lồng nhau (nested comments) dưới bài viết',
    type: 'Functional', priority: 'Medium',
    desc: 'Xác minh người dùng đã đăng nhập có thể bình luận bài viết, reply nested comment, xóa comment của mình',
    acceptance: 'Comment được lưu và hiển thị ngay, nested reply tối đa 2 cấp, xóa comment thành công',
    frId: 'FR-029'
  },
  {
    id: 'TR-053', module: 'BLOG', moduleName: 'Tin tức & Bài viết Cộng đồng',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Kiểm tra giá trị biên tìm kiếm từ khóa dài > 80 ký tự không khoảng trắng',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra /blog hiển thị đúng khi từ khóa tìm kiếm là chuỗi liên tục dài > 80 ký tự không có khoảng trắng',
    acceptance: 'Nhãn tìm kiếm hiển thị đầy đủ không bị overflow; layout không vỡ; kết quả search vẫn hoạt động',
    frId: 'FR-030'
  },
  {
    id: 'TR-054', module: 'BLOG', moduleName: 'Tin tức & Bài viết Cộng đồng',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Làm sạch HTML chống tấn công Stored XSS trong trình soạn thảo TipTap',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh TipTap sanitize toàn bộ thẻ <script>, onerror, onclick trước khi lưu và render',
    acceptance: 'HTML độc hại bị strip hoàn toàn, alert() không được thực thi, nội dung hiển thị thuần văn bản',
    frId: 'FR-031'
  },
  {
    id: 'TR-055', module: 'BLOG', moduleName: 'Tin tức & Bài viết Cộng đồng',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Ẩn tuyệt đối bài viết DRAFT với người dùng không phải tác giả',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh GET /api/blog/posts?status=DRAFT trả về [] cho Guest/User khác; truy cập URL draft trực tiếp -> 404',
    acceptance: 'DRAFT posts không xuất hiện trong danh sách public; URL /blog/:draft-slug -> 404 với User khác',
    frId: 'FR-031'
  },
  {
    id: 'TR-056', module: 'BLOG', moduleName: 'Tin tức & Bài viết Cộng đồng',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Kiểm tra giao diện bài viết: Typography chuẩn, ảnh thumbnail và responsive',
    type: 'LooknFeel', priority: 'Low',
    desc: 'Kiểm tra UI bài viết blog: font chữ dễ đọc, thumbnail hiển thị đẹp, responsive mobile/desktop',
    acceptance: 'Bài viết hiển thị đúng typography (h1-h6, blockquote, code), thumbnail tỷ lệ 16:9, mobile không vỡ layout',
    frId: 'NFR-005'
  },

  // ══════════════════════════════════════════════════════════════════
  // PHÂN HỆ 8: CHAT — Trò chuyện, Bình luận & Thông báo (TR-057 -> TR-064)
  // Người phụ trách: Nguyễn Trung Tiến (123000127)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'TR-057', module: 'CHAT', moduleName: 'Trò chuyện, Bình luận & Thông báo',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Hội thoại trực tiếp 1-1 giữa Backer và Creator lưu trữ PostgreSQL Prisma',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh gửi/nhận tin nhắn 1-1, lưu vào DB qua REST API, hiển thị lịch sử chat đúng thứ tự thời gian',
    acceptance: 'Tin nhắn lưu vào bảng messages, hiển thị đúng thứ tự, không mất tin khi reload trang',
    frId: 'FR-032'
  },
  {
    id: 'TR-058', module: 'CHAT', moduleName: 'Trò chuyện, Bình luận & Thông báo',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Hệ thống thông báo thời gian thực khi có sự kiện quan trọng (Notifications)',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh notification push khi có đơn hàng mới, pledge update, campaign duyệt; hiển thị badge số chưa đọc trên chuông',
    acceptance: 'Bell icon cập nhật số unread, nhấp vào thông báo điều hướng đúng URL, đánh dấu đã đọc sau khi click',
    frId: 'FR-033'
  },
  {
    id: 'TR-059', module: 'CHAT', moduleName: 'Trò chuyện, Bình luận & Thông báo',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Gửi Góp ý (/gop-y) thành công với nội dung 15-1000 ký tự',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh form /gop-y gửi feedback thành công khi nội dung trong khoảng 15-1000 ký tự, lưu vào platform_feedback',
    acceptance: 'Feedback lưu DB, hiển thị toast "Cảm ơn đã đóng góp ý kiến", form được reset',
    frId: 'FR-034'
  },
  {
    id: 'TR-060', module: 'CHAT', moduleName: 'Trò chuyện, Bình luận & Thông báo',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Gửi tệp hình ảnh đính kèm trong tin nhắn hội thoại 1-1',
    type: 'Functional', priority: 'Medium',
    desc: 'Xác minh người dùng có thể đính kèm ảnh trong chat, upload lên storage, hiển thị thumbnail trong hội thoại',
    acceptance: 'Ảnh <= 5MB upload thành công, hiển thị thumbnail trong chat; ảnh > 5MB bị từ chối',
    frId: 'FR-032'
  },
  {
    id: 'TR-061', module: 'CHAT', moduleName: 'Trò chuyện, Bình luận & Thông báo',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Kiểm tra giá trị biên độ dài nội dung Góp ý (/gop-y): min 15, max 1000 ký tự theo PRD',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra: nội dung 10-14 ký tự bị từ chối (PRD yêu cầu min 15); nội dung 1001-2000 ký tự bị từ chối (PRD max 1000)',
    acceptance: 'API /api/feedback trả 400 cho nội dung < 15 hoặc > 1000 ký tự; textarea có minLength=15 maxLength=1000',
    frId: 'FR-035'
  },
  {
    id: 'TR-062', module: 'CHAT', moduleName: 'Trò chuyện, Bình luận & Thông báo',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Rate Limiting chống spam tin nhắn liên tục trong khung chat',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh sau khi gửi > N tin nhắn trong X giây, hệ thống rate limit và trả 429 hoặc cảnh báo cooldown',
    acceptance: 'Sau 10 tin/10s cùng user -> hiển thị cooldown message, gửi tiếp -> 429 Too Many Requests',
    frId: 'FR-036'
  },
  {
    id: 'TR-063', module: 'CHAT', moduleName: 'Trò chuyện, Bình luận & Thông báo',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Chặn tài khoản BANNED gửi tin nhắn và chống XSS trong nội dung chat/góp ý',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh tài khoản BAN bị chặn gửi tin; nội dung chat/gop-y có thẻ script bị sanitize',
    acceptance: 'BANNED user gửi tin -> 403 "Tài khoản bị khóa"; <script>alert() trong chat -> hiển thị text thuần',
    frId: 'FR-036'
  },
  {
    id: 'TR-064', module: 'CHAT', moduleName: 'Trò chuyện, Bình luận & Thông báo',
    owner: 'Nguyễn Trung Tiến', mssv: '123000127',
    title: 'Kiểm tra giao diện khung chat: bong bóng tin nhắn, tự động cuộn và responsive mobile',
    type: 'LooknFeel', priority: 'Low',
    desc: 'Kiểm tra UI /chat: bubble tin nhắn rõ màu sắc theo vai trò, auto-scroll xuống tin mới nhất, mobile responsive',
    acceptance: 'Bubble hiển thị phân biệt Sent/Received, auto-scroll khi có tin mới, giao diện đẹp trên mobile 390px',
    frId: 'NFR-005'
  },

  // ══════════════════════════════════════════════════════════════════
  // PHÂN HỆ 9: STATS — Thống kê Doanh thu & Tra cứu (TR-065 -> TR-072)
  // Người phụ trách: Nguyễn Khánh Du (123000159)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'TR-065', module: 'STATS', moduleName: 'Thống kê Doanh thu & Tra cứu',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Xem Dashboard thống kê tổng quan doanh thu và số liệu chiến dịch (Creator Dashboard)',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh Creator xem được biểu đồ doanh thu, số pledge, số backer, campaign đang active của mình',
    acceptance: 'Biểu đồ render đúng dữ liệu từ DB, tổng tiền khớp với sum của Pledge PAID, số backer unique đúng',
    frId: 'FR-037'
  },
  {
    id: 'TR-066', module: 'STATS', moduleName: 'Thống kê Doanh thu & Tra cứu',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Xem báo cáo minh bạch dòng tiền công khai tại /so (Sổ đối soát)',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh trang /so hiển thị tổng tiền thu, tiền giải ngân, tiền tip; ai cũng xem được không cần đăng nhập',
    acceptance: 'Số liệu khớp với tổng sum DB, cập nhật realtime, Guest truy cập được',
    frId: 'FR-038'
  },
  {
    id: 'TR-067', module: 'STATS', moduleName: 'Thống kê Doanh thu & Tra cứu',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Lọc thống kê theo khoảng thời gian tùy chọn với Datepicker',
    type: 'Functional', priority: 'High',
    desc: 'Xác minh trang thống kê có Datepicker cho phép chọn startDate và endDate, lọc số liệu theo khoảng thời gian',
    acceptance: 'Chọn 01/10-29/10/2026 -> biểu đồ cập nhật chỉ dữ liệu trong khoảng, API nhận params startDate/endDate',
    frId: 'FR-039'
  },
  {
    id: 'TR-068', module: 'STATS', moduleName: 'Thống kê Doanh thu & Tra cứu',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Admin xem Analytics Dashboard toàn hệ thống: doanh thu, người dùng, chiến dịch',
    type: 'Functional', priority: 'Medium',
    desc: 'Xác minh Admin có bảng Dashboard tổng hợp: tổng doanh thu tất cả campaigns, MAU, DAU, số chiến dịch theo trạng thái',
    acceptance: 'Số liệu tổng hợp chính xác, biểu đồ line/bar render đúng, có thể xuất Excel',
    frId: 'FR-040'
  },
  {
    id: 'TR-069', module: 'STATS', moduleName: 'Thống kê Doanh thu & Tra cứu',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Kiểm tra giá trị biên Datepicker: chặn startDate > endDate và giữ tham số sau F5',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra: startDate > endDate bị chặn ngay trên Datepicker UI; tham số lọc được giữ trên URL sau khi reload',
    acceptance: 'Datepicker disable ngày endDate < startDate; URL có ?startDate=&endDate= và vẫn active sau F5',
    frId: 'FR-041'
  },
  {
    id: 'TR-070', module: 'STATS', moduleName: 'Thống kê Doanh thu & Tra cứu',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Kiểm tra xuất báo cáo Excel (.xlsx) tài chính với đầy đủ các cột dữ liệu',
    type: 'Boundary', priority: 'Medium',
    desc: 'Kiểm tra chức năng export Excel: tải về file hợp lệ, đủ cột (mã đơn, người dùng, số tiền, ngày), dữ liệu khớp',
    acceptance: 'File .xlsx tải về thành công, có header đúng tên cột, dữ liệu khớp với hiển thị trên màn hình',
    frId: 'FR-042'
  },
  {
    id: 'TR-071', module: 'STATS', moduleName: 'Thống kê Doanh thu & Tra cứu',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Chặn Creator xem thống kê doanh thu của campaign người khác (RBAC Data Isolation)',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh API /api/stats/campaign/:id kiểm tra ownership, Creator chỉ xem được campaign của mình',
    acceptance: 'Creator truy cập stats campaign người khác -> 403 Forbidden; API không trả dữ liệu nhạy cảm',
    frId: 'FR-043'
  },
  {
    id: 'TR-072', module: 'STATS', moduleName: 'Thống kê Doanh thu & Tra cứu',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Kiểm tra giao diện biểu đồ thống kê: Tooltip, màu sắc và responsive',
    type: 'LooknFeel', priority: 'Low',
    desc: 'Kiểm tra UI biểu đồ: tooltip hiển thị số tiền đúng định dạng VNĐ khi hover, màu sắc chuẩn, responsive',
    acceptance: 'Tooltip hover hiện đúng giá trị VNĐ có dấu phân cách; biểu đồ không vỡ trên mobile; màu legend rõ ràng',
    frId: 'NFR-005'
  },

  // ══════════════════════════════════════════════════════════════════
  // PHÂN HỆ 10: SYSTEM — Hiệu năng, Bảo mật & Giao diện (TR-073 -> TR-080)
  // Người phụ trách: Nguyễn Khánh Du (123000159)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'TR-073', module: 'SYSTEM', moduleName: 'Hiệu năng, Bảo mật & Giao diện',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Kiểm tra thời gian phản hồi trang chủ và trang chiến dịch < 3 giây',
    type: 'Functional', priority: 'High',
    desc: 'Đo thời gian load trang chủ (/) và trang /campaigns trên Chrome mạng thường, target < 3s TTFB',
    acceptance: 'TTFB < 3s; LCP < 2.5s; không có critical JS error trên console',
    frId: 'NFR-001'
  },
  {
    id: 'TR-074', module: 'SYSTEM', moduleName: 'Hiệu năng, Bảo mật & Giao diện',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Kiểm tra Dark Mode / Light Mode chuyển đổi mượt mà trên toàn hệ thống',
    type: 'Functional', priority: 'Medium',
    desc: 'Xác minh nút toggle Dark/Light mode hoạt động, thiết lập được persist trong localStorage sau reload',
    acceptance: 'Mode chuyển ngay lập tức không flash, localStorage lưu theme preference, persist sau F5',
    frId: 'NFR-005'
  },
  {
    id: 'TR-075', module: 'SYSTEM', moduleName: 'Hiệu năng, Bảo mật & Giao diện',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Kiểm tra responsive toàn bộ layout trên mobile 390px và tablet 768px',
    type: 'Functional', priority: 'High',
    desc: 'Kiểm tra tất cả trang chính (/, /campaigns, /blog, /auth/login, /profile) responsive đúng trên 390px và 768px',
    acceptance: 'Không bị scroll ngang, không vỡ layout, text không quá nhỏ, button dễ chạm trên mobile',
    frId: 'NFR-005'
  },
  {
    id: 'TR-076', module: 'SYSTEM', moduleName: 'Hiệu năng, Bảo mật & Giao diện',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Kiểm tra giá trị biên hiệu năng: thời gian phản hồi API khi load đồng thời 50 request',
    type: 'Boundary', priority: 'Medium',
    desc: 'Đo thời gian API /api/campaigns khi gọi đồng thời 50 request; target median < 500ms',
    acceptance: 'Median response time < 500ms, không có lỗi 5xx, tỷ lệ thành công >= 99%',
    frId: 'NFR-001'
  },
  {
    id: 'TR-077', module: 'SYSTEM', moduleName: 'Hiệu năng, Bảo mật & Giao diện',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Kiểm tra HTTP Security Headers: CSP, X-Frame-Options, HSTS, X-Content-Type',
    type: 'Negative', priority: 'High',
    desc: 'Kiểm tra tất cả response HTTP của web demo có đầy đủ security headers phòng chống XSS/Clickjacking',
    acceptance: 'Response có: Content-Security-Policy, X-Frame-Options: DENY, X-Content-Type-Options: nosniff',
    frId: 'NFR-002'
  },
  {
    id: 'TR-078', module: 'SYSTEM', moduleName: 'Hiệu năng, Bảo mật & Giao diện',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Chặn CSRF: tất cả API mutation (POST/PUT/DELETE) yêu cầu CSRF token hợp lệ',
    type: 'Negative', priority: 'High',
    desc: 'Xác minh POST/PUT/DELETE API không chấp nhận request không có CSRF token hoặc token giả mạo',
    acceptance: 'Request không có CSRF token hợp lệ -> 403; Cross-origin form submission -> blocked',
    frId: 'NFR-002'
  },
  {
    id: 'TR-079', module: 'SYSTEM', moduleName: 'Hiệu năng, Bảo mật & Giao diện',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Kiểm tra giao diện trang lỗi 404 và 500 hiển thị thân thiện, có nút về trang chủ',
    type: 'LooknFeel', priority: 'Low',
    desc: 'Kiểm tra trang 404 (not-found.tsx) và trang 500 (error.tsx) hiển thị đúng thiết kế, có link về trang chủ',
    acceptance: 'Trang 404/500 không hiển thị stack trace; có thông báo thân thiện tiếng Việt; có nút "Về trang chủ"',
    frId: 'NFR-005'
  },
  {
    id: 'TR-080', module: 'SYSTEM', moduleName: 'Hiệu năng, Bảo mật & Giao diện',
    owner: 'Nguyễn Khánh Du', mssv: '123000159',
    title: 'Kiểm tra toàn bộ liên kết nội bộ không bị broken link (404) trên web demo',
    type: 'LooknFeel', priority: 'Low',
    desc: 'Kiểm tra tất cả link navigation, footer link, CTA button trên web demo dẫn đến đúng trang đích',
    acceptance: 'Không có broken link 404 nào trong navigation, footer, các CTA chính; tất cả anchor dẫn đúng',
    frId: 'NFR-005'
  },
];

module.exports = { NEW_TR_LIST };

