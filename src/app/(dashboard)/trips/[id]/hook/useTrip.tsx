import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onToggleTripPublish } from "../../api-function";
import { toast } from "sonner";

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