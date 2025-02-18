import { useMutation } from "@tanstack/react-query";
import { Login } from "../services/auth-services";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export function useLoginMutation() {
  const authStore = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onSuccess: ({ data }) => {
      toast.success("Login realizado correctamente");
      authStore.setUser(data.data.infoUser)
      navigate("/dashboard")
    },
    onError: () => {
      toast.error("Algo salio mal");

    }
  })
}
