import { isRouteErrorResponse, Navigate, useRouteError } from "react-router";
import NotFound from "./not-found";

function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }
  }

  return <Navigate to={"/login"} replace />;
}

export default ErrorBoundary;
