const fs = require('fs');

const text = fs.readFileSync('scripts/build_testcase_workbook_23ct113.py', 'utf8');

const reqs = (text.match(/\(\"REQ-[A-Z]+-\d+\"/g) || []).length;
const trs = (text.match(/\(\"TR-[A-Z]+-\d+\"/g) || []).length;
const tcs = (text.match(/\(\"TC-[A-Z]+-\d+\"/g) || []).length;

console.log('REQs in script:', reqs);
console.log('TRs in script:', trs);
console.log('TCs in script:', tcs);

// Check sheets
const sheetMatches = text.match(/create_sheet\((.*?)\)/g) || [];
console.log('Sheets created:', sheetMatches);

