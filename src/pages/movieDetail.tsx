import {useShowtime} from "@/features/showtimes/hooks/useShowtime.ts";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/features/auth/context.tsx";
import {useRemoveMovie} from "@/features/movies/hooks/useRemoveMovie.ts";
import {useMovie} from "@/features/movies/hooks/useMovie.ts";
import {EditMovieForm} from "@/features/movies/components/EditMovieForm.tsx";
import {useState} from "react";
import {useShowtimeReport} from "@/features/movies/hooks/useShowtimeReport.ts";

export const MovieDetail = () => {
    const {id = ''} = useParams()
    const navigate = useNavigate();

    const {user} = useAuth()
    const {mutate, isPending} = useRemoveMovie();

    const {data: movieData, isLoading: movieLoading, error: movieError} = useMovie(id)
    const {data: showtimeReport, isLoading: showtimeLoading, error: showtimeError} = useShowtimeReport(id, user?.role === 'admin')
    const {data, isLoading, error} = useShowtime(id)

    const [form, setForm] = useState<boolean>(false)

    const toggleForm = () => {
        setForm(!form);
    }

    if (!movieData) return <p>Movie not found</p>
    if (isLoading || movieLoading) return <p>Loading...</p>
    if (error || movieError) return <p>Error...</p>

    return (
        <>
            <h1>Title: {movieData[0].movies.title}</h1>
            <h1>Description: {movieData[0].movies.description}</h1>
            <h1>Duration: {movieData[0].movies.durationMinutes}</h1>

            {data ?
                    <div className="border" key={data.id}>
                        <p>{data.hall}</p>
                        <p>Starts at {data.startsAt}</p>
                        <p>total seats: {data.totalSeats}</p>
                        <button onClick={() => navigate(`/showtimes/${data.id}`)}>CHECK SEATS</button>
                    </div>
                : 'No showtimes available'
            }

            {user?.role === "admin" &&
                <div className="mt-5">
                    <button className="cursor-pointer border" onClick={() => toggleForm()}>EDIT MOVIE</button>
                    <br/>
                    <button className="cursor-pointer border text-red-500 mt-5 mb-5" onClick={() => mutate(id)} disabled={isPending}>
                        REMOVE MOVIE
                    </button>
                    <br/>

                    {form &&
                        <EditMovieForm movie={movieData[0].movies}/>
                    }

                </div>
            }

            { user && user.role === 'admin' ?
            <div className="mt-10 mb-10">
            <h1>SHOWTIME REPORT</h1>


            {showtimeLoading ? (
                <p>Loading report...</p>
            ) : showtimeError ? (
                <p>Failed to load report.</p>
            ) : showtimeReport && showtimeReport.length > 0 ? (
                <div>
                    {showtimeReport.map(report => (
                        <div key={report.showtimeId} className="border m-2">
                            <p>{report.hall}</p>
                            <p>{report.revenue} KM</p>
                            <p>Total seats: {report.totalSeats}</p>
                            <p>Available seats: {report.seatsAvailable}</p>
                            <p>Taken seats: {report.seatsTaken}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reports available.</p>
            )}

            </div> : null
            }
        </>
    )
}