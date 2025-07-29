import { queryOptions } from "@tanstack/react-query";
import { getAllProductos } from "../service/productos.service";

export function getProductosQueryOptions(
  search: string | null,
  page: number | null,
  limit: number | null
) {
  return queryOptions({
    queryKey: ["productos", { search, page, limit }],
    queryFn: () =>
      getAllProductos({
        search,
        page,
        limit,
      }),
  });
}
