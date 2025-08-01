"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { trpc } from "../../utils/trpc";
import { httpBatchLink } from "@trpc/client";
const queryClient = new QueryClient();
const Provider = ({ children }: { children: React.ReactNode }) => {
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/trpc",
      }),
    ],
  });
  return (
    <div>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </div>
  );
};

export default Provider;
