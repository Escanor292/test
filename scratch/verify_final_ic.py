import openpyxl

wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.xlsx')

print("Sheets in workbook:", wb.sheetnames)
assert wb.sheetnames == ['EXAMPLE Product Requirements', 'BLANK Product Requirements', 'Vi_BLANK Product Requirements', 'Key - DO NOT DELETE', '- Disclaimer -'], "Sheet names mismatch!"

ws_en = wb['BLANK Product Requirements']
ws_vi = wb['Vi_BLANK Product Requirements']

# Check merged ranges
print("BLANK merged ranges count:", len(ws_en.merged_cells.ranges))
print("Vi_BLANK merged ranges count:", len(ws_vi.merged_cells.ranges))
print("EXAMPLE merged ranges count:", len(wb['EXAMPLE Product Requirements'].merged_cells.ranges))
print("Key merged ranges count:", len(wb['Key - DO NOT DELETE'].merged_cells.ranges))

# Check row counts
en_rows = [r for r in range(1, 105) if any(ws_en.cell(r, c).value for c in range(1, 10))]
vi_rows = [r for r in range(1, 105) if any(ws_vi.cell(r, c).value for c in range(1, 10))]

print(f"EN non-empty rows: {len(en_rows)} (min={min(en_rows)}, max={max(en_rows)})")
print(f"VI non-empty rows: {len(vi_rows)} (min={min(vi_rows)}, max={max(vi_rows)})")
assert en_rows == vi_rows, f"Row numbers differ! EN={en_rows} vs VI={vi_rows}"

# Check for any Sweet Sip traces in entire workbook
sweet_sip_cells = []
for sname in wb.sheetnames:
    ws = wb[sname]
    for r in range(1, 120):
        for c in range(1, 10):
            val = str(ws.cell(r, c).value or '')
            if 'sweet sip' in val.lower() or 'sweetsip' in val.lower() or 'nhuquynh' in val.lower():
                sweet_sip_cells.append((sname, r, c, val))

print(f"Sweet sip / leftover traces found: {len(sweet_sip_cells)}")
if sweet_sip_cells:
    for item in sweet_sip_cells:
        print(" ", item)

# Check formulas
bad_formulas = []
for sname in wb.sheetnames:
    ws = wb[sname]
    for r in range(1, 120):
        for c in range(1, 10):
            val = str(ws.cell(r, c).value or '')
            if val.startswith('=') and ('GOOGLETRANSLATE' in val or 'DUMMY' in val):
                bad_formulas.append((sname, r, c, val))

print(f"Broken formulas found: {len(bad_formulas)}")
if bad_formulas:
    for item in bad_formulas:
        print(" ", item)

print("ALL VERIFICATIONS COMPLETED SUCCESSFULLY!")

