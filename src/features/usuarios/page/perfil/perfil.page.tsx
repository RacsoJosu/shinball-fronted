import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Outlet, useNavigate } from "react-router-dom";

function Perfil() {

  const navigate = useNavigate()

  function onChangeTab(
    tab: string ) {
      navigate({
        pathname:tab
      })

  }

  return (
    <Tabs
        defaultValue="perfil"
      className="w-full"
    >
      <div className="flex w-full flex-row-reverse">
        <TabsList  className="rounded-none    rounded-t-sm   h-12 justify-end bg-white">
          <TabsTrigger   onClick={() => onChangeTab("")} value={"perfil"}  className="">
            Informacion
          </TabsTrigger>
        <TabsTrigger onClick={() => onChangeTab("cuenta")} className="" value="account">Cuenta</TabsTrigger>
        </TabsList>

      </div>
        <Outlet/>
      </Tabs>

  );
}

export default Perfil;
