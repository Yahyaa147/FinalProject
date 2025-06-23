import { useState, useEffect, useCallback } from 'react';
import { AlphaVantageService } from '../services/alphaVantageService';
import type { StockData, StockSearchResult } from '../types';

export function useStockQuote(symbol: string) {
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    if (!symbol.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await AlphaVantageService.getGlobalQuote(symbol);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || 'Failed to fetch stock data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    if (symbol) {
      fetchQuote();
    }
  }, [fetchQuote]);

  return { data, loading, error, refetch: fetchQuote };
}

export function useStockSearch() {
  const [data, setData] = useState<StockSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchStocks = useCallback(async (keywords: string) => {
    if (!keywords.trim()) {
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await AlphaVantageService.searchSymbols(keywords);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || 'Failed to search stocks');
        setData([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error occurred');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, searchStocks };
}

export function useMultipleStockQuotes(symbols: string[]) {
  const [data, setData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = useCallback(async () => {
    if (symbols.length === 0) {
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await AlphaVantageService.getMultipleQuotes(symbols);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || 'Failed to fetch stock data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [symbols.join(',')]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  return { data, loading, error, refetch: fetchQuotes };
}

export function useRateLimitInfo() {
  const [rateLimitInfo, setRateLimitInfo] = useState(AlphaVantageService.getRateLimitInfo());

  useEffect(() => {
    const interval = setInterval(() => {
      setRateLimitInfo(AlphaVantageService.getRateLimitInfo());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return rateLimitInfo;
}
