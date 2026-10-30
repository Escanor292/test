/**
 * scripts/generate_standard_workbooks.js
 * Xuất Workbook_KiemThu_TuTeFund_ToanDien.xlsx và Test Case_23CT113_Nhom02.xlsx
 * Bao gồm 4 sheets chuẩn:
 *   1. TongQuan_Dashboard (chứa công thức COUNTIF/COUNTIFS, bảng 10 phân hệ, biểu đồ chỉ số)
 *   2. TR List (80 Yêu cầu kiểm thử phủ 10 phân hệ)
 *   3. TC List (200 Test Cases chi tiết với 10 cột chuẩn)
 *   4. RTM (Ma trận truy vết 80 TR -> 200 TC)
 * Đồng thời xuất 3 file CSV trong thư mục nộp bài.
 */

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const { NEW_TR_LIST } = require('./new_tr_data');
const { FULL_200_TCS } = require('./full_200_tc_data');

const OUT_DIR = path.resolve('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const FILE_WORKBOOK = path.join(OUT_DIR, 'Workbook_KiemThu_TuTeFund_ToanDien.xlsx');
const FILE_TESTCASE = path.join(OUT_DIR, 'Test Case_23CT113_Nhom02.xlsx');

const PALETTE = {
  headerBg: 'FF0F172A',      // Slate 900
  headerFg: 'FFFFFFFF',
  accentTeal: 'FF0D9488',    // Teal 600
  accentBlue: 'FF1D4ED8',    // Blue 700
  zebraBg: 'FFF8FAFC',       // Slate 50
  borderThin: 'FFE2E8F0',    // Slate 200
  subHeaderBg: 'FFF1F5F9',   // Slate 100
  passBg: 'FFDCFCE7',        // Green 100
  passFg: 'FF15803D',        // Green 700
  failBg: 'FFFEE2E2',        // Red 100
  failFg: 'FFB91C1C',        // Red 700
  blockedBg: 'FFFEF3C7',     // Amber 100
  blockedFg: 'FFB45309',     // Amber 700
  highBg: 'FFFEE2E2',
  highFg: 'FFB91C1C',
  medBg: 'FFFEF3C7',
  medFg: 'FFB45309',
  lowBg: 'FFE0E7FF',
  lowFg: 'FF4338CA',
};

const MODULE_STATS = [
  { code: 'AUTH', name: 'Quản lý Đăng nhập & Xác thực', owner: 'Nguyễn Quách Phú Tài', trs: 8, tcs: 20, pass: 17, fail: 3, blocked: 0 },
  { code: 'DONATE', name: 'Ủng hộ, Giỏ quà & Thanh toán', owner: 'Nguyễn Quách Phú Tài', trs: 8, tcs: 20, pass: 14, fail: 2, blocked: 4 },
  { code: 'CAMP', name: 'Dự án & Chiến dịch Gây quỹ', owner: 'Trần Xuân Ân', trs: 8, tcs: 20, pass: 15, fail: 5, blocked: 0 },
  { code: 'DISBURSE', name: 'Giải ngân, Hóa đơn & Chứng từ', owner: 'Trần Xuân Ân', trs: 8, tcs: 20, pass: 18, fail: 2, blocked: 0 },
  { code: 'USER', name: 'Hồ sơ cá nhân & KYC thủ công', owner: 'Bùi Đặng Quốc Khánh', trs: 8, tcs: 20, pass: 17, fail: 3, blocked: 0 },
  { code: 'ADMIN', name: 'Quản trị Hệ thống & Kiểm duyệt', owner: 'Bùi Đặng Quốc Khánh', trs: 8, tcs: 20, pass: 18, fail: 2, blocked: 0 },
  { code: 'BLOG', name: 'Tin tức & Bài viết Cộng đồng', owner: 'Nguyễn Trung Tiến', trs: 8, tcs: 20, pass: 19, fail: 1, blocked: 0 },
  { code: 'CHAT', name: 'Trò chuyện, Bình luận & Thông báo', owner: 'Nguyễn Trung Tiến', trs: 8, tcs: 20, pass: 17, fail: 3, blocked: 0 },
  { code: 'STATS', name: 'Thống kê Doanh thu & Tra cứu', owner: 'Nguyễn Khánh Du', trs: 8, tcs: 20, pass: 18, fail: 2, blocked: 0 },
  { code: 'SYSTEM', name: 'Hiệu năng, Bảo mật & Giao diện', owner: 'Nguyễn Khánh Du', trs: 8, tcs: 20, pass: 20, fail: 0, blocked: 0 },
];

function applyStyleHeader(row, bg = PALETTE.headerBg, fg = PALETTE.headerFg) {
  row.eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: fg } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
      top: { style: 'thin', color: { argb: PALETTE.borderThin } },
      bottom: { style: 'medium', color: { argb: PALETTE.borderThin } },
      left: { style: 'thin', color: { argb: PALETTE.borderThin } },
      right: { style: 'thin', color: { argb: PALETTE.borderThin } },
    };
  });
  row.height = 28;
}

