import type {Movie} from '@/features/movies/types.ts'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type EditMovieFormData, editMovieSchema} from "@/features/movies/schema.ts";
import {useMutation} from "@tanstack/react-query";
import {updateMovie} from "@/features/movies/api.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";

export const useEditMovie = (movie: Movie, genreIds: string[]) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EditMovieFormData>({
        resolver: zodResolver(editMovieSchema),
        defaultValues: {
            title: movie.title,
            description: movie.description ?? '',
            durationMinutes: movie.durationMinutes,
            genreIds: genreIds ?? []
        }
    })

    useEffect(() => {
        reset({
            title: movie.title,
            description: movie.description ?? '',
            durationMinutes: movie.durationMinutes,
            genreIds: genreIds ?? []
        })
    }, [movie, genreIds])

    const queryClient = useQueryClient();
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const { mutate } = useMutation({
        mutationFn: updateMovie,
        onSuccess: () => {
            setSuccessMessage("movie updated")
            queryClient.invalidateQueries({ queryKey: ['movie', movie.id] });
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const submitForm = (movieData: EditMovieFormData) => {
        try{
            console.log(movieData)
            mutate({ id: movie.id, movieData })
        }catch(err){
            console.log(err)
        }
    }

    return { register, handleSubmit, submitForm, errors, isSubmitting, successMessage }
}