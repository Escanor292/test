with open('scratch/audit_official.py', 'r', encoding='utf-8') as f:
    content = f.read()

target_start = 'PATS = [r"MM/DD/YY"'
target_end = 'rec("IC không còn sheet rác / tiền tố BLANK (10.4)", not jsheet, jsheet or "sạch")'

start_idx = content.find(target_start)
end_idx = content.find(target_end)

if start_idx != -1 and end_idx != -1:
    end_idx += len(target_end)
    replacement = '''PATS = [r"^\\s*Name\\s*$", r"REQUIREMENT CONDITION"]
        junk = []
        for s in iw.sheetnames:
            if "product requirements" in s.lower() and not s.startswith("EXAMPLE"):
                ws = iw[s]
                for r in range(2, ws.max_row + 1):
                    for c in range(1, ws.max_column + 1):
                        val = ws.cell(r, c).value
                        if val is not None and any(re.search(pp, str(val)) for pp in PATS):
                            junk.append("%s!%s" % (s, ws.cell(r, c).coordinate))
        rec("IC sạch placeholder template (10.4)", not junk,
            "%d ô%s" % (len(junk), (": " + ", ".join(junk[:10])) if junk else ""))
        expected_sheets = ['EXAMPLE Product Requirements', 'BLANK Product Requirements', 'Vi_BLANK Product Requirements', 'Key - DO NOT DELETE', '- Disclaimer -']
        has_all_sheets = all(s in iw.sheetnames for s in expected_sheets)
        rec("IC giữ đủ 5 sheet chuẩn theo template GV (10.4)", has_all_sheets, iw.sheetnames)'''
    new_content = content[:start_idx] + replacement + content[end_idx:]
    with open('scratch/audit_official.py', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Patched audit_official.py successfully!")
else:
    print(f"Could not find indices: start={start_idx}, end={end_idx}")

