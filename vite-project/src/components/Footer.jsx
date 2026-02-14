import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className='bg-[#333] fixed bottom-0 left-0 p-5 right-0 italic'>
      <header>
        <nav>
          <ul>
          <li className='inline p-1'>
            <Link to='/'>
            <div className='bg-[#444] border inline p-2'>Главная</div>
            </Link>
          </li>
          <li className='inline p-1'>
            <Link to='/about'>
            <div className='bg-[#444] border inline p-2'>О нас</div>
            </Link>
          </li>
          <li className='inline p-1'>
            <Link to='/signin'>
            <div className='bg-[#444] border inline p-2'>Авторизация</div>
            </Link>
          </li>
          <li className='inline p-1'>
            <Link to='/signup'>
            <div className='bg-[#444] border inline p-2'>Регистрация</div>
            </Link>
          </li>
          </ul>
        </nav>
      </header>
      <div className='bg-[#222] fixed bottom-15 left-0 p-1 right-0'></div>
    </div>
  )
}