const fs = require('fs');
const JSZip = require('jszip');

async function inspectSections() {
  const f2 = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02_v3.docx';
  const data = fs.readFileSync(f2);
  const zip = await JSZip.loadAsync(data);
  const docXml = await zip.file('word/document.xml').async('text');

  const pList = docXml.match(/<w:p(?:\s+[^>]*)?>[\s\S]*?<\/w:p>/g) || [];
  const lines = pList.map(p => {
    const ts = p.match(/<w:t(?:\s+[^>]*)?>([\s\S]*?)<\/w:t>/g) || [];
    return ts.map(t => t.replace(/<[^>]+>/g, '')).join('').trim();
  }).filter(Boolean);

  lines.forEach((line, idx) => {
    if (/^[0-9]+(\.[0-9]+)*\s+[A-ZÀ-Ỹ]/i.test(line) || /^(TEST PLAN|KẾ HOẠCH|Dự án|Phiên bản|Ngày lập|Người lập|Nhóm)/i.test(line)) {
      console.log('[' + idx + ']: ' + line);
    }
  });
}

inspectSections().catch(console.error);
