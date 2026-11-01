import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')
tmpl_path = '22CT115_Nhom07_QuanLyBanHang(Sweet-Sip)/01-IC-Product-Requirements-Template-Example_Google_Sheets (1).xlsx'
wb = openpyxl.load_workbook(tmpl_path, data_only=False)

ws = wb['BLANK Product Requirements']

print("=== BLANK Product Requirements Properties ===")
print("Tab color:", ws.sheet_properties.tabColor.rgb if ws.sheet_properties.tabColor else None)

cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
widths = {c: ws.column_dimensions[c].width for c in cols}
print("Col widths:", widths)

print(f"\nTotal merged cell ranges: {len(ws.merged_cells.ranges)}")
for r in sorted(list(ws.merged_cells.ranges), key=lambda x: (x.min_row, x.min_col))[:30]:
    print(f"  Merge: {r.coord}")

print("\nExamining Rows 1-45 in BLANK:")
for r in range(1, 46):
    c2 = ws.cell(row=r, column=2)
    c3 = ws.cell(row=r, column=3)
    fill = c2.fill.start_color.rgb if c2.fill and c2.fill.start_color else None
    font_str = f"{c2.font.name} {c2.font.size}pt bold={c2.font.bold}" if c2.font else None
    h = ws.row_dimensions[r].height
    v2 = c2.value
    v3 = c3.value
    if v2 is not None or v3 is not None or fill is not None:
        print(f"Row {r:2d} (h={h}, fill={fill}, font={font_str}): B={repr(v2)[:40]} | C={repr(v3)[:40]}")
