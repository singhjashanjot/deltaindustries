// ─── Real product image mapping ───────────────────────────────────────────
// Maps products to actual photos in public/IMAGES/

const PC_IMAGES = [
  "PC-20.webp", "PC-21.webp", "PC-22.webp", "PC-24.webp", "PC-25.webp",
  "PC-26.webp", "PC-27.webp", "PC-28.webp", "PC-29.webp", "PC-73.webp",
  "PC-117.webp", "PC-118.webp", "PC-214.webp", "PC-216.webp", "PC-219.webp",
  "PC-220.webp", "PC-221.webp", "PC-222.webp", "PC-223.webp", "PC-224.webp",
  "PC-230.webp", "PC-231.webp", "PC-237.webp", "PC-241.webp", "PC-242.webp",
  "PC-249.webp", "PC-305.webp", "PC-310.webp", "PC-311.webp", "PC-312.webp",
  "PC-313.webp", "PC-314.webp", "PC-315.webp", "PC-316.webp", "PC-320.webp",
  "PC-321.webp", "PC-322.webp", "PC-324.webp", "PC-325.webp", "PC-326.webp",
  "PC-327.webp", "PC-328.webp", "PC-329.webp", "PC-331.webp", "PC-332.webp",
  "PC-333.webp", "PC-334.webp", "PC-335.webp", "PC-336.webp", "PC-337.webp",
  "PC-338.webp", "PC-339.webp", "PC-340.webp", "PC-341.webp", "PC-342.webp",
  "PC-343.webp", "PC-344.webp", "PC-345.webp", "PC-346.webp",
];

const WA_IMAGES = [
  "WA-01 25MM.webp", "WA-02 18MM.webp", "WA-03 25MM.webp", "WA-04 25MM.webp",
  "WA-05 95MM.webp", "WA-06 50MM.webp", "WA-07 50MM.webp", "WA-08 25MM.webp",
  "WA-09 18MM.webp", "WA-10 25MM.webp", "WA-11 18MM.webp", "WA-12 18MM.webp",
  "WA-13 25MM.webp", "WA-14 18MM.webp", "WA-15 12MM.webp", "WA-16 12MM.webp",
  "WA-17 50MM.webp", "WA-18 18MM.webp", "WA-19 18MM.webp", "WA-20 50MM.webp",
  "WA-21 50MM.webp", "WA-22 18MM.webp", "WA-23 12MM.webp", "WA-24 18MM.webp",
  "WA-25 90MM.webp", "WA-26 18MM.webp", "WA-27 50MM.webp", "WA-28 60MM.webp",
  "WA-29 18MM.webp", "WA-30 18MM.webp", "WA-31 18MM.webp", "WA-32 18MM.webp",
  "WA-33 18MM.webp", "WA-34 18MM.webp", "WA-35 18MM.webp", "WA-36 18MM.webp",
  "WA-37 18MM.webp", "WA-38 18MM.webp", "WA-39 18MM.webp", "WA-40 18MM.webp",
  "WA-41 35MM.webp", "WA-42 60MM.webp", "WA-43 25MM.webp", "WA-44 25MM.webp",
  "WA-45 25MM.webp", "WA-46 60MM.webp", "WA-47 18MM.webp", "WA-48 18MM.webp",
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
