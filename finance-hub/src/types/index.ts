// Portfolio Types
export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'etf' | 'bond';
  quantity: number;
  averageCost: number;
  currentPrice: number;
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  assetId: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  date: Date;
  fees?: number;
}

export interface Portfolio {
  id: string;
  name: string;
  assets: Asset[];
  transactions: Transaction[];
  totalValue: number;
  totalCost: number;
  totalGainLoss: number;
}

// News Types
export interface Article {
  id: string;
  title: string;
  summary: string;
  content?: string;
  source: string;
  author?: string;
  date: Date;
  imageUrl?: string;
  category: 'crypto' | 'stocks' | 'macro' | 'general';
  url: string;
  tags?: string[];
}

// Community Types
export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  threadCount: number;
  postCount: number;
  color: string;
  lastActivity: Date;
}

export interface ForumThread {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  author: string;
  userAvatar?: string;
  createdAt: Date;
  replies: number;
  views: number;
  lastActivity: Date;
  isPinned?: boolean;
  isLocked?: boolean;
}

export interface ForumPost {
  id: string;
  threadId: string;
  content: string;
  author: string;
  userAvatar?: string;
  date: Date;
  parentPostId?: string;
  likes: number;
}

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  bio?: string;
  portfolioIds: string[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Form Types
export interface TransactionFormData {
  assetSymbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  date: string;
  fees?: number;
}

export interface CompoundInterestFormData {
  principal: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
  compoundFrequency: 'monthly' | 'quarterly' | 'annually';
}

// Market Data Types
export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: number;
  lastUpdated: Date;
}

// Chart Data Types
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

// Navigation Types
export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}
