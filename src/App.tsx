import { Routes, Route } from 'react-router-dom';
import { Admin } from "@/pages/admin";
import { Movies } from "@/pages/movies.tsx";
import { MovieDetail } from "@/pages/movieDetail.tsx";
import { Login } from "@/pages/login.tsx";
import { Reservations } from "@/pages/reservations.tsx";
import { Showtimes } from "@/pages/showtimes.tsx";
import { ShowtimeDetail } from "@/pages/showtimeDetail.tsx"
import { ProtectedRoute } from "@/pages/ProtectedRoute.tsx";
import { Register } from "@/pages/register.tsx";

function App() {

  return (
    <>
        <main className='ml-5 mr-5'>
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/movies/:id" element={<MovieDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/showtimes" element={<Showtimes />} />
                <Route path="/showtimes/:id" element={<ShowtimeDetail />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/reservations" element={
                    <ProtectedRoute>
                        <Reservations />
                    </ProtectedRoute>
                } />
            </Routes>
        </main>
    </>
  )
}

export default App
