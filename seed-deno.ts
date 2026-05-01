import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaPg } from "npm:@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

const categories = [
  { name: "Wooden Trophies", slug: "wooden-trophies", sortOrder: 1, description: "Handcrafted from premium hardwoods including walnut, teak, and mahogany.", imageUrl: "/images/categories/wooden.jpg" },
  { name: "Acrylic Awards", slug: "acrylic-awards", sortOrder: 2, description: "Modern transparent acrylic with vibrant color inlays.", imageUrl: "/images/categories/acrylic.jpg" },
  { name: "Metal Cups & Trophies", slug: "metal-cups-trophies", sortOrder: 3, description: "Polished metal alloy cups and trophies with gold, silver, and bronze finishes.", imageUrl: "/images/categories/metal.jpg" },
  { name: "Crystal Trophies", slug: "crystal-trophies", sortOrder: 4, description: "Precision-cut optical-grade crystal with laser-engraved details.", imageUrl: "/images/categories/crystal.jpg" },
  { name: "Plastic Trophy Series", slug: "plastic-trophy-series", sortOrder: 5, description: "Lightweight, durable plastic trophies for high-volume events.", imageUrl: "/images/categories/plastic.jpg" },
  { name: "Custom Medals", slug: "custom-medals", sortOrder: 6, description: "Die-cast metal medals in Olympic gold, silver, and bronze finishes.", imageUrl: "/images/categories/medals.jpg" },
  { name: "Trophy Bases & Accessories", slug: "trophy-bases-accessories", sortOrder: 7, description: "Premium marble, plastic, and metal-plastic composite bases.", imageUrl: "/images/categories/bases.jpg" },
  { name: "Corporate Gift Mementos", slug: "corporate-gift-mementos", sortOrder: 8, description: "Custom engraved mementos in wood, metal, and acrylic.", imageUrl: "/images/categories/corporate.jpg" },
  { name: "Shields & Plaques", slug: "shields-plaques", sortOrder: 9, description: "Traditional wooden shields with brass detailing.", imageUrl: "/images/categories/shields.jpg" },
];

interface ProductSeed {
  name: string; slug: string; material: string; shortDesc: string;
  description: string; imageUrl: string; isCustomizable: boolean; isFeatured: boolean;
  sizes: { label: string; priceMin: number; priceMax: number; moq: number; inStock: boolean }[];
}

