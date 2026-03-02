import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";

import catWooden from "@/assets/cat-wooden.jpg";
import catAcrylic from "@/assets/cat-acrylic.jpg";
import catMetal from "@/assets/cat-metal.jpg";
import catCrystal from "@/assets/cat-crystal.jpg";
import catPlastic from "@/assets/cat-plastic.jpg";
import catMedals from "@/assets/cat-medals.jpg";
import catBases from "@/assets/cat-bases.jpg";
import catCorporate from "@/assets/cat-corporate.jpg";
import catShields from "@/assets/cat-shields.jpg";

const categories = [
  { name: "All", slug: "all" },
  { name: "Wooden", slug: "wooden" },
  { name: "Acrylic", slug: "acrylic" },
  { name: "Metal", slug: "metal" },
  { name: "Crystal", slug: "crystal" },
  { name: "Plastic", slug: "plastic" },
  { name: "Medals", slug: "medals" },
  { name: "Bases & Accessories", slug: "bases" },
  { name: "Corporate Gifts", slug: "corporate" },
  { name: "Shields & Plaques", slug: "shields" },
];

const products = [
  { name: "Classic Wooden Trophy", category: "wooden", image: catWooden, desc: "Handcrafted from premium hardwood with gold accents." },
  { name: "Elegance Acrylic Award", category: "acrylic", image: catAcrylic, desc: "Modern transparent acrylic with vibrant color inlays." },
  { name: "Champion Metal Cup", category: "metal", image: catMetal, desc: "Polished gold-finish metal cup with engraving plate." },
  { name: "Crystal Star Award", category: "crystal", image: catCrystal, desc: "Precision-cut crystal with laser-engraved details." },
  { name: "Economy Plastic Trophy", category: "plastic", image: catPlastic, desc: "Lightweight, durable trophies for high-volume events." },
  { name: "Achievement Medal Set", category: "medals", image: catMedals, desc: "Gold, silver, and bronze medals with custom ribbons." },
  { name: "Marble Trophy Base", category: "bases", image: catBases, desc: "Premium marble and wooden stands for all trophy types." },
  { name: "Executive Gift Set", category: "corporate", image: catCorporate, desc: "Curated corporate gift sets with personalization." },
  { name: "Heritage Shield Plaque", category: "shields", image: catShields, desc: "Traditional wooden shield with brass engraving plate." },
  { name: "Royal Wooden Memento", category: "wooden", image: catWooden, desc: "Elegant memento with intricate woodwork detailing." },
  { name: "Modern Acrylic Plaque", category: "acrylic", image: catAcrylic, desc: "Sleek acrylic plaque suitable for corporate recognition." },
  { name: "Silver Metal Trophy", category: "metal", image: catMetal, desc: "Silver-finish metal trophy for prestigious events." },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const filtered = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Catalog</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mt-3 text-foreground">Our Products</h1>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Browse our comprehensive range of trophies, awards, and recognition products. All items available for bulk orders with full customization.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSearchParams(cat.slug === "all" ? {} : { category: cat.slug })}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.slug
                    ? "bg-primary text-primary-foreground shadow-premium"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.name + i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group skeu-card rounded-xl overflow-hidden hover:shadow-elevated transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-primary">{product.category}</span>
                  <h3 className="font-serif text-base font-semibold text-foreground">{product.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{product.desc}</p>
                  <Link to="/contact" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline underline-offset-4 pt-1">
                    Request Quote <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
