import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  PieChart, 
  BarChart3,
  Settings
} from 'lucide-react';
import PortfolioAnalyzer from './tools/PortfolioAnalyzer';
import RetirementPlanner from './tools/RetirementPlanner';
import CompoundInterestCalculator from './tools/CompoundInterestCalculator';
import PageHeader from '../components/PageHeader';
import { DashboardQuickActions } from '../components/dashboard';

const ToolsOverview = () => {
  const tools = [
    {
      title: 'Compound Interest Calculator',
      description: 'Calculate how your investments can grow over time with compound interest.',
      icon: Calculator,
      path: '/tools/compound-interest',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      stats: 'Exponential Growth'
    },
    {
      title: 'Portfolio Analyzer',
      description: 'Analyze your portfolio performance, risk assessment, and get optimization recommendations.',
      icon: PieChart,
      path: '/tools/portfolio-analyzer',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      stats: 'Risk Assessment'
    },
    {
      title: 'Retirement Planner',
      description: 'Plan your retirement with comprehensive calculations and projections.',
      icon: TrendingUp,
      path: '/tools/retirement-planner',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      stats: 'Future Planning'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reusable Page Header Component */}
        <PageHeader
          title="Financial Tools"
          subtitle="🧮 Powerful calculators and analyzers to help you make informed financial decisions."
          icon={<Settings className="h-10 w-10 text-white" />}
          badges={[
            {
              text: 'Compound Interest',
              variant: 'primary'
            },
            {
              text: '📊 Portfolio Analyzer',
              variant: 'info'
            },
            {
              text: 'Retirement Planner',
              variant: 'success'
            },
            {
              text: 'Risk Calculator',
              variant: 'warning'
            }
          ]}
          backgroundGradient="from-indigo-900 via-purple-900 to-pink-900"
          accentGradient="from-indigo-400 via-purple-400 to-pink-400"
          rightContent={
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
              <Calculator className="h-8 w-8 text-purple-300" />
            </div>
          }
        />

        {/* Tools Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
            Available Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`p-4 rounded-xl ${tool.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-6 w-6 ${
                            tool.path.includes('compound-interest') ? 'text-blue-600' :
                            tool.path.includes('portfolio-analyzer') ? 'text-purple-600' :
                            'text-green-600'
                          }`} />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium">{tool.stats}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-2 h-16 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full overflow-hidden">
                          <div 
                            className={`w-full bg-gradient-to-b ${tool.color} rounded-full transition-all duration-1000`}
                            style={{ height: `${60 + (index * 15)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                        Use Tool
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Enhanced Quick Tools Section using Reusable Component */}
        <DashboardQuickActions 
          title="Quick Tools Overview"
          actions={tools.map((tool) => ({
            title: tool.title,
            description: tool.description,
            link: tool.path,
            icon: tool.icon,
            gradient: `bg-gradient-to-r ${tool.color}`
          }))}
        />
      </div>
    </div>
  );
};

const ToolsPage = () => {
  const location = useLocation();
  const navItems = [
    { path: '/tools', label: 'All Tools', icon: BarChart3 },
    { path: '/tools/compound-interest', label: 'Compound Interest', icon: Calculator },
    { path: '/tools/portfolio-analyzer', label: 'Portfolio Analyzer', icon: PieChart },
    { path: '/tools/retirement-planner', label: 'Retirement Planner', icon: TrendingUp },
  ];

  // If we're on the main tools page, show the enhanced overview
  if (location.pathname === '/tools') {
    return <ToolsOverview />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Financial Tools
                </h1>
                <p className="mt-3 text-lg text-gray-600">
                  Comprehensive calculators and analyzers for your financial planning needs.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50">
            <nav className="flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.path === location.pathname;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                      isActive
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
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
            <Route index element={<ToolsOverview />} />
            <Route path="compound-interest" element={<CompoundInterestCalculator />} />
            <Route path="portfolio-analyzer" element={<PortfolioAnalyzer />} />
            <Route path="retirement-planner" element={<RetirementPlanner />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
