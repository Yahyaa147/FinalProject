import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  ArrowRight,
  RefreshCw,
  Users
} from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';
import { ApiService } from '../services/apiService';
import { formatCurrency, formatPercentage, getGainLossColor } from '../utils/helpers';
import type { Article, MarketData } from '../types';

const Dashboard = () => {
  const { 
    assets, 
    getTotalPortfolioValue, 
    getTotalCost, 
    getTotalGainLoss 
  } = usePortfolioStore();
  
  const [news, setNews] = useState<Article[]>([]);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      // Fetch latest news (top 3)
      const newsResponse = await ApiService.getNews();
      if (newsResponse.success) {
        setNews(newsResponse.data.slice(0, 3));
      }
      
      // Fetch market data
      const marketResponse = await ApiService.getMarketData();
      if (marketResponse.success) {
        setMarketData(marketResponse.data);
      }
      
      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  const totalValue = getTotalPortfolioValue();
  const totalCost = getTotalCost();
  const totalGainLoss = getTotalGainLoss();
  const gainLossPercentage = totalCost > 0 ? ((totalGainLoss / totalCost) * 100) : 0;

  const portfolioStats = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(totalValue),
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Gain/Loss',
      value: formatCurrency(totalGainLoss),
      icon: totalGainLoss >= 0 ? TrendingUp : TrendingDown,
      color: getGainLossColor(totalGainLoss),
      bgColor: totalGainLoss >= 0 ? 'bg-green-100' : 'bg-red-100',
      subtitle: formatPercentage(gainLossPercentage)
    },
    {
      title: 'Total Assets',
      value: assets.length.toString(),
      icon: PieChart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-8 w-8 animate-spin text-primary-600" />
          <span className="text-lg text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your Finance Hub. Here's an overview of your portfolio and market updates.
        </p>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {portfolioStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-semibold ${stat.color}`}>
                    {stat.value}
                  </p>
                  {stat.subtitle && (
                    <p className={`text-sm ${stat.color}`}>
                      {stat.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Market Overview */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Market Overview</h2>
            <Link 
              to="/news"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {marketData.map((market) => (
              <div key={market.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{market.symbol}</p>
                  <p className="text-2xl font-semibold">{formatCurrency(market.price)}</p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${getGainLossColor(market.change)}`}>
                    {formatCurrency(market.change)}
                  </p>
                  <p className={`text-sm ${getGainLossColor(market.change)}`}>
                    {formatPercentage(market.changePercent)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest News */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Latest News</h2>
            <Link 
              to="/news"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {news.map((article) => (
              <div key={article.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h3 className="font-medium text-gray-900 mb-2">
                  <Link 
                    to={`/news/${article.id}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 mb-2">{article.summary}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{article.source}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    article.category === 'stocks' ? 'bg-blue-100 text-blue-800' :
                    article.category === 'crypto' ? 'bg-orange-100 text-orange-800' :
                    article.category === 'macro' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {article.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/portfolio/add-transaction"
          className="p-6 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
        >
          <DollarSign className="h-8 w-8 mx-auto mb-2" />
          <span className="font-medium">Add Transaction</span>
        </Link>
        
        <Link
          to="/tools/compound-interest"
          className="p-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
        >
          <TrendingUp className="h-8 w-8 mx-auto mb-2" />
          <span className="font-medium">Calculate Returns</span>
        </Link>
        
        <Link
          to="/portfolio/my-assets"
          className="p-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center"
        >
          <PieChart className="h-8 w-8 mx-auto mb-2" />
          <span className="font-medium">View Portfolio</span>
        </Link>
        
        <Link
          to="/community"
          className="p-6 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-center"
        >
          <Users className="h-8 w-8 mx-auto mb-2" />
          <span className="font-medium">Join Community</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
