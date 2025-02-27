import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from "react"

export const queryClient = new QueryClient({
  defaultOptions: {queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
    },}
})

function TanstackQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
       <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}

export default TanstackQueryProvider
