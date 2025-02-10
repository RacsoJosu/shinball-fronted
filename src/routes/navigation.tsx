import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./router";
import { Suspense } from "react";
import RootLayout from "@/layout";
import PrivateRoute from "./private-route";
import { AuthProvider } from "@/features/auth/hooks/useAuth";
import Login from "@/features/auth/page/login";
import SingUp from "@/features/auth/page/sign-up";

function Navigation() {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>

        <div className="flex flex-col  gap-2 w-full">
          <AuthProvider>

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SingUp />} />


              <Route element={<PrivateRoute />}>
                <Route path="/" element={<RootLayout />}>
                  {routes.map(({ path, Component, name }) => (
                    <Route
                      key={path}
                      path={name === "Dashboard" ? undefined : path}
                      index={name === "Dashboard"}
                      element={<Component />}
                    />
                  ))}
                </Route>
              </Route>

              <Route path="*" element={<Navigate to={routes[0].path} />} />
            </Routes>

          </AuthProvider>
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default Navigation;
