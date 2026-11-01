# -*- coding: utf-8 -*-
import json, re, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/tcs_summary.json', 'r', encoding='utf-8') as f:
    tcs = json.load(f)

executed_tids = {tc['tc_id'] for tc in tcs if tc['status'] in ['PASS', 'FAIL']}
print(f"Total executed TCs in Excel: {len(executed_tids)}")

with open('scripts/run_master_real_suite.js', 'r', encoding='utf-8') as f:
    script_content = f.read()

found_tids = set(re.findall(r'TC_[A-Z0-9]+_\d+', script_content))
print(f"Total TCs covered in script: {len(found_tids)}")

missing = executed_tids - found_tids
print(f"Missing TCs ({len(missing)}):", sorted(list(missing)))

