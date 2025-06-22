// Number formatting utilities
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(decimals)}B`;
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(decimals)}M`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(decimals)}K`;
  }
  return num.toFixed(decimals);
};

// Date formatting utilities
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
};

// Portfolio calculation utilities
export const calculateGainLoss = (currentValue: number, cost: number): number => {
  return currentValue - cost;
};

export const calculateGainLossPercentage = (currentValue: number, cost: number): number => {
  if (cost === 0) return 0;
  return ((currentValue - cost) / cost) * 100;
};

export const calculatePortfolioAllocation = (assetValue: number, totalValue: number): number => {
  if (totalValue === 0) return 0;
  return (assetValue / totalValue) * 100;
};

// Compound interest calculator
export interface CompoundInterestResult {
  totalAmount: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: Array<{
    year: number;
    startingAmount: number;
    contributions: number;
    interest: number;
    endingAmount: number;
  }>;
}

export const calculateCompoundInterest = (
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
  compoundFrequency: 'monthly' | 'quarterly' | 'annually' = 'monthly'
): CompoundInterestResult => {
  const frequencyMap = {
    monthly: 12,
    quarterly: 4,
    annually: 1
  };
  
  const n = frequencyMap[compoundFrequency];
  const r = annualRate / 100;
  const t = years;
  
  let currentAmount = principal;
  let totalContributions = principal;
  const yearlyBreakdown = [];
  
  for (let year = 1; year <= t; year++) {
    const startingAmount = currentAmount;
    let yearContributions = 0;
    let yearInterest = 0;
    
    // Calculate month by month for more accurate results
    for (let month = 1; month <= 12; month++) {
      // Add monthly contribution
      currentAmount += monthlyContribution;
      yearContributions += monthlyContribution;
      totalContributions += monthlyContribution;
        // Calculate interest based on frequency
      if (month % (12 / n) === 0 || month === 12) {
        const periodRate = r / n;
        const interest = currentAmount * periodRate;
        currentAmount += interest;
        yearInterest += interest;
      }
    }
    
    yearlyBreakdown.push({
      year,
      startingAmount,
      contributions: yearContributions,
      interest: yearInterest,
      endingAmount: currentAmount
    });
  }
  
  const totalInterest = currentAmount - totalContributions;
  
  return {
    totalAmount: currentAmount,
    totalContributions,
    totalInterest,
    yearlyBreakdown
  };
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidStockSymbol = (symbol: string): boolean => {
  const symbolRegex = /^[A-Z]{1,5}$/;
  return symbolRegex.test(symbol.toUpperCase());
};

export const isValidCryptoSymbol = (symbol: string): boolean => {
  const cryptoRegex = /^[A-Z]{3,10}(-USD)?$/;
  return cryptoRegex.test(symbol.toUpperCase());
};

// Color utilities for charts and UI
export const getGainLossColor = (value: number): string => {
  if (value > 0) return 'text-green-600';
  if (value < 0) return 'text-red-600';
  return 'text-gray-600';
};

export const getGainLossBgColor = (value: number): string => {
  if (value > 0) return 'bg-green-100';
  if (value < 0) return 'bg-red-100';
  return 'bg-gray-100';
};

// String utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ID generation utility
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Local storage utilities
export const setLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};
