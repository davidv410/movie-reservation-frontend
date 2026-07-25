import { useMovies } from "@/features/movies/hooks/useMovies.ts";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

export const Movies = () => {
    const navigate = useNavigate()

    const [page, setPage] = useState<string>('1')
    const [limit, setLimit] = useState<string>('5')

    const { data, isLoading, error } = useMovies(page, limit)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return(
        <>
            <section>
            <div className="flex flex-wrap w-full justify-center">
            {
                (data?.movies ?? []).map(movie => (
                    <div key={movie.id} className="
                    m-10
                    p-2
                    border
                    w-80
                    ">
                        <p>{movie.title}</p>
                        <p>{movie.description} desc</p>
                        <div className="flex justify-between mt-3 mb-3 flex-col">
                            <p>{movie.durationMinutes} min</p>
                            <button className="cursor-pointer border" onClick={() => navigate(`/movies/${movie.id}`)}>WATCH</button>
                        </div>
                    </div>
                ))
            }

            </div>
            <div className="w-full flex justify-center">
                {(data?.pages ?? []).map(page => (
                    <ul>
                        <li className="m-3 cursor-pointer w-2" onClick={() => setPage(String(page))}>{page}</li>
                    </ul>
                ))}
            </div>
            </section>
        </>
    )
}