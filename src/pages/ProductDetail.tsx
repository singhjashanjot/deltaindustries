import { useParams, Link } from "react-router-dom";
import { useState } from "react";
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
  { slug: "classic-wooden-trophy", name: "Classic Wooden Trophy", category: "Wooden", image: catWooden, images: [catWooden, catBases, catShields], desc: "Handcrafted from premium hardwood with gold accents. A timeless symbol of enduring achievement, perfectly finished to highlight the natural grain of the wood. This luxurious piece is designed for monumental legacies.", price: "Luxury Collection", features: ["Solid Hardwood", "Brass Plate", "Hand-polished Form"], specs: { material: "Wood", size: "10-14 inch", color: "Natural Walnut", shape: "Rectangular", productCode: "DW-201", origin: "Made in India" }, about: "Delta Industries presents the Classic Wooden Trophy, a masterpiece of traditional craftsmanship. Each piece is hand-carved from sustainably sourced hardwood and finished with a rich lacquer to enhance the natural grain. Ideal for corporate milestones, lifetime achievement awards, and executive recognition ceremonies. Fully customizable with engraved brass plates for a personal touch." },
  { slug: "elegance-acrylic-award", name: "Elegance Acrylic Award", category: "Acrylic", image: catAcrylic, images: [catAcrylic, catCrystal, catCorporate], desc: "Modern transparent acrylic with vibrant color inlays. A forward-looking, adaptive recognition piece built to anticipate what's next. Clean lines with massive impact.", price: "Modern Collection", features: ["Shatter-resistant", "Custom Inlays", "Laser Engravable"], specs: { material: "Acrylic", size: "8-12 inch", color: "Transparent / Multi", shape: "Freeform", productCode: "DA-305", origin: "Made in India" }, about: "The Elegance Acrylic Award from Delta Industries combines contemporary design with vibrant color-infused layers. Its shatter-resistant body and crystal-clear finish make it a standout piece for modern corporate events, tech summits, and creative industry awards. Perfect for B2B clients who value sleek aesthetics and durability." },
  { slug: "champion-metal-cup", name: "Champion Metal Cup", category: "Metal", image: catMetal, images: [catMetal, catWooden, catMedals], desc: "Polished gold-finish metal cup with engraving plate. Exudes absolute prestige and weight. Designed for the pinnacle of excellence and corporate milestones.", price: "Prestige Collection", features: ["24k Gold Finish", "Weighted Base", "Ornate Handles"], specs: { material: "Metal Alloy", size: "12-18 inch", color: "Golden", shape: "Cup", productCode: "DM-410", origin: "Made in India" }, about: "The Champion Metal Cup by Delta Industries is the ultimate symbol of victory. Crafted from premium metal alloy with a lustrous 24k gold finish, this trophy features ornate handles and a weighted base for commanding presence. Suited for sports tournaments, annual corporate galas, and championship events. Engravable plates available for personalized inscriptions." },
  { slug: "crystal-star-award", name: "Crystal Star Award", category: "Crystal", image: catCrystal, images: [catCrystal, catAcrylic, catCorporate], desc: "Precision-cut crystal with laser-engraved details.", price: "Prestige Collection", features: ["Premium Crystal", "Laser Engravable", "Silk Lined Box"], specs: { material: "Crystal", size: "6-10 inch", color: "Clear", shape: "Star", productCode: "DC-512", origin: "Made in India" }, about: "Delta Industries offers the Crystal Star Award, a beacon of excellence precision-cut from optical-grade crystal. Each star facet catches light beautifully, creating a dazzling display. Delivered in a silk-lined presentation box, it's perfect for employee recognition, academic honors, and VIP corporate gifts." },
  { slug: "economy-plastic-trophy", name: "Economy Plastic Trophy", category: "Plastic", image: catPlastic, images: [catPlastic, catMedals, catBases], desc: "Lightweight, durable trophies for high-volume events.", price: "Classic Collection", features: ["Durable Material", "Custom Sticker", "Bulk Pricing"], specs: { material: "Plastic", size: "5-10 inch", color: "Golden", shape: "Star", productCode: "PF-128", origin: "Made in India" }, about: "Delta Industries offers elegant Star Award Trophies, designed to recognize outstanding achievement and excellence. Crafted from high-quality materials with a striking star design, these trophies are perfect for corporate awards, academic honors, and special events. Customizable and durable, they're ideal for B2B clients seeking impactful and memorable recognition solutions." },
  { slug: "achievement-medal-set", name: "Achievement Medal Set", category: "Medals", image: catMedals, images: [catMedals, catMetal, catShields], desc: "Gold, silver, and bronze medals with custom ribbons.", price: "Classic Collection", features: ["Custom Logo", "Woven Ribbon", "Metal Alloy"], specs: { material: "Metal Alloy", size: "2.5-3 inch diameter", color: "Gold / Silver / Bronze", shape: "Round", productCode: "DM-615", origin: "Made in India" }, about: "The Achievement Medal Set from Delta Industries delivers timeless recognition in gold, silver, and bronze. Each medal is die-cast from durable metal alloy and paired with a custom woven ribbon. Ideal for sporting events, school competitions, and corporate team-building ceremonies. Bulk customization available with your logo and event details." },
  { slug: "marble-trophy-base", name: "Marble Trophy Base", category: "Bases", image: catBases, images: [catBases, catWooden, catMetal], desc: "Premium marble and wooden stands for all trophy types.", price: "Luxury Collection", features: ["Solid Marble", "Felt Bottom", "Weighted"], specs: { material: "Marble", size: "3-6 inch height", color: "Black / White", shape: "Rectangular", productCode: "DB-720", origin: "Made in India" }, about: "Elevate any trophy with Delta Industries' premium Marble Trophy Bases. Available in classic black and white marble, each base features a felt-padded bottom to protect surfaces. Their substantial weight ensures stability and a luxurious feel. Compatible with all Delta trophy lines and fully customizable with engraved nameplates." },
  { slug: "executive-gift-set", name: "Executive Gift Set", category: "Corporate", image: catCorporate, images: [catCorporate, catCrystal, catAcrylic], desc: "Curated corporate gift sets with personalization.", price: "Modern Collection", features: ["Laser Etching", "Premium Packaging", "Curated Items"], specs: { material: "Mixed", size: "Assorted", color: "Assorted", shape: "Gift Box", productCode: "DG-830", origin: "Made in India" }, about: "Delta Industries' Executive Gift Set is a curated collection of premium branded items perfect for C-suite gifting, client appreciation, and milestone celebrations. Each set includes laser-etched accessories presented in bespoke packaging. Fully customizable to reflect your brand identity, making every gift a lasting impression." },
  { slug: "heritage-shield-plaque", name: "Heritage Shield Plaque", category: "Shields", image: catShields, images: [catShields, catWooden, catBases], desc: "Traditional wooden shield with brass engraving plate.", price: "Classic Collection", features: ["Solid Wood", "Brass Detailing", "Wall Mountable"], specs: { material: "Wood & Brass", size: "10-16 inch", color: "Dark Mahogany", shape: "Shield", productCode: "DS-940", origin: "Made in India" }, about: "The Heritage Shield Plaque from Delta Industries is a tribute to tradition. Handcrafted from solid wood with intricate brass detailing, this wall-mountable plaque is perfect for institutional awards, government honors, and legacy recognition. Each piece can be engraved with custom text and logos for a truly personalized keepsake." }
];

