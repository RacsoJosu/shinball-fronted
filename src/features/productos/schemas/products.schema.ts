import z from "zod";

export const basePropertySchema = z.object({
  description: z.string().min(1, "La descripción es obligatoria"),
  capacity: z.number().min(1).optional(),
  // fkIdUser: z.string().uuid(),
  type: z.enum(["DWELLING", "VEHICLE"]),
});
