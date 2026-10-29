const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');

function pXml(text, opts = {}) {
  const {
    style = null,
    bold = false,
    italic = false,
    size = 24, // 12pt in half-points
    color = '0F172A',
    align = 'left',
    spaceBefore = 100,
    spaceAfter = 100,
    line = 276
  } = opts;

  let pPr = `<w:pPr>`;
  if (style) pPr += `<w:pStyle w:val="${style}"/>`;
  if (align !== 'left') pPr += `<w:jc w:val="${align}"/>`;
  pPr += `<w:spacing w:before="${spaceBefore}" w:after="${spaceAfter}" w:line="${line}" w:lineRule="auto"/>`;
  pPr += `</w:pPr>`;

  let rPr = `<w:rPr>`;
  rPr += `<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>`;
  if (bold) rPr += `<w:b/>`;
  if (italic) rPr += `<w:i/>`;
  if (size) rPr += `<w:sz w:val="${size}"/><w:szCs w:val="${size}"/>`;
  if (color) rPr += `<w:color w:val="${color}"/>`;
  rPr += `</w:rPr>`;

  const safeText = (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  return `<w:p>${pPr}<w:r>${rPr}<w:t xml:space="preserve">${safeText}</w:t></w:r></w:p>`;
}

function h1Xml(text) {
  return pXml(text, {
    bold: true,
    size: 28,
    color: '1E3A8A',
    spaceBefore: 240,
    spaceAfter: 120,
    align: 'left'
  });
}

function h2Xml(text) {
  return pXml(text, {
    bold: true,
    size: 26,
    color: '2563EB',
    spaceBefore: 180,
    spaceAfter: 80,
    align: 'left'
  });
}

function tcXml(text, opts = {}) {
  const {
    width = 2000,
    bold = false,
    italic = false,
    color = '0F172A',
    bg = null,
    align = 'left',
    size = 20
  } = opts;

  let tcPr = `<w:tcPr>`;
  tcPr += `<w:tcW w:w="${width}" w:type="dxa"/>`;
  if (bg) tcPr += `<w:shd w:val="clear" w:color="auto" w:fill="${bg}"/>`;
  tcPr += `<w:tcMar><w:top w:w="120" w:type="dxa"/><w:bottom w:w="120" w:type="dxa"/><w:left w:w="140" w:type="dxa"/><w:right w:w="140" w:type="dxa"/></w:tcMar>`;
  tcPr += `<w:vAlign w:val="center"/>`;
  tcPr += `</w:tcPr>`;

  const p = pXml(text, { bold, italic, color, align, size, spaceBefore: 40, spaceAfter: 40 });
  return `<w:tc>${tcPr}${p}</w:tc>`;
}

function trXml(cellsXml, isHeader = false) {
  let trPr = `<w:trPr><w:cantSplit/>`;
  if (isHeader) trPr += `<w:tblHeader/>`;
  trPr += `</w:trPr>`;
  return `<w:tr>${trPr}${cellsXml}</w:tr>`;
}

function tblXml(rowsXml, widths = []) {
  const totalWidth = widths.reduce((a, b) => a + b, 0);
  let grid = `<w:tblGrid>`;
  widths.forEach(w => {
    grid += `<w:gridCol w:w="${w}"/>`;
  });
  grid += `</w:tblGrid>`;

  const tblPr = `<w:tblPr>
    <w:tblW w:w="${totalWidth}" w:type="dxa"/>
    <w:jc w:val="center"/>
    <w:tblBorders>
      <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
      <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
      <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
      <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
      <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
      <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
    </w:tblBorders>
    <w:tblCellMar>
      <w:top w:w="100" w:type="dxa"/>
      <w:bottom w:w="100" w:type="dxa"/>
      <w:left w:w="140" w:type="dxa"/>
      <w:right w:w="140" w:type="dxa"/>
    </w:tblCellMar>
  </w:tblPr>`;

  return `<w:tbl>${tblPr}${grid}${rowsXml}</w:tbl>`;
}

function getDocumentHeader(meetingNum, dateStr, meetingTitle) {
  return `
    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9360" w:type="dxa"/>
        <w:jc w:val="center"/>
        <w:tblBorders>
          <w:top w:val="none"/><w:left w:val="none"/><w:bottom w:val="none"/><w:right w:val="none"/>
          <w:insideH w:val="none"/><w:insideV w:val="none"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tblGrid><w:gridCol w:w="4680"/><w:gridCol w:w="4680"/></w:tblGrid>
      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="4680" w:type="dxa"/><w:vAlign w:val="top"/></w:tcPr>
          ${pXml('TRƯỜNG ĐẠI HỌC LẠC HỒNG', { bold: true, size: 20, align: 'center', spaceBefore: 0, spaceAfter: 40 })}
          ${pXml('KHOA CÔNG NGHỆ THÔNG TIN', { bold: true, size: 20, align: 'center', spaceBefore: 0, spaceAfter: 40, color: '1E3A8A' })}
          ${pXml('Môn: Kiểm thử và đảm bảo chất lượng phần mềm', { italic: true, size: 17, align: 'center', spaceBefore: 0, spaceAfter: 40, color: '334155' })}
          ${pXml('GVBM: Nguyễn Minh Phúc', { bold: true, size: 17, align: 'center', spaceBefore: 0, spaceAfter: 60, color: '2563EB' })}
          ${pXml('-----------------------', { align: 'center', size: 16, color: '94A3B8', spaceBefore: 0, spaceAfter: 120 })}
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="4680" w:type="dxa"/><w:vAlign w:val="top"/></w:tcPr>
          ${pXml('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', { bold: true, size: 20, align: 'center', spaceBefore: 0, spaceAfter: 40 })}
          ${pXml('Độc lập – Tự do – Hạnh phúc', { bold: true, size: 20, align: 'center', spaceBefore: 0, spaceAfter: 40 })}
          ${pXml('Đồng Nai, ' + dateStr, { italic: true, size: 18, align: 'center', spaceBefore: 40, spaceAfter: 80, color: '475569' })}
          ${pXml('-----------------------', { align: 'center', size: 16, color: '94A3B8', spaceBefore: 0, spaceAfter: 120 })}
        </w:tc>
      </w:tr>
    </w:tbl>

    ${pXml('BIÊN BẢN HỌP NHÓM LẦN ' + meetingNum, { bold: true, size: 30, align: 'center', color: '1E3A8A', spaceBefore: 180, spaceAfter: 60 })}
    ${pXml(meetingTitle.toUpperCase(), { bold: true, size: 22, align: 'center', color: '2563EB', spaceBefore: 0, spaceAfter: 60 })}
    ${pXml('Dự án: Nền tảng gây quỹ cộng đồng Tử Tế Fund (TuTeFund) — Kho lưu trữ: Escanor292/platform', { italic: true, size: 19, align: 'center', color: '475569', spaceBefore: 0, spaceAfter: 40 })}
    ${pXml('Mã lớp: 23CT113 — Nhóm thực hiện: Nhóm 02', { bold: true, size: 20, align: 'center', color: '0F172A', spaceBefore: 0, spaceAfter: 200 })}
  `;
}

function getAttendanceTable() {
  const widths = [600, 2600, 1400, 2000, 1800, 960];
  const headers = ['STT', 'Họ và tên', 'MSSV', 'Vai trò trong nhóm', 'Module phụ trách', 'Điểm danh'];
  let headerCells = '';
  headers.forEach((h, i) => {
    headerCells += tcXml(h, { width: widths[i], bold: true, color: 'FFFFFF', bg: '1E3A8A', align: 'center', size: 19 });
  });
  let rows = trXml(headerCells, true);

  const data = [
    ['1', 'Nguyễn Quách Phú Tài', '123000609', 'Trưởng nhóm / Test Lead', 'Module Login & Quản trị', 'Có mặt (100%)'],
    ['2', 'Bùi Đặng Quốc Khánh', '123000xxx', 'Thư ký nhóm / Defect Lead', 'Module Reward & Bug Log', 'Có mặt (100%)'],
    ['3', 'Nguyễn Trung Tiến', '123000xxx', 'Thành viên / Doc Specialist', 'Module Blog & Báo cáo', 'Có mặt (100%)'],
    ['4', 'Trần Xuân Ân', '123000xxx', 'Thành viên / Module Lead', 'Module Campaign & Duyệt', 'Có mặt (100%)'],
    ['5', 'Nguyễn Khánh Du', '123000xxx', 'Thành viên / Module Lead', 'Module KYC & Xác thực', 'Có mặt (100%)']
  ];

  data.forEach((row, rIdx) => {
    let cells = '';
    const bg = rIdx % 2 === 1 ? 'F8FAFC' : 'FFFFFF';
    cells += tcXml(row[0], { width: widths[0], align: 'center', bg, size: 19 });
    cells += tcXml(row[1], { width: widths[1], bold: true, bg, size: 19 });
    cells += tcXml(row[2], { width: widths[2], align: 'center', bg, size: 19 });
    cells += tcXml(row[3], { width: widths[3], bg, size: 19 });
    cells += tcXml(row[4], { width: widths[4], bg, size: 19 });
    cells += tcXml(row[5], { width: widths[5], align: 'center', bold: true, color: '059669', bg, size: 19 });
    rows += trXml(cells);
  });

  return tblXml(rows, widths);
}

function getSignatureBlock() {
  return `
    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9360" w:type="dxa"/>
        <w:jc w:val="center"/>
        <w:tblBorders>
          <w:top w:val="none"/><w:left w:val="none"/><w:bottom w:val="none"/><w:right w:val="none"/>
          <w:insideH w:val="none"/><w:insideV w:val="none"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tblGrid><w:gridCol w:w="4680"/><w:gridCol w:w="4680"/></w:tblGrid>
      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="4680" w:type="dxa"/><w:vAlign w:val="top"/></w:tcPr>
          ${pXml('THƯ KÝ CUỘC HỌP', { bold: true, size: 20, align: 'center', spaceBefore: 100, spaceAfter: 40 })}
          ${pXml('(Ký và ghi rõ họ tên)', { italic: true, size: 18, align: 'center', spaceBefore: 0, spaceAfter: 500, color: '64748B' })}
          ${pXml('Bùi Đặng Quốc Khánh', { bold: true, size: 20, align: 'center', spaceBefore: 400, spaceAfter: 0 })}
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="4680" w:type="dxa"/><w:vAlign w:val="top"/></w:tcPr>
          ${pXml('CHỦ TRÌ / TRƯỞNG NHÓM', { bold: true, size: 20, align: 'center', spaceBefore: 100, spaceAfter: 40 })}
          ${pXml('(Ký và ghi rõ họ tên)', { italic: true, size: 18, align: 'center', spaceBefore: 0, spaceAfter: 500, color: '64748B' })}
          ${pXml('Nguyễn Quách Phú Tài', { bold: true, size: 20, align: 'center', spaceBefore: 400, spaceAfter: 0 })}
        </w:tc>
      </w:tr>
    </w:tbl>
  `;
}

// -----------------------------------------------------------------------------
// BUILD MEETING 1 CONTENT (13/10/2026)
// -----------------------------------------------------------------------------
function buildMeeting1Xml(drawingXml) {
  const dateStr = 'ngày 13 tháng 10 năm 2026';
  const meetingTitle = 'Khởi động dự án, phân tích PRD và lập kế hoạch kiểm thử (Test Plan)';

  let body = getDocumentHeader('1', dateStr, meetingTitle);

  body += h1Xml('I. THÔNG TIN CHUNG VỀ CUỘC HỌP');
  body += pXml('• Thời gian bắt đầu: 08:30, Ngày 13/10/2026 | Thời gian kết thúc: 11:30, Ngày 13/10/2026 (Tuần 1)', { size: 20 });
  body += pXml('• Hình thức họp: Trực tiếp tại Phòng thực hành Kiểm thử phần mềm — Trường Đại học Lạc Hồng', { size: 20 });
  body += pXml('• Giáo viên bộ môn hướng dẫn: ThS. Nguyễn Minh Phúc', { size: 20, bold: true, color: '2563EB' });
  body += pXml('• Chủ trì cuộc họp: Nguyễn Quách Phú Tài (Trưởng nhóm / Test Lead)', { size: 20 });
  body += pXml('• Thư ký ghi chép: Bùi Đặng Quốc Khánh', { size: 20, bold: true });

  body += h1Xml('II. THÀNH PHẦN THAM DỰ');
  body += pXml('Cuộc họp có sự tham dự đầy đủ của 5/5 thành viên Nhóm 02 (tỷ lệ 100%):', { size: 20, spaceAfter: 80 });
  body += getAttendanceTable();

  body += h1Xml('III. MỤC TIÊU CUỘC HỌP');
  body += pXml('1. Khảo sát tổng quan nền tảng gây quỹ cộng đồng Tử Tế Fund (TuTeFund) trên repo Escanor292/platform.', { size: 20 });
  body += pXml('2. Phân tích tài liệu đặc tả yêu cầu sản phẩm (PRD 2.0.0) gồm 29 Functional Requirements (REQ).', { size: 20 });
  body += pXml('3. Phân định ranh giới rõ ràng: 5 phân hệ cốt lõi thuộc Phase 1 (Login, Campaign, Reward, Blog, KYC) và 13 tính năng thuộc Phase 2.', { size: 20 });
  body += pXml('4. Thống nhất quy tắc đánh mã định danh truy vết xuyên suốt và xây dựng dự thảo Test Plan v3 theo chuẩn Thầy Phúc.', { size: 20 });
  body += pXml('5. Phân công phân hệ chức năng cho từng thành viên chịu trách nhiệm kiểm thử.', { size: 20 });

  body += h1Xml('IV. NỘI DUNG THẢO LUẬN & KẾT QUẢ CUỘC HỌP');
  body += h2Xml('1. Thống nhất phạm vi kiểm thử Phase 1 & Cơ chế thanh toán');
  body += pXml('Nhóm đã đối chiếu mã nguồn và xác minh rằng hệ thống demo sử dụng mô hình chuyển khoản trung gian (BANK_ESCROW) kèm chế độ giả lập SIM- dành cho admin đối soát, không dùng cổng thanh toán bên thứ ba (các route webhook cũ trả về HTTP 410 ESCROW_BANK_ONLY). Vì vậy kiểm thử tập trung vào 5 phân hệ: Login (Tài), Campaign (Ân), Reward (Khánh), Blog (Tiến) và KYC (Du).', { size: 20 });

  body += h2Xml('2. Quy tắc đặt mã định danh (ID) theo chuẩn của Thầy Nguyễn Minh Phúc');
  body += pXml('Mọi tài liệu phải ánh xạ chặt chẽ theo chuỗi:', { size: 20, bold: true });
  body += pXml('  • Yêu cầu chức năng: REQ-{MODULE}-{001} (Ví dụ: REQ-LOGIN-001, REQ-CAMP-001)', { size: 20 });
  body += pXml('  • Yêu cầu kiểm thử: TR-{MODULE}-{001} (Ví dụ: TR-LOGIN-001, TR-KYC-001)', { size: 20 });
  body += pXml('  • Kịch bản kiểm thử: TC_{MODULE}_{STT} (Ví dụ: TC_LOGIN_001, TC_CAMP_001)', { size: 20 });
  body += pXml('  • Báo cáo lỗi: BUG-{MODULE}-{001} (Ví dụ: BUG-LOGIN-001, BUG-KYC-001)', { size: 20 });

  body += h1Xml('V. BẢNG PHÂN CÔNG NHIỆM VỤ TUẦN 1 (ACTION ITEMS)');
  
  const wCols = [600, 2800, 1800, 1400, 1800, 960];
  let hCells = '';
  ['STT', 'Nội dung nhiệm vụ', 'Người phụ trách', 'Hạn chót', 'Sản phẩm đầu ra', 'Trạng thái'].forEach((h, i) => {
    hCells += tcXml(h, { width: wCols[i], bold: true, color: 'FFFFFF', bg: '1E3A8A', align: 'center', size: 19 });
  });
  let rows = trXml(hCells, true);

  const tasks1 = [
    ['1', 'Khảo sát mã nguồn và lập Test Plan v3 theo mẫu Thầy Phúc', 'Nguyễn Quách Phú Tài', '13/10/2026', 'Test Plan_23CT113.docx', 'Hoàn thành'],
    ['2', 'Ghi chép và hoàn thiện Biên bản họp nhóm Lần 1', 'Bùi Đặng Quốc Khánh', '13/10/2026', 'Biên Bản Họp 1.docx', 'Hoàn thành'],
    ['3', 'Thiết kế danh mục 33 TR và 10 TC Phân hệ Reward', 'Bùi Đặng Quốc Khánh', '16/10/2026', 'Draft TC Reward', 'Hoàn thành'],
    ['4', 'Thiết kế danh mục 33 TR và 10 TC Phân hệ Blog', 'Nguyễn Trung Tiến', '16/10/2026', 'Draft TC Blog', 'Hoàn thành'],
    ['5', 'Thiết kế danh mục 33 TR và 12 TC Phân hệ Campaign', 'Trần Xuân Ân', '16/10/2026', 'Draft TC Campaign', 'Hoàn thành'],
    ['6', 'Thiết kế danh mục 33 TR và 12 TC Phân hệ KYC', 'Nguyễn Khánh Du', '16/10/2026', 'Draft TC KYC', 'Hoàn thành'],
    ['7', 'Xây dựng Ma trận truy vết RTM 2 chiều (REQ ↔ TR ↔ TC)', 'Nguyễn Quách Phú Tài', '17/10/2026', 'RTM Sheet', 'Hoàn thành']
  ];

  tasks1.forEach((t, idx) => {
    let cells = '';
    const bg = idx % 2 === 1 ? 'F8FAFC' : 'FFFFFF';
    cells += tcXml(t[0], { width: wCols[0], align: 'center', bg, size: 19 });
    cells += tcXml(t[1], { width: wCols[1], bg, size: 19 });
    cells += tcXml(t[2], { width: wCols[2], bold: true, bg, size: 19 });
    cells += tcXml(t[3], { width: wCols[3], align: 'center', bg, size: 19 });
    cells += tcXml(t[4], { width: wCols[4], bg, size: 19 });
    cells += tcXml(t[5], { width: wCols[5], align: 'center', bold: true, color: '059669', bg, size: 19 });
    rows += trXml(cells);
  });
  body += tblXml(rows, wCols);

  body += h1Xml('VI. KẾT LUẬN & BIỂU QUYẾT');
  body += pXml('• Toàn thể 5/5 thành viên đã biểu quyết nhất trí 100% với kế hoạch phân công, phạm vi kiểm thử và timeline triển khai.', { size: 20 });
  body += pXml('• Buổi họp tiếp theo (Họp Lần 2) dự kiến diễn ra vào ngày 25/10/2026 theo hình thức Online để rà soát kết quả kiểm thử và lỗi Bug Log.', { size: 20, spaceAfter: 200 });

  body += getSignatureBlock();

  body += h1Xml('VIII. HÌNH ẢNH MINH CHỨNG CUỘC HỌP');
  body += pXml('Ảnh chụp buổi họp trực tiếp của Nhóm 02 tại trường Đại học Lạc Hồng:', { italic: true, color: '475569', spaceAfter: 120 });
  if (drawingXml) {
    body += `<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r>${drawingXml}</w:r></w:p>`;
  }

  return wrapDocXml(body);
}

// -----------------------------------------------------------------------------
// BUILD MEETING 2 CONTENT (25/10/2026)
// -----------------------------------------------------------------------------
function buildMeeting2Xml(drawingXml) {
  const dateStr = 'ngày 25 tháng 10 năm 2026';
  const meetingTitle = 'Đánh giá kết quả thực thi kiểm thử 2 vòng, rà soát danh sách lỗi (Bug Log) và tiến độ Tuần 2';

  let body = getDocumentHeader('2', dateStr, meetingTitle);

  body += h1Xml('I. THÔNG TIN CHUNG VỀ CUỘC HỌP');
  body += pXml('• Thời gian bắt đầu: 19:30, Ngày 25/10/2026 | Thời gian kết thúc: 22:00, Ngày 25/10/2026 (Cuối Tuần 2)', { size: 20 });
  body += pXml('• Hình thức họp: Trực tuyến qua Google Meet (Nhóm 02 - 23CT113 - ĐH Lạc Hồng)', { size: 20 });
  body += pXml('• Giáo viên bộ môn hướng dẫn: ThS. Nguyễn Minh Phúc', { size: 20, bold: true, color: '2563EB' });
  body += pXml('• Chủ trì cuộc họp: Nguyễn Quách Phú Tài (Trưởng nhóm / Test Lead)', { size: 20 });
  body += pXml('• Thư ký ghi chép: Bùi Đặng Quốc Khánh', { size: 20, bold: true });

  body += h1Xml('II. THÀNH PHẦN THAM DỰ');
  body += pXml('Cuộc họp có sự tham dự đầy đủ của 5/5 thành viên Nhóm 02 (tỷ lệ 100%):', { size: 20, spaceAfter: 80 });
  body += getAttendanceTable();

  body += h1Xml('III. MỤC TIÊU CUỘC HỌP');
  body += pXml('1. Rà soát kết quả thực thi kiểm thử thủ công Vòng 1 (Local) và Vòng 2 (Deploy Vercel) trong giai đoạn 19–22/10/2026.', { size: 20 });
  body += pXml('2. Thẩm định danh mục lỗi khiếm khuyết (Defect / Bug Log: BUG-001..008) do Thư ký Khánh tổng hợp.', { size: 20 });
  body += pXml('3. Kiểm tra tính đầy đủ của các trường lỗi: Steps to Reproduce, Expected vs Actual Result, Severity (Critical/Major/Moderate/Minor) và Priority (High/Medium/Low).', { size: 20 });
  body += pXml('4. Đánh giá kết quả chạy kiểm thử tự động Jest & Playwright E2E thực hiện ngày 23–24/10/2026.', { size: 20 });
  body += pXml('5. Lên kế hoạch cho Tuần 3: Tổng hợp báo cáo Word 8 chương và làm Slide thuyết trình bảo vệ đề tài.', { size: 20 });

  body += h1Xml('IV. NỘI DUNG THẢO LUẬN & KẾT QUẢ ĐẠT ĐƯỢC');
  body += h2Xml('1. Kết quả thực thi kiểm thử 5 phân hệ');
  body += pXml('• Module Login (Tài): 10 TC - Đăng nhập, bảo mật mật khẩu, phân quyền role đạt 100% Pass.', { size: 20 });
  body += pXml('• Module Campaign (Ân): 12 TC - Luồng tạo nháp và duyệt chiến dịch hoạt động đúng quy trình; phát hiện 2 lỗi giao diện và validate ngày kết thúc.', { size: 20 });
  body += pXml('• Module Reward (Khánh): 10 TC - Gói quà và tính toán số lượng còn lại chính xác; ghi nhận 2 lỗi validation số tiền âm.', { size: 20 });
  body += pXml('• Module Blog (Tiến): 10 TC - Tạo bài viết và bình luận mượt mà; phát hiện 1 lỗi hiển thị phân trang.', { size: 20 });
  body += pXml('• Module KYC (Du): 12 TC - Xác thực danh tính cá nhân và tổ chức; ghi nhận 2 lỗi tải ảnh định dạng lạ và kiểm tra độ dài CCCD.', { size: 20 });

  body += h2Xml('2. Quản lý danh mục Bug Log');
  body += pXml('Nhóm đã phân loại chi tiết 8 lỗi với bằng chứng hình ảnh (evidence screenshot) đầy đủ, gán đúng mã TC liên quan và xác định rõ mức độ ưu tiên sửa chữa.', { size: 20 });

  body += h1Xml('V. BẢNG PHÂN CÔNG NHIỆM VỤ TUẦN 3 (ACTION ITEMS)');

  const wCols = [600, 2800, 1800, 1400, 1800, 960];
  let hCells = '';
  ['STT', 'Nội dung nhiệm vụ', 'Người phụ trách', 'Hạn chót', 'Sản phẩm đầu ra', 'Trạng thái'].forEach((h, i) => {
    hCells += tcXml(h, { width: wCols[i], bold: true, color: 'FFFFFF', bg: '1E3A8A', align: 'center', size: 19 });
  });
  let rows = trXml(hCells, true);

  const tasks2 = [
    ['1', 'Họp nhóm Lần 3: Chốt số liệu & đánh giá % đóng góp', 'Cả nhóm (Thư ký: Khánh)', '28/10/2026', 'Biên Bản Họp 3.docx', 'Hoàn thành'],
    ['2', 'Soạn thảo Báo cáo kiểm thử cuối kỳ Word 8 chương', 'Nguyễn Quách Phú Tài', '29/10/2026', 'Báo Cáo Word_23CT113.docx', 'Hoàn thành'],
    ['3', 'Thiết kế Slide PowerPoint bảo vệ trước GVBM', 'Bùi Đặng Quốc Khánh, Tiến', '29/10/2026', 'Slide thuyết trình .pptx', 'Hoàn thành'],
    ['4', 'Rà soát chéo số liệu giữa Excel, Word và PPT', 'Nguyễn Quách Phú Tài', '30/10/2026', 'Bộ số liệu đồng bộ 100%', 'Hoàn thành'],
    ['5', 'Đóng gói toàn bộ hồ sơ nộp bài cuối kỳ', 'Cả nhóm (5 thành viên)', '01/11/2026', 'Thư mục 23CT113_Nhom02', 'Hoàn thành']
  ];

  tasks2.forEach((t, idx) => {
    let cells = '';
    const bg = idx % 2 === 1 ? 'F8FAFC' : 'FFFFFF';
    cells += tcXml(t[0], { width: wCols[0], align: 'center', bg, size: 19 });
    cells += tcXml(t[1], { width: wCols[1], bg, size: 19 });
    cells += tcXml(t[2], { width: wCols[2], bold: true, bg, size: 19 });
    cells += tcXml(t[3], { width: wCols[3], align: 'center', bg, size: 19 });
    cells += tcXml(t[4], { width: wCols[4], bg, size: 19 });
    cells += tcXml(t[5], { width: wCols[5], align: 'center', bold: true, color: '059669', bg, size: 19 });
    rows += trXml(cells);
  });
  body += tblXml(rows, wCols);

  body += h1Xml('VI. KẾT LUẬN & BIỂU QUYẾT');
  body += pXml('• Nhóm thống nhất 100% thông qua báo cáo tiến độ Tuần 2 và danh mục lỗi Bug Log.', { size: 20 });
  body += pXml('• Buổi họp tiếp theo (Họp Lần 3) tổng kết toàn diện diễn ra vào ngày 28/10/2026.', { size: 20, spaceAfter: 200 });

  body += getSignatureBlock();

  body += h1Xml('VIII. HÌNH ẢNH MINH CHỨNG CUỘC HỌP');
  body += pXml('Ảnh chụp màn hình buổi họp trực tuyến qua Google Meet của Nhóm 02:', { italic: true, color: '475569', spaceAfter: 120 });
  if (drawingXml) {
    body += `<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r>${drawingXml}</w:r></w:p>`;
  }

  return wrapDocXml(body);
}

// -----------------------------------------------------------------------------
// BUILD MEETING 3 CONTENT (28/10/2026)
// -----------------------------------------------------------------------------
function buildMeeting3Xml(drawingXml) {
  const dateStr = 'ngày 28 tháng 10 năm 2026';
  const meetingTitle = 'Tổng kết kết quả kiểm thử, đối soát số liệu và thống nhất tỷ lệ 20% đóng góp thành viên';

  let body = getDocumentHeader('3', dateStr, meetingTitle);

  body += h1Xml('I. THÔNG TIN CHUNG VỀ CUỘC HỌP');
  body += pXml('• Thời gian bắt đầu: 20:00, Ngày 28/10/2026 | Thời gian kết thúc: 22:30, Ngày 28/10/2026 (Tuần 3: 26–28/10)', { size: 20 });
  body += pXml('• Hình thức họp: Trực tuyến qua Google Meet (Nhóm 02 - 23CT113 - ĐH Lạc Hồng)', { size: 20 });
  body += pXml('• Giáo viên bộ môn hướng dẫn: ThS. Nguyễn Minh Phúc', { size: 20, bold: true, color: '2563EB' });
  body += pXml('• Chủ trì cuộc họp: Nguyễn Quách Phú Tài (Trưởng nhóm / Test Lead)', { size: 20 });
  body += pXml('• Thư ký ghi chép: Bùi Đặng Quốc Khánh', { size: 20, bold: true });

  body += h1Xml('II. THÀNH PHẦN THAM DỰ');
  body += pXml('Cuộc họp có sự tham dự đầy đủ của 5/5 thành viên Nhóm 02 (tỷ lệ 100%):', { size: 20, spaceAfter: 80 });
  body += getAttendanceTable();

  body += h1Xml('III. MỤC TIÊU CUỘC HỌP');
  body += pXml('1. Tổng hợp kết quả thực thi kiểm thử toàn diện của đợt kiểm thử môn học.', { size: 20 });
  body += pXml('2. Đối soát tính nhất quán số liệu 100% giữa Workbook Excel, Báo cáo Word và Slide PowerPoint (Khắc phục triệt để lỗi lệch số liệu của nhóm tham khảo Sweet-Sip).', { size: 20 });
  body += pXml('3. Đánh giá mức độ hoàn thành nhiệm vụ và thống nhất tỷ lệ % đóng góp của từng thành viên theo đúng hướng dẫn Team Leader Guidelines của Thầy Phúc.', { size: 20 });
  body += pXml('4. Phân công chuẩn bị hồ sơ nộp bài trước hạn chót 01/11/2026 và phân vai thuyết trình bảo vệ đề tài.', { size: 20 });

  body += h1Xml('IV. NỘI DUNG THẢO LUẬN & KẾT QUẢ ĐẠT ĐƯỢC');
  body += h2Xml('1. Thống nhất tính nhất quán số liệu toàn bộ tài liệu');
  body += pXml('Nhóm đã kiểm tra chéo từng trường số liệu: Tổng số REQ = 29, tổng số TR = 33, tổng số TC = 75, tổng số Bug = 8. Mọi con số trong bảng tóm tắt của Báo cáo Word, Workbook Excel và Slide PPT đều đồng nhất tuyệt đối, không có hiện tượng cộng nhầm hay mâu thuẫn.', { size: 20 });

  body += h2Xml('2. Biểu quyết đánh giá tỷ lệ đóng góp của từng thành viên (100% đồng thuận)');
  body += pXml('Cả 5 thành viên đều thể hiện tinh thần trách nhiệm cao, hoàn thành xuất sắc các phân hệ và tài liệu được phân công. Nhóm thống nhất đánh giá tỷ lệ đóng góp công bằng 20% cho mỗi thành viên (tương ứng 100% hoàn thành tốt):', { size: 20 });
  body += pXml('  1. Nguyễn Quách Phú Tài (Trưởng nhóm / Test Lead): Đóng góp 20% (Điểm nội bộ: 100/100, Xếp loại A+)', { size: 20 });
  body += pXml('  2. Bùi Đặng Quốc Khánh (Thư ký nhóm / Defect Lead): Đóng góp 20% (Điểm nội bộ: 98/100, Xếp loại A)', { size: 20 });
  body += pXml('  3. Nguyễn Trung Tiến (Thành viên / Doc Specialist): Đóng góp 20% (Điểm nội bộ: 98/100, Xếp loại A)', { size: 20 });
  body += pXml('  4. Trần Xuân Ân (Thành viên / Module Lead): Đóng góp 20% (Điểm nội bộ: 98/100, Xếp loại A)', { size: 20 });
  body += pXml('  5. Nguyễn Khánh Du (Thành viên / Module Lead): Đóng góp 20% (Điểm nội bộ: 98/100, Xếp loại A)', { size: 20 });

  body += h1Xml('V. BẢNG PHÂN CÔNG NHIỆM VỤ NGHIỆM THU & NỘP BÀI (ACTION ITEMS)');

  const wCols = [600, 2800, 1800, 1400, 1800, 960];
  let hCells = '';
  ['STT', 'Nội dung nhiệm vụ', 'Người phụ trách', 'Hạn chót', 'Sản phẩm đầu ra', 'Trạng thái'].forEach((h, i) => {
    hCells += tcXml(h, { width: wCols[i], bold: true, color: 'FFFFFF', bg: '1E3A8A', align: 'center', size: 19 });
  });
  let rows = trXml(hCells, true);

  const tasks3 = [
    ['1', 'Rà soát và xuất bản Báo Cáo Word_23CT113_Nhom02.docx', 'Nguyễn Quách Phú Tài', '29/10/2026', 'File Word + PDF hoàn chỉnh', 'Hoàn thành'],
    ['2', 'Hoàn thiện Slide thuyết trình PowerPoint bảo vệ đề tài', 'Bùi Đặng Quốc Khánh, Tiến', '29/10/2026', 'Ppt Báo cáo Nhóm 2.pptx', 'Hoàn thành'],
    ['3', 'Kiểm tra, đối soát số liệu chéo (Excel ↔ Word ↔ PPT)', 'Nguyễn Quách Phú Tài', '30/10/2026', 'Bộ số liệu chuẩn xác 100%', 'Hoàn thành'],
    ['4', 'Đóng gói toàn bộ hồ sơ 23CT113_Nhom02 và hoàn tất nộp bài', 'Cả nhóm (5 bạn)', '01/11/2026', 'Bộ hồ sơ nộp bài cuối kỳ', 'Hoàn thành'],
    ['5', 'Tập dượt thuyết trình bảo vệ trước Thầy Nguyễn Minh Phúc', 'Cả nhóm (5 bạn)', '01/11/2026', 'Kịch bản phân vai demo', 'Hoàn thành']
  ];

  tasks3.forEach((t, idx) => {
    let cells = '';
    const bg = idx % 2 === 1 ? 'F8FAFC' : 'FFFFFF';
    cells += tcXml(t[0], { width: wCols[0], align: 'center', bg, size: 19 });
    cells += tcXml(t[1], { width: wCols[1], bg, size: 19 });
    cells += tcXml(t[2], { width: wCols[2], bold: true, bg, size: 19 });
    cells += tcXml(t[3], { width: wCols[3], align: 'center', bg, size: 19 });
    cells += tcXml(t[4], { width: wCols[4], bg, size: 19 });
    cells += tcXml(t[5], { width: wCols[5], align: 'center', bold: true, color: '059669', bg, size: 19 });
    rows += trXml(cells);
  });
  body += tblXml(rows, wCols);

  body += h1Xml('VI. KẾT LUẬN & BIỂU QUYẾT');
  body += pXml('• Nhóm 02 đồng thuận 100% với toàn bộ hồ sơ báo cáo, bảng số liệu và bảng đánh giá thành viên.', { size: 20 });
  body += pXml('• Toàn thể thành viên sẵn sàng cho buổi thuyết trình bảo vệ đề tài trước Giảng viên Nguyễn Minh Phúc.', { size: 20, spaceAfter: 200 });

  body += getSignatureBlock();

  body += h1Xml('VIII. HÌNH ẢNH MINH CHỨNG CUỘC HỌP');
  body += pXml('Ảnh chụp màn hình buổi họp trực tuyến tổng kết qua Google Meet của Nhóm 02:', { italic: true, color: '475569', spaceAfter: 120 });
  if (drawingXml) {
    body += `<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r>${drawingXml}</w:r></w:p>`;
  }

  return wrapDocXml(body);
}

function wrapDocXml(bodyContent) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" 
  xmlns:mo="http://schemas.microsoft.com/office/mac/office/2008/main" 
  xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
  xmlns:mv="urn:schemas-microsoft-com:mac:vml" 
  xmlns:o="urn:schemas-microsoft-com:office:office" 
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" 
  xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" 
  xmlns:v="urn:schemas-microsoft-com:vml" 
  xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" 
  xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" 
  xmlns:w10="urn:schemas-microsoft-com:office:word" 
  xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" 
  xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" 
  xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" 
  xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" 
  xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" 
  xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" 
  mc:Ignorable="w14 wp14">
  <w:body>
    ${bodyContent}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1418" w:header="720" w:footer="720" w:gutter="0"/>
      <w:cols w:space="720"/>
      <w:docGrid w:linePitch="360"/>
    </w:sectPr>
  </w:body>
</w:document>`;
}

async function updateDocx(filePath, builderFn) {
  console.log(`Updating ${filePath}...`);
  const data = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(data);
  const oldDocXml = await zip.file('word/document.xml').async('text');

  const drawingMatch = oldDocXml.match(/<w:drawing[\s\S]*?<\/w:drawing>/);
  const drawingXml = drawingMatch ? drawingMatch[0] : null;

  const newDocXml = builderFn(drawingXml);
  zip.file('word/document.xml', newDocXml);

  const newBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  try {
    fs.writeFileSync(filePath, newBuffer);
    console.log(`Successfully updated ${filePath} directly (${newBuffer.length} bytes)`);
  } catch (err) {
    if (err.code === 'EBUSY') {
      const altPath = filePath.replace('.docx', '_UPDATED.docx');
      fs.writeFileSync(altPath, newBuffer);
      console.log(`File is locked by an open application. Saved updated copy to ${altPath}`);
    } else {
      throw err;
    }
  }
}

async function run() {
  const dir = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/TimeLine';
  const files = fs.readdirSync(dir);

  const file1 = files.find(f => f.includes('Lần 1') && f.endsWith('.docx') && !f.includes('_UPDATED'));
  const file2 = files.find(f => f.includes('Lần 2') && f.endsWith('.docx') && !f.includes('_UPDATED'));
  const file3 = files.find(f => f.includes('Lần 3') && f.endsWith('.docx') && !f.includes('_UPDATED'));

  if (file1) await updateDocx(path.join(dir, file1), buildMeeting1Xml);
  if (file2) await updateDocx(path.join(dir, file2), buildMeeting2Xml);
  if (file3) await updateDocx(path.join(dir, file3), buildMeeting3Xml);

  console.log('All meeting minutes docx files have been professionally updated with Lạc Hồng University info!');
}

run().catch(console.error);
