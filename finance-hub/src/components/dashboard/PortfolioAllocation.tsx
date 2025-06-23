import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PieChart, 
  Target,
  Info
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/helpers';
import type { Asset } from '../../types';

interface PortfolioAllocationProps {
  assets: Asset[];
  className?: string;
}

interface AllocationData {
  sector: string;
  value: number;
  percentage: number;
  color: string;
  count: number;
}

const PortfolioAllocation: React.FC<PortfolioAllocationProps> = ({ 
  assets, 
  className = "" 
}) => {
  const [viewType, setViewType] = useState<'sector' | 'type'>('sector');

  const totalValue = assets.reduce((sum, asset) => sum + (asset.currentPrice * asset.quantity), 0);

  // Helper function to map asset types to sectors
  const getSectorFromType = (type: string): string => {
    const sectorMap: Record<string, string> = {
      'stock': 'Equity',
      'crypto': 'Cryptocurrency',
      'etf': 'Exchange Traded Fund',
      'bond': 'Fixed Income'
    };
    return sectorMap[type] || 'Other';
  };

  // Group assets by sector/type
  const getSectorData = (): AllocationData[] => {
    const sectorMap = new Map<string, { value: number; count: number }>();
      assets.forEach(asset => {
      // For now, we'll use type as sector since sector is not defined in Asset interface
      const key = viewType === 'sector' ? getSectorFromType(asset.type) : asset.type;
      const value = asset.currentPrice * asset.quantity;
      
      if (sectorMap.has(key)) {
        const existing = sectorMap.get(key)!;
        sectorMap.set(key, { 
          value: existing.value + value, 
          count: existing.count + 1 
        });
      } else {
        sectorMap.set(key, { value, count: 1 });
      }
    });

    const colors = [
      '#3B82F6', // blue
      '#10B981', // green
      '#F59E0B', // amber
      '#EF4444', // red
      '#8B5CF6', // purple
      '#F97316', // orange
      '#06B6D4', // cyan
      '#84CC16', // lime
      '#EC4899', // pink
      '#6B7280'  // gray
    ];

    return Array.from(sectorMap.entries())
      .map(([sector, data], index) => ({
        sector,
        value: data.value,
        percentage: (data.value / totalValue) * 100,
        color: colors[index % colors.length],
        count: data.count
      }))
      .sort((a, b) => b.value - a.value);
  };

  const allocationData = getSectorData();

  // Risk assessment based on allocation
  const getRiskLevel = () => {
    const maxAllocation = Math.max(...allocationData.map(item => item.percentage));
    if (maxAllocation > 40) return { level: 'High', color: 'text-red-600', bg: 'bg-red-50' };
    if (maxAllocation > 25) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const riskLevel = getRiskLevel();

  // Target allocations for comparison
  const targetAllocations = {
    sector: {
      'Technology': 25,
      'Healthcare': 15,
      'Financial': 15,
      'Consumer': 15,
      'Industrial': 10,
      'Energy': 5,
      'Other': 15
    },
    type: {
      'stock': 70,
      'etf': 20,
      'bond': 10
    }
  };

  const currentTargets = targetAllocations[viewType] || {};
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-colors duration-300 ${className}`}>
      <div className="bg-gradient-to-r from-indigo-50 dark:from-indigo-900/20 to-purple-50 dark:to-purple-900/20 p-6 border-b border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center transition-colors duration-300">
              <PieChart className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2 transition-colors duration-300" />
              Portfolio Allocation
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">
              Analyze your investment distribution and diversification
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewType(viewType === 'sector' ? 'type' : 'sector')}
              className="px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
            >
              View by {viewType === 'sector' ? 'Type' : 'Sector'}
            </button>
            <Link 
              to="/portfolio"
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors"
            >
              Rebalance
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart Visualization */}
          <div className="relative">
            <div className="w-48 h-48 mx-auto relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {allocationData.reduce((acc, item, index) => {
                  const startAngle = acc.currentAngle;
                  const angleSize = (item.percentage / 100) * 360;
                  const endAngle = startAngle + angleSize;
                  
                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                  
                  const largeArcFlag = angleSize > 180 ? 1 : 0;
                  
                  const pathData = [
                    `M 50 50`,
                    `L ${x1} ${y1}`,
                    `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ');

                  acc.elements.push(                    <path
                      key={index}
                      d={pathData}
                      fill={item.color}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  );
                  
                  acc.currentAngle = endAngle;
                  return acc;
                }, { elements: [] as React.ReactElement[], currentAngle: 0 }).elements}
                  {/* Center circle */}
                <circle cx="50" cy="50" r="20" fill="white" className="dark:fill-gray-800" />
                <text x="50" y="50" textAnchor="middle" dy="0.3em" className="text-xs font-semibold fill-gray-700 dark:fill-gray-300">
                  Total
                </text>
                <text x="50" y="50" textAnchor="middle" dy="1.5em" className="text-xs fill-gray-500 dark:fill-gray-400">
                  {assets.length} assets
                </text>
              </svg>
            </div>
          </div>

          {/* Allocation List */}
          <div className="space-y-3">
            {allocationData.map((item, index) => {
              const target = (currentTargets as any)[item.sector] || 0;
              const difference = item.percentage - target;
                return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">{item.sector}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        {item.count} asset{item.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                      {formatPercentage(item.percentage)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      {formatCurrency(item.value)}
                    </p>
                    {target > 0 && (
                      <p className={`text-xs font-medium ${
                        Math.abs(difference) > 5 
                          ? difference > 0 ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-500 dark:text-gray-400'
                      } transition-colors duration-300`}>
                        {difference > 0 ? '+' : ''}{formatPercentage(difference)} vs target
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>        {/* Risk Assessment and Recommendations */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border ${riskLevel.bg} dark:bg-opacity-20 border-opacity-20 transition-colors duration-300`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className={`h-4 w-4 ${riskLevel.color}`} />
                <span className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Diversification Risk</span>
              </div>
              <span className={`text-sm font-semibold ${riskLevel.color}`}>
                {riskLevel.level}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">
              {riskLevel.level === 'High' 
                ? 'Consider diversifying to reduce concentration risk'
                : riskLevel.level === 'Medium'
                ? 'Moderate diversification with room for improvement'
                : 'Well-diversified portfolio with balanced allocation'}
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700 border-opacity-20 transition-colors duration-300">
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
              <span className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Recommendation</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">
              {allocationData.length < 5 
                ? 'Consider adding more sectors for better diversification'
                : 'Portfolio shows good sector diversification'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAllocation;
