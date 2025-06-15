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

    // onError: (error) => {
    //   if (axios.isAxiosError<ApiErrorResponse>(error)) {
    //     toast.error(error.response?.data?.details);
    //   }
    // },
  });
}

export function useSignUpMutation() {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: signUp,

    // onError: (error) => {
    //   if (axios.isAxiosError<ApiErrorResponse>(error)) {
    //     toast.error(error.response?.data?.details);
    //   }
    // },
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
    // onError: (error) => {
    //   if (axios.isAxiosError<ApiErrorResponse>(error)) {
    //     toast.error(error.response?.data?.details);
    //   }
    // },
  });
}
