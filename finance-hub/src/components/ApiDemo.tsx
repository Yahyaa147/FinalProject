import React from 'react';
import { useNews, useMarketData, useCryptoPrices, useApiConfig } from '../hooks/useApi';

const ApiDemo: React.FC = () => {
  const { data: news, loading: newsLoading, error: newsError } = useNews('crypto');
  const { data: marketData, loading: marketLoading, error: marketError } = useMarketData();
  const { data: cryptoData, loading: cryptoLoading, error: cryptoError } = useCryptoPrices(['BTC', 'ETH']);
  const { config, healthStatus, checkingHealth } = useApiConfig();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">API Integration Demo</h1>
      
      {/* API Configuration Status */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-3">API Configuration</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Base URL:</strong> {config.baseURL}
          </div>
          <div>
            <strong>Use Mock Data:</strong> {config.useMockData ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Real APIs Enabled:</strong> {config.enableRealAPIs ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Alpha Vantage Key:</strong> {config.alphaVantageKey}
          </div>
          <div>
            <strong>News API Key:</strong> {config.newsApiKey}
          </div>
          <div className="col-span-2">
            <strong>Health Status:</strong> 
            <span className={`ml-2 px-2 py-1 rounded ${
              checkingHealth 
                ? 'bg-yellow-200 text-yellow-800' 
                : healthStatus?.status === 'healthy' 
                  ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'
            }`}>
              {checkingHealth ? 'Checking...' : healthStatus?.status || 'Unknown'}
            </span>
          </div>
        </div>
      </div>

      {/* News API Demo */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">News API (Crypto Category)</h2>
        {newsLoading && <div className="text-blue-600">Loading news...</div>}
        {newsError && <div className="text-red-600">Error: {newsError}</div>}
        {news && (
          <div className="space-y-3">
            {news.slice(0, 3).map((article, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.summary}</p>
                <p className="text-xs text-gray-500">
                  {article.source} • {new Date(article.date).toLocaleDateString()}
                </p>
              </div>
            ))}
            <p className="text-sm text-gray-500">
              Showing 3 of {news.length} articles
            </p>
          </div>
        )}
      </div>

      {/* Market Data API Demo */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Stock Market Data</h2>
        {marketLoading && <div className="text-blue-600">Loading market data...</div>}
        {marketError && <div className="text-red-600">Error: {marketError}</div>}
        {marketData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketData.slice(0, 6).map((stock, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded">
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-lg font-bold">${stock.price.toFixed(2)}</div>
                <div className={`text-sm ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Crypto API Demo */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Cryptocurrency Prices (CoinGecko API)</h2>
        {cryptoLoading && <div className="text-blue-600">Loading crypto data...</div>}
        {cryptoError && <div className="text-red-600">Error: {cryptoError}</div>}
        {cryptoData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cryptoData.map((crypto, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded">
                <div className="font-medium text-lg">{crypto.symbol}</div>
                <div className="text-2xl font-bold">${crypto.price.toLocaleString()}</div>
                <div className={`text-sm ${crypto.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}% (24h)
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Last updated: {new Date(crypto.lastUpdated).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Usage Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">🚀 Enable Real APIs</h2>
        <div className="space-y-2 text-sm">
          <p>To use real external APIs instead of mock data:</p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Set <code className="bg-gray-100 px-1 rounded">VITE_ENABLE_REAL_APIs=true</code> in your .env file</li>
            <li>Get a free API key from <a href="https://www.alphavantage.co/support/#api-key" className="text-blue-600 underline">Alpha Vantage</a> for stock data</li>
            <li>Get a free API key from <a href="https://newsapi.org/" className="text-blue-600 underline">NewsAPI</a> for news data</li>
            <li>Add your keys to the .env file</li>
            <li>Restart the development server</li>
          </ol>
          <p className="mt-3">
            <strong>Note:</strong> CoinGecko API works without a key and can be enabled immediately!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiDemo;
