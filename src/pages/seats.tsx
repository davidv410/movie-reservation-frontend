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

    const { mutate } = useCreateReservation(showtimeId)

    const { data, isLoading, error } = useSeats(showtimeId)

    const { data: movie } = useMovie(movieId)

    const addSeats = (seat: seatType) => {
        setSelectedSeats(prev => prev.some(s => s.id === seat.id) ? prev.filter(s => s.id !== seat.id) : [...prev, seat])
    }

    const confirmSeatReservation = () => {
        if(selectedSeats.length === 0){ return console.log("no seats selected") }
        selectedSeats.forEach(seat => {
            mutate({ showtimeId, seatId: seat.id }, {
                onSuccess: (data) => {
                    console.log('Reservation created:', data)
                },
                onError: (err) => {
                    console.log('Failed:', err)
                }
            })
        })
        console.log('seat reservation created')
    }

    if(isLoading) return <p>Loading...</p>
    if(error) return <p>{error.message}</p>

    return (
        <>
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
            {selectedSeats.map(seat => (
                <div className="border">
                    <p>{seat.id}</p>
                    <p>{seat.row}-{seat.number}</p>
                </div>
            ))}
            <button onClick={confirmSeatReservation} className="cursor-pointer">confirm bookings</button>
        </>
    )
}