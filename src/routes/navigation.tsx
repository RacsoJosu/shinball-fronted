
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { routes } from "./router";
import { Suspense } from "react";
import RootLayout from "@/layout";

function Navigation() {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
          <div className="flex flex-col  gap-2 w-full">
          <Routes>
              <Route path="/" element={<RootLayout />} >
              {routes.map(({ path, Component, index }) => (
                <Route path={path} index={index} element={<Component />} />
              ))}
              </Route>

              <Route path="*" element={<Navigate to={routes[0].path} />} />
            </Routes>
          </div>

      </BrowserRouter>
    </Suspense>
  );
}


export default Navigation;
