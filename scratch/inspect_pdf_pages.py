import pypdf
import sys

sys.stdout.reconfigure(encoding='utf-8')
pdf_path = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Nhom02_Final_Report_Software_Testing.pdf'
reader = pypdf.PdfReader(pdf_path)

print(f"Total pages: {len(reader.pages)}")
for idx, page in enumerate(reader.pages, start=1):
    text = page.extract_text() or ""
    first_line = text.strip().split("\n")[0] if text.strip() else "[EMPTY]"
    last_line = text.strip().split("\n")[-1] if text.strip() else "[EMPTY]"
    print(f"Page {idx} (len {len(text)}): {repr(first_line[:60])} ... {repr(last_line[:60])}")

