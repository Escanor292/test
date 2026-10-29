const JSZip = require('jszip');
const fs = require('fs');

async function printFullDocx(filePath) {
  console.log(`\n=================== FULL TEXT OF ${filePath} ===================`);
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
    if (fullText) console.log(fullText);
  }
}

async function run() {
  const dir = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/TimeLine';
  const files = [
    'Biên Bản Họp Nhóm Lần 1 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx',
    'Biên Bản Họp Nhóm Lần 2 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx',
    'Biên Bản Họp Nhóm Lần 3 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx'
  ];
  for (const f of files) {
    await printFullDocx(`${dir}/${f}`);
  }
}

run().catch(console.error);
