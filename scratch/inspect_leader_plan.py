import docx
import sys

sys.stdout.reconfigure(encoding='utf-8')
path = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx'
doc = docx.Document(path)
print(f'Total tables: {len(doc.tables)}')
for idx, t in enumerate(doc.tables):
    print(f'\nTable {idx}: rows={len(t.rows)}, cols={len(t.columns)}')
    for r_i, r in enumerate(t.rows):
        cells = [c.text.strip().replace('\n', ' ') for c in r.cells]
        if r_i < 5 or r_i == len(t.rows) - 1:
            print(f'  R{r_i}: {cells[:4]}')
        elif r_i == 5:
            print(f'  ... ({len(t.rows)-2} rows total)')

