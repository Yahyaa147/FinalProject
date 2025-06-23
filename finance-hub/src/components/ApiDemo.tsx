import { useState } from 'react';
import { ApiService } from '../services/apiService';
import type { Article } from '../types';

const ApiDemo = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async (category?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ApiService.getNews(category);
      if (response.success) {
        setArticles(response.data);
      } else {
        setError(response.error || 'Failed to fetch news');
      }
    } catch (err) {
      setError('An error occurred while fetching news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">API Demo</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Test News API</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => fetchNews()}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Loading...' : 'Fetch All News'}
              </button>
              <button
                onClick={() => fetchNews('stocks')}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                Fetch Stocks News
              </button>
              <button
                onClick={() => fetchNews('crypto')}
                disabled={loading}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition-colors"
              >
                Fetch Crypto News
              </button>
              <button
                onClick={() => fetchNews('macro')}
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                Fetch Macro News
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {articles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Results ({articles.length} articles)
              </h3>
              <div className="space-y-4">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 flex-1">
                        {article.title}
                      </h4>
                      <span className="ml-4 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {article.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{article.summary}</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span>Source: {article.source}</span>
                      <span>Author: {article.author}</span>
                      <span>Date: {article.date.toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && articles.length === 0 && !error && (
            <div className="text-center py-8">
              <p className="text-gray-500">Click a button above to test the API</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiDemo;
