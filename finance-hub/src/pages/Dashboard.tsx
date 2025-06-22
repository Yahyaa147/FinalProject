import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  ArrowRight,
  RefreshCw,
  Users,
  BarChart3
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="mt-3 text-lg text-gray-600">
                  Welcome back! Here's your comprehensive portfolio overview and market insights.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Portfolio Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
            Portfolio Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-4 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>
                          {stat.value}
                        </p>
                        {stat.subtitle && (
                          <p className={`text-sm font-medium ${stat.color} flex items-center mt-1`}>
                            {stat.subtitle}
                            <TrendingUp className="h-3 w-3 ml-1" />
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-2 h-16 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full overflow-hidden">
                        <div 
                          className={`w-full bg-gradient-to-b ${
                            index === 0 ? 'from-blue-400 to-blue-600' :
                            index === 1 ? 'from-green-400 to-green-600' :
                            'from-purple-400 to-purple-600'
                          } rounded-full transition-all duration-1000`}
                          style={{ height: `${60 + (index * 15)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Market Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                    Market Overview
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Live market data and trends</p>
                </div>
                <Link 
                  to="/news"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {marketData.map((market) => (
                  <div key={market.symbol} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">{market.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{market.symbol}</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(market.price)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold flex items-center ${getGainLossColor(market.change)}`}>
                        {market.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                        {formatCurrency(market.change)}
                      </p>
                      <p className={`text-sm font-medium ${getGainLossColor(market.change)}`}>
                        {formatPercentage(market.changePercent)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Latest News */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Users className="h-5 w-5 text-purple-600 mr-2" />
                    Latest News
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Stay updated with market insights</p>
                </div>
                <Link 
                  to="/news"
                  className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {news.map((article) => (
                  <div key={article.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2 leading-snug">
                          <Link 
                            to={`/news/${article.id}`}
                            className="hover:text-purple-600 transition-colors"
                          >
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{article.summary}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-medium">{article.source}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            article.category === 'stocks' ? 'bg-blue-100 text-blue-800' :
                            article.category === 'crypto' ? 'bg-orange-100 text-orange-800' :
                            article.category === 'macro' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {article.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mr-3"></div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/portfolio/add-transaction"
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Add Transaction</h3>
              <p className="text-sm text-gray-600">Record new buy or sell orders</p>
            </Link>
            
            <Link
              to="/tools/compound-interest"
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Calculate Returns</h3>
              <p className="text-sm text-gray-600">Estimate investment growth</p>
            </Link>
            
            <Link
              to="/portfolio/my-assets"
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                <PieChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">View Portfolio</h3>
              <p className="text-sm text-gray-600">Analyze your holdings</p>
            </Link>
            
            <Link
              to="/community"
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Join Community</h3>
              <p className="text-sm text-gray-600">Connect with investors</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
