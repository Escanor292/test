from pptx import Presentation
import sys

sys.stdout.reconfigure(encoding='utf-8')

pptx_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Ppt Báo cáo Nhóm 2 - 23CT113.pptx"
prs = Presentation(pptx_path)

for idx in [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]:
    slide = prs.slides[idx - 1]
    print(f"\n==================== SLIDE {idx} ====================")
    for s_idx, shape in enumerate(slide.shapes):
        if shape.has_text_frame:
            for p_i, p in enumerate(shape.text_frame.paragraphs):
                print(f"  Shape {s_idx} P{p_i}: {repr(p.text)}")
        elif shape.has_table:
            t = shape.table
            print(f"  Shape {s_idx} [Table]: rows={len(t.rows)}, cols={len(t.columns)}")
            for r_i, r in enumerate(t.rows):
                print(f"    R{r_i}: {[c.text.strip().replace(chr(10), ' ') for c in r.cells]}")

