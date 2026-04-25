// src/components/TestConnection.tsx
import { useState, useEffect } from "react";

interface TestData {
  message: string;
  title: string;
}

export const TestConnection = () => {
  const [testData, setTestData] = useState<TestData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hello");
        const result = await response.json();
        setTestData(result);
        console.log("✅ Сервер отвечает:", result);
      } catch (error) {
        console.error("❌ Сервер не отвечает:", error);
        setError("Не удалось подключиться к серверу");
      }
    };

    fetchTestData();
  }, []);

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        ⚠️ {error}
      </div>
    );
  }

  if (!testData) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
        🔄 Проверка подключения к серверу...
      </div>
    );
  }

  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      ✅ {testData.message} - {testData.title}
    </div>
  );
};