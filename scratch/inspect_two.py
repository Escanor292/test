import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('scripts/run_master_real_suite.js', 'r', encoding='utf-8') as f:
    text = f.read()

for tid in ['TC_CAMP_013', 'TC_BLOG_008']:
    i = text.find("tid: '" + tid + "'")
    j = text.find("tid: '", i + 10)
    print('=== ' + tid + ' ===')
    print(text[i:j])

