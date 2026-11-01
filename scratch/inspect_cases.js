const fs = require('fs');
const content = fs.readFileSync('scripts/run_master_real_suite.js', 'utf8');
const tids = [
  'TC_AUTH_009',
  'TC_REWD_002',
  'TC_REWD_003',
  'TC_REWD_005',
  'TC_PLED_001',
  'TC_PLED_002',
  'TC_PLED_003',
  'TC_PLED_007',
  'TC_COMM_007',
  'TC_ADMN_004'
];

tids.forEach(tid => {
  const marker = "tid: '" + tid + "'";
  const idx = content.indexOf(marker);
  if (idx !== -1) {
    // find closing of this object
    let nextIdx = content.indexOf("tid: '", idx + 10);
    if (nextIdx === -1) nextIdx = idx + 500;
    console.log('=== ' + tid + ' ===');
    console.log(content.substring(idx - 6, nextIdx - 10));
  }
});
