import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  date: Date;
  avatar: string;
  cart: string[];
  favorite: string[];
  balance: number;
}

export const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Не найден токен");
          setLoading(false);
          return;
        }

        const url =
          id === "me"
            ? "http://localhost:5000/api/users/me"
            : `http://localhost:5000/api/users/${id}`;

        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Ошибка запроса: ${res.status}`);
        }

        const data = await res.json();
        console.log(data)
        setUser(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!user) return <div>Пользователь не найден</div>;

  return (
    <div className="page profile flex column g16">
      <h1>Профиль</h1>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Имя: {user.firstname} {user.lastname}</p>
    </div>
  );
};
