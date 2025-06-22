import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Plus, TrendingUp, PieChart, AlertCircle, CheckCircle, BarChart3, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { formatCurrency, formatPercentage, getGainLossColor } from '../utils/helpers';
import { 
  PieChart as RechartsPieChart, 
  Pie,
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// Placeholder components for sub-routes
const MyAssets = () => {
  const { assets, getTotalPortfolioValue, getTotalCost, getTotalGainLoss } = usePortfolioStore();
  const [selectedTimeRange, setSelectedTimeRange] = useState('1Y');

  const totalValue = getTotalPortfolioValue();
  const totalCost = getTotalCost();
  const totalGainLoss = getTotalGainLoss();
  const gainLossPercentage = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

  // Prepare data for asset allocation pie chart
  const assetAllocationData = assets.map((asset) => ({
    name: asset.symbol,
    value: asset.currentPrice * asset.quantity,
    percentage: ((asset.currentPrice * asset.quantity) / totalValue) * 100,
  }));

  // More realistic portfolio performance data with fluctuations
  const getPerformanceData = (timeRange: string) => {
    const baseData = {
      '1Y': [
        { date: 'Jul 2024', value: 15000, market: 14800, month: 'Jul' },
        { date: 'Aug 2024', value: 14200, market: 14100, month: 'Aug' },
        { date: 'Sep 2024', value: 15800, market: 15200, month: 'Sep' },
        { date: 'Oct 2024', value: 14900, market: 14600, month: 'Oct' },
        { date: 'Nov 2024', value: 16800, market: 15900, month: 'Nov' },
        { date: 'Dec 2024', value: 17500, market: 16400, month: 'Dec' },
        { date: 'Jan 2025', value: 16900, market: 16100, month: 'Jan' },
        { date: 'Feb 2025', value: 18200, market: 17200, month: 'Feb' },
        { date: 'Mar 2025', value: 17600, market: 16800, month: 'Mar' },
        { date: 'Apr 2025', value: 19100, market: 17900, month: 'Apr' },
        { date: 'May 2025', value: 18800, market: 17600, month: 'May' },
        { date: 'Jun 2025', value: totalValue, market: 18200, month: 'Jun' },
      ],
      '5Y': [
        { date: '2021', value: 8000, market: 8200, month: '2021' },
        { date: '2022', value: 12000, market: 11500, month: '2022' },
        { date: '2023', value: 14500, market: 13800, month: '2023' },
        { date: '2024', value: 17000, market: 16200, month: '2024' },
        { date: '2025', value: totalValue, market: 18200, month: '2025' },
      ],
      'YTD': [
        { date: 'Jan', value: 16900, market: 16100, month: 'Jan' },
        { date: 'Feb', value: 18200, market: 17200, month: 'Feb' },
        { date: 'Mar', value: 17600, market: 16800, month: 'Mar' },
        { date: 'Apr', value: 19100, market: 17900, month: 'Apr' },
        { date: 'May', value: 18800, market: 17600, month: 'May' },
        { date: 'Jun', value: totalValue, market: 18200, month: 'Jun' },
      ]
    };
    return baseData[timeRange as keyof typeof baseData] || baseData['1Y'];
  };

  const performanceData = getPerformanceData(selectedTimeRange);

  // Risk metrics data with proper values
  const riskMetrics = [
    { metric: 'Portfolio Risk', value: 17, maxValue: 25 },
    { metric: 'Market Risk', value: 12, maxValue: 25 },
    { metric: 'Volatility', value: 8, maxValue: 25 },
  ];

  // Dividend data
  const dividendData = [
    { month: 'Jan', amount: 120 },
    { month: 'Feb', amount: 85 },
    { month: 'Mar', amount: 150 },
    { month: 'Apr', amount: 200 },
    { month: 'May', amount: 175 },
    { month: 'Jun', amount: 240 },
  ];

  // Colors for pie chart
  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#84cc16'];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Overview</h2>
        <p className="text-gray-600">Comprehensive view of your investment performance</p>
      </div>

      {/* Enhanced Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Value</h3>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalValue)}</p>
              <p className="text-sm text-gray-500 mt-1">10 holdings</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Returns</h3>
              <p className={`text-3xl font-bold ${getGainLossColor(totalGainLoss)}`}>
                {formatCurrency(totalGainLoss)}
              </p>
              <p className={`text-sm mt-1 flex items-center ${getGainLossColor(totalGainLoss)}`}>
                {gainLossPercentage >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {formatPercentage(Math.abs(gainLossPercentage))}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${gainLossPercentage >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              {gainLossPercentage >= 0 ? (
                <ArrowUpRight className="h-6 w-6 text-green-600" />
              ) : (
                <ArrowDownRight className="h-6 w-6 text-red-600" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Est. Dividend</h3>
              <p className="text-3xl font-bold text-green-600">₺764</p>
              <p className="text-sm text-gray-500 mt-1">4.0% Yield</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Portfolio Risk</h3>
              <p className="text-3xl font-bold text-yellow-600">17</p>
              <p className="text-sm text-gray-500 mt-1">17 Risks • 25 Rewards</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Asset Allocation Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Asset Allocation</h3>
            <PieChart className="h-5 w-5 text-gray-500" />
          </div>          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie 
                  data={assetAllocationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {assetAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(value), 'Value']} 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {assetAllocationData.map((asset, index) => (
              <div key={asset.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="font-medium">{asset.name}</span>
                </div>
                <span className="text-gray-600">{asset.percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>        {/* Portfolio Performance Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Performance vs Market</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>Holdings</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                <span>US Market</span>
              </div>
            </div>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex space-x-2 mb-6">
            {['YTD', '1Y', '5Y'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selectedTimeRange === range
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tickMargin={10}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tickFormatter={(value) => `₺${(value/1000).toFixed(0)}K`}
                  domain={['dataMin - 1000', 'dataMax + 1000']}
                />
                <Tooltip 
                  formatter={(value: any, name: string) => [formatCurrency(value), name === 'value' ? 'Holdings' : 'US Market']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fill="url(#colorValue)"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="market" 
                  stroke="#9ca3af" 
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#9ca3af', strokeWidth: 2, r: 3 }}
                />
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Risk Metrics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Risk Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskMetrics} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="metric" type="category" stroke="#9ca3af" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dividend Income */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Dividend Income</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dividendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" tickFormatter={(value) => `₺${value}`} />
                <Tooltip formatter={(value: any) => [`₺${value}`, 'Dividend']} />
                <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>      {/* Assets List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Asset Holdings</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{assets.length} Assets</span>
            <span>•</span>
            <span>{formatCurrency(totalValue)} Total Value</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Avg Cost
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Gain/Loss
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Allocation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset) => {
                const assetTotalValue = asset.currentPrice * asset.quantity;
                const totalCost = asset.averageCost * asset.quantity;
                const gainLoss = assetTotalValue - totalCost;
                const gainLossPercent = totalCost > 0 ? (gainLoss / totalCost) * 100 : 0;
                const allocation = totalValue > 0 ? (assetTotalValue / totalValue) * 100 : 0;

                return (
                  <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold text-sm">{asset.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{asset.symbol}</div>
                          <div className="text-sm text-gray-500">{asset.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{asset.quantity}</div>
                      <div className="text-xs text-gray-500">shares</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(asset.averageCost)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(asset.currentPrice)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{formatCurrency(assetTotalValue)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold flex items-center ${getGainLossColor(gainLoss)}`}>
                        {gainLoss >= 0 ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {formatCurrency(gainLoss)}
                      </div>
                      <div className={`text-xs font-medium ${getGainLossColor(gainLoss)}`}>
                        {formatPercentage(Math.abs(gainLossPercent))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{allocation.toFixed(1)}%</div>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full" 
                              style={{ width: `${Math.min(allocation, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {assets.length === 0 && (
          <div className="text-center py-12">
            <PieChart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No assets</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding your first transaction.</p>
            <div className="mt-6">
              <Link
                to="/portfolio/add-transaction"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface TransactionFormData {
  symbol: string;
  name: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  date: string;
}

const AddTransaction = () => {
  const { addTransaction, addAsset, getAssetBySymbol } = usePortfolioStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<TransactionFormData>({
    defaultValues: {
      symbol: '',
      name: '',
      type: 'buy',
      quantity: 0,
      price: 0,
      date: new Date().toISOString().split('T')[0]
    }
  });

  const watchedType = watch('type');
  const watchedQuantity = watch('quantity');
  const watchedPrice = watch('price');
  const totalValue = (watchedQuantity || 0) * (watchedPrice || 0);

  const onSubmit = async (data: TransactionFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Check if asset exists, if not create it
      let asset = getAssetBySymbol(data.symbol.toUpperCase());
      
      if (!asset) {
        const newAssetId = `asset_${Date.now()}`;        addAsset({
          id: newAssetId,
          symbol: data.symbol.toUpperCase(),
          name: data.name,
          currentPrice: data.price,
          quantity: 0,
          averageCost: 0,
          type: 'stock', // Default type
          lastUpdated: new Date()
        });
        asset = getAssetBySymbol(data.symbol.toUpperCase());
      }      if (asset) {
        // Add the transaction
        addTransaction({
          id: `txn_${Date.now()}`,
          assetId: asset.id,
          type: data.type,
          quantity: data.quantity,
          price: data.price,
          date: new Date(data.date),
          fees: 0 // Default fees
        });

        setSubmitSuccess(true);
        reset();
        
        // Hide success message after 3 seconds
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Add Transaction</h2>
        <p className="text-gray-600">Record a new buy or sell transaction for your portfolio</p>
      </div>

      {submitSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Transaction added successfully!</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Asset Information */}
          <div className="border-b border-gray-200 pb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              Asset Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="symbol" className="block text-sm font-semibold text-gray-700 mb-2">
                  Symbol *
                </label>
                <input
                  type="text"
                  id="symbol"
                  {...register('symbol', {
                    required: 'Asset symbol is required',
                    pattern: {
                      value: /^[A-Za-z]{1,10}$/,
                      message: 'Enter a valid stock symbol (letters only, max 10 characters)'
                    }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.symbol ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="e.g., AAPL, GOOGL, MSFT"
                />
                {errors.symbol && (
                  <div className="mt-2 flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.symbol.message}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Asset Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Asset name is required',
                    minLength: {
                      value: 2,
                      message: 'Asset name must be at least 2 characters'
                    }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="e.g., Apple Inc., Alphabet Inc."
                />
                {errors.name && (
                  <div className="mt-2 flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="border-b border-gray-200 pb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              Transaction Details
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Transaction Type *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      value="buy"
                      {...register('type', { required: 'Transaction type is required' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Buy
                      </span>
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      value="sell"
                      {...register('type', { required: 'Transaction type is required' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Sell
                      </span>
                    </span>
                  </label>
                </div>
                {errors.type && (
                  <div className="mt-2 flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.type.message}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    step="0.01"
                    {...register('quantity', {
                      required: 'Quantity is required',
                      min: {
                        value: 0.01,
                        message: 'Quantity must be greater than 0'
                      },
                      max: {
                        value: 1000000,
                        message: 'Quantity cannot exceed 1,000,000'
                      }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.quantity ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.quantity && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.quantity.message}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                    Price per Share *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₺</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      step="0.01"
                      {...register('price', {
                        required: 'Price is required',
                        min: {
                          value: 0.01,
                          message: 'Price must be greater than 0'
                        },
                        max: {
                          value: 1000000,
                          message: 'Price cannot exceed ₺1,000,000'
                        }
                      })}
                      className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.price ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.price.message}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                    Transaction Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    {...register('date', {
                      required: 'Transaction date is required'
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.date ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                  {errors.date && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.date.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Summary */}
          {totalValue > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                Transaction Summary
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Type</div>
                  <div className={`font-bold text-lg ${
                    watchedType === 'buy' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {watchedType?.toUpperCase()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Quantity</div>
                  <div className="font-bold text-lg text-gray-900">{watchedQuantity}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Price/Share</div>
                  <div className="font-bold text-lg text-gray-900">{formatCurrency(watchedPrice || 0)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Total Value</div>
                  <div className="font-bold text-xl text-blue-600">{formatCurrency(totalValue)}</div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg text-white font-semibold focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Transaction...
                </span>
              ) : (
                'Add Transaction'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TransactionHistory = () => {
  const { transactions, getAssetById } = usePortfolioStore();

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Transaction History</h2>
        <p className="text-gray-600">View all your past trading activity and transaction details</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{transactions.length} Transactions</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTransactions.map((transaction) => {
                const asset = getAssetById(transaction.assetId);
                const total = transaction.quantity * transaction.price;

                return (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          weekday: 'short'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold text-xs">
                            {asset?.symbol?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {asset?.symbol || 'Unknown'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {asset?.name || 'Unknown Asset'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                        transaction.type === 'buy' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'buy' ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {transaction.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.quantity}</div>
                      <div className="text-xs text-gray-500">shares</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(transaction.price)}</div>
                      <div className="text-xs text-gray-500">per share</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{formatCurrency(total)}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {transactions.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions yet</h3>
            <p className="mt-1 text-sm text-gray-500">Start building your portfolio by making your first transaction.</p>
            <div className="mt-6">
              <Link
                to="/portfolio/add-transaction"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PortfolioPage = () => {
  const location = useLocation();

  const navItems = [
    { path: '/portfolio/my-assets', label: 'My Assets', icon: PieChart },
    { path: '/portfolio/add-transaction', label: 'Add Transaction', icon: Plus },
    { path: '/portfolio/transaction-history', label: 'History', icon: TrendingUp },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
        <p className="mt-2 text-gray-600">
          Manage your investments, track performance, and add new transactions.
        </p>
      </div>

      {/* Sub Navigation */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path === '/portfolio/my-assets' && location.pathname === '/portfolio');
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                  isActive
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <Routes>
        <Route index element={<MyAssets />} />
        <Route path="my-assets" element={<MyAssets />} />
        <Route path="add-transaction" element={<AddTransaction />} />
        <Route path="transaction-history" element={<TransactionHistory />} />
      </Routes>
    </div>
  );
};

export default PortfolioPage;
