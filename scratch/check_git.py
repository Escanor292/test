import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

res = subprocess.run(['git', 'log', '--oneline', '-n', '15'], capture_output=True, text=True, encoding='utf-8', errors='replace')
print("Git log:")
print(res.stdout)

res2 = subprocess.run(['git', 'status', '--short'], capture_output=True, text=True, encoding='utf-8', errors='replace')
print("Git status:")
print(res2.stdout)

