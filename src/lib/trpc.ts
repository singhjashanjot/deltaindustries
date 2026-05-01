import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/routers";

export const trpc = createTRPCReact<AppRouter>();

const apiUrl = import.meta.env.VITE_API_URL || "/trpc";

// Ensure the URL always ends with /trpc
const normalizedApiUrl = apiUrl.endsWith("/trpc") ? apiUrl : `${apiUrl.replace(/\/$/, "")}/trpc`;

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: normalizedApiUrl,
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...(init || {}), credentials: "include" }),
    }),
  ],
});
