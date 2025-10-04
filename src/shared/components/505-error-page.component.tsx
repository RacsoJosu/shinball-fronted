import { Navigate, NavLink, useLocation } from "react-router";
import { Button } from "./button";

function ErrorPage() {
  const location = useLocation();
  if (location.pathname === "/") {
    return <Navigate to="/" />;
  }

  return (
    <div className=" bg-cover sm:bg-[auto_700px] bg-no-repeat bg-center bg-fixed bg-[url(@assets/404_Error.svg)] h-full ">
      <div className=" h-full flex flex-col gap-8 justify-center basis-3/5  items-center max-w-full">
        <div className="flex justify-start items-center flex-col ">
          <span className="font-bold text-xl text-primary-400">Oops Algo salío mal</span>
          <h1 className="text-[100px]  shadow-2xs font-extrabold text-primary-300">505</h1>
        </div>

        <div className=" cursor-pointer  flex flex-col items-center justify-end basis-1/5">
          <Button className={"max-w-[90px] text-sm"} type="button">
            <NavLink
              to={`/${location.pathname.split("/")[1].length > 1 ? location.pathname.split("/")[1] : location.pathname.split("/")[0]}`}
              className={({ isActive }) =>
                isActive ? " bg-gray-200 text-sky-800 font-semibold border-e-6 " : ""
              }
            >
              Regresar
            </NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
