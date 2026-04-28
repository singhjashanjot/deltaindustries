import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { trpc } from "@/lib/trpc";

import catWooden from "@/assets/cat-wooden.jpg";
import catAcrylic from "@/assets/cat-acrylic.jpg";
import catMetal from "@/assets/cat-metal.jpg";
import catCrystal from "@/assets/cat-crystal.jpg";
import catPlastic from "@/assets/cat-plastic.jpg";
import catMedals from "@/assets/cat-medals.jpg";
import catBases from "@/assets/cat-bases.jpg";
import catCorporate from "@/assets/cat-corporate.jpg";
import catShields from "@/assets/cat-shields.jpg";

const categoryImages: Record<string, string> = {
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

const featuresByMaterial: Record<string, string[]> = {
  wood: ["Handcrafted Hardwood", "Brass Engraving Plate", "Hand-polished Finish"],
  acrylic: ["Shatter-resistant", "Custom Color Inlays", "Laser Engravable"],
  metal: ["Premium Metal Alloy", "Weighted Base", "Gold / Silver Finish"],
  crystal: ["Optical-grade Crystal", "Laser Engraving", "Presentation Box Included"],
  plastic: ["Durable ABS Material", "Custom Full-color Print", "Bulk Order Pricing"],
  marble: ["Solid Marble", "Felt-padded Base", "Engraved Nameplate"],
  default: ["Customizable Design", "Premium Finish", "Bulk Order Available"],
};

function getFeaturesForMaterial(material: string | null): string[] {
  if (!material) return featuresByMaterial.default;
  const key = material.toLowerCase().split(" ")[0];
  return featuresByMaterial[key] ?? featuresByMaterial.default;
}

// Skeleton loader while the product is fetching
const DetailSkeleton = () => (
  <Layout>
    <section className="w-full bg-[#ffffe3] text-[#35020D] min-h-screen pt-24 pb-32 font-sans">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
        <div className="w-32 h-4 bg-[#35020D]/10 rounded mb-12 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <div className="bg-[#35020D]/10 aspect-square animate-pulse" />
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-square bg-[#35020D]/10 animate-pulse" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="w-40 h-4 bg-[#35020D]/10 rounded animate-pulse" />
            <div className="w-3/4 h-16 bg-[#35020D]/10 rounded animate-pulse" />
            <div className="w-full h-24 bg-[#35020D]/10 rounded animate-pulse" />
            <div className="space-y-3">
              {[0, 1, 2].map((i) => <div key={i} className="w-48 h-4 bg-[#35020D]/10 rounded animate-pulse" />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = trpc.product.getBySlug.useQuery(
    { slug: slug! },
    { enabled: !!slug }
  );

  const productImage = product ? (categoryImages[product.category.slug] ?? catWooden) : catWooden;
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const displayImage = activeImage ?? productImage;

  if (isLoading) return <DetailSkeleton />;

  if (!product) {
    return (
      <Layout>
        <section className="w-full bg-[#ffffe3] text-[#35020D] min-h-screen pt-24 pb-32 font-sans flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-semibold mb-4">Product not found</p>
            <Link to="/products" className="underline text-sm font-medium hover:opacity-70">
              Back to Products
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const priceLabel = product.sizes.length > 0
    ? `₹${product.sizes[0].priceMin} – ₹${product.sizes[0].priceMax}`
    : "Price on Request";

  const features = getFeaturesForMaterial(product.material);

  const specs: [string, string][] = [
    ["Material", product.material ?? "—"],
    ["Category", product.category.name],
    ["Available Sizes", product.sizes.map((s) => s.label).join(", ") || "—"],
    ["Min. Order Qty", product.sizes[0]?.moq ? `${product.sizes[0].moq} pieces` : "—"],
    ["HSN Code", "83062120"],
    ["Country of Origin", "Made in India"],
  ];

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
                <img src={displayImage} alt={product.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {[productImage, catBases, catShields].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square overflow-hidden border-2 transition-all ${displayImage === img ? "border-[#35020D]" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
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
                  {product.category.name} &mdash; {priceLabel}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-[#35020D]">
                  {product.name}
                </h1>
              </div>

              <div className="prose prose-lg prose-p:text-[#35020D]/80 mb-12">
                <p className="text-base md:text-xl font-medium leading-relaxed">
                  {product.shortDesc || product.description || "Premium recognition award from Delta Industries."}
                </p>
              </div>

              <div className="space-y-4 mb-12">
                <h3 className="text-xs font-bold uppercase tracking-widest">Key Features</h3>
                <ul className="space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-medium">
                      <span className="inline-block w-1 h-1 bg-[#35020D] rounded-full"></span>
                      {f}
                    </li>
                  ))}
                  {product.isCustomizable && (
                    <li className="flex items-center gap-4 text-sm font-medium">
                      <span className="inline-block w-1 h-1 bg-[#35020D] rounded-full"></span>
                      Fully Customizable (Logo / Text)
                    </li>
                  )}
                </ul>
              </div>

              {/* Product Specifications */}
              <div className="mb-12">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Specifications</h3>
                <div className="border border-[#35020D]/10">
                  {specs.map(([label, value], i) => (
                    <div key={i} className={`flex ${i > 0 ? "border-t border-[#35020D]/10" : ""}`}>
                      <span className="w-2/5 px-4 py-3 text-xs font-semibold uppercase tracking-wider bg-[#35020D]/5">{label}</span>
                      <span className="w-3/5 px-4 py-3 text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* About the Product */}
              {product.description && (
                <div className="mb-12">
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-4">About the Product</h3>
                  <p className="text-sm md:text-base font-medium leading-relaxed text-[#35020D]/70">
                    {product.description}
                  </p>
                </div>
              )}

              <Link
                to={`/contact?product=${product.id}`}
                className="inline-flex items-center gap-3 text-sm md:text-base font-semibold tracking-normal hover:bg-[#35020D] hover:text-[#fffff1] bg-transparent border-2 border-[#35020D] text-[#35020D] px-8 py-4 rounded-[2rem] transition-colors w-fit"
              >
                <span>Request Custom Quote</span>
                <span className="inline-block w-1.5 h-1.5 border-[1.5px] border-current rounded-full"></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;

