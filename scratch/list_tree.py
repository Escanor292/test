import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
base = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)'
for item in sorted(os.listdir(base)):
    p = os.path.join(base, item)
    if os.path.isdir(p):
        print(f"[DIR]  {item} ({len(os.listdir(p))} items)")
    else:
        print(f"[FILE] {item} ({os.path.getsize(p)} bytes)")

