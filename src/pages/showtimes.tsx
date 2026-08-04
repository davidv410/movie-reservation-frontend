import {useShowtimes} from "@/features/showtimes/hooks/useShowtimes.ts";
import {useNavigate} from "react-router-dom";
import {useRemoveShowtime} from "@/features/showtimes/hooks/useRemoveShowtime.ts";
import { useAuth } from "@/features/auth/context.tsx";
import { Header } from "@/components/Header";
import { formatDateTime } from "@/lib/formatDate";

export const Showtimes = () => {
    const navigate = useNavigate()

    const { user } = useAuth()

    const { data, isLoading, error } = useShowtimes()

    const { mutate, isPending } = useRemoveShowtime()

    if(isLoading) return <p>Loading</p>
    if(error) return <p>{error.message}</p>

    return(
        <>
        <Header/>
            {
               (data ?? []).map(item => (
                   <div key={item.showtimes.id} className="border m-10 flex flex-col items-start">
                       <p>{item.showtimes.hall}</p>
                       <p>{item.showtimes.totalSeats} seats</p>
                       <p>{formatDateTime(item.showtimes.startsAt)}</p>
                       { item.movies && <p>Playing: {item.movies.title}</p> }

                       <button onClick={() => navigate(`/showtimes/${item.showtimes.id}`)} className="border cursor-pointer">CHECK SEATS</button>

                       { user?.role === 'admin' &&
                           <>
                               <button className="border cursor-pointer mt-2 mb-2 text-red-500" onClick={() => mutate(item.showtimes.id)} disabled={isPending}>REMOVE SHOWTIME</button>
                           </>
                       }
                   </div>
               ))
            }
        </>
    )
}