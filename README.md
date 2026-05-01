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
| ORM | Prisma 7.8 | Type-safe database access |
| Database | Prisma Postgres (Deno Deploy) | Serverless PostgreSQL |
| Search | Prisma OR + contains | Free full-text search, no external deps |
| Images | Cloudinary | CDN image upload & optimization |
| Charts | Recharts | Admin analytics dashboards |
| Auth | bcrypt + httpOnly cookies | Secure admin session management |
| Backend Runtime | Deno Deploy | Serverless edge deployment |
| Frontend Hosting | Vercel | Static SPA with edge CDN |

## Quick Start (Local Development)

### Prerequisites
- Deno v2.0+
- Node.js 18+ (for Vite frontend build)

### Setup

1. **Install Deno dependencies**:
```bash
deno install
```

2. **Set up environment variables** (`.env`):
```
# For local development with Prisma Postgres
DATABASE_URL="postgresql://USER:PASS@db.prisma.io:5432?sslmode=verify-full"
DIRECT_DATABASE_URL="postgresql://USER:PASS@db.prisma.io:5432?sslmode=verify-full"
ADMIN_SECRET="your-admin-secret"
```

3. **Push schema and generate Prisma client**:
```bash
deno run -A --env=.env npm:prisma db push
deno run -A --env=.env npm:prisma generate
```

4. **Seed the database**:
```bash
deno run -A --env=.env seed-deno.ts
```

5. **Start backend server**:
```bash
deno run -A --env=.env --unstable-sloppy-imports server/deno-deploy.ts
```

6. **Start frontend (separate terminal)**:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (frontend) and `http://localhost:8000` (backend)

## Deployment

### Backend — Deno Deploy

**Important**: To prevent backend from deploying on frontend changes, disable "Automatic Deployments" in Deno Deploy GitHub settings and use GitHub Actions instead.

1. In Deno Deploy dashboard → **Databases** → Attach **Prisma Postgres**
2. Copy the connection string from the database dashboard
3. Go to **Settings → Environment Variables** and add:
```
DATABASE_URL=postgresql://... (your Prisma Postgres connection string)
```
4. Set build command: `deno run -A npm:prisma generate`
5. Entrypoint: `server/deno-deploy.ts`
6. Disable "Automatic Deployments" in GitHub integration settings
7. Add `DENO_PROJECT_ID` to GitHub repository secrets (from Deno Deploy project settings)
8. Redeploy

The GitHub Actions workflow (`.github/workflows/deploy-backend.yml`) will automatically deploy only when backend files change (`server/`, `prisma/`, `deno.json`, etc.).

### Frontend — Vercel

1. Import your GitHub repo on Vercel
2. Add environment variable:
```
VITE_API_URL=https://your-backend.deno.net/trpc
```
3. Deploy — Vercel will build the React SPA automatically

### Environment Variables Reference

| Variable | Platform | Value Example |
|----------|----------|---------------|
| `DATABASE_URL` | Deno Deploy | `postgresql://user:pass@db.prisma.io:5432?sslmode=verify-full` |
| `DIRECT_DATABASE_URL` | Local only | Same as DATABASE_URL (for Prisma CLI migrations) |
| `VITE_API_URL` | Vercel | `https://your-backend.deno.net/trpc` |
| `ADMIN_SECRET` | Deno Deploy | Any strong random string |

## API Testing (Newman)

All Postman collections are in `postman/` folder. Run against deployed backend:

```bash
# Public API
newman run postman/public-api.json --global-var "baseUrl=https://your-backend.deno.net"

# Admin Auth
newman run postman/admin-auth.json --global-var "baseUrl=https://your-backend.deno.net"

# Admin Categories
newman run postman/admin-categories.json --global-var "baseUrl=https://your-backend.deno.net"

# Admin Products
newman run postman/admin-products.json --global-var "baseUrl=https://your-backend.deno.net"

# Admin Enquiries
newman run postman/admin-enquiries.json --global-var "baseUrl=https://your-backend.deno.net"
```

**Default admin credentials:** `admin@deltaindustries.in` / `admin123`

## Project Structure

