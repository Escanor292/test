const fs = require('fs');
const JSZip = require('jszip');

async function updateTestPlanV3() {
  const filePath = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02_v3.docx';
  const data = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(data);
  let docXml = await zip.file('word/document.xml').async('text');

  // 1. Update Ngày lập to 07/09/2026
  docXml = docXml.replace(/Ngày lập:\s*28\/10\/2026/g, 'Ngày lập: 07/09/2026');
  docXml = docXml.replace(/28\/10\/2026\s*—\s*ngày cập nhật:\s*29\/10\/2026/g, '07/09/2026 — ngày cập nhật: 29/10/2026');

  // 2. Synchronize TR / TC numbers to 12 modules, 65 TRs, 162 TCs
  docXml = docXml.replace(/29 Requirement,\s*33 Test Requirement và 75 Test Case/g, '60 Requirement, 65 Test Requirement và 162 Test Case');
  docXml = docXml.replace(/29 REQ,\s*33 TR và 75 TC/g, '60 REQ, 65 TR và 162 TC');
  docXml = docXml.replace(/bộ 75 Test Case/g, 'bộ 162 Test Case');
  docXml = docXml.replace(/75 Test Case/g, '162 Test Case');
  docXml = docXml.replace(/75 TC/g, '162 TC');
  docXml = docXml.replace(/33 TR/g, '65 TR');

  // Save back to zip
  zip.file('word/document.xml', docXml);
  const updatedBuffer = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync(filePath, updatedBuffer);

  console.log('Successfully updated Test Plan v3 with creation date 07/09/2026 and 162 TCs / 65 TRs!');
}

updateTestPlanV3().catch(console.error);
