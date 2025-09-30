import z from "zod";
import { dwellingSchema, vehicleSchema } from "../schemas/products.schema";

export interface ISearchParams {
  search: string | null;
  page: number | null;
  limit: number | null;
}

export type FormDwellingSchema = z.infer<typeof dwellingSchema>;
export type FormVehiclesSchema = z.infer<typeof vehicleSchema>;