```
├── prisma/              # Database schema, migrations, seed scripts
│   ├── schema.prisma    # 7 models: Category, Product, ProductSize, ProductImage, Enquiry, Admin, Session
│   ├── seed.ts          # Original seed script (Node.js version)
│   └── seed-deno.ts     # Deno-compatible seed script for deployment
├── server/              # tRPC API backend (Deno Deploy compatible)
│   ├── routers/         # category, product, enquiry, admin, search
│   ├── trpc.ts          # Context & middleware (publicProcedure, adminProcedure)
│   ├── db.ts            # Prisma Client with PrismaPg adapter
│   ├── deno-deploy.ts   # Express entrypoint for Deno Deploy
│   └── meilisearch.ts   # Search using Prisma OR+contains (no external service)
├── src/
│   ├── pages/           # Route pages
│   ├── components/      # Reusable UI components (shadcn/ui + custom)
│   ├── hooks/           # Custom React hooks
│   └── lib/             # tRPC client setup (VITE_API_URL configurable)
├── postman/             # API test collections (Newman)
│   ├── public-api.json
│   ├── admin-auth.json
│   ├── admin-categories.json
│   ├── admin-products.json
│   └── admin-enquiries.json
├── public/              # Static assets
├── deno.json            # Deno imports and tasks
└── prisma.config.ts     # Prisma 7 configuration
```

## Key Features

### Public Site
- **Homepage**: Hero, category grid (fetched from DB), testimonials, trust badges, manufacturing showcase
- **Product Catalog**: Category-filtered browsing with animated grid, price ranges, MOQ display
- **Product Detail**: Full specs, size variants, image gallery, related products, "Request Quote" CTA
- **Live Search**: Prisma OR + contains search — free, no external dependencies, works in Deno Deploy
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
- **Search**: Prisma OR + `contains` with `mode: 'insensitive'` — no external service needed
- **Seed Scripts**: `seed-deno.ts` for Deno runtime (idempotent upserts for 9 categories + 15 products + testimonials + admin)

## Evaluation Roadmap

| Evaluation | Timeline | Deliverables |
|-----------|----------|-------------|
| **I** (Completed) | Weeks 1–6 | PostgreSQL schema (3NF), Prisma ORM, tRPC routers (category, product), Meilisearch index design, seed scripts |
| **II** (Current) | Week 7–12 | Admin dashboard with auth + CRUD, Cloudinary uploads, live search, analytics, real content pages, enquiry lifecycle |
| **III** (Planned) | Weeks 13–24 | AI chatbot (RAG-powered customer support), AI description generator, AI visual recommendations, WhatsApp integration, order/quote/invoice pipeline, full deployment |

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Vercel (Frontend)                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │  Home   │ │Products │ │ Search  │ │  Admin  │           │
│  │  Page   │ │  Page   │ │  Page   │ │Dashboard│           │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘           │
│       └───────────┴───────────┴───────────┘                │
│                   tRPC Client (React Query)                  │
└───────────────────────────┬─────────────────────────────────┘
                        │ HTTPS + CORS
┌───────────────────────────┴─────────────────────────────────┐
│              Deno Deploy (Backend)                           │
│              Express + tRPC v11 API Server                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │category │ │ product │ │ enquiry │ │  admin  │           │
│  │ router  │ │ router  │ │ router  │ │ router  │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                    Prisma ORM 7.8                           │
│       ┌───────────┴───────────┐                            │
│       ▼                       ▼                            │
│  Prisma Postgres        Prisma Postgres                    │
│  (production)           (preview per branch)               │
└─────────────────────────────────────────────────────────────┘
```

## Why This Architecture

| Decision | Reason |
|----------|--------|
| **Deno Deploy** | Serverless edge runtime with native TypeScript, zero cold starts |
| **Prisma Postgres** | Built into Deno Deploy — no separate database hosting needed |
| **Prisma ORM + `contains` search** | Meilisearch requires a separate service; Prisma `OR` + `contains` is free and works in serverless |
| **Express on Deno** | Familiar middleware (cors, cookie-parser, json) with Deno's permission model |
| **Vercel + VITE_API_URL** | Frontend static hosting with environment-variable API target |

## What Makes This Different from IndiaMART

IndiaMART hosts thousands of similar manufacturers on identical templates. This platform gives Delta Industries:

1. **Brand Ownership**: Custom domain, custom design, no third-party branding
2. **Direct Customer Relationships**: Enquiries come straight to their dashboard — no IndiaMART middleman fees
3. **Analytics**: Know which products are trending, which categories get most enquiries
4. **Scalability**: Ready for 1000+ products with AI-assisted description generation (Eval III)
5. **Search**: Customers find products instantly with free Prisma search — no 80MB PDF to download
6. **Admin Control**: Add, edit, deactivate products in real-time without depending on IndiaMART's update cycle

## License

Internal project for Delta Industries industrial training internship.
