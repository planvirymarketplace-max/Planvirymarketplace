#!/usr/bin/env python3
"""
CSV to JSON conversion script.
Reads all CSV files in data/ and writes normalized JSON output.
Large CSVs are split into part files under 100 MB.
"""

import csv
import json
import os
import re
import sys
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional

ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / 'data'
OUTPUT_DIR = DATA_DIR / 'json'
MAX_BYTES = 96 * 1024 * 1024

CATEGORY_MAPPING = {
    'afghan_restaurant': 'catering',
    'american_restaurant': 'catering',
    'asian_restaurant': 'catering',
    'bar': 'bar_club',
    'bbq_joint': 'catering',
    'brewery': 'bar_club',
    'bubble_tea_shop': 'catering',
    'burger_joint': 'catering',
    'cafe': 'catering',
    'caribbean_restaurant': 'catering',
    'chinese_restaurant': 'catering',
    'coffee_shop': 'catering',
    'cocktail_bar': 'bar_club',
    'dance_club': 'bar_club',
    'dessert_shop': 'catering',
    'dive_bar': 'bar_club',
    'donut_shop': 'catering',
    'fast_food': 'catering',
    'food_court': 'catering',
    'french_restaurant': 'catering',
    'gastropub': 'bar_club',
    'german_restaurant': 'catering',
    'greek_restaurant': 'catering',
    'hookah_bar': 'bar_club',
    'ice_cream_shop': 'catering',
    'indian_restaurant': 'catering',
    'irish_pub': 'bar_club',
    'italian_restaurant': 'catering',
    'japanese_restaurant': 'catering',
    'juice_bar': 'catering',
    'karaoke_bar': 'bar_club',
    'korean_restaurant': 'catering',
    'latin_american_restaurant': 'catering',
    'mexican_restaurant': 'catering',
    'middle_eastern_restaurant': 'catering',
    'nightclub': 'bar_club',
    'pizza_restaurant': 'catering',
    'pub': 'bar_club',
    'ramen_shop': 'catering',
    'restaurant': 'catering',
    'sandwich_shop': 'catering',
    'seafood_restaurant': 'catering',
    'sports_bar': 'bar_club',
    'steakhouse': 'catering',
    'sushi_restaurant': 'catering',
    'tapas_restaurant': 'catering',
    'tea_house': 'catering',
    'thai_restaurant': 'catering',
    'turkish_restaurant': 'catering',
    'vegan_restaurant': 'catering',
    'vegetarian_restaurant': 'catering',
    'vietnamese_restaurant': 'catering',
    'wine_bar': 'bar_club',
    'wings_joint': 'catering',
    'art_museum': 'wedding_venue',
    'auditorium': 'wedding_venue',
    'banquet_hall': 'wedding_venue',
    'conference_center': 'wedding_venue',
    'convention_center': 'wedding_venue',
    'cultural_center': 'wedding_venue',
    'event_space': 'wedding_venue',
    'exhibition_center': 'wedding_venue',
    'gallery': 'wedding_venue',
    'hotel': 'hotel_accommodations',
    'inn': 'hotel_accommodations',
    'motel': 'hotel_accommodations',
    'museum': 'wedding_venue',
    'music_venue': 'wedding_venue',
    'resort': 'hotel_accommodations',
    'stadium': 'wedding_venue',
    'theater': 'wedding_venue',
    'venue': 'wedding_venue',
    'venue_and_event_space': 'wedding_venue',
    'wedding_chapel': 'wedding_venue',
    'wedding_venue': 'wedding_venue',
    'band': 'wedding_band',
    'clown': 'bachelorette_activity',
    'comedy_club': 'wedding_dj',
    'dj_service': 'wedding_dj',
    'entertainment_service': 'wedding_dj',
    'karaoke': 'wedding_dj',
    'magician': 'bachelorette_activity',
    'musician': 'wedding_band',
    'musical_band': 'wedding_band',
    'orchestra': 'wedding_band',
    'performing_arts': 'wedding_band',
    'symphony': 'wedding_band',
    'photographer': 'photography',
    'photo_booth': 'photo_booth',
    'videography': 'videography',
    'video_production': 'videography',
    'beauty_salon': 'hair_makeup',
    'cosmetics': 'hair_makeup',
    'day_spa': 'hair_makeup',
    'hair_salon': 'hair_makeup',
    'makeup_artist': 'hair_makeup',
    'nail_salon': 'hair_makeup',
    'spa': 'hair_makeup',
    'spas': 'hair_makeup',
    'tattoo_and_piercing': 'hair_makeup',
    'wellness_center': 'hair_makeup',
    'airport': 'transportation',
    'airport_shuttle': 'transportation',
    'boat_tours': 'transportation',
    'bus_station': 'transportation',
    'cruise': 'honeymoon_travel',
    'fishing_charter': 'transportation',
    'limousine_service': 'transportation',
    'rental_car': 'transportation',
    'taxi': 'transportation',
    'tour': 'transportation',
    'tour_operator': 'transportation',
    'travel_agency': 'honeymoon_travel',
    'travel_service': 'honeymoon_travel',
    'event_planner': 'wedding_planner',
    'event_planning': 'wedding_planner',
    'party_and_event_planning': 'wedding_planner',
    'wedding_planner': 'wedding_planner',
    'campground': 'hotel_accommodations',
    'equipment_rental': 'decor_rentals',
    'party_rental': 'decor_rentals',
    'rv_rental': 'hotel_accommodations',
    'vacation_rental': 'hotel_accommodations',
    'adventure_sport': 'bachelorette_activity',
    'amusement_park': 'bachelorette_activity',
    'attraction': 'bachelorette_activity',
    'bowling_alley': 'bachelorette_activity',
    'casino': 'bachelorette_activity',
    'golf_course': 'bachelorette_activity',
    'hiking_area': 'bachelorette_activity',
    'kayaking': 'bachelorette_activity',
    'outdoor_activity': 'bachelorette_activity',
    'rafting': 'bachelorette_activity',
    'recreation_center': 'bachelorette_activity',
    'ski_area': 'bachelorette_activity',
    'sports_complex': 'bachelorette_activity',
    'bakery': 'catering',
    'butcher': 'catering',
    'clothing_store': 'dress_attire',
    'department_store': 'favors_gifts',
    'florist': 'florist',
    'gift_shop': 'favors_gifts',
    'jewelry_store': 'jeweler',
    'market': 'catering',
    'shopping_mall': 'favors_gifts',
    'default': 'wedding_venue'
}


