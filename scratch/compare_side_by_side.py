import openpyxl

up_path = r'C:\Users\PHU TAI\.gemini\antigravity\brain\5e465315-d926-47b1-85b2-07a16df22fee\.user_uploaded\media_1793554062432_755491d1.xlsx'
wb = openpyxl.load_workbook(up_path, data_only=True)

ws_en = wb['BLANK Product Requirements']
ws_vi = wb['Vi_BLANK Product Requirements']

with open('scratch/side_by_side.txt', 'w', encoding='utf-8') as f:
    for r in range(1, 100):
        ven = [str(ws_en.cell(r, c).value or '').strip() for c in range(2, 6)]
        vvi = [str(ws_vi.cell(r, c).value or '').strip() for c in range(2, 6)]
        has_en = any(x for x in ven)
        has_vi = any(x for x in vvi)
        if has_en or has_vi:
            sep = " | "
            f.write(f'R{r:02d} EN: {sep.join(ven)}\n')
            f.write(f'R{r:02d} VI: {sep.join(vvi)}\n')
            f.write('-'*60 + '\n')

print('scratch/side_by_side.txt created successfully')

