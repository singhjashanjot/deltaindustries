import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { trpc } from "@/lib/trpc";
import { Search, X, Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SEARCH } from "@/lib/constants";
import type { SearchResultProduct } from "@/lib/types";

import { getProductImageUrl } from "@/lib/product-images";

interface AISearchResult {
  interpretedAs?: string;
  category?: string | null;
  material?: string | null;
  budget?: string | null;
  useCase?: string | null;
  size?: string | null;
  keywords?: string[];
}

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  const smartSearchMutation = trpc.ai.smartSearch.useMutation();

  const { data, isLoading } = trpc.search.products.useQuery(
    { q: debouncedQuery, limit: SEARCH.DEFAULT_LIMIT },
    { enabled: debouncedQuery.length > 0, retry: false }
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // If query looks like natural language (has spaces, more than 2 words), try AI
    if (trimmed.split(" ").length >= 3) {
      setIsAiProcessing(true);
      setAiResult(null);
      try {
        const result = await smartSearchMutation.mutateAsync({ query: trimmed });
        setAiResult(result);
        // Use broader search: original query + extracted keywords + category
        const keywords = result.keywords?.join(" ") || "";
        const searchTerms = [trimmed, keywords].filter(Boolean).join(" ");
        setDebouncedQuery(searchTerms);
      } catch {
        setDebouncedQuery(trimmed);
      }
      setIsAiProcessing(false);
    } else {
      setAiResult(null);
      setDebouncedQuery(trimmed);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
    setAiResult(null);
  };

  const removeAiFilter = () => {
    setAiResult(null);
    setDebouncedQuery(query.trim());
  };

  return (
    <Layout>
      <section className="w-full py-16 md:py-24 font-sans bg-[#ffffe3] text-[#35020D] min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-normal leading-[1.05] tracking-tight mb-6 text-center">Search Products</h1>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: golden trophy for cricket tournament under 500 rupees..."
                className="w-full px-6 py-4 pr-24 rounded-sm border border-[#35020D]/20 bg-[#fffff1] text-[#35020D] placeholder:text-[#35020D]/40 focus:outline-none focus:border-[#35020D]/50 text-lg"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {query && (
                  <button type="button" onClick={clearSearch} className="p-2 hover:bg-[#35020D]/5 rounded-sm">
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button type="submit" className="p-2 bg-[#35020D] text-[#ffffe3] rounded-sm hover:bg-[#35020D]/90">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* AI Interpretation */}
            <AnimatePresence>
              {isAiProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 mt-4 text-sm text-[#35020D]/50"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Understanding your request...</span>
                </motion.div>
              )}

              {aiResult && !isAiProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 border border-[#35020D]/10 rounded-sm bg-[#fffff1]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#35020D]/60 uppercase tracking-wide">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Search understood as</span>
                    </div>
                    <button onClick={removeAiFilter} className="text-xs text-[#35020D]/40 hover:text-[#35020D] transition-colors">
                      Clear
                    </button>
                  </div>
                  <p className="text-sm text-[#35020D] mb-3">{aiResult.interpretedAs || query}</p>
                  <div className="flex flex-wrap gap-2">
                    {aiResult.category && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#35020D]/5 text-[#35020D] border border-[#35020D]/10">
                        Category: {aiResult.category.replace(/-/g, " ")}
                      </span>
                    )}
                    {aiResult.material && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#35020D]/5 text-[#35020D] border border-[#35020D]/10">
                        Material: {aiResult.material}
                      </span>
                    )}
                    {aiResult.budget && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#35020D]/5 text-[#35020D] border border-[#35020D]/10">
                        Budget: {aiResult.budget}
                      </span>
                    )}
                    {aiResult.useCase && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#35020D]/5 text-[#35020D] border border-[#35020D]/10">
                        Event: {aiResult.useCase}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {isLoading && (
              <div className="flex justify-center mt-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#35020D]/60" />
              </div>
            )}
          </motion.div>

          <AnimatePresence>
            {data && data.hits.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.hits.map((product: SearchResultProduct) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="group block border border-[#35020D]/10 rounded-sm overflow-hidden hover:border-[#35020D]/30 transition-colors bg-[#fffff1]"
                  >
                    <div className="aspect-square bg-[#35020D]/5 overflow-hidden">
                      <img
                        src={getProductImageUrl(product.imageUrl, product.slug, product.categorySlug, product.id)}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs font-semibold tracking-widest uppercase opacity-60 mb-1">{product.categoryName}</div>
                      <h3 className="font-medium text-[#35020D] line-clamp-2">{product.name}</h3>
                      {product.priceMin !== null && (
                        <p className="text-sm mt-2 opacity-80">From Rs {product.priceMin}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {data && data.hits.length === 0 && debouncedQuery && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg opacity-60">No products found for &ldquo;{debouncedQuery}&rdquo;</p>
            </motion.div>
          )}

          {!debouncedQuery && (
            <div className="text-center py-16 opacity-50">
              <Search className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg">Type a keyword and press Enter to search</p>
              <p className="text-sm mt-2 opacity-60">You can use natural language — for example, &ldquo;plastic trophies for school sports day under Rs 100&rdquo;</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default SearchPage;
