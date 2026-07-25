import {useCreateShowtime} from "@/features/showtimes/hooks/useCreateShowtime.ts";
import {useMovies} from "@/features/movies/hooks/useMovies.ts";

export const CreateShowtimeForm = () => {
    const { register, handleSubmit, submitForm, errors, isSubmitting, serverError, successMessage } = useCreateShowtime()

    const { data, isLoading, error } = useMovies()

    return(
        <>
            <form onSubmit={handleSubmit(submitForm)} className="mt-20">

                {isLoading && <p>Loading movies...</p>}
                {error && <p className="text-red-500">Failed to load movies</p>}
                <select {...register('movieId')} className="border">
                    <option value="">--</option>
                    {
                        (data?.movies ?? []).map(movie => (
                            <option key={movie.id} value={movie.id}>{movie.title}</option>
                        ))
                    }
                </select><br/>
                {errors.movieId && <p className="text-red-500">{errors.movieId.message}</p>}

                <input {...register('startsAt')} className="border" placeholder="starts at" type="datetime-local"></input><br/>
                {errors.startsAt && <p className="text-red-500">{errors.startsAt.message}</p>}

                <input {...register('endsAt')} className="border" placeholder="ends at" type="datetime-local"></input><br/>
                {errors.endsAt && <p className="text-red-500">{errors.endsAt.message}</p>}

                <select {...register('hall')} className="border">
                    <option disabled={true} value="">--</option>
                    <option value="HALL A">HALL A</option>
                    <option value="HALL B">HALL B</option>
                    <option value="HALL C">HALL C</option>
                </select><br/>
                {errors.hall && <p className="text-red-500">{errors.hall.message}</p>}

                <input {...register('totalSeats', { valueAsNumber: true })} className="border" placeholder="total seats"></input><br/>
                {errors.totalSeats && <p className="text-red-500">{errors.totalSeats.message}</p>}

                {serverError && <p className="text-red-500">{serverError}</p>}
                {successMessage &&  <p className="text-green-500">{successMessage}</p>}

                <button className="border cursor-pointer" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'ADDING SHOWTIME...' : 'ADD SHOWTIME'}
                </button>
            </form>
        </>
    )
}