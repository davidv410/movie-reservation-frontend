import { api } from "@/lib/axios.ts";
import type {ReservationsInfo} from "@/features/reservations/types.ts";


export const fetchReservations = async () => {
    const { data } = await api.get<{ reservations: ReservationsInfo[] }>('/reservations');
    return data.reservations ?? [];
}

export const cancelReservation = async (reservationId: string) => {
    const { data } = await api.delete(`reservations/${reservationId}`);
    return data
}