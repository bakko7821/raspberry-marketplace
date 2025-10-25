import { Router, Request, Response } from "express";
import Card from "../models/Card";
import upload from "../utils/multer";
import { generateArticle } from "../utils/utils";

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


router.post(
  "/add",
  upload.array("images", 5),
  async (req: Request, res: Response) => {
    try {
      const { title, description, price, about } = req.body;

      if (!title || !price) {
        return res.status(400).json({ message: "Введите title и price" });
      }

      const images = (req.files as Express.Multer.File[]).map(
        (file) => `/uploads/${file.filename}`
      );

      const parsedAbout =
        typeof about === "string" ? JSON.parse(about) : about || {};

      // Получаем все существующие артикулы
      const existingCards = await Card.findAll({ attributes: ["article"] });
      const existingArticles = existingCards.map((c) => c.article);

      const article = generateArticle({ ids: existingArticles });

      // Создаём карточку
      const card = await Card.create({
        article,
        title,
        description,
        price,
        about: parsedAbout,
        images,
      });

      res.status(201).json(card);
    } catch (error) {
      console.error("Ошибка при добавлении карты:", error);
      res.status(500).json({ message: "Ошибка при добавлении карты" });
    }
  }
);

export default router;
