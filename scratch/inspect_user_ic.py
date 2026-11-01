import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')
path = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.xlsx'
wb = openpyxl.load_workbook(path, data_only=False)

for s in wb.sheetnames:
    ws = wb[s]
    print(f"\n==================== SHEET: {s} (max_row={ws.max_row}) ====================")
    for r in range(1, ws.max_row + 1):
        row_vals = [ws.cell(row=r, column=c).value for c in range(1, 6)]
        if any(v is not None for v in row_vals):
            # Print non-empty rows
            non_empty = [(c, v) for c, v in enumerate(row_vals, 1) if v is not None]
            print(f"Row {r:3d}: {non_empty}")

