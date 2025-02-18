import axios from "axios"
import { toast } from "react-toastify";
const axiosIntance = axios.create({
  baseURL: import.meta.env.VITE_SHINBALL_API,
  withCredentials: true,
  timeout: 16000,
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

})

axiosIntance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || (error instanceof Error && error.message.includes("Sesión expirada"))) {
      toast.error("Sesión expirada. vuelve a iniciar sesión")
      error.message = "Sesión expirada. Vuelve a iniciar sesión.";
    }

    if (error.response?.status === 500) {
      error.message = "Error interno del servidor.";
    }

    return Promise.reject(error);
  }
);
export default axiosIntance;
