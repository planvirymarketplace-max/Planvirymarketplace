#!/usr/bin/env python3
"""
CSV to Supabase Migration Script
Converts CSV files in the data directory to Supabase tables
Requires: pip install supabase pandas python-dotenv
"""

import os
import sys
import csv
import re
from pathlib import Path
from typing import Dict, List, Any, Optional
from datetime import datetime
import json

try:
    from supabase import create_client, Client
    import pandas as pd
    from dotenv import load_dotenv
except ImportError as e:
    print(f"Missing required package: {e}")
    print("Install with: pip install supabase pandas python-dotenv")
    sys.exit(1)

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')  # Use service role key for admin operations

if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file")
    sys.exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Data directory
DATA_DIR = Path(__file__).parent.parent / 'data'

# Comprehensive category mapping from CSV categories_primary to Supabase vendor_category enum
# Based on actual data analysis of 60,000+ vendors
CATEGORY_MAPPING = {
    # Restaurants & Bars
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
    
    # Venues & Event Spaces
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
    
    # Entertainment & Music
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
    
    # Photography & Video
    'photographer': 'photography',
    'photo_booth': 'photo_booth',
    'videography': 'videography',
    'video_production': 'videography',
    
    # Beauty & Wellness
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
    
    # Transportation
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
    
    # Planning & Services
    'event_planner': 'wedding_planner',
    'event_planning': 'wedding_planner',
    'party_and_event_planning': 'wedding_planner',
    'wedding_planner': 'wedding_planner',
    
    # Rentals
    'campground': 'hotel_accommodations',
    'equipment_rental': 'decor_rentals',
    'party_rental': 'decor_rentals',
    'rv_rental': 'hotel_accommodations',
    'vacation_rental': 'hotel_accommodations',
    
    # Activities & Adventures
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
    
    # Shopping & Retail
    'bakery': 'catering',
    'butcher': 'catering',
    'clothing_store': 'dress_attire',
    'department_store': 'favors_gifts',
    'florist': 'florist',
    'gift_shop': 'favors_gifts',
    'jewelry_store': 'jeweler',
    'market': 'catering',
    'shopping_mall': 'favors_gifts',
    
    # Default fallback for unmapped categories
    'default': 'wedding_venue'
}

def sanitize_slug(name: str) -> str:
    """Convert name to URL-friendly slug"""
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = slug.strip('-')
    return slug

def extract_phone(phones_str: str) -> Optional[str]:
    """Extract first phone number from phones array string"""
    if not phones_str or pd.isna(phones_str):
        return None
    try:
        phones = json.loads(phones_str.replace("'", '"'))
        if phones and len(phones) > 0:
            return phones[0]
    except:
        pass
    return str(phones_str).strip() if phones_str else None

def extract_email(emails_str: str) -> Optional[str]:
    """Extract first email from emails array string"""
    if not emails_str or pd.isna(emails_str):
        return None
    try:
        emails = json.loads(emails_str.replace("'", '"'))
        if emails and len(emails) > 0:
            return emails[0]
    except:
        pass
    return str(emails_str).strip() if emails_str else None

def extract_website(websites_str: str) -> Optional[str]:
    """Extract first website from websites array string"""
    if not websites_str or pd.isna(websites_str):
        return None
    try:
        websites = json.loads(websites_str.replace("'", '"'))
        if websites and len(websites) > 0:
            return websites[0]
    except:
        pass
    return str(websites_str).strip() if websites_str else None

def extract_address(row: Dict[str, Any]) -> Optional[str]:
    """Build full address from components"""
    parts = []
    if 'address_freeform' in row and row['address_freeform']:
        parts.append(str(row['address_freeform']))
    if 'address_locality' in row and row['address_locality']:
        parts.append(str(row['address_locality']))
    if 'address_region' in row and row['address_region']:
        parts.append(str(row['address_region']))
    if 'address_postcode' in row and row['address_postcode']:
        parts.append(str(row['address_postcode']))
    return ', '.join(parts) if parts else None

