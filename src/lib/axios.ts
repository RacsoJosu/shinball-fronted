import { getStateAuth } from "@/stores/auth.store";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

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
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 ||
      (error instanceof Error && error.message.includes("Sesión expirada"))
    ) {
      toast.error("Sesión expirada. vuelve a iniciar sesión");
      error.message = "Sesión expirada. Vuelve a iniciar sesión.";
      return;
    }

    if (error.response?.status === 500) {
      error.message = "Error interno del servidor.";
    }

    return Promise.reject(error);
  }
);
axiosInstance.interceptors.request.use((config) => {
  const token = getStateAuth().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
