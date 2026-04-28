import { useState, useEffect } from 'react';
import { getTutors } from './api/api';
import TutorCard from './components/TutorCard';
import Loader from './components/Loader';

function App() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadTutors();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const loadTutors = async () => {
    try {
      setLoading(true);
      const data = await getTutors(search);
      setTutors(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить список репетиторов');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Поиск репетиторов</h1>
          <input 
            type="text" 
            placeholder="Поиск по предмету (например, Математика)" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </header>

        {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>}

        {loading ? (
          <Loader />
        ) : tutors.length === 0 ? (
          <p className="text-center text-gray-500 bg-white p-6 rounded-lg shadow-sm">Ничего не найдено</p>
        ) : (
          <div className="space-y-4">
            {tutors.map(tutor => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;