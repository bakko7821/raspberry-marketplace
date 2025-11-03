import { useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
    const [firstname, seFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const date: Date = new Date();

    const handleRegister = async (e: any) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstname, lastname, username, email, password, date }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Ошибка регистрации");
            }

            setMessage("Регистрация прошла успешно")
            handleLogin(username, password)

        } catch (error: any) {
            console.log(error)
            setMessage("Не удалось войти в аккаунт.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (usernameProps: string, passwordProps: string) => {
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usernameProps, passwordProps }),
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
           <form onSubmit={handleRegister} className="flex column g12">
                <div className="fullNameBox flex g12">
                    <div className="floating-input firstname">
                        <input 
                            type="text" 
                            placeholder=" " 
                            id="firstname"
                            value={firstname}
                            onChange={(e) => seFirstname(e.target.value)}/>
                        <label htmlFor="firstname">Имя</label>
                    </div>
                    <div className="floating-input lastname">
                        <input 
                            type="text" 
                            placeholder=" " 
                            id="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}/>
                        <label htmlFor="lastname">Фамилия</label>
                    </div>
                </div>
                <div className="floating-input email">
                    <input 
                        type="text" 
                        placeholder=" " 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="email">Почта</label>
                </div>
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
                    <Link to="/auth/register">Уже есть аккаунт? Войти в аккаунт</Link>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Регистрация..." : "Зарегистрироваться"}
                </button>
           </form>

           {message && <p className="notification">{message}</p>}
        </div>
    )
}