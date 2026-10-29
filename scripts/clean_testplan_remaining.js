const fs = require('fs');
const JSZip = require('jszip');

async function cleanRemaining() {
  const filePath = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02_v3.docx';
  const data = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(data);
  let docXml = await zip.file('word/document.xml').async('text');

  docXml = docXml.replace(/dọn dữ liệu giả lập \(Phase 2\)/g, 'dọn dữ liệu giả lập (Phân hệ SIM &amp; SHIP)');
  docXml = docXml.replace(
    /Báo cáo vi phạm thuộc Phase 2 và có đúng một chủ sở hữu chính: Bùi Đặng Quốc Khánh\./g,
    'Báo cáo vi phạm (Reports) thuộc phân hệ Quản trị hệ thống (ADMIN) và có đúng một chủ sở hữu chính: Bùi Đặng Quốc Khánh.'
  );
  docXml = docXml.replace(
    /Cơ sở dữ liệu có đủ dữ liệu mẫu cho 5 phân hệ trong vòng kiểm thử\./g,
    'Cơ sở dữ liệu có đủ dữ liệu mẫu cho toàn bộ 12 phân hệ trong vòng kiểm thử.'
  );

  zip.file('word/document.xml', docXml);
  const updatedBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(filePath, updatedBuffer);
  console.log('Cleaned remaining references successfully!');
}

cleanRemaining().catch(console.error);

