import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: ' Vendor Directory | Planviry',
  description: 'Browse \'s best event vendors - DJs, venues, caterers, photographers, planners, and more. Filter by neighborhood, price, rating, and category.',
  keywords: [' vendors', 'event vendors', ' DJs', ' venues', ' caterers', ' photographers', ' event planners', 'Planviry'],
  openGraph: {
    title: ' Vendor Directory | Planviry',
    description: 'Browse \'s best event vendors. Filter by category, neighborhood, price, and rating.',
    type: 'website',
    siteName: 'Planviry',
  },
}

export default function DirectoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
