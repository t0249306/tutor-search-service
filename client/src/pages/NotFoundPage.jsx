import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-6xl font-black text-gray-300 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Упс! Страница не найдена</p>
      <Link 
        to="/" 
        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFoundPage;
