import type { Movie } from "@/features/movies/types.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type EditMovieFormDataInput,
  type EditMovieFormDataOutput,
  editMovieSchema,
} from "@/features/movies/schema.ts";
import { useMutation } from "@tanstack/react-query";
import { updateMovie } from "@/features/movies/api.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useEditMovie = (movie: Movie, genreIds: string[]) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditMovieFormDataInput, unknown, EditMovieFormDataOutput>({
    resolver: zodResolver(editMovieSchema),
    defaultValues: {
      title: movie.title,
      description: movie.description ?? "",
      durationMinutes: movie.durationMinutes,
      genreIds: genreIds ?? [],
    },
  });

  useEffect(() => {
    reset({
      title: movie.title,
      description: movie.description ?? "",
      durationMinutes: movie.durationMinutes,
      genreIds: genreIds ?? [],
    });
  }, [movie, genreIds]);

  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutate } = useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      setSuccessMessage("movie updated");
      queryClient.invalidateQueries({ queryKey: ["movie", movie.id] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const submitForm = (movieData: EditMovieFormDataOutput) => {
    try {
      const formData = new FormData();
      if (movieData.title) {
        formData.append("title", movieData.title);
      }
      if (movieData.description) {
        formData.append("description", movieData.description);
      }
      if (movieData.durationMinutes) {
        formData.append("durationMinutes", String(movieData.durationMinutes));
      }
      if (movieData.genreIds) {
        movieData.genreIds.forEach((id) => formData.append("genreIds", id));
      }
      if (movieData.posterUrl) {
        formData.append("posterUrl", movieData.posterUrl);
      }
      
      mutate({ id: movie.id, movieData: formData })
    } catch (err) {
      console.log(err);
    }
  };

  return {
    register,
    handleSubmit,
    submitForm,
    errors,
    isSubmitting,
    successMessage,
  };
};
