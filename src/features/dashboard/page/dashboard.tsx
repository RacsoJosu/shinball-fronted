// import { InfoUserType } from "@/stores/auth.store";
// import {  useRouteLoaderData } from "react-router";
import { getAuthQueryOptions } from "@/features/auth/hooks/auth-queries";
import SuspenseCustom from "@/shared/components/suspense-custom";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaDollarSign, FaHome, FaUsers } from "react-icons/fa";
import CardDashboard from "../components/card-dashboard";
import SkeletonCardDashboard from "../components/card-dashboard/skeleton-card-dashboard";
import { ChartAreaInteractive } from "../components/chart.component";
import { useGetAllStatDashboardQuery } from "../hooks/query";
const iconMap: Record<string, JSX.Element> = {
  user: <FaUsers className="text-3xl text-primary-400" />,
  home: <FaHome className="text-3xl text-primary-400" />,
  calendar: <FaCalendarAlt className="text-3xl text-primary-400" />,
  dollar: <FaDollarSign className="text-3xl text-primary-400" />,
};
function Dashboard() {
  // const userData = useRouteLoaderData("root") as InfoUserType;

  const { data: dataUser } = useQuery({ ...getAuthQueryOptions(), select: (data) => data.data });

  const { data, isPending } = useGetAllStatDashboardQuery();
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-3xl text-primary-400 font-bold">Bienvenido: {dataUser?.data.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SuspenseCustom isSuspense={isPending} fallback={() => <SkeletonCardDashboard count={4} />}>
          {data?.data.data.map(({ title, icon, total, totalThisMonth }) => (
            <CardDashboard>
              <CardDashboard.Header>
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg font-semibold text-gray-700">{title}</span>
                  {iconMap[icon]}
                </div>
              </CardDashboard.Header>
              <CardDashboard.Content>
                <p className="text-3xl font-bold mt-2">{total}</p>
              </CardDashboard.Content>
              <CardDashboard.Footer>
                <span className="text-sm text-gray-500">+{totalThisMonth} este mes</span>
              </CardDashboard.Footer>
            </CardDashboard>
          ))}
        </SuspenseCustom>

        <ChartAreaInteractive />
      </div>
    </div>
  );
}

export default Dashboard;
