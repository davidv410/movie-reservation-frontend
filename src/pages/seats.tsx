import {useSeats} from "@/features/showtimes/hooks/useSeats.ts";
import type {SeatsProps} from "@/features/showtimes/types.ts";
import {useState} from "react";
import {useCreateReservation} from "@/features/showtimes/hooks/useCreateReservation.ts";
import { useMovie } from "@/features/movies/hooks/useMovie";

export const Seats = ({ showtimeId, movieId }: SeatsProps) => {

    type seatType = {
        id: string;
        row: string;
        number: number;
    }

    const [selectedSeats, setSelectedSeats] = useState<seatType[]>([])

    const [failedSeats, setFailedSeats] = useState<string | null>(null)
    const [successSeats, setSuccessSeats] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    const { mutateAsync } = useCreateReservation(showtimeId)

    const { data, isLoading, error } = useSeats(showtimeId)

    const { data: movie } = useMovie(movieId)

    const addSeats = (seat: seatType) => {
        setSelectedSeats(prev => prev.some(s => s.id === seat.id) ? prev.filter(s => s.id !== seat.id) : [...prev, seat])
        setFailedSeats(null)
        setSuccessSeats(null)
    }

    const confirmSeatReservation = async () => {
        if(selectedSeats.length === 0){ return console.log("no seats selected") }
        setSubmitting(true)
        try {
          await mutateAsync({
            showtimeId,
            seatIds: selectedSeats.map((s) => s.id),
          });
          setSuccessSeats('Booking successful')
        } catch (err) {
          setFailedSeats('Booking failed')
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
          className="cursor-pointer"
          disabled={submitting}
        >
          confirm bookings
        </button> 
        </div>): null}

        <div>
        {failedSeats && (
          <div className="text-red-500 text-sm mt-2">
            {failedSeats}
          </div>
        )}
        {successSeats && (
          <div className="text-green-400 text-sm mt-2">
            {successSeats}
          </div>
        )}
        </div>

        <section className="">
                <div>
                    {movie &&
                        <p>{movie[0].movies.title}</p>
                    }
                </div>
      
                <div className="flex flex-wrap">
                {(data ?? []).map(seat => (
                    <div key={seat.id} className="m-2">
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