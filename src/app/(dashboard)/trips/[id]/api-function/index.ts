// import { endPoints } from "@/lib/utils";
// import axios from "axios";
// import { toast } from "sonner";

// const api = axios.create();

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("travo-token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//         config.headers["Content-Type"] = "application/json";
//     }
//     return config;
// });

// export const onGetTripById = async (id: string) => {
//         try {
//             const { data, status } = await api.get(`${endPoints.get_trip_by_id}/${id}`);
//             if (status === 200) {
//                 // setTrip(data.trip);
//                 const cleaned = data.trip.result
//                     .replace(/^```json\s*/, "")
//                     .replace(/```$/, "")
//                     .trim();

//                 const parsedData = JSON.parse(cleaned); // only once
//                 // setTripResult(parsedData);

//                 return {
//                     tripResult : parsedData,
//                     trip : data.trip
//                 }

//             }
//         } catch (error) {
//             console.log("Error to fetch trip by ID", error);
//             if (axios.isAxiosError(error)) {
//                 if (error.response?.status === 404) {
//                     toast.error(error.response?.data.message);
//                 } else if (error.response?.status === 400) {
//                     toast.error(error.response?.data.message);
//                 } else {
//                     toast.error("An unexpected error occurred.");
//                 }
//             }

//             return { tripResult: {}, trip: null };
//         } 
//     }

import { endPoints } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

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
            toast.error(error.response?.data?.message ?? "An unexpected error occurred.");
        }
    }
};
