export type Showtime = {
    id: string;
    movieId: string;
    startsAt: string;
    endsAt: string;
    hall: string;
    totalSeats: number;
    createdAt: string;
}

export type Seats = {
    id: string;
    showtimeId: string;
    row: string;
    number: number;
    type: string;
    price: string;
    isAvailable: boolean;
}

export type Movie = {
    id: string;
    title: string;
    description: string;
    posterUrl: string | null;
    durationMinutes: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export type ShowtimeWithMovie = {
    showtimes: Showtime;
    movies: Movie,
}

export type SeatsProps = {
    showtimeId: string;
    movieId: string;
}

export type CreateReservationBody = {
    showtimeId: string;
    seatId: string;
}

export type ReservationResponse = {
    id: string;
    userId: number;
    showtimeId: string;
    seatId: string;
    status: string;
    pricePaid: string;
    createdAt: string;
    cancelledAt: string | null;
}

export type ShowtimeDataBody = {
    movieId: string;
    startsAt: Date;
    endsAt: Date;
    hall: string;
    totalSeats: number;
}