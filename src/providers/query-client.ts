import { ApiErrorResponse } from "@/lib/axios";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "react-router";
import { toast } from "react-toastify";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.title, {
          toastId: error.response?.status,
        });
        if (error.status === 401 || error.status === 403) return redirect("/login");
        return;
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.title);
        if (error.status === 401 || error.status === 403) return redirect("/login");

        return;
      }
    },
  }),
});
