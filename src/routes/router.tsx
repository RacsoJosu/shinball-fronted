import { MdSpaceDashboard } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { IconType } from "react-icons";

import { lazy, LazyExoticComponent } from "react";
import Login from "@/features/auth/page/login";
import SignUp from "@/features/auth/page/sign-up";
import RootLayout from "@/layout";
import PrivateRoute from "./private-route";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLoader } from "@/features/auth/loaders/loader-auth";

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
    to: "/",
    name: "Dashboard",
    path: "",
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
      element: <PrivateRoute />, // Protegemos las rutas dentro de PrivateRoute
      loader: AuthLoader,
      children: [
        {
          element: <RootLayout />,
          children: routes,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
    },
  }
);
