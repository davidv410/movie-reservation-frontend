import { useAuth } from "@/features/auth/context";
import {CreateMovieForm} from "@/features/movies/components/CreateMovieForm.tsx";
import {useState} from "react";
import {CreateShowtimeForm} from "@/features/showtimes/components/CreateShowtimeForm.tsx"
import { Header } from "@/components/Header";

export const Admin = () => {
    const { user } = useAuth()

    const [movieForm, setMovieForm] = useState(false)
    const [showtimeForm, setShowtimeForm] = useState(false)

    const handleMovieForm = () => {
        setMovieForm(!movieForm)
    }

    const handleShowtimeForm = () => {
        setShowtimeForm(!showtimeForm)
    }

    return(
        <>
            <Header/>

            { user?.role === "admin" &&
                <>
                    <button className={`border cursor-pointer ${movieForm ? 'text-gray-400' : ''}`} onClick={() => handleMovieForm()}>Add movies</button><br></br>
                    <button className={`border cursor-pointer ${showtimeForm ? 'text-gray-400' : ''}`} onClick={() => handleShowtimeForm()}>Create showtimes</button>
                    { movieForm &&
                        <CreateMovieForm/>
                    }
                    { showtimeForm &&
                        <CreateShowtimeForm/>
                    }
                </>
            }
        </>
    )
}