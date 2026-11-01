import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx')
print("Sheets:", wb.sheetnames)
ws = wb['TC List']
for r in range(1, 10):
    row_vals = [ws.cell(row=r, column=c).value for c in range(1, 12)]
    print(f"Row {r}: {row_vals}")

for r in range(1, ws.max_row + 1):
    c1 = str(ws.cell(row=r, column=1).value or '')
    c2 = str(ws.cell(row=r, column=2).value or '')
    c3 = str(ws.cell(row=r, column=3).value or '')
    if 'CERT_007' in c1 or 'CERT_007' in c2 or 'CERT_007' in c3:
        print(f"Found CERT_007 at row {r}:")
        for col in range(1, 15):
            print(f"  Col {col} ({ws.cell(row=1, column=col).value}): {ws.cell(row=r, column=col).value}")

