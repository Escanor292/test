import openpyxl
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx')
ws = wb['TC List']

for r in range(2, ws.max_row + 1):
    tcid = ws.cell(row=r, column=2).value
    ev = ws.cell(row=r, column=11).value
    if not tcid or not ev:
        continue
    ev_str = str(ev)
    # find all files like TC_*.png, etc.
    files = re.findall(r'[A-Za-z0-9_\-]+\.(?:png|jpg|jpeg|txt|json|log)', ev_str)
    for f in files:
        if not f.startswith(str(tcid)):
            print(f"Row {r}: TC {tcid} has foreign file reference: {f} in: {ev_str}")
    
    # Check if there are annotations / notes with 'trùng' or '|' or 'ghi chú'
    if 'trùng' in ev_str.lower() or 'không lưu file riêng' in ev_str.lower():
        print(f"Row {r}: TC {tcid} has note with 'trùng': {ev_str}")

