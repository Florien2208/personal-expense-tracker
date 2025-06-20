import { protectedProcedure, publicProcedure } from "../lib/orpc";
import { transactionRouter } from "./transaction";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    };
  }),
  transactions: transactionRouter,
};

export type AppRouter = typeof appRouter;
