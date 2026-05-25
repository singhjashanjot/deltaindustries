import { router } from "../trpc.ts";
import { categoryRouter } from "./category.ts";
import { productRouter } from "./product.ts";
import { enquiryRouter } from "./enquiry.ts";
import { adminRouter } from "./admin.ts";
import { searchRouter } from "./search.ts";
import { aiRouter } from "./ai.ts";

export const appRouter = router({
  category: categoryRouter,
  product: productRouter,
  enquiry: enquiryRouter,
  admin: adminRouter,
  search: searchRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
