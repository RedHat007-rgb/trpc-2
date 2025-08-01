import { z } from "zod";

export const zTodo = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  done: z.boolean(),
});

export const zUser = z.object({
  _id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  mobile: z.string(),
});

export type Todo = z.infer<typeof zTodo>;
export type User = z.infer<typeof zUser>;
