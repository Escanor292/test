import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

word_path = os.path.abspath("23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx")
pdf_path = os.path.abspath("23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Nhom02_Final_Report_Software_Testing.pdf")

print(f"Word path: {word_path}")
print(f"PDF path: {pdf_path}")

try:
    import win32com.client
    word = win32com.client.DispatchEx("Word.Application")
    word.Visible = False
    doc = word.Documents.Open(word_path)
    # 17 is wdExportFormatPDF
    doc.SaveAs(pdf_path, FileFormat=17)
    doc.Close()
    word.Quit()
    print("Successfully exported PDF via win32com!")
except Exception as e:
    print(f"win32com error: {e}")

