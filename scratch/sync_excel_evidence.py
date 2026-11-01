# -*- coding: utf-8 -*-
import openpyxl, json, os, glob, hashlib, collections, sys

sys.stdout.reconfigure(encoding='utf-8')

tc_file = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx"
suite_map_path = "scratch/suite_map.json"

with open(suite_map_path, 'r', encoding='utf-8') as f:
    suite_map = json.load(f)

map_by_tid = {item['tid']: item for item in suite_map}

wb = openpyxl.load_workbook(tc_file)
ws = wb['TC List']

updated = 0
for row in ws.iter_rows(min_row=2):
    tid_cell = row[1]
    ev_cell = row[10]
    tid = str(tid_cell.value or '').strip()
    if tid in map_by_tid:
        item = map_by_tid[tid]
        old_ev = str(ev_cell.value or '')
        # Construct updated evidence string
        new_ev = f"evidence/{item['filename']}; {item['old_evidence']}"
        if item['filename'] in old_ev:
            new_ev = old_ev # already includes filename
        ev_cell.value = new_ev
        updated += 1

wb.save(tc_file)
print(f"Updated {updated} test cases in {tc_file} with exact evidence paths.")

# Check evidence directory
ev_dir = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/evidence"
ev_files = [p for p in glob.glob(os.path.join(ev_dir, "*")) if os.path.isfile(p) and not p.endswith(".gitkeep")]
print(f"Total files in evidence: {len(ev_files)}")

# Check duplicate MD5
md5 = collections.Counter(hashlib.md5(open(p, "rb").read()).hexdigest() for p in ev_files)
dupimg = [h for h, c in md5.items() if c > 1]
print(f"Duplicate MD5 count: {len(dupimg)}")
if dupimg:
    for h in dupimg:
        dups = [p for p in ev_files if hashlib.md5(open(p, "rb").read()).hexdigest() == h]
        print(f"  Hash {h} shared by: {dups}")

