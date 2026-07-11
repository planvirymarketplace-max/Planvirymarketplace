import { AppLayoutShell } from '@/components/AppLayoutShell'
import type { Metadata } from 'next'
import { DirectoryClient } from './client'

export const metadata: Metadata = {
  title: 'Event Vendor Directory | Planviry',
  description:
    "Browse our largest directory of event vendors - venues, DJs, photographers, caterers, florists, and more. 500+ verified vendors across 10 categories.",
  alternates: { canonical: 'https://planviry.com/directory' },
  openGraph: {
    title: 'Event Vendor Directory | Planviry',
    description:
      "Browse our largest directory of event vendors. 500+ verified vendors across 10 categories.",
    url: 'https://planviry.com/directory',
    siteName: 'Planviry',
    type: 'website',
  },
  keywords: [
    'event vendors',
    'vendor directory',
    'event vendors ',
    'wedding vendors',
    'party vendors',
    'DJ',
    'photographer ',
    'catering ',
    'venue ',
    'florist ',
  ],
}

// ISR: revalidate every 24h
export const revalidate = 86400

export default function DirectoryPage() {
  return <AppLayoutShell><DirectoryClient /></AppLayoutShell>
}
