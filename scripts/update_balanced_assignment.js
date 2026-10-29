const fs = require('fs');
const JSZip = require('jszip');
const ExcelJS = require('exceljs');

// -------------------------------------------------------------
// 1. UPDATE TEST PLAN DOCX
// -------------------------------------------------------------
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
  const filePath = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02_v3.docx';
  const data = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(data);
  let docXml = await zip.file('word/document.xml').async('text');

  // Table 0: In-Scope 12 modules
  const tbl0Data = [
    ['#', 'Phân hệ kiểm thử', 'Mã', 'Mục tiêu kiểm thử & Nghiệp vụ cốt lõi', 'Số TC', 'Người phụ trách'],
    ['1', 'Login / Auth & Phân quyền', 'AUTH', 'Đăng ký, xác thực email, đăng nhập mật khẩu/Google OAuth, quên/đặt lại mật khẩu, phân quyền RBAC (BACKER, CREATOR, ADMIN)', '16', 'Nguyễn Trung Tiến'],
    ['2', 'Quản lý Chiến dịch gây quỹ', 'CAMP', 'Khởi tạo chiến dịch (DRAFT), soạn nội dung câu chuyện, gửi duyệt (PENDING_REVIEW), Admin duyệt/từ chối, chuyển trạng thái tự động', '18', 'Trần Xuân Ân'],
    ['3', 'Gói Phần thưởng & Tồn kho', 'REWARD', 'Thiết lập gói phần thưởng vật lý/số, ràng buộc giá trị tối thiểu, quản lý tồn kho (stock), trừ tồn kho khi cam kết', '13', 'Trần Xuân Ân'],
    ['4', 'Thanh toán Ký quỹ VietQR', 'PAY', 'Luồng thanh toán chuyển khoản ngân hàng trung gian VietQR Escrow (BANK_ESCROW), cổng trực tuyến trả 410, admin đối soát thủ công', '15', 'Nguyễn Quách Phú Tài'],
    ['5', 'Hoàn tiền & Ký quỹ', 'REFUND', 'Hoàn tiền chiến dịch All-or-Nothing thất bại, hoàn tiền chiến dịch bị hủy vi phạm, hủy pledge tự nguyện hợp lệ, kiểm soát số dư ký quỹ', '14', 'Nguyễn Quách Phú Tài'],
    ['6', 'Tin nhắn & Hội thoại Trực tiếp', 'CHAT', 'Khởi tạo hội thoại 1-1 giữa Backer và Creator, gửi/nhận tin nhắn văn bản tức thời, lưu trữ lịch sử tin nhắn PostgreSQL/Prisma', '14', 'Nguyễn Trung Tiến'],
    ['7', 'Quản trị Hệ thống & Báo cáo', 'ADMIN', 'Quản trị người dùng, khoá tài khoản, gắn huy hiệu danh hiệu (Badges), tiếp nhận và xử lý báo cáo vi phạm cộng đồng (Reports)', '12', 'Bùi Đặng Quốc Khánh'],
    ['8', 'Giả lập Thanh toán & Vận chuyển', 'SIM', 'Bật/tắt simulation_mode trong quản trị, ghi nhận thanh toán giả lập mã SIM-, endpoint dọn dữ liệu DELETE /api/admin/simulation', '12', 'Bùi Đặng Quốc Khánh'],
    ['9', 'Quản lý Vận chuyển & Giao nhận', 'SHIP', 'Thu thập địa chỉ giao hàng, liên kết mã vận đơn theo nhà vận chuyển (GHTK/GHN/VTP/SPX), cập nhật chu kỳ trạng thái giao nhận', '12', 'Bùi Đặng Quốc Khánh'],
    ['10', 'Tin tức & Hoạt động Cộng đồng', 'BLOG', 'Soạn thảo bài viết Rich Text/Markdown, đính kèm ảnh tải lên, lưu nháp (DRAFT), gửi duyệt và xuất bản (PUBLISHED), phân loại danh mục', '12', 'Nguyễn Khánh Du'],
    ['11', 'Định danh Người dùng KYC', 'KYC', 'Nộp hồ sơ KYC gồm ảnh CCCD 2 mặt và video chân dung, kiểm tra định dạng và dung lượng, Admin xét duyệt hoặc từ chối', '12', 'Nguyễn Khánh Du'],
    ['12', 'Kiểm thử Phi chức năng & Bảo mật', 'NFR', 'Kiểm soát truy cập RBAC, chống SQL Injection/XSS, hiệu năng thời gian phản hồi API < 2s, tương thích Responsive Desktop/Mobile', '12', 'Nguyễn Khánh Du'],
  ];
  const tbl0Widths = [450, 1950, 800, 3540, 600, 1300];

  // Table 10: Phân công theo phân hệ
  const tbl10Data = [
    ['Thành viên', 'Vai trò dự án', 'Phân hệ kiểm thử phụ trách', 'Số Test Case', 'Tỷ lệ đóng góp'],
    ['Nguyễn Quách Phú Tài', 'Nhóm trưởng / Test Lead / Product Owner', 'Thanh toán Ký quỹ VietQR (PAY: 15 TC), Hoàn tiền & Ký quỹ (REFUND: 14 TC)', '29', '17.9%'],
    ['Trần Xuân Ân', 'Tester', 'Quản lý Chiến dịch gây quỹ (CAMP: 18 TC), Gói Phần thưởng & Tồn kho (REWARD: 13 TC)', '31', '19.1%'],
    ['Nguyễn Trung Tiến', 'Tester', 'Đăng nhập / Auth & Phân quyền (AUTH: 16 TC), Tin nhắn & Trò chuyện Trực tiếp (CHAT: 14 TC)', '30', '18.5%'],
    ['Bùi Đặng Quốc Khánh', 'Tester', 'Quản trị Hệ thống & Báo cáo (ADMIN: 12 TC), Giả lập Thanh toán (SIM: 12 TC), Quản lý Vận chuyển (SHIP: 12 TC)', '36', '22.2%'],
    ['Nguyễn Khánh Du', 'Tester', 'Tin tức Blog & Cộng đồng (BLOG: 12 TC), Định danh Người dùng KYC (KYC: 12 TC), Phi chức năng & Bảo mật (NFR: 12 TC)', '36', '22.2%'],
    ['Tổng cộng', '5 thành viên', '12 phân hệ toàn diện (Thanh toán ký quỹ, Hoàn tiền, Chiến dịch, Phần thưởng, Auth, Chat, Quản trị, Giả lập, Vận chuyển, Blog, KYC, NFR)', '162', '100.0%'],
  ];
  const tbl10Widths = [1700, 1500, 3640, 900, 900];

  // Table 12: Signatures
  const tbl12Data = [
    ['Chức vụ / Vai trò', 'Họ và tên', 'Phân hệ phụ trách kiểm thử', 'Ký tên xác nhận'],
    ['Nhóm trưởng / Test Lead / Product Owner', 'Nguyễn Quách Phú Tài', 'Thanh toán VietQR (PAY) & Hoàn tiền (REFUND)', 'Đã ký duyệt'],
    ['Tester', 'Trần Xuân Ân', 'Quản lý Chiến dịch (CAMP) & Phần thưởng (REWARD)', 'Đã xác nhận'],
    ['Tester', 'Nguyễn Trung Tiến', 'Đăng nhập/Auth (AUTH) & Tin nhắn trực tiếp (CHAT)', 'Đã xác nhận'],
    ['Tester', 'Bùi Đặng Quốc Khánh', 'Quản trị (ADMIN), Giả lập (SIM) & Vận chuyển (SHIP)', 'Đã xác nhận'],
    ['Tester', 'Nguyễn Khánh Du', 'Tin tức (BLOG), Định danh KYC (KYC) & Phi chức năng (NFR)', 'Đã xác nhận'],
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
    { idx: 0, xml: buildTable(tbl0Data, tbl0Widths) },
  ];
  tableReplacements.sort((a, b) => b.idx - a.idx);

  for (const item of tableReplacements) {
    const target = matches[item.idx];
    docXml = docXml.slice(0, target.index) + item.xml + docXml.slice(target.index + target.length);
  }

  // Update references to Test Lead / Product Owner and remove Senior Tester
  docXml = docXml.replace(/Test Lead, duyệt phạm vi/g, 'Test Lead / Product Owner, duyệt phạm vi');
  docXml = docXml.replace(/Senior Tester/g, 'Tester');
  docXml = docXml.replace(/Tester \/ Data Lead/g, 'Tester');
  docXml = docXml.replace(/Tester \/ Report Lead/g, 'Tester');

  zip.file('word/document.xml', docXml);
  const updatedBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(filePath, updatedBuffer);
  console.log('Updated Test Plan Docx with balanced assignment!');
}

