import { z } from "zod";
import { router, publicProcedure, adminProcedure } from "../trpc.ts";

const enquiryInput = z.object({
  productId: z.number().int().positive().optional(),
  customerName: z.string().min(1).max(150),
  organization: z.string().max(200).optional(),
  email: z.string().email().max(200),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
  message: z.string().optional(),
  quantity: z.number().int().positive().optional(),
});

export const enquiryRouter = router({
  /** Submit a new customer enquiry */
  submit: publicProcedure.input(enquiryInput).mutation(async ({ ctx, input }) => {
    const enquiry = await ctx.db.enquiry.create({
      data: {
        productId: input.productId ?? null,
        customerName: input.customerName,
        organization: input.organization ?? null,
        email: input.email,
        phone: input.phone,
        message: input.message ?? null,
        quantity: input.quantity ?? null,
      },
    });
    return { success: true, id: enquiry.id };
  }),

  /** List all enquiries (admin) */
  list: adminProcedure
    .input(
      z
        .object({
          status: z.enum(["new", "in_progress", "resolved", "spam"]).optional(),
          limit: z.number().int().min(1).max(100).default(50),
          offset: z.number().int().min(0).default(0),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const where = input?.status ? { status: input.status } : {};
      const [items, count] = await Promise.all([
        ctx.db.enquiry.findMany({
          where,
          orderBy: { submittedAt: "desc" },
          take: input?.limit ?? 50,
          skip: input?.offset ?? 0,
          include: { product: { select: { name: true, slug: true } } },
        }),
        ctx.db.enquiry.count({ where }),
      ]);
      return { items, total: count };
    }),

  /** Get single enquiry (admin) */
  getById: adminProcedure.input(z.object({ id: z.number().int() })).query(async ({ ctx, input }) => {
    return ctx.db.enquiry.findUnique({
      where: { id: input.id },
      include: { product: { select: { name: true, slug: true, imageUrl: true } } },
    });
  }),

  /** Update enquiry status (admin) */
  updateStatus: adminProcedure
    .input(
      z.object({
        id: z.number().int(),
        status: z.enum(["new", "in_progress", "resolved", "spam"]),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.enquiry.update({
        where: { id: input.id },
        data: { status: input.status, notes: input.notes },
      });
      return { success: true };
    }),

  /** Dashboard stats (admin) */
  stats: adminProcedure.query(async ({ ctx }) => {
    const total = await ctx.db.enquiry.count();
    const byStatus = await ctx.db.enquiry.groupBy({
      by: ["status"],
      _count: { status: true },
    });
    const recent = await ctx.db.enquiry.findMany({
      orderBy: { submittedAt: "desc" },
      take: 5,
      select: { id: true, customerName: true, status: true, submittedAt: true },
    });
    return { total, byStatus, recent };
  }),
});
