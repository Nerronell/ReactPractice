// src/components/SignupForm.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./Button";
import { Input } from "./Input";

interface SignupFormProps {
  onSuccess?: () => void;
  onSwitchToSignin?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess, onSwitchToSignin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = "Имя должно содержать минимум 2 символа";
    }
    
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = "Фамилия должна содержать минимум 2 символа";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }
    
    const phoneRegex = /^\+?[0-9]{10,12}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Введите корректный номер телефона (10-12 цифр)";
    }
    
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Регистрация</h2>
      
      {errors.general && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.general}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Имя *
          </label>
          <Input
            type="text"
            name="firstName"
            size="middle"
            color="primary"
            placeholder="Иван"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Фамилия *
          </label>
          <Input
            type="text"
            name="lastName"
            size="middle"
            color="primary"
            placeholder="Петров"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email *
          </label>
          <Input
            type="email"
            name="email"
            size="middle"
            color="primary"
            placeholder="ivan@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Телефон *
          </label>
          <Input
            type="tel"
            name="phone"
            size="middle"
            color="primary"
            placeholder="+79991234567"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Пароль *
          </label>
          <Input
            type="password"
            name="password"
            size="middle"
            color="primary"
            placeholder="******"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Подтверждение пароля *
          </label>
          <Input
            type="password"
            name="confirmPassword"
            size="middle"
            color="primary"
            placeholder="******"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Роль
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
          </select>
        </div>
        
        <Button
          type="submit"
          size="large"
          color="primary"
          title={loading ? "Регистрация..." : "Зарегистрироваться"}
          disabled={loading}
        />
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Уже есть аккаунт?{" "}
          <button
            type="button"
            onClick={onSwitchToSignin}
            className="text-blue-600 hover:text-blue-800 font-semibold underline"
          >
            Войти
          </button>
        </p>
      </div>
    </div>
  );
};