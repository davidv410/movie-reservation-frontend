import { useAuth } from "@/features/auth/context.tsx";
import { logoutUser } from "@/features/auth/api.ts";
import {useNavigate} from "react-router-dom";

export const Header = () => {

    const navigate = useNavigate()

    const { user, logout } = useAuth()

    
    const handleLogout = async () => {
        await logoutUser()
        logout()
        navigate("/login")
    }

    return(
        <>
            <ul className="flex w-full justify-start items-center mb-10 border h-fit pt-5 pb-5 flex-wrap">
                <li className="ml-5 mr-5"><button className="cursor-pointer" onClick={() => navigate('/')}>home</button></li>
                <li className="ml-5 mr-5"><button className="cursor-pointer" onClick={() => navigate('/movies')}>movies</button></li>
                <li className="ml-5 mr-5"><button className="cursor-pointer" onClick={() => navigate('/showtimes')}>showtimes</button></li>

                { user ?
                    <>
                        <li className="ml-5 mr-5"><button className="cursor-pointer" onClick={() => navigate('/reservations')}>reservations</button></li>
                        <span className="ml-5 flex">
                            <li><p>{user.role} - {user.email}</p></li>
                            <li className="ml-5"><button onClick={() => handleLogout()} className="text-red-500">Logout</button></li>
                        </span>
                    </>
                    : 
                    <>
                        <li className="ml-5 mr-5"><button className="cursor-pointer" onClick={() => navigate('/login')}>login</button></li>
                        <li className="ml-5 mr-5"><button className="cursor-pointer" onClick={() => navigate('/register')}>register</button></li>
                    </>
                }
            </ul>
        </>
    )
}