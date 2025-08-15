import { endPoints } from '@/lib/utils';
import { Trip, TripResult } from '@/types/type';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type DataType = {
    country: string;
    duration: number;
    group_type: string;
    travel_style: string;
    interests: string;
    budget_estimate: string;
}

const api = axios.create();

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("travo-token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

/**
 * Custom hook to create a trip.
 *
 * @returns {{
 *   loading: boolean;
 *   onCreateTrip: (data: DataType) => Promise<void>;
 * }} - An object containing the loading state and a function to create a trip.
 */

export const useCreateTrip = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    /**
     * Creates a new trip in the backend after generating AI trip details.
     * 
     * @param {DataType} Formdata - The trip creation payload.
     * @param {string} Formdata.country - The country where the trip will take place.
     * @param {number} Formdata.duration - The number of days for the trip.
     * @param {string} Formdata.group_type - The type of group (e.g., Solo, Friends).
     * @param {string} Formdata.travel_style - The travel style (e.g., Adventure, Luxury).
     * @param {string} Formdata.interests - The main interests for the trip (e.g., Beaches, Museums).
     * @param {string} Formdata.budget_estimate - The budget category for the trip (e.g., Budget, Luxury).
     */

    const onCreateTrip = async (Formdata: DataType) => {
        setLoading(true)
        try {
            const userId = JSON.parse(localStorage.getItem("travo-user") as string)
            const ai_response = await axios.post("/api/generate-trip", Formdata);

            console.log("ai generated result" , ai_response.data.result ,  typeof ai_response.data.result);

            const { data, status } = await api.post(endPoints.create_trip,
                {
                    images: ai_response.data.images.join(","),
                    result: ai_response.data.result,
                    country: Formdata.country,
                    group_type: Formdata.group_type,
                    travel_style: Formdata.travel_style,
                    interest: Formdata.interests,
                    budget_estimate: Formdata.budget_estimate,
                    userId: userId.id,
                    
                },
            )

            if (status === 201) {
                toast.success("Trip created successfully!");
                router.push(`/trips/${data.data.id}`);
            }

        } catch (error) {
            console.log("Error to create trip", error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    toast.error(error.response?.data.message);
                } else if (error.response?.status === 401) {
                    toast.error(error.response?.data.message);
                }
            } else {
                toast.error("An unexpected error occurred.", {
                    duration: 4000,
                    position: "top-center",
                });
            }
        } finally {
            setLoading(false)
        }
    }

    return { loading, onCreateTrip }
}

/**
 * Custom hook to fetch trips for a user.
 *
 * @returns {{
 *   loading: boolean;
 *   trips: Trip[];
 *   onGetTrip: (id: string) => Promise<void>;
 * }} - An object containing the loading state, list of trips, and a function to fetch trips.
 */
export const useGetTripApi = () => {
    const [loading, setLoading] = useState(false);
    const [trips, setTrips] = useState<Trip[]>([]);

    /**
     * Fetches all trips for a given user from the backend.
     * 
     * @param {string} id - The user ID whose trips are to be fetched.
     */

    const onGetTrip = async (id: string) => {
        setLoading(true);
        try {
            const { data, status } = await api.get(`${endPoints.get_trip}/${id}`);
            if (status === 200) {
                toast.success("Trip fetched successfully!");
                setTrips(data);
            }
        } catch (error) {
            console.log("Error to fetch trips", error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    toast.error(error.response?.data.message);
                } else if (error.response?.status === 409) {
                    toast.error(error.response?.data.message);
                }
            } else {
                toast.error("An unexpected error occurred.", {
                    duration: 4000,
                    position: "top-center",
                });
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, trips, onGetTrip }
}

export const useGetTripById = () => {
    const [loading, setLoading] = useState(false);
    const [trip, setTrip] = useState<Trip | null>(null);
    const [tripResult, setTripResult] = useState<TripResult | null>(null);

    /**
     * Fetches a trip by its ID.
     * 
     * @param {string} id - The ID of the trip to fetch.
     */
    const onGetTripById = async (id: string) => {
        setLoading(true);
        try {
            const { data, status } = await api.get(`${endPoints.get_trip_by_id}/${id}`);
            if (status === 200) {
                setTrip(data.trip);
                const cleaned = data.trip.result
                    .replace(/^```json\s*/, "")
                    .replace(/```$/, "")
                    .trim();

                const parsedData = JSON.parse(cleaned); // only once
                setTripResult(parsedData);

            }
        } catch (error) {
            console.log("Error to fetch trip by ID", error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    toast.error(error.response?.data.message);
                } else if (error.response?.status === 400) {
                    toast.error(error.response?.data.message);
                } else {
                    toast.error("An unexpected error occurred.");
                }
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, trip, onGetTripById, tripResult };
}
