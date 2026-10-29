const fs = require('fs');
const JSZip = require('jszip');

async function check() {
  const data = fs.readFileSync('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02_v3.docx');
  const zip = await JSZip.loadAsync(data);
  const docXml = await zip.file('word/document.xml').async('text');

  const pList = docXml.match(/<w:p(?:\s+[^>]*)?>[\s\S]*?<\/w:p>/g) || [];
  const lines = pList.map(p => {
    const ts = p.match(/<w:t(?:\s+[^>]*)?>([\s\S]*?)<\/w:t>/g) || [];
    return ts.map(t => t.replace(/<[^>]+>/g, '')).join('').trim();
  }).filter(Boolean);

  lines.forEach((l, i) => {
    if (l.includes('Phase 2') || l.includes('75') || l.includes('29') || l.includes('33') || l.includes('phân hệ') || l.includes('phạm vi')) {
      console.log('[' + i + ']: ' + l.slice(0, 160));
    }
  });
}

check().catch(console.error);

