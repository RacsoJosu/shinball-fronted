import { useQuery } from "@tanstack/react-query";
import { getStatDashboardQueryOptions } from "../utils/query-options";

export function useGetAllStatDashboardQuery() {
  return useQuery(getStatDashboardQueryOptions());
}