def slugify(value: str) -> str:
    value = value or ''
    value = value.lower()
    value = re.sub(r"[^a-z0-9\s-]", "", value)
    value = re.sub(r"\s+", "-", value)
    return value.strip("-")


def parse_json_array(value: Optional[str]) -> List[str]:
    if not value:
        return []
    try:
        parsed = json.loads(value.replace("'", '"'))
        if isinstance(parsed, list):
            return [str(item).strip() for item in parsed if item is not None]
    except Exception:
        pass
    return [str(value).strip()]


def first_value(value: Optional[str]) -> Optional[str]:
    values = parse_json_array(value)
    return values[0] if values else None


def build_address(row: Dict[str, Any]) -> Optional[str]:
    parts: List[str] = []
    for key in ['address_freeform', 'address_locality', 'address_region', 'address_postcode']:
        val = row.get(key)
        if val:
            parts.append(str(val).strip())
    return ', '.join(parts) if parts else None


def map_csv_to_vendor(row: Dict[str, Any]) -> Dict[str, Any]:
    name = row.get('names_primary') or row.get('name') or row.get('business_name') or 'Unknown'
    primary_category = row.get('categories_primary')
    mapped_category = CATEGORY_MAPPING.get(str(primary_category).strip(), CATEGORY_MAPPING['default'])

    bio_parts: List[str] = []
    if row.get('categories_primary'):
        bio_parts.append(f"Category: {row['categories_primary']}")
    if row.get('categories_alternate'):
        bio_parts.append(f"Also: {row['categories_alternate']}")
    bio = ' | '.join(bio_parts)

    service_areas: List[str] = []
    if row.get('address_region'):
        service_areas.append(str(row['address_region']).strip())
    if row.get('address_locality'):
        service_areas.append(str(row['address_locality']).strip())

    return {
        'slug': slugify(name),
        'name': name,
        'category': mapped_category,
        'address': build_address(row),
        'phone': first_value(row.get('phones')),
        'website': first_value(row.get('websites')),
        'email': first_value(row.get('emails')),
        'bio': bio,
        'service_areas': service_areas,
        'price_range': None,
        'is_claimed': False,
        'is_published': True,
        'is_featured': False,
        'is_verified': False,
        'source': 'csv_import'
    }


