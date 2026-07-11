import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wedding Vendors near you | Planviry',
  description: 'Find the best wedding vendors near you - venues, DJs, photographers, caterers, planners, florists, and more.',
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
