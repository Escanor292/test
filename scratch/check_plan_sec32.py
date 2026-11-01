import docx
import sys

sys.stdout.reconfigure(encoding='utf-8')
doc = docx.Document("23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Plan_23CT113_Nhom02.docx")
for i, p in enumerate(doc.paragraphs):
    if "3.2" in p.text or "ngoài phạm vi" in p.text.lower() or "để trống" in p.text.lower():
        print(f"P{i}: {p.text}")

