import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import PropiedadesIcon from "@assets/propiedades-icons";
import { NavLink, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { routes } from "./routes/router";
import { PropsWithChildren, useEffect, useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemProps,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./shared/components/button";
import { SlOptionsVertical } from "react-icons/sl";
import { cn } from "./lib/utils";
import { useLogoutMutation } from "./features/auth/hooks/auth-hooks";
import { InfoUserType } from "./stores/auth.store";
function RootLayout() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);


  useEffect(() => {
    function handleResize() {
      setIsCollapsed(window.innerWidth < 800);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex w-full h-screen ">
      <nav
        className={`h-[100vh]   transition-all duration-500 ease-in-out overflow-hidden poppins-normal  ${
          isCollapsed ? "w-[60px]" : "w-[180px]"
        } bg-gray-100   text-gray-700 max-xs:text-xs  max-md:text-xl  `}
      >
        <div className=" flex flex-row-reverse h-10">
          <button
            onClick={toggleSidebar}
            className=" p-2 flex items-center justify-center transition-all duration-300  "
            aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            {isCollapsed ? (
              <MdKeyboardDoubleArrowRight className="text-gray-700 h-6 w-6" />
            ) : (
              <MdKeyboardDoubleArrowLeft className="text-gray-700 h-6 w-6" />
            )}
          </button>
        </div>
        <div className={` flex transition-transform    ${
              isCollapsed ? " scale-50" : "scale-100"
            } flex-col items-center justify-center  w-auto gap-2 my-4`}>
          <PropiedadesIcon
            className={` size-25 duration-300 ease-in-out  fill-sky-900 `}
          />

            {
            !isCollapsed ?<span className={`font-semibold text-sky-800  text-md transition-opacity whitespace-nowrap duration-300 overflow-x-auto ${ isCollapsed ? "opacity-0" :"opacity-100"}`}>
              Admin Shinball
            </span> : null}

        </div>

        <ul className="flex flex-col gap-1  items-center w-full justify-center">
          {routes.map(({ Icon, name, to }) => (
            <li className="w-full" key={to}>
              <NavLink
                to={to}
                style={{
                  width: "100%",
                  display: "flex",
                  padding: "12px",
                  flexWrap: "nowrap",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "4px",
                }}
                className={({ isActive }) =>
                  isActive || (to === "/dashboard" && location.pathname === "/")
                    ? " bg-gray-200  text-sky-800 font-semibold border-e-6 "
                    : ""
                }
              >
                {Icon ? <Icon className=" text-center w-6 h-6   " /> : null}

                {!isCollapsed && (
                  <span
                    className={`w-full  text-lg max-sm:hidden   ${
                      isCollapsed ? "opacity-0" : "opacity-100"
                    }  transition-opacity duration-500 delay-200 whitespace-nowrap`}
                  >
                    {name}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex flex-col w-full flex-1 overflow-hidden ">
        <header className="bg-gray-100 px-2 flex flex-row-reverse flex-wrap items-center  shadow-gray-200 border-l-2 shadow-sm min-h-auto">
          <DropdownMenuProfile />
        </header>
        <div  className="flex-1 overflow-y-auto p-12    mt-4">
        <Outlet />

        </div>
      </main>
    </div>
  );
}

export function DropdownMenuProfile() {

  return (
    <DropdownMenu

    >
      <DropdownMenuTrigger asChild

      >
        <div className="h-auto py-2">
          <Button className="size-auto rounded-full mt-0 " type="button"

          >
            <SlOptionsVertical />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 shadow-md bg-white rounded-sm z-[100]">
        <MenuItem
          className="p-0"

        asChild
        >
          <NavLink
            to={"perfil"}
            style={{
              padding: "16px",
              width: "100%",
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "start",
              alignItems: "center",
              gap: "4px",
            }}

          >

            <span
              className={`text-lg `}
             >
              Perfil
            </span>
          </NavLink>
        </MenuItem>
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LogoutButton() {

  const dataLoader = useLoaderData() as InfoUserType;
  const logoutMutation = useLogoutMutation(dataLoader.id);
  return (
    <MenuItem
      onClick={() => {

        logoutMutation.mutate();
      }}
      className={cn(
        "font-medium",
        logoutMutation.isPending ? "bg-gray-300 text-gray-400" : ""
      )}
    >
      <RiLogoutBoxLine />
      Cerrar sesión
    </MenuItem>
  );
}

function MenuItem({
  children,
  className,
  ...props
}: { className?: string } & PropsWithChildren &
  DropdownMenuItemProps &
  React.RefAttributes<HTMLDivElement>) {
  return (
    <DropdownMenuItem
      className={cn(
        "p-4 focus-visible:outline-0 flex flex-1 gap-2 items-center hover:bg-gray-200 hover:text-primary-400 bg-white cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuItem>
  );
}

export default RootLayout;
