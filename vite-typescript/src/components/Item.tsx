// src/components/Item.tsx
import React from "react";

interface ItemProps {
  id: number;
  title: string;
  description: string;
  onDelete: (id: number) => void; // Функция для удаления
}

export const Item: React.FC<ItemProps> = ({ id, title, description, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 text-left flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description || "Нет описания"}</p>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:text-red-700 text-xl font-bold px-2"
        aria-label="Удалить"
      >
        ✕
      </button>
    </div>
  );
};