import type { Movie } from "@/features/movies/types.ts";
import { useEditMovie } from "@/features/movies/hooks/useEditMovie.ts";
import { useGenres } from "@/features/movies/hooks/useGenres.ts";

export const EditMovieForm = ({ movie, genreIds}: { movie: Movie; genreIds: string[]; }) => {
  const { register, handleSubmit, submitForm, isSubmitting, successMessage } =
    useEditMovie(movie, genreIds);

  const { data, isLoading, error } = useGenres();

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <input
          {...register("title")}
          className="border"
          placeholder="title"
        ></input>
        <br />

        <input
          {...register("description")}
          className="border"
          placeholder="description"
        ></input>
        <br />

        <input
          {...register("durationMinutes", { valueAsNumber: true })}
          className="border"
          placeholder="duration minutes"
        ></input>
        <br />

        {isLoading && <p>Loading genres...</p>}
        {error && <p>Failed to load genres</p>}
        {(data ?? []).map((genre) => (
          <>
            <label key={genre.id}>
              <input
                type="checkbox"
                value={genre.id}
                {...register("genreIds")}
              />
              {genre.name}
            </label>
            <br />
          </>
        ))}

        <input {...register('posterUrl')} type="File" /><br/>

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <button className="border" type="submit" disabled={isSubmitting}>
          APPLY EDITS
        </button>
      </form>
    </>
  );
};