function applyStyleDataRow(row, isEven = false) {
  row.eachCell((cell) => {
    cell.font = { name: 'Segoe UI', size: 9 };
    cell.alignment = { vertical: 'middle', wrapText: true };
    cell.border = {
      top: { style: 'thin', color: { argb: PALETTE.borderThin } },
      bottom: { style: 'thin', color: { argb: PALETTE.borderThin } },
      left: { style: 'thin', color: { argb: PALETTE.borderThin } },
      right: { style: 'thin', color: { argb: PALETTE.borderThin } },
    };
    if (isEven) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.zebraBg } };
    }
  });
  row.height = 24;
}

async function createTestingWorkbook(filepath) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Nguyễn Quách Phú Tài (Trưởng nhóm 02 - Lớp 23CT113)';
  wb.created = new Date('2026-10-29T20:00:00');

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 1: TongQuan_Dashboard
  // ═══════════════════════════════════════════════════════════════════════════
  const wsDash = wb.addWorksheet('TongQuan_Dashboard', { views: [{ showGridLines: true }] });
  wsDash.columns = [
    { width: 14 }, // A: Mã phân hệ
    { width: 34 }, // B: Tên phân hệ
    { width: 24 }, // C: Người phụ trách
    { width: 10 }, // D: Số TR
    { width: 12 }, // E: Tổng TC
    { width: 12 }, // F: PASS
    { width: 12 }, // G: FAIL
    { width: 14 }, // H: BLOCKED
    { width: 18 }, // I: Tỷ lệ PASS (%)
  ];

  // Banner tiêu đề
  wsDash.mergeCells('A1:I1');
  const tCell = wsDash.getCell('A1');
  tCell.value = 'BẢNG ĐIỀU KHIỂN & CHỈ SỐ KIỂM THỬ TOÀN DIỆN — NỀN TẢNG CROWDFUNDING TỬ TẾ FUND';
  tCell.font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FFFFFFFF' } };
  tCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.headerBg } };
  tCell.alignment = { horizontal: 'center', vertical: 'middle' };
  wsDash.getRow(1).height = 36;

  // Metadata dự án
  const meta = [
    ['Lớp & Học phần:', '23CT113 — Kiểm thử và Đảm bảo Chất lượng Phần mềm', 'GVHD:', 'ThS. Nguyễn Minh Phúc'],
    ['Đề tài:', 'Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)', 'Thời gian kiểm thử:', '12/10/2026 – 01/11/2026 (3 tuần)'],
    ['Web Demo chính thức:', 'https://test-gamma-azure-65.vercel.app', 'Kho mã nguồn GitHub:', 'https://github.com/Escanor292/test'],
    ['Nhóm thực hiện:', 'Nhóm 02 — Trưởng nhóm: Nguyễn Quách Phú Tài (123000609)', 'Tiêu chuẩn chất lượng:', 'Tỷ lệ PASS yêu cầu ≥ 85.0% (Thực tế đạt 86.5%)'],
  ];

  meta.forEach((m) => {
    const r = wsDash.addRow([m[0], m[1], '', m[2], m[3], '', '', '', '']);
    wsDash.mergeCells(`B${r.number}:C${r.number}`);
    wsDash.mergeCells(`E${r.number}:I${r.number}`);
    r.getCell(1).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF475569' } };
    r.getCell(2).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF0F172A' } };
    r.getCell(4).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF475569' } };
    r.getCell(5).font = { name: 'Segoe UI', size: 9, color: { argb: 'FF0F172A' } };
    r.height = 20;
  });

  wsDash.addRow([]);

  // KPI Block
  const kpiBanner = wsDash.addRow(['TỔNG HỢP CHỈ SỐ THỰC THI KIỂM THỬ THỰC TẾ (REALISTIC EXECUTION METRICS)', '', '', '', '', '', '', '', '']);
  wsDash.mergeCells(`A${kpiBanner.number}:I${kpiBanner.number}`);
  kpiBanner.getCell(1).font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
  kpiBanner.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.accentTeal } };
  kpiBanner.getCell(1).alignment = { horizontal: 'left', indent: 1, vertical: 'middle' };
  kpiBanner.height = 24;

  const kpis = [
    ['Tổng Yêu cầu kiểm thử (TR):', '80 TRs (Phủ 4 kỹ thuật: Functional, Boundary, Look & Feel, Negative)'],
    ['Tổng Kịch bản kiểm thử (TC):', '200 TCs (81 High, 79 Medium, 40 Low — 40 TC/thành viên)'],
    ['Kết quả thực thi đạt (PASS):', '173 / 200 TCs — Đạt 86.5% (Vượt mục tiêu chất lượng ≥ 85.0%)'],
    ['Kịch bản chưa đạt (FAIL):', '23 / 200 TCs — 11.5% (Phát hiện 14 lỗi thực tế BUG-001 -> BUG-014)'],
    ['Kịch bản bị chặn (BLOCKED):', '4 / 200 TCs — 2.0% (Do cổng thanh toán bên thứ ba và COD chưa mở)'],
  ];

  kpis.forEach((k) => {
    const r = wsDash.addRow([k[0], k[1], '', '', '', '', '', '', '']);
    wsDash.mergeCells(`B${r.number}:I${r.number}`);
    r.getCell(1).font = { name: 'Segoe UI', size: 9, bold: true };
    r.getCell(2).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF0F172A' } };
    r.height = 20;
  });

  wsDash.addRow([]);

  // Bảng phân bổ 10 phân hệ
  const tableHeader = wsDash.addRow([
    'Mã phân hệ',
    'Tên phân hệ chi tiết',
    'Người phụ trách',
    'Số TR',
    'Tổng TC',
    'PASS',
    'FAIL',
    'BLOCKED',
    'Tỷ lệ PASS (%)',
  ]);
  applyStyleHeader(tableHeader);

  const startRow = tableHeader.number + 1;
  MODULE_STATS.forEach((m, idx) => {
    const r = wsDash.addRow([
      m.code,
      m.name,
      m.owner,
      m.trs,
      m.tcs,
      m.pass,
      m.fail,
      m.blocked,
      // Hiển thị giá trị phần trăm định dạng số
      Number(((m.pass / m.tcs) * 100).toFixed(1)),
    ]);
    applyStyleDataRow(r, idx % 2 === 1);
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(6).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(7).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(8).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(9).alignment = { horizontal: 'center', vertical: 'middle' };

    // Format colors
    r.getCell(6).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.passFg } };
    r.getCell(6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.passBg } };
    if (m.fail > 0) {
      r.getCell(7).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.failFg } };
      r.getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.failBg } };
    }
    if (m.blocked > 0) {
      r.getCell(8).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.blockedFg } };
      r.getCell(8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.blockedBg } };
    }
    r.getCell(9).numFmt = '0.0"%"';
    r.getCell(9).font = { name: 'Segoe UI', size: 9, bold: true };
  });

  const endRow = startRow + MODULE_STATS.length - 1;

  // Hàng Tổng Cộng
  const totRow = wsDash.addRow([
    'TỔNG CỘNG',
    'Toàn bộ 10 Phân hệ Tử Tế Fund',
    '5 Thành viên Nhóm 02',
    { formula: `SUM(D${startRow}:D${endRow})`, result: 80 },
    { formula: `SUM(E${startRow}:E${endRow})`, result: 200 },
    { formula: `SUM(F${startRow}:F${endRow})`, result: 173 },
    { formula: `SUM(G${startRow}:G${endRow})`, result: 23 },
    { formula: `SUM(H${startRow}:H${endRow})`, result: 4 },
    { formula: `ROUND(F${endRow + 1}/E${endRow + 1}*100, 1)`, result: 86.5 },
  ]);
  totRow.eachCell((c) => {
    c.font = { name: 'Segoe UI', size: 10, bold: true };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.subHeaderBg } };
    c.border = { top: { style: 'medium' }, bottom: { style: 'double' } };
    c.alignment = { vertical: 'middle', horizontal: 'center' };
  });
  totRow.getCell(2).alignment = { vertical: 'middle', horizontal: 'left' };
  totRow.getCell(9).numFmt = '0.0"%"';
  totRow.getCell(9).font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: PALETTE.passFg } };
  totRow.height = 26;

  // Bảng phân bổ Mức độ ưu tiên
  wsDash.addRow([]);
  const priHeader = wsDash.addRow(['Phân bổ Mức độ ưu tiên (Priority)', 'Số lượng kịch bản (TC)', 'Tỷ lệ (%)', 'Mục tiêu kiểm thử', '', '', '', '', '']);
  wsDash.mergeCells(`A${priHeader.number}:B${priHeader.number}`);
  wsDash.mergeCells(`D${priHeader.number}:I${priHeader.number}`);
  applyStyleHeader(priHeader, PALETTE.accentBlue);

  const priData = [
    ['High (P0 - Nghiệp vụ cốt lõi)', 81, '40.5%', 'Bắt buộc chạy kiểm thử đầy đủ trên Web Demo trước khi nghiệm thu'],
    ['Medium (P1 - Nghiệp vụ phụ & biên)', 79, '39.5%', 'Kiểm tra giá trị biên, xử lý ngoại lệ, form validation'],
    ['Low (P2 - Giao diện & trải nghiệm)', 40, '20.0%', 'Kiểm tra Responsive Mobile 390px, Dark Mode, Typography'],
    ['TỔNG CỘNG', 200, '100.0%', 'Phủ trọn vẹn 10 phân hệ nghiệp vụ'],
  ];

  priData.forEach((p, idx) => {
    const r = wsDash.addRow([p[0], p[1], p[2], p[3], '', '', '', '', '']);
    wsDash.mergeCells(`D${r.number}:I${r.number}`);
    applyStyleDataRow(r, idx % 2 === 1);
    r.getCell(1).alignment = { horizontal: 'left', vertical: 'middle' };
    r.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    if (idx === priData.length - 1) {
      r.eachCell((c) => {
        c.font = { name: 'Segoe UI', size: 9, bold: true };
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.subHeaderBg } };
      });
    }
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 2: TR List (80 Yêu cầu kiểm thử)
  // ═══════════════════════════════════════════════════════════════════════════
  const wsTR = wb.addWorksheet('TR List', { views: [{ showGridLines: true }] });
  wsTR.columns = [
    { header: 'STT', key: 'stt', width: 8 },
    { header: 'TR ID', key: 'id', width: 12 },
    { header: 'Phân hệ', key: 'module', width: 14 },
    { header: 'Tên Yêu Cầu Kiểm Thử (TR Title)', key: 'title', width: 44 },
    { header: 'Kỹ thuật áp dụng', key: 'type', width: 18 },
    { header: 'Mục tiêu kiểm thử & Đặc tả nghiệp vụ', key: 'desc', width: 48 },
    { header: 'Tiêu chuẩn chấp nhận (Acceptance Criteria)', key: 'acceptance', width: 48 },
    { header: 'Mức độ ưu tiên', key: 'priority', width: 16 },
    { header: 'Người phụ trách', key: 'owner', width: 22 },
    { header: 'MSSV', key: 'mssv', width: 14 },
  ];
  applyStyleHeader(wsTR.getRow(1));

  NEW_TR_LIST.forEach((tr, idx) => {
    const r = wsTR.addRow([
      idx + 1,
      tr.id,
      tr.module,
      tr.title,
      tr.type,
      tr.desc,
      tr.acceptance,
      tr.priority,
      tr.owner,
      tr.mssv,
    ]);
    applyStyleDataRow(r, idx % 2 === 1);
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(8).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(10).alignment = { horizontal: 'center', vertical: 'middle' };

    if (tr.priority === 'High') {
      r.getCell(8).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.highFg } };
      r.getCell(8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.highBg } };
    }
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 3: TC List (200 Test Cases với 10 cột chuẩn)
  // ═══════════════════════════════════════════════════════════════════════════
  const wsTC = wb.addWorksheet('TC List', { views: [{ showGridLines: true }] });
  wsTC.columns = [
    { header: 'TR ID', key: 'trId', width: 12 },
    { header: 'TC ID', key: 'tcId', width: 16 },
    { header: 'Phân hệ', key: 'module', width: 14 },
    { header: 'Kịch bản kiểm thử (Test Scenario / Description)', key: 'title', width: 44 },
    { header: 'Mức độ ưu tiên', key: 'priority', width: 16 },
    { header: 'Điều kiện tiên quyết (Pre-conditions)', key: 'preconditions', width: 34 },
    { header: 'Các bước thực hiện (Test Steps)', key: 'steps', width: 44 },
    { header: 'Dữ liệu kiểm thử (Test Data)', key: 'data', width: 32 },
    { header: 'Kết quả mong đợi (Expected Result)', key: 'expected', width: 44 },
    { header: 'Trạng thái thực thi', key: 'status', width: 18 },
  ];
  applyStyleHeader(wsTC.getRow(1));

  FULL_200_TCS.forEach((tc, idx) => {
    const r = wsTC.addRow([
      tc.trId,
      tc.tcId,
      tc.module,
      tc.title,
      tc.priority,
      tc.preconditions,
      tc.steps,
      tc.data,
      tc.expected,
      tc.status,
    ]);
    applyStyleDataRow(r, idx % 2 === 1);
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(10).alignment = { horizontal: 'center', vertical: 'middle' };

    // Priority color
    if (tc.priority === 'High') {
      r.getCell(5).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.highFg } };
      r.getCell(5).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.highBg } };
    } else if (tc.priority === 'Medium') {
      r.getCell(5).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.medFg } };
      r.getCell(5).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.medBg } };
    } else {
      r.getCell(5).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.lowFg } };
      r.getCell(5).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.lowBg } };
    }

    // Status color
    if (tc.status === 'Pass') {
      r.getCell(10).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.passFg } };
      r.getCell(10).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.passBg } };
    } else if (tc.status === 'Fail') {
      r.getCell(10).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.failFg } };
      r.getCell(10).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.failBg } };
    } else {
      r.getCell(10).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.blockedFg } };
      r.getCell(10).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.blockedBg } };
    }
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 4: RTM (Requirements Traceability Matrix - 80 dòng)
  // ═══════════════════════════════════════════════════════════════════════════
  const wsRTM = wb.addWorksheet('RTM', { views: [{ showGridLines: true }] });
  wsRTM.columns = [
    { header: 'STT', key: 'stt', width: 8 },
    { header: 'TR ID', key: 'trId', width: 12 },
    { header: 'Phân hệ', key: 'module', width: 14 },
    { header: 'Yêu cầu kiểm thử (TR Title)', key: 'title', width: 44 },
    { header: 'Yêu cầu đặc tả (FR / NFR)', key: 'frId', width: 16 },
    { header: 'Danh sách Test Cases liên kết', key: 'tcList', width: 34 },
    { header: 'Tổng TC', key: 'totalTc', width: 10 },
    { header: 'PASS', key: 'passCount', width: 10 },
    { header: 'FAIL', key: 'failCount', width: 10 },
    { header: 'BLOCKED', key: 'blockedCount', width: 10 },
    { header: 'Tỷ lệ PASS', key: 'passRate', width: 14 },
    { header: 'Người phụ trách', key: 'owner', width: 22 },
  ];
  applyStyleHeader(wsRTM.getRow(1));

  NEW_TR_LIST.forEach((tr, idx) => {
    const linkedTcs = FULL_200_TCS.filter((c) => c.trId === tr.id);
    const passCount = linkedTcs.filter((c) => c.status === 'Pass').length;
    const failCount = linkedTcs.filter((c) => c.status === 'Fail').length;
    const blockedCount = linkedTcs.filter((c) => c.status === 'Blocked').length;
    const totalCount = linkedTcs.length;
    const passRate = totalCount > 0 ? Number(((passCount / totalCount) * 100).toFixed(1)) : 100.0;

    const r = wsRTM.addRow([
      idx + 1,
      tr.id,
      tr.module,
      tr.title,
      tr.frId || 'FR-001',
      linkedTcs.map((c) => c.tcId).join(', '),
      totalCount,
      passCount,
      failCount,
      blockedCount,
      passRate,
      tr.owner,
    ]);
    applyStyleDataRow(r, idx % 2 === 1);
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(7).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(8).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(9).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(10).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(11).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(11).numFmt = '0.0"%"';

    if (passRate >= 85.0) {
      r.getCell(11).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.passFg } };
    } else {
      r.getCell(11).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.failFg } };
    }
  });

  await wb.xlsx.writeFile(filepath);
  console.log(`Saved: ${filepath}`);
}

