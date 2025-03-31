
import { queryOptions } from "@tanstack/react-query";
import { getAllUsers } from "../services/users-services";
export function useUsersQueryOptions(search: string | null) {


  return queryOptions({
    queryKey: ["usuarios", {search }],
    queryFn: ()=> getAllUsers(search)
  })

}
