const ExcelJS = require('exceljs');

async function run() {
  const samplePath = '22CT115_Nhom07_QuanLyBanHang(Sweet-Sip)/TimeLine/TimeLine_22CT115_Nhóm07.xlsx';
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(samplePath);
  console.log(`=== Sample Timeline: ${samplePath} ===`);
  wb.eachSheet((ws, id) => {
    console.log(`\nSheet #${id}: ${ws.name} (Rows: ${ws.rowCount}, Cols: ${ws.columnCount})`);
    for (let r = 1; r <= Math.min(ws.rowCount, 60); r++) {
      const row = ws.getRow(r);
      const vals = [];
      for (let c = 1; c <= Math.min(ws.columnCount, 25); c++) {
        vals.push(row.getCell(c).value);
      }
      if (vals.some(v => v !== null && v !== undefined && v !== '')) {
        console.log(`Row ${r}: ${JSON.stringify(vals)}`);
      }
    }
  });
}
run().catch(console.error);
