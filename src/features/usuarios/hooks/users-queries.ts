
import { queryOptions } from "@tanstack/react-query";
import { getAllUsers } from "../services/users-services";
export function useUsersQueryOptions(value: string | null) {

  return queryOptions({
    queryKey: ["usuarios", {value, id:( +new Date).toString(36) }],
    queryFn: ()=> getAllUsers(value)
  })

}
