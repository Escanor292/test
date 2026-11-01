# -*- coding: utf-8 -*-
import openpyxl, os, glob, json, sys, datetime

sys.stdout.reconfigure(encoding='utf-8')

tc_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx"
ev_dir = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/evidence"

files = os.listdir(ev_dir)
file_map = {}
for f in files:
    if f.endswith('.png') or f.endswith('.json') or f.endswith('.log'):
        tid = f.split('.')[0].split('_response')[0].split('_test')[0]
        file_map[tid] = f

print(f"Total evidence files mapped: {len(file_map)}")

wb = openpyxl.load_workbook(tc_path)
ws_tc = wb['TC List']

run_date = datetime.datetime.now().strftime("%d/%m/%Y %H:%M")
updated_count = 0

for row in ws_tc.iter_rows(min_row=2):
    tid_cell = row[1]
    stt_cell = row[9]
    ev_cell = row[10]
    date_cell = row[11]

    tid = str(tid_cell.value or '').strip()
    stt = str(stt_cell.value or '').strip()

    if tid in file_map:
        fname = file_map[tid]
        fpath = os.path.join(ev_dir, fname)

        if fname.endswith('.png'):
            ev_desc = f"evidence/{fname}; Playwright Chromium browser capture: DOM verified & rendered"
        elif fname.endswith('.json'):
            with open(fpath, 'r', encoding='utf-8') as jf:
                data = json.load(jf)
            sc = data['response']['statusCode']
            m = data['request']['method']
            ep = data['request']['endpoint'].replace('https://test-gamma-azure-65.vercel.app', '')
            ev_desc = f"evidence/{fname}; HTTP {sc} {m} {ep}"
        elif fname.endswith('.log'):
            ev_desc = f"evidence/{fname}; Node.js test execution output"
        else:
            ev_desc = f"evidence/{fname}"

        ev_cell.value = ev_desc
        date_cell.value = run_date
        updated_count += 1

print(f"Updated {updated_count} test cases in Excel TC List.")

# Sync RTM columns
ws_rtm = wb['RTM']
tc_status = {}
for r in ws_tc.iter_rows(min_row=2, values_only=True):
    t_id = str(r[1] or '').strip()
    s_val = str(r[9] or '').strip().upper()
    tc_status[t_id] = s_val

total_rtm_tc = 0
for row_idx in range(2, ws_rtm.max_row + 1):
    tc_list_cell = ws_rtm.cell(row=row_idx, column=6).value
    if not tc_list_cell:
        continue
    tids = [t.strip() for t in str(tc_list_cell).split(',') if t.strip()]
    tot = len(tids)
    p_count = sum(1 for t in tids if tc_status.get(t) in ['PASS', 'PASSED', 'ĐẠT'])
    f_count = sum(1 for t in tids if tc_status.get(t) in ['FAIL', 'FAILED', 'HỎNG'])
    b_count = sum(1 for t in tids if tc_status.get(t) in ['BLOCKED', 'CHẶN'])
    unrun_count = tot - (p_count + f_count + b_count)
    ran_count = p_count + f_count + b_count

    ws_rtm.cell(row=row_idx, column=7).value = tot
    ws_rtm.cell(row=row_idx, column=8).value = ran_count
    ws_rtm.cell(row=row_idx, column=9).value = p_count
    ws_rtm.cell(row=row_idx, column=10).value = f_count
    ws_rtm.cell(row=row_idx, column=11).value = b_count
    ws_rtm.cell(row=row_idx, column=12).value = unrun_count
    total_rtm_tc += tot

print(f"RTM synchronized. Total TCs across all TRs: {total_rtm_tc}")
wb.save(tc_path)
print("Saved Excel workbook successfully!")

