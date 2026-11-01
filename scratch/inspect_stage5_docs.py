import docx
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')
base = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)"

files = [
    "Test Plan_23CT113_Nhom02.docx",
    "Test Report_23CT113_Nhom02.docx",
    "TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx",
    "TimeLine/Biên Bản Họp Nhóm Lần 3 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx"
]

for f in files:
    path = os.path.join(base, f)
    print(f"\n==================== {f} ====================")
    if not os.path.exists(path):
        print("FILE NOT FOUND!")
        continue
    doc = docx.Document(path)
    print(f"Paragraphs: {len(doc.paragraphs)}, Tables: {len(doc.tables)}")
    
    # Check bad phrases or specific sections
    for i, p in enumerate(doc.paragraphs):
        txt = p.text.strip()
        for kw in ["chưa chạy", "để trống", "giao sách", "105", "89", "93", "26", "24", "bug", "lỗi", "chưa thực hiện"]:
            if kw in txt.lower():
                print(f"  P{i}: {txt[:120]}")
                break

