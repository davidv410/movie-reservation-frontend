export type Movie = {
    id: string
    title: string
    description: string
    posterUrl: string | null
    durationMinutes: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    genreIds?: string[]
}

export type MovieSelect = {
    id: string
    title: string
}

export type Genre = {
    id: string
    name: string
    slug: string
}

export type MovieWithGenre = {
    movies: Movie,
    movie_genres: {
        movieId: string;
        genreId: string;
    }
}

export type Report = {
    showtimeId: string,
    hall: string,
    startsAt: string,
    totalSeats: string,
    seatsTaken: number,
    seatsAvailable: number,
    revenue: number,
}