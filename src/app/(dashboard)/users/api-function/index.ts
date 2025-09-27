"use server";

import { endPoints } from "@/lib/utils";
import { Trip, TripList } from "@/types/type";
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

type ResponseType = {
    code : number,
    success : boolean,
    trips: TripList[]
}

export const onGetBookedTrips = async() => {
    try {
        const {data , status} = await api.get<ResponseType>(endPoints.book_trip);
        if(status === 200){
            return data.trips;
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

type OnGetBookedTripsByIdsResponseType = {
    code : number,
    success : boolean,
    trips: Trip[]
}

export const onGetBookedTripsByIds = async ( ids : {trip_id : number}[]) => 
    {
        console.log("the calling the api");
    try {
        
        const {data, status} = await api.post<OnGetBookedTripsByIdsResponseType>(endPoints.get_booked_trips_by_ids, { ids });

        if(status === 200){
            return data;
        }
    } catch (error) {
        console.error("Error fetching booked trips by ids", error);
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
