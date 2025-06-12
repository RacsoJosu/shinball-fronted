import { queryOptions } from "@tanstack/react-query";
import { getInfoAuthUser } from "../services/auth-services";

export function useAuthQueryOptions() {
  return queryOptions({
    queryKey: ["getInfoUser"],
    queryFn: getInfoAuthUser,
    retry: false,
  });
}
