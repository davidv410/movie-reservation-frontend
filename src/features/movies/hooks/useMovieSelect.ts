import { useQuery } from '@tanstack/react-query';
import { fetchMovieSelect } from '../api';

export const useMovieSelect = () => {
        return useQuery({
        queryKey: ['movieSelect'],
        queryFn: () => fetchMovieSelect()
    })
}