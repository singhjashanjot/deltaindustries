import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/routers";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/trpc",
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...(init || {}), credentials: "include" }),
    }),
  ],
});
