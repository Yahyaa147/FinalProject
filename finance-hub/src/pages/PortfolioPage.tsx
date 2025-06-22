import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Plus, TrendingUp, PieChart } from 'lucide-react';
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

const AddTransaction = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Transaction</h2>
      <div className="card max-w-2xl">
        <p className="text-gray-600 mb-4">Transaction form will be implemented here using React Hook Form.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Features to be implemented:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Asset symbol input with validation</li>
            <li>• Buy/Sell transaction type selection</li>
            <li>• Quantity and price inputs</li>
            <li>• Date picker</li>
            <li>• Form validation with error handling</li>
            <li>• Integration with Zustand store</li>
          </ul>
        </div>
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
