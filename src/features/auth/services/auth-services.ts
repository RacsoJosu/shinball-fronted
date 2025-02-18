import axiosIntance from "@/lib/axios";
import { z } from "zod";
import { loginUserSchema } from "../schemas/forms-schema";
import { InfoUser } from "@/stores/auth.store";
export interface InfoUserType {
  token: string;
  infoUser: InfoUser;
}
export interface ResponseInfoUser {
  message: string;
  title: string;
  data: InfoUserType;
}

export async function Login(body: z.infer<typeof loginUserSchema>) {
  return await axiosIntance.post<ResponseInfoUser>("auth/login", {
    ...body,
  });
}

export async function getInfoAuthUser() {
  return await axiosIntance.get<ResponseInfoUser>("auth/me");
}
