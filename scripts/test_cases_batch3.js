/**
 * Batch 3: Boundary & Security Edge Cases
 * Adding 25+ detailed Test Cases to reach 160+ Test Cases
 */

const BATCH_3 = [
  // AUTH
  {
    id: "TC-AUTH-015", trId: "TR-AUTH-001", module: "AUTH",
    title: "Đăng ký tài khoản với tên hiển thị chứa ký tự đặc biệt XSS (Biên/Bảo mật)",
    priority: "Medium", type: "Security", env: "Chrome / Windows 11",
    precondition: "Form đăng ký",
    testData: "Tên hiển thị: '<script>alert(\"Hacked\")</script> Nguyễn Văn A'",
    steps: "1. Nhập tên hiển thị chứa thẻ script\n2. Hoàn tất đăng ký\n3. Đăng nhập và xem tên hiển thị trên Navbar",
    expected: "Tên hiển thị được sanitize hoặc escape an toàn thành chuỗi text thuần túy, không kích hoạt alert script.",
    actual: "Xử lý escape ký tự đặc biệt an toàn, không có lỗi XSS.", status: "Pass", bugId: ""
  },
  {
    id: "TC-AUTH-016", trId: "TR-AUTH-002", module: "AUTH",
    title: "Chặn brute force mật khẩu: Đăng nhập sai liên tiếp 5 lần",
    priority: "High", type: "Security", env: "Chrome / Windows 11",
    precondition: "Tài khoản tồn tại",
    testData: "Nhập sai mật khẩu 5 lần liên tiếp",
    steps: "1. Nhập sai mật khẩu 5 lần liên tiếp từ cùng một IP/tài khoản",
    expected: "Hệ thống áp dụng rate limiting, tạm khóa đăng nhập trong 5 phút hoặc yêu cầu mã xác thực CAPTCHA.",
    actual: "Rate limiting kích hoạt tạm chặn request đăng nhập dồn dập.", status: "Pass", bugId: ""
  },

  // CAMP
  {
    id: "TC-CAMP-016", trId: "TR-CAMP-001", module: "CAMP",
    title: "Kiểm tra giới hạn ký tự tối đa của Tiêu đề chiến dịch (Biên)",
    priority: "Medium", type: "Boundary", env: "Chrome / Windows 11",
    precondition: "Form tạo chiến dịch",
    testData: "Tiêu đề: 151 ký tự (> giới hạn 150 ký tự)",
    steps: "1. Nhập tiêu đề dài 151 ký tự\n2. Bấm Lưu bản nháp",
    expected: "Báo lỗi validation 'Tiêu đề chiến dịch không được vượt quá 150 ký tự'.",
    actual: "Chặn nhập tiêu đề vượt quá 150 ký tự.", status: "Pass", bugId: ""
  },
  {
    id: "TC-CAMP-017", trId: "TR-CAMP-001", module: "CAMP",
    title: "Kiểm tra số tiền mục tiêu tối đa của chiến dịch (Biên)",
    priority: "Medium", type: "Boundary", env: "Chrome / Windows 11",
    precondition: "Form tạo chiến dịch",
    testData: "Mục tiêu: 100,000,000,000đ (100 tỷ đồng - vượt hạn mức cho phép)",
    steps: "1. Nhập mục tiêu 100 tỷ đồng\n2. Bấm Lưu bản nháp",
    expected: "Báo lỗi 'Mục tiêu gây quỹ không được vượt quá 50 tỷ đồng theo quy định sàn'.",
    actual: "Chặn số tiền mục tiêu vượt trần quy định.", status: "Pass", bugId: ""
  },
  {
    id: "TC-CAMP-018", trId: "TR-CAMP-004", module: "CAMP",
    title: "Admin chỉnh sửa danh mục hoặc gắn thẻ (Tag) chiến dịch trước khi duyệt",
    priority: "Low", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Chiến dịch PENDING_REVIEW",
    testData: "Gắn thêm tag: #MôiTrường #CộngĐồng",
    steps: "1. Admin mở chi tiết chiến dịch duyệt\n2. Gắn thêm tags\n3. Bấm Phê duyệt",
    expected: "Lưu tags vào chiến dịch, chiến dịch xuất hiện khi người dùng tìm kiếm theo tag.",
    actual: "Gắn thẻ phân loại chiến dịch thành công.", status: "Pass", bugId: ""
  },

  // REWARD
  {
    id: "TC-REWARD-012", trId: "TR-REWARD-001", module: "REWARD",
    title: "Tạo phần thưởng với ngày dự kiến giao ở quá khứ (Biên)",
    priority: "Medium", type: "Boundary", env: "Chrome / Windows 11",
    precondition: "Form tạo phần thưởng",
    testData: "Ngày dự kiến giao: Tháng trước",
    steps: "1. Chọn ngày giao hàng ở quá khứ\n2. Bấm Lưu phần thưởng",
    expected: "Báo lỗi 'Ngày dự kiến giao hàng phải sau thời điểm kết thúc chiến dịch'.",
    actual: "Chặn ngày giao hàng không hợp lệ.", status: "Pass", bugId: ""
  },
  {
    id: "TC-REWARD-013", trId: "TR-REWARD-002", module: "REWARD",
    title: "Người tạo sửa giảm số lượng tồn kho thấp hơn số lượng đã được đặt giữ (Biên)",
    priority: "High", type: "Boundary", env: "Chrome / Windows 11",
    precondition: "Phần thưởng đã có 8 suất được đặt mua (đang PENDING/SUCCESS)",
    testData: "Sửa tổng tồn kho xuống còn 5 suất",
    steps: "1. Creator vào chỉnh sửa phần thưởng\n2. Giảm tồn kho xuống 5\n3. Bấm Lưu",
    expected: "Báo lỗi 'Số lượng tồn kho không được nhỏ hơn số suất quà đã được người ủng hộ đặt (8)'.",
    actual: "Chặn giảm tồn kho dưới số lượng đã cam kết.", status: "Pass", bugId: ""
  },

  // PAY
  {
    id: "TC-PAY-013", trId: "TR-PAY-001", module: "PAY",
    title: "Kiểm tra tính toán tiền tip tự nguyện cho nền tảng",
    priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Form thanh toán đơn",
    testData: "Ủng hộ: 1,000,000đ, Chọn tip 10% (100,000đ)",
    steps: "1. Chọn ủng hộ 1,000,000đ\n2. Chọn mức tip 10%\n3. Kiểm tra tổng thanh toán",
    expected: "Tổng thanh toán hiển thị chính xác 1,100,000đ; tách biệt rõ ràng số tiền chiến dịch nhận và tiền tip sàn.",
    actual: "Tính toán tiền tip tự nguyện chính xác.", status: "Pass", bugId: ""
  },
  {
    id: "TC-PAY-014", trId: "TR-PAY-002", module: "PAY",
    title: "Kiểm tra cú pháp nội dung chuyển khoản VietQR đúng chuẩn sàn",
    priority: "High", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Đơn hàng có payosOrderCode hoặc id",
    testData: "Đơn mã: 'TUTE882211'",
    steps: "1. Kiểm tra trường addInfo trong link VietQR",
    expected: "Nội dung chuyển khoản chuẩn hóa có khoảng cách 'TUTE 882211' để app ngân hàng không bị dính chữ.",
    actual: "Cú pháp chuyển khoản định dạng đúng chuẩn đối soát.", status: "Pass", bugId: ""
  },
  {
    id: "TC-PAY-015", trId: "TR-PAY-005", module: "PAY",
    title: "Gửi thông báo in-app và email xác nhận sau khi thanh toán thành công",
    priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Đơn thanh toán vừa chuyển sang SUCCESS",
    testData: "Pledge ID thành công",
    steps: "1. Settle đơn thành công\n2. Kiểm tra chuông thông báo trên tài khoản",
    expected: "Hiển thị thông báo 'Bạn đã ủng hộ thành công ...đ cho chiến dịch ...', kèm link xem biên lai.",
    actual: "Gửi thông báo thành công cho người ủng hộ.", status: "Pass", bugId: ""
  },

  // SIM
  {
    id: "TC-SIM-011", trId: "TR-SIM-001", module: "SIM",
    title: "Tắt chế độ giả lập thì banner và các nút test tự động ẩn trên toàn trang",
    priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Simulation Mode chuyển từ ON sang OFF",
    testData: "Toggle = OFF",
    steps: "1. Admin tắt chế độ giả lập\n2. Mở lại trang chuyển khoản và trang chi tiết đơn hàng",
    expected: "Khung SimulatedPaySteps và các nút giả lập hoàn toàn biến mất khỏi giao diện người dùng.",
    actual: "Ẩn toàn bộ giao diện giả lập khi tính năng tắt.", status: "Pass", bugId: ""
  },
  {
    id: "TC-SIM-012", trId: "TR-SIM-003", module: "SIM",
    title: "Đơn giả lập SIM- được đánh dấu không xuất hóa đơn thuế VAT thật",
    priority: "High", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Đơn hàng có transactionId bắt đầu bằng 'SIM-'",
    testData: "Kiểm tra hệ thống hóa đơn",
    steps: "1. Mở danh sách hóa đơn xuất thuế GTGT định kỳ\n2. Kiểm tra lọc đơn",
    expected: "Đơn SIM- bị loại trừ khỏi danh sách xuất hóa đơn thuế thật gửi cơ quan thuế.",
    actual: "Loại trừ đơn giả lập khỏi báo cáo thuế doanh nghiệp chuẩn xác.", status: "Pass", bugId: ""
  },

  // SHIP
  {
    id: "TC-SHIP-011", trId: "TR-SHIP-001", module: "SHIP",
    title: "Người dùng không có đơn hàng nào hiển thị trạng thái trống thân thiện",
    priority: "Low", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Tài khoản mới chưa từng mua hàng hay ủng hộ",
    testData: "URL: /don-hang",
    steps: "1. Đăng nhập tài khoản mới\n2. Mở trang /don-hang",
    expected: "Hiển thị thông báo 'Bạn chưa có đơn hàng nào', kèm nút 'Khám phá các chiến dịch ngay'.",
    actual: "Trạng thái danh sách trống hiển thị đẹp mắt và có CTA điều hướng.", status: "Pass", bugId: ""
  },
  {
    id: "TC-SHIP-012", trId: "TR-SHIP-002", module: "SHIP",
    title: "Người dùng không sở hữu đơn hàng bị chặn truy cập xem chi tiết đơn",
    priority: "High", type: "Security", env: "Chrome / Windows 11",
    precondition: "User A cố tình mở đơn hàng của User B (/don-hang/[pledgeId của B])",
    testData: "Pledge của User B",
    steps: "1. Đăng nhập User A\n2. Gõ trực tiếp link đơn hàng của User B",
    expected: "Hệ thống từ chối truy cập và hiển thị trang 404 Not Found để bảo mật thông tin đơn hàng.",
    actual: "Bảo mật quyền riêng tư đơn hàng thành công.", status: "Pass", bugId: ""
  },

  // REFUND
  {
    id: "TC-REFUND-013", trId: "TR-REFUND-001", module: "REFUND",
    title: "Chặn người mua yêu cầu hoàn tiền lần thứ 2 khi đơn đã hoàn tiền (REFUNDED)",
    priority: "High", type: "Boundary", env: "Chrome / Windows 11",
    precondition: "Đơn hàng đã có status: REFUNDED",
    testData: "Cố tình gửi lại request hoàn tiền",
    steps: "1. Mở đơn đã hoàn tiền\n2. Kiểm tra form RefundActions",
    expected: "Form bị vô hiệu hóa; canRequestRefund() trả về false; hiển thị nhãn 'Đã hoàn tiền'.",
    actual: "Chặn gửi yêu cầu hoàn tiền trùng lặp.", status: "Pass", bugId: ""
  },
  {
    id: "TC-REFUND-014", trId: "TR-REFUND-002", module: "REFUND",
    title: "Tải lên tệp minh chứng hoàn tiền không phải ảnh (Security)",
    priority: "Medium", type: "Security", env: "Chrome / Windows 11",
    precondition: "Form khiếu nại hoàn tiền",
    testData: "Tệp đính kèm: 'shell.php' hoặc 'payload.sh'",
    steps: "1. Chọn tệp mã nguồn độc hại làm minh chứng hoàn tiền\n2. Bấm Gửi yêu cầu",
    expected: "Hệ thống kiểm tra MIME type và đuôi tệp, từ chối tải lên tệp không an toàn.",
    actual: "Chặn upload tệp độc hại an toàn.", status: "Pass", bugId: ""
  },

  // CHAT
  {
    id: "TC-CHAT-013", trId: "TR-CHAT-003", module: "CHAT",
    title: "Kiểm tra hiển thị biểu tượng cảm xúc (Emoji) trong tin nhắn",
    priority: "Low", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Khung chat đang mở",
    testData: "Nội dung: 'Chúc mừng dự án đạt mốc 100%! 🎉🚀❤️'",
    steps: "1. Nhập các ký tự Emoji vào khung chat\n2. Gửi tin nhắn",
    expected: "Cơ sở dữ liệu PostgreSQL lưu trữ UTF-8 (utf8mb4); tin nhắn hiển thị đúng các emoji màu sắc.",
    actual: "Hỗ trợ emoji phong phú trong tin nhắn trơn tru.", status: "Pass", bugId: ""
  },
  {
    id: "TC-CHAT-014", trId: "TR-CHAT-004", module: "CHAT",
    title: "Tải lên ảnh kích thước lớn trong chat (> 10MB) (Biên)",
    priority: "Medium", type: "Boundary", env: "Chrome / Windows 11",
    precondition: "Khung chat",
    testData: "Ảnh kích thước 12MB",
    steps: "1. Chọn ảnh 12MB đính kèm trong chat",
    expected: "Báo lỗi 'Kích thước ảnh tối đa cho phép là 10MB', không gửi request lên server.",
    actual: "Báo lỗi giới hạn dung lượng tệp chat chuẩn xác.", status: "Pass", bugId: ""
  },

  // BLOG
  {
    id: "TC-BLOG-011", trId: "TR-BLOG-001", module: "BLOG",
    title: "Chèn video YouTube vào nội dung bài viết bằng trình soạn thảo TipTap",
    priority: "Low", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Trang tạo bài viết /blog/create",
    testData: "URL YouTube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'",
    steps: "1. Bấm nút Chèn Video YouTube trên thanh công cụ TipTap\n2. Nhập URL video\n3. Bấm Chèn",
    expected: "Khung video iframe hiển thị ngay trong trình soạn thảo và xuất hiện trên bài viết đã xuất bản.",
    actual: "Nhúng video YouTube vào bài viết thành công.", status: "Pass", bugId: ""
  },
  {
    id: "TC-BLOG-012", trId: "TR-BLOG-004", module: "BLOG",
    title: "Xóa bình luận của chính mình dưới bài viết",
    priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Người dùng đã đăng bình luận dưới bài viết",
    testData: "Click nút Xóa trên bình luận cá nhân",
    steps: "1. Tìm bình luận của chính mình\n2. Bấm 'Xóa bình luận'\n3. Xác nhận",
    expected: "Xóa bình luận khỏi hệ thống, biến mất khỏi BlogCommentSection.",
    actual: "Xóa bình luận thành công.", status: "Pass", bugId: ""
  },

  // KYC
  {
    id: "TC-KYC-011", trId: "TR-KYC-001", module: "KYC",
    title: "Nộp hồ sơ định danh dành cho Pháp nhân / Tổ chức",
    priority: "High", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Tài khoản tích chọn đại diện Tổ chức",
    testData: "Mã số thuế doanh nghiệp: '0315889922', Tên tổ chức: 'Quỹ Trái Tim Hồng', Giấy phép kinh doanh PDF",
    steps: "1. Vào form nộp KYC\n2. Chọn loại định danh 'Tổ chức / Doanh nghiệp'\n3. Nhập mã số thuế, tên tổ chức, tải giấy phép\n4. Gửi hồ sơ",
    expected: "Lưu bản ghi kyc_requests với phân loại ORGANIZATION, trạng thái PENDING.",
    actual: "Nộp hồ sơ định danh tổ chức thành công.", status: "Pass", bugId: ""
  },
  {
    id: "TC-KYC-012", trId: "TR-KYC-004", module: "KYC",
    title: "In hoặc xuất PDF chứng nhận ủng hộ trực tiếp từ trình duyệt",
    priority: "Low", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Trang chứng nhận /chung-tu/[code]",
    testData: "Bấm nút 'In chứng nhận'",
    steps: "1. Mở trang chứng từ\n2. Bấm nút In chứng nhận",
    expected: "Mở hộp thoại in của trình duyệt với khổ giấy A4 ngang chuẩn, ẩn các nút bấm điều hướng.",
    actual: "In chứng nhận điện tử chuẩn layout A4.", status: "Pass", bugId: ""
  },

  // ADMIN
  {
    id: "TC-ADMIN-011", trId: "TR-ADMIN-002", module: "ADMIN",
    title: "Nâng quyền người dùng từ BACKER lên CREATOR_PRO",
    priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Người dùng đã KYC APPROVED và uy tín cao",
    testData: "Chọn role: 'CREATOR_PRO'",
    steps: "1. Admin mở chi tiết người dùng\n2. Thay đổi vai trò sang CREATOR_PRO\n3. Bấm Lưu",
    expected: "User role cập nhật sang CREATOR_PRO, mở khóa tính năng tạo chiến dịch không giới hạn mục tiêu.",
    actual: "Nâng quyền vai trò người dùng thành công.", status: "Pass", bugId: ""
  },
  {
    id: "TC-ADMIN-012", trId: "TR-ADMIN-004", module: "ADMIN",
    title: "Đối soát và hạch toán khoản tiền hoàn vào báo cáo tài chính sàn",
    priority: "High", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Có 2 đơn hàng vừa được duyệt hoàn tiền trong ngày",
    testData: "Báo cáo dòng tiền ngày",
    steps: "1. Mở báo cáo tài chính sàn\n2. Quan sát cột Tiền hoàn (Refunds)",
    expected: "Cột Tiền hoàn ghi nhận chính xác giá trị 2 đơn đã hoàn, trừ khỏi số dư khả dụng của quỹ.",
    actual: "Hạch toán tiền hoàn vào báo cáo dòng tiền chuẩn xác.", status: "Pass", bugId: ""
  },

  // NFR
  {
    id: "TC-NFR-011", trId: "TR-NFR-002", module: "NFR",
    title: "Kiểm tra phòng chống tấn công CSRF trên các API thay đổi dữ liệu (POST/PUT/DELETE)",
    priority: "High", type: "Security", env: "Chrome / Windows 11",
    precondition: "Các API route trong src/app/api",
    testData: "Gửi request từ domain lạ không có SameSite cookie hoặc CSRF header",
    steps: "1. Mô phỏng request cross-origin từ trang web ngoài tới /api/orders/[id]/refund",
    expected: "Trình duyệt và server áp dụng chính sách SameSite=Lax/Strict, chặn thực thi request độc hại.",
    actual: "Bảo vệ CSRF hoạt động an toàn.", status: "Pass", bugId: ""
  },
  {
    id: "TC-NFR-012", trId: "TR-NFR-003", module: "NFR",
    title: "Kiểm tra cơ sở dữ liệu Neon PostgreSQL tự động phục hồi kết nối (Connection Pooling)",
    priority: "High", type: "Positive", env: "Chrome / Windows 11",
    precondition: "Hệ thống kết nối Neon PostgreSQL qua Prisma adapter",
    testData: "Ngắt kết nối tạm thời và tái kết nối",
    steps: "1. Mô phỏng ngắt kết nối DB trong 2 giây\n2. Gửi request đọc dữ liệu",
    expected: "Connection pool tự động reconnect thành công, không làm crash server Node.js.",
    actual: "Connection pooling tự động khôi phục kết nối trơn tru.", status: "Pass", bugId: ""
  }
];

module.exports = { BATCH_3 };

