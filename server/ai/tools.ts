import { db } from "../db.ts";

// ─── Tool Definition Types ─────────────────────────────────────────────────

interface ToolDefinition {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: Record<string, {
        type: string;
        description: string;
        items?: { type: string };
      }>;
      required?: string[];
    };
  };
}

interface GroqToolCall {
  id: string;
  function: {
    name: string;
    arguments: string;
  };
}

// ─── Tool Registry ─────────────────────────────────────────────────────────

export const toolDefinitions: ToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "search_products",
      description: "Search for products in the Delta Industries catalog by name, material, category, or keywords.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query — product name, material, or keywords" },
          category: { type: "string", description: "Optional: filter by category slug" },
          limit: { type: "number", description: "Max results (default 5, max 10)" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_product_details",
      description: "Get complete details for a specific product. Pass the product code like WA-06 or PC-20 (not the full name). Accepts codes (WA-06) or slugs (wooden-award-wa-06).",
      parameters: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Product slug/identifier" },
        },
        required: ["slug"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_categories",
      description: "List all product categories available at Delta Industries with their descriptions.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_featured_products",
      description: "Get featured/popular products for recommendations.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "submit_enquiry",
      description: "Submit a customer enquiry/order request to Delta Industries.",
      parameters: {
        type: "object",
        properties: {
          customerName: { type: "string", description: "Full name of the customer" },
          email: { type: "string", description: "Email address" },
          phone: { type: "string", description: "Indian mobile number (10 digits)" },
          organization: { type: "string", description: "Organization/school/company (optional)" },
          message: { type: "string", description: "Summary of requirements" },
          quantity: { type: "number", description: "Approximate quantity needed" },
          productId: { type: "number", description: "Database product ID (optional)" },
        },
        required: ["customerName", "email", "phone", "message"],
      },
    },
  },
];

// ─── Tool Executor ─────────────────────────────────────────────────────────

