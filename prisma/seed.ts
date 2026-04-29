import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

// ─── Categories ─────────────────────────────────────────────────────────────

const categories = [
  { name: "Wooden Trophies", slug: "wooden-trophies", sortOrder: 1, description: "Handcrafted from premium hardwoods including walnut, teak, and mahogany. Gold-plated accents and custom engraving available. Ideal for sports, academic, and corporate recognition.", imageUrl: "/images/categories/wooden.jpg" },
  { name: "Acrylic Awards", slug: "acrylic-awards", sortOrder: 2, description: "Modern transparent acrylic with vibrant color inlays and laser-cut precision. Perfect for contemporary corporate gifting and creative industry awards.", imageUrl: "/images/categories/acrylic.jpg" },
  { name: "Metal Cups & Trophies", slug: "metal-cups-trophies", sortOrder: 3, description: "Polished metal alloy cups and trophies with gold, silver, and bronze finishes. Academic cups, fancy cups, football cups and sports cups for championship events.", imageUrl: "/images/categories/metal.jpg" },
  { name: "Crystal Trophies", slug: "crystal-trophies", sortOrder: 4, description: "Precision-cut optical-grade crystal with laser-engraved details. Premium prestige awards including star trophies, cube trophies, and custom crystal pieces.", imageUrl: "/images/categories/crystal.jpg" },
  { name: "Plastic Trophy Series", slug: "plastic-trophy-series", sortOrder: 5, description: "Lightweight, durable plastic trophies designed for high-volume school and sports events. Sports cups, star awards, fabric-finish cup variants at competitive pricing.", imageUrl: "/images/categories/plastic.jpg" },
  { name: "Custom Medals", slug: "custom-medals", sortOrder: 6, description: "Die-cast metal medals in Olympic gold, silver, and bronze finishes. Custom logo stamping, woven ribbons, and bulk pricing for sporting events and competitions.", imageUrl: "/images/categories/medals.jpg" },
  { name: "Trophy Bases & Accessories", slug: "trophy-bases-accessories", sortOrder: 7, description: "Premium marble, plastic, and metal-plastic composite bases. Single, double, and square bases plus trophy figures, flags, and mounting accessories.", imageUrl: "/images/categories/bases.jpg" },
  { name: "Corporate Gift Mementos", slug: "corporate-gift-mementos", sortOrder: 8, description: "Custom engraved mementos in wood, metal, and acrylic for employee recognition, client appreciation, and milestone celebrations. Fully customizable with brand identity.", imageUrl: "/images/categories/corporate.jpg" },
  { name: "Shields & Plaques", slug: "shields-plaques", sortOrder: 9, description: "Traditional wooden shields with brass detailing, citation plaques, and formal recognition boards. Wall-mountable institutional awards and government honours.", imageUrl: "/images/categories/shields.jpg" },
];

// ─── Products (grouped by category) ─────────────────────────────────────────

interface ProductSeed {
  name: string;
  slug: string;
  material: string;
  shortDesc: string;
  description: string;
  imageUrl: string;
  isCustomizable: boolean;
  isFeatured: boolean;
  sizes: { label: string; priceMin: number; priceMax: number; moq: number; inStock: boolean }[];
}

