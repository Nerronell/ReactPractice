import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='bg-[#333] fixed top-0 left-0 p-9 right-0 text-lg italic'>
      <header>
        <nav>
          <ul>
            <li className='inline p-1'>
              <Link to='/'>
                <div className='bg-[#444] border inline p-5'>Главная</div>
              </Link>
            </li>
            <li className='inline p-1'>
              <Link to='/about'>
              <div className='bg-[#444] border inline p-5'>О нас</div>
              </Link>
            </li>
            <li className='inline p-1'>
              <Link to='/signin'>
              <div className='bg-[#444] border inline p-5'>Авторизация</div>
              </Link>
            </li>
            <li className='inline p-1'>
              <Link to='/signup'>
              <div className='bg-[#444] border inline p-5'>Регистрация</div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className='bg-[#222] fixed top-25 left-0 p-1 right-0'></div>
    </div>
  )
}