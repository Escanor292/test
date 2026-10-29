const JSZip = require('jszip');
const fs = require('fs');

async function extractMembers(filePath) {
  console.log(`\n=================== Extracting info from ${filePath} ===================`);
  const data = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(data);
  const docXml = await zip.file('word/document.xml').async('text');
  
  const paragraphs = docXml.split(/<\/w:p>/);
  for (const p of paragraphs) {
    const texts = [];
    const tMatches = p.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
    for (const tm of tMatches) {
      const match = tm.match(/<w:t[^>]*>([^<]*)<\/w:t>/);
      if (match) texts.push(match[1]);
    }
    const fullText = texts.join('').trim();
    if (fullText && (fullText.includes('Tài') || fullText.includes('Khánh') || fullText.includes('Tiến') || fullText.includes('Ân') || fullText.includes('Du') || fullText.includes('MSSV') || fullText.includes('23CT') || fullText.includes('Thành viên') || fullText.includes('%') || fullText.includes('Đóng góp'))) {
      console.log(fullText);
    }
  }
}

async function run() {
  await extractMembers('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx');
  await extractMembers('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02_v3.docx');
}

run().catch(console.error);
