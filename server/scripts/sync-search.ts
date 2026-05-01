/**
 * Script to sync search index - no-op for Supabase full-text search.
 * Supabase/PostgreSQL full-text search is real-time and doesn't require indexing.
 * This script is kept for compatibility but does nothing.
 */
import { configureProductIndex } from "../meilisearch.ts";

async function main() {
  console.log("[sync-search] Using Supabase/PostgreSQL full-text search - no sync needed");
  console.log("[sync-search] Search is real-time and uses built-in PostgreSQL search capabilities");
  await configureProductIndex();
}

main()
  .catch((e) => {
    console.error("[sync-search] Failed:", e);
    process.exit(1);
  });
