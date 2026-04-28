import { router } from "../trpc";
import { categoryRouter } from "./category";
import { productRouter } from "./product";
import { enquiryRouter } from "./enquiry";
import { adminRouter } from "./admin";
import { searchRouter } from "./search";

export const appRouter = router({
  category: categoryRouter,
  product: productRouter,
  enquiry: enquiryRouter,
  admin: adminRouter,
  search: searchRouter,
});

export type AppRouter = typeof appRouter;
