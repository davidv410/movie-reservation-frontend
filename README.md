# Movie Reservation - Frontend

React + TypeScript frontend for booking movie tickets. Browse movies and showtimes, pick seats on a seat map, manage your bookings. Backend API: (https://github.com/davidv410/movie-reservation-ts).

## About this project

Most seat-booking demos don't handle what happens when two people go for the same seat at the same time. The backend deals with that (row locking, plus a unique index as a backup), so I built the frontend accordingly, if a seat you picked gets taken before you confirm, you'll see it.

## Features

- Register/login, JWT stored and refreshed automatically via an axios interceptor
- Protected routes for logged-in stuff and admin-only stuff
- Browse movies, movie details, showtimes per movie
- Seat map per showtime, select multiple seats, book them
- View and cancel your own reservations
- Admin panel: create/edit movies and showtimes

## Stack

React, TypeScript, Vite, TanStack Query, React Hook Form + Zod, Tailwind v4, React Router, Axios.

## Folder structure

Split by feature instead of by type, each one has its own api calls/hooks/types:

```
src/
├── features/
│   ├── auth/
│   ├── movies/
│   ├── showtimes/
│   └── reservations/
├── pages/
├── components/
└── lib/
```

## Running it

Need the [backend](https://github.com/davidv410/movie-reservation-ts) running first (defaults to `localhost:5000`).

```bash
git clone https://github.com/davidv410/movie-reservation-frontend.git
cd movie-reservation-frontend
npm install
npm run dev
```

Runs at `localhost:5173`.

Make a `.env` file with:

```env
VITE_API_URL=
```

## Still to do

- Seat holds with a countdown timer instead of instant book
- Stripe checkout
- Tests
- Deploy it somewhere
- Make UI more appealing