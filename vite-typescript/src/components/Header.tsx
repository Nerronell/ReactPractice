// src/components/Header.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className='bg-gradient-to-r from-gray-800 to-gray-900 fixed top-0 left-0 right-0 z-50 shadow-lg'>
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            {/* Логотип */}
            <Link to='/' className="text-white text-2xl font-bold hover:text-gray-300 transition-colors">
              Магазин
            </Link>
            
            {/* Навигация */}
            <ul className="flex gap-6">
              <li>
                <Link to='/'>
                  <div className='text-white hover:text-gray-300 transition-colors font-medium'>
                    Главная
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/about'>
                  <div className='text-white hover:text-gray-300 transition-colors font-medium'>
                    Товары
                  </div>
                </Link>
              </li>
            </ul>
            
            {/* Пользовательская секция */}
            <div className="flex gap-4 items-center">
              {user ? (
                <>
                  <div className="text-right">
                    <div className="text-white font-semibold">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link to='/signin'>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors font-medium">
                      Войти
                    </button>
                  </Link>
                  <Link to='/signup'>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors font-medium">
                      Регистрация
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
      <div className='h-[72px]'></div>
    </>
  );
};