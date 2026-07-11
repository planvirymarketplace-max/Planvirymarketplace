# Planviry Monorepo

Multi-vertical occasion orchestration platform monorepo managed with Turborepo.

## Structure

```
planvirymarketplace/
├── apps/                    # Next.js applications
│   ├── consumer-web/       # Guest-facing web application
│   ├── vendor-portal/      # Vendor dashboard
│   ├── admin-portal/       # Admin interface
│   └── api/                # API layer
├── packages/               # Shared libraries
│   ├── db/                 # Database schema & migrations
│   ├── ui/                 # Shared component library
│   ├── search/             # Algolia integration
│   ├── analytics/          # Event tracking
│   ├── email-templates/    # Email templates
│   ├── types/              # TypeScript types & Zod schemas
│   └── config/             # Shared configs
├── workers/                # Background jobs
│   ├── ttl-sweep/
│   ├── search-sync/
│   ├── notification-digest/
│   └── external-sync/
├── functions/              # Supabase Edge Functions
│   ├── stripe-webhook/
│   ├── booking-ttl/
│   ├── search-ingest/
│   └── notification-send/
├── shared/                 # Cross-cutting utilities
├── docs/                   # Documentation
└── supabase/               # Supabase config & migrations
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
pnpm install
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run specific app
pnpm --filter consumer-web dev
```

### Build

```bash
# Build all packages and apps
pnpm build

# Build specific app
pnpm --filter consumer-web build
```

## Deployment

### Vercel

The monorepo is configured for Vercel deployment. The consumer-web app is the primary deployment target.

1. Connect your Vercel account to this repository
2. Set the root directory to `apps/consumer-web`
3. Configure environment variables in Vercel dashboard
4. Deploy

### Environment Variables

Required environment variables (set in Vercel or `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=
ALGOLIA_ADMIN_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Documentation

- [Monorepo Structure](docs/MONOREPO_STRUCTURE.md)
- [Implementation Specification](Implementation Specification.pdf)
- [Production Roadmap](PRODUCTION_ROADMAP.md)

## Architecture

This monorepo implements the architecture defined in Parts 1-10 of the Implementation Specification:

- **Part I**: Governance & Architecture Principles
- **Part II**: Repository Architecture (this structure)
- **Part III**: Domain Definition
- **Part IV**: Business Rules
- **Part V**: State Machines
- **Part VI**: Database Specification
- **Part VII**: Authentication
- **Part VIII**: User Model
- **Part IX**: Event System
- **Part X**: Internal Services

## License

Proprietary - All rights reserved
