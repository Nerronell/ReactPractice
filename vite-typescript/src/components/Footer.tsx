import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className='bg-[#333] fixed bottom-0 left-0 p-5 right-0 italic text-xs md:text-base lg:text-lg xm:text-xl'>
      <header>
        <nav className="flex justify-between items-center">
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
          </nav>
      </header>
    </div>
  )
}