import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='bg-[#333] fixed top-0 left-0 p-9 right-0 text-xs md:text-base lg:text-lg xm:text-xl italic'>
      <header>
        <nav>
          <ul>
            <li className='inline p-1'>
              <Link to='/'>
                <div className='bg-[#444] border inline p-1 md:p-3 lg:p-4 xm:p-5'>Главная</div>
              </Link>
            </li>
            <li className='inline p-1'>
              <Link to='/about'>
              <div className='bg-[#444] border inline p-1 md:p-3 lg:p-4 xm:p-5'>О нас</div>
              </Link>
            </li>
            <li className='inline p-1'>
              <Link to='/signin'>
              <div className='bg-[#444] border inline p-1 md:p-3 lg:p-4 xm:p-5'>Авторизация</div>
              </Link>
            </li>
            <li className='inline p-1'>
              <Link to='/signup'>
              <div className='bg-[#444] border inline p-1 md:p-3 lg:p-4 xm:p-5'>Регистрация</div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}