'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
          <span className="text-xl font-bold text-gradient">
            PlaceReview
          </span>
        </a>
        
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-primary transition">Главная</a>
          <a href="#" className="hover:text-primary transition">Места</a>
          <a href="#" className="hover:text-primary transition">О проекте</a>
          <a href="#" className="hover:text-primary transition">Контакты</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="#" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            <i className="fas fa-sign-in-alt mr-2"></i>Войти
          </a>
          <a href="#" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <i className="fas fa-plus mr-2"></i>Добавить отзыв
          </a>
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
          <a href="#" className="hover:text-primary transition">Главная</a>
          <a href="#" className="hover:text-primary transition">Места</a>
          <a href="#" className="hover:text-primary transition">О проекте</a>
          <a href="#" className="hover:text-primary transition">Контакты</a>
        </div>
      </div>
    </nav>
  );
}