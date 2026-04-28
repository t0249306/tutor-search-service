import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import TutorList from '../components/TutorList';
import Loader from '../components/Loader';

function HomePage() {
  const { tutors, isLoading, error, fetchTutors, addFavorite } = useStore();

  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  const handleAddToFavorites = (id) => {
    addFavorite(id);
    console.log(`Репетитор [${id}] добавлен в избранное!`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-center">
        <p className="text-red-600 dark:text-red-400 font-bold mb-2">Упс! Произошла ошибка</p>
        <p className="text-red-500 dark:text-red-300 text-sm">{error}</p>
        <button 
          onClick={() => fetchTutors()}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <TutorList tutors={tutors} onFavorite={handleAddToFavorites} />
    </div>
  );
}

export default HomePage;
