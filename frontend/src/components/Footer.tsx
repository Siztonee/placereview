export default function Footer() {
    return (
      <footer className="bg-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PlaceReview</h3>
            <p className="text-gray-300">
              Открывайте лучшие места с помощью честных отзывов
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition">Главная</a></li>
              <li><a href="#" className="hover:text-white transition">Все места</a></li>
              <li><a href="#" className="hover:text-white transition">Лучшие отзывы</a></li>
              <li><a href="#" className="hover:text-white transition">Правила</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Сообщество</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition">Для авторов</a></li>
              <li><a href="#" className="hover:text-white transition">Блог</a></li>
              <li><a href="#" className="hover:text-white transition">Форумы</a></li>
              <li><a href="#" className="hover:text-white transition">События</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Подписаться</h4>
            <p className="text-gray-300 mb-4">Будьте в курсе новых мест и отзывов</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-gray-800"
              />
              <button className="bg-secondary px-4 py-2 rounded-r-lg hover:bg-violet-700 transition">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-2xl hover:text-white transition"><i className="fab fa-vk"></i></a>
              <a href="#" className="text-2xl hover:text-white transition"><i className="fab fa-telegram"></i></a>
              <a href="#" className="text-2xl hover:text-white transition"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm">
          <p>&copy; 2023 PlaceReview. Все права защищены.</p>
        </div>
      </footer>
    );
  }