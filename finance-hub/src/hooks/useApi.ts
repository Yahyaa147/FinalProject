import { useState, useEffect, useCallback } from 'react';
import { ApiService } from '../services/apiService';
import type { ApiResponse } from '../types';

// Generic hook for API calls
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Specialized hooks for different data types
export function useNews(category?: string) {
  return useApi(
    () => ApiService.getNews(category),
    [category]
  );
}

export function useMarketData() {
  return useApi(
    () => ApiService.getMarketData(),
    []
  );
}

export function useCryptoPrices(symbols: string[]) {
  return useApi(
    () => ApiService.getCryptoPrices(symbols),
    [symbols.join(',')]
  );
}

export function useAssetPrice(symbol: string) {
  return useApi(
    () => ApiService.getAssetPrice(symbol),
    [symbol]
  );
}

// Hook for periodic data updates
export function usePeriodicApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  intervalMs: number = 30000, // 30 seconds default
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const response = await apiCall();
      
      if (response.success) {
        setData(response.data);
        setLastUpdated(new Date());
      } else {
        setError(response.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up periodic updates
    const interval = setInterval(fetchData, intervalMs);

    return () => clearInterval(interval);
  }, [fetchData, intervalMs]);

  return { data, loading, error, lastUpdated, refetch: fetchData };
}

// Hook for real-time market data with auto-refresh
export function useRealTimeMarketData(symbols: string[], refreshInterval: number = 30000) {
  return usePeriodicApi(
    () => ApiService.getCryptoPrices(symbols),
    refreshInterval,
    [symbols.join(',')]
  );
}

// Hook for batch API calls
export function useBatchApi<T>(
  apiCalls: Array<() => Promise<ApiResponse<T>>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [partialSuccess, setPartialSuccess] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.batchApiCalls(apiCalls);
      
      setData(response.data);
      setPartialSuccess(!response.success && response.data.length > 0);
      
      if (!response.success && response.data.length === 0) {
        setError(response.error || 'All API calls failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Batch API calls failed');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, partialSuccess, refetch: fetchData };
}

// Hook for API configuration and debugging
export function useApiConfig() {
  const [config] = useState(ApiService.getConfig());
  const [healthStatus, setHealthStatus] = useState<{ status: string; timestamp: Date } | null>(null);
  const [checkingHealth, setCheckingHealth] = useState(false);

  const checkHealth = useCallback(async () => {
    setCheckingHealth(true);
    try {
      const response = await ApiService.checkApiHealth();
      setHealthStatus(response.data);
    } catch (err) {
      setHealthStatus({ status: 'error', timestamp: new Date() });
    } finally {
      setCheckingHealth(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return { config, healthStatus, checkingHealth, checkHealth };
}
