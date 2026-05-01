import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/routers";

export const trpc = createTRPCReact<AppRouter>();

const apiUrl = import.meta.env.VITE_API_URL || "/trpc";

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: apiUrl,
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...(init || {}), credentials: "include" }),
    }),
  ],
});
