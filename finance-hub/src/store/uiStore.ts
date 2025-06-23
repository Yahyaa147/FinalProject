import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  read?: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
  createdAt: Date;
}

interface UIState {
  // Theme and appearance
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  compactMode: boolean;
  
  // Notifications
  notifications: Notification[];
  maxNotifications: number;
  
  // Modals and overlays
  activeModal: string | null;
  modalData: any;
  isLoading: boolean;
  globalLoadingMessage: string;
  
  // User preferences
  language: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'TRY';
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  numberFormat: 'US' | 'EU' | 'UK';
  
  // Layout preferences
  dashboardLayout: 'grid' | 'list' | 'compact';
  newsLayout: 'cards' | 'list' | 'magazine';
  chartType: 'line' | 'candlestick' | 'area';
  
  // Feature flags
  features: {
    darkMode: boolean;
    notifications: boolean;
    analyticsTracking: boolean;
    autoSave: boolean;
    experimentalFeatures: boolean;
  };
  
  // Performance and data
  cacheEnabled: boolean;
  prefetchData: boolean;
  animationsEnabled: boolean;
    // Actions
  setTheme: (theme: UIState['theme']) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setCompactMode: (compact: boolean) => void;
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  markNotificationAsRead: (id: string) => void;
  
  // Modal actions
  openModal: (modalName: string, data?: any) => void;
  closeModal: () => void;
  
  // Loading actions
  setLoading: (loading: boolean, message?: string) => void;
  
  // Preference actions
  setLanguage: (language: string) => void;
  setCurrency: (currency: UIState['currency']) => void;
  setDateFormat: (format: UIState['dateFormat']) => void;
  setNumberFormat: (format: UIState['numberFormat']) => void;
  
  // Layout actions
  setDashboardLayout: (layout: UIState['dashboardLayout']) => void;
  setNewsLayout: (layout: UIState['newsLayout']) => void;
  setChartType: (type: UIState['chartType']) => void;
  
  // Feature flag actions
  toggleFeature: (feature: keyof UIState['features']) => void;
  setFeature: (feature: keyof UIState['features'], enabled: boolean) => void;
  
  // Performance actions
  setCacheEnabled: (enabled: boolean) => void;
  setPrefetchData: (enabled: boolean) => void;
  setAnimationsEnabled: (enabled: boolean) => void;
  
  // Getters
  getActiveNotifications: () => Notification[];
  getUnreadNotificationsCount: () => number;
  isModalOpen: (modalName: string) => boolean;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({        // Initial state
        theme: 'light',
        sidebarCollapsed: false,
        compactMode: false,
        notifications: [],
        maxNotifications: 5,
        activeModal: null,
        modalData: null,
        isLoading: false,
        globalLoadingMessage: '',
        language: 'en',
        currency: 'USD',
        dateFormat: 'MM/DD/YYYY',
        numberFormat: 'US',
        dashboardLayout: 'grid',
        newsLayout: 'cards',
        chartType: 'line',
        features: {
          darkMode: true,
          notifications: true,
          analyticsTracking: true,
          autoSave: true,
          experimentalFeatures: false
        },
        cacheEnabled: true,
        prefetchData: true,
        animationsEnabled: true,
          // Theme actions
        setTheme: (theme) => set({ theme }),
          toggleTheme: () => set((state) => ({ 
          theme: state.theme === 'dark' ? 'light' : 'dark'
        })),
        
        toggleSidebar: () => set((state) => ({ 
          sidebarCollapsed: !state.sidebarCollapsed 
        })),
        
        setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
        
        setCompactMode: (compact) => set({ compactMode: compact }),
        
        // Notification actions
        addNotification: (notification) => set((state) => {
          const newNotification: Notification = {
            ...notification,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            createdAt: new Date()
          };
          
          const updatedNotifications = [newNotification, ...state.notifications]
            .slice(0, state.maxNotifications);
          
          return { notifications: updatedNotifications };
        }),
        
        removeNotification: (id) => set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        })),
        
        clearAllNotifications: () => set({ notifications: [] }),
        
        markNotificationAsRead: (id) => set((state) => ({
          notifications: state.notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
          )
        })),
        
        // Modal actions
        openModal: (modalName, data) => set({ 
          activeModal: modalName, 
          modalData: data 
        }),
        
        closeModal: () => set({ 
          activeModal: null, 
          modalData: null 
        }),
        
        // Loading actions
        setLoading: (loading, message = '') => set({ 
          isLoading: loading,
          globalLoadingMessage: message 
        }),
        
        // Preference actions
        setLanguage: (language) => set({ language }),
        setCurrency: (currency) => set({ currency }),
        setDateFormat: (dateFormat) => set({ dateFormat }),
        setNumberFormat: (numberFormat) => set({ numberFormat }),
        
        // Layout actions
        setDashboardLayout: (dashboardLayout) => set({ dashboardLayout }),
        setNewsLayout: (newsLayout) => set({ newsLayout }),
        setChartType: (chartType) => set({ chartType }),
        
        // Feature flag actions
        toggleFeature: (feature) => set((state) => ({
          features: {
            ...state.features,
            [feature]: !state.features[feature]
          }
        })),
        
        setFeature: (feature, enabled) => set((state) => ({
          features: {
            ...state.features,
            [feature]: enabled
          }
        })),
        
        // Performance actions
        setCacheEnabled: (enabled) => set({ cacheEnabled: enabled }),
        setPrefetchData: (enabled) => set({ prefetchData: enabled }),
        setAnimationsEnabled: (enabled) => set({ animationsEnabled: enabled }),
        
        // Getters
        getActiveNotifications: () => {
          const state = get();
          return state.notifications.filter(n => !n.read);
        },
        
        getUnreadNotificationsCount: () => {
          const state = get();
          return state.notifications.filter(n => !n.read).length;
        },
        
        isModalOpen: (modalName) => {
          const state = get();
          return state.activeModal === modalName;
        }
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({
          theme: state.theme,
          sidebarCollapsed: state.sidebarCollapsed,
          compactMode: state.compactMode,
          language: state.language,
          currency: state.currency,
          dateFormat: state.dateFormat,
          numberFormat: state.numberFormat,
          dashboardLayout: state.dashboardLayout,
          newsLayout: state.newsLayout,
          chartType: state.chartType,
          features: state.features,
          cacheEnabled: state.cacheEnabled,
          prefetchData: state.prefetchData,
          animationsEnabled: state.animationsEnabled
        })
      }
    )
  )
);
