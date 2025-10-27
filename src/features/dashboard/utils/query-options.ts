import { queryOptions } from "@tanstack/react-query";
import { getAllStatsDashboard } from "../services/dashboard.services";

export function getStatDashboardQueryOptions() {
  return queryOptions({
    queryKey: ["STATS_DASHBOARD"],
    queryFn: getAllStatsDashboard,
  });
}
