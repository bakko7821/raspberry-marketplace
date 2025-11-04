import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../styles/header.scss";
import { Search } from "../Search";
import { useAuth } from "../../hooks/useAuth";
import { CartIcon, UserIcon } from "../../assets/Icons";
import { useEffect, useState } from "react";
import { DropDownMenu } from "./DropDownMenu";
import type { User } from "../../pages/ProfilePage";

export const Header = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  const [dropDownStatus, setDropDownStatus] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuth) {
        try {
          const token = localStorage.getItem("token");
          if (!token) return;

          const res = await fetch("http://localhost:5000/api/users/me", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            throw new Error("Ошибка при получении данных пользователя");
          }

          const data = await res.json();
          setUser(data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setUser(null);
      }
    };

    fetchUserData();
  }, [isAuth]);

  if (isAuth === null) return <p>Проверка токена...</p>;

  return (
    <div className="header flex center g24">
      <Link to="/" className="logo">Raspberry</Link>
      <Search />

      {isAuth ? (
        <div className="userBox flex center g8">
          <button
            className="cartButton flex center"
            onClick={() => navigate("/cart/me")}
          >
            <CartIcon />
          </button>

          <button
            className="userButton flex center"
            onClick={() => setDropDownStatus((prev) => !prev)}
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="avatar"
                style={{ width: 32, height: 32, borderRadius: "50%" }}
              />
            ) : (
              <UserIcon />
            )}
          </button>
          <p className="balance">{user?.balance} ₽</p>

          {dropDownStatus && <DropDownMenu />}
        </div>
      ) : (
        <div className="authBox flex center">
          <button
            onClick={() => navigate("/auth/login")}
            className="signInButton"
          >
            Войти
          </button>
        </div>
      )}
    </div>
  );
};
