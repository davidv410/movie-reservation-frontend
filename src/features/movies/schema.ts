import { z } from 'zod';

export const createMovieSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().optional(),
    posterUrl: z.string().url("Invalid URL").optional(),
    durationMinutes: z.number("Duration must be a positive number").int().positive("Duration must be a positive number"),
    genreIds: z.array(z.uuid()).min(1, "At least one genre is required").optional()
})

export type CreateMovieFormData = z.infer<typeof createMovieSchema>;

export const editMovieSchema = z.object({
    title: z.string().min(1, "Title is required").max(255).optional(),
    description: z.string().optional(),
    posterUrl: z.instanceof(FileList, { message: "Please select a file." }).transform((list) => list[0]),
    durationMinutes: z.number("Duration must be a positive number").int().positive("Duration must be a positive number").optional(),
    genreIds: z.array(z.uuid()).min(1, "At least one genre is required")
})

export type EditMovieFormDataInput = z.input<typeof editMovieSchema>;
export type EditMovieFormDataOutput = z.output<typeof editMovieSchema>;