const ProductDetail = () => {
  const { slug } = useParams();
  const product = dummyProducts.find(p => p.slug === slug) || {
    ...dummyProducts[0],
    name: slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Trophy",
    slug: slug || "trophy"
  };

  const allImages = [product.image, ...(product.images || [])];
  const [activeImage, setActiveImage] = useState(product.image);

  return (
    <Layout>
      <section className="w-full bg-[#ffffe3] text-[#35020D] min-h-screen pt-24 pb-32 font-sans selection:bg-[#35020D] selection:text-[#fffff1]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
          <Link to="/products" className="inline-flex items-center gap-3 text-xs md:text-sm font-medium tracking-normal hover:opacity-70 transition-opacity mb-12">
            <span className="inline-block w-1.5 h-1.5 border-[1.5px] border-[#35020D] rounded-full"></span>
            <span>Back to Products</span>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-5"
            >
              <div className="bg-[#35020D]/5 aspect-square relative overflow-hidden">
                <img src={activeImage} alt={product.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {allImages.slice(1, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square overflow-hidden border-2 transition-all ${activeImage === img ? "border-[#35020D]" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 2}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="lg:col-span-7 flex flex-col justify-start"
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

              {/* Product Specifications */}
              {product.specs && (
                <div className="mb-12">
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Specifications</h3>
                  <div className="border border-[#35020D]/10">
                    {[
                      ["Material", product.specs.material],
                      ["Size", product.specs.size],
                      ["Color", product.specs.color],
                      ["Shape", product.specs.shape],
                      ["Product Code", product.specs.productCode],
                      ["Country of Origin", product.specs.origin],
                    ].map(([label, value], i) => (
                      <div key={i} className={`flex ${i > 0 ? "border-t border-[#35020D]/10" : ""}`}>
                        <span className="w-2/5 px-4 py-3 text-xs font-semibold uppercase tracking-wider bg-[#35020D]/5">{label}</span>
                        <span className="w-3/5 px-4 py-3 text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About the Product */}
              {product.about && (
                <div className="mb-12">
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-4">About the Product</h3>
                  <p className="text-sm md:text-base font-medium leading-relaxed text-[#35020D]/70">
                    {product.about}
                  </p>
                </div>
              )}

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

