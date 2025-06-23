import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  Star,
  StarOff,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { formatCurrency, formatPercentage, getGainLossColor } from '../../utils/helpers';

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  isWatched: boolean;
}

interface WatchlistWidgetProps {
  className?: string;
}

const WatchlistWidget: React.FC<WatchlistWidgetProps> = ({ className = "" }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock data for watchlist
  const mockWatchlist: WatchlistItem[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 182.45,
      change: 2.34,
      changePercent: 1.30,
      volume: 45234000,
      isWatched: true
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 378.92,
      change: -3.21,
      changePercent: -0.84,
      volume: 23456000,
      isWatched: true
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 142.67,
      change: 1.89,
      changePercent: 1.34,
      volume: 18765000,
      isWatched: true
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 248.50,
      change: -12.45,
      changePercent: -4.77,
      volume: 98234000,
      isWatched: true
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 894.32,
      change: 18.76,
      changePercent: 2.14,
      volume: 34567000,
      isWatched: false
    }
  ];

  useEffect(() => {
    // Initialize with mock data or fetch from API
    setWatchlist(mockWatchlist.filter(item => item.isWatched));
  }, []);

  const refreshWatchlist = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would fetch actual data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh watchlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWatch = (symbol: string) => {
    setWatchlist(prev => prev.map(item =>
      item.symbol === symbol
        ? { ...item, isWatched: !item.isWatched }
        : item
    ).filter(item => item.isWatched));
  };

  const addToWatchlist = () => {
    // In a real app, this would open a modal to add new symbols
    const newSymbol = mockWatchlist.find(item => !item.isWatched);
    if (newSymbol) {
      setWatchlist(prev => [...prev, { ...newSymbol, isWatched: true }]);
    }
  };

  const getVolumeColor = (volume: number) => {
    if (volume > 50000000) return 'text-red-600';
    if (volume > 25000000) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getAlertIcon = (changePercent: number) => {
    if (Math.abs(changePercent) > 5) {
      return <AlertTriangle className="h-3 w-3 text-orange-500" />;
    }
    return null;
  };
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-colors duration-300 ${className}`}>
      <div className="bg-gradient-to-r from-cyan-50 dark:from-cyan-900/20 to-blue-50 dark:to-blue-900/20 p-6 border-b border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center transition-colors duration-300">
              <Eye className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mr-2 transition-colors duration-300" />
              Watchlist
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center transition-colors duration-300">
              <span className="mr-2">Last updated: {lastUpdated.toLocaleTimeString()}</span>
              {isLoading && <RefreshCw className="h-3 w-3 animate-spin" />}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={refreshWatchlist}
              disabled={isLoading}
              className="p-2 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded-lg transition-colors disabled:opacity-50"
              title="Refresh watchlist"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={addToWatchlist}
              className="p-2 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded-lg transition-colors"
              title="Add to watchlist"
            >
              <Plus className="h-4 w-4" />
            </button>
            <Link
              to="/discover"
              className="px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">        {watchlist.length === 0 ? (
          <div className="text-center py-8">
            <Eye className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4 transition-colors duration-300" />
            <p className="text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-300">Your watchlist is empty</p>
            <button
              onClick={addToWatchlist}
              className="px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Add Stocks to Watch
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {watchlist.map((item) => (
              <div key={item.symbol} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleWatch(item.symbol)}
                    className="text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors"
                  >
                    {item.isWatched ? (
                      <Star className="h-4 w-4 fill-current" />
                    ) : (
                      <StarOff className="h-4 w-4" />
                    )}
                  </button>
                  
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {item.symbol.charAt(0)}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{item.symbol}</p>
                      {getAlertIcon(item.changePercent)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px] transition-colors duration-300">
                      {item.name}
                    </p>
                    {item.volume && (
                      <p className={`text-xs font-medium ${getVolumeColor(item.volume)}`}>
                        Vol: {(item.volume / 1000000).toFixed(1)}M
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    {formatCurrency(item.price)}
                  </p>
                  <div className={`flex items-center justify-end space-x-1 ${getGainLossColor(item.change)}`}>
                    {item.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span className="text-sm font-medium">
                      {formatCurrency(Math.abs(item.change))}
                    </span>
                  </div>
                  <p className={`text-sm font-medium ${getGainLossColor(item.change)}`}>
                    {formatPercentage(Math.abs(item.changePercent))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}        {/* Quick Add Popular Stocks */}
        {watchlist.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 dark:from-cyan-900/20 to-blue-50 dark:to-blue-900/20 rounded-xl border border-cyan-200 dark:border-cyan-700/50 transition-colors duration-300">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center transition-colors duration-300">
              <Star className="h-4 w-4 text-cyan-600 dark:text-cyan-400 mr-2 transition-colors duration-300" />
              Popular Stocks to Watch
            </h3>
            <div className="flex flex-wrap gap-2">
              {['BTC-USD', 'ETH-USD', 'SPY', 'QQQ', 'AMC'].map(symbol => (
                <button
                  key={symbol}
                  onClick={() => {
                    // Add to watchlist logic would go here
                    console.log(`Adding ${symbol} to watchlist`);
                  }}
                  className="px-3 py-1 text-xs font-medium bg-white dark:bg-gray-700 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-600 rounded-full hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors"
                >
                  + {symbol}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistWidget;
