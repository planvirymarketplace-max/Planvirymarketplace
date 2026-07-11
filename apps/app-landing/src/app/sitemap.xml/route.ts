import { NextResponse } from 'next/server';
import { ALL_MARKETPLACE_ITEMS } from '@/planviry/lib/vendorCatalog';
import { SUB_CATEGORIES } from '@/planviry/data';
import { CategoryLens } from '@/planviry/types';
import { CITIES } from '@/planviry/data/cities';

const BASE_URL = 'https://planviry.com';

export async function GET() {
  const urls: { loc: string; priority: string; changefreq: string }[] = [];

  // 1. Core static pages
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/explore', priority: '0.9', changefreq: 'daily' },
    { path: '/itinerary', priority: '0.7', changefreq: 'weekly' },
    { path: '/payment', priority: '0.6', changefreq: 'monthly' },
    { path: '/tasks', priority: '0.6', changefreq: 'weekly' },
    { path: '/guest-portal', priority: '0.5', changefreq: 'monthly' },
    { path: '/vendor-portal', priority: '0.7', changefreq: 'daily' },
    { path: '/global-admin', priority: '0.3', changefreq: 'monthly' },
    { path: '/legal', priority: '0.4', changefreq: 'monthly' },
  ];
  staticPages.forEach((p) => {
    urls.push({ loc: `${BASE_URL}/#${p.path}`, priority: p.priority, changefreq: p.changefreq });
  });

  // 2. Category landing pages (9 categories)
  const categories: CategoryLens[] = [
    'services', 'plan', 'things-to-do', 'food-drink',
    'live-shows', 'travel', 'party', 'spaces', 'vendors',
  ];
  categories.forEach((cat) => {
    urls.push({ loc: `${BASE_URL}/#/${cat}`, priority: '0.8', changefreq: 'daily' });
  });

  // 3. Subcategory pages (every subcategory within every category)
  categories.forEach((cat) => {
    const subs = SUB_CATEGORIES[cat] || [];
    subs.forEach((sub) => {
      urls.push({
        loc: `${BASE_URL}/#/${cat}?sub=${encodeURIComponent(sub)}`,
        priority: '0.6',
        changefreq: 'weekly',
      });
    });
  });

  // 4. Vendor detail pages (every vendor in the catalog)
  ALL_MARKETPLACE_ITEMS.forEach((item) => {
    urls.push({
      loc: `${BASE_URL}/#/vendor/${item.id}`,
      priority: '0.5',
      changefreq: 'weekly',
    });
  });

  // 5. Location-based pages (every category × every city)
  categories.forEach((cat) => {
    CITIES.forEach((city) => {
      urls.push({
        loc: `${BASE_URL}/#/${cat}?location=${encodeURIComponent(`${city.city}, ${city.state}`)}`,
        priority: '0.4',
        changefreq: 'weekly',
      });
    });
  });

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
