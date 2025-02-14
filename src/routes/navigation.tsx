import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { Suspense } from "react";

function Navigation() {
  return (
    <Suspense fallback={null}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </Suspense>
  );
}
export default Navigation;
