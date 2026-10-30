/**
 * scripts/standardize_prd_excel.js
 * Giữ nguyên 5 sheet mẫu gốc của biểu mẫu giảng viên:
 *  1. EXAMPLE Product Requirements
 *  2. BLANK Product Requirements
 *  3. Vi_BLANK Product Requirements
 *  4. Key - DO NOT DELETE
 *  5. - Disclaimer -
 * Điền và chuẩn hóa nội dung dự án Tử Tế Fund vào BLANK & Vi_BLANK
 */

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const TEMPLATE_FILE = path.resolve('22CT115_Nhom07_QuanLyBanHang(Sweet-Sip)/01-IC-Product-Requirements-Template-Example_Google_Sheets (1).xlsx');
const TARGET_FILE = path.resolve('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.xlsx');

async function run() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(TEMPLATE_FILE);

  console.log('Original Sheets:', wb.worksheets.map(w => w.name));

  // 1. Cập nhật Sheet: BLANK Product Requirements
  const wsBlank = wb.getWorksheet('BLANK Product Requirements');
  if (wsBlank) {
    wsBlank.getCell('C2').value = 'Tu Te Fund - Crowdfunding Platform';
    wsBlank.getCell('D2').value = 'Tu Te Fund - Crowdfunding Platform';
    wsBlank.getCell('E2').value = 'Tu Te Fund - Crowdfunding Platform';

    wsBlank.getCell('C3').value = 'Nguyen Quach Phu Tai, Tran Xuan An, Bui Dang Quoc Khanh, Nguyen Trung Tien, Nguyen Khanh Du';
    wsBlank.getCell('D3').value = 'Group 02 - Class 23CT113';
    wsBlank.getCell('C4').value = '0901234567';
    wsBlank.getCell('C5').value = 'nguyenquachphutai@gmail.com';
    wsBlank.getCell('C6').value = 'Ho Chi Minh City, Vietnam';
    wsBlank.getCell('C7').value = '12/10/2026 - 01/11/2026';
    wsBlank.getCell('D7').value = '12/10/2026 - 01/11/2026';

    wsBlank.getCell('B9').value = 'Tu Te Fund is a transparent community crowdfunding platform built with Next.js 15, PostgreSQL Prisma, and VietQR Escrow. Official Web Demo: https://test-gamma-azure-65.vercel.app | Repository: https://github.com/Escanor292/test';
    wsBlank.getCell('C9').value = 'Tu Te Fund is a transparent community crowdfunding platform built with Next.js 15, PostgreSQL Prisma, and VietQR Escrow. Official Web Demo: https://test-gamma-azure-65.vercel.app | Repository: https://github.com/Escanor292/test';

    // Objectives
    wsBlank.getCell('B12').value = 'OBJECTIVE 1: Transparent Community Crowdfunding';
    wsBlank.getCell('C12').value = 'Provide transparent fundraising campaigns with escrow financial tracking and VietQR';
    wsBlank.getCell('B13').value = 'OBJECTIVE 2: Multi-tier Rewards & E-Commerce Delivery';
    wsBlank.getCell('C13').value = 'Support reward tiers, physical shipment tracking, and backer invoices';
    wsBlank.getCell('B14').value = 'OBJECTIVE 3: Community Updates & Engagement';
    wsBlank.getCell('C14').value = 'Enable TipTap rich-text blog, nested discussion comments, and 1-1 chat';
    wsBlank.getCell('B15').value = 'OBJECTIVE 4: Manual KYC & Administrative Governance';
    wsBlank.getCell('C15').value = 'Ensure system safety via manual 2-side ID card verification, audit logs, and reports';
  }

  // 2. Cập nhật Sheet: Vi_BLANK Product Requirements
  const wsVi = wb.getWorksheet('Vi_BLANK Product Requirements');
  if (wsVi) {
    wsVi.getCell('C2').value = 'Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)';
    wsVi.getCell('D2').value = 'Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)';
    wsVi.getCell('E2').value = 'Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)';

    wsVi.getCell('C3').value = 'Nguyễn Quách Phú Tài (123000609 - Trưởng nhóm), Trần Xuân Ân (123001127), Bùi Đặng Quốc Khánh (123001005), Nguyễn Trung Tiến (123000127), Nguyễn Khánh Du (123000159)';
    wsVi.getCell('D3').value = 'Lớp 23CT113 - Nhóm 02 - GVHD: ThS. Nguyễn Minh Phúc';

    wsVi.getCell('C4').value = '0901234567';
    wsVi.getCell('C5').value = 'nguyenquachphutai@gmail.com';
    wsVi.getCell('C6').value = 'TP. Hồ Chí Minh, Việt Nam';
    wsVi.getCell('C7').value = '12/10/2026 – 01/11/2026 (3 tuần hoàn thành thực tế)';
    wsVi.getCell('D7').value = '12/10/2026 – 01/11/2026';

    wsVi.getCell('B9').value = 'Nền tảng Crowdfunding gây quỹ cộng đồng Tử Tế Fund cung cấp môi trường gây quỹ minh bạch, kết nối Creator và Nhà hảo tâm (Backer). Tích hợp cổng chuyển khoản VietQR giữ hộ (Escrow), xuất Hóa đơn điện tử VAT, chứng nhận đóng góp có mã QR tra cứu (/lookup) và kiểm soát thẩm định KYC thủ công an toàn.';
    wsVi.getCell('C9').value = 'Web Demo chính thức: https://test-gamma-azure-65.vercel.app | Kho mã nguồn GitHub: https://github.com/Escanor292/test | Học phần Kiểm thử Phần mềm 23CT113 - Nhóm 02';

    // Mục tiêu sản phẩm
    wsVi.getCell('B12').value = 'MỤC TIÊU 1: Minh bạch hóa dòng tiền gây quỹ';
    wsVi.getCell('C12').value = 'Toàn bộ dòng tiền ủng hộ được giữ hộ an toàn qua tài khoản Escrow và đối soát minh bạch tại trang /so';

    wsVi.getCell('B13').value = 'MỤC TIÊU 2: Gói phần thưởng và giao vận hàng hóa';
    wsVi.getCell('C13').value = 'Cho phép chủ dự án thiết lập các gói phần thưởng kèm giới hạn số lượng và mã vận đơn theo dõi';

    wsVi.getCell('B14').value = 'MỤC TIÊU 3: Tương tác cộng đồng thời gian thực';
    wsVi.getCell('C14').value = 'Cung cấp blog tin tức, bình luận thảo luận chiến dịch và kênh chat trực tiếp giữa Backer với Creator';

    wsVi.getCell('B15').value = 'MỤC TIÊU 4: Định danh KYC và kiểm duyệt chặt chẽ';
    wsVi.getCell('C15').value = 'Quy trình kiểm duyệt chiến dịch và thẩm định hồ sơ định danh CCCD 2 mặt ngăn chặn gian lận 100%';

    // Các bên liên quan
    wsVi.getCell('B20').value = 'Người ủng hộ (Backer)';
    wsVi.getCell('C20').value = 'Tài khoản Backer (test2@gmail.com/123): Khám phá dự án, ủng hộ tiền, nhận quà và hóa đơn';

    wsVi.getCell('B21').value = 'Chủ dự án (Creator)';
    wsVi.getCell('C21').value = 'Tài khoản Creator (test1@gmail.com/123): Đã xác thực KYC, tạo chiến dịch gây quỹ, quản lý gói quà';

    wsVi.getCell('B22').value = 'Quản trị viên (Admin)';
    wsVi.getCell('C22').value = 'Tài khoản Admin (admin@gmail.com/123): Thẩm định KYC, duyệt chiến dịch, đối soát giải ngân và xử lý vi phạm';

    wsVi.getCell('B23').value = 'Khách vãng lai (Guest)';
    wsVi.getCell('C23').value = 'Xem chiến dịch công khai, tra cứu hóa đơn/chứng nhận tại /lookup, đọc blog tin tức';

    // Yêu cầu chức năng chi tiết FR-001 -> FR-020
    const frRows = [
      { r: 26, title: 'FR-001: Đăng nhập & Xác thực đa phương thức', desc: 'Hỗ trợ đăng nhập email/mật khẩu, Google OAuth, lưu phiên JWT, phân quyền RBAC' },
      { r: 27, title: 'FR-002: Đăng ký & Quản lý mật khẩu an toàn', desc: 'Đăng ký tài khoản mới, mã hóa bcrypt, quên mật khẩu qua email token' },
      { r: 28, title: 'FR-003: Tạo và Quản lý Chiến dịch gây quỹ', desc: 'Khởi tạo chiến dịch nháp DRAFT, cập nhật thông tin, gửi duyệt PENDING_REVIEW' },
      { r: 29, title: 'FR-004: Thẩm định và Phê duyệt Chiến dịch', desc: 'Admin xem xét nội dung, duyệt ACTIVE hoặc từ chối REJECTED kèm lý do' },
      { r: 30, title: 'FR-005: Cập nhật tiến độ dự án (Progress Updates)', desc: 'Creator đăng bài viết cập nhật tiến trình cho người ủng hộ theo dõi' },
      { r: 31, title: 'FR-006: Gói phần thưởng và Đặt hàng (Rewards)', desc: 'Thiết lập các mức quà tặng, quản lý tồn kho, thu thập địa chỉ nhận quà' },
      { r: 32, title: 'FR-007: Thanh toán chuyển khoản VietQR Escrow', desc: 'Hiển thị mã QR ngân hàng, SimulatedPaySteps đối soát qua Admin Settle' },
      { r: 33, title: 'FR-008: Kho đồ số và Lịch sử ủng hộ (/purchases)', desc: 'Backer theo dõi các khoản đã đóng góp, trạng thái giao vận và đánh giá sao' },
      { r: 34, title: 'FR-009: Hóa đơn điện tử VAT (Backer Invoices)', desc: 'Tự động sinh số hóa đơn INV-2026-xxxx, lưu mã số thuế và thông tin tổ chức' },
      { r: 35, title: 'FR-010: Giấy chứng nhận đóng góp kèm mã QR (/lookup)', desc: 'Cấp chứng nhận vinh danh kèm mã QR xác thực công khai tại /lookup' },
      { r: 36, title: 'FR-011: Thẩm định danh tính thủ công (Manual KYC)', desc: 'Người dùng nộp ảnh CCCD 2 mặt và video 5s; Admin phê duyệt nâng quyền CREATOR' },
      { r: 37, title: 'FR-012: Quản trị người dùng và Phân quyền (RBAC)', desc: 'Admin khóa/mở khóa tài khoản (BAN/UNBAN), chuyển đổi vai trò người dùng' },
      { r: 38, title: 'FR-013: Trình soạn thảo Blog TipTap Rich-Text', desc: 'Soạn thảo bài viết blog với định dạng phong phú, chèn ảnh, lưu nháp và xuất bản' },
      { r: 39, title: 'FR-014: Bình luận và Thảo luận cộng đồng', desc: 'Bình luận lồng nhau dưới bài viết blog và chiến dịch, thả cảm xúc reaction' },
      { r: 40, title: 'FR-015: Trò chuyện trực tuyến 1-1 (Direct Chat)', desc: 'Kênh hội thoại trực tiếp giữa Backer và Creator lưu trữ PostgreSQL Prisma' },
    ];

    frRows.forEach(item => {
      wsVi.getCell(`B${item.r}`).value = item.title;
      wsVi.getCell(`C${item.r}`).value = item.desc;
    });

    // Yêu cầu phi chức năng NFR-001 -> NFR-008
    const nfrRows = [
      { r: 43, title: 'NFR-001 (Hiệu năng):', desc: 'Thời gian tải trang chủ và chiến dịch < 3.0 giây trên mạng tiêu chuẩn' },
      { r: 44, title: 'NFR-002 (Bảo mật):', desc: 'Mật khẩu băm Bcrypt salt 10, chống XSS TipTap sanitize, CSRF protection' },
      { r: 45, title: 'NFR-003 (Sẵn sàng):', desc: 'Hệ thống triển khai trên nền tảng Vercel Cloud Serverless đạt uptime 99.9%' },
      { r: 46, title: 'NFR-004 (Toàn vẹn CSDL):', desc: 'Sử dụng PostgreSQL Prisma ORM với khóa ngoại và ràng buộc dữ liệu nghiêm ngặt' },
      { r: 47, title: 'NFR-005 (Tương thích UI/UX):', desc: 'Responsive hoàn hảo trên mobile 390x844 (iPhone 14) và desktop Chrome 1920x1080' },
      { r: 48, title: 'NFR-006 (Khả năng mở rộng):', desc: 'Kiến trúc Next.js App Router xử lý đồng thời 500 người dùng không nghẽn' },
      { r: 49, title: 'NFR-007 (Kiểm toán hệ thống):', desc: 'Mọi thao tác quản trị tài chính, duyệt KYC, ban tài khoản đều ghi audit_logs' },
      { r: 50, title: 'NFR-008 (Định dạng chứng từ):', desc: 'Hóa đơn và chứng nhận xuất tệp PDF theo đúng chuẩn in ấn khổ A4' },
    ];

    nfrRows.forEach(item => {
      wsVi.getCell(`B${item.r}`).value = item.title;
      wsVi.getCell(`C${item.r}`).value = item.desc;
    });
  }

  await wb.xlsx.writeFile(TARGET_FILE);
  console.log('Successfully updated PRD Excel with 5 original sheets intact:', TARGET_FILE);
}

run().catch(console.error);

