import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/features/auth/context.tsx";
import {useRemoveMovie} from "@/features/movies/hooks/useRemoveMovie.ts";
import {useMovie} from "@/features/movies/hooks/useMovie.ts";
import {EditMovieForm} from "@/features/movies/components/EditMovieForm.tsx";
import {useState} from "react";
import {useShowtimeReport} from "@/features/movies/hooks/useShowtimeReport.ts";
import { useShowtimes } from "@/features/showtimes/hooks/useShowtimes";

export const MovieDetail = () => {
    const {id = ''} = useParams()
    const navigate = useNavigate();

    const {user} = useAuth()
    const {mutate, isPending} = useRemoveMovie();

    const {data: movieData, isLoading: movieLoading, error: movieError} = useMovie(id)
    const {data: showtimeReport, isLoading: showtimeLoading, error: showtimeError} = useShowtimeReport(id, user?.role === 'admin')
    const {data, isLoading, error} = useShowtimes(id)

    const [form, setForm] = useState<boolean>(false)

    const toggleForm = () => {
        setForm(!form);
    }

    
    if (!movieData) return <p>Movie not found</p>
    if (isLoading || movieLoading) return <p>Loading...</p>
    if (error || movieError) return <p>Error...</p>
    
    const genreIds = movieData.map(row => row.movie_genres.genreId)

    return (
        <>

            <div>
                <h1>Title: {movieData[0].movies.title}</h1>
                <p>Description: {movieData[0].movies.description}</p>
                <p>Duration: {movieData[0].movies.durationMinutes}</p>
            </div>
            {
                data ? 
                    <div>
                        SHOWTIMES:
                        {data.map(item => (
                            <>
                                <p>{item.showtimes.hall}</p>
                                <p>Starts at:{item.showtimes.startsAt}</p>
                                <p>Seats: {item.showtimes.totalSeats}</p>
                                <button onClick={() => navigate(`/showtimes/${item.showtimes.id}`)}>CHECK SEATS</button>
                            </>
                        ))}
                    </div>
                : 'Showtimes not found'
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
                        <EditMovieForm movie={movieData[0].movies} genreIds={genreIds}/>
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