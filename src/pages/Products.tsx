import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { getProductImageUrl } from "@/lib/product-images";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const { data: apiCategories } = trpc.category.getAll.useQuery();
  const { data: apiProducts, isLoading } = trpc.product.getByCategory.useQuery(
    activeCategory === "all" ? undefined : { categorySlug: activeCategory }
  );

  const filterCategories = [
    { name: "All", slug: "all" },
    ...(apiCategories ?? []).map((c) => ({ name: c.name, slug: c.slug })),
  ];

  return (
    <Layout>
      <section className="w-full py-24 md:py-32 font-sans bg-[#ffffe3] text-[#35020D] min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-70">Catalog</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight mt-3 text-[#35020D]">Our Products</h1>
            <p className="mt-6 text-[#35020D]/80 font-medium leading-relaxed md:text-lg max-w-2xl">
              Browse our range of trophies, awards, and recognition products. All items available for bulk orders with full customization.
            </p>
          </motion.div>

          {/* Filters */}
          {filterCategories.length > 1 && (
            <div className="flex items-center gap-4 mb-16 overflow-x-auto pb-4 border-b border-[#35020D]/10">
              <Filter className="w-5 h-5 text-[#35020D] shrink-0" />
              {filterCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSearchParams(cat.slug === "all" ? {} : { category: cat.slug })}
                  className={`shrink-0 px-5 py-2.5 rounded-[2rem] text-sm font-semibold transition-all duration-200 border ${
                    activeCategory === cat.slug
                      ? "bg-[#35020D] text-[#fffff1] border-[#35020D]"
                      : "bg-transparent text-[#35020D] border-[#35020D]/20 hover:border-[#35020D]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-x-8 md:gap-y-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col animate-pulse">
                  <div className="aspect-square bg-[#35020D]/10 rounded-sm mb-6" />
                  <div className="h-3 bg-[#35020D]/10 rounded w-1/3 mb-3" />
                  <div className="h-5 bg-[#35020D]/10 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-[#35020D]/10 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-x-8 md:gap-y-12">
              {(apiProducts ?? []).map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={`/product/${product.slug}`}
                    className="group flex flex-col cursor-pointer block"
                  >
                    <div className="aspect-square overflow-hidden bg-[#35020D]/5 mb-6 rounded-sm border border-[#35020D]/10">
                      <img
                        src={getProductImageUrl(product.imageUrl, product.slug, product.category.slug, product.id)}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#35020D]/60 mb-2">
                        {product.category.name}
                      </span>
                      <h3 className="text-xl font-medium tracking-tight text-[#35020D] mb-3 group-hover:opacity-70 transition-opacity">{product.name}</h3>
                      <p className="text-sm text-[#35020D]/70 font-medium leading-relaxed mb-4">{product.shortDesc}</p>
                      {product.sizes && product.sizes.length > 0 && (
                        <p className="text-xs text-[#35020D]/50 mb-4">
                          {product.sizes.map(s => s.label).join(" · ")}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
