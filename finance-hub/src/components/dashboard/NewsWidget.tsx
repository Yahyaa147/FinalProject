import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Clock,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { getRelativeTime } from '../../utils/helpers';
import type { Article } from '../../types';

interface NewsWidgetProps {
  articles: Article[];
  className?: string;
}

const NewsWidget: React.FC<NewsWidgetProps> = ({ articles, className = "" }) => {
  const getMarketSentiment = () => {
    // Simple sentiment analysis based on keywords
    let positive = 0;
    let negative = 0;
    
    articles.forEach(article => {
      const text = (article.title + ' ' + article.summary).toLowerCase();
      if (text.includes('up') || text.includes('gain') || text.includes('rise') || text.includes('bull')) {
        positive++;
      }
      if (text.includes('down') || text.includes('fall') || text.includes('drop') || text.includes('bear')) {
        negative++;
      }
    });
    
    return { positive, negative, neutral: articles.length - positive - negative };
  };

  const sentiment = getMarketSentiment();
  const overallSentiment = sentiment.positive > sentiment.negative ? 'positive' : 
                          sentiment.negative > sentiment.positive ? 'negative' : 'neutral';
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-colors duration-300 ${className}`}>
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 border-b border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center transition-colors duration-300">
              <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
              Market News
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center transition-colors duration-300">
              <span className={`w-2 h-2 rounded-full mr-2 ${
                overallSentiment === 'positive' ? 'bg-green-500' :
                overallSentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></span>
              {overallSentiment === 'positive' ? 'Bullish sentiment' :
               overallSentiment === 'negative' ? 'Bearish sentiment' : 'Mixed sentiment'}
            </p>
          </div>          <div className="flex items-center space-x-2">
            <Link 
              to="/news"
              className="px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors flex items-center"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Sentiment indicator */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{sentiment.positive}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center transition-colors duration-300">
              <TrendingUp className="h-3 w-3 mr-1" />
              Positive
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-600 dark:text-gray-400">{sentiment.neutral}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">Neutral</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">{sentiment.negative}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center transition-colors duration-300">
              <TrendingDown className="h-3 w-3 mr-1" />
              Negative
            </div>
          </div>
        </div>
      </div>
        <div className="p-6">
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div key={article.id} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0 transition-colors duration-300">
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  index === 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                  index === 1 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                  'bg-gradient-to-r from-green-500 to-blue-500'
                }`}></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 leading-snug hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <Link 
                      to={`/news/article/${article.id}`}
                      className="block"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed line-clamp-2 transition-colors duration-300">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium transition-colors duration-300">{article.source}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center transition-colors duration-300">
                        <Clock className="h-3 w-3 mr-1" />
                        {getRelativeTime(article.date)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        article.category === 'stocks' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300' :
                        article.category === 'crypto' ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300' :
                        article.category === 'macro' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      } transition-colors duration-300`}>
                        {article.category}
                      </span>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        title="Open original article"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsWidget;
