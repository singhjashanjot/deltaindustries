import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/index.ts";
import { createTRPCContext } from "./trpc.ts";

const app = express();

// CORS configuration for Deno Deploy
const allowedOrigins = [
  "https://deltaindustries.vercel.app"
];

app.use(cors({ 
  origin: allowedOrigins, 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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

const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT, () => {
  console.log(`[server] Delta Industries API running on port ${PORT}`);
});
