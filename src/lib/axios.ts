import { getStateAuth } from "@/stores/auth.store";
import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<ApiErrorResponse>;
export interface ApiSuccessResponse<T> {
  statusCode: number;
  title: string;
  message: string;
  success: boolean;
  data: T;
}

export interface ApiErrorResponse<T = null> {
  statusCode: number;
  title: string;
  details: string;
  success: false;
  data?: T;
  stack?: string | null;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SHINBALL_API,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response
  // (error) => {
  //   const status = error.response?.status ?? error.response.data.statuscode ?? 500;
  //   const data = error.response?.data;

  //   if (Number(status) === 403 || Number(status) === 401) {
  //     toast.error("Sesión expirada. vuelve a iniciar sesión");

  //     localStorage.clear();
  //     error.message = "Sesión expirada. Vuelve a iniciar sesión.";
  //   }

  //   return data;
  // }
);
axiosInstance.interceptors.request.use((config) => {
  const token = getStateAuth().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
