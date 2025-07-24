'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    ...(type === 'register' && {
      first_name: '',
      last_name: '',
      password2: ''
    })
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const url = type === 'login' 
        ? `${process.env.NEXT_PUBLIC_DJANGO_BROWSER_API_URL}/api/auth/login/`
        : `${process.env.NEXT_PUBLIC_DJANGO_BROWSER_API_URL}/api/auth/register/`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Сохраняем токен в localStorage (или куках)
        if (data.access) {
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
        }
        
        // Перенаправляем на главную страницу
        router.push('/');
      } else {
        // Обработка ошибок валидации
        if (data.detail) {
          setErrors({ non_field_errors: [data.detail] });
        } else {
          setErrors(data);
        }
      }
    } catch (error) {
      setErrors({ non_field_errors: ['Ошибка соединения с сервером'] });
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const title = type === 'login' ? 'Вход в аккаунт' : 'Создать аккаунт';
  const buttonText = type === 'login' ? 'Войти' : 'Зарегистрироваться';
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-lg mx-auto mb-4"></div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-2">
          {type === 'login' 
            ? 'Введите ваши учетные данные для входа' 
            : 'Заполните форму для создания нового аккаунта'}
        </p>
      </div>

      {errors.non_field_errors && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {errors.non_field_errors.map((error, index) => (
            <p key={index} className="flex items-start">
              <i className="fas fa-exclamation-circle mt-1 mr-2"></i>
              {error}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'register' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                Имя
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.first_name ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Ваше имя"
                disabled={isLoading}
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">{errors.first_name[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Фамилия
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.last_name ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Ваша фамилия"
                disabled={isLoading}
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">{errors.last_name[0]}</p>
              )}
            </div>
          </div>
        )}

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            placeholder="username"
            disabled={isLoading}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password[0]}</p>
          )}
        </div>

        {type === 'register' && (
          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
              Подтверждение пароля
            </label>
            <input
              id="password2"
              name="password2"
              type="password"
              value={formData.password2}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password2 ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.password2 && (
              <p className="mt-1 text-sm text-red-600">{errors.password2[0]}</p>
            )}
          </div>
        )}

        {type === 'login' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Запомнить меня
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-blue-700">
                Забыли пароль?
              </a>
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin mr-2"></i> Обработка...
              </span>
            ) : (
              buttonText
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {type === 'login' 
            ? 'Ещё нет аккаунта? ' 
            : 'Уже есть аккаунт? '}
          <Link 
            href={type === 'login' ? '/signup' : '/signin'} 
            className="font-medium text-primary hover:text-blue-700"
          >
            {type === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Или продолжить с</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <a 
            href="#" 
            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <i className="fab fa-google text-red-500"></i>
          </a>
          <a 
            href="#" 
            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <i className="fab fa-vk text-blue-600"></i>
          </a>
          <a 
            href="#" 
            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <i className="fab fa-github text-gray-800"></i>
          </a>
        </div>
      </div>
    </div>
  );
}