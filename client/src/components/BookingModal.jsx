import { useState } from 'react';
import { createBooking } from '../api/api';

export default function BookingModal({ tutorId, onClose }) {
  const [formData, setFormData] = useState({ studentName: '', contact: '', time: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await createBooking({ tutorId, ...formData });
      setSuccess(true);
    } catch (err) {
      setError('Ошибка при оформлении записи');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Запись к репетитору</h2>
        
        {success ? (
          <div className="text-center py-4">
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <p className="text-gray-800 font-medium mb-6 text-lg">Вы успешно записаны!</p>
            <button 
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors w-full"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
              <input 
                required
                type="text" 
                value={formData.studentName}
                onChange={e => setFormData({...formData, studentName: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Контакт (телефон/email)</label>
              <input 
                required
                type="text" 
                value={formData.contact}
                onChange={e => setFormData({...formData, contact: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Желаемое время</label>
              <input 
                required
                type="text" 
                placeholder="Например: Пн, 15:00"
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors flex-1 font-medium"
              >
                Отмена
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-50 transition-colors flex-1 font-medium"
              >
                {loading ? 'Отправка...' : 'Отправить'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}