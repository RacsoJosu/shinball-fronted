import { queryClient } from "@/providers/query-client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { addProductoService } from "../service/productos.service";
import { getProductosQueryOptions } from "./productos.queries-options";

export function useAddProducto() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addProductoService,
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries({
        queryKey: getProductosQueryOptions(null, 1, 10).queryKey,
      });
      toast.success(data.message);
      navigate("/productos");
    },
  });
}
