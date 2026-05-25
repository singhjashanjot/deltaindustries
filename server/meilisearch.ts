import { db } from "./db.ts";

export interface ProductSearchResult {
  id: number;
  name: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
  material: string | null;
  shortDesc: string | null;
  description: string | null;
  imageUrl: string | null;
  isCustomizable: boolean;
  isFeatured: boolean;
  viewCount: number;
  sizeLabel: string | null;
  priceMin: number | null;
}

/**
 * Search products using Prisma OR + contains (no external dependencies)
 */
export async function searchProducts(
  query: string,
  options?: { categorySlug?: string; limit?: number; offset?: number }
): Promise<{ hits: ProductSearchResult[]; estimatedTotalHits: number; processingTimeMs: number }> {
  const startTime = Date.now();
  const limit = options?.limit ?? 20;
  const offset = options?.offset ?? 0;
  const q = query.trim();

  // Split query into words for broader matching
  const words = q.split(/\s+/).filter(w => w.length > 1);
  const wordConditions = words.flatMap(w => [
    { name: { contains: w, mode: "insensitive" as const } },
    { material: { contains: w, mode: "insensitive" as const } },
    { shortDesc: { contains: w, mode: "insensitive" as const } },
    { description: { contains: w, mode: "insensitive" as const } },
    { category: { name: { contains: w, mode: "insensitive" as const } } },
  ]);

  const where: any = {
    isActive: true,
    OR: wordConditions.length > 0 ? wordConditions : [
      { name: { contains: q, mode: "insensitive" } },
      { material: { contains: q, mode: "insensitive" } },
      { shortDesc: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { category: { name: { contains: q, mode: "insensitive" } } },
    ],
  };

  if (options?.categorySlug) {
    where.category = { slug: options.categorySlug };
  }

  const [products, count] = await Promise.all([
    db.product.findMany({
      where,
      orderBy: [
        { isFeatured: "desc" },
        { viewCount: "desc" },
        { name: "asc" },
      ],
      take: limit,
      skip: offset,
      include: {
        category: { select: { name: true, slug: true } },
        sizes: { orderBy: { priceMin: "asc" }, take: 1 },
      },
    }),
    db.product.count({ where }),
  ]);

  const hits: ProductSearchResult[] = products.map((p) => ({
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

  return {
    hits,
    estimatedTotalHits: count,
    processingTimeMs: Date.now() - startTime,
  };
}

/**
 * Configure search - no-op for Supabase (uses built-in PostgreSQL search)
 */
export async function configureProductIndex() {
  console.log("[supabase-search] Using PostgreSQL full-text search - no configuration needed");
  return null;
}

/**
 * Index products - no-op for Supabase (search is real-time)
 */
export async function indexProducts() {
  console.log("[supabase-search] Using PostgreSQL full-text search - no indexing needed");
  return null;
}
