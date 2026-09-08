# Movie Reservation - Frontend

React + TypeScript frontend for booking movie tickets. Browse movies and showtimes, pick seats on a seat map, manage your bookings. Backend API: (https://github.com/davidv410/movie-reservation-ts).

## About this project

Most seat-booking demos never actually test what happens when two people try to grab the same seat. The backend for this one handles that properly (row locking + a unique index as backup — see that repo's README), so this frontend is built around that reality too, including showing the user when a seat they picked gets taken by someone else before they confirm.

## Features

- Register/login, JWT stored and refreshed automatically via an axios interceptor
- Protected routes for logged-in stuff and admin-only stuff
- Browse movies, movie details, showtimes per movie
- Seat map per showtime, select multiple seats, book them
- View and cancel your own reservations
- Admin panel — create/edit movies and showtimes

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

Note: the API url is hardcoded in `src/lib/axios.ts` right now, if your backend's on a different port change it there. Should probably be an env var, on my list below.

## Still to do

- Seat holds with a countdown timer instead of instant book
- Stripe checkout
- Tests
- Deploy it somewhere
- Make UI more appealing