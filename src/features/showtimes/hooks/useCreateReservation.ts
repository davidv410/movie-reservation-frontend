import {useMutation} from "@tanstack/react-query";
import {createReservation} from "@/features/showtimes/api.ts";
import {useQueryClient} from "@tanstack/react-query";

export const useCreateReservation = (showtimeId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createReservation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['seats', showtimeId] })
            queryClient.invalidateQueries({ queryKey: ['reservations'] })
        }
    })
}