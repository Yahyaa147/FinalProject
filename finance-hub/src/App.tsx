import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import { usePortfolioStore } from './store/portfolioStore';
import { mockAssets, mockTransactions } from './data/mockData';

// Placeholder components for other pages
const Portfolio = () => <div className="p-8"><h1 className="text-2xl font-bold">Portfolio (Coming Soon)</h1></div>;
const News = () => <div className="p-8"><h1 className="text-2xl font-bold">News (Coming Soon)</h1></div>;
const Tools = () => <div className="p-8"><h1 className="text-2xl font-bold">Tools (Coming Soon)</h1></div>;
const Community = () => <div className="p-8"><h1 className="text-2xl font-bold">Community (Coming Soon)</h1></div>;

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
          <Route path="portfolio/*" element={<Portfolio />} />
          <Route path="news/*" element={<News />} />
          <Route path="tools/*" element={<Tools />} />
          <Route path="community/*" element={<Community />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
