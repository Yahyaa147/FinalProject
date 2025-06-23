import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Target,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { formatCurrency, formatPercentage, getGainLossColor } from '../../utils/helpers';
import type { Asset } from '../../types';

interface PortfolioPerformanceProps {
  assets: Asset[];
  totalCost: number;
  totalGainLoss: number;
  className?: string;
}

const PortfolioPerformance: React.FC<PortfolioPerformanceProps> = ({
  assets,
  totalCost,
  totalGainLoss,
  className = ""
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  
  const gainLossPercentage = totalCost > 0 ? ((totalGainLoss / totalCost) * 100) : 0;
  
  // Mock performance data for different timeframes
  const performanceData = {
    '1D': { return: 2.34, benchmark: 1.87 },
    '1W': { return: -1.23, benchmark: -0.98 },
    '1M': { return: gainLossPercentage, benchmark: 4.12 },
    '3M': { return: 8.45, benchmark: 6.23 },
    '1Y': { return: 15.67, benchmark: 12.34 }
  };

  const currentPerformance = performanceData[timeframe];
    // Calculate top performers
  const topPerformers = assets
    .map(asset => ({
      ...asset,
      gainLoss: (asset.currentPrice - asset.averageCost) * asset.quantity,
      gainLossPercent: ((asset.currentPrice - asset.averageCost) / asset.averageCost) * 100
    }))
    .sort((a, b) => b.gainLossPercent - a.gainLossPercent)
    .slice(0, 3);

  const worstPerformers = assets
    .map(asset => ({
      ...asset,
      gainLoss: (asset.currentPrice - asset.averageCost) * asset.quantity,
      gainLossPercent: ((asset.currentPrice - asset.averageCost) / asset.averageCost) * 100
    }))
    .sort((a, b) => a.gainLossPercent - b.gainLossPercent)
    .slice(0, 3);

  // Risk metrics (mock data)
  const riskMetrics = {
    sharpeRatio: 1.34,
    beta: 0.87,
    volatility: 14.2,
    maxDrawdown: -8.5
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 text-green-600 mr-2" />
              Portfolio Performance
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Track your investment returns and risk metrics
            </p>
          </div>
          <Link 
            to="/portfolio"
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            View Details
          </Link>
        </div>
        
        {/* Timeframe selector */}
        <div className="flex mt-4 space-x-1 bg-white rounded-lg p-1">
          {(['1D', '1W', '1M', '3M', '1Y'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeframe === period
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        {/* Performance Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Portfolio Return</p>
                <p className={`text-2xl font-bold ${getGainLossColor(currentPerformance.return)}`}>
                  {formatPercentage(currentPerformance.return)}
                </p>
              </div>
              {currentPerformance.return >= 0 ? (
                <ArrowUpRight className="h-8 w-8 text-green-500" />
              ) : (
                <ArrowDownRight className="h-8 w-8 text-red-500" />
              )}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">vs S&P 500</p>
                <p className={`text-2xl font-bold ${getGainLossColor(currentPerformance.return - currentPerformance.benchmark)}`}>
                  {formatPercentage(currentPerformance.return - currentPerformance.benchmark)}
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Top/Worst Performers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Top Performers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
              Top Performers
            </h3>
            <div className="space-y-2">
              {topPerformers.map((asset, index) => (
                <div key={asset.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      index === 0 ? 'bg-green-500' : index === 1 ? 'bg-green-400' : 'bg-green-300'
                    }`}>
                      <span className="text-white font-bold text-xs">{asset.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{asset.symbol}</p>
                      <p className="text-xs text-gray-600">{asset.quantity} shares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      +{formatPercentage(asset.gainLossPercent)}
                    </p>
                    <p className="text-xs text-green-500">
                      +{formatCurrency(asset.gainLoss)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Worst Performers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
              Needs Attention
            </h3>
            <div className="space-y-2">
              {worstPerformers.map((asset, index) => (
                <div key={asset.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      index === 0 ? 'bg-red-500' : index === 1 ? 'bg-red-400' : 'bg-red-300'
                    }`}>
                      <span className="text-white font-bold text-xs">{asset.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{asset.symbol}</p>
                      <p className="text-xs text-gray-600">{asset.quantity} shares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">
                      {formatPercentage(asset.gainLossPercent)}
                    </p>
                    <p className="text-xs text-red-500">
                      {formatCurrency(asset.gainLoss)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <BarChart3 className="h-4 w-4 text-purple-500 mr-2" />
            Risk Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{riskMetrics.sharpeRatio}</p>
              <p className="text-xs text-gray-600">Sharpe Ratio</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{riskMetrics.beta}</p>
              <p className="text-xs text-gray-600">Beta</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{riskMetrics.volatility}%</p>
              <p className="text-xs text-gray-600">Volatility</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{riskMetrics.maxDrawdown}%</p>
              <p className="text-xs text-gray-600">Max Drawdown</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPerformance;
