import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Article } from '../types';

interface NewsState {
  // Favorites and reading history
  favoriteArticles: string[]; // Article IDs
  readArticles: string[]; // Article IDs
  bookmarkedArticles: string[]; // Article IDs
  
  // User preferences
  preferredCategories: string[];
  notificationSettings: {
    breakingNews: boolean;
    dailyDigest: boolean;
    priceAlerts: boolean;
    categoryUpdates: string[];
  };
  
  // Reading session
  currentReadingTime: number;
  totalReadingTime: number;
  articlesReadToday: number;
  
  // Search and filters
  searchHistory: string[];
  recentSearches: string[];
  savedSearches: Array<{
    id: string;
    query: string;
    filters: {
      category?: string;
      dateRange?: string;
      source?: string;
    };
    name: string;
    createdAt: Date;
  }>;
  
  // Actions
  addToFavorites: (articleId: string) => void;
  removeFromFavorites: (articleId: string) => void;
  toggleFavorite: (articleId: string) => void;
  
  markAsRead: (articleId: string) => void;
  markAsUnread: (articleId: string) => void;
  
  addBookmark: (articleId: string) => void;
  removeBookmark: (articleId: string) => void;
  toggleBookmark: (articleId: string) => void;
  
  setPreferredCategories: (categories: string[]) => void;
  addPreferredCategory: (category: string) => void;
  removePreferredCategory: (category: string) => void;
  
  updateNotificationSettings: (settings: Partial<NewsState['notificationSettings']>) => void;
  
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  
  saveSearch: (query: string, filters: any, name: string) => void;
  removeSavedSearch: (searchId: string) => void;
  
  incrementReadingTime: (minutes: number) => void;
  incrementArticlesRead: () => void;
  resetDailyStats: () => void;
  
  // Getters
  isFavorite: (articleId: string) => boolean;
  isRead: (articleId: string) => boolean;
  isBookmarked: (articleId: string) => boolean;
  getReadingStats: () => {
    todayArticles: number;
    totalTime: number;
    averageTimePerArticle: number;
  };
}

export const useNewsStore = create<NewsState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        favoriteArticles: [],
        readArticles: [],
        bookmarkedArticles: [],
        preferredCategories: ['stocks', 'crypto'],
        notificationSettings: {
          breakingNews: true,
          dailyDigest: true,
          priceAlerts: true,
          categoryUpdates: ['stocks', 'crypto']
        },
        currentReadingTime: 0,
        totalReadingTime: 0,
        articlesReadToday: 0,
        searchHistory: [],
        recentSearches: [],
        savedSearches: [],
        
        // Favorites actions
        addToFavorites: (articleId) => set((state) => ({
          favoriteArticles: [...new Set([...state.favoriteArticles, articleId])]
        })),
        
        removeFromFavorites: (articleId) => set((state) => ({
          favoriteArticles: state.favoriteArticles.filter(id => id !== articleId)
        })),
        
        toggleFavorite: (articleId) => {
          const state = get();
          if (state.favoriteArticles.includes(articleId)) {
            state.removeFromFavorites(articleId);
          } else {
            state.addToFavorites(articleId);
          }
        },
        
        // Reading actions
        markAsRead: (articleId) => set((state) => ({
          readArticles: [...new Set([...state.readArticles, articleId])]
        })),
        
        markAsUnread: (articleId) => set((state) => ({
          readArticles: state.readArticles.filter(id => id !== articleId)
        })),
        
        // Bookmark actions
        addBookmark: (articleId) => set((state) => ({
          bookmarkedArticles: [...new Set([...state.bookmarkedArticles, articleId])]
        })),
        
        removeBookmark: (articleId) => set((state) => ({
          bookmarkedArticles: state.bookmarkedArticles.filter(id => id !== articleId)
        })),
        
        toggleBookmark: (articleId) => {
          const state = get();
          if (state.bookmarkedArticles.includes(articleId)) {
            state.removeBookmark(articleId);
          } else {
            state.addBookmark(articleId);
          }
        },
        
        // Preferences actions
        setPreferredCategories: (categories) => set({ preferredCategories: categories }),
        
        addPreferredCategory: (category) => set((state) => ({
          preferredCategories: [...new Set([...state.preferredCategories, category])]
        })),
        
        removePreferredCategory: (category) => set((state) => ({
          preferredCategories: state.preferredCategories.filter(cat => cat !== category)
        })),
        
        updateNotificationSettings: (settings) => set((state) => ({
          notificationSettings: { ...state.notificationSettings, ...settings }
        })),
        
        // Search actions
        addToSearchHistory: (query) => set((state) => ({
          searchHistory: [...new Set([query, ...state.searchHistory])].slice(0, 10),
          recentSearches: [...new Set([query, ...state.recentSearches])].slice(0, 5)
        })),
        
        clearSearchHistory: () => set({
          searchHistory: [],
          recentSearches: []
        }),
        
        saveSearch: (query, filters, name) => set((state) => ({
          savedSearches: [...state.savedSearches, {
            id: Date.now().toString(),
            query,
            filters,
            name,
            createdAt: new Date()
          }]
        })),
        
        removeSavedSearch: (searchId) => set((state) => ({
          savedSearches: state.savedSearches.filter(search => search.id !== searchId)
        })),
        
        // Reading stats actions
        incrementReadingTime: (minutes) => set((state) => ({
          currentReadingTime: state.currentReadingTime + minutes,
          totalReadingTime: state.totalReadingTime + minutes
        })),
        
        incrementArticlesRead: () => set((state) => ({
          articlesReadToday: state.articlesReadToday + 1
        })),
        
        resetDailyStats: () => set({
          articlesReadToday: 0,
          currentReadingTime: 0
        }),
        
        // Getters
        isFavorite: (articleId) => {
          const state = get();
          return state.favoriteArticles.includes(articleId);
        },
        
        isRead: (articleId) => {
          const state = get();
          return state.readArticles.includes(articleId);
        },
        
        isBookmarked: (articleId) => {
          const state = get();
          return state.bookmarkedArticles.includes(articleId);
        },
        
        getReadingStats: () => {
          const state = get();
          return {
            todayArticles: state.articlesReadToday,
            totalTime: state.totalReadingTime,
            averageTimePerArticle: state.articlesReadToday > 0 
              ? state.totalReadingTime / state.articlesReadToday 
              : 0
          };
        }
      }),
      {
        name: 'news-storage',
        partialize: (state) => ({
          favoriteArticles: state.favoriteArticles,
          readArticles: state.readArticles,
          bookmarkedArticles: state.bookmarkedArticles,
          preferredCategories: state.preferredCategories,
          notificationSettings: state.notificationSettings,
          totalReadingTime: state.totalReadingTime,
          searchHistory: state.searchHistory,
          savedSearches: state.savedSearches
        })
      }
    )
  )
);