def map_csv_to_vendor(row: Dict[str, Any], csv_category: str) -> Dict[str, Any]:
    """Map CSV row to vendors table structure"""
    name = row.get('names_primary') or row.get('name') or row.get('business_name') or 'Unknown'
    
    # Map CSV category_primary to Supabase vendor_category enum
    primary_category = row.get('categories_primary')
    if primary_category and primary_category in CATEGORY_MAPPING:
        mapped_category = CATEGORY_MAPPING[primary_category]
    elif csv_category and csv_category in CATEGORY_MAPPING:
        mapped_category = CATEGORY_MAPPING[csv_category]
    else:
        mapped_category = CATEGORY_MAPPING['default']
    
    # Build bio from available data
    bio_parts = []
    if row.get('categories_primary'):
        bio_parts.append(f"Category: {row['categories_primary']}")
    if row.get('categories_alternate'):
        bio_parts.append(f"Also: {row['categories_alternate']}")
    bio = ' | '.join(bio_parts) if bio_parts else ''
    
    # Extract service areas from location data
    service_areas = []
    if row.get('address_region'):
        service_areas.append(str(row['address_region']))
    if row.get('address_locality'):
        service_areas.append(str(row['address_locality']))
    
    return {
        'slug': sanitize_slug(name),
        'name': name,
        'category': mapped_category,
        'address': extract_address(row),
        'phone': extract_phone(row.get('phones')),
        'website': extract_website(row.get('websites')),
        'email': extract_email(row.get('emails')),
        'bio': bio,
        'service_areas': service_areas,
        'price_range': None,
        'is_claimed': False,
        'is_published': True,
        'is_featured': False,
        'is_verified': False,
        'source': 'csv_import'
    }

def process_vendor_csv(csv_path: Path, csv_category: str) -> int:
    """Process a single vendor CSV file and insert into Supabase"""
    print(f"Processing {csv_path.name}...")
    
    try:
        df = pd.read_csv(csv_path)
        print(f"  Found {len(df)} rows")
        
        inserted = 0
        skipped = 0
        errors = 0
        
        for idx, row in df.iterrows():
            try:
                vendor_data = map_csv_to_vendor(row.to_dict(), csv_category)
                
                # Skip if no name
                if not vendor_data['name'] or vendor_data['name'] == 'Unknown':
                    skipped += 1
                    continue
                
                # Check if vendor with same slug exists
                existing = supabase.table('vendors').select('id').eq('slug', vendor_data['slug']).execute()
                
                if existing.data:
                    skipped += 1
                    continue
                
                # Insert vendor
                result = supabase.table('vendors').insert(vendor_data).execute()
                inserted += 1
                
                if inserted % 100 == 0:
                    print(f"  Progress: {inserted} inserted, {skipped} skipped...")
                    
            except Exception as e:
                errors += 1
                if errors <= 5:  # Only print first 5 errors
                    print(f"  Error at row {idx}: {e}")
        
        print(f"  Completed: {inserted} inserted, {skipped} skipped, {errors} errors")
        return inserted
        
    except Exception as e:
        print(f"  Error processing file: {e}")
        return 0

def process_locations_csv(csv_path: Path) -> int:
    """Process location CSV files (cities, global locations)"""
    print(f"Processing locations file {csv_path.name}...")
    
    try:
        df = pd.read_csv(csv_path)
        print(f"  Found {len(df)} rows")
        
        # For now, just count - location tables would need to be created
        print(f"  Note: Location tables need to be created in schema first")
        return len(df)
        
    except Exception as e:
        print(f"  Error processing file: {e}")
        return 0

def main():
    print("=" * 60)
    print("CSV to Supabase Migration Script")
    print("=" * 60)
    
    # Check data directory
    if not DATA_DIR.exists():
        print(f"ERROR: Data directory not found: {DATA_DIR}")
        sys.exit(1)
    
    # Find all CSV files
    csv_files = list(DATA_DIR.glob('*.csv'))
    print(f"Found {len(csv_files)} CSV files")
    
    total_inserted = 0
    total_skipped = 0
    total_errors = 0
    
    for csv_file in csv_files:
        # Skip location/cities files - they need separate handling
        if 'location' in csv_file.name.lower() or 'cities' in csv_file.name.lower():
            print(f"Skipping {csv_file.name} - location data (requires separate table)")
            continue
        
        # Process all other CSV files - use categories_primary from data
        inserted = process_vendor_csv(csv_file, None)
        total_inserted += inserted
    
    print("=" * 60)
    print(f"Migration complete. Total vendors inserted: {total_inserted}")
    print("=" * 60)

if __name__ == '__main__':
    main()
