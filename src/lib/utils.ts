import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const REGEX_ENUM = {
  ONLY_INTEGERS: /^[0-9]+$/,
  ONLY_NUMBERS: /^[0-9]+(\.[0-9]+)?$/,
  ONLY_LETTERS: /[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ\s]/g,
  ONLY_SPECIALS: /[^a-zA-Z0-9\s]/g,
} as const;
