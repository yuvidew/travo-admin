import { useQuery } from "@tanstack/react-query"
import { onGetBookedTrips } from "../api-function";

export const useUserBookedTrips = () => {
    return useQuery({
        queryKey : ["get-booked-trips"],
        queryFn : async() => {
            const res = await onGetBookedTrips();
            return res;
        },
    })
}