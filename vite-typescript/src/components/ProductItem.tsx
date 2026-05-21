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
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
            {!inStock && (
              <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">
                Нет в наличии
              </span>
            )}
            {inStock && (
              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                В наличии
              </span>
            )}
          </div>
          <p className="text-gray-600 text-base mb-3 leading-relaxed">{description}</p>
          <p className="text-green-600 font-bold text-2xl">{price}</p>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 text-2xl font-bold px-3 py-1 transition-colors"
          aria-label="Удалить"
        >
          ✕
        </button>
      </div>
    </div>
  );
};