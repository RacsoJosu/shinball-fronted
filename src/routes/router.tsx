import { MdSpaceDashboard } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { IconType } from "react-icons";
import { HiUsers } from "react-icons/hi2";
import { lazy, LazyExoticComponent } from "react";
import Login from "@/features/auth/page/login";
import SignUp from "@/features/auth/page/sign-up";
import RootLayout from "@/layout";

import { createBrowserRouter, LoaderFunction } from "react-router-dom";
import { authLoader } from "@/features/auth/loaders/loader-auth";
import ErrorBoundary from "@/shared/components/error-boundary";
import NotFound from "@/shared/components/not-found";
import Usuarios from "@/features/usuarios/page/usuarios";
import Perfil from "@/features/usuarios/page/perfil.page";
// import { loaderUsers } from "@/features/usuarios/loader/usuarios-loader";

const Dashboard = lazy(() => import("../features/dashboard/page/dashboard"));
const Productos = lazy(() => import("../features/productos/page/productos"));

export type JSXComponent = () => JSX.Element;
type LazyComponent = LazyExoticComponent<JSXComponent>;

interface Route {
  Component: LazyComponent | JSXComponent;
  to: string;
  path: string;
  name: string;
  Icon?: IconType;
  loader?: LoaderFunction<any>;
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
    Component: Usuarios,
    to: "/usuarios",
    name: "Usuarios",
    path: "usuarios",
    Icon: HiUsers,
    index: false,
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
      index: true,
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      id: "root",
      path: "/",
      loader: authLoader,
      element: <RootLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "usuarios",
          children: [
            {
              index: true,
              element: <Usuarios />,
            },
            {
              path: "agregar",
              element: <div>Agregar</div>,
            },
            {
              path: "editar",
              element: <div>Editar</div>,
            },
          ],
        },
        {
          element: <Productos />,
          path: "productos",
        },
        {
          element: <Perfil />,
          path: "perfil",
        },
      ],
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
    },
  }
);
