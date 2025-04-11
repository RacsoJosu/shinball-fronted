import { useMutation } from "@tanstack/react-query";
import { Login, Logout, signUp } from "../services/auth-services";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ApiErrorResponse } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth.store";

export function useLoginMutation() {


  return useMutation({
    mutationKey: ["login"],
    mutationFn: Login,

    onError: (error) => {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.details);
      }
    },
  });
}

export function useSignUpMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: signUp,
    onSuccess: ({data}) => {
      toast.success(data.message);
      navigate("/usuarios");
    },
    onError: (error) => {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.details);
      }
    },
  });
}


export function useLogoutMutation(idUser:string) {
  const navigate = useNavigate();
    const auth = useAuthStore()

  return useMutation({
    mutationKey: ["logout", idUser],
    mutationFn: Logout,
    onSuccess: ({data}) => {
      toast.success(data.message);
      auth.clearToken();
      navigate("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.details);
      }
    },
  });
}
