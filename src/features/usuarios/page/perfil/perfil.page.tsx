import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSubPathPerfil } from "@/utils/functions";

import { Outlet, useLocation, useNavigate } from "react-router";

function Perfil() {
  const location = useLocation();
  const currentLocation = getSubPathPerfil(location.pathname);
  const navigate = useNavigate();

  function onChangeTab(tab: string) {
    navigate({
      pathname: tab,
    });
  }

  return (
    <Tabs defaultValue={currentLocation} className="w-full">
      <div className="flex w-full flex-row-reverse">
        <TabsList className="rounded-none    rounded-t-sm   h-12 justify-end bg-white">
          <TabsTrigger onClick={() => onChangeTab("")} value={"perfil"} className="">
            Informacion
          </TabsTrigger>
          <TabsTrigger onClick={() => onChangeTab("cuenta")} className="" value="cuenta">
            Cuenta
          </TabsTrigger>
        </TabsList>
      </div>
      <Outlet />
    </Tabs>
  );
}

export default Perfil;
