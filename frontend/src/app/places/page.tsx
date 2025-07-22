import Link from 'next/link';
import Image from 'next/image';

async function getPlaces() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/places`);
    if (!res.ok) {
      throw new Error('Не удалось загрузить данные о местах');
    }
    return await res.json();
  } catch (error) {
    console.error('Ошибка при загрузке мест:', error);
    return [];
  }
}

export default async function PlacesPage() {
  const places = await getPlaces();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Все места</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Исследуйте разнообразные места, добавленные нашими пользователями, и делитесь своими впечатлениями
        </p>
      </div>

      {places.length === 0 ? (
        <div className="text-center py-20">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Места не найдены</h2>
          <p className="text-gray-600 mb-6">Пока никто не добавил места. Будьте первым!</p>
          <Link 
            href="/add-place" 
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Добавить место
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Поиск по местам..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="absolute left-4 top-3.5 text-gray-400">
                <i className="fas fa-search"></i>
              </div>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <select className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-auto">
                <option>Сортировать по</option>
                <option>Рейтингу (высокий)</option>
                <option>Рейтингу (низкий)</option>
                <option>Дате (новые)</option>
                <option>Дате (старые)</option>
              </select>

              <select className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-auto">
                <option>Все категории</option>
                <option>Рестораны</option>
                <option>Отели</option>
                <option>Парки</option>
                <option>Пляжи</option>
                <option>Магазины</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place: any) => (
              <Link 
                key={place.id} 
                href={`/places/${place.slug}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
              >
                <div className="relative h-56">
                  {place.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DJANGO_API_URL}${place.image}`}
                      alt={place.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                      <i className="fas fa-image text-3xl text-gray-400"></i>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 font-bold text-primary flex items-center">
                    <i className="fas fa-star mr-1"></i>
                    {place.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">
                    {place.name}
                  </h3>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-gray-600"></i>
                      </div>
                      <span className="ml-2 text-gray-600 text-sm">
                        {place.created_by.first_name || place.created_by.last_name 
                          ? `${place.created_by.first_name} ${place.created_by.last_name}` 
                          : 'Аноним'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="px-4 py-2 rounded-lg bg-primary text-white">1</button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-200 transition">2</button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-200 transition">3</button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-200 transition">...</button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-200 transition">10</button>
              <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}