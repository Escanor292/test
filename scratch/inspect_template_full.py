import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')
tmpl_path = '22CT115_Nhom07_QuanLyBanHang(Sweet-Sip)/01-IC-Product-Requirements-Template-Example_Google_Sheets (1).xlsx'
wb = openpyxl.load_workbook(tmpl_path, data_only=False)

print("Template sheets:", wb.sheetnames)

for s in wb.sheetnames:
    ws = wb[s]
    print(f"\n==================== SHEET: {s} ====================")
    print(f"Dimensions: max_row={ws.max_row}, max_column={ws.max_column}")
    print(f"Merged ranges count: {len(ws.merged_cells.ranges)}")
    print("Column widths:", {col: ws.column_dimensions[col].width for col in ['A', 'B', 'C', 'D', 'E', 'F'] if col in ws.column_dimensions})
    
    # Print sample non-empty rows
    for r in range(1, min(35, ws.max_row + 1)):
        vals = [(c, ws.cell(row=r, column=c).value) for c in range(1, min(7, ws.max_column + 1)) if ws.cell(row=r, column=c).value is not None]
        if vals:
            c2 = ws.cell(row=r, column=2)
            fill_color = c2.fill.start_color.rgb if c2.fill and c2.fill.start_color else None
            font_info = f"{c2.font.name} {c2.font.size}pt bold={c2.font.bold}" if c2.font else None
            print(f"Row {r:2d} (fill={fill_color}, font={font_info}): {vals}")

