import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

cmd = ['git', 'show', '--stat', '0439863']
res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
print("Commit 0439863:")
print(res.stdout)

cmd = ['git', 'show', '--stat', '67192e7']
res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
print("Commit 67192e7:")
print(res.stdout)

