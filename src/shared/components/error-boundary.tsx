import { AxiosError } from "axios";

import { isRouteErrorResponse, Navigate, useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      return <Navigate to={"/login"} replace />;
    }

    if (error.status >= 500) {
      return <div>Looks like our API is down</div>;
    }
  }

  if (error instanceof AxiosError) {
    return <Navigate to={"/login"} />;
  }

  return <Navigate to={"/login"} />;
}

export default ErrorBoundary;
