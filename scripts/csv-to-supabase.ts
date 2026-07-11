/**
 * CSV to Supabase Migration Script
 * Converts CSV files in the data directory to Supabase tables
 * Run with: node --loader ts-node/esm scripts/csv-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('ERROR: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Data directory
const DATA_DIR = path.join(process.cwd(), 'data');

// Comprehensive category mapping from CSV categories_primary to Supabase vendor_category enum
const CATEGORY_MAPPING: Record<string, string> = {
  // Restaurants & Bars
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
  
  // Venues & Event Spaces
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
  
  // Entertainment & Music
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
  
  // Photography & Video
  'photographer': 'photography',
  'photo_booth': 'photo_booth',
  'videography': 'videography',
  'video_production': 'videography',
  
  // Beauty & Wellness
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
  
  // Transportation
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
  
  // Planning & Services
  'event_planner': 'wedding_planner',
  'event_planning': 'wedding_planner',
  'party_and_event_planning': 'wedding_planner',
  'wedding_planner': 'wedding_planner',
  
  // Rentals
  'campground': 'hotel_accommodations',
  'equipment_rental': 'decor_rentals',
  'party_rental': 'decor_rentals',
  'rv_rental': 'hotel_accommodations',
  'vacation_rental': 'hotel_accommodations',
  
  // Activities & Adventures
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
  
  // Shopping & Retail
  'bakery': 'catering',
  'butcher': 'catering',
  'clothing_store': 'dress_attire',
  'department_store': 'favors_gifts',
  'florist': 'florist',
  'gift_shop': 'favors_gifts',
  'jewelry_store': 'jeweler',
  'market': 'catering',
  'shopping_mall': 'favors_gifts',
  
  // Default fallback
  'default': 'wedding_venue'
};

function sanitizeSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseJSONArray(str: string | null): string[] {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str.replace(/'/g, '"'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [str];
  }
}

function extractFirst(phones: string | null): string | null {
  if (!phones) return null;
  const arr = parseJSONArray(phones);
  return arr.length > 0 ? arr[0] : null;
}

function buildAddress(row: any): string | null {
  const parts: string[] = [];
  if (row.address_freeform) parts.push(row.address_freeform);
  if (row.address_locality) parts.push(row.address_locality);
  if (row.address_region) parts.push(row.address_region);
  if (row.address_postcode) parts.push(row.address_postcode);
  return parts.length > 0 ? parts.join(', ') : null;
}

function mapCSVToVendor(row: any): any {
  const name = row.names_primary || row.name || row.business_name || 'Unknown';
  
  // Map category
  const primaryCategory = row.categories_primary;
  const mappedCategory = (primaryCategory && CATEGORY_MAPPING[primaryCategory]) 
    ? CATEGORY_MAPPING[primaryCategory] 
    : CATEGORY_MAPPING['default'];
  
  // Build bio
  const bioParts: string[] = [];
  if (row.categories_primary) bioParts.push(`Category: ${row.categories_primary}`);
  if (row.categories_alternate) bioParts.push(`Also: ${row.categories_alternate}`);
  const bio = bioParts.join(' | ');
  
  // Service areas
  const serviceAreas: string[] = [];
  if (row.address_region) serviceAreas.push(String(row.address_region));
  if (row.address_locality) serviceAreas.push(String(row.address_locality));
  
  return {
    slug: sanitizeSlug(name),
    name,
    category: mappedCategory,
    address: buildAddress(row),
    phone: extractFirst(row.phones),
    website: extractFirst(row.websites),
    email: extractFirst(row.emails),
    bio,
    service_areas: serviceAreas,
    price_range: null,
    is_claimed: false,
    is_published: true,
    is_featured: false,
    is_verified: false,
    source: 'csv_import'
  };
}

async function processVendorCSV(filePath: string): Promise<number> {
  console.log(`Processing ${path.basename(filePath)}...`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n').filter((line: string) => line.trim());
    const headers = lines[0].split(',');
    const records = lines.slice(1).map((line: string) => {
      const values = line.split(',');
      const record: any = {};
      headers.forEach((header: string, i: number) => {
        record[header.trim()] = values[i]?.trim() || '';
      });
      return record;
    });
    
    console.log(`  Found ${records.length} rows`);
    
    let inserted = 0;
    let skipped = 0;
    let errors = 0;
    
    for (let idx = 0; idx < records.length; idx++) {
      try {
        const vendorData = mapCSVToVendor(records[idx]);
        
        // Skip if no name
        if (!vendorData.name || vendorData.name === 'Unknown') {
          skipped++;
          continue;
        }
        
        // Check if vendor exists
        const { data: existing } = await supabase
          .from('vendors')
          .select('id')
          .eq('slug', vendorData.slug)
          .single();
        
        if (existing) {
          skipped++;
          continue;
        }
        
        // Insert vendor
        const { error } = await supabase.from('vendors').insert(vendorData);
        
        if (error) {
          errors++;
          if (errors <= 5) console.error(`  Error at row ${idx}:`, error.message);
          continue;
        }
        
        inserted++;
        
        if (inserted % 100 === 0) {
          console.log(`  Progress: ${inserted} inserted, ${skipped} skipped...`);
        }
      } catch (e: any) {
        errors++;
        if (errors <= 5) console.error(`  Error at row ${idx}:`, e.message);
      }
    }
    
    console.log(`  Completed: ${inserted} inserted, ${skipped} skipped, ${errors} errors`);
    return inserted;
  } catch (e: any) {
    console.error(`  Error processing file:`, e.message);
    return 0;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('CSV to Supabase Migration Script');
  console.log('='.repeat(60));
  
  // Check data directory
  if (!fs.existsSync(DATA_DIR)) {
    console.error(`ERROR: Data directory not found: ${DATA_DIR}`);
    process.exit(1);
  }
  
  // Find all CSV files
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.csv'));
  console.log(`Found ${files.length} CSV files`);
  
  let totalInserted = 0;
  
  for (const file of files) {
    // Skip location/cities files
    if (file.toLowerCase().includes('location') || file.toLowerCase().includes('cities')) {
      console.log(`Skipping ${file} - location data (requires separate table)`);
      continue;
    }
    
    const filePath = path.join(DATA_DIR, file);
    const inserted = await processVendorCSV(filePath);
    totalInserted += inserted;
  }
  
  console.log('='.repeat(60));
  console.log(`Migration complete. Total vendors inserted: ${totalInserted}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