const woodenProducts: ProductSeed[] = [
  { name: "Classic Wooden Trophy", slug: "classic-wooden-trophy", material: "Wood", shortDesc: "Handcrafted from premium hardwood with gold accents.", description: "A timeless symbol of enduring achievement.", imageUrl: "/images/products/wooden-classic.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "9 inch", priceMin: 250, priceMax: 400, moq: 25, inStock: true }, { label: "12 inch", priceMin: 400, priceMax: 600, moq: 20, inStock: true }, { label: "15 inch", priceMin: 600, priceMax: 900, moq: 15, inStock: true }] },
  { name: "Royal Wooden Memento", slug: "royal-wooden-memento", material: "Wood", shortDesc: "Elegant memento with intricate woodwork detailing.", description: "Premium wooden memento featuring hand-carved detailing.", imageUrl: "/images/products/wooden-royal.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "6 inch", priceMin: 200, priceMax: 350, moq: 30, inStock: true }, { label: "9 inch", priceMin: 350, priceMax: 550, moq: 20, inStock: true }] },
  { name: "Gold-Plated Wood Trophy", slug: "gold-plated-wood-trophy", material: "Gold-plated Wood", shortDesc: "Premium wood base with 24k gold-plated metal accent.", description: "A luxury recognition piece combining natural wood with gold-plated metal.", imageUrl: "/images/products/wooden-gold-plated.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "9 inch", priceMin: 450, priceMax: 700, moq: 15, inStock: true }, { label: "12 inch", priceMin: 700, priceMax: 1100, moq: 10, inStock: true }] },
  { name: "Wooden Star Award", slug: "wooden-star-award", material: "Wood", shortDesc: "Star-shaped wooden trophy with polished finish.", description: "A stunning star-shaped trophy carved from premium hardwood.", imageUrl: "/images/products/wooden-star.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "6 inch", priceMin: 180, priceMax: 300, moq: 30, inStock: true }, { label: "9 inch", priceMin: 300, priceMax: 500, moq: 20, inStock: true }] },
  { name: "Wooden Pillar Trophy", slug: "wooden-pillar-trophy", material: "Wood", shortDesc: "Tall pillar-style wooden trophy with metal plate.", description: "An impressive tall pillar trophy crafted from solid wood.", imageUrl: "/images/products/wooden-pillar.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "12 inch", priceMin: 350, priceMax: 550, moq: 20, inStock: true }, { label: "15 inch", priceMin: 550, priceMax: 850, moq: 15, inStock: true }, { label: "18 inch", priceMin: 850, priceMax: 1200, moq: 10, inStock: true }] },
];

const acrylicProducts: ProductSeed[] = [
  { name: "Elegance Acrylic Award", slug: "elegance-acrylic-award", material: "Acrylic", shortDesc: "Modern transparent acrylic with vibrant color inlays.", description: "Combines contemporary design with vibrant color-infused layers.", imageUrl: "/images/products/acrylic-elegance.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "8 inch", priceMin: 200, priceMax: 350, moq: 25, inStock: true }, { label: "10 inch", priceMin: 350, priceMax: 500, moq: 20, inStock: true }, { label: "12 inch", priceMin: 500, priceMax: 750, moq: 15, inStock: true }] },
  { name: "Modern Acrylic Plaque", slug: "modern-acrylic-plaque", material: "Acrylic", shortDesc: "Sleek acrylic plaque suitable for corporate recognition.", description: "A flat-form acrylic plaque with precision laser-cut edges.", imageUrl: "/images/products/acrylic-plaque.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "6 inch", priceMin: 150, priceMax: 250, moq: 30, inStock: true }, { label: "8 inch", priceMin: 250, priceMax: 400, moq: 25, inStock: true }] },
  { name: "Acrylic Tower Award", slug: "acrylic-tower-award", material: "Acrylic", shortDesc: "Tall tower-style acrylic award with graduated tint.", description: "An impressive vertical tower award with a subtle blue-to-clear gradient.", imageUrl: "/images/products/acrylic-tower.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "10 inch", priceMin: 400, priceMax: 600, moq: 15, inStock: true }, { label: "12 inch", priceMin: 600, priceMax: 850, moq: 10, inStock: true }] },
  { name: "Acrylic Circle Trophy", slug: "acrylic-circle-trophy", material: "Acrylic", shortDesc: "Circular acrylic trophy with frosted edge detail.", description: "A perfectly round acrylic trophy featuring a frosted border.", imageUrl: "/images/products/acrylic-circle.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "6 inch", priceMin: 175, priceMax: 300, moq: 25, inStock: true }, { label: "8 inch", priceMin: 300, priceMax: 450, moq: 20, inStock: true }] },
  { name: "Acrylic Wood Composite Award", slug: "acrylic-wood-composite-award", material: "Acrylic + Wood", shortDesc: "Elegant fusion of acrylic and wood materials.", description: "A striking combination of crystal-clear acrylic and warm natural wood.", imageUrl: "/images/products/acrylic-wood.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "8 inch", priceMin: 300, priceMax: 500, moq: 20, inStock: true }, { label: "10 inch", priceMin: 500, priceMax: 750, moq: 15, inStock: true }] },
];

const metalProducts: ProductSeed[] = [
  { name: "Champion Metal Cup", slug: "champion-metal-cup", material: "Metal Alloy", shortDesc: "Polished gold-finish metal cup with engraving plate.", description: "Crafted from premium metal alloy with a lustrous 24k gold finish.", imageUrl: "/images/products/metal-champion.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "12 inch", priceMin: 500, priceMax: 800, moq: 15, inStock: true }, { label: "15 inch", priceMin: 800, priceMax: 1200, moq: 10, inStock: true }, { label: "18 inch", priceMin: 1200, priceMax: 1800, moq: 5, inStock: true }] },
  { name: "Silver Metal Trophy", slug: "silver-metal-trophy", material: "Metal Alloy", shortDesc: "Silver-finish metal trophy for prestigious events.", description: "Premium silver-finish metal trophy with a mirror-polish surface.", imageUrl: "/images/products/metal-silver.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "9 inch", priceMin: 350, priceMax: 550, moq: 20, inStock: true }, { label: "12 inch", priceMin: 550, priceMax: 850, moq: 15, inStock: true }] },
  { name: "Academic Gold Cup", slug: "academic-gold-cup", material: "Metal Alloy", shortDesc: "Traditional gold cup for academic excellence awards.", description: "A traditional two-handled gold cup trophy designed for academic institutions.", imageUrl: "/images/products/metal-academic.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "9 inch", priceMin: 400, priceMax: 650, moq: 20, inStock: true }, { label: "12 inch", priceMin: 650, priceMax: 1000, moq: 10, inStock: true }] },
  { name: "Football Cup Trophy", slug: "football-cup-trophy", material: "Metal Alloy", shortDesc: "Sports cup with football figure topper.", description: "A dynamic sports trophy featuring a footballer figure atop a polished metal cup.", imageUrl: "/images/products/metal-football.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "12 inch", priceMin: 450, priceMax: 700, moq: 15, inStock: true }, { label: "15 inch", priceMin: 700, priceMax: 1100, moq: 10, inStock: true }, { label: "18 inch", priceMin: 1100, priceMax: 1600, moq: 5, inStock: true }] },
  { name: "Fancy Metal Cup", slug: "fancy-metal-cup", material: "Metal Alloy", shortDesc: "Ornate decorative metal cup with intricate patterns.", description: "An exquisitely detailed metal cup with baroque-inspired patterns.", imageUrl: "/images/products/metal-fancy.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "9 inch", priceMin: 500, priceMax: 800, moq: 15, inStock: true }, { label: "12 inch", priceMin: 800, priceMax: 1200, moq: 10, inStock: true }] },
];

const allProductsByCategory: Record<string, ProductSeed[]> = {
  "wooden-trophies": woodenProducts,
  "acrylic-awards": acrylicProducts,
  "metal-cups-trophies": metalProducts,
};

const testimonials = [
  { name: "Rajesh Sharma", designation: "Event Coordinator", organization: "Punjab Sports Association", quote: "Delta Industries delivered 200 custom medals for our state championship in record time.", rating: 5 },
  { name: "Priya Malhotra", designation: "HR Manager", organization: "TechSoft Solutions", quote: "We order corporate mementos annually from Delta for our employee recognition program.", rating: 5 },
  { name: "Amit Singh", designation: "Principal", organization: "DAV Public School", quote: "Our annual prize distribution ceremony depends on Delta's consistent quality.", rating: 5 },
  { name: "Dr. Vikram Patel", designation: "Dean", organization: "Guru Nanak Dev University", quote: "The crystal trophies we ordered for our convocation were absolutely stunning.", rating: 5 },
  { name: "Neha Gupta", designation: "Marketing Director", organization: "PharmaCare India", quote: "From enquiry to delivery, Delta's service was exceptional.", rating: 4 },
];

async function main() {
  console.log("🌱 Seeding Delta Industries database...\n");

  for (const cat of categories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, imageUrl: cat.imageUrl, sortOrder: cat.sortOrder, isActive: true },
      create: cat,
    });
    console.log(`  ✓ Category: ${cat.name}`);
  }
  console.log(`\n  ${categories.length} categories seeded.\n`);

  let totalProducts = 0;
  let totalSizes = 0;

  for (const [categorySlug, products] of Object.entries(allProductsByCategory)) {
    const category = await db.category.findUnique({ where: { slug: categorySlug } });
    if (!category) { console.error(`  ✗ Category not found: ${categorySlug}`); continue; }

    for (const p of products) {
      const { sizes, ...data } = p;
      const product = await db.product.upsert({
        where: { slug: p.slug },
        update: { ...data, categoryId: category.id, isActive: true },
        create: { ...data, categoryId: category.id, viewCount: 0 },
      });

      await db.productSize.deleteMany({ where: { productId: product.id } });
      for (const size of sizes) {
        await db.productSize.create({ data: { ...size, productId: product.id } });
        totalSizes++;
      }
      totalProducts++;
    }
    console.log(`  ✓ ${products.length} products seeded for "${category.name}"`);
  }

  for (const t of testimonials) {
    await db.testimonial.upsert({
      where: { id: testimonials.indexOf(t) + 1 },
      update: {},
      create: { ...t, isActive: true, sortOrder: testimonials.indexOf(t) },
    });
  }
  console.log(`  ✓ ${testimonials.length} testimonials seeded`);

  const bcrypt = await import("bcryptjs");
  const hash = bcrypt.hashSync("admin123", 12);
  await db.admin.upsert({
    where: { email: "admin@deltaindustries.in" },
    update: {},
    create: { email: "admin@deltaindustries.in", password: hash, name: "System Admin" },
  });
  console.log(`  ✓ Default admin created`);

  console.log(`\n🎉 Seeding complete!`);
  console.log(`   Categories:   ${categories.length}`);
  console.log(`   Products:     ${totalProducts}`);
  console.log(`   Sizes:        ${totalSizes}`);
  console.log(`   Testimonials: ${testimonials.length}\n`);
}

main()
  .catch((e: any) => { console.error("Seed failed:", e); Deno.exit(1); })
  .finally(() => db.$disconnect());
