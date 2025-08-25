import axiosIntance, { ApiSuccessResponse } from "@/lib/axios";
import { InfoUserType } from "@/stores/auth.store";
import { z } from "zod";
import { SignUpFormValues } from "../interfaces/auth";
import { loginUserSchema } from "../schemas/forms-schema";

export async function Login(body: z.infer<typeof loginUserSchema>) {
  return axiosIntance.post<ApiSuccessResponse<string>>("auth/login", {
    ...body,
  });
}

export async function signUp(body: SignUpFormValues) {
  return axiosIntance.post<ApiSuccessResponse<any>>("auth/signup", {
    ...body,
  });
}

export async function Logout() {
  return axiosIntance.post<ApiSuccessResponse<null>>("auth/logout");
}

export async function getInfoAuthUser() {
  return axiosIntance.get<ApiSuccessResponse<InfoUserType>>("auth/me", {
    withCredentials: true,
  });
}
