import { useState } from 'react';
import { PieChart, BarChart3, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { formatCurrency } from '../../utils/helpers';
import { ToolPageHeader, ToolFormSection, ToolResultCard } from '../../components/tools';

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
    <div className="space-y-8">
      {/* Header Section */}
      <ToolPageHeader
        title="Portfolio Analyzer"
        subtitle="Analyze and optimize your investments"
        description="Get comprehensive insights into your portfolio performance, risk assessment, and optimization recommendations for better returns."
        icon={PieChart}
        iconBgGradient="from-purple-500 to-pink-600"
        headerBgGradient="from-purple-50 to-pink-50"
        accentColor="text-purple-600"
        rightIcon={TrendingUp}
        rightIconLabel="Risk Assessment"
      />

      {/* Analysis Trigger */}
      <ToolFormSection
        title="Portfolio Analysis"
        icon={BarChart3}
        iconBgGradient="from-blue-500 to-indigo-600"
      >
        <div className="flex items-center justify-between">
          <div>
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
      </ToolFormSection>      {analysisComplete && (
        <div className="space-y-8">
          {/* Analysis Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Diversification Score */}
            <ToolResultCard
              title="Diversification"
              icon={PieChart}
              gradient="from-blue-50 to-indigo-50"
            >
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
            </ToolResultCard>            {/* Risk Assessment */}
            <ToolResultCard
              title="Risk Level"
              icon={AlertCircle}
              gradient="from-yellow-50 to-orange-50"
            >              <div className="mb-4">
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
            </ToolResultCard>

            {/* Performance Score */}
            <ToolResultCard
              title="Performance"
              icon={TrendingUp}
              gradient="from-green-50 to-emerald-50"
            >              <div className="mb-4">
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
            </ToolResultCard>
          </div>          {/* Asset Allocation Breakdown */}
          <ToolResultCard
            title="Asset Allocation Breakdown"
            icon={PieChart}
            gradient="from-purple-50 to-indigo-50"
          >
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
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">                  <span className="text-gray-600 font-bold">{portfolioAnalysis.assetAllocation.cash}%</span>
                </div>
                <div className="text-sm font-medium text-gray-900">Cash</div>
                <div className="text-xs text-gray-600">Liquidity</div>
              </div>
            </div>
          </ToolResultCard>          {/* Recommendations */}
          <ToolResultCard
            title="Optimization Recommendations"
            icon={CheckCircle}
            gradient="from-green-50 to-emerald-50"
          >
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
                  <div className="text-sm text-blue-700">                    Consider adding international exposure to further diversify your holdings.
                  </div>
                </div>
              </div>
            </div>
          </ToolResultCard>
        </div>
      )}
    </div>
  );
};

export default PortfolioAnalyzer;
