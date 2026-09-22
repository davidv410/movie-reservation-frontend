import {useSeats} from "@/features/showtimes/hooks/useSeats.ts";
import type {SeatsProps} from "@/features/showtimes/types.ts";
import {useState} from "react";
import {useCreateReservation} from "@/features/showtimes/hooks/useCreateReservation.ts";
import { useMovie } from "@/features/movies/hooks/useMovie";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { CheckoutForm } from "@/features/reservations/components/CheckoutForm";


export const Seats = ({ showtimeId, movieId }: SeatsProps) => {

    type seatType = {
        id: string;
        row: string;
        number: number;
    }

    const [selectedSeats, setSelectedSeats] = useState<seatType[]>([])

    const [seatsNotAvailable, setSeatsNotAvailable] = useState<boolean>(false)
    const [submitting, setSubmitting] = useState(false)

    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const { mutateAsync } = useCreateReservation(showtimeId)

    const { data, isLoading, error } = useSeats(showtimeId)

    const { data: movie } = useMovie(movieId)

    const addSeats = (seat: seatType) => {
        setSelectedSeats(prev => prev.some(s => s.id === seat.id) ? prev.filter(s => s.id !== seat.id) : [...prev, seat])
        setSeatsNotAvailable(false)
    }

    const confirmSeatReservation = async () => {
        if(selectedSeats.length === 0){ return console.log("no seats selected") }
        setSubmitting(true)
        try {
          const result = await mutateAsync({
            showtimeId,
            seatIds: selectedSeats.map((s) => s.id),
          });
          setClientSecret(result.clientSecret);
        } catch (err) {
          setSeatsNotAvailable(true)
        } finally {
          setSubmitting(false)
          setSelectedSeats([])
        }
    }    

    if(isLoading) return <p>Loading...</p>
    if(error) return <p>{error.message}</p>

    return (
      <>
      {
        selectedSeats.length > 0 ? 
        (<div>
        {selectedSeats.map((seat) => (
          <div className="border">
            <p>
              {seat.row}-{seat.number}
            </p>
          </div>
        ))}
        <button
          onClick={confirmSeatReservation}
          className="cursor-pointer border-2 bg-amber-300"
          disabled={submitting}
        >
          confirm bookings
        </button> 
        </div>)
      : 
      null}

        <div>
        {seatsNotAvailable ?? (
          <div className="text-red-500 text-sm mt-2">
            <p>Seat/Seats not available</p>
          </div>
        )}
        </div>

        {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
            </Elements>
        )}

        <section className="">
                <div>
                    {movie &&
                        <p>{movie[0].movies.title}</p>
                    }
                </div>
      
                <div className="flex flex-wrap">
                {(data ?? []).map(seat => (
                    <div key={seat.id} className={`m-2 ${selectedSeats.some(s => s.id === seat.id) ? 'border-2 text-amber-400' : ''}`}>
                        <p>{seat.row}</p>
                        <p>{seat.number}</p>
                        <p>{seat.price}</p>
                        {seat.isAvailable ?
                            <>
                            <p>available</p>
                            <button className="cursor-pointer border" onClick={() => addSeats(seat)}>BOOK</button>
                                {/*ili addSeats({ id: seat.id, row: seat.row, number: seat.number })*/}
                            </>
                            :
                            <p className="text-gray-600">taken</p>
                        }

                    </div>
                ))}
                </div>
            </section>
      </>
    );
}