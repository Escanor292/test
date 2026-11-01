import docx
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

folder = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)'
for root, dirs, files in os.walk(folder):
    for f in files:
        if f.endswith('.docx'):
            path = os.path.join(root, f)
            doc = docx.Document(path)
            for p in doc.paragraphs:
                if 'TC_CERT_005.png' in p.text or 'trùng TC_' in p.text:
                    print(f"File {f}: Paragraph: {p.text}")
            for table in doc.tables:
                for row in table.rows:
                    for cell in row.cells:
                        if 'TC_CERT_005.png' in cell.text or 'trùng TC_' in cell.text:
                            print(f"File {f}: Table cell: {cell.text}")

