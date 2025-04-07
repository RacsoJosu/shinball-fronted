
import { queryOptions } from "@tanstack/react-query";
import { getAllUsers } from "../services/users-services";
export function useUsersQueryOptions(search: string | null, page: number | null, limit: number | null) {


  return queryOptions({
    queryKey: ["usuarios", search, page ],
    queryFn: () => getAllUsers(search, page, limit),

  })

}
