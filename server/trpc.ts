import { initTRPC, TRPCError } from "@trpc/server";
import type { Request, Response } from "express";
import { db } from "./db.ts";

export interface TRPCContext {
  req: Request;
  res: Response;
  db: typeof db;
  admin: { id: number; email: string; name: string } | null;
}

export const createTRPCContext = ({ req, res }: { req: Request; res: Response }): TRPCContext => ({
  req,
  res,
  db,
  admin: null,
});

const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

/** Middleware: verify admin session from cookie */
const adminMiddleware = t.middleware(async ({ ctx, next }) => {
  const sessionId = ctx.req.cookies?.session_id;
  if (!sessionId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  const session = await ctx.db.session.findUnique({
    where: { id: sessionId },
    include: { admin: true },
  });

  if (!session || session.expiresAt < new Date() || !session.admin.isActive) {
    ctx.res.clearCookie("session_id");
    if (session) await ctx.db.session.deleteMany({ where: { id: sessionId } });
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Session expired" });
  }

  return next({
    ctx: {
      ...ctx,
      admin: { id: session.admin.id, email: session.admin.email, name: session.admin.name },
    },
  });
});

export const adminProcedure = t.procedure.use(adminMiddleware);
