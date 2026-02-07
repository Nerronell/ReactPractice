import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
          <li>
            <Link to='/'>Главная</Link>
          </li>
          <li>
            <Link to='/about'>О нас</Link>
          </li>
          <li>
            <Link to='/signin'>Авторизация</Link>
          </li>
          <li>
            <Link to='/signup'>Регистрация</Link>
          </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}