import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const REGEX_ENUM = {
  ONLY_NUMBERS: /[0-9]+(,|[0-9]+)+(\.[0-9]+)?$/,
  ONLY_LETTERS:
    /[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ<>/.,';:"[\]{}*&^%$#@?`~|=\-_+()]+([a-zA-ZÁÉÍÓÚÜÑáéíóúüñ<>/.,';:"[\]{}*&^%$#@?`~|=-_+()]+)?$/,
} as const;
