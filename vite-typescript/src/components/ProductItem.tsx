// src/components/ProductItem.tsx
import React from "react";

interface ProductItemProps {
  id: number;
  name: string;
  description: string;
  price: string;
  inStock?: boolean;
  onDelete: (id: number) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({ 
  id, 
  name, 
  description, 
  price, 
  inStock = true, 
  onDelete 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            {!inStock && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                Нет в наличии
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-2">{description}</p>
          <p className="text-green-600 font-bold text-lg">{price}</p>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 text-xl font-bold px-2 py-1"
          aria-label="Удалить"
        >
          ✕
        </button>
      </div>
    </div>
  );
};