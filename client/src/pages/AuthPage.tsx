import { useParams } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import '../styles/auth_page.scss'

export const AuthPage = () => {
    const {id} = useParams()
    console.log(id)

    return (
        // <>
        //     {id === "login" && <Login />}
        //     {id === "register" && <Register />}
        // </>
        <div className="page auth flex">
            <div className="circle"></div>
            {id === "login" && <Login />}
            {id === "register" && <Register />}
        </div>
    )
}