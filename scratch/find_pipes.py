import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx')
ws = wb['TC List']

for r in range(2, ws.max_row + 1):
    tcid = ws.cell(row=r, column=2).value
    ev = str(ws.cell(row=r, column=11).value or '')
    if '|' in ev:
        print(f"Row {r} ({tcid}): {ev}")

