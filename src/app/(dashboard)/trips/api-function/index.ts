
import { endPoints } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { Trip, TripResult } from '../../../../types/type';

/**
 * Fetch a trip by its ID.
 *
 * @param {string} id - The unique identifier of the trip.
 * @param {string} [token] - Optional authorization token for the request.
 * @returns {Promise<{ tripResult: Record<string, any>, trip: any | null }>} 
 * - An object containing the parsed trip result and the trip data,
 *   or empty result with null trip if the request fails.
 */

export const onGetTripById = async (id: string, token?: string) => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
        const { data, status } = await axios.get(`${endPoints.get_trip_by_id}/${id}`, { headers });
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

export const onGetTrips = async (user_id: string, token?: string) => {
    console.log("🔍 Calling onGetTrips with:", user_id);
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
        const { data, status } = await axios.get(`${endPoints.get_trip}/${user_id}`, { headers });
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
