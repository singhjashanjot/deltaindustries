import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/index.ts";
import { createTRPCContext } from "./trpc.ts";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: ["http://localhost:8080", "http://localhost:5173"], credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: ({ req, res }) => createTRPCContext({ req, res }),
  })
);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[server] Delta Industries API running on http://localhost:${PORT}`);
  console.log(`[server] tRPC endpoint: http://localhost:${PORT}/trpc`);
});
