import {useReservation} from "@/features/reservations/hooks/useReservation.ts";
import {useCancelReservation} from "@/features/reservations/hooks/useCancelReservation.ts";
import {useAuth} from "@/features/auth/context.tsx";
import { Header } from "@/components/Header";

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
                        <p>{item.seats.row} - {item.seats.number}</p>
                        <p>{item.seats.price} KM</p>
                        { item.reservations.status === 'cancelled' ?
                        <p className="text-gray-500">reservation has been cancelled</p>
                        :
                        <button className="cursor-pointer text-red-500" onClick={() => mutate(item.reservations.id)}>CANCEL RESERVATION</button>
                        }
                    </div>
                ))
            }
        </>
    )
}