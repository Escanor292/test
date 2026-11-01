# -*- coding: utf-8 -*-
import json, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/tcs_summary.json', 'r', encoding='utf-8') as f:
    tcs = json.load(f)

executed = [tc for tc in tcs if tc['status'] in ['PASS', 'FAIL']]
print(f"Total executed TCs: {len(executed)}")

# Map each TC to file type:
# If it already had a .png in evidence and is UI, keep .png.
# For others, assign .png or _response.json or _code.log
suite_map = []
for tc in executed:
    tid = tc['tc_id']
    ev = tc['evidence']
    stt = tc['status']
    
    # Determine target filename
    if ".png" in ev:
        filename = f"{tid}.png"
        kind = "UI"
    elif "Code" in ev or "src/" in ev:
        filename = f"{tid}_code.log"
        kind = "CODE"
    else:
        filename = f"{tid}_response.json"
        kind = "API"
        
    suite_map.append({
        'tid': tid,
        'module': tc['module'],
        'title': tc['title'],
        'status': stt,
        'kind': kind,
        'filename': filename,
        'steps': tc['steps'],
        'data': tc['data'],
        'expected': tc['expected'],
        'old_evidence': ev
    })

with open('scratch/suite_map.json', 'w', encoding='utf-8') as f:
    json.dump(suite_map, f, ensure_ascii=False, indent=2)

print("Mapped", len(suite_map), "TCs to evidence files.")
kinds = {}
for item in suite_map:
    kinds[item['kind']] = kinds.get(item['kind'], 0) + 1
print("Kinds breakdown:", kinds)

