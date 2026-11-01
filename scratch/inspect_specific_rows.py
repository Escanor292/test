import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx')
ws = wb['TC List']

for r in [62, 63, 64, 65, 82, 83, 84, 91]:
    tcid = ws.cell(row=r, column=2).value
    ev = ws.cell(row=r, column=11).value
    print(f"Row {r} ({tcid}):")
    print(f"  Evidence: {ev}\n")

