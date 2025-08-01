import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  todoRouter: t.router({
    getAllTodo: publicProcedure.query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createTodo: publicProcedure.input(z.object({
      _id: z.string().optional(),
      title: z.string(),
      description: z.string(),
      done: z.boolean(),
    })).output(z.object({
      _id: z.string().optional(),
      title: z.string(),
      description: z.string(),
      done: z.boolean(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

