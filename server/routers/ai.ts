import { z } from "zod";
import { router, publicProcedure } from "../trpc.ts";
import { db } from "../db.ts";
import { getGroqClient } from "../ai/groq.ts";

// ─── Input Schemas ─────────────────────────────────────────────────────────

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const chatInput = z.object({
  messages: z.array(chatMessageSchema).min(1).max(30),
});

const generateDescriptionInput = z.object({
  name: z.string().min(1).max(200),
  material: z.string().max(100).optional(),
  category: z.string().max(100).optional(),
});

const smartSearchInput = z.object({
  query: z.string().min(1).max(200),
});

const similarProductsInput = z.object({
  productSlug: z.string().min(1),
});

const dashboardInsightsInput = z.object({
  totalEnquiries: z.number(),
  newEnquiries: z.number(),
  recentProducts: z.array(z.object({ name: z.string(), views: z.number() })),
  recentEnquiryMessages: z.array(z.string()),
});

// ─── Router ────────────────────────────────────────────────────────────────

export const aiRouter = router({
  chat: publicProcedure.input(chatInput).mutation(async ({ input }) => {
    const groq = getGroqClient();
    const result = await groq.chat(input.messages);
    return {
      content: result.content,
      toolCallsUsed: result.toolCallsUsed,
      products: result.products,
    };
  }),

  generateDescription: publicProcedure.input(generateDescriptionInput).mutation(async ({ input }) => {
    const prompt = [
      "Write a professional, SEO-optimized product description (2-3 paragraphs) for a trophy/award product.",
      "",
      `Product Name: ${input.name}`,
      `Material: ${input.material || "Not specified"}`,
      `Category: ${input.category || "Not specified"}`,
      "",
      "Requirements:",
      "- Highlight craftsmanship and material quality",
      "- Mention suitable use cases (events, ceremonies, occasions)",
      "- Describe visual appeal and finish",
      "- Note customization options",
      "- Formal and professional tone, no emojis",
      "- 150-250 words total",
      "",
      "Write only the description text.",
    ].join("\n");

    const groq = getGroqClient();
    const description = await groq.generateCompletion(prompt, { temperature: 0.8, maxTokens: 512 });
    return { description };
  }),

  smartSearch: publicProcedure.input(smartSearchInput).mutation(async ({ input }) => {
    const prompt = [
      "Analyze this search query from a trophy/award manufacturing website.",
      "Categories: wooden-trophies, acrylic-awards, metal-cups-trophies, crystal-trophies, plastic-trophy-series, custom-medals, trophy-bases-accessories, corporate-gift-mementos, shields-plaques.",
      "",
      `Query: "${input.query}"`,
      "",
      "Return JSON:",
      '{',
      '  "interpretedAs": "brief human interpretation",',
      '  "category": "matching slug or null",',
      '  "material": "wood/metal/acrylic/crystal/plastic/brass/marble or null",',
      '  "budget": "budget/mid-range/premium or null",',
      '  "useCase": "sports/academic/corporate/school/wedding/government or null",',
      '  "size": "small/medium/large or null",',
      '  "keywords": ["extracted", "terms"]',
      '}',
    ].join("\n");

    interface SmartSearchResult {
      interpretedAs?: string;
      category?: string | null;
      material?: string | null;
      budget?: string | null;
      useCase?: string | null;
      size?: string | null;
      keywords?: string[];
    }

    const groq = getGroqClient();
    return groq.generateJsonCompletion<SmartSearchResult>(prompt, {
      interpretedAs: input.query,
      category: null,
      material: null,
      budget: null,
      useCase: null,
      size: null,
      keywords: [input.query],
    });
  }),

  similarProducts: publicProcedure.input(similarProductsInput).mutation(async ({ input }) => {
    const product = await db.product.findUnique({
      where: { slug: input.productSlug },
      include: { category: { select: { name: true, slug: true } }, sizes: { take: 1 } },
    });

    if (!product) {
      return { recommendations: [] };
    }

    const similar = await db.product.findMany({
      where: {
        isActive: true,
        categoryId: product.categoryId,
        id: { not: product.id },
      },
      take: 4,
      orderBy: { viewCount: "desc" },
      include: {
        category: { select: { name: true, slug: true } },
        sizes: { take: 1, orderBy: { priceMin: "asc" } },
      },
    });

    return {
      sourceProduct: {
        name: product.name,
        category: product.category.name,
        material: product.material ?? "",
      },
      recommendations: similar.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category.name,
        material: p.material ?? "",
        shortDesc: p.shortDesc ?? "",
        imageUrl: p.imageUrl ?? "",
        priceHint: p.sizes[0]?.priceMin ? `From Rs ${Number(p.sizes[0].priceMin)}` : null as string | null,
      })),
    };
  }),

  dashboardInsights: publicProcedure.input(dashboardInsightsInput).mutation(async ({ input }) => {
    const prompt = [
      "You are an analytics assistant for Delta Industries, a trophy manufacturing company.",
      "Analyze this data and provide 3-4 concise, actionable business insights.",
      "",
      `Total enquiries: ${input.totalEnquiries}`,
      `New (unread) enquiries: ${input.newEnquiries}`,
      `Recent product views: ${JSON.stringify(input.recentProducts)}`,
      `Recent enquiry messages: ${JSON.stringify(input.recentEnquiryMessages)}`,
      "",
      'Return JSON: { "insights": ["insight 1", "insight 2", "insight 3"], "summary": "one sentence summary" }',
      "Be professional. No emojis.",
    ].join("\n");

    interface InsightsResult {
      insights: string[];
      summary: string;
    }

    const groq = getGroqClient();
    return groq.generateJsonCompletion<InsightsResult>(prompt, {
      insights: ["AI insights unavailable right now."],
      summary: "Data analysis pending.",
    });
  }),
});
