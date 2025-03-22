import axiosIntance, { ApiSuccessResponse } from "@/lib/axios";
import { z } from "zod";
import { loginUserSchema } from "../schemas/forms-schema";
import { InfoUserType } from "@/stores/auth.store";



export async function Login(body: z.infer<typeof loginUserSchema>) {
  return await axiosIntance.post<ApiSuccessResponse<null>>("auth/login", {
    ...body,
  });
}


export async function Logout() {
  return await axiosIntance.post<ApiSuccessResponse<null>>("auth/logout");
}

export async function getInfoAuthUser() {
  return await axiosIntance.get<ApiSuccessResponse<InfoUserType>>("auth/me", {
    withCredentials: true,
  });
}
