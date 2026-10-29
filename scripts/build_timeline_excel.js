const ExcelJS = require('exceljs');
const path = require('path');

async function buildTimelineExcel() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Nguyễn Quách Phú Tài (123000609) - Test Lead';
  wb.lastModifiedBy = 'Bùi Đặng Quốc Khánh - Thư ký nhóm';
  wb.created = new Date('2026-10-12T08:00:00Z');
  wb.modified = new Date('2026-10-29T18:30:00Z');

  // Palette
  const NAVY = '1E3A8A';
  const BLUE_HEADER = '2563EB';
  const BLUE_ROW_ALT = 'F8FAFC';
  const GRAY_HEADER = '334155';
  const GRAY_LIGHT = 'F1F5F9';
  const GREEN_DONE = '10B981';
  const GREEN_LIGHT = 'D1FAE5';
  const BORDER_COLOR = 'CBD5E1';
  const BORDER_DARK = '94A3B8';

  const thinBorder = {
    top: { style: 'thin', color: { argb: BORDER_COLOR } },
    left: { style: 'thin', color: { argb: BORDER_COLOR } },
    bottom: { style: 'thin', color: { argb: BORDER_COLOR } },
    right: { style: 'thin', color: { argb: BORDER_COLOR } }
  };

  const headerBorder = {
    top: { style: 'medium', color: { argb: BORDER_DARK } },
    left: { style: 'thin', color: { argb: BORDER_DARK } },
    bottom: { style: 'medium', color: { argb: BORDER_DARK } },
    right: { style: 'thin', color: { argb: BORDER_DARK } }
  };

  // =========================================================================
  // SHEET 1: BIỂU ĐỒ GANTT (GANTT CHART THEO ĐÚNG LỊCH TRÌNH ẢNH)
  // =========================================================================
  const wsGantt = wb.addWorksheet('Biểu đồ Gantt', {
    views: [{ showGridLines: true }]
  });

  // Title Banner
  wsGantt.mergeCells('B2:AD2');
  const titleCell = wsGantt.getCell('B2');
  titleCell.value = 'KẾ HOẠCH TIẾN ĐỘ THỰC HIỆN DỰ ÁN & BIỂU ĐỒ GANTT (WBS)';
  titleCell.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFF' } };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  wsGantt.getRow(2).height = 42;

  // Project Info Table
  const projectInfo = [
    ['TRƯỜNG ĐÀO TẠO:', 'Trường Đại học Lạc Hồng (LHU) — Khoa Công nghệ Thông tin', '', 'GIÁO VIÊN BỘ MÔN:', 'Nguyễn Minh Phúc'],
    ['MÔN HỌC:', 'Kiểm thử và đảm bảo chất lượng phần mềm', '', 'MÃ LỚP – NHÓM:', '23CT113 – Nhóm 02'],
    ['TÊN DỰ ÁN:', 'Nền tảng gây quỹ cộng đồng Tử Tế Fund (TuTeFund)', '', 'THỜI GIAN THỰC HIỆN:', '12/10/2026 – 01/11/2026 (3 tuần)'],
    ['QUẢN LÝ DỰ ÁN (LEAD):', 'Nguyễn Quách Phú Tài (MSSV: 123000609)', '', 'THƯ KÝ NHÓM:', 'Bùi Đặng Quốc Khánh'],
    ['MÔI TRƯỜNG KIỂM THỬ:', 'Local (localhost:3000) & Deploy (test-gamma-azure-65.vercel.app)', '', 'TIẾN ĐỘ HOÀN THÀNH:', '100% Hoàn thành (Completed)']
  ];

  projectInfo.forEach((info, idx) => {
    const rowIdx = 4 + idx;
    wsGantt.getRow(rowIdx).height = 22;

    wsGantt.mergeCells(`B${rowIdx}:D${rowIdx}`);
    const lbl1 = wsGantt.getCell(`B${rowIdx}`);
    lbl1.value = info[0];
    lbl1.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: GRAY_HEADER } };
    lbl1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_LIGHT } };
    lbl1.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    lbl1.border = thinBorder;

    wsGantt.mergeCells(`E${rowIdx}:H${rowIdx}`);
    const val1 = wsGantt.getCell(`E${rowIdx}`);
    val1.value = info[1];
    val1.font = { name: 'Segoe UI', size: 9, bold: (idx === 0 || idx === 1), color: { argb: '0F172A' } };
    val1.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    val1.border = thinBorder;

    wsGantt.mergeCells(`I${rowIdx}:K${rowIdx}`);
    const lbl2 = wsGantt.getCell(`I${rowIdx}`);
    lbl2.value = info[3];
    lbl2.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: GRAY_HEADER } };
    lbl2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_LIGHT } };
    lbl2.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    lbl2.border = thinBorder;

    wsGantt.mergeCells(`L${rowIdx}:R${rowIdx}`);
    const val2 = wsGantt.getCell(`L${rowIdx}`);
    val2.value = info[4];
    val2.font = { name: 'Segoe UI', size: 9, bold: (idx === 4 || idx === 0), color: (idx === 4 ? { argb: '047857' } : { argb: '0F172A' }) };
    val2.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    val2.border = thinBorder;
  });

  // Table Headers
  const headerRow10 = wsGantt.getRow(10);
  const headerRow11 = wsGantt.getRow(11);
  const headerRow12 = wsGantt.getRow(12);
  headerRow10.height = 24;
  headerRow11.height = 20;
  headerRow12.height = 22;

  const baseCols = [
    { col: 'B', label: 'WBS', width: 8 },
    { col: 'C', label: 'HẠNG MỤC CÔNG VIỆC (TASK DESCRIPTION)', width: 42 },
    { col: 'D', label: 'NGƯỜI PHỤ TRÁCH', width: 22 },
    { col: 'E', label: 'NGÀY BẮT ĐẦU', width: 13 },
    { col: 'F', label: 'NGÀY KẾT THÚC', width: 13 },
    { col: 'G', label: 'SỐ NGÀY', width: 10 },
    { col: 'H', label: '% HOÀN THÀNH', width: 14 },
    { col: 'I', label: 'TRẠNG THÁI', width: 14 }
  ];

  baseCols.forEach(c => {
    wsGantt.mergeCells(`${c.col}10:${c.col}12`);
    const cell = wsGantt.getCell(`${c.col}10`);
    cell.value = c.label;
    cell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BLUE_HEADER } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = headerBorder;
    wsGantt.getColumn(c.col).width = c.width;
  });

  // 21 Days Timeline Columns: J to AD
  const timelineDates = [
    // Tuần 1: 12/10 - 18/10
    { day: '12/10', dow: 'T2', col: 'J' },
    { day: '13/10', dow: 'T3', col: 'K' },
    { day: '14/10', dow: 'T4', col: 'L' },
    { day: '15/10', dow: 'T5', col: 'M' },
    { day: '16/10', dow: 'T6', col: 'N' },
    { day: '17/10', dow: 'T7', col: 'O' },
    { day: '18/10', dow: 'CN', col: 'P' },

    // Tuần 2: 19/10 - 25/10
    { day: '19/10', dow: 'T2', col: 'Q' },
    { day: '20/10', dow: 'T3', col: 'R' },
    { day: '21/10', dow: 'T4', col: 'S' },
    { day: '22/10', dow: 'T5', col: 'T' },
    { day: '23/10', dow: 'T6', col: 'U' },
    { day: '24/10', dow: 'T7', col: 'V' },
    { day: '25/10', dow: 'CN', col: 'W' },

    // Tuần 3: 26/10 - 01/11
    { day: '26/10', dow: 'T2', col: 'X' },
    { day: '27/10', dow: 'T3', col: 'Y' },
    { day: '28/10', dow: 'T4', col: 'Z' },
    { day: '29/10', dow: 'T5', col: 'AA' },
    { day: '30/10', dow: 'T6', col: 'AB' },
    { day: '31/10', dow: 'T7', col: 'AC' },
    { day: '01/11', dow: 'CN', col: 'AD' }
  ];

  // Week Group Headers
  const weeks = [
    { start: 'J', end: 'P', label: 'TUẦN 1 (12/10 – 18/10/2026)' },
    { start: 'Q', end: 'W', label: 'TUẦN 2 (19/10 – 25/10/2026)' },
    { start: 'X', end: 'AD', label: 'TUẦN 3 (26/10 – 01/11/2026)' }
  ];

  weeks.forEach(w => {
    wsGantt.mergeCells(`${w.start}10:${w.end}10`);
    const c = wsGantt.getCell(`${w.start}10`);
    c.value = w.label;
    c.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };
    c.alignment = { horizontal: 'center', vertical: 'middle' };
    c.border = headerBorder;
  });

  timelineDates.forEach(td => {
    const c11 = wsGantt.getCell(`${td.col}11`);
    c11.value = td.dow;
    c11.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: '475569' } };
    c11.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E2E8F0' } };
    c11.alignment = { horizontal: 'center', vertical: 'middle' };
    c11.border = thinBorder;

    const c12 = wsGantt.getCell(`${td.col}12`);
    c12.value = td.day;
    c12.font = { name: 'Segoe UI', size: 8, bold: false, color: { argb: '1E293B' } };
    c12.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8FAFC' } };
    c12.alignment = { horizontal: 'center', vertical: 'middle' };
    c12.border = thinBorder;

    wsGantt.getColumn(td.col).width = 5.4;
  });

  // Tasks following the exact schedule from the user's uploaded image
  const tasks = [
    // TUẦN 1 (12/10 – 18/10)
    {
      isPhase: true,
      wbs: '1.0',
      title: 'TUẦN 1: KHỞI ĐỘNG DỰ ÁN, THIẾT KẾ YÊU CẦU & KỊCH BẢN KIỂM THỬ',
      owner: 'Cả nhóm / Test Lead',
      start: '12/10/2026',
      end: '18/10/2026',
      duration: 7,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'J',
      barEnd: 'P',
      barColor: '3B82F6'
    },
    {
      wbs: '1.1',
      title: 'Khảo sát dự án, phân tích PRD 2.0.0 (29 REQs) & Lập Test Plan',
      owner: 'Nguyễn Quách Phú Tài',
      start: '12/10/2026',
      end: '13/10/2026',
      duration: 2,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'J',
      barEnd: 'K',
      barColor: '60A5FA'
    },
    {
      wbs: '1.2',
      title: 'Họp nhóm Lần 1: Thống nhất phân công 5 module, quy chuẩn mã ID',
      owner: 'Cả nhóm (Thư ký: Khánh)',
      start: '13/10/2026',
      end: '13/10/2026',
      duration: 1,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'K',
      barEnd: 'K',
      barColor: 'F59E0B'
    },
    {
      wbs: '1.3',
      title: 'Thiết kế 33 Test Requirements (TR) & 75 Test Cases cho 5 phân hệ',
      owner: 'Tài, Khánh, Tiến, Ân, Du',
      start: '14/10/2026',
      end: '16/10/2026',
      duration: 3,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'L',
      barEnd: 'N',
      barColor: '60A5FA'
    },
    {
      wbs: '1.4',
      title: 'Xây dựng Ma trận truy vết (RTM 2 chiều), rà soát chéo test case',
      owner: 'Nguyễn Quách Phú Tài',
      start: '17/10/2026',
      end: '17/10/2026',
      duration: 1,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'O',
      barEnd: 'O',
      barColor: '60A5FA'
    },

    // TUẦN 2 (19/10 – 25/10)
    {
      isPhase: true,
      wbs: '2.0',
      title: 'TUẦN 2: THỰC THI KIỂM THỬ, GHI NHẬN LỖI (BUG LOG) & TỰ ĐỘNG HÓA',
      owner: 'Cả nhóm (5 thành viên)',
      start: '19/10/2026',
      end: '25/10/2026',
      duration: 7,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'Q',
      barEnd: 'W',
      barColor: '3B82F6'
    },
    {
      wbs: '2.1',
      title: 'Thực thi kiểm thử thủ công Vòng 1 & Vòng 2 (Local & Deploy Vercel)',
      owner: 'Tài, Khánh, Tiến, Ân, Du',
      start: '19/10/2026',
      end: '22/10/2026',
      duration: 4,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'Q',
      barEnd: 'T',
      barColor: '60A5FA'
    },
    {
      wbs: '2.2',
      title: 'Phân loại lỗi, ghi nhận danh mục Defect / Bug Log (BUG-001..008)',
      owner: 'Bùi Đặng Quốc Khánh',
      start: '19/10/2026',
      end: '22/10/2026',
      duration: 4,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'Q',
      barEnd: 'T',
      barColor: 'EF4444'
    },
    {
      wbs: '2.3',
      title: 'Thực thi kiểm thử tự động Jest & Playwright E2E; Retest các lỗi đã vá',
      owner: 'Nguyễn Quách Phú Tài',
      start: '23/10/2026',
      end: '24/10/2026',
      duration: 2,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'U',
      barEnd: 'V',
      barColor: '60A5FA'
    },
    {
      wbs: '2.4',
      title: 'Họp nhóm Lần 2: Đánh giá kết quả kiểm thử, rà soát tỷ lệ Pass/Fail',
      owner: 'Cả nhóm (Thư ký: Khánh)',
      start: '25/10/2026',
      end: '25/10/2026',
      duration: 1,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'W',
      barEnd: 'W',
      barColor: 'F59E0B'
    },

    // TUẦN 3 (26/10 – 01/11)
    {
      isPhase: true,
      wbs: '3.0',
      title: 'TUẦN 3: TỔNG HỢP BÁO CÁO CUỐI KỲ, LÀM SLIDE & NGHIỆM THU ĐỒ ÁN',
      owner: 'Cả nhóm / Test Lead',
      start: '26/10/2026',
      end: '01/11/2026',
      duration: 7,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'X',
      barEnd: 'AD',
      barColor: '3B82F6'
    },
    {
      wbs: '3.1',
      title: 'Họp nhóm Lần 3: Tổng kết số liệu, thống nhất đánh giá 20% đóng góp',
      owner: 'Cả nhóm (Thư ký: Khánh)',
      start: '26/10/2026',
      end: '28/10/2026',
      duration: 3,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'X',
      barEnd: 'Z',
      barColor: 'F59E0B'
    },
    {
      wbs: '3.2',
      title: 'Soạn thảo Báo cáo kết quả kiểm thử cuối kỳ (Word Final Report 8 chương)',
      owner: 'Nguyễn Quách Phú Tài',
      start: '27/10/2026',
      end: '29/10/2026',
      duration: 3,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'Y',
      barEnd: 'AA',
      barColor: '60A5FA'
    },
    {
      wbs: '3.3',
      title: 'Thiết kế Slide thuyết trình PowerPoint bảo vệ đồ án nhóm',
      owner: 'Bùi Đặng Quốc Khánh, Nguyễn Trung Tiến',
      start: '29/10/2026',
      end: '29/10/2026',
      duration: 1,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'AA',
      barEnd: 'AA',
      barColor: '60A5FA'
    },
    {
      wbs: '3.4',
      title: 'Rà soát tính nhất quán số liệu toàn bộ tài liệu (Excel ↔ Word ↔ PPT)',
      owner: 'Nguyễn Quách Phú Tài',
      start: '30/10/2026',
      end: '30/10/2026',
      duration: 1,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'AB',
      barEnd: 'AB',
      barColor: '60A5FA'
    },
    {
      wbs: '3.5',
      title: 'Đóng gói toàn bộ hồ sơ 23CT113_Nhom02 và hoàn tất nộp bài cuối kỳ',
      owner: 'Cả nhóm (5 thành viên)',
      start: '01/11/2026',
      end: '01/11/2026',
      duration: 1,
      progress: 1.0,
      status: 'Hoàn thành',
      barStart: 'AD',
      barEnd: 'AD',
      barColor: '10B981'
    }
  ];

  function colToIndex(c) {
    let index = 0;
    for (let i = 0; i < c.length; i++) {
      index = index * 26 + (c.charCodeAt(i) - 64);
    }
    return index;
  }

  let currentExcelRow = 13;

  tasks.forEach((t, idx) => {
    const row = wsGantt.getRow(currentExcelRow);
    row.height = t.isPhase ? 24 : 20;

    const isPhase = t.isPhase;

    // Col B: WBS
    const cellB = row.getCell('B');
    cellB.value = t.wbs;
    cellB.font = { name: 'Segoe UI', size: 9, bold: isPhase, color: isPhase ? { argb: 'FFFFFF' } : { argb: '1E293B' } };
    cellB.alignment = { horizontal: 'center', vertical: 'middle' };
    cellB.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isPhase ? NAVY : (idx % 2 === 0 ? 'FFFFFF' : BLUE_ROW_ALT) } };
    cellB.border = thinBorder;

    // Col C: Task Description
    const cellC = row.getCell('C');
    cellC.value = t.title;
    cellC.font = { name: 'Segoe UI', size: 9, bold: isPhase, color: isPhase ? { argb: 'FFFFFF' } : { argb: '0F172A' } };
    cellC.alignment = { horizontal: 'left', vertical: 'middle', indent: isPhase ? 1 : 2 };
    cellC.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isPhase ? NAVY : (idx % 2 === 0 ? 'FFFFFF' : BLUE_ROW_ALT) } };
    cellC.border = thinBorder;

    // Col D: Owner
    const cellD = row.getCell('D');
    cellD.value = t.owner;
    cellD.font = { name: 'Segoe UI', size: 9, bold: isPhase, color: isPhase ? { argb: 'FFFFFF' } : { argb: '334155' } };
    cellD.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    cellD.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isPhase ? NAVY : (idx % 2 === 0 ? 'FFFFFF' : BLUE_ROW_ALT) } };
    cellD.border = thinBorder;

    // Col E: Start Date
    const cellE = row.getCell('E');
    cellE.value = t.start;
    cellE.font = { name: 'Segoe UI', size: 9, bold: isPhase, color: isPhase ? { argb: 'FFFFFF' } : { argb: '334155' } };
    cellE.alignment = { horizontal: 'center', vertical: 'middle' };
    cellE.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isPhase ? NAVY : (idx % 2 === 0 ? 'FFFFFF' : BLUE_ROW_ALT) } };
    cellE.border = thinBorder;

    // Col F: End Date
    const cellF = row.getCell('F');
    cellF.value = t.end;
    cellF.font = { name: 'Segoe UI', size: 9, bold: isPhase, color: isPhase ? { argb: 'FFFFFF' } : { argb: '334155' } };
    cellF.alignment = { horizontal: 'center', vertical: 'middle' };
    cellF.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isPhase ? NAVY : (idx % 2 === 0 ? 'FFFFFF' : BLUE_ROW_ALT) } };
    cellF.border = thinBorder;

    // Col G: Duration
    const cellG = row.getCell('G');
    cellG.value = t.duration;
    cellG.numFmt = '#,##0" ngày"';
    cellG.font = { name: 'Segoe UI', size: 9, bold: isPhase, color: isPhase ? { argb: 'FFFFFF' } : { argb: '334155' } };
    cellG.alignment = { horizontal: 'center', vertical: 'middle' };
    cellG.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isPhase ? NAVY : (idx % 2 === 0 ? 'FFFFFF' : BLUE_ROW_ALT) } };
    cellG.border = thinBorder;

    // Col H: Progress
    const cellH = row.getCell('H');
    cellH.value = t.progress;
    cellH.numFmt = '0%';
    cellH.font = { name: 'Segoe UI', size: 9, bold: true, color: isPhase ? { argb: 'FFFFFF' } : { argb: '047857' } };
    cellH.alignment = { horizontal: 'center', vertical: 'middle' };
    cellH.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isPhase ? NAVY : GREEN_LIGHT } };
    cellH.border = thinBorder;

    // Col I: Status
    const cellI = row.getCell('I');
    cellI.value = t.status;
    cellI.font = { name: 'Segoe UI', size: 9, bold: true, color: isPhase ? { argb: 'FFFFFF' } : { argb: '047857' } };
    cellI.alignment = { horizontal: 'center', vertical: 'middle' };
    cellI.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isPhase ? NAVY : GREEN_LIGHT } };
    cellI.border = thinBorder;

    // Gantt Bar Columns: J to AD
    const startIdx = colToIndex(t.barStart);
    const endIdx = colToIndex(t.barEnd);

    timelineDates.forEach(td => {
      const colIdx = colToIndex(td.col);
      const cellDate = row.getCell(td.col);
      cellDate.border = thinBorder;

      if (colIdx >= startIdx && colIdx <= endIdx) {
        cellDate.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: isPhase ? '2563EB' : t.barColor }
        };
      } else {
        cellDate.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: isPhase ? 'F1F5F9' : (idx % 2 === 0 ? 'FFFFFF' : 'F8FAFC') }
        };
      }
    });

    currentExcelRow++;
  });

  // Footer Summary / Legend
  currentExcelRow += 2;
  wsGantt.mergeCells(`B${currentExcelRow}:H${currentExcelRow}`);
  const legendTitle = wsGantt.getCell(`B${currentExcelRow}`);
  legendTitle.value = 'CHÚ THÍCH MÀU SẮC BIỂU ĐỒ GANTT:';
  legendTitle.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: GRAY_HEADER } };

  currentExcelRow++;
  const legends = [
    { label: 'Thanh tiến độ Giai đoạn (Tuần 1, 2, 3): Xanh dương đậm (#2563EB)', color: '2563EB' },
    { label: 'Công việc kỹ thuật / Phân tích / Thiết kế / Test Case: Xanh dương sáng (#60A5FA)', color: '60A5FA' },
    { label: 'Các mốc Họp nhóm chính thức (Lần 1: 13/10, Lần 2: 25/10, Lần 3: 26-28/10): Màu cam vàng (#F59E0B)', color: 'F59E0B' },
    { label: 'Ghi nhận lỗi & Phân tích Defect / Bug Log: Màu đỏ cảnh báo (#EF4444)', color: 'EF4444' },
    { label: 'Hoàn thành hồ sơ, Nghiệm thu & Nộp bài cuối kỳ (01/11): Màu xanh lá cây (#10B981)', color: '10B981' }
  ];

  legends.forEach(lg => {
    const row = wsGantt.getRow(currentExcelRow);
    row.height = 18;
    const cColor = row.getCell('B');
    cColor.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: lg.color } };
    cColor.border = thinBorder;

    wsGantt.mergeCells(`C${currentExcelRow}:N${currentExcelRow}`);
    const cText = row.getCell('C');
    cText.value = lg.label;
    cText.font = { name: 'Segoe UI', size: 8, color: { argb: '334155' } };
    cText.alignment = { vertical: 'middle', indent: 1 };
    currentExcelRow++;
  });

  // =========================================================================
  // SHEET 2: ĐÁNH GIÁ THÀNH VIÊN & ĐÓNG GÓP (% CONTRIBUTION)
  // =========================================================================
  const wsContrib = wb.addWorksheet('Đánh giá thành viên & Đóng góp', {
    views: [{ showGridLines: true }]
  });

  wsContrib.mergeCells('B2:K2');
  const contribTitle = wsContrib.getCell('B2');
  contribTitle.value = 'TRƯỜNG ĐẠI HỌC LẠC HỒNG — BẢNG PHÂN CÔNG & ĐÁNH GIÁ ĐÓNG GÓP THÀNH VIÊN';
  contribTitle.font = { name: 'Segoe UI', size: 15, bold: true, color: { argb: 'FFFFFF' } };
  contribTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  contribTitle.alignment = { horizontal: 'center', vertical: 'middle' };
  wsContrib.getRow(2).height = 38;

  wsContrib.mergeCells('B3:K3');
  const contribSub = wsContrib.getCell('B3');
  contribSub.value = 'Môn: Kiểm thử và đảm bảo chất lượng phần mềm — GVBM: Nguyễn Minh Phúc — Nhóm 02 — Lớp 23CT113';
  contribSub.font = { name: 'Segoe UI', size: 10, italic: true, color: { argb: '475569' } };
  contribSub.alignment = { horizontal: 'center', vertical: 'middle' };
  wsContrib.getRow(3).height = 22;

  const contribHeaders = [
    { col: 'B', label: 'STT', width: 6 },
    { col: 'C', label: 'HỌ VÀ TÊN', width: 24 },
    { col: 'D', label: 'MSSV', width: 14 },
    { col: 'E', label: 'VAI TRÒ TRONG NHÓM', width: 22 },
    { col: 'F', label: 'MODULE / NHIỆM VỤ CHÍNH PHỤ TRÁCH', width: 44 },
    { col: 'G', label: 'SỐ TEST CASE', width: 14 },
    { col: 'H', label: '% ĐÓNG GÓP', width: 14 },
    { col: 'I', label: 'ĐIỂM NỘI BỘ (100)', width: 16 },
    { col: 'J', label: 'XẾP LOẠI', width: 12 },
    { col: 'K', label: 'CHỮ KÝ XÁC NHẬN', width: 18 }
  ];

  const headerRow5 = wsContrib.getRow(5);
  headerRow5.height = 28;

  contribHeaders.forEach(ch => {
    const c = wsContrib.getCell(`${ch.col}5`);
    c.value = ch.label;
    c.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BLUE_HEADER } };
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    c.border = headerBorder;
    wsContrib.getColumn(ch.col).width = ch.width;
  });

  const members = [
    {
      stt: 1,
      name: 'Nguyễn Quách Phú Tài',
      mssv: '123000609',
      role: 'Trưởng nhóm / Test Lead',
      task: 'Quản lý dự án, biên soạn Test Plan v3, thiết kế & chạy 10 TC Login/Auth, viết script kiểm thử tự động Jest/Playwright, dựng RTM, tổng hợp Test Report & hoàn thiện hồ sơ',
      tcCount: '10 TC + Auto',
      pct: 0.20,
      score: 100,
      grade: 'Xuất sắc (A+)',
      sign: 'Đã xác nhận'
    },
    {
      stt: 2,
      name: 'Bùi Đặng Quốc Khánh',
      mssv: '123000xxx',
      role: 'Thư ký nhóm / Defect Lead',
      task: 'Ghi biên bản họp nhóm (Lần 1, 2, 3), phân tích & thiết kế 10 TC Module Reward, quản lý danh sách lỗi (Bug Log), thực thi kiểm thử và retest, phụ trách slide PowerPoint',
      tcCount: '10 TC + Bug Log',
      pct: 0.20,
      score: 98,
      grade: 'Xuất sắc (A)',
      sign: 'Đã xác nhận'
    },
    {
      stt: 3,
      name: 'Nguyễn Trung Tiến',
      mssv: '123000xxx',
      role: 'Thành viên / Doc Specialist',
      task: 'Phân tích & thiết kế 10 TC Module Blog, thực thi kiểm thử chức năng bài viết/bình luận, phối hợp soạn thảo báo cáo Word 8 chương theo chuẩn Final_Report_Guidelines',
      tcCount: '10 TC + Report',
      pct: 0.20,
      score: 98,
      grade: 'Xuất sắc (A)',
      sign: 'Đã xác nhận'
    },
    {
      stt: 4,
      name: 'Trần Xuân Ân',
      mssv: '123000xxx',
      role: 'Thành viên / Module Lead',
      task: 'Phân tích & thiết kế 12 TC Module Campaign, thực thi kiểm thử luồng tạo chiến dịch, gửi duyệt, rút hồ sơ và quyền admin phê duyệt chiến dịch, rà soát logic biên',
      tcCount: '12 TC',
      pct: 0.20,
      score: 98,
      grade: 'Xuất sắc (A)',
      sign: 'Đã xác nhận'
    },
    {
      stt: 5,
      name: 'Nguyễn Khánh Du',
      mssv: '123000xxx',
      role: 'Thành viên / Module Lead',
      task: 'Phân tích & thiết kế 12 TC Module KYC, thực thi kiểm thử xác thực căn cước cá nhân/tổ chức, kiểm thử dữ liệu biên tải ảnh và quyền admin phê duyệt KYC',
      tcCount: '12 TC',
      pct: 0.20,
      score: 98,
      grade: 'Xuất sắc (A)',
      sign: 'Đã xác nhận'
    }
  ];

  let cRow = 6;
  members.forEach(m => {
    const row = wsContrib.getRow(cRow);
    row.height = 36;

    const cells = [
      { col: 'B', val: m.stt, align: 'center' },
      { col: 'C', val: m.name, align: 'left', bold: true },
      { col: 'D', val: m.mssv, align: 'center' },
      { col: 'E', val: m.role, align: 'left' },
      { col: 'F', val: m.task, align: 'left', wrap: true },
      { col: 'G', val: m.tcCount, align: 'center' },
      { col: 'H', val: m.pct, align: 'center', numFmt: '0.0%', bold: true },
      { col: 'I', val: m.score, align: 'center', bold: true },
      { col: 'J', val: m.grade, align: 'center', bold: true },
      { col: 'K', val: m.sign, align: 'center', italic: true }
    ];

    cells.forEach(c => {
      const cell = row.getCell(c.col);
      cell.value = c.val;
      cell.font = { name: 'Segoe UI', size: 9, bold: !!c.bold, italic: !!c.italic, color: { argb: '0F172A' } };
      cell.alignment = { horizontal: c.align, vertical: 'middle', wrapText: !!c.wrap, indent: c.align === 'left' ? 1 : 0 };
      cell.border = thinBorder;
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: (m.stt % 2 === 0 ? BLUE_ROW_ALT : 'FFFFFF') } };
    });

    cRow++;
  });

  // Total Row
  const totalRow = wsContrib.getRow(cRow);
  totalRow.height = 26;
  wsContrib.mergeCells(`B${cRow}:F${cRow}`);
  const totCell = totalRow.getCell('B');
  totCell.value = 'TỔNG CỘNG:';
  totCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
  totCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  totCell.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
  totCell.border = thinBorder;

  const sumTC = totalRow.getCell('G');
  sumTC.value = '54 TC (75 TC v3)';
  sumTC.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
  sumTC.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  sumTC.alignment = { horizontal: 'center', vertical: 'middle' };
  sumTC.border = thinBorder;

  const sumPct = totalRow.getCell('H');
  sumPct.value = { formula: 'SUM(H6:H10)', result: 1.0 };
  sumPct.numFmt = '0.0%';
  sumPct.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
  sumPct.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  sumPct.alignment = { horizontal: 'center', vertical: 'middle' };
  sumPct.border = thinBorder;

  const avgScore = totalRow.getCell('I');
  avgScore.value = { formula: 'AVERAGE(I6:I10)', result: 98.4 };
  avgScore.numFmt = '0.0';
  avgScore.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
  avgScore.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  avgScore.alignment = { horizontal: 'center', vertical: 'middle' };
  avgScore.border = thinBorder;

  wsContrib.mergeCells(`J${cRow}:K${cRow}`);
  const gradeTot = totalRow.getCell('J');
  gradeTot.value = '100% Hoàn thành tốt';
  gradeTot.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
  gradeTot.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  gradeTot.alignment = { horizontal: 'center', vertical: 'middle' };
  gradeTot.border = thinBorder;

  cRow += 3;

  // Criteria Table
  wsContrib.mergeCells(`B${cRow}:K${cRow}`);
  const critHeader = wsContrib.getCell(`B${cRow}`);
  critHeader.value = 'QUY CHUẨN TIÊU CHÍ ĐÁNH GIÁ NỘI BỘ NHÓM (THANG ĐIỂM 100)';
  critHeader.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  critHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };
  critHeader.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  wsContrib.getRow(cRow).height = 26;
  cRow++;

  const criteriaList = [
    ['TC1: Chuyên cần & Kỷ luật', 'Tham dự đầy đủ 3 buổi họp nhóm, đúng giờ, có đóng góp ý kiến xây dựng tích cực', '20 điểm'],
    ['TC2: Chất lượng Test Case & Tài liệu', 'Kịch bản kiểm thử rõ ràng, đầy đủ Pre-conditions, Test Data, Expected Result, bao phủ luồng Positive và Negative', '20 điểm'],
    ['TC3: Tiến độ & Đúng hạn (Deadline)', 'Hoàn thành các mốc WBS đúng thời hạn trong Timeline (Tuần 1, 2, 3), không để chậm trễ', '20 điểm'],
    ['TC4: Khối lượng công việc & Trách nhiệm', 'Đảm bảo phụ trách trọn vẹn module được giao, ghi nhận bug chi tiết, hỗ trợ các thành viên khác khi cần', '20 điểm'],
    ['TC5: Tinh thần hợp tác & Thái độ làm việc', 'Tôn trọng ý kiến tập thể, phối hợp nhịp nhàng, cầu thị trong việc sửa lỗi và chuẩn hóa báo cáo', '20 điểm']
  ];

  criteriaList.forEach((cr, cIdx) => {
    const row = wsContrib.getRow(cRow);
    row.height = 22;

    wsContrib.mergeCells(`B${cRow}:D${cRow}`);
    const c1 = row.getCell('B');
    c1.value = cr[0];
    c1.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '0F172A' } };
    c1.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    c1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: cIdx % 2 === 0 ? 'FFFFFF' : GRAY_LIGHT } };
    c1.border = thinBorder;

    wsContrib.mergeCells(`E${cRow}:I${cRow}`);
    const c2 = row.getCell('E');
    c2.value = cr[1];
    c2.font = { name: 'Segoe UI', size: 9, color: { argb: '334155' } };
    c2.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    c2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: cIdx % 2 === 0 ? 'FFFFFF' : GRAY_LIGHT } };
    c2.border = thinBorder;

    wsContrib.mergeCells(`J${cRow}:K${cRow}`);
    const c3 = row.getCell('J');
    c3.value = cr[2];
    c3.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '2563EB' } };
    c3.alignment = { horizontal: 'center', vertical: 'middle' };
    c3.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: cIdx % 2 === 0 ? 'FFFFFF' : GRAY_LIGHT } };
    c3.border = thinBorder;

    cRow++;
  });

  // =========================================================================
  // SHEET 3: TỔNG HỢP LỊCH HỌP & BIÊN BẢN (MEETING LOGS)
  // =========================================================================
  const wsMeetings = wb.addWorksheet('Tổng hợp lịch họp & Biên bản', {
    views: [{ showGridLines: true }]
  });

  wsMeetings.mergeCells('B2:I2');
  const mTitle = wsMeetings.getCell('B2');
  mTitle.value = 'TRƯỜNG ĐẠI HỌC LẠC HỒNG — NHẬT KÝ HỌP NHÓM & QUYẾT ĐỊNH TRIỂN KHAI';
  mTitle.font = { name: 'Segoe UI', size: 15, bold: true, color: { argb: 'FFFFFF' } };
  mTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  mTitle.alignment = { horizontal: 'center', vertical: 'middle' };
  wsMeetings.getRow(2).height = 38;

  const meetingHeaders = [
    { col: 'B', label: 'BUỔI HỌP', width: 14 },
    { col: 'C', label: 'THỜI GIAN', width: 14 },
    { col: 'D', label: 'HÌNH THỨC', width: 18 },
    { col: 'E', label: 'THƯ KÝ', width: 16 },
    { col: 'F', label: 'MỤC ĐÍCH & NỘI DUNG CHÍNH', width: 36 },
    { col: 'G', label: 'KẾT QUẢ ĐẠT ĐƯỢC', width: 36 },
    { col: 'H', label: 'TỆP BIÊN BẢN (.DOCX)', width: 28 },
    { col: 'I', label: 'MINH CHỨNG ẢNH', width: 16 }
  ];

  const mHeaderRow4 = wsMeetings.getRow(4);
  mHeaderRow4.height = 28;
  meetingHeaders.forEach(mh => {
    const c = wsMeetings.getCell(`${mh.col}4`);
    c.value = mh.label;
    c.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BLUE_HEADER } };
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    c.border = headerBorder;
    wsMeetings.getColumn(mh.col).width = mh.width;
  });

  const meetings = [
    {
      name: 'Họp Lần 1',
      date: '13/10/2026',
      mode: 'Trực tiếp tại trường',
      sec: 'Bùi Đặng Quốc Khánh',
      purpose: '- Khởi động đề tài kiểm thử nền tảng Tử Tế Fund\n- Phân tích 29 Requirement của PRD 2.0.0\n- Phân chia 5 module: Login, Campaign, Reward, Blog, KYC\n- Thống nhất quy tắc đánh mã ID: REQ-*, TR-*, TC-*, BUG-*',
      result: '- Thống nhất 100% mục tiêu, phạm vi và tiến độ\n- Phân công rõ chủ sở hữu từng module\n- Lập kế hoạch Test Plan theo mẫu của Thầy Phúc',
      file: 'Biên Bản Họp Nhóm Lần 1.docx',
      proof: 'Đã đính kèm ảnh'
    },
    {
      name: 'Họp Lần 2',
      date: '25/10/2026',
      mode: 'Online (Google Meet)',
      sec: 'Bùi Đặng Quốc Khánh',
      purpose: '- Đánh giá kết quả thực thi kiểm thử 2 vòng\n- Rà soát 33 TR và 75 Test Cases cho 5 phân hệ\n- Kiểm tra danh sách Bug Log, phân loại Severity/Priority\n- Kiểm tra tính đầy đủ của các bằng chứng lỗi',
      result: '- Hoàn thành chuẩn hóa 100% kịch bản kiểm thử\n- Đồng bộ dữ liệu test data giữa 5 module\n- Chốt các lỗi cần sửa và kế hoạch retest',
      file: 'Biên Bản Họp Nhóm Lần 2.docx',
      proof: 'Đã đính kèm ảnh'
    },
    {
      name: 'Họp Lần 3',
      date: '28/10/2026',
      mode: 'Online (Google Meet)',
      sec: 'Bùi Đặng Quốc Khánh',
      purpose: '- Tổng kết kết quả kiểm thử toàn diện\n- Đối soát số liệu giữa Excel, Word và Slide PowerPoint\n- Thống nhất tỷ lệ % đóng góp của từng thành viên\n- Chuẩn bị bảo vệ đồ án trước GVBM Nguyễn Minh Phúc',
      result: '- Thống nhất số liệu báo cáo không sai lệch\n- Hoàn thiện Báo cáo Word 8 chương và Slide bảo vệ\n- Ký xác nhận đóng góp 20% đều nhau cho 5 bạn',
      file: 'Biên Bản Họp Nhóm Lần 3.docx',
      proof: 'Đã đính kèm ảnh'
    }
  ];

  let mRow = 5;
  meetings.forEach(m => {
    const row = wsMeetings.getRow(mRow);
    row.height = 68;

    const cells = [
      { col: 'B', val: m.name, align: 'center', bold: true },
      { col: 'C', val: m.date, align: 'center' },
      { col: 'D', val: m.mode, align: 'center' },
      { col: 'E', val: m.sec, align: 'center', bold: true },
      { col: 'F', val: m.purpose, align: 'left', wrap: true },
      { col: 'G', val: m.result, align: 'left', wrap: true },
      { col: 'H', val: m.file, align: 'left' },
      { col: 'I', val: m.proof, align: 'center', bold: true }
    ];

    cells.forEach(c => {
      const cell = row.getCell(c.col);
      cell.value = c.val;
      cell.font = { name: 'Segoe UI', size: 9, bold: !!c.bold, color: { argb: '0F172A' } };
      cell.alignment = { horizontal: c.align, vertical: 'middle', wrapText: !!c.wrap, indent: c.align === 'left' ? 1 : 0 };
      cell.border = thinBorder;
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: (mRow % 2 === 0 ? BLUE_ROW_ALT : 'FFFFFF') } };
    });

    mRow++;
  });

  const outPath = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/TimeLine/TimeLine_23CT113_Nhom02.xlsx';
  await wb.xlsx.writeFile(outPath);
  console.log(`Successfully generated updated timeline at: ${outPath}`);
}

buildTimelineExcel().catch(console.error);
