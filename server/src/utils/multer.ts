import multer from "multer";
import path from "path";
import fs from "fs";

// Папка для загрузок
const uploadPath = path.join(__dirname, "../uploads");

// Если нет папки — создаём
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Настройка хранилища
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Фильтр по типу файла
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Недопустимый тип файла"), false);
};

const upload = multer({ storage, fileFilter });

export default upload;
