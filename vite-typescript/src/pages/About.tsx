import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { ProductItem } from "../components/ProductItem";
import { AddProductModal } from "../components/AddProductModal";
import { useAuth } from "../context/AuthContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  inStock: boolean;
  category: string;
}

export const About = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin } = useAuth();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/products");
      
      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }
      
      const data = await response.json();
      setProducts(data.products);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Не удалось загрузить товары. Проверьте подключение к серверу.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (name: string, description: string, price: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          category: "Фрукты",
          inStock: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении товара");
      }

      const newProduct = await response.json();
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Не удалось добавить товар");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении товара");
      }

      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Не удалось удалить товар");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Заголовок и кнопка добавления */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Каталог товаров</h1>
            <p className="text-gray-600">Управление ассортиментом магазина</p>
          </div>
          {isAdmin() && (
            <Button 
              color="primary" 
              size="large" 
              title="+ Добавить товар" 
              onClick={() => setIsModalOpen(true)}
            />
          )}
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Загрузка товаров...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            <p className="font-semibold mb-2">{error}</p>
            <button 
              onClick={fetchProducts}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-700">Все товары</h2>
              <span className="text-gray-500">Всего: {products.length}</span>
            </div>
            
            {products.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">Нет товаров в каталоге</p>
                {isAdmin() && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Добавить первый товар →
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {products.map((product) => (
                  <ProductItem
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    inStock={product.inStock}
                    onDelete={isAdmin() ? handleDeleteProduct : () => {}}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddProduct}
        />
      </div>
    </div>
  );
};