const woodenProducts: ProductSeed[] = [
  { name: "Classic Wooden Trophy", slug: "classic-wooden-trophy", material: "Wood", shortDesc: "Handcrafted from premium hardwood with gold accents.", description: "A timeless symbol of enduring achievement, perfectly finished to highlight the natural grain of the wood. Ideal for corporate milestones, lifetime achievement awards, and executive recognition ceremonies.", imageUrl: "/images/products/wooden-classic.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "9 inch", priceMin: 250, priceMax: 400, moq: 25, inStock: true }, { label: "12 inch", priceMin: 400, priceMax: 600, moq: 20, inStock: true }, { label: "15 inch", priceMin: 600, priceMax: 900, moq: 15, inStock: true }] },
  { name: "Royal Wooden Memento", slug: "royal-wooden-memento", material: "Wood", shortDesc: "Elegant memento with intricate woodwork detailing.", description: "Premium wooden memento featuring hand-carved detailing and lacquer finish. Each piece showcases the artisan's craft with delicate inlay work. Perfect for VIP recognition and corporate milestone celebrations.", imageUrl: "/images/products/wooden-royal.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "6 inch", priceMin: 200, priceMax: 350, moq: 30, inStock: true }, { label: "9 inch", priceMin: 350, priceMax: 550, moq: 20, inStock: true }] },
  { name: "Gold-Plated Wood Trophy", slug: "gold-plated-wood-trophy", material: "Gold-plated Wood", shortDesc: "Premium wood base with 24k gold-plated metal accent.", description: "A luxury recognition piece combining the warmth of natural wood with the prestige of gold-plated metal. The wood base features a rich walnut finish while the gold accent catches light beautifully.", imageUrl: "/images/products/wooden-gold-plated.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "9 inch", priceMin: 450, priceMax: 700, moq: 15, inStock: true }, { label: "12 inch", priceMin: 700, priceMax: 1100, moq: 10, inStock: true }, { label: "15 inch", priceMin: 1100, priceMax: 1600, moq: 5, inStock: true }] },
  { name: "Wooden Star Award", slug: "wooden-star-award", material: "Wood", shortDesc: "Star-shaped wooden trophy with polished finish.", description: "A stunning star-shaped trophy carved from premium hardwood with a mirror-polish lacquer finish. The star design symbolizes excellence and stands out in any award ceremony.", imageUrl: "/images/products/wooden-star.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "6 inch", priceMin: 180, priceMax: 300, moq: 30, inStock: true }, { label: "9 inch", priceMin: 300, priceMax: 500, moq: 20, inStock: true }] },
  { name: "Wooden Pillar Trophy", slug: "wooden-pillar-trophy", material: "Wood", shortDesc: "Tall pillar-style wooden trophy with metal plate.", description: "An impressive tall pillar trophy crafted from solid wood with a detachable brass engraving plate. The vertical design commands attention and is ideal for sports tournaments and academic excellence awards.", imageUrl: "/images/products/wooden-pillar.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "12 inch", priceMin: 350, priceMax: 550, moq: 20, inStock: true }, { label: "15 inch", priceMin: 550, priceMax: 850, moq: 15, inStock: true }, { label: "18 inch", priceMin: 850, priceMax: 1200, moq: 10, inStock: true }] },
];

const acrylicProducts: ProductSeed[] = [
  { name: "Elegance Acrylic Award", slug: "elegance-acrylic-award", material: "Acrylic", shortDesc: "Modern transparent acrylic with vibrant color inlays.", description: "Combines contemporary design with vibrant color-infused layers. Its shatter-resistant body and crystal-clear finish make it a standout piece for modern corporate events and tech summits.", imageUrl: "/images/products/acrylic-elegance.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "8 inch", priceMin: 200, priceMax: 350, moq: 25, inStock: true }, { label: "10 inch", priceMin: 350, priceMax: 500, moq: 20, inStock: true }, { label: "12 inch", priceMin: 500, priceMax: 750, moq: 15, inStock: true }] },
  { name: "Modern Acrylic Plaque", slug: "modern-acrylic-plaque", material: "Acrylic", shortDesc: "Sleek acrylic plaque suitable for corporate recognition.", description: "A flat-form acrylic plaque with precision laser-cut edges and UV-printed graphics. The modern minimalist design makes it perfect for desk display or wall mounting in corporate offices.", imageUrl: "/images/products/acrylic-plaque.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "6 inch", priceMin: 150, priceMax: 250, moq: 30, inStock: true }, { label: "8 inch", priceMin: 250, priceMax: 400, moq: 25, inStock: true }] },
  { name: "Acrylic Tower Award", slug: "acrylic-tower-award", material: "Acrylic", shortDesc: "Tall tower-style acrylic award with graduated tint.", description: "An impressive vertical tower award with a subtle blue-to-clear gradient tint. The multi-faceted design refracts light beautifully, creating a premium visual effect. Ideal for innovation and leadership awards.", imageUrl: "/images/products/acrylic-tower.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "10 inch", priceMin: 400, priceMax: 600, moq: 15, inStock: true }, { label: "12 inch", priceMin: 600, priceMax: 850, moq: 10, inStock: true }] },
  { name: "Acrylic Circle Trophy", slug: "acrylic-circle-trophy", material: "Acrylic", shortDesc: "Circular acrylic trophy with frosted edge detail.", description: "A perfectly round acrylic trophy featuring a frosted border and clear centre for laser engraving. Mounted on a sleek black base, it represents unity and completeness. Great for team awards.", imageUrl: "/images/products/acrylic-circle.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "6 inch", priceMin: 175, priceMax: 300, moq: 25, inStock: true }, { label: "8 inch", priceMin: 300, priceMax: 450, moq: 20, inStock: true }] },
  { name: "Acrylic Wood Composite Award", slug: "acrylic-wood-composite-award", material: "Acrylic + Wood", shortDesc: "Elegant fusion of acrylic and wood materials.", description: "A striking combination of crystal-clear acrylic and warm natural wood. The two-material design creates a visual contrast that symbolizes the blend of modern innovation and traditional values.", imageUrl: "/images/products/acrylic-wood.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "8 inch", priceMin: 300, priceMax: 500, moq: 20, inStock: true }, { label: "10 inch", priceMin: 500, priceMax: 750, moq: 15, inStock: true }] },
];

const metalProducts: ProductSeed[] = [
  { name: "Champion Metal Cup", slug: "champion-metal-cup", material: "Metal Alloy", shortDesc: "Polished gold-finish metal cup with engraving plate.", description: "Crafted from premium metal alloy with a lustrous 24k gold finish. Features ornate handles and a weighted base for commanding presence. Suited for sports tournaments and championship events.", imageUrl: "/images/products/metal-champion.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "12 inch", priceMin: 500, priceMax: 800, moq: 15, inStock: true }, { label: "15 inch", priceMin: 800, priceMax: 1200, moq: 10, inStock: true }, { label: "18 inch", priceMin: 1200, priceMax: 1800, moq: 5, inStock: true }] },
  { name: "Silver Metal Trophy", slug: "silver-metal-trophy", material: "Metal Alloy", shortDesc: "Silver-finish metal trophy for prestigious events.", description: "Premium silver-finish metal trophy with a mirror-polish surface. The elegant silhouette and weighted base make it a commanding centrepiece for any awards ceremony.", imageUrl: "/images/products/metal-silver.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "9 inch", priceMin: 350, priceMax: 550, moq: 20, inStock: true }, { label: "12 inch", priceMin: 550, priceMax: 850, moq: 15, inStock: true }] },
  { name: "Academic Gold Cup", slug: "academic-gold-cup", material: "Metal Alloy", shortDesc: "Traditional gold cup for academic excellence awards.", description: "A traditional two-handled gold cup trophy designed specifically for academic institutions. Features a classic chalice shape with engraving space for school crests and winner details.", imageUrl: "/images/products/metal-academic.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "9 inch", priceMin: 400, priceMax: 650, moq: 20, inStock: true }, { label: "12 inch", priceMin: 650, priceMax: 1000, moq: 10, inStock: true }] },
  { name: "Football Cup Trophy", slug: "football-cup-trophy", material: "Metal Alloy", shortDesc: "Sports cup with football figure topper.", description: "A dynamic sports trophy featuring a footballer figure atop a polished metal cup. The multi-tier design with handles creates a prestigious award perfect for football leagues and tournaments.", imageUrl: "/images/products/metal-football.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "12 inch", priceMin: 450, priceMax: 700, moq: 15, inStock: true }, { label: "15 inch", priceMin: 700, priceMax: 1100, moq: 10, inStock: true }, { label: "18 inch", priceMin: 1100, priceMax: 1600, moq: 5, inStock: true }] },
  { name: "Fancy Metal Cup", slug: "fancy-metal-cup", material: "Metal Alloy", shortDesc: "Ornate decorative metal cup with intricate patterns.", description: "An exquisitely detailed metal cup with baroque-inspired patterns and a dual-tone gold-silver finish. The elaborate craftsmanship makes it ideal for premium corporate events and gala dinners.", imageUrl: "/images/products/metal-fancy.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "9 inch", priceMin: 500, priceMax: 800, moq: 15, inStock: true }, { label: "12 inch", priceMin: 800, priceMax: 1200, moq: 10, inStock: true }] },
];

const crystalProducts: ProductSeed[] = [
  { name: "Crystal Star Award", slug: "crystal-star-award", material: "Crystal", shortDesc: "Precision-cut crystal with laser-engraved details.", description: "A beacon of excellence precision-cut from optical-grade crystal. Each star facet catches light beautifully, creating a dazzling display. Delivered in a silk-lined presentation box.", imageUrl: "/images/products/crystal-star.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "6 inch", priceMin: 400, priceMax: 600, moq: 15, inStock: true }, { label: "8 inch", priceMin: 600, priceMax: 900, moq: 10, inStock: true }, { label: "10 inch", priceMin: 900, priceMax: 1400, moq: 5, inStock: true }] },
  { name: "Crystal Cube Trophy", slug: "crystal-cube-trophy", material: "Crystal", shortDesc: "3D laser-engraved crystal cube for premium awards.", description: "A solid crystal cube with internal 3D laser engraving capability. The holographic effect inside the crystal creates a mesmerizing visual that makes each award truly unique and collectible.", imageUrl: "/images/products/crystal-cube.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "3 inch", priceMin: 300, priceMax: 500, moq: 20, inStock: true }, { label: "4 inch", priceMin: 500, priceMax: 800, moq: 15, inStock: true }, { label: "5 inch", priceMin: 800, priceMax: 1200, moq: 10, inStock: true }] },
  { name: "Crystal Obelisk Award", slug: "crystal-obelisk-award", material: "Crystal", shortDesc: "Tall obelisk-shaped crystal with bevelled edges.", description: "An elegant obelisk-shaped crystal award with precision-bevelled edges that refract rainbow light patterns. The tall form factor commands desk or shelf presence. Perfect for lifetime achievement recognition.", imageUrl: "/images/products/crystal-obelisk.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "8 inch", priceMin: 500, priceMax: 750, moq: 15, inStock: true }, { label: "10 inch", priceMin: 750, priceMax: 1100, moq: 10, inStock: true }] },
  { name: "Crystal Globe Trophy", slug: "crystal-globe-trophy", material: "Crystal", shortDesc: "Crystal globe on bevelled base for international awards.", description: "A stunning crystal globe mounted on a bevelled crystal base, symbolizing global reach and international achievement. Ideal for export excellence, international partnership, and global leadership awards.", imageUrl: "/images/products/crystal-globe.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "6 inch", priceMin: 550, priceMax: 850, moq: 10, inStock: true }, { label: "8 inch", priceMin: 850, priceMax: 1300, moq: 5, inStock: true }] },
  { name: "Crystal Diamond Award", slug: "crystal-diamond-award", material: "Crystal", shortDesc: "Diamond-shaped optical crystal award.", description: "A dazzling diamond-shaped crystal cut from premium optical glass. The multi-faceted design creates brilliant light reflections from every angle. Presented in a velvet-lined gift box.", imageUrl: "/images/products/crystal-diamond.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "4 inch", priceMin: 350, priceMax: 550, moq: 20, inStock: true }, { label: "6 inch", priceMin: 550, priceMax: 850, moq: 10, inStock: true }] },
];

const plasticProducts: ProductSeed[] = [
  { name: "Economy Plastic Trophy", slug: "economy-plastic-trophy", material: "Plastic", shortDesc: "Lightweight, durable trophies for high-volume events.", description: "Cost-effective plastic trophies designed for schools, sports days, and high-volume recognition events. Durable material with a golden metallic finish that looks premium at an affordable price point.", imageUrl: "/images/products/plastic-economy.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "6 inch", priceMin: 50, priceMax: 100, moq: 100, inStock: true }, { label: "9 inch", priceMin: 100, priceMax: 180, moq: 75, inStock: true }, { label: "12 inch", priceMin: 180, priceMax: 280, moq: 50, inStock: true }] },
  { name: "Plastic Star Cup", slug: "plastic-star-cup", material: "Plastic", shortDesc: "Star-topped plastic cup trophy for school events.", description: "A fun star-topped cup trophy in durable plastic with a gold-metallic spray finish. Perfect for primary school sports days, inter-house competitions, and children's achievement ceremonies.", imageUrl: "/images/products/plastic-star.jpg", isCustomizable: false, isFeatured: false, sizes: [{ label: "6 inch", priceMin: 40, priceMax: 80, moq: 100, inStock: true }, { label: "9 inch", priceMin: 80, priceMax: 150, moq: 75, inStock: true }] },
  { name: "Plastic Sports Cup", slug: "plastic-sports-cup", material: "Plastic", shortDesc: "Two-handled sports cup for team competitions.", description: "A traditional two-handled sports cup in durable ABS plastic with a polished gold finish. The ribbed cup design and sturdy base make it a reliable choice for inter-school tournaments and sports leagues.", imageUrl: "/images/products/plastic-sports.jpg", isCustomizable: false, isFeatured: false, sizes: [{ label: "9 inch", priceMin: 80, priceMax: 150, moq: 75, inStock: true }, { label: "12 inch", priceMin: 150, priceMax: 250, moq: 50, inStock: true }] },
  { name: "Fabric Finish Cup", slug: "fabric-finish-cup", material: "Plastic", shortDesc: "Unique fabric-texture finish plastic cup trophy.", description: "A distinctive cup trophy featuring a textured fabric-like finish that sets it apart from standard plastic trophies. The unique tactile surface adds a premium feel at an economical price point.", imageUrl: "/images/products/plastic-fabric.jpg", isCustomizable: false, isFeatured: false, sizes: [{ label: "6 inch", priceMin: 60, priceMax: 110, moq: 100, inStock: true }, { label: "9 inch", priceMin: 110, priceMax: 200, moq: 75, inStock: true }] },
  { name: "Plastic Column Trophy", slug: "plastic-column-trophy", material: "Plastic", shortDesc: "Multi-column plastic trophy with figure topper.", description: "A tall multi-column trophy with interchangeable sport figure toppers. Available in gold, silver, and bronze column finishes. Ideal for athletics meets and multi-sport school events.", imageUrl: "/images/products/plastic-column.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "9 inch", priceMin: 90, priceMax: 160, moq: 75, inStock: true }, { label: "12 inch", priceMin: 160, priceMax: 260, moq: 50, inStock: true }, { label: "15 inch", priceMin: 260, priceMax: 400, moq: 30, inStock: true }] },
];

const medalProducts: ProductSeed[] = [
  { name: "Olympic Gold Medal", slug: "olympic-gold-medal", material: "Metal Alloy", shortDesc: "Premium gold-finish medal with custom ribbon.", description: "A heavyweight die-cast medal with a brilliant gold finish and custom woven neck ribbon. Features a laurel wreath border design with space for custom logo and text on both sides.", imageUrl: "/images/products/medal-gold.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "2 inch", priceMin: 50, priceMax: 100, moq: 100, inStock: true }, { label: "2.5 inch", priceMin: 100, priceMax: 150, moq: 75, inStock: true }, { label: "3 inch", priceMin: 150, priceMax: 220, moq: 50, inStock: true }] },
  { name: "Golden Medal", slug: "golden-medal", material: "Metal Alloy", shortDesc: "Classic golden medal for all types of competitions.", description: "A versatile golden medal suitable for sports, academics, and corporate competitions. The classic round design with a polished gold surface provides ample space for custom engraving and logo placement.", imageUrl: "/images/products/medal-golden.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "2 inch", priceMin: 40, priceMax: 80, moq: 100, inStock: true }, { label: "2.5 inch", priceMin: 80, priceMax: 130, moq: 75, inStock: true }] },
  { name: "China Medal", slug: "china-medal", material: "Metal Alloy", shortDesc: "Embossed pattern medal with antique finish.", description: "A distinctive medal featuring intricate embossed patterns inspired by classical designs. The antique bronze finish gives it a timeless appearance that stands out from standard medals.", imageUrl: "/images/products/medal-china.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "2.5 inch", priceMin: 60, priceMax: 110, moq: 75, inStock: true }, { label: "3 inch", priceMin: 110, priceMax: 170, moq: 50, inStock: true }] },
  { name: "Jaguar Medal", slug: "jaguar-medal", material: "Metal Alloy", shortDesc: "Premium heavy-weight medal with jaguar motif.", description: "A premium heavyweight medal featuring a striking jaguar motif symbolizing speed, strength, and excellence. The dual-tone finish combines polished and matte surfaces for a sophisticated look.", imageUrl: "/images/products/medal-jaguar.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "2.5 inch", priceMin: 80, priceMax: 140, moq: 50, inStock: true }, { label: "3 inch", priceMin: 140, priceMax: 200, moq: 30, inStock: true }] },
  { name: "Star Medal Coin", slug: "star-medal-coin", material: "Metal Alloy", shortDesc: "Star-shaped medal coin with ribbon attachment.", description: "A unique star-shaped medal that breaks from the traditional round format. The five-pointed design with a central logo area and ribbon loop makes it eye-catching and memorable for recipients.", imageUrl: "/images/products/medal-star.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "2 inch", priceMin: 45, priceMax: 90, moq: 100, inStock: true }, { label: "2.5 inch", priceMin: 90, priceMax: 150, moq: 75, inStock: true }] },
];

const baseProducts: ProductSeed[] = [
  { name: "Single Plastic Base", slug: "single-plastic-base", material: "Plastic", shortDesc: "Standard single-tier trophy base.", description: "A sturdy single-tier plastic base compatible with most trophy toppers and figures. Available in black and gold finishes with a felt-padded bottom to protect surfaces.", imageUrl: "/images/products/base-single.jpg", isCustomizable: false, isFeatured: false, sizes: [{ label: "3 inch", priceMin: 30, priceMax: 60, moq: 100, inStock: true }, { label: "4 inch", priceMin: 60, priceMax: 100, moq: 75, inStock: true }] },
  { name: "Double Tier Base", slug: "double-tier-base", material: "Plastic", shortDesc: "Two-tier graduated trophy base.", description: "A two-tier graduated base that adds height and presence to any trophy configuration. The stepped design creates a pedestal effect that elevates the trophy figure or topper.", imageUrl: "/images/products/base-double.jpg", isCustomizable: false, isFeatured: false, sizes: [{ label: "4 inch", priceMin: 50, priceMax: 90, moq: 75, inStock: true }, { label: "5 inch", priceMin: 90, priceMax: 150, moq: 50, inStock: true }] },
  { name: "Square Marble Base", slug: "square-marble-base", material: "Marble", shortDesc: "Premium square marble base for luxury trophies.", description: "A premium square-cut marble base in classic black or white. The substantial weight provides excellent stability while the polished stone surface adds a touch of luxury to any trophy.", imageUrl: "/images/products/base-marble.jpg", isCustomizable: false, isFeatured: false, sizes: [{ label: "3 inch", priceMin: 100, priceMax: 180, moq: 50, inStock: true }, { label: "4 inch", priceMin: 180, priceMax: 280, moq: 30, inStock: true }] },
  { name: "Metal-Plastic Combo Base", slug: "metal-plastic-combo-base", material: "Metal + Plastic", shortDesc: "Hybrid metal and plastic trophy base.", description: "A hybrid base combining a metal accent ring with a durable plastic body. The two-material construction offers the visual appeal of metal with the practical durability and cost-effectiveness of plastic.", imageUrl: "/images/products/base-combo.jpg", isCustomizable: false, isFeatured: false, sizes: [{ label: "3 inch", priceMin: 60, priceMax: 110, moq: 75, inStock: true }, { label: "4 inch", priceMin: 110, priceMax: 180, moq: 50, inStock: true }] },
  { name: "Trophy Figure Topper", slug: "trophy-figure-topper", material: "Metal + Plastic", shortDesc: "Interchangeable sport figure for trophy tops.", description: "Interchangeable sport and achievement figure toppers available in gold, silver, and bronze finishes. Compatible with all Delta Industries bases. Available in 15+ sport and academic designs.", imageUrl: "/images/products/base-figure.jpg", isCustomizable: false, isFeatured: false, sizes: [{ label: "3 inch", priceMin: 25, priceMax: 50, moq: 100, inStock: true }, { label: "4 inch", priceMin: 50, priceMax: 80, moq: 75, inStock: true }] },
];

const corporateProducts: ProductSeed[] = [
  { name: "Executive Gift Set", slug: "executive-gift-set", material: "Mixed", shortDesc: "Curated corporate gift sets with personalization.", description: "A curated collection of premium branded items perfect for C-suite gifting, client appreciation, and milestone celebrations. Includes laser-etched accessories presented in bespoke packaging.", imageUrl: "/images/products/corporate-executive.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "Standard Set", priceMin: 500, priceMax: 800, moq: 25, inStock: true }, { label: "Premium Set", priceMin: 800, priceMax: 1500, moq: 15, inStock: true }] },
  { name: "Wooden Desk Memento", slug: "wooden-desk-memento", material: "Wood", shortDesc: "Compact wooden memento for desk display.", description: "A beautifully crafted compact wooden memento designed for desk display. Features an engraving plate for personalization. Ideal for employee of the month, work anniversary, and retirement gifts.", imageUrl: "/images/products/corporate-desk.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "4 inch", priceMin: 200, priceMax: 350, moq: 30, inStock: true }, { label: "6 inch", priceMin: 350, priceMax: 550, moq: 20, inStock: true }] },
  { name: "Metal Corporate Award", slug: "metal-corporate-award", material: "Metal", shortDesc: "Sleek metal award for corporate recognition.", description: "A contemporary metal award with a brushed aluminium finish and black granite base. The clean, modern design fits perfectly in professional settings and executive offices.", imageUrl: "/images/products/corporate-metal.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "8 inch", priceMin: 400, priceMax: 650, moq: 20, inStock: true }, { label: "10 inch", priceMin: 650, priceMax: 1000, moq: 15, inStock: true }] },
  { name: "Acrylic Desk Block", slug: "acrylic-desk-block", material: "Acrylic", shortDesc: "Transparent acrylic block with embedded branding.", description: "A solid acrylic block with embedded company logo and text visible from all angles. The paperweight-style design serves as both an award and a functional desk accessory.", imageUrl: "/images/products/corporate-acrylic.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "3 inch", priceMin: 150, priceMax: 250, moq: 30, inStock: true }, { label: "4 inch", priceMin: 250, priceMax: 400, moq: 20, inStock: true }] },
  { name: "Corporate Pen Set Award", slug: "corporate-pen-set-award", material: "Metal + Wood", shortDesc: "Engraved pen set in premium wooden case.", description: "A premium pen set housed in a handcrafted wooden case with velvet lining. The case lid features a brass engraving plate for personalized messages. A practical and prestigious corporate gift.", imageUrl: "/images/products/corporate-pen.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "Single Pen", priceMin: 200, priceMax: 350, moq: 50, inStock: true }, { label: "Dual Pen Set", priceMin: 350, priceMax: 550, moq: 30, inStock: true }] },
];

const shieldProducts: ProductSeed[] = [
  { name: "Heritage Shield Plaque", slug: "heritage-shield-plaque", material: "Wood + Brass", shortDesc: "Traditional wooden shield with brass engraving plate.", description: "Handcrafted from solid wood with intricate brass detailing. Wall-mountable plaque perfect for institutional awards, government honours, and legacy recognition. Custom engraving available.", imageUrl: "/images/products/shield-heritage.jpg", isCustomizable: true, isFeatured: true, sizes: [{ label: "10 inch", priceMin: 300, priceMax: 500, moq: 20, inStock: true }, { label: "12 inch", priceMin: 500, priceMax: 800, moq: 15, inStock: true }, { label: "16 inch", priceMin: 800, priceMax: 1200, moq: 10, inStock: true }] },
  { name: "Citation Plaque", slug: "citation-plaque", material: "Wood + Metal", shortDesc: "Formal citation plaque for official recognition.", description: "A formal rectangular plaque with a polished wood body and metal citation plate. Designed for government citations, institutional recognition, and formal ceremony presentations.", imageUrl: "/images/products/shield-citation.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "8 inch", priceMin: 250, priceMax: 400, moq: 25, inStock: true }, { label: "10 inch", priceMin: 400, priceMax: 650, moq: 15, inStock: true }] },
  { name: "Round Shield Award", slug: "round-shield-award", material: "Wood + Brass", shortDesc: "Circular shield with centre brass medallion.", description: "A distinctive circular shield award featuring a prominent centre brass medallion surrounded by a rich wood border. The round form symbolizes completeness and unity. Popular for union and association awards.", imageUrl: "/images/products/shield-round.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "8 inch", priceMin: 200, priceMax: 350, moq: 25, inStock: true }, { label: "10 inch", priceMin: 350, priceMax: 550, moq: 20, inStock: true }] },
  { name: "Brass Recognition Board", slug: "brass-recognition-board", material: "Wood + Brass", shortDesc: "Large recognition board for listing multiple names.", description: "A large wall-mounted recognition board with multiple brass nameplates for listing award recipients over multiple years. The perpetual design serves institutions for decades of recognition history.", imageUrl: "/images/products/shield-board.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "18 inch", priceMin: 800, priceMax: 1200, moq: 5, inStock: true }, { label: "24 inch", priceMin: 1200, priceMax: 2000, moq: 3, inStock: true }] },
  { name: "Decorative Wall Shield", slug: "decorative-wall-shield", material: "Wood + Metal", shortDesc: "Ornate decorative shield for display purposes.", description: "An ornate decorative shield combining carved woodwork with metal inlay accents. Designed for prestigious display in boardrooms, school halls, and official buildings. Each piece is a work of art.", imageUrl: "/images/products/shield-decorative.jpg", isCustomizable: true, isFeatured: false, sizes: [{ label: "10 inch", priceMin: 350, priceMax: 550, moq: 15, inStock: true }, { label: "14 inch", priceMin: 550, priceMax: 900, moq: 10, inStock: true }] },
];

// ─── Main seed function ────────────────────────────────────────────────────

const allProductsByCategory: Record<string, ProductSeed[]> = {
  "wooden-trophies": woodenProducts,
  "acrylic-awards": acrylicProducts,
  "metal-cups-trophies": metalProducts,
  "crystal-trophies": crystalProducts,
  "plastic-trophy-series": plasticProducts,
  "custom-medals": medalProducts,
  "trophy-bases-accessories": baseProducts,
  "corporate-gift-mementos": corporateProducts,
  "shields-plaques": shieldProducts,
};

async function main() {
  console.log("🌱 Seeding Delta Industries database...\n");

  // Upsert categories
  for (const cat of categories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, imageUrl: cat.imageUrl, sortOrder: cat.sortOrder, isActive: true },
      create: cat,
    });
    console.log(`  ✓ Category: ${cat.name}`);
  }

  console.log(`\n  ${categories.length} categories seeded.\n`);

  // Upsert products with sizes
  let totalProducts = 0;
  let totalSizes = 0;

  for (const [categorySlug, products] of Object.entries(allProductsByCategory)) {
    const category = await db.category.findUnique({ where: { slug: categorySlug } });
    if (!category) {
      console.error(`  ✗ Category not found: ${categorySlug}`);
      continue;
    }

    for (const p of products) {
      const product = await db.product.upsert({
        where: { slug: p.slug },
        update: {
          name: p.name,
          categoryId: category.id,
          material: p.material,
          shortDesc: p.shortDesc,
          description: p.description,
          imageUrl: p.imageUrl,
          isCustomizable: p.isCustomizable,
          isFeatured: p.isFeatured,
          isActive: true,
        },
        create: {
          name: p.name,
          slug: p.slug,
          categoryId: category.id,
          material: p.material,
          shortDesc: p.shortDesc,
          description: p.description,
          imageUrl: p.imageUrl,
          isCustomizable: p.isCustomizable,
          isFeatured: p.isFeatured,
        },
      });

      // Delete existing sizes and re-create (idempotent)
      await db.productSize.deleteMany({ where: { productId: product.id } });
      for (const size of p.sizes) {
        await db.productSize.create({
          data: {
            productId: product.id,
            label: size.label,
            priceMin: size.priceMin,
            priceMax: size.priceMax,
            moq: size.moq,
            inStock: size.inStock,
          },
        });
        totalSizes++;
      }

      totalProducts++;
    }

    console.log(`  ✓ ${products.length} products seeded for "${category.name}"`);
  }

  // ─── Testimonials ─────────────────────────────────────────────────────────
  const testimonials = [
    { name: "Rajesh Sharma", designation: "Event Coordinator", organization: "Punjab Sports Association", quote: "Delta Industries delivered 200 custom medals for our state championship in record time. The quality exceeded our expectations and the gold finish was flawless.", rating: 5 },
    { name: "Priya Malhotra", designation: "HR Manager", organization: "TechSoft Solutions", quote: "We order corporate mementos annually from Delta for our employee recognition program. Their wooden trophies with custom engraving always receive compliments from our team.", rating: 5 },
    { name: "Amit Singh", designation: "Principal", organization: "DAV Public School", quote: "Our annual prize distribution ceremony depends on Delta's consistent quality and timely delivery. The acrylic awards are especially popular with our students.", rating: 5 },
    { name: "Dr. Vikram Patel", designation: "Dean", organization: "Guru Nanak Dev University", quote: "The crystal trophies we ordered for our convocation were absolutely stunning. Every piece was handcrafted with precision and the university crest engraving was perfect.", rating: 5 },
    { name: "Neha Gupta", designation: "Marketing Director", organization: "PharmaCare India", quote: "From enquiry to delivery, Delta's service was exceptional. We needed 500 corporate gifts in 10 days and they delivered with zero defects. Highly recommended.", rating: 4 },
  ];

  for (const t of testimonials) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db as { testimonial: { upsert: (args: any) => Promise<any> } }).testimonial.upsert({
      where: { id: testimonials.indexOf(t) + 1 },
      update: {},
      create: t,
    });
  }
  console.log(`  ✓ ${testimonials.length} testimonials seeded`);

  // ─── Default Admin ────────────────────────────────────────────────────────
  const adminEmail = "admin@deltaindustries.in";
  const existingAdmin = await db.admin.findUnique({ where: { email: adminEmail } });
  const adminPasswordHash = await bcrypt.hash("admin123", 12);
  if (!existingAdmin) {
    await db.admin.create({
      data: {
        email: adminEmail,
        password: adminPasswordHash,
        name: "System Admin",
      },
    });
    console.log(`  ✓ Default admin created: ${adminEmail}`);
  } else {
    await db.admin.update({
      where: { email: adminEmail },
      data: { password: adminPasswordHash },
    });
    console.log(`  ✓ Admin password updated: ${adminEmail}`);
  }

  console.log(`\n🎉 Seeding complete!`);
  console.log(`   Categories:   ${categories.length}`);
  console.log(`   Products:     ${totalProducts}`);
  console.log(`   Sizes:        ${totalSizes}`);
  console.log(`   Testimonials: ${testimonials.length}\n`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
