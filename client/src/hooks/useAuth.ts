import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuth(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  return isAuth;
};
