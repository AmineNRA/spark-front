import { HeartHandshake, MessageCircle, Tickets } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function MobileNavbar() {
    return (
        <nav className="flex place-content-around bg-white w-full border-t py-3 ">
            <NavLink to="/rencontres"><HeartHandshake size={35} color="black" /></NavLink>
            <NavLink to="/evenements"><Tickets size={35} color="black" /></NavLink>
            <NavLink to="/messages" ><MessageCircle size={35} color="black" /></NavLink>
        </nav>
    )
}