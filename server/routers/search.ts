import { z } from "zod";
import { router, publicProcedure } from "../trpc.ts";
import { searchProducts } from "../meilisearch.ts";

export const searchRouter = router({
  /** Search products via Supabase/PostgreSQL full-text search */
  products: publicProcedure
    .input(
      z.object({
        q: z.string().min(1).max(100),
        categorySlug: z.string().optional(),
        limit: z.number().int().min(1).max(50).default(20),
        offset: z.number().int().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const results = await searchProducts(input.q, {
        categorySlug: input.categorySlug,
        limit: input.limit,
        offset: input.offset,
      });
      return {
        hits: results.hits,
        totalHits: results.estimatedTotalHits,
        query: input.q,
        processingTimeMs: results.processingTimeMs,
      };
    }),
});
