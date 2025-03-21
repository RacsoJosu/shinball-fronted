import { z } from "zod";

export const updateInfoUser = z.object({
    email: z.string().email({message: "El valor ingresado no es un email"}),
    fullName: z.string().min(1, {message: "El nombre es requerido"}).max(255, {message: "El nombre es muy largo"}),

})
