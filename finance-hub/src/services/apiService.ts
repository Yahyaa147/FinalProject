import axios from 'axios';
import type { Article, MarketData, ApiResponse } from '../types';
import { mockArticles, mockMarketData } from '../data/mockData';

// Configure axios instance
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with actual API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Simulate API delay for realistic experience
const simulateDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms));

export class ApiService {
  // News API methods
  static async getNews(category?: string): Promise<ApiResponse<Article[]>> {
    try {
      await simulateDelay(800);
      
      // In a real app, this would be an actual API call:
      // const response = await api.get(`/news${category ? `?category=${category}` : ''}`);
      
      // For now, return mock data
      let articles = mockArticles;
      if (category && category !== 'all') {
        articles = mockArticles.filter(article => article.category === category);
      }
      
      return {
        data: articles,
        success: true,
        message: 'News fetched successfully'
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: 'Failed to fetch news'
      };
    }
  }

  static async getArticleById(id: string): Promise<ApiResponse<Article | null>> {
    try {
      await simulateDelay(500);
      
      const article = mockArticles.find(a => a.id === id);
      
      return {
        data: article || null,
        success: !!article,
        message: article ? 'Article found' : 'Article not found'
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        error: 'Failed to fetch article'
      };
    }
  }

  // Market Data API methods
  static async getMarketData(): Promise<ApiResponse<MarketData[]>> {
    try {
      await simulateDelay(600);
      
      // In a real app, this would fetch from a financial data API like Alpha Vantage, IEX Cloud, etc.
      // const response = await api.get('/market-data');
      
      return {
        data: mockMarketData,
        success: true,
        message: 'Market data fetched successfully'
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: 'Failed to fetch market data'
      };
    }
  }

  static async getAssetPrice(symbol: string): Promise<ApiResponse<MarketData | null>> {
    try {
      await simulateDelay(400);
      
      // In a real app:
      // const response = await api.get(`/price/${symbol}`);
      
      const marketData = mockMarketData.find(data => data.symbol === symbol);
      
      return {
        data: marketData || null,
        success: !!marketData,
        message: marketData ? 'Price fetched successfully' : 'Symbol not found'
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        error: 'Failed to fetch asset price'
      };
    }
  }
  // CoinGecko API for crypto prices (example of real API integration)
  static async getCryptoPrices(symbols: string[]): Promise<ApiResponse<MarketData[]>> {
    try {
      // This is an example of how you might integrate with CoinGecko's free API
      // const coinGeckoSymbols = symbols.map(s => s.toLowerCase()).join(',');
      
      // Uncomment for real API usage:
      /*
      const coinGeckoSymbols = symbols.map(s => s.toLowerCase()).join(',');
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoSymbols}&vs_currencies=usd&include_24hr_change=true`
      );
      
      const data = Object.entries(response.data).map(([key, value]: [string, any]) => ({
        symbol: key.toUpperCase(),
        price: value.usd,
        change: (value.usd_24h_change / 100) * value.usd,
        changePercent: value.usd_24h_change,
        lastUpdated: new Date()
      }));
      */
      
      // For now, return mock crypto data
      const cryptoData = mockMarketData.filter(data => 
        symbols.some(symbol => data.symbol.includes(symbol))
      );
      
      return {
        data: cryptoData,
        success: true,
        message: 'Crypto prices fetched successfully'
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: 'Failed to fetch crypto prices'
      };
    }
  }

  // General purpose method for external API calls
  static async makeApiCall<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.request({
        method,
        url: endpoint,
        data
      });

      return {
        data: response.data,
        success: true,
        message: 'Request successful'
      };
    } catch (error: any) {
      return {
        data: null as T,
        success: false,
        error: error.response?.data?.message || error.message || 'API request failed'
      };
    }
  }
}

export default ApiService;
