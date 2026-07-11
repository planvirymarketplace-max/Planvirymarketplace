from pathlib import Path
import re

source = Path('DESTINATION TAXONOMY.docx.md')
text = source.read_text(encoding='utf-8', errors='replace')
lines = text.splitlines()

regions = []
entries = []
region = None
country = None

for line in lines:
    stripped = line.strip()
    if not stripped:
        continue
    if stripped.startswith('**') and stripped.endswith('**'):
        inner = stripped[2:-2].strip()
        if inner.startswith('Explore '):
            country = inner[len('Explore '):].strip()
            entries.append({'region': region, 'country': country, 'cities': []})
        elif inner.isupper():
            region = inner
            if region not in regions:
                regions.append(region)
        continue
    if stripped.startswith('* [') and country is not None:
        m = re.match(r'\* \[(.*?)\]\((.*?)\)', stripped)
        if m:
            entries[-1]['cities'].append({'name': m.group(1), 'url': m.group(2)})

unique_regions = sorted({e['region'] for e in entries if e['region']})
print('regions', len(unique_regions))
print('countries', len(entries))
print('top 20 regions', unique_regions[:20])
print('first 20 countries:')
for e in entries[:20]:
    print(f"{e['region']} | {e['country']} | {len(e['cities'])}")
print('last 20 countries:')
for e in entries[-20:]:
    print(f"{e['region']} | {e['country']} | {len(e['cities'])}")
print('total cities', sum(len(e['cities']) for e in entries))

# report duplicates
country_counts = {}
for e in entries:
    country_counts[e['country']] = country_counts.get(e['country'], 0) + 1
duplicates = {k: v for k, v in country_counts.items() if v > 1}
print('duplicate countries', len(duplicates))
for k, v in sorted(duplicates.items(), key=lambda item: (-item[1], item[0]))[:20]:
    print(k, v)
