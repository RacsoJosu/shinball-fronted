import ErrorPage from "@/shared/components/505-error-page.component";
import NotFound from "@/shared/components/not-found";
import { AxiosError } from "axios";
import { useRouteError } from "react-router";

export function ErrorElementProductsModule() {
  const error = useRouteError();
  if (error instanceof AxiosError) {
    if (error.status === 404) {
      return <NotFound />;
    }
  }

  return <ErrorPage />;
}
