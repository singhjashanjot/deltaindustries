import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaPg } from "npm:@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

async function seed() {
  console.log("Seeding...");

  const categories = [
    { name: "Wooden Trophies", slug: "wooden-trophies", sortOrder: 1 },
    { name: "Acrylic Awards", slug: "acrylic-awards", sortOrder: 2 },
    { name: "Metal Cups & Trophies", slug: "metal-cups-trophies", sortOrder: 3 },
    { name: "Crystal Trophies", slug: "crystal-trophies", sortOrder: 4 },
    { name: "Plastic Trophy Series", slug: "plastic-trophy-series", sortOrder: 5 },
    { name: "Custom Medals", slug: "custom-medals", sortOrder: 6 },
    { name: "Trophy Bases & Accessories", slug: "trophy-bases-accessories", sortOrder: 7 },
    { name: "Corporate Gift Mementos", slug: "corporate-gift-mementos", sortOrder: 8 },
    { name: "Shields & Plaques", slug: "shields-plaques", sortOrder: 9 },
  ];

  for (const cat of categories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log(`  ${categories.length} categories seeded`);

  const bcrypt = await import("bcryptjs");
  const hash = bcrypt.hashSync("admin123", 12);
  await db.admin.upsert({
    where: { email: "admin@deltaindustries.in" },
    update: {},
    create: { email: "admin@deltaindustries.in", password: hash, name: "System Admin" },
  });
  console.log("  Admin created");

  console.log("Done!");
}

seed()
  .then(() => db.$disconnect())
  .catch((e: any) => {
    console.error(e);
    db.$disconnect();
    Deno.exit(1);
  });
