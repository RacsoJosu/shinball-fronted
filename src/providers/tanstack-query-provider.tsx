import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { queryClient } from "./query-client";

type TanstackQueryProviderProps = Readonly<{
  children: ReactNode;
}>;

function TanstackQueryProvider({ children }: TanstackQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}

export default TanstackQueryProvider;
