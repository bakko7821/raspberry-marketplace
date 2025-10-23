import { NavLink } from "react-router-dom"
import '../styles/header.scss'

export const Header = () => {
    return (
        <div className="header flex center g8">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/card/add"}>Создать карточку</NavLink>
        </div>
    )
}