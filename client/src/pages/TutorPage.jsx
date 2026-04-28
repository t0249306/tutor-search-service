import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTutors } from '../api/api';
import ReviewSection from '../components/ReviewSection';
import Loader from '../components/Loader';

function TutorPage() {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutor = async () => {
      setLoading(true);
      try {
        const allTutors = await getTutors();
        console.log(allTutors);
        console.log(id);
        
        const found = allTutors.find(t => t.id == parseInt(id));
        setTutor(found);
      } catch (error) {
        console.error("Ошибка при поиске репетитора:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id]);

  if (loading) return <div className="py-20 text-center"><Loader /></div>;

  if (!tutor) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Репетитор не найден</h2>
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b dark:border-gray-700 pb-6 mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tutor.name}</h1>
          <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">{tutor.subject}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{tutor.price} ₽ <span className="text-sm text-gray-500 font-normal">/ час</span></p>
          <p className="text-yellow-500 text-lg">⭐ {tutor.rating}</p>
        </div>
      </header>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">О репетиторе</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Опытный преподаватель по предмету <strong className="text-blue-600 dark:text-blue-400">{tutor.subject}</strong>. Индивидуальный подход к каждому ученику, подготовка к государственным экзаменам и помощь в повышении общей успеваемости.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Отзывы учеников</h3>
        <ReviewSection tutorId={tutor.id} />
      </div>

      <footer className="pt-6 border-t dark:border-gray-700 flex justify-center">
        <Link 
          to="/" 
          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2"
        >
          <span>←</span> Вернуться к поиску
        </Link>
      </footer>
    </div>
  );
}

export default TutorPage;
