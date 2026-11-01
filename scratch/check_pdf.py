import pypdf
import sys

sys.stdout.reconfigure(encoding='utf-8')
pdf_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Nhom02_Final_Report_Software_Testing.pdf"
reader = pypdf.PdfReader(pdf_path)
print(f"Total pages: {len(reader.pages)}")
text_full = ""
for i, page in enumerate(reader.pages):
    t = page.extract_text()
    if any(k in t for k in ["105", "104", "89 PASS", "76 PASS", "4 FAIL", "28 FAIL", "BUG-004", "BUG-026"]):
        print(f"--- Page {i+1} ---")
        for line in t.splitlines():
            if any(k in line for k in ["TC", "PASS", "FAIL", "BUG", "Chưa chạy"]):
                print("  ", line)

