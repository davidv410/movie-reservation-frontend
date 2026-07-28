import { useMovies } from "@/features/movies/hooks/useMovies.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useState} from "react";

export const Movies = () => {
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const page = searchParams.get('page') ?? '1'
    const limit = searchParams.get('limit') ?? '5'
    const search = searchParams.get('search') ?? ''

    const [searchInput, setSearchInput] = useState<string>('')

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }

    const [limitSelect, setLimitSelect] = useState<string>('5')

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLimitSelect(e.target.value)
    }

    const { data, isLoading, error } = useMovies(page, limit, search)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return(
        <>
            <section>
                <div>
                    <input className="border" placeholder="search..." onChange={handleInput}></input>
                    <button className="border cursor-pointer" onClick={() => setSearchParams({ page: '1', limit: limitSelect, search: searchInput })}>POVECALO :D</button>
                    <select className="border w-10 cursor-pointer ml-4" value={limitSelect} onChange={handleSelect}>
                        <option disabled={true}>Change limit</option>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                    </select>
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
                {(data?.pages ?? []).map(p => (
                    <ul>
                        <li className="m-3 cursor-pointer w-2" onClick={() => setSearchParams({ page: String(p), limit, search })}>{p}</li>
                    </ul>
                ))}
            </div>
            </section>
        </>
    )
}