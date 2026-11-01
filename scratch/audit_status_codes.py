# -*- coding: utf-8 -*-
import openpyxl, os, json, glob, sys, re

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx', data_only=True)
ws_tc = wb['TC List']
rows = list(ws_tc.iter_rows(values_only=True))[1:]

ev_dir = '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/evidence'

mismatches = []
for r in rows:
    tid = str(r[1] or '').strip()
    expected = str(r[8] or '')
    stt = str(r[9] or '').strip().upper()
    ev = str(r[10] or '')

    # Find JSON file for this TC
    json_path = os.path.join(ev_dir, f'{tid}_response.json')
    if os.path.exists(json_path):
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            actual_sc = data.get('response', {}).get('statusCode')
            payload = data.get('request', {}).get('payload')
            body = data.get('response', {}).get('body')

            # Extract expected HTTP code from expected or evidence text
            exp_codes = re.findall(r'(?:HTTP\s*|mã\s*)?(\b[2345]\d\d\b)', expected)
            if not exp_codes:
                exp_codes = re.findall(r'HTTP\s*(\b[2345]\d\d\b)', ev)

            # Check if actual_sc matches any expected code
            is_match = False
            if exp_codes:
                if str(actual_sc) in exp_codes:
                    is_match = True
            elif actual_sc in [200, 201] and stt in ['PASS', 'ĐẠT']:
                is_match = True

            if not is_match and stt in ['PASS', 'ĐẠT']:
                mismatches.append({
                    'tid': tid,
                    'title': r[3],
                    'stt': stt,
                    'actual_sc': actual_sc,
                    'exp_codes': exp_codes,
                    'expected': expected[:60],
                    'body': str(body)[:70]
                })
        except Exception as e:
            pass

print(f"Total mismatches found: {len(mismatches)}")
for m in mismatches:
    print(f"{m['tid']}: Actual HTTP {m['actual_sc']} vs Expected {m['exp_codes']} | Body: {m['body']}")