export async function executeTool(name: string, args: Record<string, unknown>): Promise<string> {
  switch (name) {
    case "search_products": {
      const query = (args.query as string).toLowerCase();
      const limit = Math.min((args.limit as number) || 5, 10);
      const categorySlug = args.category as string | undefined;

      const products = await db.product.findMany({
        where: {
          isActive: true,
          ...(categorySlug ? { category: { slug: categorySlug } } : {}),
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { material: { contains: query, mode: "insensitive" } },
            { shortDesc: { contains: query, mode: "insensitive" } },
            { category: { name: { contains: query, mode: "insensitive" } } },
          ],
        },
        take: limit,
        include: {
          category: { select: { name: true, slug: true } },
          sizes: { orderBy: { id: "asc" }, take: 3 },
        },
      });

      if (products.length === 0) {
        return JSON.stringify({ found: false, message: "No products matched.", products: [] });
      }

      return JSON.stringify({
        found: true,
        count: products.length,
        products: products.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          category: p.category.name,
          categorySlug: p.category.slug,
          material: p.material,
          shortDesc: p.shortDesc,
          imageUrl: p.imageUrl,
          isCustomizable: p.isCustomizable,
          sizes: p.sizes.map((s) => ({
            label: s.label,
            priceRange: s.priceMin && s.priceMax ? `Rs ${Number(s.priceMin)}-${Number(s.priceMax)}` : "Contact for price",
            moq: s.moq,
          })),
        })),
      });
    }

    case "get_product_details": {
      let slug = args.slug as string;

      // Try exact slug first
      let product = await db.product.findUnique({
        where: { slug },
        include: {
          category: { select: { name: true, slug: true } },
          sizes: { orderBy: { id: "asc" } },
          images: { orderBy: { sortOrder: "asc" } },
        },
      });

      // If not found, try fuzzy: search by name containing the code or slug text
      if (!product) {
        const searchTerm = slug.replace(/-/g, " ").toLowerCase();
        const matches = await db.product.findMany({
          where: {
            isActive: true,
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { slug: { contains: slug.toLowerCase(), mode: "insensitive" } },
            ],
          },
          take: 3,
          include: {
            category: { select: { name: true, slug: true } },
            sizes: { orderBy: { id: "asc" } },
            images: { orderBy: { sortOrder: "asc" } },
          },
        });

        if (matches.length === 1) {
          product = matches[0];
        } else if (matches.length > 1) {
          // Return multiple matches for the AI to pick
          return JSON.stringify({
            found: true,
            multiple: true,
            products: matches.map((p) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              category: p.category.name,
              material: p.material,
              shortDesc: p.shortDesc,
              imageUrl: p.imageUrl,
              sizes: p.sizes.map((s) => ({
                label: s.label,
                priceMin: s.priceMin ? Number(s.priceMin) : null,
                priceMax: s.priceMax ? Number(s.priceMax) : null,
                moq: s.moq,
                inStock: s.inStock,
              })),
            })),
          });
        }
      }

      if (!product) {
        return JSON.stringify({ found: false, message: `No product matching "${slug}" was found. Try using the product code like WA-06 or PC-20.` });
      }

      return JSON.stringify({
        found: true,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          category: product.category.name,
          material: product.material,
          shortDesc: product.shortDesc,
          description: product.description,
          imageUrl: product.imageUrl,
          isCustomizable: product.isCustomizable,
          sizes: product.sizes.map((s) => ({
            label: s.label,
            priceMin: s.priceMin ? Number(s.priceMin) : null,
            priceMax: s.priceMax ? Number(s.priceMax) : null,
            moq: s.moq,
            inStock: s.inStock,
          })),
          images: product.images.map((img) => ({ url: img.url, alt: img.altText })),
        },
      });
    }

    case "get_categories": {
      const categories = await db.category.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        select: { id: true, name: true, slug: true, description: true },
      });

      return JSON.stringify({
        count: categories.length,
        categories: categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
        })),
      });
    }

    case "get_featured_products": {
      const products = await db.product.findMany({
        where: { isActive: true, isFeatured: true },
        orderBy: { viewCount: "desc" },
        take: 6,
        include: {
          category: { select: { name: true, slug: true } },
          sizes: { orderBy: { id: "asc" }, take: 1 },
        },
      });

      return JSON.stringify({
        count: products.length,
        products: products.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          category: p.category.name,
          material: p.material,
          shortDesc: p.shortDesc,
          imageUrl: p.imageUrl,
          priceHint: p.sizes[0]?.priceMin ? `From Rs ${Number(p.sizes[0].priceMin)}` : "Contact for price",
        })),
      });
    }

    case "submit_enquiry": {
      const enquiry = await db.enquiry.create({
        data: {
          customerName: args.customerName as string,
          email: args.email as string,
          phone: args.phone as string,
          organization: (args.organization as string) || null,
          message: args.message as string,
          quantity: (args.quantity as number) || null,
          productId: (args.productId as number) || null,
        },
      });

      return JSON.stringify({
        success: true,
        enquiryId: enquiry.id,
        message: "Enquiry submitted. Delta Industries will contact you within 24 hours.",
      });
    }

    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` });
  }
}

// ─── Product Data Extraction ───────────────────────────────────────────────

export interface ChatProductCard {
  id: number;
  name: string;
  slug: string;
  category: string;
  material: string | null;
  shortDesc: string | null;
  imageUrl: string | null;
  priceHint: string | null;
}

export function extractProductsFromToolResult(toolName: string, result: string): ChatProductCard[] {
  if (toolName !== "search_products" && toolName !== "get_featured_products" && toolName !== "get_product_details") {
    return [];
  }
  try {
    const parsed = JSON.parse(result);
    if (parsed.products) {
      return parsed.products.map((p: Record<string, unknown>) => ({
        id: p.id as number,
        name: p.name as string,
        slug: p.slug as string,
        category: p.category as string,
        material: p.material as string | null,
        shortDesc: p.shortDesc as string | null,
        imageUrl: p.imageUrl as string | null,
        priceHint: (p.priceHint || p.sizes?.[0]?.priceRange || null) as string | null,
      }));
    }
    if (parsed.product) {
      const p = parsed.product as Record<string, unknown>;
      return [{
        id: p.id as number,
        name: p.name as string,
        slug: p.slug as string,
        category: p.category as string,
        material: p.material as string | null,
        shortDesc: p.shortDesc as string | null,
        imageUrl: p.imageUrl as string | null,
        priceHint: p.sizes?.[0]?.priceMin ? `From Rs ${p.sizes[0].priceMin}` : null,
      }];
    }
  } catch {
    // not JSON, no products
  }
  return [];
}

// ─── Tool Call Loop ────────────────────────────────────────────────────────

export async function executeToolCalls(
  toolCalls: GroqToolCall[],
  pushToConversation: (entry: { role: string; content?: string; tool_calls?: unknown[]; tool_call_id?: string }) => void,
): Promise<{ executed: string[]; products: ChatProductCard[] }> {
  const executed: string[] = [];
  const allProducts: ChatProductCard[] = [];

  for (const tc of toolCalls) {
    let toolArgs: Record<string, unknown> = {};
    try {
      toolArgs = JSON.parse(tc.function.arguments);
    } catch {
      // keep empty args on parse failure
    }

    const result = await executeTool(tc.function.name, toolArgs);
    executed.push(tc.function.name);

    const products = extractProductsFromToolResult(tc.function.name, result);
    allProducts.push(...products);

    pushToConversation({
      role: "tool",
      content: result,
      tool_call_id: tc.id,
    });
  }

  return { executed, products: allProducts };
}
