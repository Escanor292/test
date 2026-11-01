from pptx import Presentation
import sys

sys.stdout.reconfigure(encoding='utf-8')

pptx_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Ppt Báo cáo Nhóm 2 - 23CT113.pptx"
prs = Presentation(pptx_path)

print(f"Total slides: {len(prs.slides)}")

for idx, slide in enumerate(prs.slides, start=1):
    print(f"\n==================== SLIDE {idx} ====================")
    for s_idx, shape in enumerate(slide.shapes):
        if shape.has_text_frame:
            txt = shape.text_frame.text.strip().replace("\n", " | ")
            print(f"  Shape {s_idx} [Text]: {txt[:120]}")
        elif shape.has_table:
            t = shape.table
            print(f"  Shape {s_idx} [Table]: rows={len(t.rows)}, cols={len(t.columns)}")
            for r_i, r in enumerate(t.rows):
                row_str = " | ".join(c.text.strip().replace("\n", " ") for c in r.cells)
                print(f"    R{r_i}: {row_str[:120]}")
        else:
            print(f"  Shape {s_idx} [Other]: {type(shape).__name__}")

