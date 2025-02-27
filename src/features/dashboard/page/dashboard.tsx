import { InfoUserType } from "@/stores/auth.store";
import {  useRouteLoaderData } from "react-router-dom";

function Dashboard() {
  // const userData = useRouteLoaderData("root") as InfoUserType;


  return (
    <div className="w-full">
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
