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
wb.save("scratch/test_inject.xlsx")

# Read zip
with zipfile.ZipFile("scratch/test_inject.xlsx", "r") as zin:
    sheet_xml = zin.read("xl/worksheets/sheet1.xml").decode("utf-8")
    print("Original cell C1 in XML:")
    c1_match = re.search(r'<c r="C1"[^>]*>.*?</c>', sheet_xml)
    if c1_match:
        print(c1_match.group(0))
        
    # Inject <v>30</v>
    new_c1 = re.sub(r'(<f>[^<]+</f>)', r'\1<v>30</v>', c1_match.group(0))
    new_xml = sheet_xml.replace(c1_match.group(0), new_c1)

# Write back
with zipfile.ZipFile("scratch/test_inject.xlsx", "w") as zout:
    with zipfile.ZipFile("scratch/test_inject.xlsx", "r") as zin:
        for item in zin.infolist():
            if item.filename == "xl/worksheets/sheet1.xml":
                zout.writestr(item, new_xml)
            else:
                zout.writestr(item, zin.read(item.filename))

# Test with data_only=True
wb_val = openpyxl.load_workbook("scratch/test_inject.xlsx", data_only=True)
print("data_only=True value:", wb_val["Test"].cell(1, 3).value)

# Test with data_only=False
wb_form = openpyxl.load_workbook("scratch/test_inject.xlsx", data_only=False)
print("data_only=False value:", wb_form["Test"].cell(1, 3).value)

