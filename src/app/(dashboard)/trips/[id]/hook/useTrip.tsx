import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onToggleTripPublish } from "../../api-function";
import { toast } from "sonner";

/**
 * Hook to toggle the publish status of a trip.
 *
 * @param {number} id - The trip ID to toggle (passed to `mutate`).
 * @returns The React Query mutation object from `useMutation`.
 */
export const useUpdateTripPublish = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => onToggleTripPublish(id),
        mutationKey: ["update-publish-toggle"],
        onSuccess: (data : {
            code : number , 
            success : boolean,
            message : string
        }) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["get-trips-by-id"] });
        },
    });
};
