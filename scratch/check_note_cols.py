import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx')
for sheet in wb.sheetnames:
    ws = wb[sheet]
    print(f"--- Sheet: {sheet} ---")
    headers = [str(ws.cell(row=1, column=c).value) for c in range(1, ws.max_column + 1)]
    print("Headers:", headers)
    # Check if there is a 'Ghi chú' column
    for c_idx, h in enumerate(headers, start=1):
        if 'ghi chú' in h.lower() or 'note' in h.lower():
            print(f"Found note column in {sheet}: Col {c_idx} ({h})")
            for r in range(2, min(ws.max_row + 1, 20)):
                v = ws.cell(row=r, column=c_idx).value
                if v:
                    print(f"  Row {r}: {v}")

