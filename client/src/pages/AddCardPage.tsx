import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";

interface About {
    [key: string]: string;
}

export const AddCardPage = () => {
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [about, setAbout] = useState<About>({});
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const handleAboutChange = (key: string, value: string) => {
    setAbout((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleAddAboutField = () => {
    const nextKey = `field${Object.keys(about).length + 1}`;
    setAbout((prev: any) => ({ ...prev, [nextKey]: "" }));
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
      setAbout({});
      setImages([]);
      setPreview([]);
    } catch (error) {
      console.error("Ошибка при создании карты:", error);
      alert("Ошибка при создании карты");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
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
        {Object.entries(about).map(([key, value]) => (
          <div key={key} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              type="text"
              placeholder="ключ"
              value={key}
              disabled
              style={{ width: "40%" }}
            />
            <input
              type="text"
              placeholder="значение"
              value={value}
              onChange={(e) => handleAboutChange(key, e.target.value)}
              style={{ width: "60%" }}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddAboutField}>
          + Добавить поле
        </button>

        <label>Изображения:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

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