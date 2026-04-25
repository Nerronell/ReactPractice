// server/routes/auth.js
import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, "../data/users.json");

// Функции для работы с пользователями
const readUsers = () => {
  const data = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(data);
};

const writeUsers = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Валидация email
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Валидация телефона
const validatePhone = (phone) => {
  const re = /^\+?[0-9]{10,12}$/;
  return re.test(phone);
};

// Регистрация
router.post("/register", (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role = "user" } = req.body;
    
    // Валидация
    const errors = {};
    
    if (!firstName || firstName.length < 2) {
      errors.firstName = "Имя должно содержать минимум 2 символа";
    }
    
    if (!lastName || lastName.length < 2) {
      errors.lastName = "Фамилия должна содержать минимум 2 символа";
    }
    
    if (!email || !validateEmail(email)) {
      errors.email = "Введите корректный email";
    }
    
    if (!phone || !validatePhone(phone)) {
      errors.phone = "Введите корректный номер телефона (10-12 цифр)";
    }
    
    if (!password || password.length < 6) {
      errors.password = "Пароль должен содержать минимум 6 символов";
    }
    
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
    
    const data = readUsers();
    
    // Проверка на существующего пользователя
    const existingUser = data.users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        errors: { email: "Пользователь с таким email уже существует" }
      });
    }
    
    // Создание нового пользователя
    const newUser = {
      id: data.users.length + 1,
      firstName,
      lastName,
      email,
      phone,
      password, // В реальном проекте нужно хэшировать!
      role,
      createdAt: new Date().toISOString()
    };
    
    data.users.push(newUser);
    writeUsers(data);
    
    // Отправляем данные без пароля
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ 
      message: "Регистрация успешна!", 
      user: userWithoutPassword 
    });
    
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Ошибка при регистрации" });
  }
});

// Вход в систему
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Валидация
    const errors = {};
    
    if (!email) {
      errors.email = "Введите email";
    }
    
    if (!password) {
      errors.password = "Введите пароль";
    }
    
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
    
    const data = readUsers();
    const user = data.users.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ 
        error: "Неверный email или пароль" 
      });
    }
    
    // Отправляем данные без пароля
    const { password: _, ...userWithoutPassword } = user;
    res.json({ 
      message: "Вход выполнен успешно!", 
      user: userWithoutPassword 
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Ошибка при входе" });
  }
});

// Получение всех пользователей (только для админа)
router.get("/users", (req, res) => {
  try {
    const data = readUsers();
    const usersWithoutPasswords = data.users.map(({ password, ...user }) => user);
    res.json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении пользователей" });
  }
});

export default router;