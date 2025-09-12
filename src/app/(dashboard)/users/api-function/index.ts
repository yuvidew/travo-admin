"use server";

import { endPoints } from "@/lib/utils";
import { TripWithBooking } from "@/types/type";
import axios from "axios";
import { cookies } from "next/headers";
import { toast } from "sonner";

const api = axios.create();

api.interceptors.request.use(async (config) => {
    const cookieStore = await cookies(); 
    const token = await cookieStore.get("travo-token")?.value;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

export const onGetBookedTrips = async() => {
    try {
        const {data , status} = await api.get(endPoints.book_trip);
        if(status === 200){
            return data.trips as TripWithBooking[];
        }
    } catch (error) {
        console.error("Error fetching booked trips", error);
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                toast.error(error.response?.data.message);
            }   else if (error.response?.status === 400) {
                toast.error(error.response?.data.message);
            } else if (error.response?.status === 500) {
                toast.error(error.response?.data.message);
            }else {
                toast.error("An unexpected error occurred.");
            }   
        }
        return null;
    }   
}