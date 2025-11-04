import { NavLink, useNavigate } from "react-router-dom"
import { FavoritesIcon, LinkIcon, LogOutIcon, UserIcon } from "../../assets/Icons"

export const DropDownMenu = () => {
    const navigate = useNavigate()

    function logOutHandler() {
        localStorage.removeItem("token")
        window.location.reload()
        navigate("/")
    }

    return (
        <div className="dropDownMenu flex column g8">
            <NavLink to={"/profile/me"} className="link flex center g4"><UserIcon /> Профиль</NavLink>
            <NavLink to={"/favorites/me"} className="link flex center g4"><FavoritesIcon /> Понравившиеся</NavLink>
            <NavLink to={"/"} className="link flex center g4"><LinkIcon /> Ссылка №3</NavLink>
            <button onClick={logOutHandler} className="link flex center g4"><LogOutIcon /> Выйти</button>
        </div>
    )
}