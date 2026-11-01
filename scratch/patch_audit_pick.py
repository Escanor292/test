with open('scratch/audit_official.py', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''        def _pick(want_vi):
            for s in nm:
                x = _n(s)
                if "product requirements" in x and x.startswith(("vi", "vn")) == want_vi: return s
            return None'''

replacement = '''        def _pick(want_vi):
            for s in nm:
                if s.startswith("EXAMPLE"): continue
                x = _n(s)
                if "product requirements" in x and x.startswith(("vi", "vn")) == want_vi: return s
            return None'''

if target in content:
    content = content.replace(target, replacement)
    with open('scratch/audit_official.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed _pick in audit_official.py")
else:
    print("Target not found for _pick")

