import { z } from 'zod';

const passwordSchema = z.object({
  password: z.string().min(8, {message: "La contraseña debe tener un minimo de 8 caracteres"}).max(255).regex( new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"), {message: "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial"}),
  passwordConfirmation: z.string().min(8, {message: "La contraseña debe tener un minimo de 8 caracteres"}).max(255),

}).refine(data => data.password === data.passwordConfirmation, {
  message: "Las contraseñas no coinciden",

})

export const signUpSchema = z.object({
  firstName: z.string().min(1, {message: "El nombre es requerido"}).max(255, {message: "El nombre es muy largo"}),
  lastName: z.string().min(1, {message: "El apellido es requerido"}).max(255, {message: "El apellido es muy largo"}),
  email: z.string().email({message: "El email no es válido"}),
  birthdate: z.date({message:"Ingresa una fecha valida"}).max(new Date(),{message: "La fecha de nacimiento no puede ser mayor a la fecha actual"}),

}).and(passwordSchema)
