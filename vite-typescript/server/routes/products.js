// server/routes/products.js
import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const router = express.Router();

// Получаем путь к файлу данных
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, "../data/products.json");

// Функция для чтения данных
const readProducts = () => {
  const data = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(data);
};

// Функция для записи данных
const writeProducts = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET /api/products - получить все товары
router.get("/", (req, res) => {
  try {
    const data = readProducts();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении товаров" });
  }
});

// GET /api/products/:id - получить товар по ID
router.get("/:id", (req, res) => {
  try {
    const data = readProducts();
    const product = data.products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
      return res.status(404).json({ error: "Товар не найден" });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении товара" });
  }
});

// POST /api/products - добавить новый товар
router.post("/", (req, res) => {
  try {
    const { name, description, price, category = "Фрукты", inStock = true } = req.body;
    
    if (!name || !description || !price) {
      return res.status(400).json({ error: "Не все обязательные поля заполнены" });
    }
    
    const data = readProducts();
    const newId = Math.max(...data.products.map(p => p.id)) + 1;
    
    const newProduct = {
      id: newId,
      name,
      description,
      price,
      category,
      inStock
    };
    
    data.products.push(newProduct);
    writeProducts(data);
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при добавлении товара" });
  }
});

// PUT /api/products/:id - обновить товар
router.put("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price, category, inStock } = req.body;
    
    const data = readProducts();
    const productIndex = data.products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: "Товар не найден" });
    }
    
    data.products[productIndex] = {
      ...data.products[productIndex],
      name: name || data.products[productIndex].name,
      description: description || data.products[productIndex].description,
      price: price || data.products[productIndex].price,
      category: category || data.products[productIndex].category,
      inStock: inStock !== undefined ? inStock : data.products[productIndex].inStock
    };
    
    writeProducts(data);
    res.json(data.products[productIndex]);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении товара" });
  }
});

// DELETE /api/products/:id - удалить товар
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = readProducts();
    const products = data.products.filter(p => p.id !== id);
    
    if (products.length === data.products.length) {
      return res.status(404).json({ error: "Товар не найден" });
    }
    
    data.products = products;
    writeProducts(data);
    
    res.json({ message: "Товар успешно удален" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении товара" });
  }
});

export default router;