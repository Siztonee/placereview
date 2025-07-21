import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Герой-секция */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Открывайте мир с PlaceReview</h1>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Находите лучшие места, делитесь впечатлениями и помогайте другим сделать правильный выбор
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition duration-300">
              Начать просмотр
            </a>
            <a href="#" className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition duration-300">
              Добавить отзыв
            </a>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Популярные категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                title: "Рестораны", 
                reviews: "1254 отзыва",
                image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              },
              { 
                title: "Отели", 
                reviews: "876 отзывов",
                image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              },
              { 
                title: "Пляжи", 
                reviews: "543 отзыва",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              },
              { 
                title: "Парки", 
                reviews: "932 отзыва",
                image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-40 relative">
                  <Image 
                    src={category.image}
                    alt={category.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.reviews}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Последние отзывы */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Последние отзывы</h2>
            <a href="#" className="text-primary hover:underline">Все отзывы</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                place: "Ресторан \"La Piazza\"",
                rating: 4.8,
                type: "Итальянская кухня • $$$",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                author: "Анна Петрова",
                stars: 4.5,
                content: "Невероятная атмосфера и потрясающая паста! Обслуживание на высшем уровне, обязательно вернусь снова.",
                likes: 24,
                time: "2 дня назад"
              },
              {
                place: "Отель \"Морской бриз\"",
                rating: 4.5,
                type: "Пятизвездочный • Сочи",
                image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                author: "Иван Сидоров",
                stars: 4,
                content: "Вид на море просто завораживает! Чистые номера, внимательный персонал. Из минусов - дорогой завтрак.",
                likes: 18,
                time: "5 дней назад"
              },
              {
                place: "Парк \"Зеленый остров\"",
                rating: 4.9,
                type: "Парк развлечений • Москва",
                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                author: "Мария Иванова",
                stars: 5,
                content: "Идеальное место для семейного отдыха! Множество аттракционов для детей и взрослых, чистая территория.",
                likes: 32,
                time: "1 неделю назад"
              }
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={review.image}
                    alt={review.place}
                    layout="fill"
                    objectFit="cover"
                    className="w-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl">{review.place}</h3>
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                      {review.rating}
                    </div>
                  </div>
                  <p className="text-gray-500 mt-2">{review.type}</p>
                  
                  <div className="flex items-center mt-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="ml-3">
                      <p className="font-medium">{review.author}</p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fas ${i < Math.floor(review.stars) ? 'fa-star' : i < review.stars ? 'fa-star-half-alt' : 'fa-star'} ${i < review.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-gray-700 line-clamp-3">
                    {review.content}
                  </p>
                  
                  <div className="mt-4 flex justify-between text-gray-500">
                    <span><i className="far fa-thumbs-up"></i> {review.likes}</span>
                    <span>{review.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-16 bg-gradient-to-r from-dark to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Присоединяйтесь к нашему сообществу</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Делитесь своими впечатлениями, помогайте другим путешественникам и находите новые интересные места
          </p>
          <a href="#" className="bg-white text-dark px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition duration-300 inline-block">
            Зарегистрироваться
          </a>
        </div>
      </section>
    </>
  );
}