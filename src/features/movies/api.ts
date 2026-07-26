import { api } from '@/lib/axios';
import type {Report, Movie, Genre } from './types.ts';
import type {CreateMovieFormData, EditMovieFormData} from "@/features/movies/schema.ts";

export const fetchMovies = async (page?: string, limit?: string, search?: string) => {
    const { data } = await api.get<{ movies: Movie[], pages: number[] }>('/movies', { params: { page, limit, search } })
    return data
}

export const fetchMovie = async (id: string) => {
    const { data } = await api.get<{ movie: Movie } >(`/movies/${id}`)
    return data.movie
}

export const fetchGenres = async () => {
    const { data } = await api.get<Genre[]>('/genres')
    return data
}

export const createMovie = async (movie: CreateMovieFormData) => {
    const { data } = await api.post('/movies', movie)
    return data
}

export const removeMovie = async (id: string) => {
    const { data } = await api.delete(`/movies/${id}`)
    return data
}

export const updateMovie = async ({ id, movieData }: { id: string; movieData: EditMovieFormData }) => {
    const { data } = await api.patch(`/movies/${id}`, movieData)
    return data
}

export const fetchShowtimeReport = async (movieId: string) => {
    const { data } = await api.get<Report[]>(`/admin/reservations/${movieId}/report`)
    return data
}