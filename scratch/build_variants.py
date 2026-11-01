# -*- coding: utf-8 -*-
"""Tao cac bien the nen trang tu bao cao hien tai de do so trang that bang Word."""
import shutil

import docx
from docx.shared import Pt, Cm

REPORT = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"


def base_copy(name):
    dst = f"scratch/_v_{name}.docx"
    shutil.copy(REPORT, dst)
    return dst, docx.Document(dst)


def drop_chapter_breaks(d):
    for p in d.paragraphs:
        if p.style.name == "Heading 1" and p.text.strip().startswith("CHƯƠNG"):
            p.paragraph_format.page_break_before = False


def comp_body(d):
    drop_chapter_breaks(d)
    st = d.styles["Normal"]
    pf = st.paragraph_format
    pf.line_spacing = 1.15
    pf.space_before = Pt(0)
    pf.space_after = Pt(3)
    for p in d.paragraphs:
        if p.style.name == "Normal":
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(3)
            p.paragraph_format.line_spacing = 1.15


def shrink_appendix(d):
    comp_body(d)
    start = None
    for i, p in enumerate(d.paragraphs):
        if p.text.strip().startswith("PHỤ LỤC B"):
            start = i
            break
    if start is None:
        return
    for p in d.paragraphs[start:]:
        if p.style.name.startswith("Heading"):
            continue
        p.paragraph_format.line_spacing = 1.0
        p.paragraph_format.space_after = Pt(1)
        for r in p.runs:
            r.font.size = Pt(11)
    # tai lieu tham khao gon hon
    for p in d.paragraphs:
        if p.text.strip().startswith("[") and "20" in p.text:
            p.paragraph_format.line_spacing = 1.0
            p.paragraph_format.space_after = Pt(2)
            for r in p.runs:
                r.font.size = Pt(11)


variants = {"A": drop_chapter_breaks, "B": comp_body, "C": shrink_appendix}
for name, fn in variants.items():
    dst, d = base_copy(name)
    fn(d)
    d.save(dst)
    print("built", dst)
