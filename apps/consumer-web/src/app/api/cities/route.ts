import { NextRequest, NextResponse } from 'next/server';
import zipcodes from 'zipcodes';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = (searchParams.get('q') || '').trim().toLowerCase();

  const FEATURED: { zip: string; city: string; state: string }[] = [
    { zip: '31401', city: 'Savannah', state: 'GA' },
    { zip: '90210', city: 'Beverly Hills', state: 'CA' },
    { zip: '10001', city: 'New York', state: 'NY' },
    { zip: '33101', city: 'Miami', state: 'FL' },
    { zip: '30303', city: 'Atlanta', state: 'GA' },
    { zip: '60601', city: 'Chicago', state: 'IL' },
    { zip: '94102', city: 'San Francisco', state: 'CA' },
    { zip: '80202', city: 'Denver', state: 'CO' },
  ];

  if (!query) {
    return NextResponse.json({ results: FEATURED });
  }

  const results: { zip: string; city: string; state: string }[] = [];
  const seen = new Set<string>();
  const allCodes = zipcodes.codes;

  // If user typed numbers, prioritize zip code prefixes
  if (/^\d+$/.test(query)) {
    for (const zip in allCodes) {
      if (zip.startsWith(query)) {
        const entry = allCodes[zip];
        const key = `${entry.city.toUpperCase()}, ${entry.state.toUpperCase()}`;
        if (!seen.has(key)) {
          seen.add(key);
          results.push({ zip: entry.zip, city: entry.city, state: entry.state });
          if (results.length >= 10) break;
        }
      }
    }
    return NextResponse.json({ results });
  }

  // If user typed letters, match city names (or state codes)
  for (const zip in allCodes) {
    const entry = allCodes[zip];
    if (!entry.city || !entry.state) continue;

    const cityName = entry.city.toLowerCase();
    const stateName = entry.state.toLowerCase();
    const key = `${entry.city.toUpperCase()}, ${entry.state.toUpperCase()}`;

    if (
      (cityName.startsWith(query) || cityName.includes(query) || stateName === query) &&
      !seen.has(key)
    ) {
      seen.add(key);
      results.push({ zip: entry.zip, city: entry.city, state: entry.state });
      if (results.length >= 10) break;
    }
  }

  // Fallback to substring matching if we don't have enough results
  if (results.length < 5) {
    for (const zip in allCodes) {
      const entry = allCodes[zip];
      if (!entry.city || !entry.state) continue;

      const cityName = entry.city.toLowerCase();
      const key = `${entry.city.toUpperCase()}, ${entry.state.toUpperCase()}`;

      if (cityName.includes(query) && !seen.has(key)) {
        seen.add(key);
        results.push({ zip: entry.zip, city: entry.city, state: entry.state });
        if (results.length >= 10) break;
      }
    }
  }

  return NextResponse.json({ results });
}
