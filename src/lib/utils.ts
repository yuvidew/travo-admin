import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const base_url = "http://localhost:2000/v1"

export const endPoints = {
  signup : `${base_url}/auth/sign-up`,
  signin : `${base_url}/auth/sign-in`,
  verify_otp : `${base_url}/auth/verify-otp`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
