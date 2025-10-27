import axiosInstance, { ApiSuccessResponse } from "@/lib/axios";
import { StatsDTO } from "../utils/types";

export async function getAllStatsDashboard() {
  return await axiosInstance.get<ApiSuccessResponse<StatsDTO[]>>(`dashboard`);
}
