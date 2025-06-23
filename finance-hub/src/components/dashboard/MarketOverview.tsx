import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Globe,
  Calendar,
  Clock,
  Activity
} from 'lucide-react';
import { formatCurrency, formatPercentage, getGainLossColor } from '../../utils/helpers';
import type { MarketData } from '../../types';

interface MarketOverviewProps {
  marketData?: MarketData[]; // Optional for now, using mock data
  className?: string;
}

interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface EconomicIndicator {
  name: string;
  value: string;
  change: string;
  status: 'positive' | 'negative' | 'neutral';
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState<'indices' | 'commodities' | 'economics'>('indices');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for enhanced market overview
  const marketIndices: MarketIndex[] = [
    { symbol: 'S&P 500', name: 'S&P 500', price: 4785.32, change: 23.45, changePercent: 0.49 },
    { symbol: 'NASDAQ', name: 'NASDAQ Composite', price: 15234.87, change: -12.34, changePercent: -0.08 },
    { symbol: 'DOW', name: 'Dow Jones', price: 37892.45, change: 145.23, changePercent: 0.38 },
    { symbol: 'RUSSELL', name: 'Russell 2000', price: 2087.65, change: -8.92, changePercent: -0.43 }
  ];

  const commodities: MarketIndex[] = [
    { symbol: 'GOLD', name: 'Gold (oz)', price: 2034.50, change: 12.30, changePercent: 0.61 },
    { symbol: 'OIL', name: 'Crude Oil (bbl)', price: 78.45, change: -1.25, changePercent: -1.57 },
    { symbol: 'SILVER', name: 'Silver (oz)', price: 24.67, change: 0.45, changePercent: 1.86 },
    { symbol: 'COPPER', name: 'Copper (lb)', price: 3.89, change: 0.02, changePercent: 0.52 }
  ];

  const economicIndicators: EconomicIndicator[] = [
    { name: 'Unemployment Rate', value: '3.8%', change: '+0.1%', status: 'negative' },
    { name: 'Inflation (CPI)', value: '2.8%', change: '-0.2%', status: 'positive' },
    { name: 'GDP Growth', value: '2.4%', change: '+0.1%', status: 'positive' },
    { name: 'Fed Funds Rate', value: '5.25%', change: '0%', status: 'neutral' }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'indices':
        return marketIndices;
      case 'commodities':
        return commodities;
      case 'economics':
        return economicIndicators.map(indicator => ({
          symbol: indicator.name,
          name: indicator.name,
          price: parseFloat(indicator.value.replace('%', '')),
          change: parseFloat(indicator.change.replace('%', '')),
          changePercent: parseFloat(indicator.change.replace('%', '')),
          value: indicator.value,
          status: indicator.status
        }));
      default:
        return marketIndices;
    }
  };

  const refreshData = () => {
    setLastUpdated(new Date());
    // Here you would typically refresh the actual data
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'indices':
        return <BarChart3 className="h-4 w-4" />;
      case 'commodities':
        return <Globe className="h-4 w-4" />;
      case 'economics':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-colors duration-300 ${className}`}>
      <div className="bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-indigo-50 dark:to-indigo-900/20 p-6 border-b border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center transition-colors duration-300">
              <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 transition-colors duration-300" />
              Market Overview
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex items-center transition-colors duration-300">
              <Clock className="h-3 w-3 mr-1" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={refreshData}
              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <Link 
              to="/discover"
              className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Explore Markets
            </Link>
          </div>
        </div>
          {/* Tabs */}
        <div className="flex mt-4 space-x-1 bg-white dark:bg-gray-700 rounded-lg p-1 transition-colors duration-300">
          {[
            { key: 'indices', label: 'Indices' },
            { key: 'commodities', label: 'Commodities' },
            { key: 'economics', label: 'Economics' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              {getTabIcon(tab.key)}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
        <div className="p-6">
        <div className="space-y-3">
          {getCurrentData().map((item) => (
            <div key={item.symbol} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                  activeTab === 'indices' ? 'bg-gradient-to-r from-blue-500 to-purple-600' :
                  activeTab === 'commodities' ? 'bg-gradient-to-r from-orange-500 to-red-600' :
                  'bg-gradient-to-r from-green-500 to-teal-600'
                }`}>
                  <span className="text-white font-bold text-sm">
                    {item.symbol.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{item.symbol}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    {activeTab === 'economics' ? (item as any).value : formatCurrency(item.price)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold flex items-center justify-end ${getGainLossColor(item.change)}`}>
                  {item.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {activeTab === 'economics' ? (item as any).change : formatCurrency(Math.abs(item.change))}
                </p>
                <p className={`text-sm font-medium ${getGainLossColor(item.change)}`}>
                  {formatPercentage(Math.abs(item.changePercent))}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Market Status Indicator */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 dark:from-green-900/20 to-blue-50 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-700/50 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300">Market Open</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Next close: 4:00 PM EST
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
