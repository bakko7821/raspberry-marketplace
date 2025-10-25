import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";

interface AboutField {
  key: string;
  value: string;
}

export const AddCardPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [about, setAbout] = useState<{ key: string; value: string }[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);
    setPreview((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const handleAboutChange = (index: number, field: "key" | "value", value: string) => {
    setAbout((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAddAboutField = () => {
    setAbout((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("about", JSON.stringify(about));

      images.forEach((file) => formData.append("images", file));

      const res = await axios.post("http://localhost:5000/api/cards/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Создана карта:", res.data);
      alert("Карта успешно добавлена!");
      setTitle("");
      setDescription("");
      setPrice("");
      setAbout([]);
      setImages([]);
      setPreview([]);
    } catch (error) {
      console.error("Ошибка при создании карты:", error);
      alert("Ошибка при создании карты");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (about && !Array.isArray(about)) {
    const arr = Object.entries(about).map(([key, value]) => ({
      key,
      value: String(value),
    }));
    setAbout(arr);
  }
}, [about]);

  return (
    <div className="page" style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Создать новую карту</h2>
      <form onSubmit={handleSubmit}>
        <label>Название:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Описание:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Цена:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Характеристики (about):</label>
          {about.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", gap: 8, marginBottom: 8 }}
            >
              <input
                type="text"
                placeholder="Ключ (например: Страна изготовления)"
                value={item.key}
                onChange={(e) =>
                  handleAboutChange(index, "key", e.target.value)
                }
                style={{ width: "45%" }}
              />
              <input
                type="text"
                placeholder="Значение (например: Китай)"
                value={item.value}
                onChange={(e) =>
                  handleAboutChange(index, "value", e.target.value)
                }
                style={{ width: "45%" }}
              />
            </div>
          ))}
        <button type="button" onClick={handleAddAboutField}>
          + Добавить поле
        </button>

        <label>Изображения:</label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />

        {preview.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 10,
            }}
          >
            {preview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="preview"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 20,
            padding: "8px 16px",
            background: "#4682b4",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {loading ? "Загрузка..." : "Создать карту"}
        </button>
      </form>
    </div>
  );
};