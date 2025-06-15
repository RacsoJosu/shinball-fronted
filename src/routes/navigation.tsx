import { RouterProvider } from "react-router";
import { router } from "./router.tsx";

function Navigation() {
  return <RouterProvider router={router} />;
}
export default Navigation;
