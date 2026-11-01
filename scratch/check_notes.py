import openpyxl
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx')
ws = wb['TC List']

print("Total rows:", ws.max_row)

for r in range(2, ws.max_row + 1):
    tcid = ws.cell(row=r, column=1).value
    ev = ws.cell(row=r, column=10).value
    note = ws.cell(row=r, column=11).value
    if tcid and 'CERT_007' in str(tcid):
        print(f"TC: {tcid}")
        print(f"Col 10 (Evidence): {ev}")
        print(f"Col 11 (Note): {note}")

# Check any other cells with mismatched filenames or extra note mentions
for r in range(2, ws.max_row + 1):
    tcid = str(ws.cell(row=r, column=1).value or '')
    ev = str(ws.cell(row=r, column=10).value or '')
    note = str(ws.cell(row=r, column=11).value or '')
    
    # check if other TC IDs are referenced in evidence
    other_tcs = re.findall(r'TC_[A-Z0-9_]+', ev)
    for otc in other_tcs:
        if otc != tcid:
            print(f"Row {r} ({tcid}) references other TC in evidence: {otc} -> full: {ev}")
    
    if 'trùng' in ev.lower() or 'lưu file riêng' in ev.lower():
        print(f"Row {r} ({tcid}) has 'trùng' in evidence: {ev}")

