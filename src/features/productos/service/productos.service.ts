import axiosInstance, { ApiSuccessResponse } from "@/lib/axios";
import { ISearchParams } from "../types/productos.types";
interface Dwelling {
  id: string;
  city: string;
  county: string;
  address: string;
  latitude: string;
  longitude: string;
}

interface Vehicle {
  // Define aquí las propiedades si hay para el tipo VEHICLE
  // Como no proporcionaste ninguna, se deja como `unknown` por ahora.
  [key: string]: unknown;
}

export interface Property {
  id: string;
  fkIdUSer: string;
  capacity: number;
  description: string;
  type: "DWELLING" | "VEHICLE";
  details?: Dwelling | Vehicle | null;
}

export type PropertyArray = Property[];

interface PropertiesData {
  properties: PropertyArray;
  limit: number;
  page: number;
  totalPages: number;
}

export async function getAllProductos(params: ISearchParams) {
  return await axiosInstance.get<ApiSuccessResponse<PropertiesData>>(`properties`, {
    params: {
      page: params.page,
      limit: params.limit,
      search: params.search ? params.search : undefined,
    },
  });
}
