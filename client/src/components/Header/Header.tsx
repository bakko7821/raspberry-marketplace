import { NavLink, Link, useNavigate } from "react-router-dom"
import '../../styles/header.scss'
import { Search } from "../Search"
import { useAuth } from "../../hooks/useAuth"
import { CartIcon, UserIcon } from "../../assets/Icons"
import { useState } from "react"
import { DropDownMenu } from "./DropDownMenu"

export const Header = () => {
    const isAuth = useAuth()
    const navigate = useNavigate()
    const [ dropDownStatus, setDropDownStatus] = useState(false)

    if (isAuth === null) return <p>Проверка токена...</p>;

    return (
        <div className="header flex center g24">
            <Link to="/" className="logo">Raspberry</Link>
            <Search />
            {isAuth ? (
                <div className="userBox flex center g8">
                    <button className="cartButton flex center" onClick={() => navigate("/cart")}><CartIcon /></button>
                    <button className="userButton flex center" onClick={() => setDropDownStatus(prev => !prev)}><UserIcon /></button>
                    {dropDownStatus && <DropDownMenu />}
                </div>
            ) : (
                <div className="authBox flex center">
                    <button onClick={() => navigate("/auth/login")} className="signInButton">Войти</button>
                </div>
            )}
        </div>
    )
}