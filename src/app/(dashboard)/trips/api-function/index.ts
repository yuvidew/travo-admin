
"use server"

import { endPoints } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { Trip, TripResult } from '../../../../types/type';
import { cookies } from "next/headers";

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

/**
 * Fetch a trip by its ID.
 *
 * @param {string} id - The unique identifier of the trip.
 * @param {string} [token] - Optional authorization token for the request.
 * @returns {Promise<{ tripResult: Record<string, any>, trip: any | null }>} 
 * - An object containing the parsed trip result and the trip data,
 *   or empty result with null trip if the request fails.
 */

export const onGetTripById = async (id: string) => {

    try {
        const { data, status } = await api.get(`${endPoints.get_trip_by_id}/${id}`);
        if (status === 200) {
            let cleaned = data.trip.result?.trim();
            if (cleaned?.startsWith("```json")) {
                cleaned = cleaned.replace(/^```json\s*/, "").replace(/```$/, "").trim();
            }
            return { tripResult: JSON.parse(cleaned || "{}"), trip: data.trip };
        }
    } catch (error) {
        console.error("Error fetching trip by ID", error);
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                toast.error(error.response?.data.message);
            } else if (error.response?.status === 400) {
                toast.error(error.response?.data.message);
            } else if (error.response?.status === 500) {
                toast.error(error.response?.data.message);
            }else {
                toast.error("An unexpected error occurred.");
            }
        }

        return { tripResult: {}, trip: null };
    }
};

/**
 * Fetch all trips for a given user.
 *
 * @param {string} user_id - The unique identifier of the user whose trips are being fetched.
 * @param {string} [token] - Optional authorization token for the request.
 * @returns {Promise<{ trips?: any[], tripResult?: Record<string, any>, trip?: any | null }>} 
 * - An object containing the trips if successful,
 *   or default values if the request fails.
 */

export const onGetTrips = async (user_id: string, ) => {

    try {
        const { data, status } = await api.get(`${endPoints.get_trip}/${user_id}`);
        if (status === 200) {
            return {
                trips: data.trips as Trip[],
                trips_result : data.trips.result as TripResult[]
            }
        }
    } catch (error) {
        console.error("Error fetching trip by ID", error);
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                toast.error(error.response?.data.message);
            } else if (error.response?.status === 409) {
                toast.error(error.response?.data.message);
            }
            else if (error.response?.status === 500) {
                toast.error(error.response?.data.message);
            }else {
                toast.error("Something went wrong while fetching trips.");
            }
        }

        return {  trip: [] , trips_result : [] };
    }
}

/**
 * Toggle the publish status for a trip by ID.
 *
 * @param {number} id - The unique identifier of the trip to toggle.
 * @returns {Promise<any>} The API response data when successful.
 */
export const onToggleTripPublish = async(id : number) => {
    try {
        const {data , status} = await api.put(`${endPoints.update_trip_publish_by_id}/${String(id)}`);

        if(status === 200){
            return data
        }
        
    } catch (error) {
        console.error("Error update trip publish by ID", error);
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                toast.error(error.response?.data.message);
            } else if (error.response?.status === 409) {
                toast.error(error.response?.data.message);
            }
            else if (error.response?.status === 500) {
                toast.error(error.response?.data.message);
            }else {
                toast.error("Something went wrong while fetching trips.");
            }
        }

        throw error;
    }
}
