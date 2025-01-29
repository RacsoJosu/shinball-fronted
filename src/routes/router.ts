import { MdSpaceDashboard } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { IconType } from "react-icons";


import { lazy, LazyExoticComponent } from "react";

type JSXComponent = ()=>JSX.Element ;
type LazyComponent = LazyExoticComponent< JSXComponent>;

interface Route {
  Component: LazyComponent | JSXComponent;
  to: string;
  path: string;
  name: string;
  Icon?: IconType;
  index: boolean
}

const Dashboard = lazy(() => import("../features/dashboard/page/dashboard"));
const Productos = lazy(() => import("../features/productos/page/productos"));


export const routes: Route[] = [
  {
    Component:Dashboard ,
    to: "/dashboard",
    name: "Dashboard",
    path: "dashboard",
    Icon: MdSpaceDashboard,
    index: true

  },
  {
    Component: Productos,
    to: "/productos",
    name: "Productos",
    path: "productos",
    Icon: IoMdCart,
    index: false

  }

]
