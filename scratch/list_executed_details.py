# -*- coding: utf-8 -*-
import json, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/tcs_summary.json', 'r', encoding='utf-8') as f:
    tcs = json.load(f)

executed = [tc for tc in tcs if tc['status'] in ['PASS', 'FAIL']]
print(f"Total executed: {len(executed)}")

for tc in executed:
    tid = tc['tc_id']
    steps = tc['steps'].replace('\n', ' ')
    title = tc['title']
    print(f"{tid} | {tc['module']} | {tc['status']} | {title[:35]} | steps: {steps[:45]}")

