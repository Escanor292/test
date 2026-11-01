import openpyxl
from openpyxl.worksheet._writer import WorksheetWriter

# Let's inspect how openpyxl writes a formula cell
wb = openpyxl.Workbook()
ws = wb.active
c = ws.cell(1, 1, "=SUM(A2:A3)")
print("data_type:", c.data_type)
print("value:", c.value)

