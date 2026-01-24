import { queryOptions } from "@tanstack/react-query";
import { getAllUsers, getUserById } from "../services/users-services";

export function useUsersQueryOptions(
  search: string | null,
  page: number | null,
  limit: number | null
) {
  return queryOptions({
    queryKey: ["usuarios", search, page],
    queryFn: () => getAllUsers(search, page, limit),
  });
}

export function getUserByIdQueryOptions(idUser: string) {
  return queryOptions({
    queryKey: ["usuario_by_id", idUser],
    queryFn: () => getUserById(idUser),
  });
}

export const suspenseTestQuery = queryOptions({
  queryKey: ["suspense-test"],
  queryFn: async () => {
    const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
    await sleep(5000);

    return {
      message: "Datos cargados después de 5 segundos",
      timestamp: new Date().toISOString(),
    };
  },
});
