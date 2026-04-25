// server/index.js
import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js"; // Добавляем auth роуты

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Маршруты
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes); // Добавляем маршруты авторизации

// Тестовый маршрут
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server!", title: "Яблоко" });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
  console.log(`📦 Products: http://localhost:${port}/api/products`);
  console.log(`🔐 Auth: http://localhost:${port}/api/auth`);
});