import zipfile
import re
import openpyxl

# Test injecting <v> into formula cell
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Test"
ws.cell(1, 1, 10)
ws.cell(1, 2, 20)
ws.cell(1, 3, "=SUM(A1:B1)")
src = "scratch/test_inject.xlsx"
dst = "scratch/test_inject_out.xlsx"
wb.save(src)

with zipfile.ZipFile(src, "r") as zin, zipfile.ZipFile(dst, "w") as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == "xl/worksheets/sheet1.xml":
            xml = data.decode("utf-8")
            # replace <v></v> with <v>30</v>
            xml = xml.replace('<f>SUM(A1:B1)</f><v></v>', '<f>SUM(A1:B1)</f><v>30</v>')
            zout.writestr(item, xml.encode("utf-8"))
        else:
            zout.writestr(item, data)

# Test with data_only=True
wb_val = openpyxl.load_workbook(dst, data_only=True)
print("data_only=True value:", wb_val["Test"].cell(1, 3).value)

# Test with data_only=False
wb_form = openpyxl.load_workbook(dst, data_only=False)
print("data_only=False value:", wb_form["Test"].cell(1, 3).value)

