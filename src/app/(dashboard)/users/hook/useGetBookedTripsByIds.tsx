import { useMutation } from "@tanstack/react-query"
import { onGetBookedTripsByIds } from "../api-function"


export const useGetBookedTripsByIds = () => {
    return useMutation({
        mutationFn : onGetBookedTripsByIds
    })
}
