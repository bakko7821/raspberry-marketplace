import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import User from "../models/User";

const router = Router()

router.get("/me", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userMiddleware = (req as any).user;
    const user = await User.findOne({ where: { id: userMiddleware.id } });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await User.findOne({ where: { id: id } });
        
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        return res.json(user);
    } catch (error: unknown) {
        console.error(error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
})

export default router;