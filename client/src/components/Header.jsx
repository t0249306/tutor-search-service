import { useStore } from '../store/useStore';

function Header() {
  const { theme, toggleTheme, user, isAuthenticated, isLoggingIn, login, logout } = useStore();

  return (
    <header className="mb-12">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm transition-all duration-300">
        
        {/* Левый блок - теперь такой же ширины как правый для центровки */}
        <div className="flex-1 flex justify-start">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:scale-110 active:scale-95 transition-all text-xl shadow-inner border border-transparent dark:border-gray-600"
            title="Сменить тему"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Центр: Заголовок */}
        <div className="flex-[2] text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Поиск <span className="text-blue-600 dark:text-blue-500">репетиторов</span>
          </h1>
        </div>

        {/* Правый блок - flex-1 уравновешивает левую сторону */}
        <div className="flex-1 flex justify-end">
          <div className="min-w-[120px] flex justify-end">
            {isLoggingIn ? (
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold animate-pulse">
                <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                <span className="hidden sm:inline">Вход...</span>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="hidden lg:inline text-gray-600 dark:text-gray-400 text-sm">
                  Привет, <strong className="text-blue-600 dark:text-blue-400">{user?.name}</strong>
                </span>
                <button 
                  onClick={logout}
                  className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors border border-red-100 dark:border-red-900/30"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <button 
                onClick={() => login('Олег')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
