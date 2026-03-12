import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

import catWooden from "@/assets/cat-wooden.jpg";
import catAcrylic from "@/assets/cat-acrylic.jpg";
import catMetal from "@/assets/cat-metal.jpg";

import catCrystal from "@/assets/cat-crystal.jpg";
import catPlastic from "@/assets/cat-plastic.jpg";
import catMedals from "@/assets/cat-medals.jpg";
import catBases from "@/assets/cat-bases.jpg";
import catCorporate from "@/assets/cat-corporate.jpg";
import catShields from "@/assets/cat-shields.jpg";

export const dummyProducts = [
  { slug: "classic-wooden-trophy", name: "Classic Wooden Trophy", category: "Wooden", image: catWooden, desc: "Handcrafted from premium hardwood with gold accents. A timeless symbol of enduring achievement, perfectly finished to highlight the natural grain of the wood. This luxurious piece is designed for monumental legacies.", price: "Luxury Collection", features: ["Solid Hardwood", "Brass Plate", "Hand-polished Form"] },
  { slug: "elegance-acrylic-award", name: "Elegance Acrylic Award", category: "Acrylic", image: catAcrylic, desc: "Modern transparent acrylic with vibrant color inlays. A forward-looking, adaptive recognition piece built to anticipate what's next. Clean lines with massive impact.", price: "Modern Collection", features: ["Shatter-resistant", "Custom Inlays", "Laser Engravable"] },
  { slug: "champion-metal-cup", name: "Champion Metal Cup", category: "Metal", image: catMetal, desc: "Polished gold-finish metal cup with engraving plate. Exudes absolute prestige and weight. Designed for the pinnacle of excellence and corporate milestones.", price: "Prestige Collection", features: ["24k Gold Finish", "Weighted Base", "Ornate Handles"] },
  { slug: "crystal-star-award", name: "Crystal Star Award", category: "Crystal", image: catCrystal, desc: "Precision-cut crystal with laser-engraved details.", price: "Prestige Collection", features: ["Premium Crystal", "Laser Engravable", "Silk Lined Box"] },
  { slug: "economy-plastic-trophy", name: "Economy Plastic Trophy", category: "Plastic", image: catPlastic, desc: "Lightweight, durable trophies for high-volume events.", price: "Classic Collection", features: ["Durable Material", "Custom Sticker", "Bulk Pricing"] },
  { slug: "achievement-medal-set", name: "Achievement Medal Set", category: "Medals", image: catMedals, desc: "Gold, silver, and bronze medals with custom ribbons.", price: "Classic Collection", features: ["Custom Logo", "Woven Ribbon", "Metal Alloy"] },
  { slug: "marble-trophy-base", name: "Marble Trophy Base", category: "Bases", image: catBases, desc: "Premium marble and wooden stands for all trophy types.", price: "Luxury Collection", features: ["Solid Marble", "Felt Bottom", "Weighted"] },
  { slug: "executive-gift-set", name: "Executive Gift Set", category: "Corporate", image: catCorporate, desc: "Curated corporate gift sets with personalization.", price: "Modern Collection", features: ["Laser Etching", "Premium Packaging", "Curated Items"] },
  { slug: "heritage-shield-plaque", name: "Heritage Shield Plaque", category: "Shields", image: catShields, desc: "Traditional wooden shield with brass engraving plate.", price: "Classic Collection", features: ["Solid Wood", "Brass Detailing", "Wall Mountable"] }
];

const ProductDetail = () => {
  const { slug } = useParams();
  const product = dummyProducts.find(p => p.slug === slug) || {
    ...dummyProducts[0],
    name: slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Trophy",
    slug: slug || "trophy"
  };

  return (
    <Layout>
      <section className="w-full bg-[#ffffe3] text-[#35020D] min-h-screen pt-24 pb-32 font-sans selection:bg-[#35020D] selection:text-[#fffff1]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
          <Link to="/products" className="inline-flex items-center gap-3 text-xs md:text-sm font-medium tracking-normal hover:opacity-70 transition-opacity mb-12">
            <span className="inline-block w-1.5 h-1.5 border-[1.5px] border-[#35020D] rounded-full"></span>
            <span>Back to Products</span>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-6 bg-[#35020D]/5 aspect-[4/5] relative overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
            </motion.div>

            {/* Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <div className="border-b border-[#35020D]/20 pb-8 mb-8">
                <p className="text-sm font-semibold tracking-widest uppercase mb-4 opacity-70">
                  {product.category} &mdash; {product.price}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-[#35020D]">
                  {product.name}
                </h1>
              </div>

              <div className="prose prose-lg prose-p:text-[#35020D]/80 mb-12">
                <p className="text-base md:text-xl font-medium leading-relaxed">
                  {product.desc}
                </p>
              </div>

              <div className="space-y-4 mb-12">
                <h3 className="text-xs font-bold uppercase tracking-widest">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-medium">
                       <span className="inline-block w-1 h-1 bg-[#35020D] rounded-full"></span>
                       {f}
                    </li>
                  ))}
                </ul>
              </div>

              <a href="/contact" className="inline-flex items-center gap-3 text-sm md:text-base font-semibold tracking-normal hover:bg-[#35020D] hover:text-[#fffff1] bg-transparent border-2 border-[#35020D] text-[#35020D] px-8 py-4 rounded-[2rem] transition-colors w-fit">
                <span>Request Custom Quote</span>
                <span className="inline-block w-1.5 h-1.5 border-[1.5px] border-current rounded-full"></span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;

