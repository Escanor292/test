import openpyxl

wb = openpyxl.load_workbook("23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx")
ws = wb["RTM"]
for rng in ws.merged_cells.ranges:
    if "44" in str(rng):
        print("Merged range in row 44:", rng)

