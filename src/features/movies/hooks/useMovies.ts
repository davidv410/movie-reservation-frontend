import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from "@/features/movies/api.ts";

export const useMovies = (page?: string, limit?: string, search?: string, genre?: string[]) => {
    return useQuery({
        queryKey: ['movies', page, limit, search, genre],
        queryFn: () => fetchMovies(page, limit, search, genre)
    })
}