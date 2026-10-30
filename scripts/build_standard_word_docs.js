/**
 * scripts/build_standard_word_docs.js
 * Sinh toàn bộ các tài liệu Word chuẩn hóa của bộ hồ sơ kiểm thử Tử Tế Fund:
 *  1. Test Plan_23CT113_Nhom02.docx (Đủ 6 phần chuẩn)
 *  2. Test Report_23CT113_Nhom02.docx (Báo cáo tổng kết: 173 P, 23 F, 4 B, 14 Bug Reports)
 *  3. Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx (Kế hoạch trưởng nhóm & tổng hợp lỗi)
 *  4. 01-IC-Product-Requirements_23CT113_Nhom02.docx (PRD đặc tả yêu cầu chức năng & phi chức năng)
 *  5. Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx (Báo cáo cuối kỳ hoàn chỉnh 8 chương)
 */

const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const BASE_DIR = path.resolve('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)');
const WORD_DIR = path.join(BASE_DIR, 'Word+ppt Báo Cáo');
if (!fs.existsSync(WORD_DIR)) {
  fs.mkdirSync(WORD_DIR, { recursive: true });
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function p(text, opts = {}) {
  const { bold = false, italic = false, size = 24, color = '0F172A', align = 'left', spaceBefore = 80, spaceAfter = 80 } = opts;
  let jc = align !== 'left' ? `<w:jc w:val="${align}"/>` : '';
  return `<w:p><w:pPr>${jc}<w:spacing w:before="${spaceBefore}" w:after="${spaceAfter}"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>${bold ? '<w:b/>' : ''}${italic ? '<w:i/>' : ''}<w:sz w:val="${size}"/><w:color w:val="${color}"/></w:rPr><w:t>${esc(text)}</w:t></w:r></w:p>`;
}

function heading(text, level = 1) {
  const sizes = { 1: 32, 2: 28, 3: 24 };
  const colors = { 1: '1E3A8A', 2: '0D9488', 3: '1E293B' };
  return `<w:p><w:pPr><w:spacing w:before="240" w:after="120"/><w:outlineLvl w:val="${level - 1}"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="${sizes[level] || 24}"/><w:color w:val="${colors[level] || '0F172A'}"/></w:rPr><w:t>${esc(text)}</w:t></w:r></w:p>`;
}

function table(rows, widths, isHeaderFirst = true) {
  const totalW = widths.reduce((a, b) => a + b, 0);
  let xml = `<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:type="dxa" w:w="${totalW}"/><w:tblLook w:firstColumn="1" w:firstRow="1" w:val="04A0"/></w:tblPr><w:tblGrid>`;
  widths.forEach(w => xml += `<w:gridCol w:w="${w}"/>`);
  xml += '</w:tblGrid>';

  rows.forEach((row, rIdx) => {
    const isH = isHeaderFirst && rIdx === 0;
    xml += '<w:tr><w:trPr><w:cantSplit/>' + (isH ? '<w:tblHeader w:val="true"/>' : '') + '</w:trPr>';
    row.forEach((cellVal, cIdx) => {
      const w = widths[cIdx] || 1500;
      xml += `<w:tc><w:tcPr><w:tcW w:type="dxa" w:w="${w}"/>`;
      if (isH) {
        xml += `<w:shd w:val="clear" w:color="auto" w:fill="0F172A"/>`;
      } else if (rIdx % 2 === 1) {
        xml += `<w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/>`;
      }
      xml += `</w:tcPr><w:p><w:pPr><w:spacing w:before="60" w:after="60"/><w:jc w:val="${isH ? 'center' : (cIdx === 0 && w < 1200 ? 'center' : 'left')}"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>${isH ? '<w:b/><w:color w:val="FFFFFF"/>' : '<w:color w:val="0F172A"/>'}<w:sz w:val="20"/></w:rPr><w:t>${esc(cellVal)}</w:t></w:r></w:p></w:tc>`;
    });
    xml += '</w:tr>';
  });

  xml += '</w:tbl>';
  return xml;
}

async function saveDocx(filepath, bodyXml) {
  const zip = new JSZip();
  zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);

  zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

  const docXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>
${bodyXml}
</w:body>
</w:document>`;

  zip.folder('word').file('document.xml', docXml);
  const buf = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync(filepath, buf);
  console.log(`Saved DOCX: ${filepath}`);
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. TẠO TEST PLAN DOCX
// ═══════════════════════════════════════════════════════════════════════════
async function buildTestPlanDocx() {
  let xml = '';
  xml += p('TRƯỜNG ĐẠI HỌC LẠC HỒNG - KHOA CÔNG NGHỆ THÔNG TIN', { bold: true, size: 26, align: 'center', color: '0F172A' });
  xml += p('BỘ MÔN CÔNG NGHỆ PHẦN MỀM — HỌC PHẦN KIỂM THỬ VÀ ĐẢM BẢO CHẤT LƯỢNG PHẦN MỀM', { size: 22, align: 'center', color: '475569' });
  xml += p('KẾ HOẠCH KIỂM THỬ TOÀN DIỆN (TEST PLAN)', { bold: true, size: 36, align: 'center', color: '1E3A8A', spaceBefore: 300, spaceAfter: 150 });
  xml += p('Đề tài: Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)', { bold: true, size: 26, align: 'center', color: '0D9488' });
  xml += p('Web Demo chính thức: https://test-gamma-azure-65.vercel.app', { italic: true, size: 22, align: 'center', color: '2563EB', spaceAfter: 300 });

  xml += heading('1. THÔNG TIN DỰ ÁN VÀ ĐỘI NGŨ THỰC HIỆN', 1);
  xml += p('• Tên đề tài: Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)');
  xml += p('• Lớp: 23CT113 — Nhóm thực hiện: Nhóm 02');
  xml += p('• Giảng viên hướng dẫn: ThS. Nguyễn Minh Phúc');
  xml += p('• Thời gian thực hiện: 12/10/2026 – 01/11/2026 (Cố định 3 tuần, 100% hoàn thành thực tế)');
  xml += p('• Kho mã nguồn GitHub: https://github.com/Escanor292/test');
  xml += p('• Web Demo trực tuyến: https://test-gamma-azure-65.vercel.app');

  xml += p('Bảng phân công nhân sự và phân hệ kiểm thử (16 TR & 40 TC / thành viên):', { bold: true, spaceBefore: 120 });
  xml += table([
    ['STT', 'Họ và tên', 'MSSV', 'Vai trò', 'Phân hệ phụ trách (16 TR & 40 TC)', 'Review chéo', 'Đóng góp'],
    ['1', 'Nguyễn Quách Phú Tài', '123000609', 'Trưởng nhóm', 'AUTH & DONATE (TR-001 -> TR-016, 40 TC)', 'Review cho Trần Xuân Ân', '100% (20%)'],
    ['2', 'Trần Xuân Ân', '123001127', 'Thành viên', 'CAMP & DISBURSE (TR-017 -> TR-032, 40 TC)', 'Review cho Bùi Đặng Quốc Khánh', '100% (20%)'],
    ['3', 'Bùi Đặng Quốc Khánh', '123001005', 'Thành viên', 'USER & ADMIN (TR-033 -> TR-048, 40 TC)', 'Review cho Nguyễn Trung Tiến', '100% (20%)'],
    ['4', 'Nguyễn Trung Tiến', '123000127', 'Thành viên', 'BLOG & CHAT (TR-049 -> TR-064, 40 TC)', 'Review cho Nguyễn Khánh Du', '100% (20%)'],
    ['5', 'Nguyễn Khánh Du', '123000159', 'Thành viên', 'STATS & SYSTEM (TR-065 -> TR-080, 40 TC)', 'Review cho Nguyễn Quách Phú Tài', '100% (20%)'],
  ], [600, 2200, 1100, 1200, 2500, 1800, 1100]);

  xml += heading('2. TÀI KHOẢN VÀ DỮ LIỆU KIỂM THỬ MẪU (SEED DATA)', 1);
  xml += p('Hệ thống kiểm thử sử dụng 4 tài khoản mẫu khớp cấu hình README.md và prisma/seed:');
  xml += table([
    ['Vai trò (Role)', 'Tài khoản Email', 'Mật khẩu', 'Mục đích kiểm thử & Phân quyền'],
    ['ADMIN', 'admin@gmail.com', '123', 'Quản trị hệ thống, thẩm định KYC, duyệt chiến dịch, đối soát giải ngân'],
    ['CREATOR', 'test1@gmail.com', '123', 'Đã xác thực KYC, tạo chiến dịch gây quỹ, quản lý gói quà và cập nhật tiến độ'],
    ['USER (Backer)', 'test2@gmail.com', '123', 'Nhà hảo tâm ủng hộ tiền, nhận quà, theo dõi lịch sử /purchases và nhận hóa đơn'],
    ['USER (Thường)', 'test3@gmail.com', '123', 'Người dùng mới chưa nộp KYC, thử nghiệm luồng nâng cấp quyền và nộp đơn'],
  ], [1500, 2500, 1000, 5000]);

  xml += heading('3. PHẠM VI KIỂM THỬ (TEST SCOPE)', 1);
  xml += p('Phạm vi bao gồm 10 phân hệ nghiệp vụ hoàn chỉnh của Tử Tế Fund:');
  xml += p('1. AUTH: Quản lý đăng nhập, Google OAuth, đăng ký, quên mật khẩu và RBAC');
  xml += p('2. DONATE: Ủng hộ giỏ quà, thanh toán VietQR Escrow giữ hộ, Kho đồ số /purchases');
  xml += p('3. CAMP: Khởi tạo chiến dịch, gửi duyệt PENDING, đăng cập nhật tiến độ dự án');
  xml += p('4. DISBURSE: Giải ngân Creator, Hóa đơn điện tử VAT, chứng nhận đóng góp /lookup');
  xml += p('5. USER: Hồ sơ cá nhân /profile, nộp hồ sơ KYC thủ công (CCCD 2 mặt + video 5s)');
  xml += p('6. ADMIN: Quản lý người dùng (BAN/UNBAN), duyệt KYC/chiến dịch, từ khóa cấm Blacklist');
  xml += p('7. BLOG: Soạn thảo bài viết TipTap Rich-Text, quản lý bản nháp, bình luận lồng nhau');
  xml += p('8. CHAT: Trò chuyện trực tuyến 1-1 Backer-Creator, chuông thông báo, hòm thư /gop-y');
  xml += p('9. STATS: Thống kê doanh thu, biểu đồ tài chính, sổ đối soát minh bạch /so');
  xml += p('10. SYSTEM: Hiệu năng tải trang < 3s, responsive mobile 390px, bảo mật CSP/CSRF');

  xml += heading('4. TIÊU CHUẨN NGHIỆM THU VÀ CHỈ SỐ CHẤT LƯỢNG', 1);
  xml += p('• Tổng số Yêu cầu kiểm thử (TR): 80 TRs phủ đủ 4 kỹ thuật (Functional, Boundary, Look & Feel, Negative)');
  xml += p('• Tổng số Kịch bản kiểm thử (TC): 200 TCs (81 High, 79 Medium, 40 Low)');
  xml += p('• Tiêu chuẩn nghiệm thu đề ra: Tỷ lệ PASS thực tế phải đạt tối thiểu ≥ 85.0%');
  xml += p('• Kết quả đạt được thực tế: 173 PASS / 200 TCs (Đạt 86.5%, vượt chỉ tiêu đề ra)');
  xml += p('• Không có lỗi nghiêm trọng (Critical Blockers) trên các luồng nghiệp vụ cốt lõi P0');

  await saveDocx(path.join(BASE_DIR, 'Test Plan_23CT113_Nhom02.docx'), xml);
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. TẠO TEST REPORT DOCX
// ═══════════════════════════════════════════════════════════════════════════
async function buildTestReportDocx() {
  let xml = '';
  xml += p('TRƯỜNG ĐẠI HỌC LẠC HỒNG - KHOA CÔNG NGHỆ THÔNG TIN', { bold: true, size: 26, align: 'center', color: '0F172A' });
  xml += p('BÁO CÁO TỔNG KẾT KẾT QUẢ KIỂM THỬ THỰC TẾ (TEST REPORT)', { bold: true, size: 34, align: 'center', color: '1E3A8A', spaceBefore: 250, spaceAfter: 120 });
  xml += p('Đề tài: Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)', { bold: true, size: 26, align: 'center', color: '0D9488' });
  xml += p('Web Demo chính thức: https://test-gamma-azure-65.vercel.app', { italic: true, size: 22, align: 'center', color: '2563EB', spaceAfter: 250 });

  xml += heading('1. TỔNG QUAN KẾT QUẢ THỰC THI (173 PASS / 23 FAIL / 4 BLOCKED)', 1);
  xml += p('Dự án đã hoàn thành thực thi kiểm thử 100% trên toàn bộ 200 Test Cases thuộc 10 phân hệ nghiệp vụ. Kết quả phản ánh trung thực trạng thái mã nguồn thực tế:');

  xml += table([
    ['Mã phân hệ', 'Tên phân hệ chi tiết', 'Người phụ trách', 'Số TR', 'Tổng TC', 'PASS', 'FAIL', 'BLOCKED', 'Tỷ lệ PASS'],
    ['AUTH', 'Quản lý Đăng nhập & Xác thực', 'Nguyễn Quách Phú Tài', '8', '20', '17', '3', '0', '85.0%'],
    ['DONATE', 'Ủng hộ, Giỏ quà & Thanh toán', 'Nguyễn Quách Phú Tài', '8', '20', '14', '2', '4', '70.0%'],
    ['CAMP', 'Dự án & Chiến dịch Gây quỹ', 'Trần Xuân Ân', '8', '20', '15', '5', '0', '75.0%'],
    ['DISBURSE', 'Giải ngân, Hóa đơn & Chứng từ', 'Trần Xuân Ân', '8', '20', '18', '2', '0', '90.0%'],
    ['USER', 'Hồ sơ cá nhân & KYC thủ công', 'Bùi Đặng Quốc Khánh', '8', '20', '17', '3', '0', '85.0%'],
    ['ADMIN', 'Quản trị Hệ thống & Kiểm duyệt', 'Bùi Đặng Quốc Khánh', '8', '20', '18', '2', '0', '90.0%'],
    ['BLOG', 'Tin tức & Bài viết Cộng đồng', 'Nguyễn Trung Tiến', '8', '20', '19', '1', '0', '95.0%'],
    ['CHAT', 'Trò chuyện, Bình luận & Thông báo', 'Nguyễn Trung Tiến', '8', '20', '17', '3', '0', '85.0%'],
    ['STATS', 'Thống kê Doanh thu & Tra cứu', 'Nguyễn Khánh Du', '8', '20', '18', '2', '0', '90.0%'],
    ['SYSTEM', 'Hiệu năng, Bảo mật & Giao diện', 'Nguyễn Khánh Du', '8', '20', '20', '0', '0', '100.0%'],
    ['TỔNG', 'Toàn bộ 10 Phân hệ Tử Tế Fund', '5 Thành viên Nhóm 02', '80', '200', '173', '23', '4', '86.5%'],
  ], [800, 2400, 2000, 700, 800, 700, 700, 800, 1100]);

  xml += heading('2. DANH SÁCH TỔNG HỢP 14 BUG REPORTS (BUG-001 -> BUG-014)', 1);
  xml += table([
    ['Mã lỗi', 'Phân hệ', 'Mức độ', 'Mô tả ngắn lỗi thực tế phát hiện', 'Nguyên nhân trong mã nguồn', 'Trạng thái'],
    ['BUG-001', 'AUTH', 'High', 'Chưa chặn mật khẩu < 8 ký tự và > 64 ký tự', 'register/route.ts chỉ check length < 6, thiếu max length', 'Open'],
    ['BUG-002', 'AUTH', 'Medium', 'Token reset pass còn hạn ở phút 20', 'password-reset.ts để TTL 30 phút thay vì 15 phút', 'Open'],
    ['BUG-003', 'DONATE', 'High', 'Webhook trả 410 Gone, cổng E-Wallet/Card tắt', 'Cổng thanh toán bên thứ ba đã tắt, đối soát admin settle', 'By Design'],
    ['BUG-004', 'DONATE', 'Medium', 'Chưa hỗ trợ phương thức COD', 'Enum PaymentMethod chỉ có BANK_TRANSFER, E_WALLET, CREDIT_CARD', 'Blocked'],
    ['BUG-005', 'DONATE', 'Medium', 'Chưa chặn tải quá 10 ảnh cho 1 Reward', 'upload/route.ts chỉ check dung lượng file, chưa check số lượng', 'Open'],
    ['BUG-006', 'CAMP', 'High', 'Chưa chặn tiêu đề chiến dịch < 10 hoặc > 120 ký tự', 'create-campaign.ts chỉ check if (!title) khác rỗng', 'Open'],
    ['BUG-007', 'CAMP', 'Medium', 'Chưa chặn endDate <= ngày hiện tại ở backend', 'campaigns/route.ts chưa so sánh endDate với now()', 'Open'],
    ['BUG-008', 'CAMP', 'High', 'Thông báo lỗi tiếng Anh/500 khi Pledge vào chiến dịch chưa ACTIVE', 'Thiếu bắt ngoại lệ trạng thái chiến dịch thân thiện', 'Open'],
    ['BUG-009', 'DISBURSE', 'Medium', 'Thông tin thuế static và lệch khung khi tên dài > 100 ký tự', 'hoa-don/[number]/page.tsx dùng mẫu cứng, thiếu break-words', 'Open'],
    ['BUG-010', 'USER', 'Medium', 'Thiếu counter 500 ký tự Bio và chưa khóa nút gửi khi thiếu ảnh KYC', 'Client profile và form /kyc thiếu inline validation', 'Open'],
    ['BUG-011', 'ADMIN', 'Medium', 'Cho phép lý do từ chối 1-9 ký tự và Feedback Queue dạng bảng tĩnh', 'Modal reject chỉ check !reason; feedback thiếu nút update', 'Open'],
    ['BUG-012', 'BLOG', 'Medium', 'Tìm kiếm từ khóa dài > 80 ký tự không khoảng trắng bị tràn nhãn', 'Thẻ hiển thị từ khóa /blog thiếu class truncate/break-words', 'Open'],
    ['BUG-013', 'CHAT', 'Medium', 'Chat REST API chưa có WebSocket realtime; ngưỡng /gop-y lệch PRD', 'chat.service.ts lưu DB thuần; feedback check 10-2000 ký tự', 'Open'],
    ['BUG-014', 'STATS', 'Low', 'Datepicker chưa khóa startDate > endDate và mất query param khi F5', 'stats/page.tsx thiếu ràng buộc Datepicker và sync URL', 'Open'],
  ], [900, 900, 800, 3000, 3200, 1000]);

  xml += heading('3. KẾT LUẬN VÀ KIẾN NGHỊ NGHIỆM THU', 1);
  xml += p('• Tỷ lệ đạt 86.5% (173/200 TCs) đáp ứng đầy đủ tiêu chí chất lượng đề ra trong Test Plan (≥ 85.0%).');
  xml += p('• Các luồng cốt lõi: Đăng nhập RBAC, tạo chiến dịch, chuyển khoản VietQR giữ hộ, hóa đơn điện tử VAT và tra cứu chứng nhận /lookup hoạt động ổn định và chính xác 100% trên Web Demo.');
  xml += p('• 14 Bug Reports đã được phân loại chi tiết để đội ngũ phát triển khắc phục trong phiên bản tiếp theo.');

  await saveDocx(path.join(BASE_DIR, 'Test Report_23CT113_Nhom02.docx'), xml);
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. TẠO KẾ HOẠCH TRƯỞNG NHÓM & BÁO CÁO CUỐI KỲ DOCX
// ═══════════════════════════════════════════════════════════════════════════
async function buildLeaderReportDocx() {
  let xml = '';
  xml += p('TRƯỜNG ĐẠI HỌC LẠC HỒNG - KHOA CÔNG NGHỆ THÔNG TIN', { bold: true, size: 26, align: 'center', color: '0F172A' });
  xml += p('BÁO CÁO TỔNG HỢP CỦA TRƯỞNG NHÓM VỀ KẾ HOẠCH VÀ KẾT QUẢ KIỂM THỬ CUỐI KỲ', { bold: true, size: 32, align: 'center', color: '1E3A8A', spaceBefore: 250, spaceAfter: 120 });
  xml += p('Học phần: Kiểm thử và Đảm bảo Chất lượng Phần mềm | Lớp: 23CT113 - Nhóm: Nhóm 02', { size: 22, align: 'center', color: '475569' });
  xml += p('Trưởng nhóm: Nguyễn Quách Phú Tài (MSSV: 123000609)', { bold: true, size: 24, align: 'center', color: '0D9488', spaceAfter: 250 });

  xml += heading('1. ĐÁNH GIÁ TIẾN ĐỘ VÀ SỰ ĐÓNG GÓP CỦA CÁC THÀNH VIÊN', 1);
  xml += p('Trong suốt 3 tuần thực hiện (12/10/2026 – 01/11/2026), toàn bộ 5 thành viên Nhóm 02 đã phối hợp chặt chẽ, hoàn thành 100% khối lượng công việc được giao:');

  xml += table([
    ['STT', 'Thành viên', 'MSSV', 'Vai trò', 'Nhiệm vụ phân hệ', 'Khối lượng', 'Review chéo', 'Đánh giá'],
    ['1', 'Nguyễn Quách Phú Tài', '123000609', 'Trưởng nhóm', 'AUTH & DONATE', '16 TR & 40 TC', 'Review Trần Xuân Ân', '100% (20%) - Xuất sắc'],
    ['2', 'Trần Xuân Ân', '123001127', 'Thành viên', 'CAMP & DISBURSE', '16 TR & 40 TC', 'Review Bùi Đặng Quốc Khánh', '100% (20%) - Tốt'],
    ['3', 'Bùi Đặng Quốc Khánh', '123001005', 'Thành viên', 'USER & ADMIN', '16 TR & 40 TC', 'Review Nguyễn Trung Tiến', '100% (20%) - Tốt'],
    ['4', 'Nguyễn Trung Tiến', '123000127', 'Thành viên', 'BLOG & CHAT', '16 TR & 40 TC', 'Review Nguyễn Khánh Du', '100% (20%) - Tốt'],
    ['5', 'Nguyễn Khánh Du', '123000159', 'Thành viên', 'STATS & SYSTEM', '16 TR & 40 TC', 'Review Nguyễn Quách Phú Tài', '100% (20%) - Tốt'],
  ], [600, 2000, 1100, 1200, 1800, 1400, 1800, 1600]);

  xml += heading('2. TỔNG HỢP KẾT QUẢ THỰC THI KIỂM THỬ (173 PASS / 23 FAIL / 4 BLOCKED)', 1);
  xml += p('• Tổng số TR: 80 TRs phủ trọn vẹn 10 phân hệ nền tảng.');
  xml += p('• Tổng số TC: 200 TCs (81 High, 79 Medium, 40 Low).');
  xml += p('• Kết quả: 173 PASS (86.5%), 23 FAIL (11.5%), 4 BLOCKED (2.0%).');
  xml += p('• Hệ thống đạt chuẩn chất lượng đề ra (≥ 85.0%), minh bạch và trung thực với mã nguồn.');

  xml += heading('3. BẢNG CHI TIẾT 14 BUG REPORTS PHÁT HIỆN TRONG QUÁ TRÌNH TEST', 1);
  xml += table([
    ['Mã Bug', 'Phân hệ', 'Tiêu đề lỗi phát hiện', 'Mức độ', 'Hướng xử lý đề xuất'],
    ['BUG-001', 'AUTH', 'Mật khẩu 6-7 ký tự đăng ký được, chưa chặn > 64 ký tự', 'High', 'Sửa validation API register/route.ts min 8, max 64'],
    ['BUG-002', 'AUTH', 'Token reset password hết hạn sau 30 phút thay vì 15 phút', 'Medium', 'Đổi PASSWORD_RESET_TTL_MS thành 15 * 60 * 1000'],
    ['BUG-003', 'DONATE', 'Webhook trả 410 Gone, ví điện tử/thẻ tắt', 'High', 'Hệ thống thiết kế đối soát qua Admin Settle'],
    ['BUG-004', 'DONATE', 'Chưa có phương thức COD trong enum PaymentMethod', 'Medium', 'Bổ sung COD vào schema.prisma khi triển khai shipper'],
    ['BUG-005', 'DONATE', 'Chưa giới hạn tối đa 10 ảnh cho 1 Reward', 'Medium', 'Kiểm tra tổng số file ảnh tải lên tại upload/route.ts'],
    ['BUG-006', 'CAMP', 'Chưa chặn tiêu đề chiến dịch < 10 hoặc > 120 ký tự', 'High', 'Thêm validation độ dài tiêu đề ở create-campaign.ts'],
    ['BUG-007', 'CAMP', 'Chưa chặn endDate <= ngày hiện tại ở server', 'Medium', 'Kiểm tra endDate > now() + 7 days ở API campaigns'],
    ['BUG-008', 'CAMP', 'Pledge vào chiến dịch DRAFT/PENDING báo lỗi chưa rõ', 'High', 'Trả thông báo tiếng Việt giải thích rõ ràng'],
    ['BUG-009', 'DISBURSE', 'Hóa đơn dùng thông tin thuế mẫu cứng, lệch khung khi tên dài', 'Medium', 'Lấy dữ liệu thuế động từ DB và thêm break-words'],
    ['BUG-010', 'USER', 'Thiếu counter 500 ký tự Bio và chưa khóa nút gửi KYC', 'Medium', 'Thêm bộ đếm ký tự client và validate form /kyc'],
    ['BUG-011', 'ADMIN', 'Lý do từ chối 1-9 ký tự được chấp nhận, Feedback tĩnh', 'Medium', 'Bắt buộc min 10 ký tự và thêm nút cập nhật feedback'],
    ['BUG-012', 'BLOG', 'Tìm kiếm từ khóa dài > 80 ký tự không khoảng trắng bị tràn', 'Medium', 'Thêm class truncate/overflow-hidden vào nhãn search'],
    ['BUG-013', 'CHAT', 'Chat chưa có WebSocket realtime, /gop-y ngưỡng 10-2000', 'Medium', 'Tích hợp WebSocket push và chỉnh ngưỡng 15-1000'],
    ['BUG-014', 'STATS', 'Datepicker cho chọn startDate > endDate, mất query F5', 'Low', 'Khóa Datepicker và đồng bộ tham số URL với state'],
  ], [900, 900, 3600, 900, 3500]);

  await saveDocx(path.join(BASE_DIR, 'Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx'), xml);
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. TẠO 01-IC-PRODUCT-REQUIREMENTS DOCX
// ═══════════════════════════════════════════════════════════════════════════
async function buildPrdDocx() {
  let xml = '';
  xml += p('ĐẶC TẢ YÊU CẦU SẢN PHẨM (PRODUCT REQUIREMENTS DOCUMENT - PRD)', { bold: true, size: 32, align: 'center', color: '1E3A8A' });
  xml += p('Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)', { bold: true, size: 26, align: 'center', color: '0D9488', spaceAfter: 200 });
  xml += p('Web Demo chính thức: https://test-gamma-azure-65.vercel.app', { italic: true, size: 22, align: 'center', color: '2563EB', spaceAfter: 250 });

  xml += heading('1. TỔNG QUAN VÀ MỤC TIÊU DỰ ÁN', 1);
  xml += p('Tử Tế Fund là nền tảng gây quỹ cộng đồng minh bạch kết nối Nhà hảo tâm (Backer) và Chủ dự án (Creator). Tích hợp chuyển khoản trung gian VietQR Escrow, xuất hóa đơn VAT, cấp chứng nhận đóng góp tra cứu công khai tại /lookup và thẩm định KYC thủ công an toàn.');

  xml += heading('2. DANH SÁCH YÊU CẦU CHỨC NĂNG (FR-001 -> FR-020)', 1);
  const frs = [
    ['FR-001', 'Đăng nhập mật khẩu & Google OAuth', 'AUTH', 'Xác thực credentials, lưu JWT session, phân luồng điều hướng RBAC'],
    ['FR-002', 'Đăng ký & Quên mật khẩu', 'AUTH', 'Đăng ký tài khoản mới, mã hóa bcrypt, reset password qua email token'],
    ['FR-003', 'Tạo và Lưu nháp Chiến dịch', 'CAMP', 'Khởi tạo chiến dịch nháp DRAFT, cập nhật thông tin và mục tiêu tài chính'],
    ['FR-004', 'Thẩm định duyệt Chiến dịch', 'CAMP', 'Admin phê duyệt ACTIVE hoặc từ chối REJECTED kèm lý do rõ ràng'],
    ['FR-005', 'Cập nhật tiến độ dự án', 'CAMP', 'Creator đăng bài viết cập nhật tiến trình (Updates) cho người ủng hộ'],
    ['FR-006', 'Gói phần thưởng & Đặt hàng', 'DONATE', 'Thiết lập các gói quà Reward, quản lý số suất quà và địa chỉ giao hàng'],
    ['FR-007', 'Thanh toán VietQR Escrow', 'DONATE', 'Mã QR ngân hàng, SimulatedPaySteps đối soát qua Admin Settle'],
    ['FR-008', 'Kho đồ số cá nhân (/purchases)', 'DONATE', 'Backer xem lịch sử các khoản ủng hộ, mã vận đơn và đánh giá sao'],
    ['FR-009', 'Hóa đơn điện tử VAT', 'DISBURSE', 'Tự động tạo hóa đơn INV-2026-xxxx, lưu MST và thông tin doanh nghiệp'],
    ['FR-010', 'Giấy chứng nhận đóng góp', 'DISBURSE', 'Cấp chứng nhận vinh danh kèm mã QR xác thực trực tuyến tại /lookup'],
    ['FR-011', 'Định danh KYC thủ công', 'USER', 'Nộp ảnh CCCD 2 mặt và video 5s; Admin phê duyệt nâng quyền CREATOR'],
    ['FR-012', 'Quản trị người dùng & Phân quyền', 'ADMIN', 'Admin khóa/mở khóa tài khoản (BAN/UNBAN), quản lý danh sách người dùng'],
    ['FR-013', 'Blog tin tức TipTap Rich-Text', 'BLOG', 'Soạn thảo bài viết blog, lưu nháp DRAFT và xuất bản PUBLISHED'],
    ['FR-014', 'Bình luận thảo luận cộng đồng', 'BLOG', 'Bình luận lồng nhau dưới bài viết blog và chiến dịch, thả cảm xúc'],
    ['FR-015', 'Hội thoại trực tiếp 1-1', 'CHAT', 'Kênh chat trực tiếp giữa Backer và Creator lưu trữ PostgreSQL Prisma'],
    ['FR-016', 'Chuông thông báo thời gian thực', 'CHAT', 'Thông báo khi có đơn hàng mới, cập nhật chiến dịch hoặc tin nhắn đến'],
    ['FR-017', 'Hòm thư góp ý (/gop-y)', 'CHAT', 'Người dùng gửi ý kiến đóng góp cho nền tảng (nội dung 15-1000 ký tự)'],
    ['FR-018', 'Báo cáo minh bạch dòng tiền (/so)', 'STATS', 'Công khai tổng tiền thu, tiền giải ngân, tiền tip vận hành sàn'],
    ['FR-019', 'Biểu đồ phân tích tài chính', 'STATS', 'Thống kê doanh thu theo thời gian với Datepicker lọc ngày tùy chọn'],
    ['FR-020', 'Chế độ Tối/Sáng & Responsive', 'SYSTEM', 'Chuyển đổi Dark Mode/Light Mode mượt mà, responsive mobile 390px'],
  ];
  xml += table([
    ['Mã FR', 'Tên yêu cầu chức năng', 'Phân hệ', 'Mô tả chi tiết yêu cầu'],
    ...frs
  ], [1000, 2600, 1200, 5000]);

  xml += heading('3. YÊU CẦU PHI CHỨC NĂNG (NFR-001 -> NFR-008)', 1);
  const nfrs = [
    ['NFR-001', 'Hiệu năng', 'Thời gian tải trang chủ và trang chiến dịch < 3.0s trên mạng tiêu chuẩn'],
    ['NFR-002', 'Bảo mật', 'Mật khẩu băm bcrypt salt 10, chống XSS TipTap sanitize, CSRF protection'],
    ['NFR-003', 'Độ sẵn sàng', 'Hệ thống triển khai trên nền tảng Vercel Cloud Serverless đạt uptime 99.9%'],
    ['NFR-004', 'Toàn vẹn CSDL', 'PostgreSQL Prisma ORM với khóa ngoại và ràng buộc dữ liệu nghiêm ngặt'],
    ['NFR-005', 'Tương thích UI/UX', 'Responsive hoàn hảo trên mobile 390x844 (iPhone 14) và desktop Chrome'],
    ['NFR-006', 'Khả năng mở rộng', 'Kiến trúc Next.js App Router xử lý đồng thời 500 người dùng không nghẽn'],
    ['NFR-007', 'Kiểm toán hệ thống', 'Mọi thao tác quản trị tài chính, duyệt KYC, ban tài khoản đều ghi audit_logs'],
    ['NFR-008', 'Định dạng chứng từ', 'Hóa đơn và chứng nhận xuất tệp PDF theo đúng chuẩn in ấn khổ A4'],
  ];
  xml += table([
    ['Mã NFR', 'Khía cạnh phi chức năng', 'Mô tả tiêu chuẩn kỹ thuật'],
    ...nfrs
  ], [1200, 2400, 6200]);

  await saveDocx(path.join(BASE_DIR, '01-IC-Product-Requirements_23CT113_Nhom02.docx'), xml);
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. TẠO BÁO CÁO CUỐI KỲ HOÀN CHỈNH 8 CHƯƠNG (Báo Cáo Word_23CT113_Nhom02.docx)
// ═══════════════════════════════════════════════════════════════════════════
async function buildFullFinalReportDocx() {
  let xml = '';
  xml += p('BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC LẠC HỒNG', { bold: true, size: 26, align: 'center', color: '0F172A' });
  xml += p('KHOA CÔNG NGHỆ THÔNG TIN — BỘ MÔN CÔNG NGHỆ PHẦN MỀM', { size: 22, align: 'center', color: '475569' });
  xml += p('BÁO CÁO CUỐI KỲ HỌC PHẦN KIỂM THỬ VÀ ĐẢM BẢO CHẤT LƯỢNG PHẦN MỀM', { bold: true, size: 30, align: 'center', color: '1E3A8A', spaceBefore: 300, spaceAfter: 150 });
  xml += p('Đề tài: NỀN TẢNG CROWDFUNDING GÂY QUỸ CỘNG ĐỒNG (TỬ TẾ FUND)', { bold: true, size: 32, align: 'center', color: '0D9488' });
  xml += p('Web Demo chính thức: https://test-gamma-azure-65.vercel.app', { italic: true, size: 22, align: 'center', color: '2563EB', spaceAfter: 300 });

  xml += p('Lớp: 23CT113 — Nhóm: Nhóm 02', { bold: true, size: 24, align: 'center' });
  xml += p('Giảng viên hướng dẫn: ThS. Nguyễn Minh Phúc', { bold: true, size: 24, align: 'center', spaceAfter: 200 });

  xml += p('DANH SÁCH THÀNH VIÊN NHÓM 02:', { bold: true, size: 22 });
  xml += table([
    ['STT', 'Họ và tên', 'MSSV', 'Vai trò', 'Phân hệ phụ trách', 'Đóng góp'],
    ['1', 'Nguyễn Quách Phú Tài', '123000609', 'Trưởng nhóm', 'AUTH & DONATE (TR-001 -> TR-016, 40 TC)', '100% (20%)'],
    ['2', 'Trần Xuân Ân', '123001127', 'Thành viên', 'CAMP & DISBURSE (TR-017 -> TR-032, 40 TC)', '100% (20%)'],
    ['3', 'Bùi Đặng Quốc Khánh', '123001005', 'Thành viên', 'USER & ADMIN (TR-033 -> TR-048, 40 TC)', '100% (20%)'],
    ['4', 'Nguyễn Trung Tiến', '123000127', 'Thành viên', 'BLOG & CHAT (TR-049 -> TR-064, 40 TC)', '100% (20%)'],
    ['5', 'Nguyễn Khánh Du', '123000159', 'Thành viên', 'STATS & SYSTEM (TR-065 -> TR-080, 40 TC)', '100% (20%)'],
  ], [600, 2200, 1100, 1400, 3200, 1200]);

  xml += heading('CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI VÀ HỆ THỐNG KIỂM THỬ', 1);
  xml += p('Tử Tế Fund là nền tảng gây quỹ cộng đồng trực tuyến được xây dựng bằng công nghệ hiện đại Next.js 15 App Router, cơ sở dữ liệu PostgreSQL Prisma ORM, và cơ chế chuyển khoản giữ hộ VietQR Escrow.');
  xml += p('Dự án được triển khai kiểm thử thực tế trong 3 tuần (12/10/2026 – 01/11/2026) với mục tiêu đảm bảo chất lượng, tính minh bạch và an toàn tài chính tuyệt đối.');

  xml += heading('CHƯƠNG 2: ĐẶC TẢ YÊU CẦU KIỂM THỬ (80 TR)', 1);
  xml += p('Nhóm đã xây dựng 80 Yêu cầu kiểm thử (TR-001 -> TR-080) phân bổ đều cho 10 phân hệ, mỗi phân hệ 8 TR phủ đủ 4 kỹ thuật kiểm thử cốt lõi:');
  xml += p('• Functional (Kiểm thử chức năng luồng chuẩn - Happy Path)');
  xml += p('• Boundary (Kiểm thử giá trị biên độ dài, số tiền, dung lượng file)');
  xml += p('• Negative / Security (Kiểm thử ngoại lệ, bảo mật XSS, SQLi, Rate Limiting, RBAC)');
  xml += p('• Look & Feel (Kiểm thử giao diện UI/UX, Responsive Mobile 390px, Dark Mode)');

  xml += heading('CHƯƠNG 3: THIẾT KẾ 200 KỊCH BẢN KIỂM THỬ (TEST CASES)', 1);
  xml += p('Bộ kịch bản gồm đúng 200 Test Cases (20 TC/phân hệ, 40 TC/thành viên), phân bổ theo độ ưu tiên:');
  xml += p('• 81 Test Cases High (Nghiệp vụ P0 bắt buộc chạy kiểm thử)');
  xml += p('• 79 Test Cases Medium (Nghiệp vụ phụ, giá trị biên và validation)');
  xml += p('• 40 Test Cases Low (Giao diện UI/UX, responsive và tương thích trình duyệt)');

  xml += heading('CHƯƠNG 4: KẾT QUẢ THỰC THI KIỂM THỬ THỰC TẾ (173 PASS / 23 FAIL / 4 BLOCKED)', 1);
  xml += p('Toàn bộ 200 TC đã được thực thi trực tiếp trên Web Demo https://test-gamma-azure-65.vercel.app:');
  xml += p('• PASS: 173 / 200 TCs (86.5%) — Vượt chỉ tiêu chất lượng đề ra trong Test Plan (≥ 85.0%).');
  xml += p('• FAIL: 23 / 200 TCs (11.5%) — Phát hiện 14 lỗi thực tế về validation biên, thiếu client check.');
  xml += p('• BLOCKED: 4 / 200 TCs (2.0%) — Do cổng thanh toán bên thứ ba và COD chưa mở trong schema.');

  xml += table([
    ['Mã phân hệ', 'Tên phân hệ', 'Người phụ trách', 'Tổng TC', 'PASS', 'FAIL', 'BLOCKED', 'Tỷ lệ PASS'],
    ['AUTH', 'Quản lý Đăng nhập & Xác thực', 'Nguyễn Quách Phú Tài', '20', '17', '3', '0', '85.0%'],
    ['DONATE', 'Ủng hộ, Giỏ quà & Thanh toán', 'Nguyễn Quách Phú Tài', '20', '14', '2', '4', '70.0%'],
    ['CAMP', 'Dự án & Chiến dịch Gây quỹ', 'Trần Xuân Ân', '20', '15', '5', '0', '75.0%'],
    ['DISBURSE', 'Giải ngân, Hóa đơn & Chứng từ', 'Trần Xuân Ân', '20', '18', '2', '0', '90.0%'],
    ['USER', 'Hồ sơ cá nhân & KYC thủ công', 'Bùi Đặng Quốc Khánh', '20', '17', '3', '0', '85.0%'],
    ['ADMIN', 'Quản trị Hệ thống & Kiểm duyệt', 'Bùi Đặng Quốc Khánh', '20', '18', '2', '0', '90.0%'],
    ['BLOG', 'Tin tức & Bài viết Cộng đồng', 'Nguyễn Trung Tiến', '20', '19', '1', '0', '95.0%'],
    ['CHAT', 'Trò chuyện, Bình luận & Thông báo', 'Nguyễn Trung Tiến', '20', '17', '3', '0', '85.0%'],
    ['STATS', 'Thống kê Doanh thu & Tra cứu', 'Nguyễn Khánh Du', '20', '18', '2', '0', '90.0%'],
    ['SYSTEM', 'Hiệu năng, Bảo mật & Giao diện', 'Nguyễn Khánh Du', '20', '20', '0', '0', '100.0%'],
    ['TỔNG', 'Toàn bộ 10 Phân hệ', '5 Thành viên Nhóm 02', '200', '173', '23', '4', '86.5%'],
  ], [900, 2600, 2200, 800, 800, 800, 800, 1100]);

  xml += heading('CHƯƠNG 5: QUẢN LÝ LỖI VÀ DANH SÁCH 14 BUG REPORTS', 1);
  xml += p('14 lỗi thực tế phát hiện được bóc tách chi tiết:');
  const bugs = [
    ['BUG-001', 'AUTH', 'Mật khẩu 6-7 ký tự đăng ký được; chưa chặn > 64 ký tự', 'High'],
    ['BUG-002', 'AUTH', 'Token reset pass còn hạn tại phút 20 (TTL 30 phút thay vì 15 phút)', 'Medium'],
    ['BUG-003', 'DONATE', 'Webhook trả 410 Gone, cổng E-Wallet/Card tắt', 'High'],
    ['BUG-004', 'DONATE', 'Chưa hỗ trợ phương thức COD trong schema enum', 'Medium'],
    ['BUG-005', 'DONATE', 'Chưa giới hạn tối đa 10 ảnh cho 1 Reward ở backend', 'Medium'],
    ['BUG-006', 'CAMP', 'Chưa chặn tiêu đề chiến dịch < 10 hoặc > 120 ký tự', 'High'],
    ['BUG-007', 'CAMP', 'Chưa chặn endDate <= ngày hiện tại ở server', 'Medium'],
    ['BUG-008', 'CAMP', 'Pledge vào chiến dịch DRAFT/PENDING báo lỗi chưa rõ ràng', 'High'],
    ['BUG-009', 'DISBURSE', 'Hóa đơn dùng thông tin thuế mẫu cứng; lệch khung khi tên dài', 'Medium'],
    ['BUG-010', 'USER', 'Thiếu counter 500 ký tự Bio; chưa khóa nút gửi KYC khi thiếu ảnh', 'Medium'],
    ['BUG-011', 'ADMIN', 'Lý do từ chối 1-9 ký tự được chấp nhận; Feedback Queue tĩnh', 'Medium'],
    ['BUG-012', 'BLOG', 'Tìm kiếm từ khóa dài > 80 ký tự không khoảng trắng bị tràn nhãn', 'Medium'],
    ['BUG-013', 'CHAT', 'Chat chưa có WebSocket realtime; ngưỡng /gop-y lệch PRD', 'Medium'],
    ['BUG-014', 'STATS', 'Datepicker cho chọn startDate > endDate; mất query khi F5', 'Low'],
  ];
  xml += table([
    ['Mã Bug', 'Phân hệ', 'Mô tả chi tiết lỗi thực tế phát hiện', 'Mức độ'],
    ...bugs
  ], [1000, 1100, 6500, 1200]);

  xml += heading('CHƯƠNG 6: MA TRẬN TRUY VẾT YÊU CẦU (RTM)', 1);
  xml += p('Ma trận truy vết bảo đảm 100% trong số 80 Yêu cầu kiểm thử đều được ánh xạ ít nhất 2 kịch bản kiểm thử, không có yêu cầu nào bị bỏ sót.');

  xml += heading('CHƯƠNG 7: KẾT LUẬN VÀ BÀI HỌC KINH NGHIỆM', 1);
  xml += p('• Nhóm đã áp dụng đầy đủ quy trình kiểm thử phần mềm chuyên nghiệp từ khâu lập Test Plan, thiết kế Test Case, Review chéo vòng tròn đến thực thi và ghi nhận Bug Report.');
  xml += p('• Kết quả kiểm thử thực tế giúp nhận diện các điểm yếu về kiểm tra biên và validation client-side, làm cơ sở nâng cấp hệ thống trong tương lai.');

  xml += heading('CHƯƠNG 8: TÀI LIỆU THAM KHẢO VÀ PHỤ LỤC', 1);
  xml += p('1. Giáo trình Kiểm thử và Đảm bảo Chất lượng Phần mềm — Trường ĐH Lạc Hồng.');
  xml += p('2. Tiêu chuẩn quốc tế ISO/IEC/IEEE 29119 Software Testing Standards.');
  xml += p('3. Kho mã nguồn dự án: https://github.com/Escanor292/test');
  xml += p('4. Web Demo thực tế: https://test-gamma-azure-65.vercel.app');

  await saveDocx(path.join(WORD_DIR, 'Báo Cáo Word_23CT113_Nhom02.docx'), xml);
}

async function run() {
  await buildTestPlanDocx();
  await buildTestReportDocx();
  await buildLeaderReportDocx();
  await buildPrdDocx();
  await buildFullFinalReportDocx();
  console.log('ALL 5 WORD DOCUMENTS COMPLETED AND STANDARDIZED 100%!');
}

run().catch(console.error);

