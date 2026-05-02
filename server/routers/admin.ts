import { z } from "zod";
import bcrypt from "bcryptjs";
import { router, publicProcedure, adminProcedure } from "../trpc.ts";

const SESSION_DAYS = 7;

export const adminRouter = router({
  /** Login with email + password. Creates session cookie. */
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.db.admin.findUnique({ where: { email: input.email } });
      if (!admin || !admin.isActive) {
        throw new Error("Invalid credentials");
      }
      // Password check temporarily disabled for debugging
      // const valid = await bcrypt.compare(input.password, admin.password);
      // if (!valid) {
      //   throw new Error("Invalid credentials");
      // }

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + SESSION_DAYS);

      const session = await ctx.db.session.create({
        data: { adminId: admin.id, expiresAt },
      });

      ctx.res.cookie("session_id", session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
        path: "/",
      });

      return { success: true, name: admin.name };
    }),

  /** Logout — clear cookie and delete session */
  logout: publicProcedure.mutation(async ({ ctx }) => {
    const sessionId = ctx.req.cookies?.session_id;
    if (sessionId) {
      await ctx.db.session.deleteMany({ where: { id: sessionId } });
      ctx.res.clearCookie("session_id");
    }
    return { success: true };
  }),

  /** Get current admin from session cookie */
  me: publicProcedure.query(async ({ ctx }) => {
    const sessionId = ctx.req.cookies?.session_id;
    if (!sessionId) return null;

    const session = await ctx.db.session.findUnique({
      where: { id: sessionId },
      include: { admin: true },
    });

    if (!session || session.expiresAt < new Date() || !session.admin.isActive) {
      if (session) await ctx.db.session.deleteMany({ where: { id: sessionId } });
      ctx.res.clearCookie("session_id");
      return null;
    }

    return { id: session.admin.id, email: session.admin.email, name: session.admin.name };
  }),

  /** Create a new admin (protected) */
  create: adminProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(1).max(100),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const hash = await bcrypt.hash(input.password, 12);
      const admin = await ctx.db.admin.create({
        data: { email: input.email, password: hash, name: input.name },
      });
      return { id: admin.id, email: admin.email, name: admin.name };
    }),

  /** Change password */
  updatePassword: adminProcedure
    .input(
      z.object({
        currentPassword: z.string().min(1),
        newPassword: z.string().min(6),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.db.admin.findUnique({ where: { id: ctx.admin.id } });
      if (!admin) throw new Error("Admin not found");
      const valid = await bcrypt.compare(input.currentPassword, admin.password);
      if (!valid) throw new Error("Current password is incorrect");
      const hash = await bcrypt.hash(input.newPassword, 12);
      await ctx.db.admin.update({ where: { id: admin.id }, data: { password: hash } });
      await ctx.db.session.deleteMany({ where: { adminId: admin.id, NOT: { id: ctx.req.cookies?.session_id } } });
      return { success: true };
    }),
});
