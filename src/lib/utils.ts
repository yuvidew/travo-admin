import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// const base_url = "http://localhost:2000/v1"
const base_url = "http://192.168.1.4:2000/v1"


export const endPoints = {
  signup : `${base_url}/auth/sign-up`,
  signin : `${base_url}/auth/sign-in`,
  verify_otp : `${base_url}/auth/verify-otp`,
  verify_email : `${base_url}/auth/verify-email`,
  verify_forget_pass_otp : `${base_url}/auth/verify-forget-password-opt`,
  reset_password : `${base_url}/auth/reset-new-password`,
  google_auth : `${base_url}/auth/google-login`,

  // start to trips end points
  create_trip : `${base_url}/trip/create-trip`,
  get_trip : `${base_url}/trip/get-trips`,
  get_trip_by_id : `${base_url}/trip/get-trip-by-id`,
  update_trip_publish_by_id : `${base_url}/trip/update-trip-publish`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
