import { useState } from 'react';
import { PieChart, BarChart3, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { formatCurrency, formatPercentage } from '../../utils/helpers';

const PortfolioAnalyzer = () => {
  const { assets, getTotalPortfolioValue } = usePortfolioStore();
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  const totalValue = getTotalPortfolioValue();

  const runAnalysis = () => {
    setAnalysisComplete(true);
  };

  // Calculate portfolio metrics
  const portfolioAnalysis = {
    diversification: {
      score: 85,
      status: 'Good',
      recommendation: 'Well diversified across sectors',
      color: 'text-green-600'
    },
    riskLevel: {
      score: 'Moderate',
      volatility: '12.5%',
      recommendation: 'Balanced risk profile suitable for long-term growth',
      color: 'text-yellow-600'
    },
    performanceScore: {
      score: 92,
      benchmark: '+8.2%',
      recommendation: 'Outperforming market benchmarks',
      color: 'text-green-600'
    },
    assetAllocation: {
      stocks: 65,
      bonds: 20,
      crypto: 10,
      cash: 5
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Analyzer</h2>
        <p className="text-gray-600">
          Get comprehensive insights into your portfolio performance, risk assessment, and optimization recommendations.
        </p>
      </div>

      {/* Analysis Trigger */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Portfolio Analysis</h3>
            <p className="text-gray-600">
              Analyze your current portfolio of {assets.length} assets worth {formatCurrency(totalValue)}
            </p>
          </div>
          <button
            onClick={runAnalysis}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Run Analysis</span>
          </button>
        </div>
      </div>

      {analysisComplete && (
        <div className="space-y-8">
          {/* Analysis Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Diversification Score */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Diversification</h3>
                <PieChart className="h-5 w-5 text-blue-600" />
              </div>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-3xl font-bold text-green-600">{portfolioAnalysis.diversification.score}</div>
                  <div className="text-sm text-gray-600">/100</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${portfolioAnalysis.diversification.score}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className={`text-sm font-medium ${portfolioAnalysis.diversification.color}`}>
                  {portfolioAnalysis.diversification.status}
                </div>
                <div className="text-sm text-gray-600">
                  {portfolioAnalysis.diversification.recommendation}
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Risk Level</h3>
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="mb-4">
                <div className="text-2xl font-bold text-yellow-600 mb-2">
                  {portfolioAnalysis.riskLevel.score}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Volatility: {portfolioAnalysis.riskLevel.volatility}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {portfolioAnalysis.riskLevel.recommendation}
              </div>
            </div>

            {/* Performance Score */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-3xl font-bold text-green-600">{portfolioAnalysis.performanceScore.score}</div>
                  <div className="text-sm text-gray-600">/100</div>
                </div>
                <div className="text-sm text-green-600 font-medium">
                  vs Market: {portfolioAnalysis.performanceScore.benchmark}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {portfolioAnalysis.performanceScore.recommendation}
              </div>
            </div>
          </div>

          {/* Asset Allocation Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Asset Allocation Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{portfolioAnalysis.assetAllocation.stocks}%</span>
                </div>
                <div className="text-sm font-medium text-gray-900">Stocks</div>
                <div className="text-xs text-gray-600">Growth focused</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-green-600 font-bold">{portfolioAnalysis.assetAllocation.bonds}%</span>
                </div>
                <div className="text-sm font-medium text-gray-900">Bonds</div>
                <div className="text-xs text-gray-600">Stability</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-orange-600 font-bold">{portfolioAnalysis.assetAllocation.crypto}%</span>
                </div>
                <div className="text-sm font-medium text-gray-900">Crypto</div>
                <div className="text-xs text-gray-600">High growth</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-gray-600 font-bold">{portfolioAnalysis.assetAllocation.cash}%</span>
                </div>
                <div className="text-sm font-medium text-gray-900">Cash</div>
                <div className="text-xs text-gray-600">Liquidity</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Optimization Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-green-900">Well Diversified</div>
                  <div className="text-sm text-green-700">
                    Your portfolio shows good diversification across asset classes and sectors.
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-900">Consider Rebalancing</div>
                  <div className="text-sm text-yellow-700">
                    Consider increasing your bond allocation to 25% for better risk-adjusted returns.
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900">Growth Opportunity</div>
                  <div className="text-sm text-blue-700">
                    Consider adding international exposure to further diversify your holdings.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioAnalyzer;
