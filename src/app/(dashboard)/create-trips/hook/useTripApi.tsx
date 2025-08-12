import { endPoints } from '@/lib/utils';
import axios from 'axios';
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
        config.headers["Content-Type"] = "application/json"; // ✅ fixed typo
    }
    return config;
});

export const useCreateTrip = () => {
    const [loading, setLoading] = useState(false);

    const onCreateTrip = async (data: DataType) => {
        setLoading(true)
        try {
            const userId = JSON.parse(localStorage.getItem("travo-user") as string)
            const ai_response = await axios.post("/api/generate-trip", data);

            const response = await api.post(endPoints.create_trip, 
                {
                    images: ai_response.data.images.join(","),
                    result: ai_response.data.result,
                    country: data.country,
                    group_type: data.group_type,
                    travel_style: data.travel_style,
                    interest: data.interests,
                    budget_estimate: data.budget_estimate,
                    userId: userId.id
                },
            )

            if (response.status === 201) {
                toast.success("Trip created successfully!");
                console.log("the response", response.data);
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
