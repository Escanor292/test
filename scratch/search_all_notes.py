import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx')
ws = wb['TC List']

for r in range(1, ws.max_row + 1):
    for c in range(1, ws.max_column + 1):
        val = str(ws.cell(row=r, column=c).value or '')
        if any(w in val.lower() for w in ['ghi chú', 'lưu ý', 'chú ý']):
            print(f"Row {r}, Col {c} ({ws.cell(row=1, column=c).value}): {val[:120]}")

