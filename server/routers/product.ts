import { z } from "zod";
import { router, publicProcedure, adminProcedure } from "../trpc.ts";
import { indexProducts } from "../meilisearch.ts";

const productCreateInput = z.object({
  categoryId: z.number().int(),
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(220),
  material: z.string().max(100).optional(),
  shortDesc: z.string().max(300).optional(),
  description: z.string().optional(),
  imageUrl: z.string().max(300).optional(),
  isCustomizable: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  sizes: z
    .array(
      z.object({
        label: z.string().min(1).max(50),
        priceMin: z.number().nonnegative().optional(),
        priceMax: z.number().nonnegative().optional(),
        moq: z.number().int().min(1).default(1),
        inStock: z.boolean().default(true),
      })
    )
    .optional(),
});

const productUpdateInput = productCreateInput.partial().extend({
  id: z.number().int(),
});

export const productRouter = router({
  /** Returns products, optionally filtered by category slug */
  getByCategory: publicProcedure
    .input(
      z
        .object({
          categorySlug: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findMany({
        where: {
          isActive: true,
          ...(input?.categorySlug && {
            category: { slug: input.categorySlug },
          }),
        },
        orderBy: { createdAt: "desc" },
        include: {
          category: { select: { name: true, slug: true } },
          sizes: { orderBy: { id: "asc" }, take: 1 },
        },
      });
    }),

  /** Returns a single product by slug with all sizes and images */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findUnique({
        where: { slug: input.slug },
        include: {
          category: { select: { name: true, slug: true } },
          sizes: { orderBy: { id: "asc" } },
          images: { orderBy: { sortOrder: "asc" } },
        },
      });
    }),

  /** Returns a single product by ID */
  getById: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findUnique({
        where: { id: input.id },
        include: {
          category: { select: { name: true, slug: true } },
          sizes: { orderBy: { id: "asc" } },
        },
      });
    }),

  /** Returns featured products for the homepage */
  getFeatured: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findMany({
      where: { isActive: true, isFeatured: true },
      orderBy: { viewCount: "desc" },
      take: 8,
      include: {
        category: { select: { name: true, slug: true } },
        sizes: { orderBy: { id: "asc" }, take: 1 },
      },
    });
  }),

  /** List all products (admin) */
  listAll: adminProcedure
    .input(
      z
        .object({
          isActive: z.boolean().optional(),
          categoryId: z.number().int().optional(),
          search: z.string().optional(),
          limit: z.number().int().min(1).max(100).default(50),
          offset: z.number().int().min(0).default(0),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const where: {
        isActive?: boolean;
        categoryId?: number;
        OR?: Array<{ name: { contains: string; mode: "insensitive" } } | { slug: { contains: string; mode: "insensitive" } }>;
      } = {};
      if (input?.isActive !== undefined) where.isActive = input.isActive;
      if (input?.categoryId) where.categoryId = input.categoryId;
      if (input?.search) {
        where.OR = [
          { name: { contains: input.search, mode: "insensitive" } },
          { slug: { contains: input.search, mode: "insensitive" } },
        ];
      }
      const [items, count] = await Promise.all([
        ctx.db.product.findMany({
          where,
          orderBy: { updatedAt: "desc" },
          take: input?.limit ?? 50,
          skip: input?.offset ?? 0,
          include: { category: { select: { name: true } }, sizes: true },
        }),
        ctx.db.product.count({ where }),
      ]);
      return { items, total: count };
    }),

  /** Create product (admin) */
  create: adminProcedure.input(productCreateInput).mutation(async ({ ctx, input }) => {
    const { sizes, ...data } = input;
    const product = await ctx.db.product.create({
      data: { ...data, viewCount: 0 },
      include: { sizes: true },
    });
    if (sizes && sizes.length > 0) {
      await ctx.db.productSize.createMany({ data: sizes.map((s) => ({ ...s, productId: product.id })) });
    }
    // Sync to Meilisearch
    const productWithCategory = await ctx.db.product.findUnique({
      where: { id: product.id },
      include: { category: true, sizes: { orderBy: { priceMin: "asc" }, take: 1 } },
    });
    if (productWithCategory) {
      await indexProducts([{
        id: productWithCategory.id,
        name: productWithCategory.name,
        slug: productWithCategory.slug,
        categoryName: productWithCategory.category.name,
        categorySlug: productWithCategory.category.slug,
        material: productWithCategory.material,
        shortDesc: productWithCategory.shortDesc,
        description: productWithCategory.description,
        imageUrl: productWithCategory.imageUrl,
        isCustomizable: productWithCategory.isCustomizable,
        isFeatured: productWithCategory.isFeatured,
        viewCount: productWithCategory.viewCount,
        sizeLabel: productWithCategory.sizes[0]?.label ?? null,
        priceMin: productWithCategory.sizes[0]?.priceMin ? Number(productWithCategory.sizes[0].priceMin) : null,
      }]);
    }
    return ctx.db.product.findUnique({ where: { id: product.id }, include: { sizes: true } });
  }),

  /** Update product (admin) */
  update: adminProcedure.input(productUpdateInput).mutation(async ({ ctx, input }) => {
    const { id, sizes, ...data } = input;
    await ctx.db.product.update({ where: { id }, data });
    if (sizes) {
      await ctx.db.productSize.deleteMany({ where: { productId: id } });
      if (sizes.length > 0) {
        await ctx.db.productSize.createMany({ data: sizes.map((s) => ({ ...s, productId: id })) });
      }
    }
    // Sync to Meilisearch
    const productWithCategory = await ctx.db.product.findUnique({
      where: { id },
      include: { category: true, sizes: { orderBy: { priceMin: "asc" }, take: 1 } },
    });
    if (productWithCategory && productWithCategory.isActive) {
      await indexProducts([{
        id: productWithCategory.id,
        name: productWithCategory.name,
        slug: productWithCategory.slug,
        categoryName: productWithCategory.category.name,
        categorySlug: productWithCategory.category.slug,
        material: productWithCategory.material,
        shortDesc: productWithCategory.shortDesc,
        description: productWithCategory.description,
        imageUrl: productWithCategory.imageUrl,
        isCustomizable: productWithCategory.isCustomizable,
        isFeatured: productWithCategory.isFeatured,
        viewCount: productWithCategory.viewCount,
        sizeLabel: productWithCategory.sizes[0]?.label ?? null,
        priceMin: productWithCategory.sizes[0]?.priceMin ? Number(productWithCategory.sizes[0].priceMin) : null,
      }]);
    }
    return ctx.db.product.findUnique({ where: { id }, include: { sizes: true } });
  }),

  /** Delete product (admin) */
  delete: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ ctx, input }) => {
    await ctx.db.product.delete({ where: { id: input.id } });
    return { success: true };
  }),

  /** Toggle product active status (admin) */
  toggleActive: adminProcedure
    .input(z.object({ id: z.number().int(), isActive: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.product.update({
        where: { id: input.id },
        data: { isActive: input.isActive },
      });
      return { success: true };
    }),
});
