import { Link, useParams } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import '../styles/auth_page.scss'

export const AuthPage = () => {
    const {id} = useParams()

    return (
        <div className="page auth flex center">
            
            {id === "login" && <Login />}
            {id === "register" && <Register />}
        </div>
    )
}