const fs = require('fs');
const JSZip = require('jszip');

async function extractDocxTextAndStructure(filePath) {
  if (!fs.existsSync(filePath)) {
    return { error: 'File not found: ' + filePath };
  }
  const data = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(data);
  const docXml = await zip.file('word/document.xml').async('text');
  
  // Extract paragraphs
  const pRegex = /<w:p(?:\s+[^>]*)?>([\s\S]*?)<\/w:p>/g;
  const tRegex = /<w:t(?:\s+[^>]*)?>([\s\S]*?)<\/w:t>/g;
  
  const paragraphs = [];
  let pMatch;
  while ((pMatch = pRegex.exec(docXml)) !== null) {
    const pContent = pMatch[1];
    let text = '';
    let tMatch;
    while ((tMatch = tRegex.exec(pContent)) !== null) {
      text += tMatch[1];
    }
    text = text.trim();
    if (text) {
      paragraphs.push(text);
    }
  }

  // Find headings / sections
  const headings = paragraphs.filter(p => /^(MỤC|PHẦN|[0-9]+(\.[0-9]+)*|\bI\b|\bII\b|\bIII\b|\bIV\b|\bV\b|\bVI\b|\bVII\b|\bVIII\b|\bIX\b|\bX\b)/i.test(p) || p.length < 60 && /^[A-ZÀ-Ỹ\s0-9\.\:\-]+$/.test(p));

  // Find dates mentioned
  const dates = paragraphs.filter(p => /\b(ngày|\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})\b/i.test(p));

  return {
    totalParagraphs: paragraphs.length,
    headings,
    dates: dates.slice(0, 15),
    paragraphs: paragraphs
  };
}

async function main() {
  const f1 = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/drive-download-20261027T100311Z-1-001/[Nhom2]_Ke_hoach_Kiem_thu.docx';
  const f2 = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02_v3.docx';
  const f3 = '22CT115_Nhom07_QuanLyBanHang(Sweet-Sip)/Test Plan_22CT115_Nhóm07.docx';

  console.log('=== ANALYZING 3 TEST PLANS ===');
  const res1 = await extractDocxTextAndStructure(f1);
  const res2 = await extractDocxTextAndStructure(f2);
  const res3 = await extractDocxTextAndStructure(f3);

  console.log('\n--- FILE 1 (CŨ: [Nhom2]_Ke_hoach_Kiem_thu.docx) ---');
  console.log('Paragraphs:', res1.totalParagraphs);
  console.log('Dates found:', res1.dates);
  console.log('Outline Headings (sample 20):', res1.headings ? res1.headings.slice(0, 25) : res1.error);

  console.log('\n--- FILE 2 (HIỆN TẠI: Test Plan_23CT113_Nhom02_v3.docx) ---');
  console.log('Paragraphs:', res2.totalParagraphs);
  console.log('Dates found:', res2.dates);
  console.log('Outline Headings (sample 20):', res2.headings ? res2.headings.slice(0, 25) : res2.error);

  console.log('\n--- FILE 3 (MẪU KỲ TRƯỚC: Test Plan_22CT115_Nhóm07.docx) ---');
  console.log('Paragraphs:', res3.totalParagraphs);
  console.log('Dates found:', res3.dates);
  console.log('Outline Headings (sample 20):', res3.headings ? res3.headings.slice(0, 25) : res3.error);

  // Write outlines to a file for complete inspection
  fs.writeFileSync('scripts/outline_comparison.json', JSON.stringify({
    file1: { headings: res1.headings, dates: res1.dates, first50p: res1.paragraphs ? res1.paragraphs.slice(0, 50) : [] },
    file2: { headings: res2.headings, dates: res2.dates, first50p: res2.paragraphs ? res2.paragraphs.slice(0, 50) : [] },
    file3: { headings: res3.headings, dates: res3.dates, first50p: res3.paragraphs ? res3.paragraphs.slice(0, 50) : [] }
  }, null, 2), 'utf8');

  console.log('\nWrote outlines to scripts/outline_comparison.json');
}

main().catch(console.error);
