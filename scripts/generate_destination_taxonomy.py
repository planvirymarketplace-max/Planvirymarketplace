from pathlib import Path
import re

SOURCE = Path('DESTINATION TAXONOMY.docx.md')
OUTPUT_TS = Path('apps/consumer-web/src/planviry/data/destinationTaxonomy.ts')
OUTPUT_JSON = Path('data/destination_taxonomy.json')

line_pattern = re.compile(r'^\*\s*\[(.*?)\]\((.*?)\)')
link_pattern = re.compile(r'^\[(.*?)\]\((.*?)\)')

text = SOURCE.read_text(encoding='utf-8', errors='replace')
lines = [line.rstrip() for line in text.splitlines()]

regions = []
entries = []
region = None
country = None
current = None

for i, raw_line in enumerate(lines):
    line = raw_line.strip()
    if not line:
        continue
    if line.startswith('**') and line.endswith('**'):
        inner = line[2:-2].strip()
        if inner.startswith('Explore '):
            country = inner[len('Explore '):].strip()
            current = {
                'region': region,
                'country': country,
                'overviewUrl': None,
                'cities': [],
            }
            entries.append(current)
            continue
        if inner.isupper() and not inner.startswith('Explore'):
            region = inner
            if region not in regions:
                regions.append(region)
            continue

    if current is None:
        continue

    if line.startswith('*'):
        m = line_pattern.match(line)
        if m:
            city = m.group(1).replace('**', '').strip()
            city_url = m.group(2).strip()
            current['cities'].append({'name': city, 'url': city_url})
        continue

    if current['overviewUrl'] is None:
        m = link_pattern.match(line)
        if m and 'learn more' in m.group(1).lower():
            current['overviewUrl'] = m.group(2).strip()

# merge duplicate countries by region+country
merged = {}
for entry in entries:
    key = (entry['region'], entry['country'])
    if key not in merged:
        merged[key] = {
            'region': entry['region'],
            'country': entry['country'],
            'overviewUrl': entry['overviewUrl'],
            'cities': [],
        }
    target = merged[key]
    if target['overviewUrl'] is None:
        target['overviewUrl'] = entry['overviewUrl']
    seen = {(city['name'], city['url']) for city in target['cities']}
    for city in entry['cities']:
        key_city = (city['name'], city['url'])
        if key_city not in seen:
            target['cities'].append(city)
            seen.add(key_city)

regions_by_name = {region: [] for region in regions}
for key, entry in merged.items():
    regions_by_name[entry['region']].append(entry)

for region_name in regions_by_name:
    regions_by_name[region_name].sort(key=lambda x: x['country'])

output_data = [
    {
        'region': region_name,
        'countries': regions_by_name[region_name],
    }
    for region_name in regions
]

# write JSON file
import json
OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
OUTPUT_JSON.write_text(json.dumps(output_data, ensure_ascii=False, indent=2), encoding='utf-8')

# write TS file
with OUTPUT_TS.open('w', encoding='utf-8') as ts_file:
    ts_file.write('export interface DestinationCity {\n')
    ts_file.write('  name: string;\n')
    ts_file.write('  url: string;\n')
    ts_file.write('}\n\n')
    ts_file.write('export interface DestinationCountry {\n')
    ts_file.write('  region: string;\n')
    ts_file.write('  country: string;\n')
    ts_file.write('  overviewUrl: string | null;\n')
    ts_file.write('  cities: DestinationCity[];\n')
    ts_file.write('}\n\n')
    ts_file.write('export interface DestinationRegion {\n')
    ts_file.write('  region: string;\n')
    ts_file.write('  countries: DestinationCountry[];\n')
    ts_file.write('}\n\n')
    ts_file.write('export const DESTINATION_TAXONOMY: DestinationRegion[] = ')
    ts_file.write(json.dumps(output_data, ensure_ascii=False, indent=2))
    ts_file.write(' as const;\n')

print('generated', OUTPUT_TS.resolve())
print('generated', OUTPUT_JSON.resolve())
print('regions:', len(output_data))
print('countries:', sum(len(region['countries']) for region in output_data))
print('cities:', sum(len(country['cities']) for region in output_data for country in region['countries']))
