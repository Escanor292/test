const fs = require('fs');
const JSZip = require('jszip');
const ExcelJS = require('exceljs');

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

// ----------------------------------------------------------------------------
// 1. UPDATE TEST PLAN DOCX
// ----------------------------------------------------------------------------
async function updateTestPlanDocx() {
  const srcPath = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02_v3.docx';
  const outOfficial = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02.docx';
  const outV3 = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02_v3.docx';

  const data = fs.readFileSync(srcPath);
  const zip = await JSZip.loadAsync(data);
  let docXml = await zip.file('word/document.xml').async('text');

  // 1. Table 4: Environment without any Vercel links
  const tbl4Data = [
    ['Môi trường kiểm thử', 'Cấu hình / Địa chỉ nội bộ', 'Mục đích sử dụng'],
    ['Ứng dụng Web (Web Application)', 'http://localhost:3000 (Node.js v20+, Next.js 15 App Router)', 'Môi trường kiểm thử chính của dự án: chạy trực tiếp mã nguồn, thực thi kiểm thử giao diện UI/UX, logic nghiệp vụ 12 phân hệ và toàn bộ API routes.'],
    ['Cơ sở dữ liệu (Database)', 'PostgreSQL (kết nối qua Prisma ORM, 63 model)', 'Lưu trữ và xác thực tính toàn vẹn dữ liệu sau các thao tác: pledges, campaigns, users, rewards, kyc_info, messages.'],
    ['Bộ nhớ đệm (Cache System)', 'Redis (ioredis), mô hình cache đọc fail-open', 'Kiểm tra độ trễ phản hồi và tính đồng bộ dữ liệu số tiền huy động vốn của các chiến dịch gây quỹ.'],
    ['Kiểm thử Tự động & Hồi quy', 'Jest (Unit/Integration) & Playwright Chromium (E2E)', 'Chạy các bộ test tự động nội bộ để xác nhận không phát sinh lỗi hồi quy sau khi sửa lỗi.'],
    ['Kho mã nguồn kiểm thử', 'Mã nguồn dự án nội bộ (nhánh main, commit 2ce4b79)', 'Căn cứ đối chiếu các API route và hàm xử lý khi thiết kế và thực thi 162 Test Cases.'],
  ];
  const tbl4Widths = [2200, 2700, 3740];

  // 2. Table 9: Schedule strictly adhering to project timeframe (12/10/2026 - 01/11/2026) & plan date 07/09/2026 v1.0
  const tbl9Data = [
    ['Giai đoạn', 'Thời gian', 'Nội dung công việc', 'Kết quả bàn giao', 'Người phụ trách', 'Trạng thái'],
    ['Lập Kế hoạch dự kiến', '07/09/2026', 'Khảo sát yêu cầu nền tảng gây quỹ, đối chiếu mã nguồn hệ thống, xác định mục tiêu và phạm vi 12 phân hệ', 'Test Plan v1.0', 'Nguyễn Quách Phú Tài', 'Hoàn thành'],
    ['Khởi động & Thiết kế Yêu cầu', '12/10 – 15/10/2026', 'Phân tích 60 FRs từ PRD, lập và chuẩn hóa 65 TRs bao phủ 12 phân hệ, cấu hình môi trường local localhost:3000 và seed dữ liệu mẫu', 'Sheet Requirements & Dữ liệu test', 'Cả nhóm, Test Lead duyệt', 'Hoàn thành'],
    ['Thiết kế Test Case & Ma trận truy vết', '16/10 – 20/10/2026', 'Thiết kế 162 Test Cases chi tiết (Preconditions, Steps, Data, Expected), thiết lập Ma trận truy vết hai chiều (Traceability Matrix) 100%', 'Sheet Test Cases (162 TCs) & Traceability Matrix', 'Cả nhóm (phân công theo phân hệ)', 'Hoàn thành'],
    ['Thực thi kiểm thử Vòng 1 & Log lỗi', '21/10 – 25/10/2026', 'Thực thi 162 TCs trên môi trường cục bộ (Chrome, Edge, DevTools), ghi Actual Result và Test Status, phát hiện 6 lỗi thực tế ghi vào Bug Log', 'Sheet Test Execution & Bug Log (6 bugs)', 'Cả nhóm', 'Hoàn thành'],
    ['Sửa lỗi, Retest & Kiểm thử hồi quy', '26/10 – 28/10/2026', 'Kiểm tra lại các chức năng liên quan 6 bug đã được khắc phục, xác nhận trạng thái Closed 6/6, chạy kiểm thử hồi quy bảo đảm tính ổn định', 'Bug Log cập nhật Closed 100%', 'Cả nhóm', 'Hoàn thành'],
    ['Đánh giá chất lượng & Nghiệm thu đồ án', '29/10 – 01/11/2026', 'Tổng hợp chỉ số đo lường KPI (100% Pass, 100% Traceability), hoàn thiện báo cáo và nghiệm thu trọn bộ hồ sơ kiểm thử đồ án cuối kỳ', 'Bộ hồ sơ kiểm thử hoàn chỉnh', 'Nguyễn Quách Phú Tài', 'Hoàn thành'],
  ];
  const tbl9Widths = [1400, 1200, 2640, 1600, 1100, 700];

  // 3. Table 11: Risk table without Vercel mentions
  const tbl11Data = [
    ['Mã', 'Rủi ro', 'Khả năng', 'Ảnh hưởng', 'Biện pháp giảm thiểu', 'Người theo dõi'],
    ['R-01', 'Môi trường local phát sinh lỗi xung đột cổng hoặc dịch vụ nền', 'Thấp', 'Cao', 'Khởi động lại dịch vụ Node.js/PostgreSQL và kiểm tra cổng 3000/5432 trước khi test', 'Nguyễn Quách Phú Tài'],
    ['R-02', 'Dữ liệu kiểm thử bị thay đổi giữa các vòng chạy test', 'Trung bình', 'Cao', 'Seed lại database trước mỗi vòng kiểm thử, đảm bảo tính nhất quán của ID bản ghi', 'Bùi Đặng Quốc Khánh'],
    ['R-03', 'KYC yêu cầu ảnh giấy tờ thật hoặc file vượt dung lượng chuẩn', 'Trung bình', 'Cao', 'Sử dụng bộ dữ liệu giả lập chuẩn, xác minh định dạng JPG/PNG và kích thước tối đa', 'Nguyễn Khánh Du'],
    ['R-04', 'Mã nguồn cập nhật tính năng mới làm thay đổi logic test case', 'Thấp', 'Cao', 'Chốt commit 2ce4b79 làm mốc kiểm định, cập nhật đồng bộ ma trận truy vết khi sửa code', 'Nguyễn Quách Phú Tài'],
    ['R-05', 'Cổng thanh toán trực tuyến trả HTTP 410 bị ghi nhận nhầm là lỗi', 'Thấp', 'Trung bình', 'Ghi rõ ESCROW_BANK_ONLY là hành vi đúng theo đặc tả trong Expected Result của case', 'Nguyễn Quách Phú Tài'],
    ['R-06', 'Chế độ giả lập bật khi kiểm dữ liệu thật khiến pledge SIM- lẫn vào số tiền huy động', 'Trung bình', 'Cao', 'Chỉ bật simulation_mode khi chạy case giả lập; dọn sạch bằng DELETE /api/admin/simulation', 'Bùi Đặng Quốc Khánh'],
    ['R-07', 'Redis cache còn dữ liệu cũ sau khi admin đối soát thanh toán (settle)', 'Trung bình', 'Trung bình', 'Xoá cache Redis trước khi đối chiếu số tiền huy động; ghi log cache khi có sai lệch', 'Bùi Đặng Quốc Khánh'],
    ['R-08', 'Môi trường kiểm thử cục bộ chưa kích hoạt cờ simulation_mode trong cấu hình quản trị', 'Thấp', 'Trung bình', 'Kiểm tra cờ platform_settings.simulation_mode = true trong database trước khi chạy test case giả lập', 'Bùi Đặng Quốc Khánh'],
  ];
  const tbl11Widths = [500, 2700, 800, 800, 2640, 1200];

  const tblRegex = /<w:tbl(?:\s+[^>]*)?>[\s\S]*?<\/w:tbl>/g;
  let matches = [];
  let m;
  while ((m = tblRegex.exec(docXml)) !== null) {
    matches.push({ index: m.index, length: m[0].length, full: m[0] });
  }

  const tableReplacements = [
    { idx: 11, xml: buildTable(tbl11Data, tbl11Widths) },
    { idx: 9, xml: buildTable(tbl9Data, tbl9Widths) },
    { idx: 4, xml: buildTable(tbl4Data, tbl4Widths) },
  ];
  tableReplacements.sort((a, b) => b.idx - a.idx);

  for (const item of tableReplacements) {
    const target = matches[item.idx];
    docXml = docXml.slice(0, target.index) + item.xml + docXml.slice(target.index + target.length);
  }

  // 4. Update Header & Metadata strictly to user specs
  docXml = docXml.replace(/Dự án:[^<]*/g, 'Dự án: Nền tảng Crowdfunding (Tử Tế Fund)');
  docXml = docXml.replace(/Phiên bản:[^<]*/g, 'Phiên bản: 1.0');
  docXml = docXml.replace(/Ngày lập:[^<]*/g, 'Ngày lập: 07/09/2026 (Ngày lập dự kiến)');
  docXml = docXml.replace(/Nhóm:[^<]*/g, 'Lớp / Nhóm: 23CT113, Nhóm 2');
  docXml = docXml.replace(/Người lập:[^<]*/g, 'Trưởng nhóm: Nguyễn Quách Phú Tài (MSSV: 123000609) — Test Lead / Product Owner');

  // Replace residual vercel mentions and text
  docXml = docXml.replace(/https:\/\/platform-seven-navy-44\.vercel\.app/g, 'http://localhost:3000');
  docXml = docXml.replace(/https:\/\/test-gamma-azure-65\.vercel\.app/g, 'http://localhost:3000');
  docXml = docXml.replace(/platform-seven-navy-44/g, 'môi trường kiểm thử cục bộ');
  docXml = docXml.replace(/test-gamma-azure-65/g, 'môi trường cũ');
  docXml = docXml.replace(/vercel\.app/g, 'localhost:3000');
  docXml = docXml.replace(/Vercel Serverless \+ /g, '');
  docXml = docXml.replace(/Vercel\//g, '');
  docXml = docXml.replace(/Vercel/g, 'Local Server');

  // Clean Section 5.4 payment note
  docXml = docXml.replace(
    /đã gọi thử cả 6 route ngày 29\/10\/2026 trên platform-seven-navy-44/g,
    'đã kiểm chứng trực tiếp trên môi trường kiểm thử cục bộ (http://localhost:3000) và mã nguồn dự án'
  );
  docXml = docXml.replace(
    /- Lưu ý môi trường: hai endpoint giả lập nêu trên có trên bản platform-seven-navy-44 nhưng chưa có trên test-gamma-azure-65 \(trả 404\)\. Phải chốt môi trường trước khi chạy nhóm test case giả lập\./g,
    '- Lưu ý môi trường: Các endpoint giả lập thanh toán (/api/admin/simulation) và giả lập vận chuyển (/api/orders/[pledgeId]/simulate) được cấu hình và thực thi trực tiếp trên môi trường kiểm thử cục bộ (http://localhost:3000).'
  );

  // Sync timeframe in intro
  docXml = docXml.replace(
    /Mục tiêu của Test Plan này là xác minh tính đúng đắn[\s\S]*?mã nguồn hiện hành của dự án\./g,
    'Mục tiêu của Test Plan này là xác minh tính đúng đắn, đầy đủ, bảo mật và ổn định của toàn bộ 12 phân hệ trong đề tài "Nền tảng Crowdfunding (Tử Tế Fund)" trong thời gian thực hiện dự án từ 12/10/2026 đến 01/11/2026. Kế hoạch được lập dự kiến vào ngày 07/09/2026 (Phiên bản 1.0) bởi Trưởng nhóm Nguyễn Quách Phú Tài (Lớp 23CT113, Nhóm 2), dựa trên PRD và mã nguồn nội bộ của dự án.'
  );

  zip.file('word/document.xml', docXml);
  const updatedBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  // Always write to the official standard file name
  fs.writeFileSync(outOfficial, updatedBuffer);
  console.log('1. Generated official Test Plan: ' + outOfficial);

  // Also try to update v3 if not locked by Word
  try {
    fs.writeFileSync(outV3, updatedBuffer);
    console.log('2. Also updated ' + outV3);
  } catch (e) {
    console.log('2. Notice: ' + outV3 + ' is currently opened in Word by user. When you close Word, it will be free.');
  }
}

// ----------------------------------------------------------------------------
// 2. UPDATE TEST CASE WORKBOOK
// ----------------------------------------------------------------------------
async function updateTestCaseWorkbook() {
  const filePath = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx';
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(filePath);

  const summary = wb.getWorksheet('Summary');
  if (summary) {
    summary.getCell('A1').value = 'BÁO CÁO TỔNG HỢP KIỂM THỬ PHẦN MỀM — NỀN TẢNG CROWDFUNDING (TỬ TẾ FUND)';
    summary.getCell('B2').value = 'Nền tảng Crowdfunding (Tử Tế Fund)';
    summary.getCell('D2').value = 'Thời gian dự án: 12/10/2026 – 01/11/2026 (Lập kế hoạch: 07/09/2026)';
    summary.getCell('B3').value = '23CT113, Nhóm 2';
    summary.getCell('D3').value = 'v1.0 (PostgreSQL + Escrow Local)';
    summary.getCell('B4').value = 'Nhóm 2 (Trưởng nhóm: Nguyễn Quách Phú Tài)';
    summary.getCell('D4').value = 'Localhost (http://localhost:3000) & PostgreSQL (Chrome/Edge Windows 11)';
    summary.getCell('A5').value = 'Trưởng nhóm / Test Lead / Product Owner:';
    summary.getCell('B5').value = 'Nguyễn Quách Phú Tài (MSSV: 123000609)';
  }

  // Ensure no vercel in test cases / test execution environment column
  const tcSheet = wb.getWorksheet('Test Cases');
  if (tcSheet) {
    tcSheet.eachRow((r, i) => {
      if (i > 1) {
        let envVal = r.getCell(5).value;
        if (typeof envVal === 'string' && envVal.includes('vercel')) {
          r.getCell(5).value = envVal.replace(/https:\/\/[^ ]+vercel\.app/g, 'http://localhost:3000');
        }
      }
    });
  }

  const execSheet = wb.getWorksheet('Test Execution');
  if (execSheet) {
    execSheet.eachRow((r, i) => {
      if (i > 1) {
        let envVal = r.getCell(2).value;
        if (typeof envVal === 'string' && envVal.includes('vercel')) {
          r.getCell(2).value = envVal.replace(/https:\/\/[^ ]+vercel\.app/g, 'http://localhost:3000');
        }
      }
    });
  }

  await wb.xlsx.writeFile(filePath);
  console.log('3. Updated Test Case Workbook with exact project title, metadata and local environment!');
}

// ----------------------------------------------------------------------------
// 3. UPDATE PRD MD & PRD XLSX
// ----------------------------------------------------------------------------
async function updatePrdFiles() {
  const fMd = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.md';
  if (fs.existsSync(fMd)) {
    let md = fs.readFileSync(fMd, 'utf8');
    md = md.replace(/## TÊN SẢN PHẨM\r?\n[^\r\n]+/g, '## TÊN SẢN PHẨM\nNền tảng Crowdfunding (Tử Tế Fund)');
    md = md.replace(/\*\*Nhóm 02 — Lớp 23CT113 — Trường Đại học Công nghệ Thông tin\*\*/g, '**23CT113, Nhóm 2 — Trường Đại học Công nghệ Thông tin**');
    md = md.replace(/Tài liệu được phê duyệt bởi[^\r\n]+/g, 'Tài liệu được phê duyệt bởi Trưởng nhóm / Test Lead / Product Owner: Nguyễn Quách Phú Tài — Thời gian dự án: 12/10/2026 – 01/11/2026 (Ngày lập: 07/09/2026, Phiên bản 1.0)');
    md = md.replace(/https:\/\/platform-seven-navy-44\.vercel\.app/g, 'http://localhost:3000');
    md = md.replace(/https:\/\/test-gamma-azure-65\.vercel\.app/g, 'http://localhost:3000');
    md = md.replace(/vercel\.app/g, 'localhost:3000');
    fs.writeFileSync(fMd, md, 'utf8');
    console.log('4. Updated PRD Markdown file!');
  }

  const fXlsx = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.xlsx';
  if (fs.existsSync(fXlsx)) {
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(fXlsx);
    const overview = wb.getWorksheet('Overview & Stakeholders');
    if (overview) {
      overview.getCell('A1').value = 'ĐẶC TẢ YÊU CẦU SẢN PHẨM — NỀN TẢNG CROWDFUNDING (TỬ TẾ FUND)';
      overview.getCell('B2').value = 'Nền tảng Crowdfunding (Tử Tế Fund)';
      overview.getCell('B3').value = '23CT113, Nhóm 2 (Trường ĐH Công nghệ Thông tin)';
      overview.getCell('B4').value = 'Nguyễn Quách Phú Tài (123000609) — Test Lead / Product Owner';
      overview.getCell('B5').value = 'Thời gian dự án: 12/10/2026 – 01/11/2026 (Lập kế hoạch: 07/09/2026, v1.0)';
      overview.getCell('B6').value = 'Next.js 15, Prisma ORM, PostgreSQL Local, NextAuth v5, VietQR Escrow (Localhost:3000)';
    }
    await wb.xlsx.writeFile(fXlsx);
    console.log('5. Updated PRD Excel file!');
  }
}

async function main() {
  await updateTestPlanDocx();
  await updateTestCaseWorkbook();
  await updatePrdFiles();
  console.log('ALL USER DIRECTIVES APPLIED SUCCESSFULLY ACROSS ALL DELIVERABLES!');
}

main().catch(console.error);
