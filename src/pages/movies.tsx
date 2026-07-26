import { useMovies } from "@/features/movies/hooks/useMovies.ts";
import { useNavigate } from "react-router-dom";
import React, {useState} from "react";

export const Movies = () => {
    const navigate = useNavigate()

    const [page, setPage] = useState<string>('1')
    const [limit, setLimit] = useState<string>('5')
    const [searchPlaceholder, setSearchPlaceholder] = useState<string | undefined>('')
    const [search, setSearch] = useState<string | undefined>('')

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPlaceholder(e.target.value)
    }

    const { data, isLoading, error } = useMovies(page, limit, search)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return(
        <>
            <section>
                <div>
                    <input className="border" placeholder="search..." onChange={handleInput}></input>
                    <button className="border cursor-pointer" onClick={() => setSearch(searchPlaceholder)}>POVECALO :D</button>
                </div>

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