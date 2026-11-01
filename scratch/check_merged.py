import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')
file_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.xlsx"
wb = openpyxl.load_workbook(file_path)
for sname in wb.sheetnames:
    ws = wb[sname]
    print(f"=== Sheet: {sname} ===")
    print("Merged cell ranges count:", len(ws.merged_cells.ranges))
    for r in range(26, 37):
        print(f"Row {r}:")
        for c in range(1, 8):
            cell = ws.cell(row=r, column=c)
            is_merged = type(cell).__name__
            print(f"  Col {c} ({is_merged}): {cell.value}")

