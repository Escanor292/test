import docx
import sys

sys.stdout.reconfigure(encoding='utf-8')
word_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"
doc = docx.Document(word_path)

print(f"Total paragraphs: {len(doc.paragraphs)}")
print(f"Total tables: {len(doc.tables)}")

for i, p in enumerate(doc.paragraphs):
    txt = p.text.strip()
    if any(h in txt for h in ["CHƯƠNG", "1.", "2.", "3.", "4.", "5.", "6.", "MỤC LỤC", "DANH MỤC"]):
        print(f"P{i}: {txt[:100]}")

for idx, t in enumerate(doc.tables):
    first_row = [c.text.strip().replace("\n", " ") for c in t.rows[0].cells]
    print(f"Table {idx}: rows={len(t.rows)}, cols={len(t.columns)}, header={first_row}")

