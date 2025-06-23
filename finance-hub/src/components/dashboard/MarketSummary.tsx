import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Globe,
  Zap,
  Clock
} from 'lucide-react';
import { formatPercentage, getGainLossColor } from '../../utils/helpers';

interface MarketSummaryProps {
  className?: string;
}

interface MarketMetric {
  label: string;
  value: string;
  change: number;
  changePercent: number;
  icon: React.ReactNode;
  color: string;
}

const MarketSummary: React.FC<MarketSummaryProps> = ({ className = "" }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMarketOpen, setIsMarketOpen] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simple market hours check (9:30 AM - 4:00 PM EST)
      const now = new Date();
      const hour = now.getHours();
      const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
      setIsMarketOpen(isWeekday && hour >= 9 && hour < 16);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const marketMetrics: MarketMetric[] = [
    {
      label: 'Market Cap',
      value: '$48.2T',
      change: 0.23,
      changePercent: 0.45,
      icon: <Globe className="h-4 w-4" />,
      color: 'blue'
    },
    {
      label: 'Trading Volume',
      value: '$156.8B',
      change: -2.1,
      changePercent: -1.23,
      icon: <Activity className="h-4 w-4" />,
      color: 'purple'
    },
    {
      label: 'VIX (Fear Index)',
      value: '18.4',
      change: 1.2,
      changePercent: 6.98,
      icon: <Zap className="h-4 w-4" />,
      color: 'orange'
    }
  ];
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-colors duration-300 ${className}`}>
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Live Market Summary
            </h2>
            <p className="text-sm text-blue-200 mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {currentTime.toLocaleTimeString()} EST
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isMarketOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="text-sm font-medium">
              {isMarketOpen ? 'Market Open' : 'Market Closed'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketMetrics.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className={`mx-auto w-12 h-12 bg-${metric.color}-100 dark:bg-${metric.color}-900/30 rounded-full flex items-center justify-center mb-3 transition-colors duration-300`}>
                <div className={`text-${metric.color}-600 dark:text-${metric.color}-400 transition-colors duration-300`}>
                  {metric.icon}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 transition-colors duration-300">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{metric.value}</p>
              <div className={`flex items-center justify-center space-x-1 ${getGainLossColor(metric.change)} ${metric.change >= 0 ? 'dark:text-green-400' : 'dark:text-red-400'} transition-colors duration-300`}>
                {metric.change >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="text-sm font-medium">
                  {formatPercentage(Math.abs(metric.changePercent))}
                </span>
              </div>
            </div>
          ))}
        </div>        {/* Market Status Banner */}
        <div className={`mt-6 p-4 rounded-xl border transition-colors duration-300 ${
          isMarketOpen 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              <span className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                {isMarketOpen ? 'Active Trading Session' : 'Pre/After Market Trading'}
              </span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
              {isMarketOpen 
                ? 'Regular hours: 9:30 AM - 4:00 PM EST'
                : 'Next open: Tomorrow 9:30 AM EST'
              }
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-300">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-300">Advancing</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400 transition-colors duration-300">1,847</p>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg transition-colors duration-300">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-300">Declining</p>
            <p className="text-lg font-bold text-red-600 dark:text-red-400 transition-colors duration-300">1,523</p>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg transition-colors duration-300">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-300">New Highs</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">234</p>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-colors duration-300">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-300">New Lows</p>
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400 transition-colors duration-300">89</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSummary;
