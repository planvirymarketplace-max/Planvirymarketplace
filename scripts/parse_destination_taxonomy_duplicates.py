from pathlib import Path
import re
from collections import defaultdict

source = Path('DESTINATION TAXONOMY.docx.md')
text = source.read_text(encoding='utf-8', errors='replace')
lines = text.splitlines()

region = None
country = None
entries = []

for line_no, line in enumerate(lines, start=1):
    stripped = line.strip()
    if not stripped:
        continue
    if stripped.startswith('**') and stripped.endswith('**'):
        inner = stripped[2:-2].strip()
        if inner.startswith('Explore '):
            country = inner[len('Explore '):].strip()
            entries.append({'region': region, 'country': country, 'cities': [], 'line': line_no})
        elif inner.isupper():
            region = inner
        continue
    if stripped.startswith('* [') and country is not None:
        m = re.match(r'\* \[(.*?)\]\((.*?)\)', stripped)
        if m:
            entries[-1]['cities'].append({'name': m.group(1), 'url': m.group(2), 'line': line_no})

print(f'regions {len(set(e["region"] for e in entries))}')
print(f'countries {len(entries)}')

by_country = defaultdict(list)
for e in entries:
    by_country[(e['region'], e['country'])].append(e)

for key, group in sorted(by_country.items(), key=lambda x: (x[0][0] or '', x[0][1])):
    if len(group) > 1:
        print('DUPLICATE:', key[0], '|', key[1], '| count=', len(group))
        for item in group:
            city_names = [c['name'] for c in item['cities'][:5]]
            print('  line', item['line'], 'cities', len(item['cities']), 'sample', city_names)
