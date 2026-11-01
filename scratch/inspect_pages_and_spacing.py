import docx
import sys

sys.stdout.reconfigure(encoding='utf-8')
word_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"
doc = docx.Document(word_path)

print(f"Total paragraphs: {len(doc.paragraphs)}")
empty_p = 0
for i, p in enumerate(doc.paragraphs):
    if not p.text.strip():
        empty_p += 1
        print(f"Empty paragraph at P{i}")
print(f"Total empty paragraphs: {empty_p}")

# Check spacing on paragraphs
for i, p in enumerate(doc.paragraphs[:20]):
    pf = p.paragraph_format
    print(f"P{i} [style={p.style.name}]: space_before={pf.space_before}, space_after={pf.space_after}, line_spacing={pf.line_spacing}")

