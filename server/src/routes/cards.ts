import { Router, Request, Response } from "express";
import Card from "../models/Card";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const cards = await Card.findAll();
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении карточек" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const card = await Card.findByPk(id);

    if (!card) return res.status(404).json({ message: "Карточка не найдена" });

    res.json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении карточки" });
  }
});

export default router;
