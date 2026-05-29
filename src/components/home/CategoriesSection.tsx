import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";

import catWooden from "@/assets/cat-wooden.webp";
import catAcrylic from "@/assets/cat-acrylic.webp";
import catMetal from "@/assets/cat-metal.webp";
import catCrystal from "@/assets/cat-crystal.webp";
import catPlastic from "@/assets/cat-plastic.webp";
import catMedals from "@/assets/cat-medals.webp";
import catBases from "@/assets/cat-bases.webp";
import catCorporate from "@/assets/cat-corporate.webp";
import catShields from "@/assets/cat-shields.webp";

const staticImages: Record<string, string> = {
  "wooden-trophies": catWooden,
  "acrylic-awards": catAcrylic,
  "metal-cups-trophies": catMetal,
  "crystal-trophies": catCrystal,
  "plastic-trophy-series": catPlastic,
  "custom-medals": catMedals,
  "trophy-bases-accessories": catBases,
  "corporate-gift-mementos": catCorporate,
  "shields-plaques": catShields,
};

const fallbackCategories = [
  { name: "Wooden Trophies", slug: "wooden-trophies" },
  { name: "Acrylic Awards", slug: "acrylic-awards" },
  { name: "Metal Cups & Trophies", slug: "metal-cups-trophies" },
  { name: "Crystal Trophies", slug: "crystal-trophies" },
  { name: "Plastic Series", slug: "plastic-trophy-series" },
  { name: "Custom Medals", slug: "custom-medals" },
  { name: "Trophy Bases", slug: "trophy-bases-accessories" },
  { name: "Corporate Mementos", slug: "corporate-gift-mementos" },
  { name: "Premium Shields", slug: "shields-plaques" },
];

const CategoriesSection = () => {
  const { data: apiCategories } = trpc.category.getAll.useQuery();
  const categories = apiCategories ?? fallbackCategories;

  return (
    <section className="w-full min-h-[800px] md:min-h-[900px] flex items-center py-20 md:py-32 bg-[#ffffe3] text-[#35020D] selection:bg-[#35020D] selection:text-[#ffffe3] border-t border-[#1b1610]/10">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24"
        >
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight leading-[1.1]">
              Materials &amp; Categories
            </h2>
            <p className="mt-6 text-base md:text-lg font-medium text-[#35020D]/70">
              Explore our extensive range of premium materials, precisely crafted to celebrate milestones of every magnitude.
            </p>
          </div>
          <Link to="/products" className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold tracking-widest hover:opacity-70 transition-opacity uppercase border-b border-[#1b1610] pb-1 whitespace-nowrap">
            <span>View Catalog</span>
            <span className="text-lg leading-none font-light">&rarr;</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={`/products?category=${cat.slug}`}
                className="group block"
              >
                <div className="aspect-square overflow-hidden bg-[#35020D]/5 mb-6">
                  <img
                    src={staticImages[cat.slug] ?? catWooden}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-\[0.16\,1\,0.3\,1\]"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-medium tracking-tight">
                    {cat.name}
                  </h3>
                  <div className="mt-3 w-8 h-[1px] bg-[#35020D] group-hover:w-full transition-all duration-500 ease-\[0.16\,1\,0.3\,1\]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;



