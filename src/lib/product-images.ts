// ─── Real product image mapping ───────────────────────────────────────────
// Maps products to actual photos in public/IMAGES/

const PC_IMAGES = [
  "PC-20.jpg", "PC-21.jpg", "PC-22.jpg", "PC-24.jpg", "PC-25.jpg",
  "PC-26.jpg", "PC-27.jpg", "PC-28.jpg", "PC-29.jpg", "PC-73.jpg",
  "PC-117.jpg", "PC-118.jpg", "PC-214.jpg", "PC-216.jpg", "PC-219.jpg",
  "PC-220.jpg", "PC-221.jpg", "PC-222.jpg", "PC-223.jpg", "PC-224.jpg",
  "PC-230.jpg", "PC-231.jpg", "PC-237.jpg", "PC-241.jpg", "PC-242.jpg",
  "PC-249.jpg", "PC-305.jpg", "PC-310.jpg", "PC-311.jpg", "PC-312.jpg",
  "PC-313.jpg", "PC-314.jpg", "PC-315.jpg", "PC-316.jpg", "PC-320.jpg",
  "PC-321.jpg", "PC-322.jpg", "PC-324.jpg", "PC-325.jpg", "PC-326.jpg",
  "PC-327.jpg", "PC-328.jpg", "PC-329.jpg", "PC-331.jpg", "PC-332.jpg",
  "PC-333.jpg", "PC-334.jpg", "PC-335.jpg", "PC-336.jpg", "PC-337.jpg",
  "PC-338.jpg", "PC-339.jpg", "PC-340.jpg", "PC-341.jpg", "PC-342.jpg",
  "PC-343.jpg", "PC-344.jpg", "PC-345.jpg", "PC-346.jpg",
];

const WA_IMAGES = [
  "WA-01 25MM.jpg", "WA-02 18MM.jpg", "WA-03 25MM.jpg", "WA-04 25MM.jpg",
  "WA-05 95MM.jpg", "WA-06 50MM.jpg", "WA-07 50MM.jpg", "WA-08 25MM.jpg",
  "WA-09 18MM.jpg", "WA-10 25MM.jpg", "WA-11 18MM.jpg", "WA-12 18MM.jpg",
  "WA-13 25MM.jpg", "WA-14 18MM.jpg", "WA-15 12MM.jpg", "WA-16 12MM.jpg",
  "WA-17 50MM.jpg", "WA-18 18MM.jpg", "WA-19 18MM.jpg", "WA-20 50MM.jpg",
  "WA-21 50MM.jpg", "WA-22 18MM.jpg", "WA-23 12MM.jpg", "WA-24 18MM.jpg",
  "WA-25 90MM.jpg", "WA-26 18MM.jpg", "WA-27 50MM.jpg", "WA-28 60MM.jpg",
  "WA-29 18MM.jpg", "WA-30 18MM.jpg", "WA-31 18MM.jpg", "WA-32 18MM.jpg",
  "WA-33 18MM.jpg", "WA-34 18MM.jpg", "WA-35 18MM.jpg", "WA-36 18MM.jpg",
  "WA-37 18MM.jpg", "WA-38 18MM.jpg", "WA-39 18MM.jpg", "WA-40 18MM.jpg",
  "WA-41 35MM.jpg", "WA-42 60MM.jpg", "WA-43 25MM.jpg", "WA-44 25MM.jpg",
  "WA-45 25MM.jpg", "WA-46 60MM.jpg", "WA-47 18MM.jpg", "WA-48 18MM.jpg",
];

export function getProductImage(product: {
  id?: number;
  slug?: string;
  categorySlug?: string;
  imageUrl?: string | null;
}): string {
  // If product already has a real image URL from /IMAGES, use it
  if (product.imageUrl?.startsWith("/IMAGES/")) {
    return product.imageUrl;
  }

  const slug = product.slug || "";
  const category = product.categorySlug || "";

  // Wooden trophies → WA images
  if (category === "wooden-trophies" || slug.includes("wooden")) {
    const idx = (product.id || 0) % WA_IMAGES.length;
    return `/IMAGES/wa/${WA_IMAGES[idx]}`;
  }

  // Plastic trophies → PC images
  if (category === "plastic-trophy-series" || slug.includes("plastic")) {
    const idx = (product.id || 0) % PC_IMAGES.length;
    return `/IMAGES/pc/${PC_IMAGES[idx]}`;
  }

  // Metal cups → PC images too (many PC designs are metal-finish cups)
  if (category === "metal-cups-trophies" || slug.includes("metal") || slug.includes("cup")) {
    const idx = ((product.id || 0) + 10) % PC_IMAGES.length;
    return `/IMAGES/pc/${PC_IMAGES[idx]}`;
  }

  // Medals → PC images (shifted)
  if (category === "custom-medals" || slug.includes("medal")) {
    const idx = ((product.id || 0) + 20) % PC_IMAGES.length;
    return `/IMAGES/pc/${PC_IMAGES[idx]}`;
  }

  // For other categories, fall through to category images handled elsewhere
  return product.imageUrl || "";
}

export function getProductImageUrl(imageUrl: string | null | undefined, productSlug?: string, categorySlug?: string, productId?: number): string {
  const raw = imageUrl?.startsWith("/IMAGES/") ? imageUrl : getProductImage({ id: productId, slug: productSlug, categorySlug, imageUrl });
  if (!raw) return "";
  // Only encode if the path has literal spaces (not already %20 encoded)
  if (raw.includes(" ") && !raw.includes("%20")) {
    return raw.split("/").map((seg, i) => i === 0 ? seg : encodeURIComponent(seg)).join("/");
  }
  return raw;
}
