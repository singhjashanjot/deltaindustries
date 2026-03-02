import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
  { name: "Wooden Trophies & Mementos", image: catWooden, slug: "wooden" },
  { name: "Acrylic Trophies & Awards", image: catAcrylic, slug: "acrylic" },
  { name: "Metal Trophies & Cups", image: catMetal, slug: "metal" },
  { name: "Crystal Trophies", image: catCrystal, slug: "crystal" },
  { name: "Plastic Trophies & Cups", image: catPlastic, slug: "plastic" },
  { name: "Medals", image: catMedals, slug: "medals" },
  { name: "Trophy Bases & Accessories", image: catBases, slug: "bases" },
  { name: "Corporate Gifts & Mementos", image: catCorporate, slug: "corporate" },
  { name: "Shields & Plaques", image: catShields, slug: "shields" },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
        >
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Our Range</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3 text-foreground">Product Categories</h2>
          </div>
          <Link to="/products" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/products?category=${cat.slug}`}
                className="group block skeu-card rounded-xl overflow-hidden hover:shadow-elevated transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-serif text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
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
