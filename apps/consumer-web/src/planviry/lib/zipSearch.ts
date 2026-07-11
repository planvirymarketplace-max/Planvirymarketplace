export interface ZipSuggestion {
  zip: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
}

const FEATURED_CITIES: ZipSuggestion[] = [
  { zip: '31401', city: 'Savannah', state: 'GA' },
  { zip: '90210', city: 'Beverly Hills', state: 'CA' },
  { zip: '10001', city: 'New York', state: 'NY' },
  { zip: '33101', city: 'Miami', state: 'FL' },
  { zip: '30303', city: 'Atlanta', state: 'GA' },
  { zip: '60601', city: 'Chicago', state: 'IL' },
  { zip: '94102', city: 'San Francisco', state: 'CA' },
  { zip: '80202', city: 'Denver', state: 'CO' },
];

// In-memory cache for the current session so repeated keystrokes don't
// re-fetch the same query.
const cache = new Map<string, ZipSuggestion[]>();

/**
 * Search all 44,000+ US cities via the server-side /api/cities endpoint.
 * The heavy zipcodes dataset stays on the server; the client only receives
 * the 10 matching results.
 */
export async function searchZipCodes(query: string): Promise<ZipSuggestion[]> {
  const q = query.trim();
  if (!q) {
    return FEATURED_CITIES;
  }

  const cacheKey = q.toLowerCase();
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  try {
    const res = await fetch(`/api/cities?q=${encodeURIComponent(q)}`);
    if (!res.ok) throw new Error('cities API failed');
    const data = await res.json();
    const results: ZipSuggestion[] = (data.results || []).map(
      (r: { zip: string; city: string; state: string }) => ({
        zip: r.zip,
        city: r.city,
        state: r.state,
      }),
    );
    cache.set(cacheKey, results);
    return results;
  } catch {
    // Fallback to featured cities if the API is unavailable
    return FEATURED_CITIES;
  }
}

/**
 * Synchronous fallback used by components that haven't been migrated to the
 * async API yet. Returns the featured cities only.
 */
export function searchZipCodesSync(query: string): ZipSuggestion[] {
  const q = query.trim().toLowerCase();
  if (!q) return FEATURED_CITIES;
  return FEATURED_CITIES.filter(
    (c) =>
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.zip.startsWith(q),
  );
}
