import { MdSpaceDashboard } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { IconType } from "react-icons";

import { lazy, LazyExoticComponent } from "react";
import Login from "@/features/auth/page/login";
import SignUp from "@/features/auth/page/sign-up";
import RootLayout from "@/layout";

import { createBrowserRouter, LoaderFunction } from "react-router-dom";
import { AuthLoader } from "@/features/auth/loaders/loader-auth";
import ErrorBoundary from "@/shared/components/error-boundary";
import NotFound from "@/shared/components/not-found";
import { InfoUserType } from "@/features/auth/services/auth-services";

const Dashboard = lazy(() => import("../features/dashboard/page/dashboard"));
const Productos = lazy(() => import("../features/productos/page/productos"));

type JSXComponent = () => JSX.Element;
type LazyComponent = LazyExoticComponent<JSXComponent>;

interface Route {
  Component: LazyComponent | JSXComponent;
  to: string;
  path: string;
  name: string;
  Icon?: IconType;
  index: boolean;
}

export const routes: Route[] = [
  {
    Component: Dashboard,
    to: "/dashboard",
    name: "Dashboard",
    path: "dashboard",
    Icon: MdSpaceDashboard,
    index: true,
  },
  {
    Component: Productos,
    to: "/productos",
    name: "Productos",
    path: "productos",
    Icon: IoMdCart,
    index: false,
  },
];

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/",
      loader: AuthLoader as LoaderFunction<InfoUserType>,
      children: routes,
      element: <RootLayout />,
      errorElement: <ErrorBoundary />
    },
    {
      path: "*",
      element:<NotFound/>
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
    },
  }
);
