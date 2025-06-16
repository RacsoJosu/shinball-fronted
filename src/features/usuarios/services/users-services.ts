import { SignUpFormValues } from "@/features/auth/interfaces/auth";
import axiosInstance, { ApiSuccessResponse } from "@/lib/axios";
import { UsersType, UserType } from "../types/users-types";

export async function getAllUsers(
  search: string | null,
  page: number | null,
  limit: number | null
) {
  return await axiosInstance.get<ApiSuccessResponse<UsersType>>(`usuarios`, {
    params: {
      page,
      limit,
      search: search ? search : undefined,
    },
  });
}

export async function getUserById(idUser: string) {
  return axiosInstance.get<ApiSuccessResponse<UserType>>(`usuarios/${idUser}`);
}

export async function patchUser(idUser: string, body: Partial<SignUpFormValues>) {
  return axiosInstance.patch<ApiSuccessResponse<null>>(`usuarios/${idUser}`, body);
}
