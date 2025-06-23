import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, RefreshCw, AlertCircle, Clock } from 'lucide-react';
import { useStockSearch, useStockQuote, useRateLimitInfo } from '../../hooks/useAlphaVantage';

interface RealTimeStockWidgetProps {
  className?: string;
}

const RealTimeStockWidget: React.FC<RealTimeStockWidgetProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL'); // Default to Apple
  const [watchlist, setWatchlist] = useState<string[]>(['AAPL', 'MSFT', 'GOOGL']);
  
  const { data: searchResults, loading: searchLoading, searchStocks } = useStockSearch();
  const { data: currentStock, loading: quoteLoading, error: quoteError, refetch } = useStockQuote(selectedSymbol);
  const rateLimitInfo = useRateLimitInfo();

  // Auto-refresh every 60 seconds for selected stock
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedSymbol && rateLimitInfo.remainingCalls > 0) {
        refetch();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [selectedSymbol, refetch, rateLimitInfo.remainingCalls]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 1) {
      searchStocks(term);
    }
  };

  const selectStock = (symbol: string) => {
    setSelectedSymbol(symbol);
    setSearchTerm('');
    
    // Add to watchlist if not already there
    if (!watchlist.includes(symbol)) {
      setWatchlist(prev => [...prev.slice(-4), symbol]); // Keep last 5 symbols
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Real-Time Stock Data</h3>
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
        
        {/* Rate Limit Info */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{rateLimitInfo.remainingCalls} calls left</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search stocks (e.g., AAPL, Microsoft, Tesla...)"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
          />
        </div>
        
        {/* Search Results */}
        {searchTerm && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchResults.slice(0, 8).map((result) => (
              <button
                key={result['1. symbol']}
                onClick={() => selectStock(result['1. symbol'])}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
              >
                <div className="font-semibold text-gray-900 dark:text-white">{result['1. symbol']}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 truncate">{result['2. name']}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{result['4. region']} • {result['8. currency']}</div>
              </button>
            ))}
          </div>
        )}
        
        {searchLoading && (
          <div className="absolute right-3 top-3">
            <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
          </div>
        )}
      </div>

      {/* Watchlist Quick Access */}
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Access</div>
        <div className="flex flex-wrap gap-2">
          {watchlist.map((symbol) => (
            <button
              key={symbol}
              onClick={() => selectStock(symbol)}
              className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                selectedSymbol === symbol
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Current Stock Data */}
      {quoteLoading ? (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading stock data...</span>
        </div>
      ) : quoteError ? (
        <div className="flex items-center justify-center py-8 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{quoteError}</span>
        </div>
      ) : currentStock && currentStock.symbol ? (
        <div className="space-y-4">
          {/* Stock Header */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{currentStock.symbol}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last updated: {currentStock.lastUpdated}</p>
            </div>
            <button
              onClick={refetch}
              disabled={rateLimitInfo.remainingCalls === 0}
              className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh data"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Price Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Current Price</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {formatPrice(currentStock.price)}
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Change</div>
              <div className={`text-xl font-bold ${
                currentStock.change >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {currentStock.change >= 0 ? '+' : ''}{formatPrice(currentStock.change)}
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Change %</div>
              <div className={`text-xl font-bold ${
                currentStock.changePercent >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {currentStock.changePercent >= 0 ? '+' : ''}{currentStock.changePercent.toFixed(2)}%
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Volume</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {formatVolume(currentStock.volume)}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Open: </span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(currentStock.open)}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">High: </span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(currentStock.high)}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Low: </span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(currentStock.low)}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Previous Close: </span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(currentStock.previousClose)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Search for a stock symbol to view real-time data
        </div>
      )}

      {/* API Usage Warning */}
      {rateLimitInfo.remainingCalls <= 2 && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" />
            <span className="text-sm text-yellow-800 dark:text-yellow-200">
              {rateLimitInfo.remainingCalls === 0 
                ? 'API rate limit reached. Data will refresh in about a minute.'
                : `Only ${rateLimitInfo.remainingCalls} API calls remaining. Use wisely!`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeStockWidget;