// -------------------------------------------------------------
// 2. UPDATE TEST CASE WORKBOOK
// -------------------------------------------------------------
async function updateWorkbook() {
  const filePath = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx';
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(filePath);

  // Mapping from Module Code to Assigned Member
  const moduleOwner = {
    AUTH: 'Nguyễn Trung Tiến',
    CAMP: 'Trần Xuân Ân',
    REWARD: 'Trần Xuân Ân',
    PAY: 'Nguyễn Quách Phú Tài',
    SIM: 'Bùi Đặng Quốc Khánh',
    SHIP: 'Bùi Đặng Quốc Khánh',
    REFUND: 'Nguyễn Quách Phú Tài',
    CHAT: 'Nguyễn Trung Tiến',
    BLOG: 'Nguyễn Khánh Du',
    KYC: 'Nguyễn Khánh Du',
    ADMIN: 'Bùi Đặng Quốc Khánh',
    NFR: 'Nguyễn Khánh Du',
  };

  // 1. Update Summary sheet
  const summary = wb.getWorksheet('Summary');
  if (summary) {
    // Update Row 5: Role title
    summary.getCell('A5').value = 'Trưởng nhóm / Test Lead / Product Owner:';
    summary.getCell('B5').value = 'Nguyễn Quách Phú Tài (MSSV: 123000609)';

    // Update Module table (Rows 14 to 25)
    for (let r = 14; r <= 25; r++) {
      const modCode = summary.getCell('A' + r).value;
      if (modCode && moduleOwner[modCode]) {
        summary.getCell('E' + r).value = moduleOwner[modCode];
      }
    }
  }

  // 2. Update Test Execution sheet (Column 3: Tester phụ trách)
  const execSheet = wb.getWorksheet('Test Execution');
  if (execSheet) {
    execSheet.eachRow((r, i) => {
      if (i > 1) {
        const tcId = r.getCell(4).value; // Test Case ID is in column 4
        if (tcId) {
          const modCode = tcId.split('-')[1];
          if (moduleOwner[modCode]) {
            r.getCell(3).value = moduleOwner[modCode];
          }
        }
      }
    });
  }

  await wb.xlsx.writeFile(filePath);
  console.log('Updated Test Case Workbook with balanced assignment!');
}

async function main() {
  await updateDocx();
  await updateWorkbook();
  console.log('ALL FILES UPDATED WITH BALANCED ASSIGNMENT AND ROLES!');
}

main().catch(console.error);

