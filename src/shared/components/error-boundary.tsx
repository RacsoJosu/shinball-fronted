import { isAxiosError } from "axios";
import { isRouteErrorResponse, Navigate, useRouteError } from "react-router";
import { toast } from "react-toastify";
import NotFound from "./not-found";

function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }
  }

  if (isAxiosError(error)) {
    if (Number(error.status) === 403 || Number(error.status) === 401) {
      toast.error("Sesión expirada. vuelve a iniciar sesión", { toastId: error.status });
    }
  }

  return <Navigate to={"/login"} replace />;
}

export default ErrorBoundary;
