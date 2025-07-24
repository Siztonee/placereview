// Функция для проверки аутентификации
export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
  };
  
  // Функция для получения access token
  export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  // Функция для обновления токена
  export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;
  
    try {
      const response = await fetch('http://localhost:8080/api/auth/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: refreshToken })
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        return data.access;
      } else {
        // Если refresh токен невалиден, разлогиниваем пользователя
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return null;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  };
  
  // Функция для защищенных запросов к API
  export const authFetch = async (url: string, options: RequestInit = {}) => {
    let accessToken = getAccessToken();
    
    // Если токен отсутствует, возвращаем ошибку
    if (!accessToken) {
      throw new Error('User not authenticated');
    }
    
    // Добавляем заголовок авторизации
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`
    };
    
    let response = await fetch(url, { ...options, headers });
    
    // Если токен истек, пытаемся обновить
    if (response.status === 401) {
      const newAccessToken = await refreshToken();
      
      if (newAccessToken) {
        // Повторяем запрос с новым токеном
        headers.Authorization = `Bearer ${newAccessToken}`;
        response = await fetch(url, { ...options, headers });
      } else {
        // Если не удалось обновить токен, выбрасываем ошибку
        throw new Error('Session expired');
      }
    }
    
    return response;
  };