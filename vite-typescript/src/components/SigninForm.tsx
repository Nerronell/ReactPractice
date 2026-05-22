import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./Button";
import { Input } from "./Input";

interface SigninFormProps {
  onSuccess?: () => void;
  onSwitchToSignup?: () => void;
}

export const SigninForm: React.FC<SigninFormProps> = ({ onSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Ошибка при входе");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Вход в систему</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <Input
            type="email"
            size="middle"
            color="primary"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Пароль
          </label>
          <Input
            type="password"
            size="middle"
            color="primary"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button
          type="submit"
          size="large"
          color="primary"
          title={loading ? "Вход..." : "Войти"}
          disabled={loading}
        />
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Нет аккаунта?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:text-blue-800 font-semibold underline"
          >
            Зарегистрироваться
          </button>
        </p>
      </div>
    </div>
  );
};