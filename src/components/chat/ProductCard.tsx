import { Link } from "react-router-dom";
import { getProductImageUrl } from "@/lib/product-images";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    category: string;
    material: string | null;
    shortDesc: string | null;
    imageUrl: string | null;
    priceHint: string | null;
  };
}

const CATEGORY_SLUG_MAP: Record<string, string> = {
  "Wooden Trophies": "wooden-trophies",
  "Plastic Trophy Series": "plastic-trophy-series",
};

const ProductCard = ({ product }: ProductCardProps) => {
  const categorySlug = CATEGORY_SLUG_MAP[product.category] || "";
  const displayImage = getProductImageUrl(product.imageUrl, product.slug, categorySlug, product.id);

  return (
    <Link
      to={`/product/${product.slug}`}
      className="block bg-[#ffffe3] border border-[#35020D]/10 rounded-sm overflow-hidden hover:border-[#35020D]/30 transition-colors"
    >
      <div className="flex gap-3 p-3">
        <div className="w-16 h-16 shrink-0 bg-[#35020D]/5 rounded-sm overflow-hidden">
          {displayImage ? (
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.remove();
              }}
            />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-[#35020D]/20 text-lg font-bold">&#916;</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-[#35020D] truncate">{product.name}</div>
          <div className="text-[10px] text-[#35020D]/50 uppercase tracking-wide mt-0.5">
            {product.category}{product.material ? ` · ${product.material}` : ""}
          </div>
          {product.shortDesc && (
            <div className="text-xs text-[#35020D]/70 mt-1 truncate">{product.shortDesc}</div>
          )}
          {product.priceHint && (
            <div className="text-xs font-medium text-[#35020D] mt-1.5">{product.priceHint}</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
