import { useState, useEffect } from 'react';
import { getReviews, createReview } from '../api/api';
import Loader from './Loader';

export default function ReviewSection({ tutorId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    loadReviews();
  }, [tutorId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviews(tutorId);
      setReviews(data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке отзывов');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author || !text) return;
    try {
      setLoading(true);
      await createReview(tutorId, { author, text });
      setAuthor('');
      setText('');
      await loadReviews();
    } catch (err) {
      setError('Ошибка при отправке отзыва');
      setLoading(false);
    }
  };

  if (loading && reviews.length === 0) return <Loader />;

  return (
    <div className="mt-5 p-5 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-xl">
      <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-4">Отзывы</h3>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      
      <div className="space-y-3 mb-5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {reviews.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">Пока нет отзывов. Станьте первым!</p>
        ) : (
          reviews.map(rev => (
            <div key={rev.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{rev.author}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{rev.text}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          type="text" 
          placeholder="Ваше имя" 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400"
        />
        <textarea 
          placeholder="Текст отзыва..." 
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none placeholder-gray-400"
          rows="2"
        />
        <button 
          type="submit" 
          disabled={loading || !author.trim() || !text.trim()}
          className="bg-green-600 dark:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 dark:hover:bg-green-600 cursor-pointer disabled:opacity-50 transition-colors w-full sm:w-auto"
        >
          {loading ? 'Отправка...' : 'Оставить отзыв'}
        </button>
      </form>
    </div>
  );
}
