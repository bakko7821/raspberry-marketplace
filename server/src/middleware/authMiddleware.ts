import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
}

// Middleware для проверки токена
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Требуется авторизация" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "default_secret";

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Добавляем данные пользователя в объект запроса
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Недействительный токен" });
  }
};