def normalize_row(row: Dict[str, Any]) -> Dict[str, Any]:
    return {k: (None if v is None else str(v).strip()) for k, v in row.items()}


def make_output_path(base_name: str, part: int = 1) -> Path:
    suffix = f'.part{part}' if part > 1 else ''
    return OUTPUT_DIR / f"{base_name}{suffix}.json"


def write_json_stream(objects: Iterable[Dict[str, Any]], base_name: str) -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    part = 1
    output_path = make_output_path(base_name, part)
    output_file = output_path.open('wb')

    written_objects = 0
    first = True
    output_file.write(b'[\n')
    current_size = output_file.tell()

    for obj in objects:
        text_bytes = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        prefix = b'' if first else b',\n'
        chunk = prefix + text_bytes
        projected_size = current_size + len(chunk) + 3

        if projected_size > MAX_BYTES and not first:
            output_file.write(b'\n]\n')
            output_file.close()
            part += 1
            output_path = make_output_path(base_name, part)
            output_file = output_path.open('wb')
            output_file.write(b'[\n')
            current_size = output_file.tell()
            first = True
            prefix = b''
            chunk = text_bytes

        if not first:
            output_file.write(b',\n')
            current_size += len(b',\n')
        output_file.write(text_bytes)
        current_size += len(text_bytes)
        first = False
        written_objects += 1

    output_file.write(b'\n]\n')
    output_file.close()
    return written_objects


def convert_csv_file(csv_path: Path) -> int:
    base_name = csv_path.stem
    print(f"Converting {csv_path.name} to JSON...")
    with csv_path.open('r', encoding='utf-8', newline='') as f:
        reader = csv.DictReader(f)
        if not reader.fieldnames:
            print(f"  Skipping empty file: {csv_path.name}")
            return 0

        def rows() -> Iterable[Dict[str, Any]]:
            for row in reader:
                normalized = normalize_row(row)
                if csv_path.name.lower().find('location') >= 0 or csv_path.name.lower().find('cities') >= 0:
                    yield normalized
                else:
                    yield map_csv_to_vendor(normalized)

        count = write_json_stream(rows(), base_name)
        print(f"  Wrote {count} records to JSON for {csv_path.name}")
        return count


def get_csv_inputs() -> List[Path]:
    csv_paths = sorted(DATA_DIR.glob('*.csv'))
    part_bases = {
        re.sub(r'\.part\d+$', '', path.stem)
        for path in csv_paths
        if re.search(r'\.part\d+\.csv$', path.name)
    }

    selected: List[Path] = []
    for csv_path in csv_paths:
        if re.search(r'\.part\d+\.csv$', csv_path.name):
            selected.append(csv_path)
        elif csv_path.stem not in part_bases:
            selected.append(csv_path)
        else:
            print(f"Skipping original CSV source because split parts exist: {csv_path.name}")

    return selected


def main() -> None:
    if not DATA_DIR.exists():
        print(f"ERROR: Data directory not found: {DATA_DIR}")
        sys.exit(1)

    csv_files = get_csv_inputs()
    if not csv_files:
        print("No CSV files found in data/.")
        return

    total = 0
    for csv_file in csv_files:
        total += convert_csv_file(csv_file)

    print('=' * 60)
    print(f"Conversion complete. Total rows converted: {total}")
    print(f"JSON output directory: {OUTPUT_DIR}")
    print('=' * 60)


if __name__ == '__main__':
    main()
