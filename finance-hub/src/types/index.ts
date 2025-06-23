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

// Alpha Vantage API Types
export interface AlphaVantageQuote {
  '01. symbol': string;
  '02. open': string;
  '03. high': string;
  '04. low': string;
  '05. price': string;
  '06. volume': string;
  '07. latest trading day': string;
  '08. previous close': string;
  '09. change': string;
  '10. change percent': string;
}

export interface AlphaVantageGlobalQuoteResponse {
  'Global Quote': AlphaVantageQuote;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  lastUpdated: string;
}

export interface StockSearchResult {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
}

export interface AlphaVantageSearchResponse {
  bestMatches: StockSearchResult[];
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
