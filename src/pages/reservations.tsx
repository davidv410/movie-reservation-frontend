import {useReservation} from "@/features/reservations/hooks/useReservation.ts";
import {useCancelReservation} from "@/features/reservations/hooks/useCancelReservation.ts";
import {useAuth} from "@/features/auth/context.tsx";
import { Header } from "@/components/Header";
import { formatDateTime } from "@/lib/formatDate";
import { useState } from "react";

export const Reservations = () => {

    const { data, isLoading, error } = useReservation();

    const { user } = useAuth()

    const { mutate } = useCancelReservation()

    const [openConfirmCancel, setOpenConfirmCancel] = useState<string | null>(null)

    const cancelReservationsFunc = () => {
        if(!openConfirmCancel) return
        mutate(openConfirmCancel)
        setOpenConfirmCancel(null)
    }

    if(isLoading) return <p>Loading...</p>;
    if(error) return <p>{error.message}</p>;

    return (
      <>
        <Header />

        <p>
          {user?.role === "admin" ? "ALL RESERVATIONS" : "YOUR RESERVATIONS"}
        </p>

        {(data ?? []).map((item) => (
          <div className="border" key={item.reservationId}>
            <p>
              Reservation for: {item.userName} ({item.userEmail})
            </p>
            <p>{formatDateTime(item.startTime)}</p>
            <p>
              {item.seatRow} - {item.seatNumber}
            </p>
            <p>{item.seatPrice} KM</p>
            {
              item.reservationStatus === "cancelled" ? (
                <p className="text-gray-500">reservation has been cancelled</p>
              ) : (
                <button
                    className="cursor-pointer text-red-500"
                    onClick={() => setOpenConfirmCancel(item.reservationId)}
                >
                  CANCEL RESERVATION
                </button>
              )
            }
          </div>
        ))}
        {
        openConfirmCancel &&  
            <div className="
            w-80
            h-fit
            p-5 
            border-2 
            flex 
            flex-col 
            align-middle 
            justify-between
            fixed inset-0 m-auto
            bg-amber-300
            ">
            <p className="cursor-pointer" onClick={() => setOpenConfirmCancel(null)}>x</p>
            <p className="text-center">
                If you cancel this reservation, all the seats you booked at the same
                time will be canceled aswell
            </p>

            <button className="cursor-pointer border-2 bg-red-400" onClick={cancelReservationsFunc}>CANCEL ANYWAY</button>
            </div>
        }
      </>
    );
}