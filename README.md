# Delta Recognition Hub — Delta Industries Digital Platform

> **Full-stack digital brand platform replacing Delta Industries' IndiaMART dependency with an independently owned, AI-ready web presence.**

## The Problem We're Solving

Delta Industries (Delta Trophies), Jalandhar, currently operates through a **static IndiaMART listing** at [deltatrophies.in](https://deltatrophies.in) with:

| Current State | What We Built |
|--------------|---------------|
| Static HTML pages with no interactivity | Full-stack React SPA with tRPC API |
| 80MB PDF product catalog (downloaded manually) | Searchable digital catalog with 45+ SKUs, live filtering |
| Phone-only enquiries (08047851811) | Digital enquiry form with admin management dashboard |
| No search functionality | Full-text Meilisearch with typo tolerance |
| No admin panel | Protected admin dashboard with analytics, CRUD, and enquiry lifecycle |
| No customer tracking | Enquiry status pipeline: `new` → `in_progress` → `resolved` |
| Static thumbnails | Cloudinary-powered image gallery with WebP optimization |
| No analytics | Recharts-powered dashboard showing enquiry trends, category popularity |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React 19 + Vite SPA                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │  Home   │ │Products │ │ Search  │ │  Admin  │           │
│  │  Page   │ │  Page   │ │  Page   │ │Dashboard│           │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘           │
│       │           │           │           │                │
│       └───────────┴───────────┴───────────┘                │
│                   tRPC Client (React Query)                  │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP
┌───────────────────────────┴─────────────────────────────────┐
│              Express + tRPC v11 API Server                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │category │ │ product │ │ enquiry │ │  admin  │           │
│  │ router  │ │ router  │ │ router  │ │ router  │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│       │           │           │           │                 │
│       └───────────┴───────────┴───────────┘                 │
│                    Prisma ORM v6.6                         │
│       ┌───────────┴───────────┐                            │
│       ▼                       ▼                            │
│  PostgreSQL 16          Meilisearch                        │
│  (9 categories,         (product search                     │
│   45+ products,         index with filters)                 │
│   enquiry tracking)                                       │
└─────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 19, Vite, TypeScript 5.8 | SPA with modern DX |
| Styling | Tailwind CSS 4.0, Framer Motion | Premium animations & responsive design |
| Components | shadcn/ui, Radix UI primitives | Accessible, polished UI |
| State | TanStack Query (React Query) | Server state management |
| API | tRPC v11 | End-to-end type-safe APIs |
| ORM | Prisma 6.6 | Type-safe database access |
| Database | PostgreSQL 16 | Relational data with 3NF schema |
| Search | Meilisearch | Full-text search with typo tolerance |
| Images | Cloudinary | CDN image upload & optimization |
| Charts | Recharts | Admin analytics dashboards |
| Auth | bcrypt + httpOnly cookies | Secure admin session management |

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- npm

### Setup

1. **Start Docker services** (PostgreSQL, Meilisearch):
```bash
make up
```

2. **Install dependencies**:
```bash
make install
```

3. **Set up database**:
```bash
make prisma-push
make prisma-generate
make seed
```

4. **Start development server**:
```bash
make dev
```

The app will be available at `http://localhost:5173`

### Available Make Commands

- `make help` - Show all available commands
- `make up` - Start Docker services
- `make down` - Stop Docker services
- `make restart` - Restart Docker services
- `make install` - Install npm dependencies
- `make build` - Build the application
- `make dev` - Start development server
- `make seed` - Seed the database
- `make clean` - Clean build artifacts and node_modules
- `make prisma-generate` - Generate Prisma client
- `make prisma-push` - Push Prisma schema to database
- `make prisma-migrate` - Run Prisma migrations

## Project Structure

```
├── prisma/              # Database schema, migrations, seed scripts
│   ├── schema.prisma    # 7 models: Category, Product, ProductSize, ProductImage, Enquiry, Admin, Session
│   └── seed.ts          # 9 categories + 45 products with full data
├── server/              # tRPC API backend
│   ├── routers/         # category, product, enquiry, admin, search
│   ├── trpc.ts          # Context & middleware (publicProcedure, adminProcedure)
│   ├── meilisearch.ts   # Search index configuration & sync
│   └── scripts/         # sync-search.ts (PostgreSQL → Meilisearch)
├── src/
│   ├── pages/           # Route pages (Home, Products, ProductDetail, Contact, About, Quality, Testimonials, Admin)
│   ├── components/      # Reusable UI components (shadcn/ui + custom)
│   ├── hooks/           # Custom React hooks
│   └── lib/             # tRPC client setup, utilities
├── public/              # Static assets
└── docker-compose.yml   # PostgreSQL 16 + Meilisearch services
```

## Key Features

### Public Site
- **Homepage**: Hero, category grid (fetched from DB), testimonials, trust badges, manufacturing showcase
- **Product Catalog**: Category-filtered browsing with animated grid, price ranges, MOQ display
- **Product Detail**: Full specs, size variants, image gallery, related products, "Request Quote" CTA
- **Live Search**: Meilisearch-powered instant search with typo tolerance and category filtering
- **Contact/Enquiry**: Zod-validated form, product pre-fill from URL, auto-linked to product pages
- **SEO**: Dynamic meta tags, OpenGraph images, structured data on every product page

### Admin Dashboard (`/admin`)
- **Secure Login**: bcrypt-hashed credentials, httpOnly session cookies
- **Overview**: Real-time stat cards + enquiry trend sparkline
- **Enquiry Manager**: Sortable table, status pipeline, bulk updates, customer detail drawer
- **Product Manager**: Full CRUD with nested size variants, Cloudinary image upload, activate/deactivate
- **Category Manager**: Add/edit/delete with slug validation
- **Analytics**: Enquiry trends (line chart), category popularity (pie chart), top products (bar chart)

### Data Pipeline
- **3NF Relational Schema**: Categories → Products → Sizes/Images, Enquiries linked to products
- **Meilisearch Sync**: `npm run search:sync` denormalizes products for instant full-text search
- **Seed Scripts**: Idempotent upserts for 9 categories + 45 products across all trophy types

## Evaluation Roadmap

| Evaluation | Timeline | Deliverables |
|-----------|----------|-------------|
| **I** (Completed) | Weeks 1–6 | PostgreSQL schema (3NF), Prisma ORM, tRPC routers (category, product), Meilisearch index design, seed scripts |
| **II** (Current) | Week 7–12 | Admin dashboard with auth + CRUD, Cloudinary uploads, live search, analytics, real content pages, enquiry lifecycle |
| **III** (Planned) | Weeks 13–24 | AI chatbot (RAG-powered customer support), AI description generator, AI visual recommendations, WhatsApp integration, order/quote/invoice pipeline, full deployment |

## What Makes This Different from IndiaMART

IndiaMART hosts thousands of similar manufacturers on identical templates. This platform gives Delta Industries:

1. **Brand Ownership**: Custom domain, custom design, no third-party branding
2. **Direct Customer Relationships**: Enquiries come straight to their dashboard — no IndiaMART middleman fees
3. **Analytics**: Know which products are trending, which categories get most enquiries
4. **Scalability**: Ready for 1000+ products with AI-assisted description generation (Eval III)
5. **Search**: Customers find products instantly with typo-tolerant full-text search — no 80MB PDF to download
6. **Admin Control**: Add, edit, deactivate products in real-time without depending on IndiaMART's update cycle

## License

Internal project for Delta Industries industrial training internship.
