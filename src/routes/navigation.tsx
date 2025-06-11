import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";


function Navigation() {
  return (

      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />

  );
}
export default Navigation;
