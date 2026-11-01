import zipfile

with zipfile.ZipFile("scratch/temp_tc.xlsx", "r") as zin:
    print(zin.read("xl/workbook.xml").decode("utf-8"))
    print(zin.read("xl/_rels/workbook.xml.rels").decode("utf-8"))

