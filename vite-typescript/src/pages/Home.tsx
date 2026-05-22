// src/pages/Home.tsx
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/Button";
import { Link } from 'react-router-dom';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Магазин
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Лучшие товары по лучшим ценам
          </p>
          {!user && (
            <div className="flex gap-4 justify-center">
              <Link to="/signup">
                <Button color="primary" size="large" title="Начать покупки" />
              </Link>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
            <p className="text-gray-600"></p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-2">Высокое качество</h3>
            <p className="text-gray-600"></p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Безопасная оплата</h3>
            <p className="text-gray-600"></p>
          </div>
        </div>

        {user && (
          <div className="mt-16 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">Ваш профиль</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Имя:</p>
                <p className="font-semibold">{user.firstName} {user.lastName}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Телефон:</p>
                <p className="font-semibold">{user.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Роль:</p>
                <p className="font-semibold">{user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};