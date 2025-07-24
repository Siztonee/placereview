'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Проверяем наличие токена в localStorage
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    // Здесь можно добавить перенаправление
  };

  return (
    <nav className="bg-white shadow-md py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
          <span className="text-xl font-bold text-gradient">
            PlaceReview
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-primary transition">Главная</Link>
          <Link href="/places" className="hover:text-primary transition">Места</Link>
          <a href="#" className="hover:text-primary transition">О проекте</a>
          <a href="#" className="hover:text-primary transition">Контакты</a>
        </div>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                <i className="fas fa-user mr-2"></i>Профиль
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                <i className="fas fa-sign-in-alt mr-2"></i>Войти
              </Link>
              <Link href="/signup" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Регистрация
              </Link>
            </>
          )}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Мобильное меню */}
      <div className={`md:hidden mt-4 py-4 border-t ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-4">
          <Link href="/" className="hover:text-primary transition">Главная</Link>
          <Link href="/places" className="hover:text-primary transition">Места</Link>
          <a href="#" className="hover:text-primary transition">О проекте</a>
          <a href="#" className="hover:text-primary transition">Контакты</a>
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="hover:text-primary transition">Профиль</Link>
              <button 
                onClick={handleLogout}
                className="text-left hover:text-primary transition"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="hover:text-primary transition">Войти</Link>
              <Link href="/signup" className="hover:text-primary transition">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}