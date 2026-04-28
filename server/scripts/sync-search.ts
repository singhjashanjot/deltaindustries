/**
 * Script to configure the Meilisearch product index and sync products from PostgreSQL.
 * Run after seeding: npx tsx server/scripts/sync-search.ts
 */
import { PrismaClient } from "@prisma/client";
import {
  configureProductIndex,
  indexProducts,
  type ProductSearchDocument,
} from "../meilisearch";

const db = new PrismaClient();

async function main() {
  console.log("[sync-search] Configuring Meilisearch product index...\n");

  await configureProductIndex();

  console.log("[sync-search] Fetching products from database...");

  const products = await db.product.findMany({
    where: { isActive: true },
    include: {
      category: { select: { name: true, slug: true } },
      sizes: { orderBy: { priceMin: "asc" }, take: 1 },
    },
  });

  type ProductRow = (typeof products)[number];
  const documents: ProductSearchDocument[] = products.map((p: ProductRow) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    categoryName: p.category.name,
    categorySlug: p.category.slug,
    material: p.material,
    shortDesc: p.shortDesc,
    description: p.description,
    imageUrl: p.imageUrl,
    isCustomizable: p.isCustomizable,
    isFeatured: p.isFeatured,
    viewCount: p.viewCount,
    sizeLabel: p.sizes[0]?.label ?? null,
    priceMin: p.sizes[0]?.priceMin ? Number(p.sizes[0].priceMin) : null,
  }));

  console.log(`[sync-search] Indexing ${documents.length} products...\n`);
  await indexProducts(documents);

  console.log("[sync-search] Done! Products are now searchable.\n");
}

main()
  .catch((e) => {
    console.error("[sync-search] Failed:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
