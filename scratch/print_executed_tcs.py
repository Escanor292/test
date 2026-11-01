# -*- coding: utf-8 -*-
import json, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/tcs_summary.json', 'r', encoding='utf-8') as f:
    tcs = json.load(f)

print(f"Total TCs: {len(tcs)}")
executed = [tc for tc in tcs if tc['status'] in ['PASS', 'FAIL']]
print(f"Total Executed TCs: {len(executed)}")

for tc in executed:
    print(f"{tc['tc_id']} | {tc['status']} | {tc['module']} | {tc['evidence']}")

