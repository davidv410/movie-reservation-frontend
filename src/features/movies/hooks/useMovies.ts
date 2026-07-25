import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from "@/features/movies/api.ts";

export const useMovies = (page?: string, limit?: string) => {
    return useQuery({
        queryKey: ['movies', page, limit],
        queryFn: () => fetchMovies(page, limit)
    })
}