import axiosInstance, { ApiSuccessResponse } from "@/lib/axios";
import { UsersType } from "../types/users-types";

export async function getAllUsers(searchValue: string | null) {

  return await axiosInstance.get<ApiSuccessResponse<UsersType>>(`usuarios`, {
    params: {
      search: searchValue
    }
  });
}
