import axiosInstance, { ApiSuccessResponse } from "@/lib/axios";
import { UsersType } from "../types/users-types";

export async function getAllUsers(search: string | null, page: number | null, limit: number | null) {

  return await axiosInstance.get<ApiSuccessResponse<UsersType>>(`usuarios`, {
    params: {
      page,
      limit,
      search: search ? search: undefined
    }
  });
}
