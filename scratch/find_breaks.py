import docx
import sys

sys.stdout.reconfigure(encoding='utf-8')
word_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"
doc = docx.Document(word_path)

print(f"Total sections: {len(doc.sections)}")
for s_i, sec in enumerate(doc.sections):
    print(f"Section {s_i}: top_margin={sec.top_margin.pt}, bottom_margin={sec.bottom_margin.pt}, left={sec.left_margin.pt}, right={sec.right_margin.pt}")

print("\nChecking page breaks in paragraphs:")
for i, p in enumerate(doc.paragraphs):
    # Check runs for page break
    breaks = []
    for r in p.runs:
        if '<w:br w:type="page"/>' in r._r.xml:
            breaks.append('run_page_break')
    if p.paragraph_format.page_break_before:
        breaks.append('page_break_before')
    if breaks:
        print(f"P{i}: {breaks} | {p.text[:60]}")

