// import { InfoUserType } from "@/stores/auth.store";
// import {  useRouteLoaderData } from "react-router";

import CardDashboard from "../components/card-dashboard";

function Dashboard() {
  // const userData = useRouteLoaderData("root") as InfoUserType;

  return (
    <div className="w-full">
      <h1>Dashboard</h1>

      <div className="grid grid-cols-2">
        <CardDashboard>
          <CardDashboard.Header> holas</CardDashboard.Header>
          <CardDashboard.Content></CardDashboard.Content>
          <CardDashboard.Footer></CardDashboard.Footer>
        </CardDashboard>
      </div>
    </div>
  );
}

export default Dashboard;
