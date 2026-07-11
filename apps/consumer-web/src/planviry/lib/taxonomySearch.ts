import { TAXONOMY_SURFACES, OCCASIONS_TAXONOMY } from '../data/taxonomy';

export interface TaxonomySuggestion {
  name: string;
  type: 'Category' | 'Subcategory' | 'Occasion' | 'Service';
  route?: string;
}

// Statically extract all unique taxonomy items on module load
export const ALL_TAXONOMY_ITEMS: TaxonomySuggestion[] = (() => {
  const itemsMap = new Map<string, TaxonomySuggestion>();

  // Helper to add unique item
  const add = (name: string, type: 'Category' | 'Subcategory' | 'Occasion' | 'Service', route?: string) => {
    if (!name) return;
    const key = name.trim().toLowerCase();
    if (!itemsMap.has(key)) {
      itemsMap.set(key, { name: name.trim(), type, route });
    }
  };

  // 1. Process TAXONOMY_SURFACES (all categories, level2, subcategories, level4)
  TAXONOMY_SURFACES.forEach(surface => {
    // e.g., "Planning & Coordination"
    const route = `/${surface.category || 'services'}`;
    add(surface.title, 'Category', route);

    surface.level2.forEach(lvl2 => {
      // e.g., "Event Planners & Coordinators"
      add(lvl2.title, 'Subcategory', route);

      lvl2.subcategories.forEach(lvl3 => {
        // e.g., "Wedding Planning"
        add(lvl3.name, 'Service', route);

        if (lvl3.level4) {
          lvl3.level4.forEach(lvl4Name => {
            add(lvl4Name, 'Service', route);
          });
        }
      });
    });
  });

  // 2. Process OCCASIONS_TAXONOMY (celebrate, professional, etc.)
  OCCASIONS_TAXONOMY.forEach(group => {
    group.items.forEach(item => {
      // e.g., "Social & Casual Parties"
      const route = `/${item.category || 'services'}`;
      add(item.title, 'Occasion', route);

      item.subcategories.forEach(sub => {
        // e.g., "Birthday party"
        add(sub.name, 'Occasion', route);
      });
    });
  });

  // Convert to sorted array
  return Array.from(itemsMap.values()).sort((a, b) => a.name.localeCompare(b.name));
})();

// Default recommendations when search query is empty
export const POPULAR_TAXONOMIES: TaxonomySuggestion[] = [
  { name: "Wedding Planning", type: "Service", route: "/services" },
  { name: "Party and Event Planning", type: "Service", route: "/services" },
  { name: "Hotels", type: "Service", route: "/travel" },
  { name: "Venue and Event Space", type: "Service", route: "/spaces" },
  { name: "Caterers", type: "Service", route: "/food-drink" },
  { name: "DJ Services", type: "Service", route: "/live-shows" },
  { name: "Birthday party", type: "Occasion", route: "/party" },
  { name: "Corporate occasion", type: "Occasion", route: "/services" }
];

export function searchTaxonomy(query: string): TaxonomySuggestion[] {
  const q = query.trim().toLowerCase();
  // Empty query => NO suggestions (no pre-population, ever).
  if (!q) {
    return [];
  }

  // Split into prefix matches (typed text at start) and contains matches.
  // Prefix matches win so inline ghost-text autocomplete can complete them.
  const prefixMatches: TaxonomySuggestion[] = [];
  const containsMatches: TaxonomySuggestion[] = [];

  for (const item of ALL_TAXONOMY_ITEMS) {
    const name = item.name.toLowerCase();
    if (name.startsWith(q)) {
      prefixMatches.push(item);
    } else if (name.includes(q)) {
      containsMatches.push(item);
    }
  }

  // Both groups already alphabetical (ALL_TAXONOMY_ITEMS is sorted).
  return [...prefixMatches, ...containsMatches].slice(0, 10);
}
