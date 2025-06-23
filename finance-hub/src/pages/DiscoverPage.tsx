import { useState, useEffect } from 'react';
import { Search, TrendingUp, Star, Users, Globe, ChevronRight, RefreshCw } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const DiscoverPage = () => {
  const [activeSection, setActiveSection] = useState('trending');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading market data
    const loadMarketData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsLoading(false);
    };

    loadMarketData();
  }, []);

  const sections = [
    { id: 'trending', label: 'Trending Now', icon: TrendingUp },
    { id: 'popular', label: 'Most Popular', icon: Star },
    { id: 'community', label: 'Community Picks', icon: Users },
    { id: 'global', label: 'Global Markets', icon: Globe },
  ];
  const trendingStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$175.43', change: '+2.34%', volume: '45.2M', marketCap: '$2.8T', pe: 28.5 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: '$248.50', change: '+5.67%', volume: '32.1M', marketCap: '$789B', pe: 52.3 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: '$421.13', change: '+3.21%', volume: '28.9M', marketCap: '$1.04T', pe: 65.8 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: '$378.85', change: '+1.45%', volume: '22.7M', marketCap: '$2.81T', pe: 32.1 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$142.56', change: '+2.89%', volume: '18.4M', marketCap: '$1.78T', pe: 26.4 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '$134.78', change: '-1.23%', volume: '25.3M', marketCap: '$1.41T', pe: 41.2 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: '$298.34', change: '+4.12%', volume: '19.8M', marketCap: '$756B', pe: 23.7 },
    { symbol: 'BRK.A', name: 'Berkshire Hathaway', price: '$512,450', change: '+0.89%', volume: '1.2K', marketCap: '$741B', pe: 15.8 },
  ];

  const popularCategories = [
    { name: 'Technology', count: 1834, growth: '+12.5%', color: 'bg-blue-500', description: 'AI, Software, Hardware' },
    { name: 'Healthcare', count: 1292, growth: '+8.3%', color: 'bg-green-500', description: 'Biotech, Pharmaceuticals' },
    { name: 'Finance', count: 1156, growth: '+15.2%', color: 'bg-purple-500', description: 'Banks, Fintech, Insurance' },
    { name: 'Energy', count: 943, growth: '+22.1%', color: 'bg-yellow-500', description: 'Oil, Renewable, Utilities' },
    { name: 'Consumer Goods', count: 889, growth: '+6.7%', color: 'bg-red-500', description: 'Retail, Food, Beverages' },
    { name: 'Real Estate', count: 632, growth: '+9.8%', color: 'bg-indigo-500', description: 'REITs, Construction' },
    { name: 'Telecommunications', count: 524, growth: '+4.2%', color: 'bg-pink-500', description: 'Telecom, Media' },
    { name: 'Materials', count: 445, growth: '+11.3%', color: 'bg-orange-500', description: 'Mining, Chemicals' },
  ];

  const communityPicks = [
    { title: 'Top AI Stocks for 2025', author: 'InvestorPro', likes: 345, comments: 87, category: 'Technology', readTime: '5 min' },
    { title: 'Dividend Kings Portfolio Strategy', author: 'DividendHunter', likes: 289, comments: 63, category: 'Finance', readTime: '8 min' },
    { title: 'ESG Investment Comprehensive Guide', author: 'GreenInvestor', likes: 256, comments: 42, category: 'ESG', readTime: '12 min' },
    { title: 'Crypto vs Traditional Stocks Analysis', author: 'MarketAnalyst', likes: 398, comments: 129, category: 'Analysis', readTime: '15 min' },
    { title: 'Emerging Markets Opportunities 2025', author: 'GlobalTrader', likes: 234, comments: 56, category: 'International', readTime: '10 min' },
    { title: 'Healthcare Biotech Breakthroughs', author: 'BiotechExpert', likes: 187, comments: 34, category: 'Healthcare', readTime: '7 min' },
  ];

  const globalMarkets = [
    { market: 'S&P 500', value: '4,756.50', change: '+0.75%', flag: '🇺🇸', volume: '$152.3B' },
    { market: 'FTSE 100', value: '7,632.10', change: '+0.42%', flag: '🇬🇧', volume: '$8.9B' },
    { market: 'Nikkei 225', value: '32,947.20', change: '-0.23%', flag: '🇯🇵', volume: '$12.4B' },
    { market: 'DAX', value: '16,794.90', change: '+1.12%', flag: '🇩🇪', volume: '$5.7B' },
    { market: 'CAC 40', value: '7,421.30', change: '+0.89%', flag: '🇫🇷', volume: '$4.2B' },
    { market: 'BIST 100', value: '9,234.56', change: '+2.15%', flag: '🇹🇷', volume: '$2.8B' },
    { market: 'Shanghai Composite', value: '3,234.78', change: '-0.56%', flag: '🇨🇳', volume: '$18.9B' },
    { market: 'BSE Sensex', value: '72,568.45', change: '+1.34%', flag: '🇮🇳', volume: '$3.1B' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'trending':        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">🔥 Trending Stocks</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live Data</span>
                </div>
              </div>
              <div className="space-y-4">
                {trendingStocks.map((stock, index) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{stock.symbol}</div>
                        <div className="text-sm text-gray-600">{stock.name}</div>
                        <div className="text-xs text-gray-500">P/E: {stock.pe} • Cap: {stock.marketCap}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{stock.price}</div>
                      <div className={`text-sm font-semibold ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change}
                      </div>
                      <div className="text-xs text-gray-500">Vol: {stock.volume}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>            {/* Market Heat Map */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">📊 Market Heat Map</h3>
              <div className="grid grid-cols-6 gap-2 h-96">
                {[
                  // Large Cap Stocks (biggest market caps take more space)
                  { name: 'AAPL', change: '+2.34%', marketCap: 2800, size: 'xl' }, // Apple
                  { name: 'MSFT', change: '+1.45%', marketCap: 2810, size: 'xl' }, // Microsoft
                  { name: 'GOOGL', change: '+2.89%', marketCap: 1780, size: 'large' }, // Alphabet
                  { name: 'AMZN', change: '-1.23%', marketCap: 1410, size: 'large' }, // Amazon
                  { name: 'NVDA', change: '+3.21%', marketCap: 1040, size: 'large' }, // NVIDIA
                  { name: 'TSLA', change: '+5.67%', marketCap: 789, size: 'medium' }, // Tesla
                  { name: 'META', change: '+4.12%', marketCap: 756, size: 'medium' }, // Meta
                  { name: 'BRK.A', change: '+0.89%', marketCap: 741, size: 'medium' }, // Berkshire
                  
                  // Mid Cap Stocks
                  { name: 'AVGO', change: '+1.87%', marketCap: 615, size: 'medium' }, // Broadcom
                  { name: 'JPM', change: '-0.45%', marketCap: 485, size: 'small' }, // JPMorgan
                  { name: 'JNJ', change: '+0.67%', marketCap: 442, size: 'small' }, // Johnson & Johnson
                  { name: 'V', change: '+2.11%', marketCap: 521, size: 'small' }, // Visa
                  { name: 'WMT', change: '+1.33%', marketCap: 478, size: 'small' }, // Walmart
                  { name: 'UNH', change: '+0.98%', marketCap: 512, size: 'small' }, // UnitedHealth
                  { name: 'MA', change: '+1.76%', marketCap: 378, size: 'small' }, // Mastercard
                  { name: 'PG', change: '+0.54%', marketCap: 365, size: 'small' }, // Procter & Gamble
                  { name: 'HD', change: '+2.45%', marketCap: 348, size: 'small' }, // Home Depot
                  { name: 'XOM', change: '+3.21%', marketCap: 398, size: 'small' }, // Exxon Mobil
                  { name: 'CVX', change: '+2.87%', marketCap: 289, size: 'small' }, // Chevron
                  { name: 'PFE', change: '-1.12%', marketCap: 156, size: 'xs' }, // Pfizer
                  
                  // Smaller Cap Stocks
                  { name: 'ADBE', change: '+1.89%', marketCap: 234, size: 'xs' }, // Adobe
                  { name: 'NFLX', change: '+4.56%', marketCap: 189, size: 'xs' }, // Netflix
                  { name: 'CRM', change: '+2.34%', marketCap: 178, size: 'xs' }, // Salesforce
                  { name: 'ORCL', change: '+1.67%', marketCap: 267, size: 'xs' }, // Oracle
                  { name: 'CSCO', change: '+0.89%', marketCap: 198, size: 'xs' }, // Cisco
                  { name: 'INTC', change: '-2.34%', marketCap: 145, size: 'xs' }, // Intel
                  { name: 'AMD', change: '+6.78%', marketCap: 223, size: 'xs' }, // AMD
                  { name: 'QCOM', change: '+3.45%', marketCap: 187, size: 'xs' }, // Qualcomm
                  { name: 'IBM', change: '+1.23%', marketCap: 134, size: 'xs' }, // IBM
                  { name: 'NOW', change: '+4.21%', marketCap: 145, size: 'xs' }, // ServiceNow
                  { name: 'COP', change: '+2.67%', marketCap: 156, size: 'xs' }, // ConocoPhillips
                  { name: 'NEE', change: '+1.45%', marketCap: 167, size: 'xs' }, // NextEra Energy
                  { name: 'RTX', change: '+0.87%', marketCap: 134, size: 'xs' }, // Raytheon
                  { name: 'UPS', change: '-0.56%', marketCap: 123, size: 'xs' }, // UPS
                  { name: 'LOW', change: '+1.98%', marketCap: 145, size: 'xs' }, // Lowe's
                  { name: 'CAT', change: '+2.87%', marketCap: 156, size: 'xs' }, // Caterpillar
                  { name: 'GS', change: '+1.34%', marketCap: 112, size: 'xs' }, // Goldman Sachs
                  { name: 'BA', change: '-1.45%', marketCap: 98, size: 'xs' }, // Boeing
                  { name: 'AMGN', change: '+0.76%', marketCap: 134, size: 'xs' }, // Amgen
                  { name: 'SBUX', change: '+2.11%', marketCap: 109, size: 'xs' }, // Starbucks
                ].map((item) => (
                  <div 
                    key={item.name}
                    className={`
                      p-2 rounded-lg text-white font-semibold text-center transition-all duration-200 hover:scale-105 cursor-pointer flex flex-col justify-center items-center
                      ${item.change.startsWith('+') ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}
                      ${
                        item.size === 'xl' ? 'col-span-2 row-span-3 text-lg' :
                        item.size === 'large' ? 'col-span-2 row-span-2 text-base' :
                        item.size === 'medium' ? 'col-span-1 row-span-2 text-sm' :
                        item.size === 'small' ? 'col-span-1 row-span-1 text-sm' :
                        'col-span-1 row-span-1 text-xs'
                      }
                    `}
                    title={`${item.name} - Market Cap: $${item.marketCap}B`}
                  >
                    <div className="font-bold">{item.name}</div>
                    <div className="opacity-90 text-xs">{item.change}</div>
                    {(item.size === 'xl' || item.size === 'large') && (
                      <div className="text-xs opacity-75 mt-1">${item.marketCap}B</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Positive</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Negative</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Size represents market capitalization
                </div>
              </div>
            </div>
          </div>
        );

      case 'popular':        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">🏆 Popular Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularCategories.map((category) => (
                  <div key={category.name} className="group p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-blue-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-6 h-6 rounded-full ${category.color} group-hover:scale-110 transition-transform`}></div>
                      <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{category.name}</span>
                    </div>
                    <div className="mb-3">
                      <div className="text-3xl font-bold text-gray-900">{category.count.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{category.description}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-green-600">{category.growth}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sector Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">📈 Sector Performance (YTD)</h3>
              <div className="space-y-3">
                {[
                  { sector: 'Technology', performance: '+24.5%', bar: 85 },
                  { sector: 'Energy', performance: '+18.3%', bar: 70 },
                  { sector: 'Financial Services', performance: '+15.7%', bar: 60 },
                  { sector: 'Healthcare', performance: '+12.1%', bar: 50 },
                  { sector: 'Consumer Cyclical', performance: '+8.9%', bar: 40 },
                  { sector: 'Materials', performance: '+6.2%', bar: 30 },
                  { sector: 'Utilities', performance: '-2.1%', bar: -10 },
                ].map((item) => (
                  <div key={item.sector} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">{item.sector}</span>
                        <span className={`font-bold ${item.performance.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {item.performance}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.bar > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.abs(item.bar)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'community':        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">👥 Community Favorites</h3>
              <div className="space-y-4">
                {communityPicks.map((pick, index) => (
                  <div key={index} className="group p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-blue-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                            {pick.category}
                          </span>
                          <span className="text-sm text-gray-500">{pick.readTime} read</span>
                        </div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {pick.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">by {pick.author}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{pick.likes}</span>
                          </span>
                          <span className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{pick.comments} comments</span>
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Insights */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">💡 This Week's Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">47%</div>
                  <div className="text-sm opacity-90">Portfolio performance above market average</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-sm opacity-90">New analysis posts this week</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">$2.8M</div>
                  <div className="text-sm opacity-90">Community total portfolio value</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'global':        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">🌍 Global Market Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {globalMarkets.map((market) => (
                  <div key={market.market} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{market.flag}</span>
                      <div>
                        <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{market.market}</span>
                        <div className="text-sm text-gray-500">Vol: {market.volume}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{market.value}</div>
                      <div className={`text-sm font-semibold ${market.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {market.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market News */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">📰 Market News</h3>
              <div className="space-y-4">
                {[
                  { 
                    title: 'Federal Reserve Signals Potential Rate Changes',
                    summary: 'Central bank hints at monetary policy adjustments in response to inflation data',
                    time: '2 hours ago',
                    source: 'Financial Times'
                  },
                  { 
                    title: 'Tech Giants Report Strong Q2 Earnings',
                    summary: 'Major technology companies exceed expectations with robust quarterly results',
                    time: '4 hours ago',
                    source: 'Reuters'
                  },
                  { 
                    title: 'Emerging Markets Show Resilience',
                    summary: 'Developing economies demonstrate strength amid global economic uncertainty',
                    time: '6 hours ago',
                    source: 'Bloomberg'
                  },
                  { 
                    title: 'Renewable Energy Investments Surge',
                    summary: 'Clean energy sector attracts record investment levels in first half of 2025',
                    time: '8 hours ago',
                    source: 'Wall Street Journal'
                  },
                ].map((news, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <h4 className="font-semibold text-gray-900 mb-2">{news.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{news.summary}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{news.source}</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reusable Page Header Component */}
        <PageHeader
          title="Discover Markets"
          subtitle="🔍 Explore trending stocks, popular categories, and community insights from global markets"
          icon={<Search className="h-10 w-10 text-white" />}
          badges={[
            {
              text: 'Live Data',
              variant: 'primary',
              icon: <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            },
            {
              text: '🌍 Global Markets',
              variant: 'info'
            },
            {
              text: 'Updated now',
              variant: 'success'
            }
          ]}
          backgroundGradient="from-purple-900 via-indigo-900 to-blue-900"
          accentGradient="from-purple-400 via-indigo-400 to-blue-400"
          rightContent={
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
              <TrendingUp className="h-8 w-8 text-purple-300" />
            </div>
          }
        />

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search stocks, categories, or insights..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Section Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Sections">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeSection === section.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default DiscoverPage;
