import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from './BookingModal';
import ReviewSection from './ReviewSection';

export default function TutorCard({ tutor, handleBookClick, onFavorite }) {
  const [showBooking, setShowBooking] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 bg-white dark:bg-gray-800 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{tutor.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 font-medium">{tutor.subject}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            {/* Кнопка "В избранное" */}
            <button 
              onClick={() => onFavorite(tutor.id)}
              className="text-gray-400 hover:text-red-500 transition-colors text-xl p-1 cursor-pointer"
              title="В избранное"
            >
              ❤️
            </button>
            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
              <span className="text-yellow-500 mr-1">⭐</span>
              {tutor.rating}
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tutor.price} ₽ / час</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-2">
        <button 
          onClick={() => setShowBooking(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Записаться
        </button>
        <Link 
          to={`/tutors/${tutor.id}`}
          className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center"
        >
          Подробнее
        </Link>
        <button 
          onClick={() => setShowReviews(!showReviews)}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          {showReviews ? 'Скрыть отзывы' : 'Отзывы'}
        </button>
      </div>

      {showReviews && <ReviewSection tutorId={tutor.id} />}
      {showBooking && <BookingModal tutorId={tutor.id} onClose={() => setShowBooking(false)} />}
    </div>
  );
}
