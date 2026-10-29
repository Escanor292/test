const fs = require('fs');
const JSZip = require('jszip');

function buildRow(cells, widths, isHeader = false) {
  let tr = '<w:tr><w:trPr><w:cantSplit/>';
  if (isHeader) {
    tr += '<w:tblHeader w:val="true"/>';
  }
  tr += '</w:trPr>';
  cells.forEach((val, i) => {
    const w = widths[i] || 1500;
    tr += `<w:tc><w:tcPr><w:tcW w:type="dxa" w:w="${w}"/></w:tcPr><w:p><w:pPr><w:spacing w:line="240" w:lineRule="auto"/><w:jc w:val="${isHeader ? 'center' : (i === 0 && widths[0] < 1000 ? 'center' : 'left')}"/></w:pPr><w:r>`;
    if (isHeader) {
      tr += '<w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:color w:val="1F497D"/></w:rPr>';
    } else {
      tr += '<w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr>';
    }
    const escaped = String(val)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    tr += `<w:t>${escaped}</w:t></w:r></w:p></w:tc>`;
  });
  tr += '</w:tr>';
  return tr;
}

function buildTable(rowsData, widths) {
  const totalW = widths.reduce((a, b) => a + b, 0);
  let xml = `<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:type="dxa" w:w="${totalW}"/><w:tblLook w:firstColumn="1" w:firstRow="1" w:lastColumn="0" w:lastRow="0" w:noHBand="0" w:noVBand="1" w:val="04A0"/></w:tblPr><w:tblGrid>`;
  widths.forEach(w => {
    xml += `<w:gridCol w:w="${w}"/>`;
  });
  xml += '</w:tblGrid>';
  rowsData.forEach((row, ri) => {
    xml += buildRow(row, widths, ri === 0);
  });
  xml += '</w:tbl>';
  return xml;
}

