import { useQuery } from "@tanstack/react-query";
import { onGetTripById } from "../api-function";

export const useGetTripByIdQuery = (id: string , token : string) => {
    return useQuery({
        queryKey: ["get-trips-by-id", id],
        queryFn: () => onGetTripById(id , token),
        enabled: !!id && !!token, 
    });
};