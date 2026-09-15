export type Reservation = {
    id: string;
    userId: number;
    showtimeId: string;
    seatId: string;
    status: string;
    pricePaid: string;
    createdAt: string;
    cancelledAt: string | null;
}

export type ReservationsInfo = {
    reservationId: string,
    reservationStatus: string,
    seatRow: string,
    seatNumber: number,
    seatPrice: number,
    seatIsAvailable: boolean,
    showtimeId: string,

    startTime: string,

    movieTitle: string,
    userId: string,
    userName: string,
    userEmail: string,
}