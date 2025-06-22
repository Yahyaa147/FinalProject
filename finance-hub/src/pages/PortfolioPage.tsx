import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Plus, TrendingUp, PieChart, AlertCircle, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { formatCurrency, formatPercentage, getGainLossColor } from '../utils/helpers';

// Placeholder components for sub-routes
const MyAssets = () => {
  const { assets, getTotalPortfolioValue, getTotalCost, getTotalGainLoss } = usePortfolioStore();

  const totalValue = getTotalPortfolioValue();
  const totalCost = getTotalCost();
  const totalGainLoss = getTotalGainLoss();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Assets</h2>
        <p className="text-gray-600">Overview of your investment portfolio</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Value</h3>
          <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalValue)}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Cost</h3>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalCost)}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Gain/Loss</h3>
          <p className={`text-3xl font-bold ${getGainLossColor(totalGainLoss)}`}>
            {formatCurrency(totalGainLoss)}
          </p>
          <p className={`text-sm ${getGainLossColor(totalGainLoss)}`}>
            {formatPercentage(totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0)}
          </p>
        </div>
      </div>

      {/* Assets List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Assets</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gain/Loss
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset) => {
                const totalValue = asset.currentPrice * asset.quantity;
                const totalCost = asset.averageCost * asset.quantity;
                const gainLoss = totalValue - totalCost;
                const gainLossPercent = totalCost > 0 ? (gainLoss / totalCost) * 100 : 0;

                return (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{asset.symbol}</div>
                        <div className="text-sm text-gray-500">{asset.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(asset.averageCost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(asset.currentPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(totalValue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${getGainLossColor(gainLoss)}`}>
                        {formatCurrency(gainLoss)}
                      </div>
                      <div className={`text-xs ${getGainLossColor(gainLoss)}`}>
                        {formatPercentage(gainLossPercent)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Transaction</h2>
        <p className="text-gray-600">Record a new buy or sell transaction for your portfolio</p>
      </div>

      {submitSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Transaction added successfully!</span>
          </div>
        </div>
      )}

      <div className="card max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Asset Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.symbol ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., AAPL"
                />
                {errors.symbol && (
                  <div className="mt-1 flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.symbol.message}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Apple Inc."
                />
                {errors.name && (
                  <div className="mt-1 flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Type *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="buy"
                      {...register('type', { required: 'Transaction type is required' })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Buy</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="sell"
                      {...register('type', { required: 'Transaction type is required' })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Sell</span>
                  </label>
                </div>
                {errors.type && (
                  <div className="mt-1 flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.type.message}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.quantity ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.quantity && (
                    <div className="mt-1 flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.quantity.message}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price per Share *
                  </label>
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
                        message: 'Price cannot exceed $1,000,000'
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.price ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <div className="mt-1 flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.price.message}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Date *
                </label>
                <input
                  type="date"
                  id="date"
                  {...register('date', {
                    required: 'Transaction date is required'
                  })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.date && (
                  <div className="mt-1 flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.date.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transaction Summary */}
          {totalValue > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Transaction Summary</h4>
              <div className="text-sm text-gray-600">
                <div className="flex justify-between mb-1">
                  <span>Transaction Type:</span>
                  <span className={`font-medium ${
                    watchedType === 'buy' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {watchedType?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Quantity:</span>
                  <span className="font-medium">{watchedQuantity}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Price per Share:</span>
                  <span className="font-medium">{formatCurrency(watchedPrice || 0)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-medium">Total Value:</span>
                  <span className="font-bold text-lg">{formatCurrency(totalValue)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg text-white font-medium focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700'
              }`}
            >
              {isSubmitting ? 'Adding Transaction...' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TransactionHistory = () => {
  const { transactions, getAssetById } = usePortfolioStore();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => {
                const asset = getAssetById(transaction.assetId);
                const total = transaction.quantity * transaction.price;

                return (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset?.symbol || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.type === 'buy' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(transaction.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
