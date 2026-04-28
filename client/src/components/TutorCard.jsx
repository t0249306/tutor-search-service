import { useState } from 'react';
import BookingModal from './BookingModal';
import ReviewSection from './ReviewSection';

export default function TutorCard({ tutor }) {
  const [showBooking, setShowBooking] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm p-5 bg-white transition-shadow hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{tutor.name}</h2>
          <p className="text-gray-600 font-medium">{tutor.subject}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-800">
            <span className="text-yellow-500 mr-1">⭐</span>
            {tutor.rating}
          </p>
          <p className="text-sm text-gray-500 mt-1">{tutor.price} ₽ / час</p>
        </div>
      </div>
      
      <div className="flex gap-3 mb-2">
        <button 
          onClick={() => setShowBooking(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 cursor-pointer transition-colors"
        >
          Записаться
        </button>
        <button 
          onClick={() => setShowReviews(!showReviews)}
          className="bg-gray-100 text-gray-800 px-5 py-2 rounded-lg font-medium hover:bg-gray-200 cursor-pointer transition-colors"
        >
          {showReviews ? 'Скрыть отзывы' : 'Отзывы'}
        </button>
      </div>

      {showReviews && <ReviewSection tutorId={tutor.id} />}
      {showBooking && <BookingModal tutorId={tutor.id} onClose={() => setShowBooking(false)} />}
    </div>
  );
}