import { queryOptions } from "@tanstack/react-query";
import { getInfoAuthUser } from "../services/auth-services";

export function getAuthQueryOptions() {
  return queryOptions({
    queryKey: ["getInfoUser"],
    queryFn: getInfoAuthUser,
    retry: false,
  });
}
