import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event Services near you | Planviry',
  description: 'DJ services, photo booth rentals, and mobile event vans near you. Book the best for your event.',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
