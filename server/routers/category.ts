import { z } from "zod";
import { router, publicProcedure, adminProcedure } from "../trpc.ts";

export const categoryRouter = router({
  /** Returns all active categories ordered by sort_order */
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        imageUrl: true,
        sortOrder: true,
      },
    });
  }),

  /** List all categories (admin) */
  listAll: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { products: true } } },
    });
  }),

  /** Create category (admin) */
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        slug: z.string().min(1).max(120),
        description: z.string().optional(),
        imageUrl: z.string().max(300).optional(),
        sortOrder: z.number().int().default(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.create({ data: input });
    }),

  /** Update category (admin) */
  update: adminProcedure
    .input(
      z.object({
        id: z.number().int(),
        name: z.string().min(1).max(100).optional(),
        slug: z.string().min(1).max(120).optional(),
        description: z.string().optional(),
        imageUrl: z.string().max(300).optional(),
        sortOrder: z.number().int().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.category.update({ where: { id }, data });
    }),

  /** Delete category (admin) — only if no products */
  delete: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const count = await ctx.db.product.count({ where: { categoryId: input.id } });
      if (count > 0) throw new Error("Cannot delete category with products");
      await ctx.db.category.delete({ where: { id: input.id } });
      return { success: true };
    }),
});
