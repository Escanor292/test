/**
 * scripts/standardize_timeline_and_meetings.js
 * Chuẩn hóa TimeLine_23CT113_Nhom02.xlsx (Gantt 3 tuần + Phân công & Review chéo vòng tròn)
 * Chuẩn hóa 3 file Biên bản họp nhóm lần 1, 2, 3
 * Đúng 5 thành viên Nhóm 02 - Lớp 23CT113, Trưởng nhóm: Nguyễn Quách Phú Tài
 * Thời gian: 12/10/2026 – 01/11/2026
 * URL: https://test-gamma-azure-65.vercel.app
 */

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const JSZip = require('jszip');

const TIMELINE_DIR = path.resolve('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/TimeLine');
if (!fs.existsSync(TIMELINE_DIR)) {
  fs.mkdirSync(TIMELINE_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. TẠO TIMELINE EXCEL
// ═══════════════════════════════════════════════════════════════════════════
async function buildTimelineExcel() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Nguyễn Quách Phú Tài (123000609) - Trưởng nhóm';
  wb.created = new Date('2026-10-12T08:00:00Z');

  const PALETTE = {
    navy: 'FF0F172A',
    teal: 'FF0D9488',
    blue: 'FF1D4ED8',
    zebra: 'FFF8FAFC',
    border: 'FFE2E8F0',
    doneBg: 'FFDCFCE7',
    doneFg: 'FF15803D',
  };

  // SHEET 1: Gantt Chart (3 Tuần: 12/10/2026 - 01/11/2026)
  const wsGantt = wb.addWorksheet('Tiến độ Gantt 3 Tuần', { views: [{ showGridLines: true }] });
  wsGantt.columns = [
    { width: 8 },  // STT
    { width: 34 }, // Công việc
    { width: 22 }, // Người thực hiện
    { width: 14 }, // Ngày bắt đầu
    { width: 14 }, // Ngày kết thúc
    { width: 14 }, // Tiến độ (%)
    { width: 16 }, // Trạng thái
    { width: 28 }, // Kết quả bàn giao
  ];

  // Title
  wsGantt.mergeCells('A1:H1');
  const t1 = wsGantt.getCell('A1');
  t1.value = 'KẾ HOẠCH & TIẾN ĐỘ THỰC HIỆN DỰ ÁN KIỂM THỬ (12/10/2026 – 01/11/2026)';
  t1.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  t1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.navy } };
  t1.alignment = { horizontal: 'center', vertical: 'middle' };
  wsGantt.getRow(1).height = 32;

  // Header
  const gHeader = wsGantt.addRow([
    'STT', 'Hạng mục công việc kiểm thử', 'Người thực hiện chính', 'Bắt đầu', 'Kết thúc', 'Tiến độ', 'Trạng thái', 'Sản phẩm bàn giao'
  ]);
  gHeader.eachCell(c => {
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.teal } };
    c.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFFFF' } };
    c.alignment = { horizontal: 'center', vertical: 'middle' };
  });
  gHeader.height = 26;

  const tasks = [
    ['1', 'Khảo sát đặc tả PRD và kiến trúc Tử Tế Fund', 'Cả 5 thành viên Nhóm 02', '12/10/2026', '14/10/2026', '100%', 'Hoàn thành', 'Bản đặc tả PRD v3.0 chuẩn hóa'],
    ['2', 'Xây dựng Kế hoạch kiểm thử (Test Plan)', 'Nguyễn Quách Phú Tài', '14/10/2026', '17/10/2026', '100%', 'Hoàn thành', 'Test Plan_23CT113_Nhom02.docx'],
    ['3', 'Họp nhóm Lần 1: Thống nhất phân chia 10 phân hệ', 'Cả 5 thành viên Nhóm 02', '18/10/2026', '18/10/2026', '100%', 'Hoàn thành', 'Biên bản họp nhóm lần 1'],
    ['4', 'Thiết kế 80 Yêu cầu kiểm thử (TR-001 -> TR-080)', '5 Thành viên (16 TR/người)', '19/10/2026', '21/10/2026', '100%', 'Hoàn thành', 'TR List (80 Yêu cầu)'],
    ['5', 'Thiết kế 200 Kịch bản kiểm thử (TC-001 -> TC-200)', '5 Thành viên (40 TC/người)', '22/10/2026', '24/10/2026', '100%', 'Hoàn thành', 'TC List (200 Test Cases)'],
    ['6', 'Họp nhóm Lần 2: Rà soát & Review chéo Test Cases', 'Cả 5 thành viên Nhóm 02', '25/10/2026', '25/10/2026', '100%', 'Hoàn thành', 'Biên bản họp nhóm lần 2'],
    ['7', 'Thực thi kiểm thử thực tế trên Web Demo Vercel', '5 Thành viên (theo phân hệ)', '26/10/2026', '28/10/2026', '100%', 'Hoàn thành', '173 PASS / 23 FAIL / 4 BLOCKED'],
    ['8', 'Ghi nhận và bóc tách 14 Bug Reports (BUG-001..014)', '5 Thành viên Nhóm 02', '28/10/2026', '29/10/2026', '100%', 'Hoàn thành', 'Danh sách 14 Bug Reports'],
    ['9', 'Họp nhóm Lần 3: Tổng kết nghiệm thu & Đóng gói', 'Cả 5 thành viên Nhóm 02', '30/10/2026', '30/10/2026', '100%', 'Hoàn thành', 'Biên bản họp nhóm lần 3'],
    ['10', 'Tổng hợp Test Report & Báo cáo cuối kỳ Word/PPT', 'Nguyễn Quách Phú Tài', '31/10/2026', '01/11/2026', '100%', 'Hoàn thành', 'Báo Cáo Word_23CT113_Nhom02.docx'],
  ];

  tasks.forEach((t, idx) => {
    const r = wsGantt.addRow(t);
    r.eachCell(c => {
      c.font = { name: 'Segoe UI', size: 9 };
      c.border = { top: { style: 'thin', color: { argb: PALETTE.border } }, bottom: { style: 'thin', color: { argb: PALETTE.border } }, left: { style: 'thin', color: { argb: PALETTE.border } }, right: { style: 'thin', color: { argb: PALETTE.border } } };
      c.alignment = { vertical: 'middle' };
    });
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(6).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(7).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(7).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.doneFg } };
    r.getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.doneBg } };
    r.height = 22;
  });

  // SHEET 2: Phân công & Review chéo vòng tròn
  const wsReview = wb.addWorksheet('Phân công & Review chéo', { views: [{ showGridLines: true }] });
  wsReview.columns = [
    { width: 8 },  // STT
    { width: 24 }, // Họ và tên
    { width: 14 }, // MSSV
    { width: 14 }, // Vai trò
    { width: 32 }, // Phân hệ phụ trách (16 TR & 40 TC)
    { width: 26 }, // Review chéo vòng tròn
    { width: 14 }, // Đóng góp
    { width: 16 }, // Trạng thái
  ];

  wsReview.mergeCells('A1:H1');
  const t2 = wsReview.getCell('A1');
  t2.value = 'DANH SÁCH THÀNH VIÊN, PHÂN CÔNG PHÂN HỆ & CƠ CHẾ REVIEW CHÉO VÒNG TRÒN';
  t2.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  t2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.navy } };
  t2.alignment = { horizontal: 'center', vertical: 'middle' };
  wsReview.getRow(1).height = 32;

  const rHeader = wsReview.addRow([
    'STT', 'Họ và tên thành viên', 'MSSV', 'Vai trò', 'Phân hệ phụ trách (16 TR & 40 TC)', 'Review chéo vòng tròn', 'Tỷ lệ đóng góp', 'Đánh giá'
  ]);
  rHeader.eachCell(c => {
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.blue } };
    c.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFFFF' } };
    c.alignment = { horizontal: 'center', vertical: 'middle' };
  });
  rHeader.height = 26;

  const members = [
    ['1', 'Nguyễn Quách Phú Tài', '123000609', 'Trưởng nhóm', 'AUTH & DONATE (TR-001 -> TR-016, 40 TC)', 'Review cho Trần Xuân Ân', '100% (20%)', 'Xuất sắc'],
    ['2', 'Trần Xuân Ân', '123001127', 'Thành viên', 'CAMP & DISBURSE (TR-017 -> TR-032, 40 TC)', 'Review cho Bùi Đặng Quốc Khánh', '100% (20%)', 'Tốt'],
    ['3', 'Bùi Đặng Quốc Khánh', '123001005', 'Thành viên', 'USER & ADMIN (TR-033 -> TR-048, 40 TC)', 'Review cho Nguyễn Trung Tiến', '100% (20%)', 'Tốt'],
    ['4', 'Nguyễn Trung Tiến', '123000127', 'Thành viên', 'BLOG & CHAT (TR-049 -> TR-064, 40 TC)', 'Review cho Nguyễn Khánh Du', '100% (20%)', 'Tốt'],
    ['5', 'Nguyễn Khánh Du', '123000159', 'Thành viên', 'STATS & SYSTEM (TR-065 -> TR-080, 40 TC)', 'Review cho Nguyễn Quách Phú Tài', '100% (20%)', 'Tốt'],
  ];

  members.forEach(m => {
    const r = wsReview.addRow(m);
    r.eachCell(c => {
      c.font = { name: 'Segoe UI', size: 9 };
      c.border = { top: { style: 'thin', color: { argb: PALETTE.border } }, bottom: { style: 'thin', color: { argb: PALETTE.border } }, left: { style: 'thin', color: { argb: PALETTE.border } }, right: { style: 'thin', color: { argb: PALETTE.border } } };
      c.alignment = { vertical: 'middle' };
    });
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(7).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(8).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(8).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.doneFg } };
    r.getCell(8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.doneBg } };
    r.height = 24;
  });

  const timelineFile = path.join(TIMELINE_DIR, 'TimeLine_23CT113_Nhom02.xlsx');
  await wb.xlsx.writeFile(timelineFile);
  console.log('Saved Timeline Excel:', timelineFile);
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. TẠO 3 FILE BIÊN BẢN HỌP NHÓM
// ═══════════════════════════════════════════════════════════════════════════
function buildDocxXml(title, sessionNumber, dateStr, location, attendees, agenda, discussion, actionItems) {
  function esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  let xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>
  <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="28"/><w:color w:val="0F172A"/></w:rPr><w:t>TRƯỜNG ĐẠI HỌC LẠC HỒNG - KHOA CÔNG NGHỆ THÔNG TIN</w:t></w:r></w:p>
  <w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="200"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="24"/><w:color w:val="475569"/></w:rPr><w:t>Học phần: Kiểm thử và Đảm bảo Chất lượng Phần mềm | Lớp: 23CT113 - Nhóm: Nhóm 02</w:t></w:r></w:p>
  
  <w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="200" w:after="300"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="32"/><w:color w:val="1E3A8A"/></w:rPr><w:t>${esc(title)}</w:t></w:r></w:p>

  <w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="24"/></w:rPr><w:t>1. THÔNG TIN CHUNG BUỔI HỌP</w:t></w:r></w:p>
  <w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="22"/></w:rPr><w:t>• Thời gian: ${esc(dateStr)}</w:t></w:r></w:p>
  <w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="22"/></w:rPr><w:t>• Địa điểm / Hình thức: ${esc(location)}</w:t></w:r></w:p>
  <w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="22"/></w:rPr><w:t>• Chủ trì cuộc họp: Nguyễn Quách Phú Tài (123000609 - Trưởng nhóm)</w:t></w:r></w:p>
  <w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="22"/></w:rPr><w:t>• Thư ký ghi chép: Bùi Đặng Quốc Khánh (123001005)</w:t></w:r></w:p>
  <w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="22"/></w:rPr><w:t>• Thành phần tham dự: Đầy đủ 5/5 thành viên (Nguyễn Quách Phú Tài, Trần Xuân Ân, Bùi Đặng Quốc Khánh, Nguyễn Trung Tiến, Nguyễn Khánh Du)</w:t></w:r></w:p>
  <w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="22"/></w:rPr><w:t>• Đề tài: Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund) | Web Demo: https://test-gamma-azure-65.vercel.app</w:t></w:r></w:p>

  <w:p><w:pPr><w:spacing w:before="200"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="24"/></w:rPr><w:t>2. NỘI DUNG VÀ MỤC ĐÍCH CUỘC HỌP</w:t></w:r></w:p>
  ${agenda.map(a => `<w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="22"/></w:rPr><w:t>• ${esc(a)}</w:t></w:r></w:p>`).join('')}

  <w:p><w:pPr><w:spacing w:before="200"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="24"/></w:rPr><w:t>3. TÓM TẮT DIỄN BIẾN VÀ THẢO LUẬN</w:t></w:r></w:p>
  ${discussion.map(d => `<w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="22"/></w:rPr><w:t>- ${esc(d)}</w:t></w:r></w:p>`).join('')}

  <w:p><w:pPr><w:spacing w:before="200"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="24"/></w:rPr><w:t>4. PHÂN CÔNG CÔNG VIỆC VÀ KẾT LUẬN</w:t></w:r></w:p>
  ${actionItems.map(act => `<w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="22"/></w:rPr><w:t>✔ ${esc(act)}</w:t></w:r></w:p>`).join('')}

  <w:p><w:pPr><w:spacing w:before="300"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:i/><w:sz w:val="22"/></w:rPr><w:t>Biên bản kết thúc vào lúc 11h30 cùng ngày. Toàn thể 5 thành viên đã đọc lại, đồng thuận 100% và ký tên xác nhận.</w:t></w:r></w:p>

  <w:p><w:pPr><w:spacing w:before="400"/></w:pPr>
    <w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="22"/></w:rPr><w:t>   THƯ KÝ CUỘC HỌP                                                                             TRƯỞNG NHÓM</w:t></w:r>
  </w:p>
  <w:p><w:pPr><w:spacing w:before="500"/></w:pPr>
    <w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="22"/></w:rPr><w:t>Bùi Đặng Quốc Khánh                                                                    Nguyễn Quách Phú Tài</w:t></w:r>
  </w:p>
