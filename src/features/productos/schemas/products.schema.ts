import z from "zod";

export const basePropertySchema = z.object({
  description: z.string().min(1, "La descripción es obligatoria"),
  capacity: z.number().min(1, "Debe ser mayor a 0").optional(),
  // fkIdUser: z.string().uuid(),
  type: z.enum(["DWELLING", "VEHICLE"]).nullable(),
});

export const ENUM_TYPE_PROPERTIES_VALUES = {
  DWELLING: "DWELLING",
  VEHICLE: "VEHICLE",
} as const;
export type TypeProperties =
  (typeof ENUM_TYPE_PROPERTIES_VALUES)[keyof typeof ENUM_TYPE_PROPERTIES_VALUES];
// Schema para propiedades tipo Dwelling

export const dwellingSchema = z.object({
  city: z.string().min(3, { message: "El nombre de la ciudad es necesaria" }),
  country: z.string().min(3, { message: "El nombre del pais es necesario" }),
  address: z
    .string()
    .min(25, { message: "Es necesario que introduzcas un valor con mas de 25 caracteres" }),
  latitude: z.string().regex(/^-?\d+(\.\d+)?$/, "Debe ser un número válido"),
  longitude: z.string().regex(/^-?\d+(\.\d+)?$/, "Debe ser un número válido"),
});

export const vehicleSchema = z.object({
  description: z.string().min(25, { message: "La descripcion deber tener al menos 25 caracteres" }),
  brand: z.string().min(1, { message: "El campo es obligatorio" }),
  model: z.string().min(1, { message: "El campo es obligatorio" }),
  type: z.enum(["MECHANICAL", "ELECTRIC"], { message: "El campo es obligatorio" }),
});
export const dwellingFormSchema = basePropertySchema.extend({
  type: z.literal("DWELLING"),
  dwelling: dwellingSchema,
});

// Schema para propiedades tipo Vehicle
export const vehicleFormSchema = basePropertySchema.extend({
  type: z.literal("VEHICLE"),
  vehicle: vehicleSchema,
});

export const propertySchema = z.discriminatedUnion("type", [dwellingFormSchema, vehicleSchema]);
