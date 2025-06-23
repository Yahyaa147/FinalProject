import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { 
  Newspaper, 
  Clock, 
  ExternalLink, 
  Filter,
  Search,
  ArrowLeft,
  Share2,
  BookmarkPlus,
  ChevronDown,
  X,
  History
} from 'lucide-react';
import { ApiService } from '../services/apiService';
import { getRelativeTime } from '../utils/helpers';
import PageHeader from '../components/PageHeader';
import { KeyInsights, QuickActions, CategoryAnalytics, NewsletterSubscription } from '../components/news';
import { insightsData, quickActionsData, getAnalyticsData } from '../data/newsComponentsData';
import { useNewsStore } from '../store/newsStore';
import type { Article } from '../types';

const NewsGrid = ({ articles }: { articles: Article[] }) => {
  const { toggleBookmark, isBookmarked, markAsRead } = useNewsStore();
  
  const handleBookmarkClick = (e: React.MouseEvent, articleId: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(articleId);
  };
  
  const handleArticleClick = (articleId: string) => {
    markAsRead(articleId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <div key={article.id} className="relative">
          <Link
            to={`/news/article/${article.id}`}
            onClick={() => handleArticleClick(article.id)}
            className="group block animate-fade-in-up"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >            <article className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1">
              {/* Bookmark button */}
              <button
                onClick={(e) => handleBookmarkClick(e, article.id)}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 ${
                  isBookmarked(article.id)
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/80 dark:bg-gray-700/80 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-700'
                } backdrop-blur-sm`}
              >
                <BookmarkPlus className="h-4 w-4" />
              </button>
            {article.imageUrl ? (
              <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Professional fallback with category-specific gradients
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    if (parent) {
                      const gradientClass = article.category === 'stocks' ? 'bg-gradient-stocks' : 
                                          article.category === 'crypto' ? 'bg-gradient-crypto' : 
                                          article.category === 'macro' ? 'bg-gradient-macro' : 
                                          article.category === 'general' ? 'bg-gradient-general' : 'bg-gradient-news';
                      parent.innerHTML = `
                        <div class="${gradientClass} h-48 flex items-center justify-center rounded-lg">
                          <div class="text-center p-6 z-10">
                            <svg class="h-12 w-12 text-white/90 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                            </svg>
                            <p class="text-white/90 text-sm font-medium">${article.category.toUpperCase()}</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            ) : (
              <div className={`relative overflow-hidden rounded-lg mb-4 h-48 flex items-center justify-center ${
                article.category === 'stocks' ? 'bg-gradient-stocks' :
                article.category === 'crypto' ? 'bg-gradient-crypto' :
                article.category === 'macro' ? 'bg-gradient-macro' :
                article.category === 'general' ? 'bg-gradient-general' :
                'bg-gradient-news'
              }`}>
                <div className="text-center p-6 z-10">
                  <Newspaper className="h-12 w-12 text-white/90 mx-auto mb-2" />
                  <p className="text-white/90 text-sm font-medium">{article.category.toUpperCase()}</p>
                </div>
              </div>
            )}            <div className="flex items-center justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                article.category === 'stocks' ? 'bg-gradient-stocks text-white' :
                article.category === 'crypto' ? 'bg-gradient-crypto text-white' :
                article.category === 'macro' ? 'bg-gradient-macro text-white' :
                article.category === 'general' ? 'bg-gradient-general text-white' :
                'bg-gradient-news text-white'
              }`}>
                {article.category.toUpperCase()}
              </span>              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full transition-colors duration-300">
                <Clock className="h-3 w-3 mr-1" />
                {getRelativeTime(article.date)}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
              {article.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 transition-colors duration-300">
              {article.summary}            </p>            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium transition-colors duration-300">{article.source}</span>
              <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 text-sm font-medium transition-colors duration-300">
                Read Article
                <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </article>
        </Link>
        </div>
      ))}
    </div>
  );
};

const AllNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSearchHistory, setShowSearchHistory] = useState<boolean>(false);
    // Use news store for search history and preferences
  const { addToSearchHistory, searchHistory, clearSearchHistory } = useNewsStore();

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'stocks', label: 'Stocks' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'macro', label: 'Macro' },
    { value: 'general', label: 'General' }
  ];
  useEffect(() => {
    const fetchNews = async () => {
      const response = await ApiService.getNews();
      if (response.success) {
        // Use the actual articles without duplicating them
        setArticles(response.data);
        setFilteredArticles(response.data);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );    }    setFilteredArticles(filtered);
  }, [articles, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/30 relative overflow-hidden transition-colors duration-300">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-blue-100/20 dark:from-indigo-900/10 dark:to-blue-900/10 rounded-full blur-3xl"></div>
      </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reusable Page Header Component */}        <PageHeader
          title="Financial News Hub"
          subtitle="💡 Stay updated with the latest market insights and financial news"
          icon={<Newspaper className="h-10 w-10 text-white" />}
          badges={[
            {
              text: 'Live Updates',
              variant: 'primary',
              icon: <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            },
            {
              text: '📈 Market Open',
              variant: 'success'
            },
            {
              text: 'Last updated: 2 mins ago',
              variant: 'info',
              icon: <Clock className="h-3 w-3 text-purple-200" />
            }
          ]}
          rightContent={
            <>
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                <svg className="h-8 w-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                <svg className="h-8 w-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                <svg className="h-8 w-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </>
          }
        />

        {/* Enhanced Filters */}        <div className="mb-8 animate-fade-in" style={{animationDelay: '300ms'}}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center transition-colors duration-300">
              <div className="bg-slate-600 dark:bg-slate-700 rounded-full p-2 mr-3 transition-colors duration-300">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900 dark:text-white transition-colors duration-300">
                Filter & Search News
              </span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4">              {/* Enhanced Search */}              <div className="relative flex-1">
                <div className="relative bg-white dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search financial news, companies, trends..."
                    value={searchTerm}
                    onFocus={() => setShowSearchHistory(true)}
                    onBlur={() => setTimeout(() => setShowSearchHistory(false), 150)}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      // Add to search history when user types
                      if (e.target.value.length > 2) {
                        addToSearchHistory(e.target.value);
                      }
                    }}
                    className="pl-12 pr-4 py-3 w-full border-0 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-transparent"
                  />
                  {/* Search History Dropdown */}
                  {showSearchHistory && searchHistory.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      <div className="flex justify-between items-center px-3 py-2 border-b border-gray-100 dark:border-gray-600">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center transition-colors duration-300">
                          <History className="w-4 h-4 mr-1" />
                          Recent searches
                        </span>
                        <button
                          onClick={clearSearchHistory}
                          className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center transition-colors duration-300"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Clear
                        </button>
                      </div>
                      {searchHistory.slice(0, 5).map((query, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchTerm(query);
                            setShowSearchHistory(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm text-gray-700 dark:text-gray-300 flex items-center transition-colors duration-300"
                        >
                          <Clock className="w-3 h-3 mr-2 text-gray-400 dark:text-gray-500" />
                          {query}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Enhanced Category Filter */}
              <div className="relative">
                <div className="relative">                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 appearance-none bg-white dark:bg-gray-700 min-w-40 transition-all duration-300 text-gray-900 dark:text-white font-medium"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value} className="dark:bg-gray-700">
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>            {/* Enhanced Results count */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 animate-fade-in transition-colors duration-300">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center transition-colors duration-300">
                  <span className="mr-2">📰</span>
                  Showing <span className="font-bold text-blue-600 dark:text-blue-400 mx-1 transition-colors duration-300">{filteredArticles.length}</span> 
                  article{filteredArticles.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
            </div>
          </div>
        </div>        {/* News Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Main Articles */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">              <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center transition-colors duration-300">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full mr-4 animate-pulse"></div>
                <span className="bg-gradient-to-r from-gray-900 dark:from-gray-100 via-blue-700 dark:via-blue-400 to-purple-700 dark:to-purple-400 bg-clip-text text-transparent">
                  Breaking News & Analysis
                </span>
              </h2>
                {/* Professional Quick Stats */}
              <div className="hidden md:flex items-center space-x-3 text-sm">
                <div className="flex items-center space-x-2 bg-slate-600 rounded-full px-3 py-1 shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white font-medium">{filteredArticles.filter(a => a.category === 'stocks').length} Stocks</span>
                </div>
                <div className="flex items-center space-x-2 bg-stone-600 rounded-full px-3 py-1 shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white font-medium">{filteredArticles.filter(a => a.category === 'crypto').length} Crypto</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-600 rounded-full px-3 py-1 shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white font-medium">{filteredArticles.filter(a => a.category === 'macro').length} Macro</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-600 rounded-full px-3 py-1 shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white font-medium">{filteredArticles.filter(a => a.category === 'general').length} General</span>
                </div>
              </div>
            </div>              {/* News Grid */}
            {filteredArticles.length > 0 ? (
              <NewsGrid articles={filteredArticles} />
            ) : (
              <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Found</h3>
                <p className="text-gray-600">No articles found matching your criteria. Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>          {/* Professional Sidebar */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in-right" style={{animationDelay: '500ms'}}>
            {/* Trending Topics */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-lg mr-2">🔥</span> 
                <span className="text-gray-900">Trending Topics</span>
              </h3>
              <div className="space-y-3">
                {[
                  { topic: 'AI Revolution', emoji: '🤖', trend: '+145%' },
                  { topic: 'Bitcoin ETF', emoji: '🪙', trend: '+89%' },
                  { topic: 'Fed Policy', emoji: '🏦', trend: '+67%' },
                  { topic: 'Electric Vehicles', emoji: '⚡', trend: '+54%' },
                  { topic: 'Green Energy', emoji: '🌱', trend: '+43%' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-blue-50 transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{item.emoji}</span>
                      <span className="text-gray-800 font-medium text-sm group-hover:text-blue-700 transition-colors">{item.topic}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded font-medium">{item.trend}</span>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-lg mr-2">📈</span> 
                <span className="text-gray-900">Market Summary</span>
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'S&P 500', price: '4,258.12', change: '+1.24%', positive: true, icon: '📊' },
                  { name: 'Bitcoin', price: '$68,500', change: '+2.36%', positive: true, icon: '🪙' },
                  { name: 'Ethereum', price: '$3,150', change: '+1.89%', positive: true, icon: 'Ξ' },
                  { name: 'Gold', price: '$2,384', change: '-0.45%', positive: false, icon: '🏅' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-green-50 transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-gray-800 font-medium text-sm group-hover:text-green-700 transition-colors">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{item.price}</div>
                      <div className={`text-xs font-medium px-2 py-1 rounded ${
                        item.positive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                      }`}>
                        {item.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  <span className="font-medium text-green-600">Market Open</span> • Last updated: 2 mins ago
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-lg mr-2">🔗</span>
                <span className="text-gray-900">Quick Links</span>
              </h3>
              <div className="space-y-2">
                {[
                  { to: '/tools', icon: '📊', text: 'Portfolio Analyzer', desc: 'Analyze your investments' },
                  { to: '/tools', icon: '🎯', text: 'Retirement Planner', desc: 'Plan your future' },
                  { to: '/community', icon: '💬', text: 'Community Hub', desc: 'Join discussions' },
                  { to: '/discover', icon: '🔍', text: 'Stock Screener', desc: 'Find opportunities' }
                ].map((link, index) => (
                  <Link 
                    key={index}
                    to={link.to} 
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="text-sm">{link.icon}</div>
                    <div className="flex-1">
                      <div className="text-blue-700 font-medium text-sm group-hover:text-blue-800 transition-colors">{link.text}</div>
                      <div className="text-xs text-gray-500">{link.desc}</div>
                    </div>
                    <svg className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl p-6 shadow-lg text-white">
              <div className="text-center">
                <h3 className="text-lg font-bold mb-3 flex items-center justify-center">
                  <span className="text-lg mr-2">📧</span>
                  Daily Brief
                </h3>
                <p className="text-gray-200 mb-4 text-sm">
                  Get the most important financial news delivered to your inbox every morning.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-lg border-0 focus:ring-2 focus:ring-white/50 bg-white/20 text-white placeholder-white/70 backdrop-blur-sm text-sm"
                  />
                  <button className="w-full bg-white text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 text-sm">
                    Subscribe Now
                  </button>
                </div>
                <p className="text-gray-300 text-xs mt-3">
                  ✨ Join 50,000+ investors • Unsubscribe anytime
                </p>              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryNews = () => {  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);

  const categoryInfo = {
    stocks: {
      title: 'Stock Market News',
      description: 'Latest news and analysis from the equity markets, earnings reports, and company announcements.',
      icon: '📈',
      color: 'from-gray-900 via-blue-900 to-purple-900',
      accent: 'from-blue-500 to-purple-500'
    },    crypto: {
      title: 'Cryptocurrency News',
      description: 'Breaking news from the crypto world, blockchain technology, and digital asset markets.',
      icon: '🪙',
      color: 'from-gray-900 via-blue-900 to-purple-900',
      accent: 'from-orange-500 to-yellow-500'
    },
    macro: {
      title: 'Macroeconomic News',
      description: 'Central bank decisions, economic indicators, and global financial policy updates.',
      icon: '🌍',
      color: 'from-gray-900 via-blue-900 to-purple-900',
      accent: 'from-green-500 to-blue-500'
    },
    general: {
      title: 'General Financial News',
      description: 'Broad financial market news, economic trends, and business developments.',
      icon: '📰',
      color: 'from-gray-900 via-blue-900 to-purple-900',
      accent: 'from-purple-500 to-pink-500'
    }
  };

  const currentCategory = category && categoryInfo[category as keyof typeof categoryInfo] 
    ? categoryInfo[category as keyof typeof categoryInfo]
    : categoryInfo.general;

  useEffect(() => {    const fetchCategoryNews = async () => {
      const response = await ApiService.getNews(category);
      if (response.success) {
        setArticles(response.data);
      }
    };

    fetchCategoryNews();
  }, [category]);

  return (
    <div>
      {/* Enhanced Category Header - Matching Main Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className={`bg-gradient-to-r ${currentCategory.color} rounded-2xl p-8 text-white shadow-2xl border border-gray-700/50 backdrop-blur-sm relative overflow-hidden`}>
          {/* Animated background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-50"></div>
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${currentCategory.accent}`}></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className={`bg-gradient-to-r ${currentCategory.accent} rounded-2xl p-4 shadow-lg`}>
                    <div className="text-4xl">{currentCategory.icon}</div>
                  </div>
                  <div className={`absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r ${currentCategory.accent} rounded-full animate-pulse`}></div>
                </div>
                
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2">
                    {currentCategory.title}
                  </h2>
                  <p className="text-gray-300 text-lg font-medium">
                    {currentCategory.description}
                  </p>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-white">{articles.length}</div>
                  <div className="text-sm text-gray-300 font-medium">Articles</div>
                </div>
              </div>
            </div>

            {/* Category-specific stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category === 'stocks' && (
                <>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-300">+2.4%</div>
                    <div className="text-xs text-white/80">S&P 500</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-300">+1.8%</div>
                    <div className="text-xs text-white/80">NASDAQ</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-300">4.2%</div>
                    <div className="text-xs text-white/80">VIX</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-yellow-300">$2.1T</div>
                    <div className="text-xs text-white/80">Volume</div>
                  </div>
                </>
              )}
              {category === 'crypto' && (
                <>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-orange-300">$68.5K</div>
                    <div className="text-xs text-white/80">Bitcoin</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-300">$3,150</div>
                    <div className="text-xs text-white/80">Ethereum</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-300">+5.2%</div>
                    <div className="text-xs text-white/80">24h Change</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-300">$2.4T</div>
                    <div className="text-xs text-white/80">Market Cap</div>
                  </div>
                </>
              )}
              {category === 'macro' && (
                <>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-red-300">5.25%</div>
                    <div className="text-xs text-white/80">Fed Rate</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-orange-300">2.4%</div>
                    <div className="text-xs text-white/80">Inflation</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-300">4.1%</div>
                    <div className="text-xs text-white/80">Unemployment</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-300">+2.8%</div>
                    <div className="text-xs text-white/80">GDP Growth</div>
                  </div>
                </>
              )}
              {category === 'general' && (
                <>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-300">+1.2%</div>
                    <div className="text-xs text-white/80">Market</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-300">$45B</div>
                    <div className="text-xs text-white/80">M&A Volume</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-yellow-300">68%</div>
                    <div className="text-xs text-white/80">Beat Rate</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-300">15</div>
                    <div className="text-xs text-white/80">New IPOs</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>      {/* Enhanced Category-specific insights - Expanded */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Primary Key Insights - Using Global Component */}
          <KeyInsights 
            insights={insightsData[category as keyof typeof insightsData] || insightsData.general}
          />

          {/* Secondary Insights - Market Analysis */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Market Analysis & Trends
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category === 'stocks' && (
                <>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">📈</span>
                      Sector Performance
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Technology</span>
                        <span className="text-sm font-bold text-green-600">+12.4%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Healthcare</span>
                        <span className="text-sm font-bold text-green-600">+8.7%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Energy</span>
                        <span className="text-sm font-bold text-red-600">-2.1%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">💰</span>
                      Market Metrics
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">P/E Ratio</span>
                        <span className="text-sm font-bold text-blue-600">18.2x</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">VIX</span>
                        <span className="text-sm font-bold text-orange-600">16.8</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Volume</span>
                        <span className="text-sm font-bold text-purple-600">2.1T</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {category === 'crypto' && (
                <>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">🪙</span>
                      Top Cryptocurrencies
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Bitcoin</span>
                        <span className="text-sm font-bold text-green-600">+5.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Ethereum</span>
                        <span className="text-sm font-bold text-green-600">+7.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Solana</span>
                        <span className="text-sm font-bold text-green-600">+15.3%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">🔗</span>
                      DeFi Metrics
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">TVL</span>
                        <span className="text-sm font-bold text-blue-600">$95B</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">24h Volume</span>
                        <span className="text-sm font-bold text-purple-600">$12.4B</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Active Users</span>
                        <span className="text-sm font-bold text-green-600">2.3M</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {category === 'macro' && (
                <>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">🏦</span>
                      Economic Indicators
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">GDP Growth</span>
                        <span className="text-sm font-bold text-green-600">+2.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Inflation</span>
                        <span className="text-sm font-bold text-orange-600">2.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Unemployment</span>
                        <span className="text-sm font-bold text-blue-600">4.2%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">💱</span>
                      Currency Markets
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">USD/EUR</span>
                        <span className="text-sm font-bold text-blue-600">1.087</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">USD/JPY</span>
                        <span className="text-sm font-bold text-red-600">148.2</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">DXY</span>
                        <span className="text-sm font-bold text-green-600">103.8</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {category === 'general' && (
                <>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">💼</span>
                      Investment Flows
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">VC Funding</span>
                        <span className="text-sm font-bold text-green-600">$45B</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">IPO Volume</span>
                        <span className="text-sm font-bold text-blue-600">$12.8B</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">M&A Activity</span>
                        <span className="text-sm font-bold text-purple-600">$2.1T</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">🌱</span>
                      ESG Trends
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">ESG Assets</span>
                        <span className="text-sm font-bold text-green-600">$35T</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Green Bonds</span>
                        <span className="text-sm font-bold text-blue-600">$1.2T</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Carbon Credits</span>
                        <span className="text-sm font-bold text-orange-600">$850B</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>          <div className="space-y-6">
          {/* Enhanced Quick Actions - Using Global Component */}
          <QuickActions 
            title={`Quick Actions - ${currentCategory.title}`}
            actions={quickActionsData[category as keyof typeof quickActionsData] || quickActionsData.general}
          />

          {/* Related Tools */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">🛠️</span>
              Related Tools
            </h3>
            <div className="space-y-3">
              {category === 'stocks' && (
                <>
                  <Link to="/tools" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="font-medium text-blue-900">Stock Screener</div>
                    <div className="text-sm text-blue-600">Find investment opportunities</div>
                  </Link>
                  <Link to="/tools" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="font-medium text-green-900">Portfolio Analyzer</div>
                    <div className="text-sm text-green-600">Analyze your holdings</div>
                  </Link>
                </>
              )}
              {category === 'crypto' && (
                <>
                  <Link to="/tools" className="block p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <div className="font-medium text-orange-900">Crypto Calculator</div>
                    <div className="text-sm text-orange-600">Calculate returns & fees</div>
                  </Link>
                  <Link to="/tools" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="font-medium text-purple-900">DeFi Tracker</div>
                    <div className="text-sm text-purple-600">Track DeFi positions</div>
                  </Link>
                </>
              )}
              {category === 'macro' && (
                <>
                  <Link to="/tools" className="block p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    <div className="font-medium text-red-900">Economic Calendar</div>
                    <div className="text-sm text-red-600">Track key events</div>
                  </Link>
                  <Link to="/tools" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="font-medium text-blue-900">Bond Calculator</div>
                    <div className="text-sm text-blue-600">Calculate bond yields</div>
                  </Link>
                </>
              )}
              {category === 'general' && (
                <>
                  <Link to="/tools" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="font-medium text-purple-900">Financial Planner</div>
                    <div className="text-sm text-purple-600">Plan your finances</div>
                  </Link>
                  <Link to="/tools" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="font-medium text-green-900">Risk Calculator</div>
                    <div className="text-sm text-green-600">Assess investment risk</div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Market Trends Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📊</span>
          Market Trends
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {category === 'stocks' && (
            <>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-800">Top Gainers</span>
                  <span className="text-xs text-green-600">Today</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">NVDA</span>
                    <span className="text-sm font-bold text-green-800">+8.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">TSLA</span>
                    <span className="text-sm font-bold text-green-800">+6.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">AMZN</span>
                    <span className="text-sm font-bold text-green-800">+4.8%</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">Most Active</span>
                  <span className="text-xs text-blue-600">Volume</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">SPY</span>
                    <span className="text-sm font-bold text-blue-800">45M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">QQQ</span>
                    <span className="text-sm font-bold text-blue-800">38M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">AAPL</span>
                    <span className="text-sm font-bold text-blue-800">25M</span>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-800">Sector Leaders</span>
                  <span className="text-xs text-purple-600">Performance</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Technology</span>
                    <span className="text-sm font-bold text-green-800">+3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Healthcare</span>
                    <span className="text-sm font-bold text-green-800">+1.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Energy</span>
                    <span className="text-sm font-bold text-red-800">-0.5%</span>
                  </div>
                </div>
              </div>
            </>
          )}
          {category === 'crypto' && (
            <>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-800">Top Performers</span>
                  <span className="text-xs text-orange-600">24h</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-orange-700">SOL</span>
                    <span className="text-sm font-bold text-green-800">+12.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-orange-700">ETH</span>
                    <span className="text-sm font-bold text-green-800">+8.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-orange-700">BTC</span>
                    <span className="text-sm font-bold text-green-800">+5.2%</span>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-800">DeFi TVL</span>
                  <span className="text-xs text-purple-600">Total</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Uniswap</span>
                    <span className="text-sm font-bold text-purple-800">$4.2B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Aave</span>
                    <span className="text-sm font-bold text-purple-800">$3.1B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Compound</span>
                    <span className="text-sm font-bold text-purple-800">$2.8B</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">Market Cap</span>
                  <span className="text-xs text-blue-600">Change</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Total</span>
                    <span className="text-sm font-bold text-green-800">+4.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">DeFi</span>
                    <span className="text-sm font-bold text-green-800">+8.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Alt Coins</span>
                    <span className="text-sm font-bold text-green-800">+6.7%</span>
                  </div>
                </div>
              </div>
            </>
          )}
          {category === 'macro' && (
            <>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-800">Central Banks</span>
                  <span className="text-xs text-red-600">Rates</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-red-700">Fed</span>
                    <span className="text-sm font-bold text-red-800">5.25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-red-700">ECB</span>
                    <span className="text-sm font-bold text-red-800">4.75%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-red-700">BoE</span>
                    <span className="text-sm font-bold text-red-800">5.50%</span>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-800">Inflation</span>
                  <span className="text-xs text-orange-600">YoY</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-orange-700">US CPI</span>
                    <span className="text-sm font-bold text-orange-800">2.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-orange-700">EU HICP</span>
                    <span className="text-sm font-bold text-orange-800">3.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-orange-700">UK CPI</span>
                    <span className="text-sm font-bold text-orange-800">3.2%</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-800">Bond Yields</span>
                  <span className="text-xs text-green-600">10Y</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">US</span>
                    <span className="text-sm font-bold text-green-800">4.25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">Germany</span>
                    <span className="text-sm font-bold text-green-800">2.85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">UK</span>
                    <span className="text-sm font-bold text-green-800">4.45%</span>
                  </div>
                </div>
              </div>
            </>
          )}
          {category === 'general' && (
            <>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">Market Sentiment</span>
                  <span className="text-xs text-blue-600">Index</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">VIX</span>
                    <span className="text-sm font-bold text-blue-800">18.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Fear & Greed</span>
                    <span className="text-sm font-bold text-green-800">65</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Put/Call</span>
                    <span className="text-sm font-bold text-blue-800">0.85</span>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-800">ESG Trends</span>
                  <span className="text-xs text-purple-600">Score</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Green Bonds</span>
                    <span className="text-sm font-bold text-green-800">+15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">ESG Funds</span>
                    <span className="text-sm font-bold text-green-800">+8.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Carbon Credits</span>
                    <span className="text-sm font-bold text-blue-800">$85</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-800">IPO Activity</span>
                  <span className="text-xs text-green-600">YTD</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">New IPOs</span>
                    <span className="text-sm font-bold text-green-800">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">Total Raised</span>
                    <span className="text-sm font-bold text-green-800">$48B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">Avg Return</span>
                    <span className="text-sm font-bold text-green-800">+12.4%</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Featured Article Spotlight */}
      {articles.length > 0 && (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-lg mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">⭐</span>
            Featured Article
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src={articles[0].imageUrl} 
                    alt={articles[0].title}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNDMzOGNhIi8+CjxwYXRoIGQ9Ik0yMCA0MEgyNFY0NEgyMFY0MFpNMjggNDBIMzJWNDRIMjhWNDBaTTM2IDQwSDQwVjQ0SDM2VjQwWk00NCA0MEg0OFY0NEg0NFY0MFpNNTIgNDBINTZWNDRINTJWNDBaTTYwIDQwSDY0VjQ0SDYwVjQwWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2 line-clamp-2">{articles[0].title}</h4>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{articles[0].summary}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>{articles[0].source}</span>
                    <span>•</span>
                    <span>{getRelativeTime(articles[0].date)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Link
                to={`/news/article/${articles[0].id}`}
                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
              >
                <span>Read Full Story</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}      {/* Category Analytics - Using Global Component */}
      <CategoryAnalytics 
        metrics={getAnalyticsData(articles)}
        className="mb-6"
      />      {/* Newsletter Subscription - Using Global Component */}
      <NewsletterSubscription 
        categoryTitle={currentCategory.title}
        categoryType={category || 'general'}
        className="mb-6"
      />

      {/* Articles Count */}
      <div className="mb-6 animate-fade-in" style={{animationDelay: '300ms'}}>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Found <span className="font-semibold text-blue-600">{articles.length}</span> article{articles.length !== 1 ? 's' : ''} in {currentCategory.title.toLowerCase()}
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
              Most Recent
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
              Most Popular
            </button>
          </div>
        </div>
      </div>

      {articles.length > 0 ? (
        <div className="animate-fade-in-up" style={{animationDelay: '400ms'}}>
          <NewsGrid articles={articles} />
        </div>
      ) : (
        <div className="text-center py-12 animate-fade-in-up" style={{animationDelay: '400ms'}}>
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Newspaper className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles available</h3>
          <p className="text-gray-600 mb-4">No {category} articles available at the moment. Check back later for updates.</p>
          <Link
            to="/news"
            className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            View All News
          </Link>
        </div>
      )}
    </div>
  );
};

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      // Fetch main article (mock implementation)
      const response = await ApiService.getNews();
      if (response.success) {
        const foundArticle = response.data.find(a => a.id === id);
        if (foundArticle) {
          setArticle(foundArticle);
          // Get related articles from the same category
          const related = response.data
            .filter(a => a.id !== id && a.category === foundArticle.category)
            .slice(0, 3);
          setRelatedArticles(related);
        }
      }
    };    fetchArticle();
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200/50 text-center">
            <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Article not found</h2>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/news"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }
  // Mock article content for demonstration
  const articleContent = article.content || `
    ${article.summary}
    
    This is additional content for the article. The full article content would typically be fetched from the API or stored in the database.
    
    For the complete story and more details, please visit the original source link below.
  `;  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6 animate-fade-in">
          <Link
            to="/news"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:translate-x-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300" />
            Back to News
          </Link>
        </div>

        {/* Article Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50 mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold animate-fade-in-right ${
              article.category === 'stocks' ? 'bg-blue-100 text-blue-800' :
              article.category === 'crypto' ? 'bg-orange-100 text-orange-800' :
              article.category === 'macro' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {article.category.toUpperCase()}
            </span>
            <div className="flex items-center space-x-2 animate-fade-in-right" style={{animationDelay: '200ms'}}>
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                <BookmarkPlus className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up" style={{animationDelay: '300ms'}}>{article.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-6 animate-fade-in" style={{animationDelay: '400ms'}}>
            <span className="font-medium">{article.source}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{getRelativeTime(article.date)}</span>
          </div>

          {article.imageUrl && (
            <div className="relative overflow-hidden rounded-xl mb-6 animate-fade-in-up" style={{animationDelay: '500ms'}}>
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          )}
        </div>        {/* Article Content */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50 mb-8 animate-fade-in-up" style={{animationDelay: '600ms'}}>
          <div className="prose prose-lg max-w-none">
            {articleContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed text-lg animate-fade-in" style={{animationDelay: `${700 + index * 100}ms`}}>
                {paragraph.trim()}
              </p>
            ))}
          </div>
          
          {/* Article Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 animate-fade-in-up" style={{animationDelay: '900ms'}}>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer transform hover:scale-105 animate-fade-in"
                    style={{animationDelay: `${1000 + index * 50}ms`}}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between animate-fade-in-up" style={{animationDelay: '1100ms'}}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:translate-x-1"
            >
              Read original article <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300" />
            </a>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-105">
                <Share2 className="h-4 w-4" />
                <span className="text-sm">Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-105">
                <BookmarkPlus className="h-4 w-4" />
                <span className="text-sm">Save</span>
              </button>
            </div>
          </div>
        </div>        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50 animate-fade-in-up" style={{animationDelay: '1200ms'}}>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle, index) => (
                <Link
                  key={relatedArticle.id}
                  to={`/news/article/${relatedArticle.id}`}
                  className="group block animate-fade-in-up"
                  style={{animationDelay: `${1300 + index * 100}ms`}}
                >
                  <article className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                    {relatedArticle.imageUrl ? (
                      <img 
                        src={relatedArticle.imageUrl} 
                        alt={relatedArticle.title}
                        className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <Newspaper className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {getRelativeTime(relatedArticle.date)}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NewsPage = () => {
  const location = useLocation();

  const navItems = [
    { path: '/news', label: 'All News' },
    { path: '/news/stocks', label: 'Stocks' },
    { path: '/news/crypto', label: 'Crypto' },
    { path: '/news/macro', label: 'Macro' },
    { path: '/news/general', label: 'General' },
  ];  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">        {/* Modern Navigation Bar */}
        <div className="mb-8 animate-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/50 mx-auto max-w-4xl">
            <nav className="flex justify-center items-center p-2">
              <div className="flex items-center space-x-1 w-full max-w-3xl">
                {navItems.map((item) => {
                  const isActive = item.path === location.pathname;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 group ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md transform scale-105'
                          : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50/80'
                      }`}
                    >
                      <span className={`mr-2 text-base transition-transform duration-300 ${
                        isActive ? '' : 'group-hover:scale-110'
                      }`}>
                        {item.label === 'All News' && '📰'}
                        {item.label === 'Stocks' && '📈'}
                        {item.label === 'Crypto' && '🪙'}
                        {item.label === 'Macro' && '🌍'}
                        {item.label === 'General' && '📊'}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>

        {/* Content */}
        <Routes>
          <Route index element={<AllNews />} />
          <Route path=":category" element={<CategoryNews />} />
          <Route path="article/:id" element={<ArticleDetail />} />        </Routes>
      </div>
    </div>
  );
};

export default NewsPage;
