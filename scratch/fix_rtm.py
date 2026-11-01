# -*- coding: utf-8 -*-
import openpyxl, sys

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx')
ws_tc = wb['TC List']
ws_rtm = wb['RTM']

# Map each TC to its status
tc_status = {}
for r in ws_tc.iter_rows(min_row=2, values_only=True):
    tid = str(r[1] or '').strip()
    st = str(r[9] or '').strip().upper()
    tc_status[tid] = st

print(f"Total TCs indexed: {len(tc_status)}")

total_rtm_tc = 0
for row_idx in range(2, ws_rtm.max_row + 1):
    tc_list_cell = ws_rtm.cell(row=row_idx, column=6).value
    if not tc_list_cell:
        continue
    tids = [t.strip() for t in str(tc_list_cell).split(',') if t.strip()]
    tot = len(tids)
    p_count = sum(1 for tid in tids if tc_status.get(tid) in ['PASS', 'PASSED', 'ĐẠT'])
    f_count = sum(1 for tid in tids if tc_status.get(tid) in ['FAIL', 'FAILED', 'HỎNG'])
    b_count = sum(1 for tid in tids if tc_status.get(tid) in ['BLOCKED', 'CHẶN'])
    unrun_count = tot - (p_count + f_count + b_count)
    ran_count = p_count + f_count + b_count

    ws_rtm.cell(row=row_idx, column=7).value = tot
    ws_rtm.cell(row=row_idx, column=8).value = ran_count
    ws_rtm.cell(row=row_idx, column=9).value = p_count
    ws_rtm.cell(row=row_idx, column=10).value = f_count
    ws_rtm.cell(row=row_idx, column=11).value = b_count
    ws_rtm.cell(row=row_idx, column=12).value = unrun_count
    total_rtm_tc += tot

print(f"Calculated RTM columns. Total TCs across all TRs: {total_rtm_tc}")
wb.save('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx')
print("Saved RTM updates successfully!")

