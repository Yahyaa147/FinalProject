import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { 
  Newspaper, 
  Clock, 
  ExternalLink, 
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';
import { ApiService } from '../services/apiService';
import { getRelativeTime } from '../utils/helpers';
import type { Article } from '../types';

const NewsGrid = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <article key={article.id} className="card hover:shadow-lg transition-shadow">
          {article.imageUrl && (
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              article.category === 'stocks' ? 'bg-blue-100 text-blue-800' :
              article.category === 'crypto' ? 'bg-orange-100 text-orange-800' :
              article.category === 'macro' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {article.category}
            </span>
            <span className="text-xs text-gray-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {getRelativeTime(article.date)}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.summary}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{article.source}</span>
            <Link
              to={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
            >
              Read More <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

const AllNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'stocks', label: 'Stocks' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'macro', label: 'Macro' },
    { value: 'general', label: 'General' }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      const response = await ApiService.getNews();
      if (response.success) {
        setArticles(response.data);
        setFilteredArticles(response.data);
      }
      setIsLoading(false);
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
      );
    }

    setFilteredArticles(filtered);
  }, [articles, selectedCategory, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-primary-600 mr-2" />
        <span className="text-lg text-gray-600">Loading news...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest Financial News</h2>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-6">
          Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* News Grid */}
      {filteredArticles.length > 0 ? (
        <NewsGrid articles={filteredArticles} />
      ) : (
        <div className="text-center py-12">
          <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No articles found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

const CategoryNews = () => {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setIsLoading(true);
      const response = await ApiService.getNews(category);
      if (response.success) {
        setArticles(response.data);
      }
      setIsLoading(false);
    };

    fetchCategoryNews();
  }, [category]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-primary-600 mr-2" />
        <span className="text-lg text-gray-600">Loading {category} news...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
          {category} News
        </h2>
        <p className="text-gray-600">
          Latest news and updates in the {category} sector
        </p>
      </div>

      {articles.length > 0 ? (
        <NewsGrid articles={articles} />
      ) : (
        <div className="text-center py-12">
          <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No {category} articles available at the moment.</p>
        </div>
      )}
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
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Financial News</h1>
        <p className="mt-2 text-gray-600">
          Stay updated with the latest market news, analysis, and insights.
        </p>
      </div>

      {/* Sub Navigation */}
      <div className="mb-8">
        <nav className="flex space-x-8 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = item.path === location.pathname;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <Routes>
        <Route index element={<AllNews />} />
        <Route path=":category" element={<CategoryNews />} />
      </Routes>
    </div>
  );
};

export default NewsPage;
