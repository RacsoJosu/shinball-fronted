import axiosInstance, { ApiSuccessResponse } from "@/lib/axios";
import { UsersType } from "../types/users-types";

export async function getAllUsers(searchValue: string | null) {
  let searchParams = ""
  if (searchValue) {
    searchParams += `?search=${searchValue}`
  }

  return await axiosInstance.get<ApiSuccessResponse<UsersType>>(`usuarios${searchParams}`);
}
