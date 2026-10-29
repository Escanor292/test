const JSZip = require('jszip');
const fs = require('fs');

async function inspectDocx(filePath) {
  console.log(`\n=================== Inspecting ${filePath} ===================`);
  const data = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(data);
  const docXml = await zip.file('word/document.xml').async('text');
  
  // Extract text from w:t tags
  // Also let's inspect structure (paragraphs, tables)
  const paragraphs = docXml.split(/<\/w:p>/);
  console.log(`Total paragraphs: ${paragraphs.length}`);
  
  const textLines = [];
  for (const p of paragraphs) {
    const texts = [];
    const tMatches = p.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
    for (const tm of tMatches) {
      const match = tm.match(/<w:t[^>]*>([^<]*)<\/w:t>/);
      if (match) texts.push(match[1]);
    }
    const fullText = texts.join('').trim();
    if (fullText) {
      textLines.push(fullText);
    }
  }
  
  console.log(`Found ${textLines.length} non-empty lines:`);
  textLines.slice(0, 40).forEach((line, idx) => {
    console.log(`[L${idx+1}] ${line}`);
  });
  if (textLines.length > 40) {
    console.log(`... and ${textLines.length - 40} more lines. Last 10 lines:`);
    textLines.slice(-10).forEach((line, idx) => {
      console.log(`[End L${textLines.length - 10 + idx + 1}] ${line}`);
    });
  }
}

async function run() {
  const dir = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/TimeLine';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.docx'));
  for (const f of files) {
    await inspectDocx(`${dir}/${f}`);
  }
  
  // Also check sample meeting minutes
  const sampleDir = '22CT115_Nhom07_QuanLyBanHang(Sweet-Sip)/TimeLine';
  const sampleFiles = fs.readdirSync(sampleDir).filter(f => f.endsWith('.docx'));
  for (const f of sampleFiles) {
    await inspectDocx(`${sampleDir}/${f}`);
  }
}

run().catch(console.error);
