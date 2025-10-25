import jwt from "jsonwebtoken";

export const generateToken = (id: number, email: string) => {
  const secret = process.env.JWT_SECRET || "default_secret";
  return jwt.sign({ id, email }, secret, { expiresIn: "24h" });
};

export const generateArticle = (props: { ids: string[] }): string => {
  try {
    let article: string;

    while (true) {
      article = Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, "0");

      if (!props.ids.includes(article)) break;
    }

    return article;
  } catch (error: unknown) {
    console.log(error, "Ошибка при генерации артикула.");
    return "00000000";
  }
};

