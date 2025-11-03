import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Ошибка входа");
            }

            localStorage.setItem("token", data.token);
            setMessage("Вы успешно авторизировались")

        } catch (error: any) {
            console.log(error)
            setMessage("Не удалось войти в аккаунт.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="authComponent login flex column center g16">
            <Link to="/" className="logo">Raspberry</Link>
           <form onSubmit={handleLogin} className="flex column g12">
                <div className="floating-input username">
                    <input 
                        type="text" 
                        placeholder=" " 
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="username">@ Имя пользователя</label>
                </div>
                <div className="floating-input password">
                    <input 
                        type="password" 
                        placeholder=" " 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password">Пароль</label>
                </div>
                <div className="navigationBox flex g16">
                    <Link to="">Забыли пароль?</Link>
                    <Link to="/auth/register">Зарегистрироваться</Link>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Входим..." : "Войти"}
                </button>
           </form>

           {message && <p className="notification">{message}</p>}
        </div>
    )
}