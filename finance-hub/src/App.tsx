import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PortfolioPage from './pages/PortfolioPage';
import NewsPage from './pages/NewsPage';
import ToolsPage from './pages/ToolsPage';
import CommunityPage from './pages/CommunityPage';
import DiscoverPage from './pages/DiscoverPage';
import { usePortfolioStore } from './store/portfolioStore';
import { mockAssets, mockTransactions } from './data/mockData';

function App() {
  const { addAsset, addTransaction, assets, transactions } = usePortfolioStore();

  // Initialize with mock data if empty
  useEffect(() => {
    if (assets.length === 0) {
      mockAssets.forEach(asset => addAsset(asset));
    }
    if (transactions.length === 0) {
      mockTransactions.forEach(transaction => addTransaction(transaction));
    }
  }, [assets.length, transactions.length, addAsset, addTransaction]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="portfolio/*" element={<PortfolioPage />} />
          <Route path="discover/*" element={<DiscoverPage />} />
          <Route path="news/*" element={<NewsPage />} />
          <Route path="tools/*" element={<ToolsPage />} />
          <Route path="community/*" element={<CommunityPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
