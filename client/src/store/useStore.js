import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import TutorsService from '../shared/api/TutorsService';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const useStore = create(
  persist(
    (set) => ({
      // --- API Data Block ---
      tutors: [],
      isLoading: false,
      error: null,

      fetchTutors: async () => {
        set({ isLoading: true, error: null });
        await timeout(3000);
        try {
          const data = await TutorsService.getAll();
          set({ tutors: data, isLoading: false });
        } catch (err) {
          set({ 
            error: err.message || 'Ошибка сети при загрузке репетиторов', 
            isLoading: false 
          });
        }
      },

      // --- Theme Block ---
      theme: 'light',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),

      // --- Auth Block ---
      user: null,
      isAuthenticated: false,
      isLoggingIn: false,
      login: async (name) => {
        set({ isLoggingIn: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({ user: { name }, isAuthenticated: true, isLoggingIn: false });
      },
      logout: () => set({ user: null, isAuthenticated: false }),

      // --- Profile Block ---
      favorites: [],
      addFavorite: (id) => set((state) => ({
        favorites: state.favorites.includes(id)
          ? state.favorites.filter((favId) => favId !== id)
          : [...state.favorites, id]
      })),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'tutor-app-storage',
      partialize: (state) => ({ 
        theme: state.theme, 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
