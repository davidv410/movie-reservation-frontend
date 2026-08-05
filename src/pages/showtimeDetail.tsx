import { useShowtime } from "@/features/showtimes/hooks/useShowtime.ts";
import { useParams } from "react-router-dom";
import { Seats } from "@/pages/seats.tsx";
import { Header } from "@/components/Header";

export const ShowtimeDetail = () => {
    const { id = '' } = useParams()

    const { data, isLoading, error } = useShowtime(id)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    if (!id) return <p>Movie not found</p>

    return (
        <>
            <Header/>
            {data && (
                <div>
                    <p>{data.id}</p>
                </div>
            )}

            <section>
                <Seats showtimeId={id}/>
            </section>
        </>
    )
}