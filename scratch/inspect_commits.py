import subprocess, io, openpyxl, sys

sys.stdout.reconfigure(encoding='utf-8')

for c in ['67192e7', '0439863', 'a3a2cb0']:
    try:
        cmd = ['git', 'show', f'{c}:23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.xlsx']
        out = subprocess.check_output(cmd)
        wb = openpyxl.load_workbook(io.BytesIO(out), data_only=False)
        print(f"\n=== Commit {c} ===")
        print("Sheets:", wb.sheetnames)
        for s in wb.sheetnames:
            ws = wb[s]
            print(f"  {s}: max_row={ws.max_row}, title={ws.cell(row=2, column=3).value}")
    except Exception as e:
        print(f"Error for {c}: {e}")

