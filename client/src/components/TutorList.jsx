import TutorCard from './TutorCard';

function TutorList({ tutors, handleBookClick, onFavorite }) {
  if (tutors.length === 0) {
    return (
      <p className="text-center text-gray-500 bg-white p-6 rounded-lg shadow-sm">
        Ничего не найдено
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {tutors.map(tutor => (
        <TutorCard 
          key={tutor.id} 
          tutor={tutor} 
          onFavorite={onFavorite} 
          handleBookClick={handleBookClick}
        />
      ))}
    </div>
  );
}

export default TutorList;
