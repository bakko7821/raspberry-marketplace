import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import User from "../models/User";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, username, email, password, date } = req.body;

    if (!email || !password || !firstname || !lastname || !username || !date) {
        return res.status(400).json({ message: "Заполните все поля" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Пользователь уже существует" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        date: new Date(date),
    });

    const token = generateToken(user.id, user.email);

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при регистрации" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Пользователь не найден" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Неверный пароль" });

    const token = generateToken(user.id, user.email);
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при авторизации" });
  }
});

export default router;
