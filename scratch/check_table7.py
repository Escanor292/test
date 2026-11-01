import docx

word_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx"
doc = docx.Document(word_path)
t7 = doc.tables[7]
print("Table 7 rows:", len(t7.rows))
for r in t7.rows:
    print([c.text.strip().replace("\n", " ") for c in r.cells])

