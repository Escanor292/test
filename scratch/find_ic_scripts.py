import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

cmd = ['git', 'log', '--all', '--name-only', '--oneline']
res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
lines = res.stdout.splitlines()
for line in lines:
    if 'ic' in line.lower() or 'sweet' in line.lower() or '.py' in line:
        print(line)

