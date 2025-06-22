import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Asset, Transaction, Portfolio, User } from '../types';
import { mockAssets, mockTransactions } from '../data/mockData';

interface PortfolioState {
  // Portfolio state
  portfolio: Portfolio | null;
  assets: Asset[];
  transactions: Transaction[];
  
  // User state
  user: User | null;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Portfolio actions
  setPortfolio: (portfolio: Portfolio) => void;
  addAsset: (asset: Asset) => void;
  updateAsset: (assetId: string, updates: Partial<Asset>) => void;
  removeAsset: (assetId: string) => void;
  
  // Transaction actions
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transactionId: string, updates: Partial<Transaction>) => void;
  removeTransaction: (transactionId: string) => void;
  
  // User actions
  setUser: (user: User) => void;
  
  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
    // Computed getters
  getTotalPortfolioValue: () => number;
  getTotalCost: () => number;
  getTotalGainLoss: () => number;
  getAssetById: (id: string) => Asset | undefined;
  getAssetBySymbol: (symbol: string) => Asset | undefined;
  getTransactionsByAssetId: (assetId: string) => Transaction[];
}

export const usePortfolioStore = create<PortfolioState>()(
  devtools(
    persist(
      (set, get) => ({        // Initial state with mock data for demo
        portfolio: null,
        assets: mockAssets,
        transactions: mockTransactions,
        user: null,
        isLoading: false,
        error: null,
        
        // Portfolio actions
        setPortfolio: (portfolio) => set({ portfolio }),
        
        addAsset: (asset) => set((state) => ({
          assets: [...state.assets, asset]
        })),
        
        updateAsset: (assetId, updates) => set((state) => ({
          assets: state.assets.map(asset => 
            asset.id === assetId ? { ...asset, ...updates } : asset
          )
        })),
        
        removeAsset: (assetId) => set((state) => ({
          assets: state.assets.filter(asset => asset.id !== assetId),
          transactions: state.transactions.filter(transaction => transaction.assetId !== assetId)
        })),
        
        // Transaction actions
        addTransaction: (transaction) => set((state) => ({
          transactions: [...state.transactions, transaction]
        })),
        
        updateTransaction: (transactionId, updates) => set((state) => ({
          transactions: state.transactions.map(transaction =>
            transaction.id === transactionId ? { ...transaction, ...updates } : transaction
          )
        })),
        
        removeTransaction: (transactionId) => set((state) => ({
          transactions: state.transactions.filter(transaction => transaction.id !== transactionId)
        })),
        
        // User actions
        setUser: (user) => set({ user }),
        
        // Utility actions
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        clearError: () => set({ error: null }),
        
        // Computed getters
        getTotalPortfolioValue: () => {
          const { assets } = get();
          return assets.reduce((total, asset) => total + (asset.currentPrice * asset.quantity), 0);
        },
        
        getTotalCost: () => {
          const { assets } = get();
          return assets.reduce((total, asset) => total + (asset.averageCost * asset.quantity), 0);
        },
        
        getTotalGainLoss: () => {
          const state = get();
          return state.getTotalPortfolioValue() - state.getTotalCost();
        },
          getAssetById: (id) => {
          const { assets } = get();
          return assets.find(asset => asset.id === id);
        },
        
        getAssetBySymbol: (symbol) => {
          const { assets } = get();
          return assets.find(asset => asset.symbol.toLowerCase() === symbol.toLowerCase());
        },
        
        getTransactionsByAssetId: (assetId) => {
          const { transactions } = get();
          return transactions.filter(transaction => transaction.assetId === assetId);
        }
      }),
      {
        name: 'portfolio-storage',
        partialize: (state) => ({
          portfolio: state.portfolio,
          assets: state.assets,
          transactions: state.transactions,
          user: state.user
        })
      }
    )
  )
);
