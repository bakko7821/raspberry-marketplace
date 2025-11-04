import { NavLink } from "react-router-dom"
import { LinkIcon, UserIcon } from "../../assets/Icons"

export const DropDownMenu = () => {
    return (
        <div className="dropDownMenu flex column g8">
            <NavLink to={"/profile/me"} className="link flex center g4"><UserIcon /> Профиль</NavLink>
            <NavLink to={"/"} className="link flex center g4"><LinkIcon /> Ссылка №2</NavLink>
            <NavLink to={"/"} className="link flex center g4"><LinkIcon /> Ссылка №3</NavLink>
            <NavLink to={"/"} className="link flex center g4"><LinkIcon /> Ссылка №4</NavLink>
        </div>
    )
}