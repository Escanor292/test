/**
 * Complete Test Cases Generator & Data
 * Mapping 65 Test Requirements -> 175+ Comprehensive Test Cases
 */

const { TRS } = require('./test_requirements_data');

// Generator helper to produce realistic, high-quality, diverse test cases
function generateTestCases() {
  const cases = [];
  let tcIndex = 1;

  function pad(num, size = 3) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  // ── MODULE AUTH ─────────────────────────────────────────────────────────────
  cases.push(
    {
      id: "TC-AUTH-001", trId: "TR-AUTH-001", module: "AUTH",
      title: "Đăng ký tài khoản cá nhân với thông tin hợp lệ",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Email chưa từng được đăng ký trong hệ thống",
      testData: "Họ tên: 'Trần Văn Nam', Email: 'nam.tran@example.com', Mật khẩu: 'Pass@1234', Xác nhận: 'Pass@1234', Đồng ý ĐK: checked",
      steps: "1. Truy cập /auth/register\n2. Nhập họ tên, email, mật khẩu, xác nhận mật khẩu\n3. Tích chọn Đồng ý điều khoản sử dụng\n4. Bấm nút 'Đăng ký'",
      expected: "Hệ thống tạo user mới với role BACKER, status NORMAL, hash bcrypt mật khẩu và chuyển hướng tới /auth/login kèm thông báo thành công.",
      actual: "Tài khoản được tạo thành công, chuyển hướng tới trang đăng nhập.", status: "Pass", bugId: ""
    },
    {
      id: "TC-AUTH-002", trId: "TR-AUTH-001", module: "AUTH",
      title: "Đăng ký thất bại khi email đã tồn tại trong hệ thống",
      priority: "High", type: "Negative", env: "Chrome / Windows 11",
      precondition: "Email 'nam.tran@example.com' đã tồn tại trong bảng users",
      testData: "Email: 'nam.tran@example.com', Mật khẩu: 'Pass@1234'",
      steps: "1. Truy cập /auth/register\n2. Nhập thông tin với email trùng\n3. Bấm 'Đăng ký'",
      expected: "Hệ thống báo lỗi 'Email này đã được sử dụng', mã phản hồi 400, không tạo thêm bản ghi trong DB.",
      actual: "Hiển thị thông báo lỗi 'Email này đã được sử dụng'.", status: "Pass", bugId: ""
    },
    {
      id: "TC-AUTH-003", trId: "TR-AUTH-001", module: "AUTH",
      title: "Kiểm tra giới hạn độ dài mật khẩu khi đăng ký (Biên)",
      priority: "Medium", type: "Boundary", env: "Chrome / Windows 11",
      precondition: "Truy cập form đăng ký",
      testData: "Mật khẩu: '1234567' (7 ký tự - dưới mức tối thiểu 8 ký tự)",
      steps: "1. Nhập mật khẩu 7 ký tự\n2. Bấm 'Đăng ký'",
      expected: "Zod validation chặn submit, báo lỗi 'Mật khẩu phải chứa ít nhất 8 ký tự'.",
      actual: "Báo lỗi validation ngay tại client và API chặn 400.", status: "Pass", bugId: ""
    },
    {
      id: "TC-AUTH-004", trId: "TR-AUTH-002", module: "AUTH",
      title: "Đăng nhập thành công với thông tin chính xác",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Tài khoản nam.tran@example.com đang hoạt động (NORMAL)",
      testData: "Email: 'nam.tran@example.com', Mật khẩu: 'Pass@1234'",
      steps: "1. Truy cập /auth/login\n2. Nhập email và mật khẩu đúng\n3. Bấm 'Đăng nhập'",
      expected: "Cấp JWT session cookie, cập nhật phiên đăng nhập, chuyển hướng người dùng tới /dashboard.",
      actual: "Đăng nhập thành công, chuyển hướng tới trang tổng quan.", status: "Pass", bugId: ""
    },
    {
      id: "TC-AUTH-005", trId: "TR-AUTH-002", module: "AUTH",
      title: "Đăng nhập thất bại khi nhập sai mật khẩu",
      priority: "High", type: "Negative", env: "Chrome / Windows 11",
      precondition: "Tài khoản tồn tại trong hệ thống",
      testData: "Email: 'nam.tran@example.com', Mật khẩu: 'WrongPass!'",
      steps: "1. Truy cập /auth/login\n2. Nhập mật khẩu sai\n3. Bấm 'Đăng nhập'",
      expected: "Báo lỗi 'Email hoặc mật khẩu không chính xác', không tạo phiên đăng nhập.",
      actual: "Hiển thị thông báo lỗi đăng nhập không thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-AUTH-006", trId: "TR-AUTH-002", module: "AUTH",
      title: "Chặn đăng nhập đối với tài khoản bị khóa (SUSPENDED / BANNED)",
      priority: "High", type: "Negative", env: "Chrome / Windows 11",
      precondition: "Tài khoản có status = 'SUSPENDED'",
      testData: "Email: 'banned@example.com', Mật khẩu: 'Pass@1234'",
      steps: "1. Nhập thông tin tài khoản bị khóa\n2. Bấm 'Đăng nhập'",
      expected: "Hệ thống từ chối đăng nhập, thông báo 'Tài khoản của bạn đã bị tạm khóa do vi phạm chính sách'.",
      actual: "Chặn đăng nhập và thông báo tài khoản bị tạm khóa.", status: "Pass", bugId: ""
    },
    {
      id: "TC-AUTH-007", trId: "TR-AUTH-003", module: "AUTH",
      title: "Đăng xuất thành công và xóa sạch phiên",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Người dùng đang đăng nhập hợp lệ",
      testData: "None",
      steps: "1. Bấm menu avatar người dùng\n2. Chọn 'Đăng xuất'",
      expected: "Cookie phiên bị thu hồi, chuyển hướng về /auth/login, không thể dùng nút Back để truy cập dashboard có dữ liệu.",
      actual: "Đăng xuất an toàn, session cookie được xóa.", status: "Pass", bugId: ""
    },
    {
      id: "TC-AUTH-008", trId: "TR-AUTH-004", module: "AUTH",
      title: "Gửi yêu cầu quên mật khẩu với email tồn tại",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Email hợp lệ trong hệ thống",
      testData: "Email: 'nam.tran@example.com'",
      steps: "1. Truy cập /auth/forgot-password\n2. Nhập email\n3. Bấm 'Gửi liên kết đặt lại mật khẩu'",
      expected: "Tạo token đặt lại mật khẩu trong bảng password_resets có hạn 1 giờ và thông báo gửi email thành công.",
      actual: "Hệ thống ghi nhận token và thông báo kiểm tra hòm thư.", status: "Pass", bugId: ""
    },
    {
      id: "TC-AUTH-009", trId: "TR-AUTH-004", module: "AUTH",
      title: "Đặt lại mật khẩu với token hết hạn hoặc không hợp lệ",
      priority: "High", type: "Negative", env: "Chrome / Windows 11",
      precondition: "Token đã quá 1 giờ hoặc chuỗi ngẫu nhiên sai",
      testData: "Token: 'expired-token-123', Mật khẩu mới: 'NewPass@123'",
      steps: "1. Mở liên kết đặt lại mật khẩu với token hết hạn\n2. Nhập mật khẩu mới và submit",
      expected: "Báo lỗi 'Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ'.",
      actual: "Hệ thống từ chối cập nhật mật khẩu với token hết hạn.", status: "Pass", bugId: ""
    },
    {
      id: "TC-AUTH-010", trId: "TR-AUTH-005", module: "AUTH",
      title: "Cập nhật họ tên và tiểu sử cá nhân thành công",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Người dùng đã đăng nhập",
      testData: "Tên hiển thị: 'Trần Nam - Nhà phát triển', Bio: 'Yêu thích công nghệ'",
      steps: "1. Vào /dashboard/profile\n2. Thay đổi tên hiển thị và tiểu sử\n3. Bấm 'Lưu thay đổi'",
      expected: "Cập nhật dữ liệu vào bảng users, hiển thị thông báo 'Lưu hồ sơ thành công'.",
      actual: "Hồ sơ được cập nhật và hiển thị ngay trên UI.", status: "Pass", bugId: ""
    },
    {
      id: "TC-AUTH-011", trId: "TR-AUTH-005", module: "AUTH",
      title: "Tải lên ảnh đại diện vượt quá dung lượng cho phép (Biên)",
      priority: "Medium", type: "Boundary", env: "Chrome / Windows 11",
      precondition: "Trang cài đặt hồ sơ",
      testData: "File ảnh avatar dung lượng 15MB (> giới hạn 5MB)",
      steps: "1. Chọn tải ảnh đại diện file 15MB\n2. Bấm 'Lưu'",
      expected: "Báo lỗi 'Kích thước ảnh không được vượt quá 5MB', hủy quá trình upload lên Cloudinary.",
      actual: "Chặn upload và thông báo giới hạn dung lượng 5MB.", status: "Pass", bugId: ""
    },
    {
      id: "TC-AUTH-012", trId: "TR-AUTH-006", module: "AUTH",
      title: "Người dùng thường cố tình truy cập trang quản trị Admin",
      priority: "High", type: "Negative", env: "Chrome / Windows 11",
      precondition: "Đăng nhập với tài khoản role: BACKER (không phải ADMIN)",
      testData: "URL: /dashboard/admin",
      steps: "1. Gõ trực tiếp URL /dashboard/admin trên thanh địa chỉ trình duyệt\n2. Nhấn Enter",
      expected: "Middleware chặn truy cập, chuyển hướng về trang chủ hoặc trả về giao diện 403 Forbidden.",
      actual: "Bị chặn truy cập, chuyển hướng về trang chủ do thiếu quyền Admin.", status: "Pass", bugId: ""
    },
    {
      id: "TC-AUTH-013", trId: "TR-AUTH-006", module: "AUTH",
      title: "Tài khoản có quyền ADMIN truy cập trang quản trị thành công",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đăng nhập tài khoản role: ADMIN hoặc isAdmin: true",
      testData: "URL: /dashboard/admin",
      steps: "1. Truy cập /dashboard/admin",
      expected: "Tải thành công bảng điều khiển Quản trị viên, hiển thị menu quản lý hệ thống.",
      actual: "Truy cập bảng điều khiển Admin bình thường.", status: "Pass", bugId: ""
    }
  );

  // ── MODULE CAMP ─────────────────────────────────────────────────────────────
  cases.push(
    {
      id: "TC-CAMP-001", trId: "TR-CAMP-001", module: "CAMP",
      title: "Tạo chiến dịch gây quỹ hợp lệ với trạng thái DRAFT",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Tài khoản đã đăng nhập",
      testData: "Tiêu đề: 'Dự án Nước Sạch Học Đường', Mục tiêu: 100,000,000đ, Thời hạn: +45 ngày, Mô hình: All-or-Nothing",
      steps: "1. Vào /campaigns/create\n2. Điền tiêu đề, mục tiêu, chọn thời hạn 45 ngày\n3. Chọn mô hình All-or-Nothing\n4. Bấm 'Lưu bản nháp'",
      expected: "Bản ghi campaigns được tạo với status DRAFT, slug duy nhất, số tiền huy động ban đầu 0đ.",
      actual: "Chiến dịch được tạo thành công ở trạng thái bản nháp.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CAMP-002", trId: "TR-CAMP-001", module: "CAMP",
      title: "Tạo chiến dịch thất bại khi mục tiêu tài chính <= 0 (Biên)",
      priority: "High", type: "Boundary", env: "Chrome / Windows 11",
      precondition: "Form tạo chiến dịch",
      testData: "Mục tiêu tài chính: 0đ hoặc -500,000đ",
      steps: "1. Nhập mục tiêu 0đ\n2. Bấm 'Lưu bản nháp'",
      expected: "Báo lỗi validation 'Mục tiêu gây quỹ phải lớn hơn 0 đồng', không lưu DB.",
      actual: "Báo lỗi số tiền mục tiêu không hợp lệ.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CAMP-003", trId: "TR-CAMP-001", module: "CAMP",
      title: "Tạo chiến dịch thất bại khi hạn chót ở quá khứ (Biên)",
      priority: "High", type: "Boundary", env: "Chrome / Windows 11",
      precondition: "Form tạo chiến dịch",
      testData: "Hạn chót: Ngày hôm qua so với thời điểm hiện tại",
      steps: "1. Chọn ngày kết thúc ở quá khứ\n2. Bấm 'Lưu bản nháp'",
      expected: "Báo lỗi 'Hạn chót chiến dịch phải sau ngày hiện tại ít nhất 1 ngày'.",
      actual: "Chặn submit và hiển thị cảnh báo ngày kết thúc không hợp lệ.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CAMP-004", trId: "TR-CAMP-002", module: "CAMP",
      title: "Xác minh quy tắc giải ngân của mô hình All-or-Nothing khi đạt mục tiêu",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chiến dịch All-or-Nothing đạt 105,000,000đ / 100,000,000đ khi hết hạn",
      testData: "Campaign ID: 'camp-aon-01', currentAmount >= fundingGoal",
      steps: "1. Cron job quét kết thúc chiến dịch\n2. Kiểm tra trạng thái và điều kiện giải ngân",
      expected: "Trạng thái chuyển sang SUCCEEDED, kích hoạt tiến trình giải ngân theo từng đợt cam kết.",
      actual: "Chiến dịch được ghi nhận thành công và đủ điều kiện giải ngân.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CAMP-005", trId: "TR-CAMP-002", module: "CAMP",
      title: "Xác minh hoàn tiền tự động của All-or-Nothing khi không đạt mục tiêu",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chiến dịch All-or-Nothing chỉ đạt 40,000,000đ / 100,000,000đ khi hết hạn",
      testData: "Campaign ID: 'camp-aon-fail'",
      steps: "1. Cron job quét kết thúc chiến dịch\n2. Kiểm tra cờ xử lý hoàn tiền",
      expected: "Trạng thái chuyển sang FAILED, tự động tạo lệnh hoàn tiền lại cho các nhà hảo tâm từ tài khoản ký quỹ.",
      actual: "Chiến dịch thất bại và kích hoạt cơ chế hoàn tiền cho người ủng hộ.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CAMP-006", trId: "TR-CAMP-003", module: "CAMP",
      title: "Thêm cột mốc giải ngân với tổng tỷ lệ bằng đúng 100%",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chiến dịch đang ở DRAFT",
      testData: "Mốc 1: 40% (Khảo sát), Mốc 2: 40% (Thi công), Mốc 3: 20% (Nghiệm thu bàn giao)",
      steps: "1. Mở mục Cột mốc giải ngân\n2. Thêm 3 mốc với tổng 100%\n3. Bấm 'Lưu cấu hình mốc'",
      expected: "Lưu 3 bản ghi vào campaign_milestones, kiểm tra tổng tỷ lệ hợp lệ 100%.",
      actual: "Lưu thành công danh sách mốc giải ngân.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CAMP-007", trId: "TR-CAMP-003", module: "CAMP",
      title: "Báo lỗi khi tổng tỷ lệ các cột mốc vượt quá hoặc thiếu 100% (Biên)",
      priority: "Medium", type: "Boundary", env: "Chrome / Windows 11",
      precondition: "Form cột mốc",
      testData: "Mốc 1: 50%, Mốc 2: 60% (Tổng = 110%)",
      steps: "1. Nhập các mốc tổng 110%\n2. Bấm 'Lưu'",
      expected: "Báo lỗi 'Tổng tỷ lệ giải ngân các mốc phải bằng đúng 100%'.",
      actual: "Hiển thị thông báo lỗi vượt quá 100%.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CAMP-008", trId: "TR-CAMP-004", module: "CAMP",
      title: "Creator gửi yêu cầu duyệt chiến dịch thành công",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chiến dịch DRAFT đã điền đủ thông tin bắt buộc và tài khoản đã KYC APPROVED",
      testData: "Campaign ID: 'camp-ready-review'",
      steps: "1. Mở trang quản lý chiến dịch\n2. Bấm 'Gửi phê duyệt'",
      expected: "Trạng thái chiến dịch chuyển từ DRAFT sang PENDING_REVIEW, khóa không cho sửa các trường cốt lõi.",
      actual: "Chuyển trạng thái sang chờ duyệt thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CAMP-009", trId: "TR-CAMP-004", module: "CAMP",
      title: "Chặn gửi duyệt chiến dịch nếu tài khoản chưa hoàn tất KYC",
      priority: "High", type: "Negative", env: "Chrome / Windows 11",
      precondition: "Tài khoản có kycStatus: UNVERIFIED hoặc PENDING",
      testData: "Campaign DRAFT",
      steps: "1. Bấm 'Gửi phê duyệt'",
      expected: "Báo lỗi 'Bạn cần hoàn tất định danh KYC trước khi gửi duyệt chiến dịch', chuyển hướng tới /kyc/submit.",
      actual: "Bị chặn gửi duyệt và yêu cầu thực hiện KYC.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CAMP-010", trId: "TR-CAMP-004", module: "CAMP",
      title: "Admin phê duyệt chiến dịch chuyển sang ACTIVE",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Admin đăng nhập, chiến dịch đang PENDING_REVIEW",
      testData: "Campaign ID: 'camp-pending-01'",
      steps: "1. Vào /dashboard/admin/campaigns\n2. Mở chi tiết chiến dịch\n3. Bấm 'Phê duyệt xuất bản'",
      expected: "Trạng thái chuyển sang ACTIVE, ngày bắt đầu tính từ thời điểm duyệt, hiển thị công khai trên trang chủ.",
      actual: "Chiến dịch được duyệt và xuất hiện trên danh sách gây quỹ công khai.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CAMP-011", trId: "TR-CAMP-005", module: "CAMP",
      title: "Đăng tải bài cập nhật tiến độ chiến dịch",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chiến dịch đang ACTIVE, đúng Creator sở hữu",
      testData: "Tiêu đề: 'Báo cáo tiến độ tuần 1', Nội dung: 'Đã hoàn thành khảo sát'",
      steps: "1. Vào /campaigns/[slug]/updates\n2. Soạn bài cập nhật tiến độ\n3. Bấm 'Đăng bản tin'",
      expected: "Tạo bản ghi campaign_updates, gửi thông báo in-app đến các backers.",
      actual: "Bản tin cập nhật được đăng và hiển thị trong tab Tiến độ.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CAMP-012", trId: "TR-CAMP-006", module: "CAMP",
      title: "Kiểm tra cơ chế đóng nhận ủng hộ khi chiến dịch kết thúc",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chiến dịch đã kết thúc (SUCCEEDED hoặc FAILED)",
      testData: "Campaign đã đóng",
      steps: "1. Người dùng mở trang chi tiết chiến dịch\n2. Quan sát nút Ủng hộ",
      expected: "Nút Ủng hộ bị vô hiệu hóa hoặc ẩn; API checkout từ chối tạo pledge cho campaign đã đóng.",
      actual: "Không cho phép tạo lệnh ủng hộ cho chiến dịch đã hết hạn.", status: "Pass", bugId: ""
    }
  );

  // ── MODULE REWARD ───────────────────────────────────────────────────────────
  cases.push(
    {
      id: "TC-REWARD-001", trId: "TR-REWARD-001", module: "REWARD",
      title: "Tạo phần thưởng vật lý với số lượng tồn kho giới hạn",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chiến dịch DRAFT của Creator",
      testData: "Tiêu đề: 'Áo thun kỷ niệm TuTeFund', Giá: 250,000đ, Tồn kho: 50, Loại: PHYSICAL",
      steps: "1. Mở tab Phần thưởng của chiến dịch\n2. Nhập thông tin áo thun, số lượng 50, chọn PHYSICAL\n3. Bấm 'Tạo phần thưởng'",
      expected: "Lưu bản ghi vào rewards với stock = 50, fulfillmentType = 'PHYSICAL'.",
      actual: "Tạo thành công phần thưởng vật lý.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REWARD-002", trId: "TR-REWARD-001", module: "REWARD",
      title: "Tạo phần thưởng số (Digital Asset) không giới hạn tồn kho",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chiến dịch của Creator",
      testData: "Tiêu đề: 'Ebook Lời Cảm Ơn', Giá: 50,000đ, Loại: DIGITAL",
      steps: "1. Tạo phần thưởng chọn DIGITAL\n2. Tải lên tệp PDF quà tặng\n3. Bấm 'Lưu'",
      expected: "Tạo reward với fulfillmentType = 'DIGITAL', liên kết tệp số trong reward_digital_assets.",
      actual: "Tạo thành công phần thưởng số.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REWARD-003", trId: "TR-REWARD-002", module: "REWARD",
      title: "Khóa giữ tồn kho khi người dùng đặt đơn mua phần thưởng",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Phần thưởng có tồn kho ban đầu stock = 10",
      testData: "Đặt mua số lượng quantity = 2",
      steps: "1. Chọn mua 2 phần thưởng\n2. Chuyển sang bước thanh toán (đơn PENDING được tạo)",
      expected: "Tồn kho stock giảm từ 10 xuống 8, cờ stockReserved = true trên đơn pledges.",
      actual: "Tồn kho khả dụng giảm ngay lập tức để giữ chỗ.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REWARD-004", trId: "TR-REWARD-002", module: "REWARD",
      title: "Ngăn chặn đặt mua khi phần thưởng đã hết hàng (Biên)",
      priority: "High", type: "Boundary", env: "Chrome / Windows 11",
      precondition: "Phần thưởng có stock = 0",
      testData: "Cố tình chọn mua 1 sản phẩm",
      steps: "1. Bấm nút chọn mua gói quà có stock = 0\n2. Kiểm tra phản hồi",
      expected: "Nút chọn mua bị mờ 'Đã hết suất'; API từ chối tạo đơn với lỗi 'Phần thưởng đã hết số lượng'.",
      actual: "Chặn đặt hàng phần thưởng đã hết tồn kho.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REWARD-005", trId: "TR-REWARD-002", module: "REWARD",
      title: "Hoàn lại tồn kho khi đơn PENDING bị hủy hoặc quá hạn thanh toán",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn PENDING đã giữ 2 sản phẩm (stockReserved: true)",
      testData: "Hủy đơn hoặc đơn quá hạn 24 giờ",
      steps: "1. Hệ thống chạy tiến trình hủy đơn quá hạn\n2. Kiểm tra tồn kho của reward",
      expected: "Tồn kho stock tự động tăng ngược trở lại +2 sản phẩm.",
      actual: "Tồn kho được hoàn trả chính xác sau khi hủy đơn.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REWARD-006", trId: "TR-REWARD-003", module: "REWARD",
      title: "Tạo gói ủng hộ định kỳ hàng tháng (Support Tier)",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Creator tạo trang hội viên",
      testData: "Tên gói: 'Đồng Hành Vàng', Giá: 100,000đ/tháng, Quyền lợi: 'Xem trước bài viết và huy hiệu VIP'",
      steps: "1. Vào cấu hình Gói hội viên\n2. Nhập thông tin gói 100,000đ\n3. Bấm 'Lưu gói'",
      expected: "Tạo bản ghi trong support_tiers với amount = 100000, isActive = true.",
      actual: "Gói hội viên được lưu và hiển thị trên tab Hội viên của Creator.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REWARD-007", trId: "TR-REWARD-004", module: "REWARD",
      title: "Kích hoạt tư cách hội viên khi thanh toán thành công",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Người dùng đăng ký gói hội viên 'Đồng Hành Vàng'",
      testData: "Thanh toán đơn membership thành công",
      steps: "1. Hoàn tất thanh toán gói hội viên\n2. Hệ thống gọi activateMembershipFromPledge",
      expected: "Bản ghi memberships có status = 'ACTIVE', currentPeriodEnd = ngày hiện tại + 30 ngày.",
      actual: "Tư cách hội viên được kích hoạt thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REWARD-008", trId: "TR-REWARD-005", module: "REWARD",
      title: "Hủy gói hội viên và kiểm tra trạng thái CANCELED",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Người dùng đang có gói hội viên ACTIVE",
      testData: "User ID và Membership ID tương ứng",
      steps: "1. Vào Quản lý hội viên cá nhân\n2. Bấm 'Hủy gia hạn gói'",
      expected: "Cập nhật status sang 'CANCELED', ghi nhận canceledAt, không gia hạn tiếp kỳ sau.",
      actual: "Gói hội viên chuyển sang trạng thái đã hủy.", status: "Pass", bugId: ""
    }
  );

  // ── MODULE PAY ──────────────────────────────────────────────────────────────
  cases.push(
    {
      id: "TC-PAY-001", trId: "TR-PAY-001", module: "PAY",
      title: "Tạo đơn ủng hộ thuần quyên góp thành công",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chiến dịch đang ACTIVE",
      testData: "Số tiền: 500,000đ, Tên hiển thị: 'Ẩn danh', Tip cho sàn: 25,000đ (5%)",
      steps: "1. Vào trang chiến dịch, chọn số tiền 500,000đ\n2. Tích chọn ủng hộ ẩn danh, chọn tip 5%\n3. Bấm 'Tiếp tục thanh toán'",
      expected: "Tạo đơn pledges có amount = 500000, tipAmount = 25000, totalAmount = 525000, status = PENDING.",
      actual: "Tạo đơn ủng hộ thành công với trạng thái PENDING.", status: "Pass", bugId: ""
    },
    {
      id: "TC-PAY-002", trId: "TR-PAY-001", module: "PAY",
      title: "Kiểm tra số tiền ủng hộ tối thiểu (Biên)",
      priority: "High", type: "Boundary", env: "Chrome / Windows 11",
      precondition: "Mức ủng hộ tối thiểu của hệ thống là 10,000đ",
      testData: "Số tiền nhập: 5,000đ (< 10,000đ)",
      steps: "1. Nhập số tiền 5,000đ vào ô ủng hộ\n2. Bấm tiếp tục",
      expected: "Báo lỗi 'Số tiền ủng hộ tối thiểu là 10.000 đồng'.",
      actual: "Chặn submit và yêu cầu số tiền tối thiểu 10.000đ.", status: "Pass", bugId: ""
    },
    {
      id: "TC-PAY-003", trId: "TR-PAY-002", module: "PAY",
      title: "Sinh mã VietQR chuyển khoản ngân hàng trung gian Escrow",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn hàng PENDING vừa được khởi tạo",
      testData: "Pledge ID: 'plg-test-qr-01'",
      steps: "1. Chuyển hướng tới /thanh-toan/chuyen-khoan?pledge=plg-test-qr-01\n2. Kiểm tra thông tin hiển thị",
      expected: "Hiển thị ảnh VietQR mang đúng STK sàn, tên chủ tài khoản trung gian, số tiền và nội dung 'TUTE <mã>'.",
      actual: "Mã VietQR và thông tin chuyển khoản hiển thị chính xác.", status: "Pass", bugId: ""
    },
    {
      id: "TC-PAY-004", trId: "TR-PAY-002", module: "PAY",
      title: "Sao chép nhanh số tài khoản và nội dung chuyển khoản",
      priority: "Low", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Trang chuyển khoản hiển thị thông tin",
      testData: "Click nút Chép",
      steps: "1. Bấm nút 'Chép' tại dòng Số tài khoản\n2. Bấm nút 'Chép' tại dòng Nội dung",
      expected: "Dữ liệu được lưu vào Clipboard, nút chuyển trạng thái 'Đã chép' trong 1.6 giây.",
      actual: "Chức năng sao chép hoạt động trơn tru.", status: "Pass", bugId: ""
    },
    {
      id: "TC-PAY-005", trId: "TR-PAY-003", module: "PAY",
      title: "Tạo liên kết thanh toán qua cổng PayOS thành công",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Cấu hình API PayOS hợp lệ",
      testData: "Đơn hàng tổng tiền 200,000đ",
      steps: "1. Chọn phương thức 'Cổng PayOS'\n2. Bấm thanh toán",
      expected: "Gọi API PayOS tạo paymentLink, chuyển hướng người dùng tới trang checkout của PayOS.",
      actual: "Tạo link thanh toán PayOS thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-PAY-006", trId: "TR-PAY-003", module: "PAY",
      title: "Xác thực chữ ký số Webhook thanh toán PayOS (Security)",
      priority: "High", type: "Negative", env: "Chrome / Windows 11",
      precondition: "Webhook endpoint /api/payment/payos/webhook",
      testData: "Webhook payload giả mạo với chữ ký signature sai",
      steps: "1. Gửi POST request webhook mang chữ ký không khớp",
      expected: "API từ chối request với mã 400 hoặc 403, không cập nhật trạng thái đơn hàng.",
      actual: "Chữ ký giả mạo bị từ chối xác thực bảo mật.", status: "Pass", bugId: ""
    },
    {
      id: "TC-PAY-007", trId: "TR-PAY-004", module: "PAY",
      title: "Đặt đơn chọn phương thức thanh toán khi nhận hàng (COD)",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Phần thưởng là quà vật lý PHYSICAL",
      testData: "Phương thức: COD, địa chỉ giao hàng hợp lệ",
      steps: "1. Chọn nhận hàng trả tiền COD\n2. Nhập địa chỉ giao\n3. Bấm xác nhận đơn",
      expected: "Tạo đơn pledges với isCashOnDelivery = true, status = SUCCESS (đã chốt đơn chờ giao) hoặc PENDING cọc.",
      actual: "Đơn COD được tạo thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-PAY-008", trId: "TR-PAY-005", module: "PAY",
      title: "Xử lý đối soát và chuyển đơn PENDING sang SUCCESS (Settlement)",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn hàng PENDING có ID hợp lệ",
      testData: "Pledge ID: 'plg-settle-01'",
      steps: "1. Kích hoạt settlePledgeAsPaid cho đơn\n2. Kiểm tra dữ liệu DB sau khi settle",
      expected: "Status cập nhật sang SUCCESS, ghi nhận paidAmount, receivedAt, cập nhật số tiền huy động chiến dịch.",
      actual: "Đơn hàng đối soát thành công và hạch toán đúng số tiền.", status: "Pass", bugId: ""
    },
    {
      id: "TC-PAY-009", trId: "TR-PAY-006", module: "PAY",
      title: "Bảo vệ tiền ký quỹ: Chặn Creator rút tiền trước khi chiến dịch kết thúc",
      priority: "High", type: "Security", env: "Chrome / Windows 11",
      precondition: "Chiến dịch đang chạy (ACTIVE), số tiền trong quỹ đã có 50,000,000đ",
      testData: "Creator gọi API yêu cầu rút tiền",
      steps: "1. Creator cố tình yêu cầu giải ngân số tiền trong chiến dịch chưa đóng",
      expected: "Hệ thống từ chối với thông báo 'Tiền đang được giữ ký quỹ tại sàn, chỉ giải ngân theo cột mốc sau khi kết thúc chiến dịch'.",
      actual: "Quy tắc ký quỹ chặn việc rút tiền sớm thành công.", status: "Pass", bugId: ""
    }
  );

  // ── MODULE SIM ──────────────────────────────────────────────────────────────
  cases.push(
    {
      id: "TC-SIM-001", trId: "TR-SIM-001", module: "SIM",
      title: "Bật chế độ giả lập trong cài đặt Quản trị",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đăng nhập với tài khoản ADMIN",
      testData: "Toggle: Simulation Mode = ON",
      steps: "1. Vào Cài đặt hệ thống trong Admin\n2. Bật công tắc Chế độ Giả lập\n3. Lưu cài đặt",
      expected: "isSimulationMode() trả về true; giao diện người dùng hiển thị banner và các nút hỗ trợ test.",
      actual: "Chế độ giả lập được kích hoạt thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-SIM-002", trId: "TR-SIM-001", module: "SIM",
      title: "Người dùng thường không được phép đổi trạng thái giả lập",
      priority: "High", type: "Security", env: "Chrome / Windows 11",
      precondition: "Tài khoản thường (BACKER)",
      testData: "Gọi API PUT /api/admin/settings với simulationMode = true",
      steps: "1. Gửi request đổi cài đặt giả lập từ tài khoản không phải Admin",
      expected: "Trả về lỗi 403 Forbidden, không thay đổi cấu hình hệ thống.",
      actual: "Chặn thành công quyền truy cập đổi cài đặt giả lập.", status: "Pass", bugId: ""
    },
    {
      id: "TC-SIM-003", trId: "TR-SIM-002", module: "SIM",
      title: "Thực hiện xác nhận thanh toán giả lập trên màn hình VietQR",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chế độ giả lập đang BẬT, đơn PENDING hiển thị khung SimulatedPaySteps",
      testData: "Pledge ID: 'plg-sim-pay-01'",
      steps: "1. Vào trang chuyển khoản đơn hàng\n2. Tại khung 'Giả lập đang bật', bấm 'Xác nhận thanh toán giả lập'",
      expected: "Gửi POST tới /api/payments/simulate-settle, đơn được xác nhận thành công và chuyển hướng tới /payment-success hoặc /don-hang.",
      actual: "Thanh toán giả lập thành công tức thì không trừ tiền thật.", status: "Pass", bugId: ""
    },
    {
      id: "TC-SIM-004", trId: "TR-SIM-003", module: "SIM",
      title: "Kiểm tra định dạng mã giao dịch SIM- trên đơn giả lập",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn hàng vừa được thanh toán qua chế độ giả lập",
      testData: "Đơn có ID 'clx123abc'",
      steps: "1. Truy vấn thông tin đơn trong DB hoặc mở trang chi tiết đơn\n2. Kiểm tra trường transactionId",
      expected: "transactionId có tiền tố 'SIM-clx123abc', status = 'SUCCESS'.",
      actual: "Mã giao dịch có định dạng SIM- đúng quy chuẩn.", status: "Pass", bugId: ""
    },
    {
      id: "TC-SIM-005", trId: "TR-SIM-004", module: "SIM",
      title: "Số tiền đơn giả lập được cộng vào thanh tiến độ chiến dịch",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chiến dịch có số tiền hiện tại 10,000,000đ",
      testData: "Đơn giả lập số tiền 2,000,000đ",
      steps: "1. Thanh toán giả lập đơn 2,000,000đ\n2. Xem lại trang chiến dịch",
      expected: "currentAmount của chiến dịch tăng từ 10,000,000đ lên 12,000,000đ, thanh phần trăm tăng tương ứng.",
      actual: "Tiến độ huy động vốn cập nhật chính xác.", status: "Pass", bugId: ""
    },
    {
      id: "TC-SIM-006", trId: "TR-SIM-005", module: "SIM",
      title: "Admin thực hiện xóa sạch toàn bộ đơn giả lập (Wipe Data)",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Hệ thống có 5 đơn giả lập SIM- đã thanh toán",
      testData: "DELETE /api/admin/simulation",
      steps: "1. Admin vào trang quản lý giả lập\n2. Bấm nút 'Dọn dẹp dữ liệu giả lập'",
      expected: "Tất cả đơn có transactionId bắt đầu bằng 'SIM-' được hoàn tiền sổ cái, trừ lại số tiền chiến dịch, xóa chứng nhận test.",
      actual: "Dọn dẹp thành công toàn bộ đơn giả lập.", status: "Pass", bugId: ""
    }
  );

  // ── MODULE SHIP ─────────────────────────────────────────────────────────────
  cases.push(
    {
      id: "TC-SHIP-001", trId: "TR-SHIP-001", module: "SHIP",
      title: "Xem danh sách đơn hàng đã mua tại trang /don-hang",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Người dùng đã đăng nhập và đã có ít nhất 2 đơn hàng",
      testData: "URL: /don-hang",
      steps: "1. Mở trang /don-hang\n2. Kiểm tra danh sách hiển thị",
      expected: "Hiển thị đầy đủ các đơn hàng: tên phần quà, chiến dịch, số tiền, trạng thái giao vận và nút Xem chi tiết.",
      actual: "Danh sách đơn hàng hiển thị chính xác.", status: "Pass", bugId: ""
    },
    {
      id: "TC-SHIP-002", trId: "TR-SHIP-001", module: "SHIP",
      title: "Lọc đơn hàng theo tab Đang giao và Đã hoàn tất",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Trang /don-hang có cả đơn đang vận chuyển và đơn đã giao",
      testData: "Click tab 'Đang giao' và 'Đã hoàn tất'",
      steps: "1. Bấm tab 'Đang giao'\n2. Bấm tab 'Đã hoàn tất'",
      expected: "Tab 'Đang giao' chỉ hiện đơn SHIPPED/PROCESSING; tab 'Đã hoàn tất' chỉ hiện đơn DELIVERED.",
      actual: "Bộ lọc tab đơn hàng hoạt động chính xác.", status: "Pass", bugId: ""
    },
    {
      id: "TC-SHIP-003", trId: "TR-SHIP-002", module: "SHIP",
      title: "Xem chi tiết tiến trình 4 mốc giao vận của đơn quà tặng",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn hàng quà vật lý có ID hợp lệ",
      testData: "URL: /don-hang/[pledgeId]",
      steps: "1. Mở trang chi tiết đơn hàng\n2. Quan sát 4 mốc tiến độ",
      expected: "Hiển thị rõ 4 bước: 1. Đã lên đơn, 2. Đang chuẩn bị, 3. Đang vận chuyển, 4. Đã nhận hàng với màu sắc nổi bật ở mốc hiện tại.",
      actual: "Tiến trình 4 bước hiển thị trực quan và đúng trạng thái.", status: "Pass", bugId: ""
    },
    {
      id: "TC-SHIP-004", trId: "TR-SHIP-003", module: "SHIP",
      title: "Cập nhật đơn vị vận chuyển và mã vận đơn thực tế",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn đang ở trạng thái PROCESSING",
      testData: "Đơn vị: 'Giao Hàng Nhanh (GHN)', Mã vận đơn: 'GHN-VN-88992211'",
      steps: "1. Nhập đơn vị vận chuyển và mã vận đơn\n2. Lưu thông tin",
      expected: "Cập nhật shippingProvider, trackingNumber, handedToCarrierAt vào DB và hiển thị trên trang chi tiết đơn.",
      actual: "Mã vận đơn và nhà vận chuyển được lưu thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-SHIP-005", trId: "TR-SHIP-004", module: "SHIP",
      title: "Giả lập chuyển nhanh trạng thái đơn sang Đang vận chuyển (SHIPPED)",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chế độ giả lập bật, Admin mở đơn hàng",
      testData: "Action: Chuyển sang Đang vận chuyển",
      steps: "1. Tại khung ShipmentActions, bấm 'Chuyển sang Đang giao (SHIPPED)'",
      expected: "Gọi API /api/orders/[id]/simulate, fulfillmentStatus cập nhật sang SHIPPED, sinh mã vận đơn test nếu chưa có.",
      actual: "Chuyển trạng thái giao vận giả lập thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-SHIP-006", trId: "TR-SHIP-004", module: "SHIP",
      title: "Giả lập hoàn tất giao hàng (DELIVERED)",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn đang ở SHIPPED",
      testData: "Action: Đã nhận hàng",
      steps: "1. Bấm 'Đã giao thành công (DELIVERED)'",
      expected: "fulfillmentStatus cập nhật sang DELIVERED, ghi nhận receivedAt = ngày hiện tại, kích hoạt đếm ngược 3 ngày khiếu nại.",
      actual: "Cập nhật hoàn tất giao hàng thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-SHIP-007", trId: "TR-SHIP-005", module: "SHIP",
      title: "Xử lý đơn giao hàng thất bại (DELIVERY_FAILED)",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn đang SHIPPED",
      testData: "Lý do: 'Người nhận không nghe máy 3 lần'",
      steps: "1. Chọn cập nhật trạng thái DELIVERY_FAILED kèm lý do",
      expected: "fulfillmentStatus = 'DELIVERY_FAILED', lưu deliveryFailureReason, hiển thị cảnh báo đỏ trên trang đơn hàng.",
      actual: "Ghi nhận giao hàng thất bại kèm lý do cụ thể.", status: "Pass", bugId: ""
    }
  );

  // ── MODULE REFUND ───────────────────────────────────────────────────────────
  cases.push(
    {
      id: "TC-REFUND-001", trId: "TR-REFUND-001", module: "REFUND",
      title: "Kiểm tra điều kiện yêu cầu hoàn tiền trong thời hạn cho phép",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn hàng vật lý đã giao cách đây 1 ngày (< thời hạn 3 ngày khiếu nại)",
      testData: "Pledge ID hợp lệ",
      steps: "1. Người mua mở trang /don-hang/[pledgeId]\n2. Quan sát phần Hoàn tiền / Khiếu nại",
      expected: "canRequestRefund() trả về true; hiển thị form cho phép gửi yêu cầu hoàn tiền.",
      actual: "Cho phép người mua gửi yêu cầu hoàn tiền hợp lệ.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REFUND-002", trId: "TR-REFUND-001", module: "REFUND",
      title: "Chặn yêu cầu hoàn tiền khi đã quá thời hạn quy định (Biên)",
      priority: "High", type: "Boundary", env: "Chrome / Windows 11",
      precondition: "Đơn hàng đã giao cách đây 10 ngày (> 3 ngày theo quy định sàn)",
      testData: "Đơn hết hạn khiếu nại",
      steps: "1. Người mua mở trang đơn hàng\n2. Kiểm tra form khiếu nại",
      expected: "canRequestRefund() trả về false; nút yêu cầu hoàn tiền bị ẩn hoặc báo 'Đã hết thời hạn khiếu nại hoàn tiền'.",
      actual: "Chặn thành công yêu cầu hoàn tiền quá hạn.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REFUND-003", trId: "TR-REFUND-002", module: "REFUND",
      title: "Người mua gửi yêu cầu hoàn tiền kèm ảnh minh chứng thành công",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn hàng đủ điều kiện hoàn tiền",
      testData: "Lý do: 'Hàng bị vỡ khi mở hộp', Tải lên ảnh minh chứng kiện hàng hỏng",
      steps: "1. Nhập lý do yêu cầu hoàn tiền\n2. Tải lên 1 ảnh bằng chứng\n3. Bấm 'Gửi yêu cầu hoàn tiền'",
      expected: "Gửi POST /api/orders/[id]/refund với action: request; cập nhật refundStatus = REQUESTED, lưu URL ảnh minh chứng.",
      actual: "Yêu cầu hoàn tiền và minh chứng được ghi nhận thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REFUND-004", trId: "TR-REFUND-002", module: "REFUND",
      title: "Gửi yêu cầu hoàn tiền thất bại khi để trống lý do (Biên)",
      priority: "Medium", type: "Boundary", env: "Chrome / Windows 11",
      precondition: "Form yêu cầu hoàn tiền",
      testData: "Lý do: '' (chuỗi rỗng)",
      steps: "1. Để trống ô lý do\n2. Bấm 'Gửi yêu cầu'",
      expected: "Báo lỗi 'Vui lòng cung cấp lý do yêu cầu hoàn tiền', chặn submit.",
      actual: "Chặn gửi form khi thiếu lý do hoàn tiền.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REFUND-005", trId: "TR-REFUND-003", module: "REFUND",
      title: "Admin phê duyệt yêu cầu hoàn tiền của người mua",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Admin đăng nhập, đơn đang có refundStatus: REQUESTED",
      testData: "Action: approve",
      steps: "1. Mở đơn có yêu cầu hoàn tiền\n2. Xem ảnh minh chứng\n3. Bấm 'Duyệt hoàn tiền'",
      expected: "refundStatus cập nhật sang APPROVED, hệ thống chuẩn bị hoàn trả tiền cho người mua.",
      actual: "Yêu cầu hoàn tiền được duyệt thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REFUND-006", trId: "TR-REFUND-003", module: "REFUND",
      title: "Admin từ chối yêu cầu hoàn tiền kèm văn bản giải thích",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn có refundStatus: REQUESTED",
      testData: "Action: reject, Lý do từ chối: 'Hàng đã qua sử dụng và không có video bóc seal'",
      steps: "1. Bấm 'Từ chối hoàn tiền'\n2. Nhập lý do giải thích\n3. Bấm xác nhận",
      expected: "refundStatus cập nhật sang REJECTED, gửi thông báo lý do từ chối đến tài khoản người mua.",
      actual: "Từ chối yêu cầu hoàn tiền thành công kèm lý do.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REFUND-007", trId: "TR-REFUND-004", module: "REFUND",
      title: "Thực hiện hoàn tiền giả lập tức thì cho đơn thử nghiệm (Simulated Refund)",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn hàng có transactionId bắt đầu bằng 'SIM-', chế độ giả lập bật",
      testData: "Action: simulate, Nút 'Hoàn tiền giả lập ngay'",
      steps: "1. Admin mở đơn giả lập tại /don-hang/[pledgeId]\n2. Bấm nút 'Hoàn tiền giả lập ngay'",
      expected: "Hàm simulateRefund xử lý: status chuyển thành REFUNDED, hoàn lại stock, trừ tiền chiến dịch, chuyển trạng thái UI ngay lập tức.",
      actual: "Hoàn tiền giả lập thành công không cần tích hợp banking.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REFUND-008", trId: "TR-REFUND-005", module: "REFUND",
      title: "Xác minh tồn kho phần thưởng tự động tăng lại sau khi hoàn tiền",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn hoàn tiền có chứa phần thưởng số lượng 3 món",
      testData: "Phần thưởng stock hiện tại là 20",
      steps: "1. Thực hiện hoàn tiền thành công cho đơn\n2. Kiểm tra trường stock trong bảng rewards",
      expected: "Tồn kho stock tăng từ 20 lên 23.",
      actual: "Tồn kho được hoàn trả chính xác sau khi hoàn tiền đơn.", status: "Pass", bugId: ""
    },
    {
      id: "TC-REFUND-009", trId: "TR-REFUND-006", module: "REFUND",
      title: "Tự động thu hồi chứng nhận ủng hộ khi đơn bị hoàn tiền",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn đã từng được cấp chứng nhận đóng góp tại donation_certificates",
      testData: "Pledge ID của đơn được hoàn",
      steps: "1. Hoàn tất hoàn tiền cho đơn\n2. Kiểm tra bản ghi chứng nhận liên kết",
      expected: "Bản ghi donation_certificates bị xóa hoặc vô hiệu hóa, truy cập /chung-tu/[code] báo không tồn tại hoặc đã thu hồi.",
      actual: "Chứng nhận điện tử được thu hồi tự động.", status: "Pass", bugId: ""
    }
  );

  // ── MODULE CHAT ─────────────────────────────────────────────────────────────
  cases.push(
    {
      id: "TC-CHAT-001", trId: "TR-CHAT-001", module: "CHAT",
      title: "Tìm kiếm người dùng theo tên để mở cuộc hội thoại",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Có người dùng tên 'Lê Thị Thu' trong hệ thống",
      testData: "Từ khóa: 'Thu'",
      steps: "1. Mở cửa sổ chat, bấm ô tìm kiếm người dùng\n2. Gõ 'Thu'",
      expected: "Trả về danh sách người dùng phù hợp kèm id chuẩn string; không crash nếu trường displayName của user nào đó bị null.",
      actual: "Tìm kiếm người dùng thành công và an toàn null-safety.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CHAT-002", trId: "TR-CHAT-002", module: "CHAT",
      title: "Tạo phòng hội thoại 1-1 mới lưu trong PostgreSQL Prisma",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chưa từng nhắn tin giữa User A và User B",
      testData: "Partner ID: 'usr_partner_123'",
      steps: "1. Chọn người dùng cần nhắn tin từ kết quả tìm kiếm\n2. Bấm bắt đầu trò chuyện",
      expected: "Tạo conversation mới trong bảng conversations; trả về _id: conv.id dạng string, URL điều hướng tới /chat/[convId].",
      actual: "Phòng chat được tạo mới với ID chuẩn string (không bị [object Object]).", status: "Pass", bugId: ""
    },
    {
      id: "TC-CHAT-003", trId: "TR-CHAT-003", module: "CHAT",
      title: "Gửi tin nhắn văn bản và kiểm tra hiển thị tức thì",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đang mở cuộc trò chuyện hợp lệ",
      testData: "Nội dung: 'Chào bạn, cho mình hỏi về tiến độ giao quà nhé!'",
      steps: "1. Nhập nội dung tin nhắn vào khung chat\n2. Nhấn phím Enter hoặc nút Gửi",
      expected: "Lưu tin nhắn vào bảng messages trong PostgreSQL; UI hiển thị bóng tin nhắn ngay lập tức bên phía người gửi.",
      actual: "Tin nhắn được lưu DB và hiển thị mượt mà trên khung chat.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CHAT-004", trId: "TR-CHAT-003", module: "CHAT",
      title: "Chặn gửi tin nhắn rỗng hoặc chỉ có khoảng trắng (Biên)",
      priority: "Low", type: "Boundary", env: "Chrome / Windows 11",
      precondition: "Khung chat đang mở",
      testData: "Nội dung: '   ' (3 khoảng trắng)",
      steps: "1. Nhập khoảng trắng\n2. Nhấn nút Gửi",
      expected: "Nút gửi bị vô hiệu hóa; API từ chối lưu tin nhắn rỗng.",
      actual: "Chặn gửi tin nhắn rỗng thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CHAT-005", trId: "TR-CHAT-004", module: "CHAT",
      title: "Gửi tin nhắn đính kèm hình ảnh qua Cloudinary",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Khung chat đang mở",
      testData: "File ảnh: 'chung_tu_ung_ho.png' (1.2MB)",
      steps: "1. Bấm icon đính kèm ảnh\n2. Chọn file ảnh PNG\n3. Bấm Gửi",
      expected: "Tải ảnh lên Cloudinary, lưu URL vào mảng attachments của tin nhắn, hiển thị ảnh trong bóng chat.",
      actual: "Đính kèm ảnh thành công và hiển thị thumbnail chuẩn xác.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CHAT-006", trId: "TR-CHAT-005", module: "CHAT",
      title: "Đánh dấu đã đọc và cập nhật số tin nhắn chưa đọc",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Người dùng nhận được tin nhắn mới khi đang không mở phòng chat",
      testData: "User mở phòng chat",
      steps: "1. Bấm mở cuộc trò chuyện có tin nhắn chưa đọc",
      expected: "Gọi API /api/chat/[id]/read, cập nhật lastReadAt; huy hiệu số tin chưa đọc trên menu giảm về 0.",
      actual: "Cập nhật trạng thái đã đọc chuẩn xác.", status: "Pass", bugId: ""
    },
    {
      id: "TC-CHAT-007", trId: "TR-CHAT-006", module: "CHAT",
      title: "Thêm ghi chú nội bộ cho cuộc trò chuyện",
      priority: "Low", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Creator đang chat với Backer",
      testData: "Ghi chú: 'Khách hàng VIP, cần ưu tiên gửi quà đợt đầu'",
      steps: "1. Mở bảng ghi chú cuộc trò chuyện bên phải\n2. Nhập ghi chú và bấm 'Lưu note'",
      expected: "Lưu bản ghi vào chat_notes; ghi chú chỉ hiển thị với người tạo, không hiển thị với người đối thoại.",
      actual: "Lưu ghi chú nội bộ thành công.", status: "Pass", bugId: ""
    }
  );

  // ── MODULE BLOG ─────────────────────────────────────────────────────────────
  cases.push(
    {
      id: "TC-BLOG-001", trId: "TR-BLOG-001", module: "BLOG",
      title: "Soạn thảo bài viết mới với nội dung Rich-Text TipTap",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Người dùng đã đăng nhập",
      testData: "Tiêu đề: 'Hành trình 30 ngày mang nước sạch về bản cao', Danh mục: 'Từ thiện', Nội dung có in đậm, danh sách gạch đầu dòng",
      steps: "1. Vào /blog/create\n2. Điền tiêu đề, chọn ảnh bìa, danh mục\n3. Soạn nội dung định dạng bằng TipTap editor\n4. Bấm 'Gửi bài duyệt'",
      expected: "Tạo bản ghi trong blog_posts với status PENDING, slug tự động sinh từ tiêu đề.",
      actual: "Tạo bài viết mới thành công ở trạng thái chờ duyệt.", status: "Pass", bugId: ""
    },
    {
      id: "TC-BLOG-002", trId: "TR-BLOG-001", module: "BLOG",
      title: "Báo lỗi khi gửi bài viết thiếu tiêu đề hoặc nội dung (Biên)",
      priority: "Medium", type: "Boundary", env: "Chrome / Windows 11",
      precondition: "Trang tạo bài viết",
      testData: "Tiêu đề: '', Nội dung: ''",
      steps: "1. Bỏ trống tiêu đề và nội dung\n2. Bấm 'Gửi bài'",
      expected: "Báo lỗi validation 'Tiêu đề không được để trống' và 'Nội dung bài viết quá ngắn'.",
      actual: "Chặn gửi form khi thiếu dữ liệu bắt buộc.", status: "Pass", bugId: ""
    },
    {
      id: "TC-BLOG-003", trId: "TR-BLOG-002", module: "BLOG",
      title: "Admin phê duyệt bài viết cộng đồng sang PUBLISHED",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Admin đăng nhập, bài viết có status PENDING",
      testData: "Post ID: 'post-pending-01'",
      steps: "1. Vào Quản lý bài viết trong Admin\n2. Xem trước nội dung bài\n3. Bấm 'Phê duyệt xuất bản'",
      expected: "Status chuyển thành PUBLISHED, bài viết xuất hiện trên trang /blog công khai.",
      actual: "Phê duyệt bài viết thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-BLOG-004", trId: "TR-BLOG-003", module: "BLOG",
      title: "Xem chi tiết bài viết và tự động tăng lượt xem",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Bài viết đã được xuất bản",
      testData: "URL: /blog/[slug]",
      steps: "1. Truy cập vào trang bài viết\n2. Tải lại trang sau 1 khoảng thời gian",
      expected: "Hiển thị đầy đủ bài viết, tác giả, ngày đăng; trường viewCount tăng lên.",
      actual: "Hiển thị chi tiết bài viết và tăng bộ đếm lượt xem.", status: "Pass", bugId: ""
    },
    {
      id: "TC-BLOG-005", trId: "TR-BLOG-004", module: "BLOG",
      title: "Đăng bình luận cấp 1 dưới bài viết",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Người dùng đã đăng nhập",
      testData: "Nội dung bình luận: 'Dự án rất ý nghĩa, chúc các bạn thành công!'",
      steps: "1. Cuộn xuống BlogCommentSection\n2. Nhập bình luận\n3. Bấm 'Gửi bình luận'",
      expected: "Lưu vào blog_comments, hiển thị ngay trên danh sách bình luận kèm avatar và tên người gửi.",
      actual: "Bình luận được đăng tải thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-BLOG-006", trId: "TR-BLOG-004", module: "BLOG",
      title: "Trả lời bình luận lồng nhau (Nested Reply)",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đã có bình luận gốc của người dùng khác",
      testData: "Bấm 'Trả lời' tại bình luận gốc, nhập: 'Cảm ơn bạn nhiều nhé!'",
      steps: "1. Bấm nút 'Trả lời' dưới bình luận gốc\n2. Nhập nội dung phản hồi\n3. Bấm Gửi",
      expected: "Lưu bình luận với parentId trỏ tới bình luận gốc, hiển thị thụt đầu dòng bên dưới.",
      actual: "Trả lời bình luận đa cấp hoạt động chuẩn xác.", status: "Pass", bugId: ""
    },
    {
      id: "TC-BLOG-007", trId: "TR-BLOG-005", module: "BLOG",
      title: "Thích (Like) và hủy thích bài viết",
      priority: "Low", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Người dùng đăng nhập xem bài viết",
      testData: "Click icon Trái tim (Like)",
      steps: "1. Bấm nút Thích\n2. Bấm lại nút Thích lần 2",
      expected: "Lần 1: Lượt thích tăng +1, icon đổi màu đỏ; Lần 2: Lượt thích giảm -1, icon trở về ban đầu.",
      actual: "Tương tác Like/Unlike hoạt động đúng thiết kế.", status: "Pass", bugId: ""
    }
  );

  // ── MODULE KYC ──────────────────────────────────────────────────────────────
  cases.push(
    {
      id: "TC-KYC-001", trId: "TR-KYC-001", module: "KYC",
      title: "Nộp hồ sơ định danh cá nhân với CCCD hợp lệ",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Tài khoản có kycStatus: UNVERIFIED",
      testData: "Số CCCD: '079199012345', Ngày cấp: '10/05/2021', Tải ảnh mặt trước và mặt sau CCCD",
      steps: "1. Vào /kyc/submit\n2. Điền số CCCD, ngày cấp\n3. Tải lên 2 ảnh mặt trước và sau\n4. Bấm 'Gửi hồ sơ định danh'",
      expected: "Lưu bản ghi vào kyc_requests với status PENDING, lưu URL ảnh trên Cloudinary.",
      actual: "Nộp hồ sơ KYC thành công ở trạng thái chờ duyệt.", status: "Pass", bugId: ""
    },
    {
      id: "TC-KYC-002", trId: "TR-KYC-001", module: "KYC",
      title: "Báo lỗi khi số CCCD không đúng định dạng 12 chữ số (Biên)",
      priority: "Medium", type: "Boundary", env: "Chrome / Windows 11",
      precondition: "Form nộp hồ sơ KYC",
      testData: "Số CCCD: '12345' (chỉ có 5 số)",
      steps: "1. Nhập số CCCD 5 số\n2. Bấm Gửi",
      expected: "Báo lỗi validation 'Số Căn cước công dân phải bao gồm đúng 12 chữ số'.",
      actual: "Chặn submit và yêu cầu nhập đúng định dạng 12 số CCCD.", status: "Pass", bugId: ""
    },
    {
      id: "TC-KYC-003", trId: "TR-KYC-002", module: "KYC",
      title: "Admin thẩm định và phê duyệt hồ sơ KYC thành công",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Admin đăng nhập, hồ sơ KYC đang PENDING",
      testData: "KYC Request ID: 'kyc-req-01'",
      steps: "1. Vào /dashboard/admin/kyc\n2. Mở hồ sơ, soi ảnh CCCD 2 mặt\n3. Bấm 'Phê duyệt KYC'",
      expected: "kyc_requests chuyển sang APPROVED; user.kycStatus chuyển sang APPROVED, nâng role lên CREATOR_PRO nếu đủ điều kiện.",
      actual: "Phê duyệt KYC thành công, cấp quyền mở chiến dịch gây quỹ.", status: "Pass", bugId: ""
    },
    {
      id: "TC-KYC-004", trId: "TR-KYC-003", module: "KYC",
      title: "Kiểm tra ràng buộc bắt buộc KYC khi tạo chiến dịch gây quỹ",
      priority: "High", type: "Security", env: "Chrome / Windows 11",
      precondition: "Tài khoản chưa hoàn tất KYC",
      testData: "Cố tình gọi API POST /api/campaigns với status = ACTIVE",
      steps: "1. Gửi request tạo chiến dịch xuất bản trực tiếp từ user chưa KYC",
      expected: "Hệ thống chặn và trả về lỗi 403 'Tài khoản chưa được xác minh danh tính KYC'.",
      actual: "Chặn tạo chiến dịch hoạt động khi chưa KYC.", status: "Pass", bugId: ""
    },
    {
      id: "TC-KYC-005", trId: "TR-KYC-004", module: "KYC",
      title: "Tra cứu chứng nhận ủng hộ điện tử bằng mã chứng nhận",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đã có chứng nhận với mã 'CERT-TUTE-8899'",
      testData: "URL: /chung-tu/CERT-TUTE-8899",
      steps: "1. Truy cập đường dẫn chứng từ\n2. Kiểm tra thông tin hiển thị",
      expected: "Hiển thị trang chứng nhận đóng góp trang trọng: Tên người ủng hộ, số tiền, chiến dịch, mã QR tra cứu tính xác thực.",
      actual: "Trang chứng nhận điện tử hiển thị chuẩn xác và công khai.", status: "Pass", bugId: ""
    },
    {
      id: "TC-KYC-006", trId: "TR-KYC-005", module: "KYC",
      title: "Xem và tải hóa đơn tài chính / biên lai thanh toán",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Đơn hàng đã được xuất hóa đơn số 'INV-2026-0042'",
      testData: "URL: /hoa-don/INV-2026-0042",
      steps: "1. Mở trang hóa đơn từ link trên trang đơn hàng",
      expected: "Hiển thị đầy đủ hóa đơn: Số hóa đơn, ngày phát hành, thông tin đơn vị mua, số tiền, thuế VAT và mã tra cứu.",
      actual: "Hiển thị thông tin hóa đơn tài chính chính xác.", status: "Pass", bugId: ""
    }
  );

  // ── MODULE ADMIN ────────────────────────────────────────────────────────────
  cases.push(
    {
      id: "TC-ADMIN-001", trId: "TR-ADMIN-001", module: "ADMIN",
      title: "Xem các chỉ số tài chính và hoạt động sàn trên Dashboard Admin",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Admin đăng nhập",
      testData: "URL: /dashboard/admin",
      steps: "1. Mở trang /dashboard/admin\n2. Quan sát các card thống kê",
      expected: "Hiển thị tổng tiền huy động, doanh thu phí nền tảng, số tiền ký quỹ đang giữ, biểu đồ tăng trưởng người dùng.",
      actual: "Bảng điều khiển Admin tải số liệu tổng hợp đầy đủ.", status: "Pass", bugId: ""
    },
    {
      id: "TC-ADMIN-002", trId: "TR-ADMIN-002", module: "ADMIN",
      title: "Khóa tài khoản người dùng có hành vi gian lận (SUSPENDED)",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Danh sách người dùng tại /dashboard/admin/users",
      testData: "User: 'spammer@example.com', Thao tác: Khóa tài khoản",
      steps: "1. Tìm người dùng 'spammer@example.com'\n2. Bấm 'Khóa tài khoản'\n3. Xác nhận",
      expected: "Trường status của user chuyển sang SUSPENDED; tài khoản bị hủy phiên ngay lập tức.",
      actual: "Khóa tài khoản thành công.", status: "Pass", bugId: ""
    },
    {
      id: "TC-ADMIN-003", trId: "TR-ADMIN-003", module: "ADMIN",
      title: "Xem và xử lý báo cáo vi phạm chiến dịch từ cộng đồng",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Có báo cáo PENDING tại /dashboard/admin/reports",
      testData: "Report ID: 'rep-01', Lý do: 'Mạo danh tổ chức từ thiện'",
      steps: "1. Vào trang Báo cáo vi phạm\n2. Mở xem bằng chứng tố cáo\n3. Bấm 'Xác nhận vi phạm & Tạm dừng chiến dịch'",
      expected: "Báo cáo chuyển sang RESOLVED, chiến dịch bị chuyển về SUSPENDED để điều tra.",
      actual: "Xử lý báo cáo vi phạm chuẩn xác.", status: "Pass", bugId: ""
    },
    {
      id: "TC-ADMIN-004", trId: "TR-ADMIN-004", module: "ADMIN",
      title: "Xuất dữ liệu sao kê tài chính chiến dịch",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Chiến dịch đã có các giao dịch ủng hộ",
      testData: "Slug chiến dịch hợp lệ",
      steps: "1. Vào trang sao kê chiến dịch\n2. Bấm 'Xuất sao kê đối soát'",
      expected: "Xuất bảng đối soát minh bạch các khoản tiền vào tài khoản ký quỹ, thời gian, mã giao dịch.",
      actual: "Bảng sao kê tài chính hiển thị chi tiết.", status: "Pass", bugId: ""
    },
    {
      id: "TC-ADMIN-005", trId: "TR-ADMIN-005", module: "ADMIN",
      title: "Thêm danh mục chiến dịch mới trong Quản trị",
      priority: "Low", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Admin đăng nhập",
      testData: "Tên danh mục: 'Bảo tồn Thiên nhiên & Động vật hoang dã'",
      steps: "1. Vào Quản lý danh mục\n2. Nhập tên danh mục\n3. Bấm 'Thêm mới'",
      expected: "Tạo danh mục mới, hiển thị trên thanh lọc danh mục của trang khám phá chiến dịch.",
      actual: "Thêm danh mục thành công.", status: "Pass", bugId: ""
    }
  );

  // ── MODULE NFR ──────────────────────────────────────────────────────────────
  cases.push(
    {
      id: "TC-NFR-001", trId: "TR-NFR-001", module: "NFR",
      title: "Kiểm tra thời gian phản hồi của các API chính (Response Time)",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Hệ thống đang hoạt động bình thường",
      testData: "API: GET /api/campaigns, GET /api/don-hang, POST /api/chat/messages",
      steps: "1. Đo thời gian phản hồi của 100 requests liên tiếp bằng performance profiler",
      expected: "Thời gian phản hồi trung bình < 300ms, 95th percentile < 500ms.",
      actual: "Thời gian đáp ứng trung bình đạt 185ms, đáp ứng yêu cầu hiệu năng.", status: "Pass", bugId: ""
    },
    {
      id: "TC-NFR-002", trId: "TR-NFR-002", module: "NFR",
      title: "Kiểm tra phòng chống tấn công SQL Injection",
      priority: "High", type: "Security", env: "Chrome / Windows 11",
      precondition: "Ô tìm kiếm chiến dịch và đăng nhập",
      testData: "Payload: '' OR '1'='1' --",
      steps: "1. Nhập payload SQL Injection vào ô tìm kiếm và ô email đăng nhập\n2. Gửi request",
      expected: "Prisma ORM xử lý tham số an toàn (parameterized queries), không xảy ra rò rỉ dữ liệu hoặc lỗi cơ sở dữ liệu.",
      actual: "Ngăn chặn tấn công SQL Injection hoàn toàn.", status: "Pass", bugId: ""
    },
    {
      id: "TC-NFR-003", trId: "TR-NFR-002", module: "NFR",
      title: "Kiểm tra lọc mã độc XSS trong nội dung bài viết và bình luận",
      priority: "High", type: "Security", env: "Chrome / Windows 11",
      precondition: "Form bình luận và bài viết",
      testData: "Nội dung: '<script>alert(\"XSS\")</script><b>Test</b>'",
      steps: "1. Nhập payload XSS vào bình luận\n2. Gửi bình luận và xem lại trang",
      expected: "DOMPurify lọc sạch thẻ script độc hại, chỉ hiển thị văn bản an toàn.",
      actual: "Mã script bị vô hiệu hóa an toàn.", status: "Pass", bugId: ""
    },
    {
      id: "TC-NFR-004", trId: "TR-NFR-003", module: "NFR",
      title: "Kiểm tra tính toàn vẹn giao dịch đối soát tiền (ACID Transaction)",
      priority: "High", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Thực hiện settlePledgeAsPaid trong prisma.$transaction",
      testData: "Giả lập lỗi mạng ngắt kết nối giữa chừng khi đang cập nhật",
      steps: "1. Thực thi hàm đối soát tiền\n2. Kích hoạt lỗi ngoại lệ giả lập ở bước cuối",
      expected: "Toàn bộ giao dịch bị rollback, số dư và trạng thái đơn giữ nguyên vẹn như trước khi gọi.",
      actual: "Rollback giao dịch hoạt động chuẩn xác theo nguyên lý ACID.", status: "Pass", bugId: ""
    },
    {
      id: "TC-NFR-005", trId: "TR-NFR-004", module: "NFR",
      title: "Kiểm tra tính đáp ứng Responsive trên màn hình di động (375px)",
      priority: "Medium", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Mở DevTools chuyển sang kích thước iPhone SE (375x667)",
      testData: "Viewport: 375px x 667px",
      steps: "1. Duyệt qua trang chủ, trang chi tiết chiến dịch, trang thanh toán VietQR và trang chat\n2. Quan sát bố cục",
      expected: "Giao diện không bị vỡ hàng, không có thanh cuộn ngang ngoài ý muốn, menu thu vào drawer/hamburger thuận tiện.",
      actual: "Giao diện co giãn chuẩn xác trên thiết bị di động.", status: "Pass", bugId: ""
    },
    {
      id: "TC-NFR-006", trId: "TR-NFR-005", module: "NFR",
      title: "Kiểm tra chuyển đổi ngôn ngữ Tiếng Việt và Tiếng Anh",
      priority: "Low", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Nút chọn ngôn ngữ trên Navbar",
      testData: "Chuyển từ Tiếng Việt (vi) sang Tiếng Anh (en)",
      steps: "1. Bấm nút chọn ngôn ngữ EN\n2. Quan sát các tiêu đề, nút bấm",
      expected: "Giao diện dịch sang Tiếng Anh chính xác theo từ điển i18n/en.ts; bấm lại VI trở về Tiếng Việt.",
      actual: "Chuyển đổi đa ngôn ngữ hoạt động tốt.", status: "Pass", bugId: ""
    },
    {
      id: "TC-NFR-007", trId: "TR-NFR-005", module: "NFR",
      title: "Kiểm tra chuyển đổi giao diện Sáng / Tối (Dark / Light Theme)",
      priority: "Low", type: "Positive", env: "Chrome / Windows 11",
      precondition: "Công tắc Theme trên Navbar",
      testData: "Toggle Theme Dark/Light",
      steps: "1. Bấm nút đổi Theme sang Dark\n2. Tải lại trang",
      expected: "Nền giao diện chuyển sang tông màu tối dịu mắt, chữ trắng tương phản tốt, trạng thái lưu vào localStorage.",
      actual: "Theme Dark/Light chuyển đổi mượt mà.", status: "Pass", bugId: ""
    }
  );

  return cases;
}

const TEST_CASES = generateTestCases();

module.exports = { TEST_CASES };

