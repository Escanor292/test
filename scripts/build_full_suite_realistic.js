/**
 * scripts/build_full_suite_realistic.js
 * Tạo dữ liệu chuẩn hóa 200 TC, 80 TR, và 14 Bug Reports
 * Thực thi sinh các file Excel:
 *  - 23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Workbook_KiemThu_TuTeFund_ToanDien.xlsx
 *  - 23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx
 *  - 3 file CSV: Requirements_Sheet.csv, Test_Cases_Sheet.csv, Traceability_Matrix_Sheet.csv
 *  - Chuẩn hóa PRD Excel 5 sheet mẫu gốc
 */

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

// 1. Load TR List from new_tr_data.js
const { NEW_TR_LIST } = require('./new_tr_data');

// 2. Định nghĩa cấu trúc 200 Test Cases
// Mỗi phân hệ 20 TC, đúng số lượng Pass/Fail/Blocked:
// AUTH: 17 Pass, 3 Fail, 0 Blocked (Fail: TC_AUTH_007, TC_AUTH_008, TC_AUTH_011)
// DONATE: 14 Pass, 2 Fail, 4 Blocked (Fail: TC_DONATE_004, TC_DONATE_008; Blocked: TC_DONATE_005, TC_DONATE_006, TC_DONATE_019, TC_DONATE_020)
// CAMP: 15 Pass, 5 Fail, 0 Blocked (Fail: TC_CAMP_007, TC_CAMP_008, TC_CAMP_009, TC_CAMP_011, TC_CAMP_018)
// DISBURSE: 18 Pass, 2 Fail, 0 Blocked (Fail: TC_DISBURSE_013, TC_DISBURSE_014)
// USER: 17 Pass, 3 Fail, 0 Blocked (Fail: TC_USER_011, TC_USER_012, TC_USER_018)
// ADMIN: 18 Pass, 2 Fail, 0 Blocked (Fail: TC_ADMIN_008, TC_ADMIN_016)
// BLOG: 19 Pass, 1 Fail, 0 Blocked (Fail: TC_BLOG_006)
// CHAT: 17 Pass, 3 Fail, 0 Blocked (Fail: TC_CHAT_002, TC_CHAT_011, TC_CHAT_012)
// STATS: 18 Pass, 2 Fail, 0 Blocked (Fail: TC_STATS_011, TC_STATS_012)
// SYSTEM: 20 Pass, 0 Fail, 0 Blocked

console.log('Total TR loaded:', NEW_TR_LIST.length);

module.exports = { NEW_TR_LIST };

