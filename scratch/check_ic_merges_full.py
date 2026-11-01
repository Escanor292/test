import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')
wb = openpyxl.load_workbook("23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.xlsx")
for sname in wb.sheetnames:
    ws = wb[sname]
    print(f"=== {sname} ===")
    for rng in sorted(ws.merged_cells.ranges, key=lambda x: x.min_row):
        if rng.min_row >= 24:
            print(f"  Rows {rng.min_row}-{rng.max_row}, Cols {rng.min_col}-{rng.max_col} ({rng})")

