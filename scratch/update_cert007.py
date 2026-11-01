import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')

excel_path = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx'
wb = openpyxl.load_workbook(excel_path)
ws = wb['TC List']

for r in range(2, ws.max_row + 1):
    tcid = ws.cell(row=r, column=2).value
    if tcid == 'TC_CERT_007':
        old_val = ws.cell(row=r, column=11).value
        print(f"Row {r} old val: {old_val}")
        new_val = "evidence/TC_CERT_007_response.json; GET /hoa-don/HD-INVALID-999 trả HTTP 200, không phải 404. Trang lỗi 404 hóa đơn không tồn tại."
        ws.cell(row=r, column=11, value=new_val)
        print(f"Row {r} new val: {new_val}")
        break

wb.save(excel_path)
print("Saved successfully!")

