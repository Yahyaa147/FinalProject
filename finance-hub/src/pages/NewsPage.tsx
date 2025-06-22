import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { 
  Newspaper, 
  Clock, 
  ExternalLink, 
  Filter,
  Search,
  RefreshCw,
  ArrowLeft,
  Share2,
  BookmarkPlus
} from 'lucide-react';
import { ApiService } from '../services/apiService';
import { getRelativeTime } from '../utils/helpers';
import type { Article } from '../types';

const NewsGrid = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link
          key={article.id}
          to={`/news/article/${article.id}`}
          className="group block"
        >
          <article className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            {article.imageUrl && (
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}
            <div className="flex items-center justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                article.category === 'stocks' ? 'bg-blue-100 text-blue-800' :
                article.category === 'crypto' ? 'bg-orange-100 text-orange-800' :
                article.category === 'macro' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {article.category.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {getRelativeTime(article.date)}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {article.summary}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium">{article.source}</span>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700 text-sm font-medium">
                Read Article
                <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </article>
        </Link>
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
        // Show more articles (e.g., 12 instead of the default)
        const expandedArticles = [...response.data, ...response.data, ...response.data].slice(0, 12);
        setArticles(expandedArticles);
        setFilteredArticles(expandedArticles);
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mr-2" />
          <span className="text-lg text-gray-600">Loading news...</span>
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
                  Financial News
                </h1>
                <p className="mt-3 text-lg text-gray-600">
                  Stay updated with the latest market news, analysis, and insights.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
                  <Newspaper className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Filter className="h-5 w-5 text-blue-600 mr-2" />
              Filter & Search
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white min-w-40"
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
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-blue-600">{filteredArticles.length}</span> article{filteredArticles.length !== 1 ? 's' : ''}
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
            Latest Articles
          </h2>
          
          {/* News Grid */}
          {filteredArticles.length > 0 ? (
            <NewsGrid articles={filteredArticles} />
          ) : (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200/50 text-center">
              <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">No articles found matching your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
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

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      
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
      setIsLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mr-2" />
          <span className="text-lg text-gray-600">Loading article...</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
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
  const articleContent = `
    ${article.summary}
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    
    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            to="/news"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Link>
        </div>

        {/* Article Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              article.category === 'stocks' ? 'bg-blue-100 text-blue-800' :
              article.category === 'crypto' ? 'bg-orange-100 text-orange-800' :
              article.category === 'macro' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {article.category.toUpperCase()}
            </span>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <BookmarkPlus className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span className="font-medium">{article.source}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{getRelativeTime(article.date)}</span>
          </div>

          {article.imageUrl && (
            <div className="relative overflow-hidden rounded-xl mb-6">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50 mb-8">
          <div className="prose prose-lg max-w-none">
            {articleContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Read original article <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/news/article/${relatedArticle.id}`}
                  className="group block"
                >
                  <article className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                    {relatedArticle.imageUrl && (
                      <img 
                        src={relatedArticle.imageUrl} 
                        alt={relatedArticle.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
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
  ];

  // If we're on the main news page, show the enhanced AllNews component
  if (location.pathname === '/news') {
    return <AllNews />;
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
                  Financial News
                </h1>
                <p className="mt-3 text-lg text-gray-600">
                  Stay updated with the latest market news, analysis, and insights.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
                  <Newspaper className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50">
            <nav className="flex space-x-8 overflow-x-auto">
              {navItems.map((item) => {
                const isActive = item.path === location.pathname;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors whitespace-nowrap ${
                      isActive
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8">
          <Routes>
            <Route index element={<AllNews />} />
            <Route path=":category" element={<CategoryNews />} />
            <Route path="article/:id" element={<ArticleDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
