import axios from 'axios';
import type { 
  AlphaVantageGlobalQuoteResponse, 
  AlphaVantageSearchResponse, 
  StockData, 
  StockSearchResult,
  ApiResponse 
} from '../types';

class RateLimiter {
  private calls: number = 0;
  private resetTime: number = Date.now() + 60000; // Reset every minute
  private readonly maxCalls: number = 5; // Conservative limit to preserve API calls

  canMakeCall(): boolean {
    if (Date.now() > this.resetTime) {
      this.calls = 0;
      this.resetTime = Date.now() + 60000;
    }
    
    if (this.calls >= this.maxCalls) {
      return false;
    }
    
    this.calls++;
    return true;
  }

  getRemainingCalls(): number {
    if (Date.now() > this.resetTime) {
      return this.maxCalls;
    }
    return Math.max(0, this.maxCalls - this.calls);
  }

  getResetTime(): number {
    return this.resetTime;
  }
}

export class AlphaVantageService {
  private static readonly API_KEY = 'O8OHSGW92BZ159PG';
  private static readonly BASE_URL = 'https://www.alphavantage.co/query';
  private static rateLimiter = new RateLimiter();

  // Cache to reduce API calls
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static readonly CACHE_DURATION = 60000; // 1 minute cache

  private static getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private static setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  static async getGlobalQuote(symbol: string): Promise<ApiResponse<StockData>> {
    const cacheKey = `quote_${symbol}`;
    const cached = this.getFromCache<StockData>(cacheKey);
    
    if (cached) {
      return {
        data: cached,
        success: true,
        message: 'Data retrieved from cache'
      };
    }

    if (!this.rateLimiter.canMakeCall()) {
      return {
        data: {} as StockData,
        success: false,
        error: `Rate limit exceeded. ${this.rateLimiter.getRemainingCalls()} calls remaining. Reset in ${Math.ceil((this.rateLimiter.getResetTime() - Date.now()) / 1000)} seconds.`
      };
    }

    try {
      const response = await axios.get<AlphaVantageGlobalQuoteResponse>(this.BASE_URL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: this.API_KEY
        },
        timeout: 10000
      });

      if (response.data['Global Quote']) {
        const quote = response.data['Global Quote'];
        const stockData: StockData = {
          symbol: quote['01. symbol'],
          name: symbol, // Alpha Vantage doesn't provide company name in GLOBAL_QUOTE
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
          volume: parseInt(quote['06. volume']),
          open: parseFloat(quote['02. open']),
          high: parseFloat(quote['03. high']),
          low: parseFloat(quote['04. low']),
          previousClose: parseFloat(quote['08. previous close']),
          lastUpdated: quote['07. latest trading day']
        };

        this.setCache(cacheKey, stockData);

        return {
          data: stockData,
          success: true,
          message: 'Stock data fetched successfully'
        };
      } else {
        return {
          data: {} as StockData,
          success: false,
          error: 'Invalid symbol or API response'
        };
      }
    } catch (error) {
      console.error('Alpha Vantage API error:', error);
      return {
        data: {} as StockData,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch stock data'
      };
    }
  }

  static async searchSymbols(keywords: string): Promise<ApiResponse<StockSearchResult[]>> {
    const cacheKey = `search_${keywords}`;
    const cached = this.getFromCache<StockSearchResult[]>(cacheKey);
    
    if (cached) {
      return {
        data: cached,
        success: true,
        message: 'Search results retrieved from cache'
      };
    }

    if (!this.rateLimiter.canMakeCall()) {
      return {
        data: [],
        success: false,
        error: `Rate limit exceeded. ${this.rateLimiter.getRemainingCalls()} calls remaining.`
      };
    }

    try {
      const response = await axios.get<AlphaVantageSearchResponse>(this.BASE_URL, {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords: keywords,
          apikey: this.API_KEY
        },
        timeout: 10000
      });

      const results = response.data.bestMatches || [];
      this.setCache(cacheKey, results);

      return {
        data: results,
        success: true,
        message: 'Search completed successfully'
      };
    } catch (error) {
      console.error('Alpha Vantage search error:', error);
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search symbols'
      };
    }
  }

  static async getMultipleQuotes(symbols: string[]): Promise<ApiResponse<StockData[]>> {
    const results: StockData[] = [];
    const errors: string[] = [];

    // Limit concurrent requests to respect API limits
    const batchSize = 2;
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      const promises = batch.map(symbol => this.getGlobalQuote(symbol));
      const responses = await Promise.all(promises);

      responses.forEach((response, index) => {
        if (response.success && response.data.symbol) {
          results.push(response.data);
        } else {
          errors.push(`${batch[index]}: ${response.error}`);
        }
      });

      // Add delay between batches to respect rate limits
      if (i + batchSize < symbols.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return {
      data: results,
      success: results.length > 0,
      message: errors.length > 0 ? `Some symbols failed: ${errors.join(', ')}` : 'All quotes fetched successfully',
      error: errors.length === symbols.length ? 'All requests failed' : undefined
    };
  }

  static getRateLimitInfo() {
    return {
      remainingCalls: this.rateLimiter.getRemainingCalls(),
      resetTime: this.rateLimiter.getResetTime()
    };
  }
}
