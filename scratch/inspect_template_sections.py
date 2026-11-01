import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')
p = '22CT115_Nhom07_QuanLyBanHang(Sweet-Sip)/01-IC-Product-Requirements-Template-Example_Google_Sheets (1).xlsx'
wb = openpyxl.load_workbook(p, data_only=False)
ws = wb['BLANK Product Requirements']

print(f"Total rows in BLANK: {ws.max_row}")
for r in range(1, 95):
    vals = [(c, ws.cell(row=r, column=c).value) for c in range(1, 6) if ws.cell(row=r, column=c).value is not None]
    if vals:
        print(f"Row {r:2d}: {vals}")

