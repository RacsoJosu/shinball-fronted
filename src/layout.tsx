import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import PropiedadesIcon from "@assets/propiedades-icons";
import { NavLink, Outlet, } from "react-router-dom";
import { routes } from "./routes/router";
import { useState } from "react";
// import { useAuthStore } from "./stores/auth.store";
// import { InfoUserType,} from "./features/auth/services/auth-services";

function RootLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  // const { infoUser } = useLoaderData() as InfoUserType;
  // const setUser = useAuthStore((state) => state.setUser);

  // useEffect(() => {
  //   setUser(infoUser);
  // }, [infoUser, setUser]);
  return (
    <div className="flex w-full">
      <nav
        className={`h-[100vh]   transition-all duration-500 ease-in-out overflow-hidden poppins-normal  ${
          isCollapsed ? "w-[60px]" : "w-[180px]"
        } bg-gray-100 text-gray-700 max-xs:text-xs  max-md:text-xl  `}
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
        <div className="flex flex-col items-center justify-center w-full gap-2 my-4">
          <PropiedadesIcon
            className={` fill-sky-900   ${
              isCollapsed ? " h-10 w-10" : "h-25 w-25"
            }   mx-auto`}
          />
          {!isCollapsed && (
            <span className="font-semibold text-sky-800 max-sm:hidden md:text-lg transition-opacity duration-500 ease-out delay-500">
              Admin Shinball
            </span>
          )}
        </div>

        <ul className="flex flex-col gap-1  items-center w-full justify-center">
          {routes.map(({ Icon, name, to }) => (
            <li className="w-full" key={to}>
              <NavLink
                to={to}
                style={{
                  width: "100%",
                  display: "flex",
                  padding: "4px",
                  flexWrap: "nowrap",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "4px",
                }}
                className={({ isActive }) =>
                  isActive
                    ? " bg-gray-200 text-sky-800 font-semibold border-e-6 "
                    : ""
                }
              >
                {Icon ? <Icon className=" text-center w-6 h-6   " /> : null}

                {!isCollapsed && (
                  <span
                    className={`text-lg max-sm:hidden  ${
                      isCollapsed ? "opacity-0" : "opacity-100"
                    } transition-opacity duration-500 delay-200`}
                  >
                    {name}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1  overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