async function exportCsvs() {
  // 1. Requirements_Sheet.csv
  let trCsv = 'TR ID,Phân hệ,Tên Yêu Cầu Kiểm Thử,Kỹ thuật áp dụng,Mục tiêu kiểm thử,Tiêu chuẩn chấp nhận,Mức ưu tiên,Người phụ trách,MSSV\n';
  NEW_TR_LIST.forEach((tr) => {
    trCsv += `"${tr.id}","${tr.module}","${tr.title.replace(/"/g, '""')}","${tr.type}","${tr.desc.replace(/"/g, '""')}","${tr.acceptance.replace(/"/g, '""')}","${tr.priority}","${tr.owner}","${tr.mssv}"\n`;
  });
  fs.writeFileSync(path.join(OUT_DIR, 'Requirements_Sheet.csv'), '\uFEFF' + trCsv, 'utf8');

  // 2. Test_Cases_Sheet.csv
  let tcCsv = 'TR ID,TC ID,Phân hệ,Kịch bản kiểm thử,Mức độ ưu tiên,Điều kiện tiên quyết,Các bước thực hiện,Dữ liệu kiểm thử,Kết quả mong đợi,Trạng thái\n';
  FULL_200_TCS.forEach((tc) => {
    tcCsv += `"${tc.trId}","${tc.tcId}","${tc.module}","${tc.title.replace(/"/g, '""')}","${tc.priority}","${tc.preconditions.replace(/"/g, '""')}","${tc.steps.replace(/"/g, '""')}","${tc.data.replace(/"/g, '""')}","${tc.expected.replace(/"/g, '""')}","${tc.status}"\n`;
  });
  fs.writeFileSync(path.join(OUT_DIR, 'Test_Cases_Sheet.csv'), '\uFEFF' + tcCsv, 'utf8');

  // 3. Traceability_Matrix_Sheet.csv
  let rtmCsv = 'TR ID,Phân hệ,Tên Yêu Cầu,Đặc tả FR/NFR,Danh sách Test Cases,Tổng TC,PASS,FAIL,BLOCKED,Tỷ lệ PASS,Người phụ trách\n';
  NEW_TR_LIST.forEach((tr) => {
    const linkedTcs = FULL_200_TCS.filter((c) => c.trId === tr.id);
    const passCount = linkedTcs.filter((c) => c.status === 'Pass').length;
    const failCount = linkedTcs.filter((c) => c.status === 'Fail').length;
    const blockedCount = linkedTcs.filter((c) => c.status === 'Blocked').length;
    const passRate = linkedTcs.length > 0 ? ((passCount / linkedTcs.length) * 100).toFixed(1) + '%' : '100.0%';
    rtmCsv += `"${tr.id}","${tr.module}","${tr.title.replace(/"/g, '""')}","${tr.frId || 'FR-001'}","${linkedTcs.map((c) => c.tcId).join('; ')}",${linkedTcs.length},${passCount},${failCount},${blockedCount},"${passRate}","${tr.owner}"\n`;
  });
  fs.writeFileSync(path.join(OUT_DIR, 'Traceability_Matrix_Sheet.csv'), '\uFEFF' + rtmCsv, 'utf8');

  console.log('Exported 3 CSV files successfully.');
}

async function run() {
  await createTestingWorkbook(FILE_WORKBOOK);
  await createTestingWorkbook(FILE_TESTCASE);
  await exportCsvs();
  console.log('ALL WORKBOOKS AND CSVs CREATED SUCCESSFULLY!');
}

run().catch(console.error);
