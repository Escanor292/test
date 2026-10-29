/**
 * Complete Test Requirements (TR) and Test Cases (TC) Data
 * Project: TuTeFund Crowdfunding Platform
 * Group: 23CT113 - Nhóm 02
 */

const TRS = [
  // ── AUTH (Xác thực & Người dùng) ──────────────────────────────────────────
  {
    id: "TR-AUTH-001",
    module: "AUTH",
    title: "Đăng ký tài khoản người dùng cá nhân và tổ chức",
    type: "Chức năng",
    priority: "High",
    acceptance: "Cho phép đăng ký với email, mật khẩu >= 8 ký tự, họ tên; lưu bcrypt hash, gán role BACKER, status NORMAL. Báo lỗi khi email trùng hoặc thiếu điều khoản.",
    source: "src/app/auth/register/page.tsx, src/app/api/auth/register/route.ts"
  },
  {
    id: "TR-AUTH-002",
    module: "AUTH",
    title: "Đăng nhập xác thực và quản lý phiên người dùng",
    type: "Chức năng",
    priority: "High",
    acceptance: "Đăng nhập hợp lệ cấp JWT session cookie mang id, email, role, isAdmin. Chuyển hướng đúng vai trò. Báo lỗi khi sai mật khẩu hoặc tài khoản bị khóa.",
    source: "src/app/auth/login/page.tsx, src/lib/auth.ts, src/auth.config.ts"
  },
  {
    id: "TR-AUTH-003",
    module: "AUTH",
    title: "Đăng xuất và hủy phiên làm việc",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Xóa cookie phiên của NextAuth, thu hồi quyền truy cập, chuyển hướng về trang chủ hoặc trang đăng nhập.",
    source: "src/components/shared/Navbar.tsx, src/app/api/auth/signout"
  },
  {
    id: "TR-AUTH-004",
    module: "AUTH",
    title: "Khôi phục và đặt lại mật khẩu qua email",
    type: "Chức năng",
    priority: "High",
    acceptance: "Gửi token đặt lại mật khẩu có thời hạn 1 giờ vào email người dùng; cho phép nhập mật khẩu mới và vô hiệu hóa token đã sử dụng.",
    source: "src/app/auth/forgot-password/page.tsx, src/app/api/auth/forgot-password/route.ts"
  },
  {
    id: "TR-AUTH-005",
    module: "AUTH",
    title: "Cập nhật hồ sơ cá nhân và ảnh đại diện",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Cập nhật displayName, bio, phone, avatar qua Cloudinary; lưu vào bảng users; kiểm tra định dạng và kích thước file ảnh.",
    source: "src/app/dashboard/profile/page.tsx, src/app/api/users/profile/route.ts"
  },
  {
    id: "TR-AUTH-006",
    module: "AUTH",
    title: "Kiểm soát truy cập phân quyền người dùng (RBAC)",
    type: "Bảo mật",
    priority: "High",
    acceptance: "Chặn người dùng thường vào /dashboard/admin (trả về 403 Forbidden). Bảo vệ các API quản trị bằng middleware và helper isAdminActor.",
    source: "src/middleware.ts, src/lib/payment/simulate-checkout.ts"
  },

  // ── CAMP (Quản lý Chiến dịch) ─────────────────────────────────────────────
  {
    id: "TR-CAMP-001",
    module: "CAMP",
    title: "Khởi tạo chiến dịch gây quỹ bản nháp (DRAFT)",
    type: "Chức năng",
    priority: "High",
    acceptance: "Tạo chiến dịch với tiêu đề, mô tả, mục tiêu tài chính (> 0đ), hạn chót (> ngày hiện tại), ảnh đại diện; lưu trạng thái DRAFT.",
    source: "src/app/campaigns/create/page.tsx, src/lib/campaign/create-campaign.ts"
  },
  {
    id: "TR-CAMP-002",
    module: "CAMP",
    title: "Áp dụng mô hình gây quỹ All-or-Nothing và Flexible",
    type: "Chức năng",
    priority: "High",
    acceptance: "All-or-Nothing chỉ giải ngân khi đạt 100% mục tiêu tại hạn chót; Flexible cho phép nhận số tiền đã quyên góp bất kể đạt bao nhiêu %.",
    source: "src/lib/campaign/apply-funding-model-update.ts, src/lib/funding-model.ts"
  },
  {
    id: "TR-CAMP-003",
    module: "CAMP",
    title: "Thiết lập các mốc giai đoạn giải ngân chiến dịch",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Cho phép thêm các mốc (milestones) với tỷ lệ % giải ngân, bằng chứng hoàn thành và yêu cầu phê duyệt.",
    source: "src/lib/campaign/campaign-milestones.ts, prisma/schema.prisma (campaign_milestones)"
  },
  {
    id: "TR-CAMP-004",
    module: "CAMP",
    title: "Gửi phê duyệt và Admin xét duyệt chiến dịch",
    type: "Chức năng",
    priority: "High",
    acceptance: "Creator gửi duyệt chuyển sang PENDING_REVIEW; Admin có quyền duyệt (ACTIVE) hoặc từ chối (REJECTED) kèm lý do giải trình.",
    source: "src/app/api/campaigns/[slug]/submit/route.ts, src/app/dashboard/admin/campaigns"
  },
  {
    id: "TR-CAMP-005",
    module: "CAMP",
    title: "Đăng tải bản tin cập nhật tiến độ chiến dịch",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Creator đăng tải bài viết cập nhật tiến độ sử dụng Rich-Text editor, gửi thông báo đến những người đã ủng hộ.",
    source: "src/app/campaigns/[slug]/updates/page.tsx, src/lib/campaign/create-campaign-update.ts"
  },
  {
    id: "TR-CAMP-006",
    module: "CAMP",
    title: "Tự động kết thúc chiến dịch khi đến hạn chót (Cron Job)",
    type: "Hệ thống",
    priority: "High",
    acceptance: "Khi qua deadline, cron job tự động đánh giá trạng thái SUCCEEDED hoặc FAILED; khóa không cho ủng hộ thêm.",
    source: "src/app/api/cron/campaign-deadline/route.ts, src/lib/order-fulfillment.ts"
  },

  // ── REWARD (Phần thưởng & Hội viên) ───────────────────────────────────────
  {
    id: "TR-REWARD-001",
    module: "REWARD",
    title: "Tạo và cấu hình phần thưởng vật lý / quà số",
    type: "Chức năng",
    priority: "High",
    acceptance: "Tạo reward với tiêu đề, giá tiền, số lượng tồn kho, ngày dự kiến giao, phân loại PHYSICAL hoặc DIGITAL.",
    source: "src/app/api/rewards/create/route.ts, prisma/schema.prisma (rewards)"
  },
  {
    id: "TR-REWARD-002",
    module: "REWARD",
    title: "Giữ chỗ tồn kho khi người dùng tạo đơn (Stock Reservation)",
    type: "Chức năng",
    priority: "High",
    acceptance: "Khi tạo đơn PENDING, giảm trừ stock khả dụng; nếu đơn bị hủy hoặc quá hạn, hoàn lại số lượng tồn kho chính xác.",
    source: "src/lib/payment/create-pledge.ts, src/lib/payment/refund.ts"
  },
  {
    id: "TR-REWARD-003",
    module: "REWARD",
    title: "Tạo gói ủng hộ định kỳ theo tháng (Support Tiers)",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Creator cấu hình gói hội viên với số tiền định kỳ hàng tháng, quyền lợi riêng biệt; lưu vào support_tiers.",
    source: "src/components/profile/SupportTiersPanel.tsx, prisma/schema.prisma (support_tiers)"
  },
  {
    id: "TR-REWARD-004",
    module: "REWARD",
    title: "Kích hoạt quyền hội viên từ đơn thanh toán thành công",
    type: "Chức năng",
    priority: "High",
    acceptance: "Khi thanh toán đơn gói hội viên SUCCESS, tạo hoặc gia hạn bản ghi memberships với trạng thái ACTIVE, currentPeriodEnd +30 ngày.",
    source: "src/lib/membership.ts: activateMembershipFromPledge"
  },
  {
    id: "TR-REWARD-005",
    module: "REWARD",
    title: "Hủy tư cách hội viên khi hết hạn hoặc hoàn tiền",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Khi người dùng hủy hoặc đơn hoàn tiền, cập nhật membership sang CANCELED kèm canceledAt; khóa nội dung độc quyền.",
    source: "src/lib/payment/refund.ts, src/lib/payment/simulate-checkout.ts"
  },

  // ── PAY (Thanh toán & Ký quỹ) ─────────────────────────────────────────────
  {
    id: "TR-PAY-001",
    module: "PAY",
    title: "Khởi tạo phiên đặt đơn ủng hộ / mua phần thưởng",
    type: "Chức năng",
    priority: "High",
    acceptance: "Tạo bản ghi pledges với trạng thái PENDING, mã giao dịch duy nhất, tính toán đầy đủ phụ phí, tiền tip, phí vận chuyển.",
    source: "src/app/api/checkout-sessions/route.ts, src/lib/payment/create-pledge.ts"
  },
  {
    id: "TR-PAY-002",
    module: "PAY",
    title: "Thanh toán chuyển khoản trung gian VietQR giữ hộ (Escrow)",
    type: "Chức năng",
    priority: "High",
    acceptance: "Sinh mã VietQR chuẩn mang đúng số tài khoản trung gian của sàn, số tiền và cú pháp đối soát TUTE <mã>; tiền giữ tại sàn.",
    source: "src/app/thanh-toan/chuyen-khoan/page.tsx, src/lib/payment/escrow-account.ts"
  },
  {
    id: "TR-PAY-003",
    module: "PAY",
    title: "Thanh toán qua cổng trực tuyến PayOS / VNPay / MoMo",
    type: "Chức năng",
    priority: "High",
    acceptance: "Tích hợp SDK/API tạo liên kết thanh toán; tiếp nhận webhook callback, xác thực chữ ký số và cập nhật đơn PENDING -> SUCCESS.",
    source: "src/app/api/payment/payos/create/route.ts, src/app/api/payment/vnpay/webhook/route.ts"
  },
  {
    id: "TR-PAY-004",
    module: "PAY",
    title: "Hỗ trợ phương thức nhận hàng trả tiền (COD)",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Đơn vật lý có thể chọn COD; hệ thống ghi nhận isCashOnDelivery: true, ghi nhận đặt cọc hoặc số tiền cần thu khi giao.",
    source: "src/lib/payment/create-cod-pledge.ts, src/app/don-hang/[pledgeId]/page.tsx"
  },
  {
    id: "TR-PAY-005",
    module: "PAY",
    title: "Đối soát và ghi nhận tiền thành công (Settlement)",
    type: "Chức năng",
    priority: "High",
    acceptance: "Chuyển đơn từ PENDING sang SUCCESS; ghi audit log; hạch toán số tiền vào chiến dịch và kích hoạt chứng từ điện tử.",
    source: "src/lib/payment/settle-pledge.ts: settlePledgeAsPaid"
  },
  {
    id: "TR-PAY-006",
    module: "PAY",
    title: "Ngăn chặn giải ngân sớm trước khi kết thúc chiến dịch All-or-Nothing",
    type: "Bảo mật",
    priority: "High",
    acceptance: "Khóa số tiền tại tài khoản trung gian của sàn, Creator không được rút tiền cho đến khi chiến dịch thành công và qua thời hạn khiếu nại.",
    source: "src/lib/order-fulfillment.ts, src/lib/campaign/campaign-milestones.ts"
  },

  // ── SIM (Giả lập Thanh toán & Đối soát) ────────────────────────────────────
  {
    id: "TR-SIM-001",
    module: "SIM",
    title: "Bật / Tắt chế độ giả lập trong cài đặt Quản trị",
    type: "Chức năng",
    priority: "High",
    acceptance: "Admin có quyền chuyển đổi trạng thái giả lập hệ thống; khi bật, người dùng và admin được phép dùng công cụ test.",
    source: "src/lib/platform-settings.ts: isSimulationMode, src/lib/payment/simulate-checkout.ts"
  },
  {
    id: "TR-SIM-002",
    module: "SIM",
    title: "Xác nhận thanh toán giả lập trực tiếp trên màn hình chuyển khoản",
    type: "Chức năng",
    priority: "High",
    acceptance: "Giao diện SimulatedPaySteps hiển thị nút xác nhận giả lập; gửi POST /api/payments/simulate-settle xử lý đơn không trừ tiền thật.",
    source: "src/components/payment/SimulatedPaySteps.tsx, src/app/api/payments/simulate-settle/route.ts"
  },
  {
    id: "TR-SIM-003",
    module: "SIM",
    title: "Gán mã giao dịch chuẩn giả lập SIM- cho đơn thử nghiệm",
    type: "Chức năng",
    priority: "High",
    acceptance: "Đơn giả lập được cập nhật transactionId dạng SIM-<pledgeId>, status: SUCCESS, ghi chú Giả lập thanh toán.",
    source: "src/lib/payment/simulate-checkout.ts: simulatePaidPledges"
  },
  {
    id: "TR-SIM-004",
    module: "SIM",
    title: "Hạch toán thử nghiệm vào số tiền huy động của chiến dịch",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Cộng dồn số tiền đơn giả lập vào currentAmount của chiến dịch để test hiển thị thanh tiến độ và danh sách người ủng hộ.",
    source: "src/lib/payment/simulate-checkout.ts: countSimulated"
  },
  {
    id: "TR-SIM-005",
    module: "SIM",
    title: "Dọn dẹp và xóa sạch toàn bộ đơn giả lập (Wipe Simulation)",
    type: "Chức năng",
    priority: "High",
    acceptance: "Admin gọi DELETE /api/admin/simulation để gỡ bỏ toàn bộ đơn SIM-, trừ lại số tiền chiến dịch và khôi phục dữ liệu thực tế.",
    source: "src/app/api/admin/simulation/route.ts, src/lib/payment/simulate-checkout.ts: wipeSimulatedPledges"
  },

  // ── SHIP (Vận chuyển & Vận đơn) ───────────────────────────────────────────
  {
    id: "TR-SHIP-001",
    module: "SHIP",
    title: "Xem danh sách và lọc đơn hàng đã mua",
    type: "Chức năng",
    priority: "High",
    acceptance: "Trang /don-hang hiển thị danh sách đơn kèm bộ lọc tab: Tất cả, Đang giao, Đã hoàn tất; liên kết đến trang chi tiết.",
    source: "src/app/don-hang/page.tsx"
  },
  {
    id: "TR-SHIP-002",
    module: "SHIP",
    title: "Xem chi tiết đơn hàng và tiến trình 4 bước giao vận",
    type: "Chức năng",
    priority: "High",
    acceptance: "Trang /don-hang/[pledgeId] hiển thị 4 mốc: Đã lên đơn, Đang chuẩn bị, Đang vận chuyển, Đã nhận hàng; thông tin mã vận đơn, địa chỉ.",
    source: "src/app/don-hang/[pledgeId]/page.tsx"
  },
  {
    id: "TR-SHIP-003",
    module: "SHIP",
    title: "Cập nhật đơn vị vận chuyển và mã vận đơn",
    type: "Chức năng",
    priority: "High",
    acceptance: "Admin/Creator nhập nhà vận chuyển (GHTK, GHN, ViettelPost) và trackingNumber, lưu handedToCarrierAt khi giao bưu cục.",
    source: "src/lib/payment/simulate-shipping.ts: advanceSimulatedShipment"
  },
  {
    id: "TR-SHIP-004",
    module: "SHIP",
    title: "Giả lập các bước vận chuyển hàng hóa",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Cho phép Admin chuyển nhanh trạng thái PROCESSING -> SHIPPED -> DELIVERED thông qua giao diện ShipmentActions.",
    source: "src/components/orders/ShipmentActions.tsx, src/app/api/orders/[pledgeId]/simulate/route.ts"
  },
  {
    id: "TR-SHIP-005",
    module: "SHIP",
    title: "Xử lý sự cố giao hàng thất bại và hoàn trả hàng",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Hỗ trợ ghi nhận trạng thái DELIVERY_FAILED, RETURNING, RETURNED kèm lý do thất bại (sai địa chỉ, không nghe máy).",
    source: "src/lib/payment/simulate-shipping.ts, src/app/don-hang/[pledgeId]/page.tsx"
  },

  // ── REFUND (Khiếu nại & Hoàn tiền) ─────────────────────────────────────────
  {
    id: "TR-REFUND-001",
    module: "REFUND",
    title: "Kiểm tra điều kiện hợp lệ để yêu cầu hoàn tiền",
    type: "Quy tắc nghiệp vụ",
    priority: "High",
    acceptance: "Chỉ cho phép yêu cầu hoàn tiền khi đơn SUCCESS, trong thời hạn khiếu nại (3 ngày sau giao hàng hoặc chiến dịch thất bại/hủy).",
    source: "src/lib/payment/refund-rules.ts: canRequestRefund"
  },
  {
    id: "TR-REFUND-002",
    module: "REFUND",
    title: "Người mua gửi yêu cầu hoàn tiền kèm hình ảnh minh chứng",
    type: "Chức năng",
    priority: "High",
    acceptance: "Form RefundActions cho phép nhập lý do, tải ảnh bằng chứng qua Cloudinary; lưu vào refundStatus: REQUESTED.",
    source: "src/components/orders/RefundActions.tsx, src/lib/payment/refund-evidence.ts"
  },
  {
    id: "TR-REFUND-003",
    module: "REFUND",
    title: "Admin thẩm định duyệt hoặc bác bỏ yêu cầu hoàn tiền",
    type: "Chức năng",
    priority: "High",
    acceptance: "Admin xem ảnh minh chứng, bấm Duyệt (APPROVED) hoặc Từ chối (REJECTED) kèm văn bản giải thích gửi người mua.",
    source: "src/app/api/orders/[pledgeId]/refund/route.ts, src/lib/payment/refund.ts"
  },
  {
    id: "TR-REFUND-004",
    module: "REFUND",
    title: "Hoàn tiền giả lập tức thì cho đơn thử nghiệm (Simulated Refund)",
    type: "Chức năng",
    priority: "High",
    acceptance: "Với đơn SIM-, nút Hoàn tiền giả lập ngay thực hiện hoàn tiền lập tức, chuyển status sang REFUNDED mà không cần cổng ngân hàng thật.",
    source: "src/lib/payment/refund.ts: simulateRefund, src/lib/payment/refund-rules.ts: canSimulateRefund"
  },
  {
    id: "TR-REFUND-005",
    module: "REFUND",
    title: "Phục hồi số lượng kho quà và điều chỉnh số tiền chiến dịch",
    type: "Hệ thống",
    priority: "High",
    acceptance: "Khi hoàn tiền thành công, tự động cộng lại tồn kho reward.stock, trừ số tiền hoàn khỏi số tiền huy động của chiến dịch.",
    source: "src/lib/payment/refund.ts: refundPledgeLedger"
  },
  {
    id: "TR-REFUND-006",
    module: "REFUND",
    title: "Thu hồi chứng từ đóng góp và hủy gói hội viên khi hoàn tiền",
    type: "Hệ thống",
    priority: "High",
    acceptance: "Xóa bản ghi donation_certificates liên quan, cập nhật memberships thành CANCELED kèm canceledAt.",
    source: "src/lib/payment/refund.ts, prisma/schema.prisma"
  },

  // ── CHAT (Hội thoại & Tin nhắn) ───────────────────────────────────────────
  {
    id: "TR-CHAT-001",
    module: "CHAT",
    title: "Tìm kiếm người dùng theo tên hoặc email để bắt đầu hội thoại",
    type: "Chức năng",
    priority: "High",
    acceptance: "Tìm kiếm người dùng trong bảng users; xử lý an toàn giá trị null của displayName, trả về danh sách kèm id chuẩn string.",
    source: "src/services/pg/chat.service.ts: searchUsers"
  },
  {
    id: "TR-CHAT-002",
    module: "CHAT",
    title: "Khởi tạo hoặc tải phòng trò chuyện 1-1",
    type: "Chức năng",
    priority: "High",
    acceptance: "Tạo conversation mới giữa 2 người dùng trong PostgreSQL Prisma hoặc mở lại phòng chat cũ nếu đã tồn tại.",
    source: "src/app/api/chat/conversations/route.ts, src/services/pg/chat.service.ts"
  },
  {
    id: "TR-CHAT-003",
    module: "CHAT",
    title: "Gửi và nhận tin nhắn văn bản thời gian thực",
    type: "Chức năng",
    priority: "High",
    acceptance: "Lưu tin nhắn vào bảng messages trong DB; serialize trả về _id dạng string chuẩn; client hiển thị tin nhắn ngay lập tức.",
    source: "src/services/pg/chat.service.ts: createMessage, src/types/chat.types.ts"
  },
  {
    id: "TR-CHAT-004",
    module: "CHAT",
    title: "Gửi tin nhắn kèm tệp đính kèm hình ảnh",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Cho phép đính kèm ảnh, tải lên Cloudinary, lưu URL vào mảng attachments của message; hiển thị thumbnail trong khung chat.",
    source: "src/app/api/chat/upload/route.ts, src/components/chat/ChatBox.tsx"
  },
  {
    id: "TR-CHAT-005",
    module: "CHAT",
    title: "Đánh dấu đã đọc và hiển thị số tin nhắn chưa đọc",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Khi mở phòng chat, gọi API cập nhật lastReadAt; badge thông báo chưa đọc cập nhật giảm về 0.",
    source: "src/app/api/chat/[id]/read/route.ts, src/services/pg/chat.service.ts: markAsRead"
  },
  {
    id: "TR-CHAT-006",
    module: "CHAT",
    title: "Thêm ghi chú nội bộ cho cuộc hội thoại",
    type: "Chức năng",
    priority: "Low",
    acceptance: "Creator hoặc Admin có thể thêm ghi chú riêng về người ủng hộ trong cuộc trò chuyện; lưu vào chat_notes.",
    source: "src/app/api/chat/notes/route.ts"
  },

  // ── BLOG (Blog & Cộng đồng) ───────────────────────────────────────────────
  {
    id: "TR-BLOG-001",
    module: "BLOG",
    title: "Tạo bài viết mới với trình soạn thảo Rich-Text",
    type: "Chức năng",
    priority: "High",
    acceptance: "Nhập tiêu đề, slug tự động, nội dung TipTap phong phú, ảnh đại diện, chọn danh mục và tags; lưu blog_posts.",
    source: "src/app/blog/create/page.tsx, src/lib/blog/blog.service.ts"
  },
  {
    id: "TR-BLOG-002",
    module: "BLOG",
    title: "Quy trình kiểm duyệt bài viết cộng đồng bởi Quản trị viên",
    type: "Chức năng",
    priority: "High",
    acceptance: "Bài viết mới vào trạng thái PENDING; Admin có thể duyệt xuất bản (PUBLISHED) hoặc từ chối (REJECTED) kèm phản hồi.",
    source: "src/app/api/blog/posts/[id]/review/route.ts, src/lib/blog/blog.service.ts"
  },
  {
    id: "TR-BLOG-003",
    module: "BLOG",
    title: "Xem danh sách và chi tiết bài viết đã xuất bản",
    type: "Chức năng",
    priority: "High",
    acceptance: "Trang /blog hiển thị danh sách bài viết kèm phân trang, tìm kiếm; /blog/[slug] hiển thị nội dung chi tiết, tác giả, lượt xem.",
    source: "src/app/blog/page.tsx, src/app/blog/[slug]/page.tsx"
  },
  {
    id: "TR-BLOG-004",
    module: "BLOG",
    title: "Bình luận và trả lời bình luận đa cấp (Nested Comments)",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Người dùng đăng bình luận dưới bài viết; hỗ trợ trả lời phản hồi lồng nhau; kiểm tra nội dung rỗng.",
    source: "src/components/blog/BlogCommentSection.tsx, src/app/api/blog/posts/[id]/comments/route.ts"
  },
  {
    id: "TR-BLOG-005",
    module: "BLOG",
    title: "Thích (Like) và tương tác với bài viết",
    type: "Chức năng",
    priority: "Low",
    acceptance: "Người dùng bấm Like bài viết; hệ thống tăng bộ đếm lượt thích; ngăn chặn spam like nhiều lần từ một tài khoản.",
    source: "src/app/api/blog/posts/[id]/like/route.ts"
  },

  // ── KYC (Định danh & Chứng từ) ─────────────────────────────────────────────
  {
    id: "TR-KYC-001",
    module: "KYC",
    title: "Nộp hồ sơ định danh cá nhân / tổ chức (KYC Submission)",
    type: "Chức năng",
    priority: "High",
    acceptance: "Nhập số CCCD/Hộ chiếu, tải ảnh 2 mặt, giấy tờ tổ chức; lưu trạng thái PENDING vào bảng kyc_requests.",
    source: "src/app/kyc/submit/page.tsx, src/lib/kyc.ts"
  },
  {
    id: "TR-KYC-002",
    module: "KYC",
    title: "Admin thẩm định và phê duyệt hồ sơ KYC",
    type: "Chức năng",
    priority: "High",
    acceptance: "Admin kiểm tra hình ảnh giấy tờ; bấm Duyệt chuyển kycStatus sang APPROVED hoặc Từ chối kèm lý do.",
    source: "src/app/dashboard/admin/kyc/page.tsx, src/app/api/admin/kyc/[id]/review/route.ts"
  },
  {
    id: "TR-KYC-003",
    module: "KYC",
    title: "Ràng buộc bắt buộc hoàn thành KYC trước khi mở chiến dịch nhận quỹ",
    type: "Bảo mật",
    priority: "High",
    acceptance: "Tài khoản chưa hoàn tất KYC bị chặn không được chuyển chiến dịch sang PENDING_REVIEW hoặc ACTIVE.",
    source: "src/lib/campaign/create-campaign.ts, src/lib/permissions.ts"
  },
  {
    id: "TR-KYC-004",
    module: "KYC",
    title: "Tự động phát hành chứng nhận đóng góp gây quỹ (Certificate)",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Sau khi đơn SUCCESS, hệ thống cấp mã chứng nhận duy nhất, cho phép tra cứu công khai tại /chung-tu/[code].",
    source: "src/app/chung-tu/[code]/page.tsx, prisma/schema.prisma (donation_certificates)"
  },
  {
    id: "TR-KYC-005",
    module: "KYC",
    title: "Xuất hóa đơn điện tử / biên lai thanh toán (Invoice)",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Cấp số hóa đơn backer_invoices khi giao hàng hoặc hoàn tất đóng góp; tra cứu tại /hoa-don/[invoiceNumber].",
    source: "src/app/hoa-don/[invoiceNumber]/page.tsx, prisma/schema.prisma (backer_invoices)"
  },

  // ── ADMIN (Quản trị & Cài đặt) ────────────────────────────────────────────
  {
    id: "TR-ADMIN-001",
    module: "ADMIN",
    title: "Bảng điều khiển tổng hợp số liệu tài chính sàn",
    type: "Chức năng",
    priority: "High",
    acceptance: "Hiển thị tổng số tiền gây quỹ, doanh thu phí sàn, số tiền đang ký quỹ, số người dùng mới và tỷ lệ thành công của các dự án.",
    source: "src/app/dashboard/admin/page.tsx, src/app/api/admin/analytics/behavior/route.ts"
  },
  {
    id: "TR-ADMIN-002",
    module: "ADMIN",
    title: "Quản lý danh sách người dùng và khóa tài khoản vi phạm",
    type: "Chức năng",
    priority: "High",
    acceptance: "Admin có quyền tìm kiếm, thay đổi vai trò (BACKER/CREATOR), khóa tài khoản (SUSPENDED) hoặc mở khóa người dùng.",
    source: "src/app/dashboard/admin/users/page.tsx, src/app/api/admin/users/route.ts"
  },
  {
    id: "TR-ADMIN-003",
    module: "ADMIN",
    title: "Tiếp nhận và xử lý báo cáo vi phạm nội dung (Reports)",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Hiển thị danh sách các báo cáo từ cộng đồng; Admin kiểm tra nội dung vi phạm và duyệt xử lý hoặc hủy báo cáo.",
    source: "src/app/dashboard/admin/reports/page.tsx, src/app/api/reports/route.ts"
  },
  {
    id: "TR-ADMIN-004",
    module: "ADMIN",
    title: "Sao kê tài chính minh bạch cho từng chiến dịch",
    type: "Chức năng",
    priority: "High",
    acceptance: "Kết xuất chi tiết các khoản tiền thu vào tài khoản ký quỹ, các đợt giải ngân và các khoản hoàn tiền của từng chiến dịch.",
    source: "src/app/api/campaigns/[slug]/accounting/route.ts"
  },
  {
    id: "TR-ADMIN-005",
    module: "ADMIN",
    title: "Quản lý danh mục và thẻ phân loại chiến dịch",
    type: "Chức năng",
    priority: "Medium",
    acceptance: "Cho phép thêm, sửa, xóa các danh mục ngành (Công nghệ, Nghệ thuật, Từ thiện, Môi trường) hiển thị trên thanh tìm kiếm.",
    source: "src/app/dashboard/admin/categories/page.tsx"
  },

  // ── NFR (Yêu cầu Phi chức năng) ───────────────────────────────────────────
  {
    id: "TR-NFR-001",
    module: "NFR",
    title: "Thời gian đáp ứng của API và tải trang giao diện",
    type: "Phi chức năng",
    priority: "High",
    acceptance: "Thời gian phản hồi của 95% API < 500ms; trang chủ và chi tiết chiến dịch tải trong < 1.5 giây trên mạng 4G/Wifi.",
    source: "Next.js App Router caching, PostgreSQL indexes"
  },
  {
    id: "TR-NFR-002",
    module: "NFR",
    title: "Bảo mật dữ liệu mật khẩu và chống tấn công phổ biến",
    type: "Phi chức năng",
    priority: "High",
    acceptance: "Mật khẩu băm Bcrypt 10 rounds; chống SQL Injection qua Prisma parameterized queries; lọc mã độc XSS qua DOMPurify.",
    source: "src/lib/auth.ts, src/lib/utils.ts, node_modules/dompurify"
  },
  {
    id: "TR-NFR-003",
    module: "NFR",
    title: "Tính toàn vẹn giao dịch tài chính ACID",
    type: "Phi chức năng",
    priority: "High",
    acceptance: "Mọi thao tác thay đổi số dư hoặc đối soát tiền phải nằm trong prisma.$transaction; rollback toàn bộ nếu có lỗi phát sinh.",
    source: "src/lib/payment/settle-pledge.ts, src/lib/payment/refund.ts"
  },
  {
    id: "TR-NFR-004",
    module: "NFR",
    title: "Tương thích đa trình duyệt và thiết bị di động (Responsive)",
    type: "Phi chức năng",
    priority: "Medium",
    acceptance: "Giao diện hiển thị chuẩn xác, không vỡ layout trên Chrome, Edge, Firefox, Safari và các kích thước màn hình từ 375px trở lên.",
    source: "Tailwind CSS responsive classes"
  },
  {
    id: "TR-NFR-005",
    module: "NFR",
    title: "Hỗ trợ đa ngôn ngữ (i18n) và chế độ giao diện sáng/tối",
    type: "Phi chức năng",
    priority: "Low",
    acceptance: "Hỗ trợ chuyển đổi ngôn ngữ Tiếng Việt / Tiếng Anh; chuyển đổi mượt mà Theme Light / Dark không bị chớp màn hình.",
    source: "src/i18n/vi.ts, src/i18n/en.ts, next-themes"
  }
];

module.exports = { TRS };

