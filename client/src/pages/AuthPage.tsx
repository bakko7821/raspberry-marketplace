import { useParams } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"

export const AuthPage = () => {
    const {id} = useParams()
    console.log(id)

    return (
        <>
            {id === "login" && <Login />}
            {id === "register" && <Register />}
        </>
    )
}