"use client";
import { AppRouter } from "@repo/trpc-config/approuter";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
