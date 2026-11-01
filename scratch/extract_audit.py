# -*- coding: utf-8 -*-
import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('PROMPT_KiemTraSauKhiLam_TuTeFund.md', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'```python(.*?)```', text, re.DOTALL)
print('Found python code blocks:', len(matches))
for i, m in enumerate(matches):
    print(f'Block {i}: length {len(m)}')
    if 'rec(' in m:
        with open('scratch/audit_official.py', 'w', encoding='utf-8') as out:
            out.write('# -*- coding: utf-8 -*-\nimport sys\nsys.stdout.reconfigure(encoding="utf-8")\n' + m.strip())
        print(f'Saved Block {i} to scratch/audit_official.py')

