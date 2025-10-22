import jwt from "jsonwebtoken";

export const generateToken = (id: number, email: string) => {
  const secret = process.env.JWT_SECRET || "default_secret";
  return jwt.sign({ id, email }, secret, { expiresIn: "24h" });
};