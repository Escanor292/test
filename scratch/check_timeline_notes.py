import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/TimeLine/TimeLine_23CT113_Nhom02.xlsx')
for sheet in wb.sheetnames:
    ws = wb[sheet]
    print(f"--- Sheet: {sheet} ---")
    for r in range(1, ws.max_row + 1):
        vals = [ws.cell(row=r, column=c).value for c in range(1, ws.max_column + 1)]
        row_str = " | ".join(str(v) for v in vals if v is not None)
        if any(kw in row_str.lower() for kw in ['ghi chú', 'note', 'chú ý']):
            print(f"Row {r}: {row_str}")

