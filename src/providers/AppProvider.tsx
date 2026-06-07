import { AuthProvider } from "context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { FC, ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 1000 * 60 },
  },
});

export const AppProvider: FC<ProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
