
import { AxiosError } from "axios";

import { isRouteErrorResponse, Navigate, useRouteError } from "react-router-dom";


function ErrorBoundary() {
  const error = useRouteError();



  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <Navigate to={"/login"} />;
    }

    if (error.status >= 500) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }


  if (error instanceof AxiosError) {
    console.log(error instanceof AxiosError)
    const err = error as AxiosError
    if (err.status === 401) {

      return(<Navigate to={"/login"} />);
    }
  }

  console.log(error)

  return (
    <div>Something went wrong</div>
  );
}

export default ErrorBoundary;
