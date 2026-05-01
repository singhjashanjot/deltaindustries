import { db } from "./db";

/**
 * Product search result structure
 */
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
 * Search products using Supabase/PostgreSQL full-text search
 */
export async function searchProducts(
  query: string,
  options?: { categorySlug?: string; limit?: number; offset?: number }
): Promise<{ hits: ProductSearchResult[]; estimatedTotalHits: number; processingTimeMs: number }> {
  const startTime = Date.now();
  const limit = options?.limit ?? 20;
  const offset = options?.offset ?? 0;

  // Build the search query using PostgreSQL full-text search
  const searchQuery = query
    .split(" ")
    .filter((word) => word.length > 0)
    .join(" & "); // AND operator for all terms

  const categoryFilter = options?.categorySlug ? `AND c.slug = '${options.categorySlug}'` : "";

  const searchResults = await db.$queryRaw<ProductSearchResult[]>`
    SELECT 
      p.id,
      p.name,
      p.slug,
      c.name AS "categoryName",
      c.slug AS "categorySlug",
      p.material,
      p.short_desc AS "shortDesc",
      p.description,
      p.image_url AS "imageUrl",
      p.is_customizable AS "isCustomizable",
      p.is_featured AS "isFeatured",
      p.view_count AS "viewCount",
      (SELECT label FROM product_sizes WHERE product_id = p.id ORDER BY price_min ASC LIMIT 1) AS "sizeLabel",
      (SELECT MIN(price_min) FROM product_sizes WHERE product_id = p.id) AS "priceMin"
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE 
      p.is_active = true
      AND (
        to_tsvector('english', p.name || ' ' || COALESCE(p.material, '') || ' ' || COALESCE(p.short_desc, '') || ' ' || COALESCE(p.description, '')) 
        @@ to_tsquery('english', ${searchQuery})
      )
      ${categoryFilter}
    ORDER BY 
      p.is_featured DESC,
      p.view_count DESC,
      p.name ASC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  const countResult = await db.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) as count
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE 
      p.is_active = true
      AND (
        to_tsvector('english', p.name || ' ' || COALESCE(p.material, '') || ' ' || COALESCE(p.short_desc, '') || ' ' || COALESCE(p.description, '')) 
        @@ to_tsquery('english', ${searchQuery})
      )
      ${categoryFilter}
  `;

  const processingTimeMs = Date.now() - startTime;
  const totalHits = Number(countResult[0]?.count || 0);

  return {
    hits: searchResults,
    estimatedTotalHits: totalHits,
    processingTimeMs,
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
