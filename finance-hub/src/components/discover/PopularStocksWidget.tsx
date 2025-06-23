import React, { useState } from 'react';
import { TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';
import { useMultipleStockQuotes, useRateLimitInfo } from '../../hooks/useAlphaVantage';

const PopularStocksWidget: React.FC = () => {
  const [watchlistSymbols] = useState(['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']);
  const { data: stocks, loading, error, refetch } = useMultipleStockQuotes(watchlistSymbols);
  const rateLimitInfo = useRateLimitInfo();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading popular stocks...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center py-8 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Popular Stocks (Live Data)</h3>
        </div>
        <button
          onClick={refetch}
          disabled={rateLimitInfo.remainingCalls < 5} // Need at least 5 calls for all stocks
          className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title={rateLimitInfo.remainingCalls < 5 ? 'Need 5+ API calls to refresh all' : 'Refresh all stocks'}
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {stock.symbol.slice(0, 2)}
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{stock.symbol}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Last updated: {stock.lastUpdated}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-gray-900 dark:text-white">
                {formatPrice(stock.price)}
              </div>
              <div className={`text-sm font-semibold ${
                stock.change >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {stock.change >= 0 ? '+' : ''}{formatPrice(stock.change)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        ))}
      </div>

      {stocks.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No stock data available. Please check your API connection.
        </div>
      )}

      {rateLimitInfo.remainingCalls <= 5 && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" />
            <span className="text-sm text-yellow-800 dark:text-yellow-200">
              API calls running low ({rateLimitInfo.remainingCalls} remaining). Refresh wisely!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularStocksWidget;
