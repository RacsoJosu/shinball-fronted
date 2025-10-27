import Login from "@/features/auth/page/login";
import SignUp from "@/features/auth/page/sign-up";
import RootLayout from "@/layout";
import { lazy, LazyExoticComponent, Suspense } from "react";
import { IconType } from "react-icons";
import { HiUsers } from "react-icons/hi2";
import { IoMdCart } from "react-icons/io";

import Informacion from "@/features/usuarios/page/perfil/informacion";
import Perfil from "@/features/usuarios/page/perfil/perfil.page";
import Usuarios from "@/features/usuarios/page/usuarios";
import ErrorBoundary from "@/shared/components/error-boundary";
import { createBrowserRouter, LoaderFunction, Navigate, redirect } from "react-router";

import { ErrorElementProductsModule } from "@/features/productos/components/error-elemet.productos";
import AgregarProductos from "@/features/productos/page/agregar-productos";
import { getUserByIdQueryOptions } from "@/features/usuarios/hooks/users-queries";
import AgregarUsuario from "@/features/usuarios/page/agregar-usuario";
import Editar from "@/features/usuarios/page/editar";
import { queryClient } from "@/providers/query-client";
import RootLoader from "@/root-loader";
import NotFound from "@/shared/components/not-found";
import { MdSpaceDashboard } from "react-icons/md";
import Productos from "../features/productos/page/productos";
import { ErrorElementUsersModule } from "./users-routes";
// import { loaderUsers } from "@/features/usuarios/loader/usuarios-loader";

const Dashboard = lazy(() => import("../features/dashboard/page/dashboard"));
// const Productos = lazy(() => import("../features/productos/page/productos"));
// const RootLayout = lazy(() => import("../layout"));

// const UsersModuleLazy = lazy(() => import("./users-routes"));
const UsuariosLazy = lazy(() => import("../features/usuarios/page/usuarios"));
// const AgregarUsuarioLazy = lazy(() => import("../features/usuarios/page/agregar-usuario"));
export type JSXComponent = () => JSX.Element;
type LazyComponent = LazyExoticComponent<JSXComponent>;

const lazyLoad = (Component: LazyComponent) => (
  <Suspense fallback={<RootLoader />}>
    <Component />
  </Suspense>
);

interface Route {
  Component: LazyComponent | JSXComponent;
  to: string;
  path: string;
  name: string;
  Icon?: IconType;
  loader?: LoaderFunction<unknown>;
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
      // loader: () => {
      //   return authLoader(queryClient);
      // },
      element: <RootLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/",
          element: <Navigate to={"/usuarios"} />,
        },
        {
          index: true,
          path: "dashboard",
          element: lazyLoad(Dashboard),
        },
        {
          path: "usuarios/*",
          errorElement: <ErrorElementUsersModule />,
          children: [
            {
              index: true,
              element: lazyLoad(UsuariosLazy),
            },
            {
              path: "agregar",
              element: <AgregarUsuario />,
            },
            {
              path: "editar/:idUser",
              loader: async ({ params }) => {
                if (!params?.idUser) {
                  return redirect("/dashboard");
                }

                const data =
                  queryClient.getQueryData(getUserByIdQueryOptions(params.idUser).queryKey) ??
                  (await queryClient.fetchQuery(getUserByIdQueryOptions(params.idUser)));

                return data.data.data;
              },
              element: <Editar />,
            },
          ],
        },
        {
          path: "productos",
          errorElement: <ErrorElementProductsModule />,
          children: [
            {
              index: true,
              element: <Productos />,
            },
            {
              path: "agregar",
              element: <AgregarProductos />,
            },
          ],
        },
        {
          element: <Perfil />,
          path: "perfil",
          children: [
            {
              index: true,
              element: <Informacion />,
            },
            // {
            //   path: "cuenta",
            //   element: <Account />,
            // },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {}
);
