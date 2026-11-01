import sys, openpyxl

sys.stdout.reconfigure(encoding='utf-8')
wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx', data_only=True)
ws = wb['TC List']

tids = {'TC_AUTH_009', 'TC_REWD_002', 'TC_REWD_003', 'TC_REWD_005', 'TC_PLED_001', 'TC_PLED_002', 'TC_PLED_003', 'TC_PLED_007', 'TC_COMM_007', 'TC_ADMN_004'}

header = [ws.cell(row=1, column=c).value for c in range(1, 15)]

for r in range(2, ws.max_row + 1):
    val = ws.cell(row=r, column=2).value
    if val in tids:
        row_vals = [ws.cell(row=r, column=c).value for c in range(1, 13)]
        print(f"\n=== {val} ===")
        for col_idx, (col_name, col_val) in enumerate(zip(header, row_vals), 1):
            if col_name in ['Phân hệ', 'Kịch bản kiểm thử', 'Các bước thực hiện', 'Dữ liệu kiểm thử', 'Kết quả mong đợi', 'Kết quả thực thi']:
                print(f"  {col_name}: {col_val}")
