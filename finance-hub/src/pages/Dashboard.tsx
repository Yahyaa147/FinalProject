import { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  Calculator,
  Target
} from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';
import { ApiService } from '../services/apiService';
import { formatCurrency, formatPercentage, getGainLossColor } from '../utils/helpers';
import PageHeader from '../components/PageHeader';
import { 
  DashboardQuickActions, 
  MarketOverview, 
  NewsWidget, 
  FinancialCalendar,
  WatchlistWidget,
  MarketSummary
} from '../components/dashboard';
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

  useEffect(() => {
    const fetchDashboardData = async () => {
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
      bgColor: 'bg-purple-100'    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reusable Page Header Component */}        <PageHeader
          title="Portfolio Dashboard"
          subtitle="📊 Welcome back! Here's your comprehensive portfolio overview and market insights."
          icon={<BarChart3 className="h-10 w-10 text-white" />}
          badges={[
            {
              text: `Portfolio Value: ${formatCurrency(totalValue)}`,
              variant: 'info'
            },
            {
              text: `${totalGainLoss >= 0 ? '📈' : '📉'} ${formatPercentage(gainLossPercentage)}`,
              variant: totalGainLoss >= 0 ? 'success' : 'warning'
            },
            {
              text: `${assets.length} Assets Tracked`,
              variant: 'primary'
            }
          ]}
          backgroundGradient="from-blue-900 via-indigo-900 to-purple-900"
          accentGradient="from-blue-400 via-indigo-400 to-purple-400"
          rightContent={
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
              <TrendingUp className="h-8 w-8 text-green-300" />
            </div>
          }
        />

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
            })}          </div>
        </div>        {/* Live Market Summary */}
        <div className="mb-8">
          <MarketSummary />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Enhanced Market Overview */}
          <MarketOverview marketData={marketData} />

          {/* Enhanced News Widget */}
          <NewsWidget articles={news} />
        </div>

        {/* Secondary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Financial Calendar */}
          <FinancialCalendar />

          {/* Watchlist Widget */}
          <WatchlistWidget />
        </div>{/* Enhanced Quick Actions using Reusable Component */}
        <DashboardQuickActions 
          actions={[
            {
              title: 'Calculate Returns',
              description: 'Estimate investment growth',
              link: '/tools/retirement-planner',
              icon: Calculator,
              gradient: 'bg-gradient-to-r from-green-500 to-green-600'
            },
            {
              title: 'Portfolio Analytics',
              description: 'Analyze your holdings',
              link: '/portfolio',
              icon: PieChart,
              gradient: 'bg-gradient-to-r from-purple-500 to-purple-600'
            },
            {
              title: 'Investment Tools',
              description: 'Access calculators and analyzers',
              link: '/tools',
              icon: Target,
              gradient: 'bg-gradient-to-r from-orange-500 to-orange-600'
            },
            {
              title: 'Market Research',
              description: 'Discover new investment opportunities',
              link: '/discover',
              icon: BarChart3,
              gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-600'
            },
            {
              title: 'Financial News',
              description: 'Stay updated with market trends',
              link: '/news',
              icon: TrendingUp,
              gradient: 'bg-gradient-to-r from-teal-500 to-teal-600'
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
