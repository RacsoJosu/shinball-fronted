import { useMutation } from "@tanstack/react-query";
import { Login, Logout, signUp } from "../services/auth-services";

import { queryClient } from "@/providers/query-client";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function useLoginMutation() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
  });
}

export function useSignUpMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: signUp,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      navigate("/usuarios");
    },
  });
}

export function useLogoutMutation(idUser: string) {
  const navigate = useNavigate();
  const auth = useAuthStore();

  return useMutation({
    mutationKey: ["logout", idUser],
    mutationFn: Logout,
    onSuccess: ({ data }) => {
      queryClient.clear();
      toast.success(data.message);
      auth.clearToken();
      navigate("/login");
    },
  });
}
