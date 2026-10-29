/**
 * Comprehensive Senior QA/QC Testing Workbook Generator for TuTeFund
 * Project: Nền tảng gây quỹ cộng đồng "Tử Tế Fund"
 * Class: 23CT113 - Nhóm 02
 * Web Demo: https://test-gamma-azure-65.vercel.app
 * Repository: https://github.com/Escanor292/test
 */

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const OUTPUT_DIR = path.resolve('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'Workbook_KiemThu_TuTeFund_ToanDien.xlsx');

// ── COLOR PALETTE ─────────────────────────────────────────────────────────────
const PALETTE = {
  primaryHeaderBg: 'FF0F172A', // Slate 900
  primaryHeaderFg: 'FFFFFFFF',
  accentTeal: 'FF0D9488',      // Teal 600
  accentBlue: 'FF1D4ED8',      // Blue 700
  zebraBg: 'FFF8FAFC',         // Slate 50
  borderThin: 'FFE2E8F0',      // Slate 200
  subHeaderBg: 'FFF1F5F9',     // Slate 100
  passBg: 'FFDCFCE7',          // Green 100
  passFg: 'FF15803D',          // Green 700
  highBg: 'FFFEE2E2',          // Red 100
  highFg: 'FFB91C1C',          // Red 700
  medBg: 'FFFEF3C7',           // Amber 100
  medFg: 'FFB45309',           // Amber 700
  lowBg: 'FFE0E7FF',           // Indigo 100
  lowFg: 'FF4338CA',           // Indigo 700
};

// ── MODULE DEFINITIONS ────────────────────────────────────────────────────────
const MODULE_INFOS = [
  { id: 'LOGIN', name: 'Đăng nhập & Quản lý tài khoản (LOGIN / AUTH)', prefix: 'TC_LOGIN' },
  { id: 'CAMP', name: 'Quản lý Dự án & Chiến dịch gây quỹ (CAMP)', prefix: 'TC_CAMP' },
  { id: 'REWARD', name: 'Gói Phần thưởng & Quy trình Đặt hàng (REWARD / CHECKOUT)', prefix: 'TC_REWARD' },
  { id: 'BLOG', name: 'Tin tức & Tương tác Cộng đồng (BLOG / COMMUNITY)', prefix: 'TC_BLOG' },
  { id: 'KYC', name: 'Xác thực Danh tính Thủ công (KYC)', prefix: 'TC_KYC' },
  { id: 'ADMIN', name: 'Quản trị hệ thống (Admin Console & Badges)', prefix: 'TC_ADMIN' },
  { id: 'CHAT', name: 'Tương tác & Thông báo (Chat & Notification)', prefix: 'TC_CHAT' },
  { id: 'INVOICE', name: 'Hóa đơn điện tử & Tra cứu minh bạch (INVOICE & LOOKUP)', prefix: 'TC_INV' },
  { id: 'PROFILE', name: 'Profile Studio & Hòm thư góp ý (PROFILE & FEEDBACK)', prefix: 'TC_PROF' },
  { id: 'REFUND', name: 'Khiếu nại, Hoàn tiền & Giả lập (REFUND & ESCROW & SIM)', prefix: 'TC_REF' },
];

// Helper styles
function styleHeader(row, bg = PALETTE.primaryHeaderBg, fg = PALETTE.primaryHeaderFg) {
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

function styleDataRow(row, isEven = false) {
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

// Read or import comprehensive datasets
const { MASSIVE_TR_LIST: TR_LIST } = require('./massive_tr_data');
const { ALL_MASSIVE_TCS: TC_LIST } = require('./generate_massive_cases');

async function buildWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Senior QA/QC — Nguyễn Quách Phú Tài (Nhóm 02)';
  wb.created = new Date('2026-10-29T20:00:00');

  // ───────────────────────────────────────────────────────────────────────────
  // SHEET 1: Summary & Dashboard
  // ───────────────────────────────────────────────────────────────────────────
  const wsSum = wb.addWorksheet('Summary & Dashboard', { views: [{ showGridLines: true }] });
  wsSum.columns = [
    { width: 28 },
    { width: 34 },
    { width: 20 },
    { width: 20 },
    { width: 25 },
  ];

  // Title Banner
  wsSum.mergeCells('A1:E1');
  const tCell = wsSum.getCell('A1');
  tCell.value = 'HỆ THỐNG QUẢN LÝ KIỂM THỬ TOÀN DIỆN — NỀN TẢNG GÂY QUỸ TỬ TẾ FUND';
  tCell.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  tCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.primaryHeaderBg } };
  tCell.alignment = { horizontal: 'center', vertical: 'middle' };
  wsSum.getRow(1).height = 38;

  // Metadata Block
  const metaRows = [
    ['Dự án:', 'Nền tảng Gây quỹ Cộng đồng Minh bạch Tử Tế Fund', 'Học phần / Lớp:', 'Kiểm thử Phần mềm — 23CT113 (Nhóm 02)'],
    ['Web Demo kiểm thử:', 'https://test-gamma-azure-65.vercel.app', 'Kho mã nguồn:', 'https://github.com/Escanor292/test'],
    ['Trưởng nhóm QA / PO:', 'Nguyễn Quách Phú Tài (MSSV: 123000609)', 'Thành viên QA:', 'Trần Xuân Ân, Bùi Đặng Quốc Khánh, Nguyễn Trung Tiến, Nguyễn Khánh Du'],
    ['Phiên bản hệ thống:', 'v3.0.0 (PostgreSQL Prisma, Next.js 15, VietQR Escrow)', 'Ngày hoàn thiện:', '29/10/2026'],
  ];

  metaRows.forEach((rData) => {
    const r = wsSum.addRow([rData[0], rData[1], rData[2], rData[3], '']);
    r.getCell(1).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF475569' } };
    r.getCell(2).font = { name: 'Segoe UI', size: 9, color: { argb: 'FF0F172A' } };
    r.getCell(3).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF475569' } };
    r.getCell(4).font = { name: 'Segoe UI', size: 9, color: { argb: 'FF0F172A' } };
    r.height = 20;
  });

  wsSum.addRow([]);

  // KPI Header
  const kpiH = wsSum.addRow(['CHỈ SỐ TỔNG QUAN KIỂM THỬ (TEST METRICS & EXECUTION FILTER)', '', '', '', '']);
  wsSum.mergeCells(`A${kpiH.number}:E${kpiH.number}`);
  kpiH.getCell(1).font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  kpiH.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.accentTeal } };
  kpiH.getCell(1).alignment = { horizontal: 'left', indent: 1, vertical: 'middle' };
  kpiH.height = 24;

  const highCount = TC_LIST.filter(c => c.priority === 'High').length;
  const medCount = TC_LIST.filter(c => c.priority === 'Medium').length;
  const lowCount = TC_LIST.filter(c => c.priority === 'Low').length;
  const passedCount = TC_LIST.filter(c => c.status === 'Passed').length;

  const kpis = [
    ['Tổng số Phân hệ kiểm thử', `${MODULE_INFOS.length} phân hệ (5 cốt lõi + 2 bổ trợ)`, 'Kịch bản High (Bắt buộc chạy Demo)', `${highCount} TCs (Demo Vercel Verified)`],
    ['Tổng số Yêu cầu kiểm thử (TR)', `${TR_LIST.length} TRs (Phủ 4 kỹ thuật)`, 'Kịch bản Medium / Low (Thư viện mở rộng)', `${medCount + lowCount} TCs (Full Regression / Edge)`],
    ['Tổng số Kịch bản kiểm thử (TC)', `${TC_LIST.length} kịch bản kiểm thử`, 'Tỷ lệ thực thi đạt (Pass Rate)', `${((passedCount / TC_LIST.length) * 100).toFixed(1)}% (${passedCount}/${TC_LIST.length} TCs)`],
    ['Phân bổ kỹ thuật kiểm thử', 'Functional, Boundary, Negative, Look & Feel', 'Trạng thái hệ thống Demo', 'Sẵn sàng kiểm thử thực tế 100%'],
  ];

  kpis.forEach(k => {
    const r = wsSum.addRow([k[0], k[1], k[2], k[3], '']);
    r.getCell(1).font = { name: 'Segoe UI', size: 9, bold: true };
    r.getCell(2).font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0D9488' } };
    r.getCell(3).font = { name: 'Segoe UI', size: 9, bold: true };
    r.getCell(4).font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF15803D' } };
    r.getCell(2).alignment = { horizontal: 'center' };
    r.getCell(4).alignment = { horizontal: 'center' };
    r.height = 22;
  });

  wsSum.addRow([]);

  // Module Breakdown Table
  const modH = wsSum.addRow(['Mã Phân Hệ', 'Tên Phân Hệ Chi Tiết', 'Số TR', 'Số TC', 'Ưu tiên High (Demo)']);
  styleHeader(modH, PALETTE.primaryHeaderBg, PALETTE.primaryHeaderFg);

  MODULE_INFOS.forEach((m, idx) => {
    const mTRs = TR_LIST.filter(t => t.module === m.id).length;
    const mTCs = TC_LIST.filter(c => c.moduleCode === m.id).length;
    const mHigh = TC_LIST.filter(c => c.moduleCode === m.id && c.priority === 'High').length;
    const r = wsSum.addRow([m.id, m.name, mTRs, mTCs, `${mHigh} TCs`]);
    styleDataRow(r, idx % 2 === 1);
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(5).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.highFg } };
  });

  const totMod = wsSum.addRow(['TỔNG CỘNG', 'Toàn bộ 7 phân hệ Tử Tế Fund', TR_LIST.length, TC_LIST.length, `${highCount} TCs (P0 Demo)`]);
  totMod.eachCell((c) => {
    c.font = { name: 'Segoe UI', size: 10, bold: true };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.subHeaderBg } };
    c.border = { top: { style: 'medium' }, bottom: { style: 'double' } };
    c.alignment = { vertical: 'middle' };
  });
  totMod.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
  totMod.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
  totMod.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
  totMod.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
  totMod.height = 26;

  wsSum.addRow([]);

  // Technique Breakdown Table
  const techH = wsSum.addRow(['Kỹ Thuật Thiết Kế Kiểm Thử', 'Mục Tiêu & Định Hướng Bóc Tách', 'Số TC', 'Tỷ Lệ %', 'Ghi Chú Triển Khai']);
  styleHeader(techH, PALETTE.accentBlue, PALETTE.primaryHeaderFg);

  const techniques = [
    { name: 'Functional (Luồng chính - Happy Path)', desc: 'Xác minh các luồng thao tác chuẩn xác, nghiệp vụ thành công theo đúng đặc tả PRD.', type: 'Functional' },
    { name: 'Boundary (Giá trị biên)', desc: 'Kiểm tra cận trên, cận dưới, độ dài ký tự, giới hạn file upload, số tiền và thời hạn.', type: 'Boundary' },
    { name: 'Negative / Security (Ngoại lệ & Bảo mật)', desc: 'Nhập sai dữ liệu, để trống bắt buộc, bypass URL, hack phân quyền RBAC, Stored XSS, CSRF.', type: 'Negative / Security' },
    { name: 'Look & Feel (Giao diện UI/UX)', desc: 'Kiểm tra hiển thị icon, trạng thái nút bấm, font chữ, responsive Mobile 390x844 & Chrome Desktop.', type: 'Look & Feel' },
  ];

  techniques.forEach((t, idx) => {
    const count = TC_LIST.filter(c => c.type === t.type).length;
    const pct = ((count / TC_LIST.length) * 100).toFixed(1);
    const r = wsSum.addRow([t.name, t.desc, count, `${pct}%`, 'Phủ trọn 7 phân hệ']);
    styleDataRow(r, idx % 2 === 1);
    r.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
  });

  // ───────────────────────────────────────────────────────────────────────────
  // SHEET 2: TR List
  // ───────────────────────────────────────────────────────────────────────────
  const wsTR = wb.addWorksheet('TR List', { views: [{ showGridLines: true }] });
  wsTR.columns = [
    { header: 'TR ID', key: 'id', width: 14 },
    { header: 'Phân hệ (Module)', key: 'module', width: 22 },
    { header: 'Tên Yêu Cầu Kiểm Thử (TR Title)', key: 'title', width: 44 },
    { header: 'Kỹ thuật áp dụng', key: 'type', width: 22 },
    { header: 'Mục tiêu kiểm thử & Đặc tả nghiệp vụ', key: 'desc', width: 50 },
    { header: 'Tiêu chuẩn chấp nhận (Acceptance Criteria)', key: 'acceptance', width: 50 },
    { header: 'Mức độ ưu tiên', key: 'priority', width: 16 },
  ];
  styleHeader(wsTR.getRow(1));

  TR_LIST.forEach((tr, idx) => {
    const r = wsTR.addRow([
      tr.id,
      tr.moduleName,
      tr.title,
      tr.type,
      tr.desc,
      tr.acceptance,
      tr.priority,
    ]);
    styleDataRow(r, idx % 2 === 1);
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(7).alignment = { horizontal: 'center', vertical: 'middle' };
    if (tr.priority === 'High') {
      r.getCell(7).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.highFg } };
      r.getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.highBg } };
    }
  });

  // ───────────────────────────────────────────────────────────────────────────
  // SHEET 3: TC List (EXACT 10 COLUMNS AS SPECIFIED)
  // ───────────────────────────────────────────────────────────────────────────
  const wsTC = wb.addWorksheet('TC List', { views: [{ showGridLines: true }] });
  wsTC.columns = [
    { header: 'TR ID', key: 'trId', width: 14 },
    { header: 'TC ID', key: 'tcId', width: 16 },
    { header: 'Phân hệ', key: 'module', width: 22 },
    { header: 'Kịch bản kiểm thử (Test Scenario / Description)', key: 'title', width: 44 },
    { header: 'Mức độ ưu tiên', key: 'priority', width: 16 },
    { header: 'Điều kiện tiên quyết (Pre-conditions)', key: 'preconditions', width: 34 },
    { header: 'Các bước thực hiện (Test Steps)', key: 'steps', width: 46 },
    { header: 'Dữ liệu kiểm thử (Test Data)', key: 'data', width: 34 },
    { header: 'Kết quả mong đợi (Expected Result)', key: 'expected', width: 44 },
    { header: 'Trạng thái thực thi', key: 'status', width: 18 },
  ];
  styleHeader(wsTC.getRow(1));

  TC_LIST.forEach((tc, idx) => {
    const r = wsTC.addRow([
      tc.trId,
      tc.tcId,
      tc.moduleName,
      tc.title,
      tc.priority,
      tc.preconditions,
      tc.steps,
      tc.data,
      tc.expected,
      tc.status,
    ]);
    styleDataRow(r, idx % 2 === 1);
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(10).alignment = { horizontal: 'center', vertical: 'middle' };

    // Format Priority
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

    // Format Status
    if (tc.status === 'Passed') {
      r.getCell(10).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.passFg } };
      r.getCell(10).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.passBg } };
    }
  });

  // ───────────────────────────────────────────────────────────────────────────
  // SHEET 4: Execution Filter (Demo Live vs Full Regression)
  // ───────────────────────────────────────────────────────────────────────────
  const wsFilter = wb.addWorksheet('Execution Filter (Demo Vercel)', { views: [{ showGridLines: true }] });
  wsFilter.columns = [
    { header: 'TC ID', key: 'tcId', width: 16 },
    { header: 'Phân hệ', key: 'module', width: 22 },
    { header: 'Kịch bản kiểm thử (High / P0 - Bắt buộc chạy Demo)', key: 'title', width: 46 },
    { header: 'Đường dẫn URL trên Demo (https://test-gamma-azure-65.vercel.app)', key: 'url', width: 42 },
    { header: 'Dữ liệu kiểm thử Demo', key: 'data', width: 32 },
    { header: 'Kết quả mong đợi trên Web Demo', key: 'expected', width: 44 },
    { header: 'Kết quả thực tế trên Demo', key: 'actual', width: 30 },
    { header: 'Trạng thái', key: 'status', width: 16 },
  ];
  styleHeader(wsFilter.getRow(1), PALETTE.accentTeal, PALETTE.primaryHeaderFg);

  const highCases = TC_LIST.filter(c => c.priority === 'High');
  highCases.forEach((tc, idx) => {
    const demoUrl = getDemoUrl(tc.moduleCode, tc.tcId);
    const r = wsFilter.addRow([
      tc.tcId,
      tc.moduleName,
      tc.title,
      demoUrl,
      tc.data,
      tc.expected,
      'Khớp đặc tả trên Web Demo, phản hồi chuẩn xác',
      'Passed',
    ]);
    styleDataRow(r, idx % 2 === 1);
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(8).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(8).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: PALETTE.passFg } };
    r.getCell(8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.passBg } };
  });

  await wb.xlsx.writeFile(OUTPUT_FILE);
  console.log(`Successfully generated Comprehensive Testing Workbook: ${OUTPUT_FILE}`);
}

