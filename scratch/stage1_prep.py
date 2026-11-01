import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')
wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx', data_only=False)
dash = wb['TongQuan_Dashboard']
print("Dashboard max_row:", dash.max_row, "max_column:", dash.max_column)
for r in range(24, dash.max_row + 1):
    print(f"R{r}: {[dash.cell(r, c).value for c in range(1, 10)]}")

rtm = wb['RTM']
print("\nRTM row 1 headers:", [rtm.cell(1, c).value for c in range(1, 14)])
print("RTM row 2:", [rtm.cell(2, c).value for c in range(1, 14)])

