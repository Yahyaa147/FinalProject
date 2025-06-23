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
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden ${className}`}>
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
            <div key={index} className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className={`mx-auto w-12 h-12 bg-${metric.color}-100 rounded-full flex items-center justify-center mb-3`}>
                <div className={`text-${metric.color}-600`}>
                  {metric.icon}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
              <div className={`flex items-center justify-center space-x-1 ${getGainLossColor(metric.change)}`}>
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
        </div>

        {/* Market Status Banner */}
        <div className={`mt-6 p-4 rounded-xl border ${
          isMarketOpen 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              <span className="font-medium text-gray-900">
                {isMarketOpen ? 'Active Trading Session' : 'Pre/After Market Trading'}
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {isMarketOpen 
                ? 'Regular hours: 9:30 AM - 4:00 PM EST'
                : 'Next open: Tomorrow 9:30 AM EST'
              }
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Advancing</p>
            <p className="text-lg font-bold text-green-600">1,847</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Declining</p>
            <p className="text-lg font-bold text-red-600">1,523</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">New Highs</p>
            <p className="text-lg font-bold text-blue-600">234</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">New Lows</p>
            <p className="text-lg font-bold text-purple-600">89</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSummary;
