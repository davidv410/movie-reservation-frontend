import {useReservation} from "@/features/reservations/hooks/useReservation.ts";
import {useCancelReservation} from "@/features/reservations/hooks/useCancelReservation.ts";
import {useAuth} from "@/features/auth/context.tsx";
import { Header } from "@/components/Header";
import { formatDateTime } from "@/lib/formatDate";

export const Reservations = () => {

    const { data, isLoading, error } = useReservation();

    const { user } = useAuth()

    const { mutate } = useCancelReservation()

    if(isLoading) return <p>Loading...</p>;
    if(error) return <p>{error.message}</p>;

    return(
        <>
        <Header/>

            <p>{ user?.role === 'admin' ? "ALL RESERVATIONS" : "YOUR RESERVATIONS" }</p>

            {
                (data ?? []).map(item => (
                    <div className="border">
                        <p>Reservation for: {item.userName} ({item.userEmail})</p>
                        <p>{formatDateTime(item.startTime)}</p>
                        <p>{item.seatRow} - {item.seatNumber}</p>
                        <p>{item.seatPrice} KM</p>
                        { item.reservationStatus === 'cancelled' ?
                        <p className="text-gray-500">reservation has been cancelled</p>
                        :
                        <button className="cursor-pointer text-red-500" onClick={() => mutate(item.reservationId)}>CANCEL RESERVATION</button>
                        }
                    </div>
                ))
            }
        </>
    )
}