import openpyxl

wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Test"
ws.cell(1, 1, 10)
ws.cell(1, 2, 20)
ws.cell(1, 3, "=SUM(A1:B1)")
wb.save("scratch/test_formula.xlsx")

wb2 = openpyxl.load_workbook("scratch/test_formula.xlsx", data_only=True)
ws2 = wb2["Test"]
print("Value with data_only=True:", ws2.cell(1, 3).value)

