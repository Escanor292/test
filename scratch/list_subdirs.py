import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
base = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)'
for sub in ['TimeLine', 'Word+ppt Báo Cáo']:
    p = os.path.join(base, sub)
    print(f"=== {sub} ===")
    for item in sorted(os.listdir(p)):
        ip = os.path.join(p, item)
        print(f"  {item} ({os.path.getsize(ip)} bytes)")