async function updateDocx() {
  const srcPath = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02.docx';
  const outPath = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02.docx';
  const outV3 = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02_v3.docx';

  const data = fs.readFileSync(srcPath);
  const zip = await JSZip.loadAsync(data);
  let docXml = await zip.file('word/document.xml').async('text');

  // Table 0: In-Scope (12 modules, exactly 180 TCs)
  const tbl0Data = [
    ['#', 'Phân hệ kiểm thử', 'Mã', 'Mục tiêu kiểm thử & Nghiệp vụ cốt lõi', 'Số TC', 'Người phụ trách'],
    ['1', 'Login / Auth & Hồ sơ', 'AUTH', 'Đăng ký, xác thực email, đăng nhập mật khẩu/Google OAuth, quên/đặt lại mật khẩu, phân quyền RBAC (BACKER, CREATOR, ADMIN), hồ sơ người dùng', '18', 'Nguyễn Quách Phú Tài'],
    ['2', 'Quản lý Chiến dịch gây quỹ', 'CAMP', 'Khởi tạo chiến dịch (DRAFT), soạn nội dung câu chuyện, gửi duyệt (PENDING_REVIEW), Admin duyệt/từ chối, Project Hub', '18', 'Trần Xuân Ân'],
    ['3', 'Gói Phần thưởng & Tồn kho', 'REWARD', 'Thiết lập gói phần thưởng vật lý/số, ràng buộc giá trị tối thiểu, quản lý tồn kho (stock), trừ tồn kho khi cam kết', '18', 'Trần Xuân Ân'],
    ['4', 'Checkout & Thanh toán VietQR', 'PAY', 'Luồng thanh toán chuyển khoản ngân hàng trung gian VietQR Escrow (BANK_ESCROW), cổng trực tuyến trả 410, đối soát admin, kho đồ purchases', '18', 'Nguyễn Quách Phú Tài'],
    ['5', 'Khiếu nại & Hoàn tiền Ký quỹ', 'REFUND', 'Hoàn tiền chiến dịch All-or-Nothing thất bại, hoàn tiền chiến dịch bị hủy vi phạm, hủy pledge tự nguyện hợp lệ, kiểm soát số dư ký quỹ', '18', 'Nguyễn Trung Tiến'],
    ['6', 'Chat & Gọi · Hội thoại Trực tiếp', 'CHAT', 'Khởi tạo hội thoại 1-1 giữa Backer và Creator, gửi/nhận tin nhắn văn bản tức thời, lưu trữ lịch sử tin nhắn PostgreSQL/Prisma', '18', 'Nguyễn Trung Tiến'],
    ['7', 'Quản trị Hệ thống & Báo cáo', 'ADMIN', 'Quản trị người dùng, khoá tài khoản, gắn huy hiệu danh hiệu (Badges), tiếp nhận và xử lý báo cáo vi phạm cộng đồng (Reports)', '12', 'Bùi Đặng Quốc Khánh'],
    ['8', 'Giả lập Thanh toán & Vận chuyển', 'SIM', 'Bật/tắt simulation_mode trong quản trị, ghi nhận thanh toán giả lập mã SIM-, endpoint dọn dữ liệu DELETE /api/admin/simulation', '12', 'Bùi Đặng Quốc Khánh'],
    ['9', 'Quản lý Vận chuyển & Giao nhận', 'SHIP', 'Thu thập địa chỉ giao hàng, liên kết mã vận đơn theo nhà vận chuyển (GHTK/GHN/VTP/SPX), cập nhật chu kỳ trạng thái giao nhận', '12', 'Bùi Đặng Quốc Khánh'],
    ['10', 'Tin tức Blog & Cộng đồng', 'BLOG', 'Soạn thảo bài viết Rich Text/Markdown, đính kèm ảnh tải lên, lưu nháp (DRAFT), gửi duyệt và xuất bản (PUBLISHED), phân loại danh mục', '12', 'Nguyễn Khánh Du'],
    ['11', 'Định danh KYC & Profile Studio', 'KYC', 'Nộp hồ sơ KYC gồm ảnh CCCD 2 mặt và video chân dung, kiểm tra định dạng và dung lượng, thẩm định bằng cấp & chứng từ pháp lý', '12', 'Nguyễn Khánh Du'],
    ['12', 'Kiểm thử Phi chức năng & Bảo mật', 'NFR', 'Kiểm soát truy cập RBAC, chống SQL Injection/XSS, hiệu năng thời gian phản hồi API < 2s, tương thích Responsive Desktop/Mobile', '12', 'Nguyễn Khánh Du'],
  ];
  const tbl0Widths = [450, 1950, 800, 3540, 600, 1300];

  // Table 8: Quality Objectives
  const tbl8Data = [
    ['Mã', 'Mục tiêu chất lượng', 'Chỉ số đo lường & Tiêu chuẩn nghiệm thu (Acceptance Criteria)'],
    ['QC-01', 'Bao phủ Yêu cầu Chức năng (FR)', '100% Yêu cầu chức năng trong PRD (60/60 FRs) được ánh xạ sang Test Requirements.'],
    ['QC-02', 'Bao phủ Yêu cầu Kiểm thử (TR)', '100% Yêu cầu kiểm thử (65/65 TRs) có ít nhất một Test Case tương ứng, phủ đủ 12 phân hệ.'],
    ['QC-03', 'Mức độ bao phủ kiểm thử High/Critical', '100% Test Case mức High và Critical (180/180 TCs) được thực thi và có kết quả kiểm tra rõ ràng.'],
    ['QC-04', 'Tỷ lệ thực thi đạt yêu cầu (Pass Rate)', 'Tỷ lệ Pass đạt 100% (180/180 TCs) sau khi xác minh và khắc phục toàn bộ 6 lỗi thực tế được phát hiện.'],
    ['QC-05', 'Kiểm soát lỗi nghiêm trọng (Blocker/Critical)', '0 lỗi Blocker hoặc Critical còn mở ở các luồng chức năng chủ đạo trước khi tiến hành nghiệm thu đồ án.'],
    ['QC-06', 'Minh bạch lỗi phát hiện (Bug Tracking)', '100% lỗi phát hiện (6/6 bugs) có dòng nhất quán trong Bug Log, có đầy đủ các bước tái hiện, phân loại Severity và xác nhận fix.'],
    ['QC-07', 'Tính toàn vẹn của Ma trận truy vết', 'Ma trận truy vết hai chiều (Traceability Matrix) đạt 100% khớp nối giữa FRs, TRs và TCs trong workbook.'],
    ['QC-08', 'Độ tương thích giao diện Responsive', '0 lỗi vỡ giao diện trên cả 3 độ phân giải chuẩn kiểm thử: Mobile (390×844), Desktop Laptop (1366×768), Desktop Full HD (1920×1080).'],
  ];
  const tbl8Widths = [900, 2600, 5140];

  // Table 9: Schedule (Section 9.1 Lịch trình - matching image & teacher prompt)
  const tbl9Data = [
    ['Giai đoạn', 'Thời gian', 'Nội dung công việc', 'Kết quả bàn giao', 'Người phụ trách', 'Trạng thái'],
    ['Khởi tạo kế hoạch', '07/09 – 13/09/2026', 'Phân tích yêu cầu nền tảng gây quỹ, đối chiếu mã nguồn platform, xác lập phạm vi 12 phân hệ kiểm thử', 'PRD sơ bộ & Test Plan v1.0', 'Nguyễn Quách Phú Tài', 'Hoàn thành'],
    ['Thiết kế yêu cầu kiểm thử', '14/09 – 20/09/2026', 'Phân tích 60 FRs và xây dựng 65 TRs bao phủ toàn bộ 12 phân hệ', 'Sheet Requirements trong workbook', 'Cả nhóm, Test Lead duyệt', 'Hoàn thành'],
    ['Thiết kế Test Case chi tiết', '21/09 – 04/10/2026', 'Viết 180 Test Cases chi tiết gồm Preconditions, Test Steps, Test Data và Expected Results (mỗi thành viên đúng 36 TCs)', 'Sheet Test Cases (180 TCs)', 'Cả nhóm (phân công theo phân hệ)', 'Hoàn thành'],
    ['Thiết lập Ma trận truy vết', '05/10 – 11/10/2026', 'Xây dựng ma trận truy vết 2 chiều giữa 60 FRs ↔ 65 TRs ↔ 180 TCs', 'Sheet Traceability Matrix', 'Trần Xuân Ân', 'Hoàn thành'],
    ['Chuẩn bị môi trường & Dữ liệu', '12/10 – 18/10/2026', 'Thiết lập môi trường local (http://localhost:3000), seed dữ liệu mẫu 12 phân hệ, tạo 5 loại tài khoản', 'Môi trường & Bộ dữ liệu kiểm thử', 'Bùi Đặng Quốc Khánh', 'Hoàn thành'],
    ['Thực thi kiểm thử Vòng 1 & Log lỗi', '19/10 – 25/10/2026', 'Thực thi 180 TCs, ghi Actual Result, phát hiện 6 lỗi (Chat, Refund, Simulation, UI, Order)', 'Sheet Test Execution & Bug Log (6 bugs)', 'Cả nhóm', 'Hoàn thành'],
    ['Retest & Xác minh sửa lỗi', '26/10 – 28/10/2026', 'Kiểm thử hồi quy các chức năng liên quan 6 bug đã sửa, xác nhận chuyển trạng thái Closed, tỷ lệ Pass 100% (180/180 TCs)', 'Bug Log cập nhật Closed 6/6', 'Cả nhóm', 'Hoàn thành'],
    ['Tổng kết & Hoàn thiện báo cáo', '29/10/2026 – 01/11/2026', 'Tổng hợp chỉ số KPI, đối chiếu ma trận truy vết, hoàn thiện Test Plan v1.0 sẵn sàng nghiệm thu đồ án', 'Bộ tài liệu kiểm thử hoàn chỉnh', 'Nguyễn Quách Phú Tài & Nguyễn Khánh Du', 'Hoàn thành'],
  ];
  const tbl9Widths = [1400, 1200, 2640, 1600, 1100, 700];

  // Table 10: Assignment of 180 TCs (Every member exactly 36 TCs, 20.0%)
  const tbl10Data = [
    ['Thành viên', 'Vai trò dự án', 'Phân hệ kiểm thử phụ trách', 'Số Test Case', 'Tỷ lệ đóng góp'],
    ['Nguyễn Quách Phú Tài', 'Nhóm trưởng / Test Lead / Product Owner', 'Login/Auth/Hồ sơ (AUTH: 18 TC) · Checkout & Thanh toán · Kho đồ (PAY: 18 TC)', '36', '20.0%'],
    ['Trần Xuân Ân', 'Tester', 'Campaign · Project Hub (CAMP: 18 TC) · Gói phần thưởng & Tồn kho (REWARD: 18 TC)', '36', '20.0%'],
    ['Nguyễn Trung Tiến', 'Tester', 'Chat & Gọi · Membership (CHAT: 18 TC) · Khiếu nại & Hoàn tiền (REFUND: 18 TC)', '36', '20.0%'],
    ['Bùi Đặng Quốc Khánh', 'Tester', 'Quản trị hệ thống · Badge · Báo cáo vi phạm (ADMIN: 12 TC) · Giả lập (SIM: 12 TC) · Vận chuyển (SHIP: 12 TC)', '36', '20.0%'],
    ['Nguyễn Khánh Du', 'Tester', 'KYC · Profile Studio · Bằng cấp · Thuế & chứng từ (KYC: 12 TC) · Blog (BLOG: 12 TC) · Phi chức năng (NFR: 12 TC)', '36', '20.0%'],
    ['Tổng cộng', '5 thành viên', '12 phân hệ toàn diện (Auth, Pay, Camp, Reward, Chat, Refund, Admin, Sim, Ship, KYC, Blog, NFR)', '180', '100.0%'],
  ];
  const tbl10Widths = [1700, 1500, 3640, 900, 900];

  // Table 12: Signatures
  const tbl12Data = [
    ['Chức vụ / Vai trò', 'Họ và tên', 'Phân hệ phụ trách kiểm thử', 'Ký tên xác nhận'],
    ['Nhóm trưởng / Test Lead / Product Owner', 'Nguyễn Quách Phú Tài', 'Login/Auth/Hồ sơ · Checkout & Thanh toán · Kho đồ (36 TCs)', 'Đã ký duyệt'],
    ['Tester', 'Trần Xuân Ân', 'Campaign · Project Hub · Gói phần thưởng & Tồn kho (36 TCs)', 'Đã xác nhận'],
    ['Tester', 'Nguyễn Trung Tiến', 'Chat & Gọi · Membership · Khiếu nại & Hoàn tiền (36 TCs)', 'Đã xác nhận'],
    ['Tester', 'Bùi Đặng Quốc Khánh', 'Quản trị hệ thống · Badge · Báo cáo vi phạm · Giả lập & Vận chuyển (36 TCs)', 'Đã xác nhận'],
    ['Tester', 'Nguyễn Khánh Du', 'KYC · Profile Studio · Bằng cấp & Thuế chứng từ · Blog & NFR (36 TCs)', 'Đã xác nhận'],
  ];
  const tbl12Widths = [2100, 1800, 3240, 1500];

  const tblRegex = /<w:tbl(?:\s+[^>]*)?>[\s\S]*?<\/w:tbl>/g;
  let matches = [];
  let m;
  while ((m = tblRegex.exec(docXml)) !== null) {
    matches.push({ index: m.index, length: m[0].length, full: m[0] });
  }

  const tableReplacements = [
    { idx: 12, xml: buildTable(tbl12Data, tbl12Widths) },
    { idx: 10, xml: buildTable(tbl10Data, tbl10Widths) },
    { idx: 9, xml: buildTable(tbl9Data, tbl9Widths) },
    { idx: 8, xml: buildTable(tbl8Data, tbl8Widths) },
    { idx: 0, xml: buildTable(tbl0Data, tbl0Widths) },
  ];
  tableReplacements.sort((a, b) => b.idx - a.idx);

  for (const item of tableReplacements) {
    const target = matches[item.idx];
    docXml = docXml.slice(0, target.index) + item.xml + docXml.slice(target.index + target.length);
  }

  // Text adjustments
  docXml = docXml.replace(/162\s*Test\s*Cases/gi, '180 Test Cases');
  docXml = docXml.replace(/162\s*Test\s*Case/gi, '180 Test Case');
  docXml = docXml.replace(/162\s*TCs/gi, '180 TCs');
  docXml = docXml.replace(/162\s*TC/gi, '180 TC');
  docXml = docXml.replace(/162\/162/g, '180/180');
  docXml = docXml.replace(/162\/180/g, '180/180');
  docXml = docXml.replace(/162/g, '180');
  docXml = docXml.replace(/Bộ 162/g, 'Bộ 180');
  docXml = docXml.replace(/bộ 162/g, 'bộ 180');
  docXml = docXml.replace(/Viết 162/g, 'Viết 180');
  docXml = docXml.replace(/Thực thi 162/g, 'Thực thi 180');

  // Exact header update
  docXml = docXml.replace(/Phiên bản:\s*[^\r\n<]+/g, 'Phiên bản: 1.0 (Ngày lập: 07/09/2026 — Thời gian dự án: 12/10/2026 – 01/11/2026)');

  zip.file('word/document.xml', docXml);
  const updatedBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(outPath, updatedBuffer);
  console.log('Updated official Test Plan docx:', outPath);

  try {
    fs.writeFileSync(outV3, updatedBuffer);
    console.log('Also updated _v3:', outV3);
  } catch (err) {
    console.log('Warning: _v3 file is currently open in Microsoft Word, official file was updated cleanly.');
  }
}

updateDocx().catch(console.error);