</w:body>
</w:document>`;
  return xml;
}

async function createMeetingDocx(filepath, title, sessionNumber, dateStr, location, agenda, discussion, actionItems) {
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

  zip.folder('word').file('document.xml', buildDocxXml(title, sessionNumber, dateStr, location, [], agenda, discussion, actionItems));

  const buf = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync(filepath, buf);
  console.log('Saved Meeting Docx:', filepath);
}

async function run() {
  await buildTimelineExcel();

  // Biên bản 1
  await createMeetingDocx(
    path.join(TIMELINE_DIR, 'Biên Bản Họp Nhóm Lần 1 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx'),
    'BIÊN BẢN HỌP NHÓM LẦN 1 — PHÂN CHIA NHIỆM VỤ & THỐNG NHẤT TEST PLAN',
    1,
    '08h30 – 11h30, Thứ Bảy ngày 18/10/2026',
    'Phòng Lab CNTT, Trường Đại học Lạc Hồng & Google Meet',
    [
      'Thống nhất mục tiêu kiểm thử nền tảng gây quỹ cộng đồng Tử Tế Fund',
      'Phân chia 10 phân hệ nghiệp vụ cho 5 thành viên (mỗi người phụ trách 2 phân hệ: 16 TR & 40 TC)',
      'Thống nhất quy trình Review chéo vòng tròn và cam kết hoàn thành thực tế 100%'
    ],
    [
      'Trưởng nhóm Nguyễn Quách Phú Tài trình bày cấu trúc mã nguồn Next.js 15, Prisma ORM và Web Demo https://test-gamma-azure-65.vercel.app',
      'Thành viên thảo luận về phạm vi: 10 phân hệ bao gồm AUTH, DONATE, CAMP, DISBURSE, USER, ADMIN, BLOG, CHAT, STATS, SYSTEM',
      'Thống nhất chỉ số chất lượng đề ra: Tỷ lệ Pass thực tế phải đạt tối thiểu ≥ 85.0%, không dùng kết quả ảo'
    ],
    [
      'Nguyễn Quách Phú Tài: Phụ trách AUTH & DONATE (TR-001 -> TR-016, 40 TC), review cho Trần Xuân Ân',
      'Trần Xuân Ân: Phụ trách CAMP & DISBURSE (TR-017 -> TR-032, 40 TC), review cho Bùi Đặng Quốc Khánh',
      'Bùi Đặng Quốc Khánh: Phụ trách USER & ADMIN (TR-033 -> TR-048, 40 TC), review cho Nguyễn Trung Tiến',
      'Nguyễn Trung Tiến: Phụ trách BLOG & CHAT (TR-049 -> TR-064, 40 TC), review cho Nguyễn Khánh Du',
      'Nguyễn Khánh Du: Phụ trách STATS & SYSTEM (TR-065 -> TR-080, 40 TC), review cho Nguyễn Quách Phú Tài'
    ]
  );

  // Biên bản 2
  await createMeetingDocx(
    path.join(TIMELINE_DIR, 'Biên Bản Họp Nhóm Lần 2 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx'),
    'BIÊN BẢN HỌP NHÓM LẦN 2 — RÀ SOÁT TEST CASE & ĐÁNH GIÁ REVIEW CHÉO VÒNG TRÒN',
    2,
    '08h30 – 11h30, Thứ Bảy ngày 25/10/2026',
    'Phòng Lab CNTT, Trường Đại học Lạc Hồng & Google Meet',
    [
      'Báo cáo tiến độ thiết kế 80 TR và 200 TC của 5 thành viên',
      'Tiến hành Review chéo vòng tròn các kịch bản kiểm thử theo đúng phân công',
      'Chuẩn bị dữ liệu kiểm thử (Test Data) trên 4 tài khoản seed: Admin, Creator, Backer, User thường'
    ],
    [
      'Nguyễn Quách Phú Tài hoàn thành review cho bộ 40 TC của Trần Xuân Ân (CAMP & DISBURSE), góp ý bổ sung kịch bản hóa đơn điện tử',
      'Trần Xuân Ân hoàn thành review cho bộ 40 TC của Bùi Đặng Quốc Khánh (USER & ADMIN), duyệt các ca kiểm thử KYC thủ công',
      'Bùi Đặng Quốc Khánh hoàn thành review cho bộ 40 TC của Nguyễn Trung Tiến (BLOG & CHAT), kiểm tra kịch bản TipTap sanitize',
      'Nguyễn Trung Tiến hoàn thành review cho bộ 40 TC của Nguyễn Khánh Du (STATS & SYSTEM), chuẩn hóa kịch bản bảo mật CSP/CSRF',
      'Nguyễn Khánh Du hoàn thành review cho bộ 40 TC của Nguyễn Quách Phú Tài (AUTH & DONATE), hoàn thiện luồng thanh toán VietQR'
    ],
    [
      'Cả 5 thành viên đồng thuận bộ 200 TC đạt chuẩn chất lượng, sẵn sàng thực thi trên Web Demo từ ngày 26/10',
      'Thống nhất quy trình ghi nhận Bug Report trung thực: mọi lỗi biên, lỗi validation đều ghi nhận chi tiết'
    ]
  );

  // Biên bản 3
  await createMeetingDocx(
    path.join(TIMELINE_DIR, 'Biên Bản Họp Nhóm Lần 3 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx'),
    'BIÊN BẢN HỌP NHÓM LẦN 3 — TỔNG KẾT THỰC THI KIỂM THỨ & ĐÓNG GÓI HỒ SƠ BÁO CÁO',
    3,
    '08h30 – 11h30, Thứ Năm ngày 30/10/2026',
    'Phòng Lab CNTT, Trường Đại học Lạc Hồng & Google Meet',
    [
      'Tổng kết kết quả thực thi kiểm thử thực tế trên toàn bộ 200 Test Cases',
      'Rà soát và phân loại 14 Bug Reports (BUG-001 -> BUG-014)',
      'Nghiệm thu hồ sơ kiểm thử: Excel, Word, PPT và đóng gói nộp bài'
    ],
    [
      'Tổng kết số liệu thực tế: 173 PASS (86.5%), 23 FAIL (11.5%), 4 BLOCKED (2.0%)',
      'Tỷ lệ PASS 86.5% đạt và vượt chỉ tiêu chất lượng đề ra ban đầu (≥ 85.0%)',
      '14 Bug Reports được phân loại rõ ràng theo mức độ nghiêm trọng: 3 Critical/High, 9 Medium, 2 Low',
      'Đánh giá đóng góp: Toàn bộ 5/5 thành viên đều hoàn thành xuất sắc nhiệm vụ (đóng góp 100% - 20%/người)'
    ],
    [
      'Trưởng nhóm Nguyễn Quách Phú Tài chịu trách nhiệm đóng gói toàn bộ hồ sơ lên GitHub repository',
      'Hoàn tất báo cáo cuối kỳ Báo Cáo Word_23CT113_Nhom02.docx và slide thuyết trình PPT'
    ]
  );

  console.log('ALL TIMELINE AND MEETING DOCUMENTS COMPLETED!');
}

run().catch(console.error);

