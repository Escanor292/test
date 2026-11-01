import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')
path = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.xlsx'
wb = openpyxl.load_workbook(path, data_only=False)

for s in wb.sheetnames:
    ws = wb[s]
    print(f"\n=== Sheet {s} rows 90 to {ws.max_row} ===")
    for r in range(90, ws.max_row + 1):
        row_vals = [(c, ws.cell(row=r, column=c).value) for c in range(1, 10) if ws.cell(row=r, column=c).value is not None]
        if row_vals:
            print(f"Row {r:3d}: {row_vals}")