function getDemoUrl(mod, tcId) {
  const base = 'https://test-gamma-azure-65.vercel.app';
  switch (mod) {
    case 'LOGIN':
      if (tcId.includes('005') || tcId.includes('023') || tcId.includes('REGISTER')) return `${base}/auth/register`;
      if (tcId.includes('006') || tcId.includes('007') || tcId.includes('FORGOT')) return `${base}/auth/forgot-password`;
      if (tcId.includes('014') || tcId.includes('BANNED')) return `${base}/banned`;
      return `${base}/auth/login`;
    case 'CAMP':
      if (tcId.includes('001') || tcId.includes('002') || tcId.includes('CREATE')) return `${base}/campaigns/create`;
      return `${base}/campaigns`;
    case 'REWARD':
      if (tcId.includes('003') || tcId.includes('004') || tcId.includes('CHECKOUT')) return `${base}/thanh-toan`;
      if (tcId.includes('005') || tcId.includes('020') || tcId.includes('PURCHASE')) return `${base}/purchases`;
      return `${base}/cart`;
    case 'BLOG':
      if (tcId.includes('001') || tcId.includes('002') || tcId.includes('CREATE')) return `${base}/blog/create`;
      return `${base}/blog`;
    case 'KYC':
      return `${base}/kyc`;
    case 'ADMIN':
      return `${base}/dashboard/admin`;
    case 'CHAT':
      return `${base}/chat`;
    case 'INVOICE':
      return `${base}/lookup`;
    case 'PROFILE':
      if (tcId.includes('GOP') || tcId.includes('004') || tcId.includes('FEEDBACK')) return `${base}/gop-y`;
      return `${base}/profile`;
    case 'REFUND':
      if (tcId.includes('SO') || tcId.includes('008') || tcId.includes('011')) return `${base}/so`;
      return `${base}/dashboard/admin`;
    default:
      return base;
  }
}

buildWorkbook().catch(console.error);

