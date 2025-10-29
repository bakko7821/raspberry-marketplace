import { NavLink, Link, useNavigate } from "react-router-dom"
import '../styles/header.scss'
import { Search } from "./Search"
import { useAuth } from "../hooks/useAuth"

export const Header = () => {
    const isAuth = useAuth()
    const navigate = useNavigate()

    if (isAuth === null) return <p>Проверка токена...</p>;

    return (
        <div className="header flex center g24">
            <Link to="/" className="logo">Raspberry</Link>
            <Search />
            {isAuth ? (
                <div className="userBox">
                    <p>true</p>
                </div>
            ) : (
                <div className="authBox">
                    <button onClick={() => navigate("/auth/login")} className="signInButton">Войти</button>
                </div>
            )}
        </div>
    )
}