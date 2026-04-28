import { MeiliSearch } from "meilisearch";

const meili = new MeiliSearch({
  host: process.env.MEILI_URL || "http://localhost:7700",
  apiKey: process.env.MEILI_MASTER_KEY || "delta_meili_master_key",
});

const PRODUCT_INDEX = "products";

/**
 * Flat denormalized product document structure for the search index.
 * Designed for fast full-text search with typo tolerance.
 */
export interface ProductSearchDocument {
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
  /** Smallest size label if available */
  sizeLabel: string | null;
  /** Minimum price across all sizes */
  priceMin: number | null;
}

/** Configure the products index with searchable attributes, filters, and ranking */
export async function configureProductIndex() {
  const index = meili.index(PRODUCT_INDEX);

  await index.updateSettings({
    searchableAttributes: [
      "name",
      "categoryName",
      "material",
      "shortDesc",
      "description",
    ],
    filterableAttributes: [
      "categorySlug",
      "material",
      "isCustomizable",
      "isFeatured",
    ],
    sortableAttributes: ["viewCount", "priceMin", "name"],
    rankingRules: [
      "words",
      "typo",
      "proximity",
      "attribute",
      "sort",
      "exactness",
      "viewCount:desc",
    ],
    typoTolerance: {
      enabled: true,
      minWordSizeForTypos: { oneTypo: 4, twoTypos: 8 },
    },
    pagination: { maxTotalHits: 1000 },
  });

  console.log(`[meilisearch] Index "${PRODUCT_INDEX}" configured successfully`);
  return index;
}

/** Add or update product documents in the search index */
export async function indexProducts(documents: ProductSearchDocument[]) {
  const index = meili.index(PRODUCT_INDEX);
  const result = await index.addDocuments(documents, { primaryKey: "id" });
  console.log(`[meilisearch] Indexed ${documents.length} products — taskUid: ${result.taskUid}`);
  return result;
}

/** Search products with optional category filter */
export async function searchProducts(
  query: string,
  options?: { categorySlug?: string; limit?: number; offset?: number }
) {
  const index = meili.index(PRODUCT_INDEX);
  return index.search(query, {
    filter: options?.categorySlug
      ? `categorySlug = "${options.categorySlug}"`
      : undefined,
    limit: options?.limit ?? 20,
    offset: options?.offset ?? 0,
  });
}

export { meili, PRODUCT_INDEX };
