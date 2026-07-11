import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Event Vendors near you',
  description:
    'Browse and book \'s best event vendors - venues, caterers, DJs, photographers, planners, and more. Filter by category, price, location, and rating.',
  keywords: [
    'book  vendors',
    'event vendors',
    'vendor directory',
    ' venues',
    ' caterers',
    ' DJs',
    ' photographers',
    'book event services ',
  ],
  openGraph: {
    title: 'Book Event Vendors near you | Planviry',
    description:
      'Browse and book \'s best event vendors. Filter by category, price, location, and rating.',
  },
}

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/" className="text-lg font-bold tracking-tight">
                Planviry
              </a>
              <span className="hidden sm:inline text-muted-foreground">/</span>
              <span className="hidden sm:inline text-sm font-medium text-muted-foreground">
                Book Vendors
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </a>
              <span className="text-muted-foreground">·</span>
              <a
                href="/directory"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Directory
              </a>
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}
