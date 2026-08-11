import { useAuth } from "@/features/auth/context.tsx";
import { logoutUser } from "@/features/auth/api.ts";
import {useNavigate} from "react-router-dom";
import { Search } from "./Search";

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
            <ul className="flex w-full justify-between items-center mb-10 h-fit pt-5 pb-5 flex-wrap">
                <span className="flex">
                    <li className="ml-5 mr-5"><button className="cursor-pointer" onClick={() => navigate('/')}>home</button></li>
                    <li className="ml-5 mr-5"><button className="cursor-pointer" onClick={() => navigate('/showtimes')}>showtimes</button></li>
                    <Search/>
                </span>

                <span className="flex">
                { user ?
                    <>
                        <li className="ml-5 mr-5"><button className="cursor-pointer" onClick={() => navigate('/reservations')}>reservations</button></li>
                        <li className="ml-5 mr-5"><button className="cursor-pointer" onClick={() => navigate('/admin')}>{user.role}</button></li>
                        <span className="ml-5 flex">
                            <li>{user.email}</li>
                            <li className="ml-5 mr-5"><button onClick={() => handleLogout()} className="text-red-500">Logout</button></li>
                        </span>
                    </>
                    : 
                    <>
                        <li className="ml-5 mr-5"><button className="cursor-pointer" onClick={() => navigate('/login')}>login</button></li>
                        <li className="ml-5 mr-5"><button className="cursor-pointer" onClick={() => navigate('/register')}>register</button></li>
                    </>
                }
                </span>
            </ul>
        </>
    )
}