import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Calculator, 
  TrendingUp, 
  PieChart, 
  DollarSign,
  BarChart3
} from 'lucide-react';
import { calculateCompoundInterest, formatCurrency } from '../utils/helpers';
import type { CompoundInterestFormData } from '../types';
import type { CompoundInterestResult } from '../utils/helpers';
import PortfolioAnalyzer from './tools/PortfolioAnalyzer';
import RetirementPlanner from './tools/RetirementPlanner';

const CompoundInterestCalculator = () => {
  const [result, setResult] = useState<CompoundInterestResult | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<CompoundInterestFormData>({
    defaultValues: {
      principal: 10000,
      monthlyContribution: 500,
      annualRate: 7,
      years: 10,
      compoundFrequency: 'monthly'
    },
    mode: 'onChange'
  });

  const watchedValues = watch();

  const onSubmit = (data: CompoundInterestFormData) => {
    const calculationResult = calculateCompoundInterest(
      data.principal,
      data.monthlyContribution,
      data.annualRate,
      data.years,
      data.compoundFrequency
    );
    setResult(calculationResult);
  };

  // Calculate preview in real-time
  const previewResult = isValid ? calculateCompoundInterest(
    watchedValues.principal || 0,
    watchedValues.monthlyContribution || 0,
    watchedValues.annualRate || 0,
    watchedValues.years || 0,
    watchedValues.compoundFrequency || 'monthly'
  ) : null;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compound Interest Calculator</h2>
        <p className="text-gray-600">
          Calculate how your investments can grow over time with the power of compound interest.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Parameters</h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Principal Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Investment
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  {...register('principal', { 
                    required: 'Principal amount is required',
                    min: { value: 0, message: 'Amount must be positive' }
                  })}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="10000"
                />
              </div>
              {errors.principal && (
                <p className="text-red-600 text-sm mt-1">{errors.principal.message}</p>
              )}
            </div>

            {/* Monthly Contribution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Contribution
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  {...register('monthlyContribution', { 
                    required: 'Monthly contribution is required',
                    min: { value: 0, message: 'Amount must be positive' }
                  })}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="500"
                />
              </div>
              {errors.monthlyContribution && (
                <p className="text-red-600 text-sm mt-1">{errors.monthlyContribution.message}</p>
              )}
            </div>

            {/* Annual Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('annualRate', { 
                  required: 'Interest rate is required',
                  min: { value: 0, message: 'Rate must be positive' },
                  max: { value: 100, message: 'Rate cannot exceed 100%' }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="7"
              />
              {errors.annualRate && (
                <p className="text-red-600 text-sm mt-1">{errors.annualRate.message}</p>
              )}
            </div>

            {/* Investment Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Period (Years)
              </label>
              <input
                type="number"
                {...register('years', { 
                  required: 'Investment period is required',
                  min: { value: 1, message: 'Period must be at least 1 year' },
                  max: { value: 50, message: 'Period cannot exceed 50 years' }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="10"
              />
              {errors.years && (
                <p className="text-red-600 text-sm mt-1">{errors.years.message}</p>
              )}
            </div>

            {/* Compound Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compound Frequency
              </label>
              <select
                {...register('compoundFrequency')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
              disabled={!isValid}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Investment Growth
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Live Preview */}
          {previewResult && (
            <div className="card bg-gradient-to-r from-primary-50 to-blue-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Final Amount:</span>
                  <span className="text-xl font-bold text-primary-600">
                    {formatCurrency(previewResult.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Contributions:</span>
                  <span className="font-medium">
                    {formatCurrency(previewResult.totalContributions)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Interest:</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(previewResult.totalInterest)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Results */}
          {result && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation Results</h3>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(result.totalAmount)}
                  </p>
                  <p className="text-sm text-gray-600">Final Amount</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.totalInterest)}
                  </p>
                  <p className="text-sm text-gray-600">Interest Earned</p>
                </div>
              </div>

              {/* Year by Year Breakdown */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Year-by-Year Breakdown</h4>
                <div className="max-h-64 overflow-y-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Contributions</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Interest</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {result.yearlyBreakdown.map((year: any) => (
                        <tr key={year.year} className="hover:bg-gray-50">
                          <td className="px-3 py-2 text-sm text-gray-900">{year.year}</td>
                          <td className="px-3 py-2 text-sm text-gray-900">
                            {formatCurrency(year.contributions)}
                          </td>
                          <td className="px-3 py-2 text-sm text-green-600">
                            {formatCurrency(year.interest)}
                          </td>
                          <td className="px-3 py-2 text-sm font-medium text-gray-900">
                            {formatCurrency(year.endingAmount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Financial Tools
                </h1>
                <p className="mt-3 text-lg text-gray-600">
                  Powerful calculators and analyzers to help you make informed financial decisions.
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
                      <div className="flex items-center">                        <div className={`p-4 rounded-xl ${tool.bgColor} group-hover:scale-110 transition-transform duration-300`}>
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

        {/* Enhanced All Tools Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                  Quick Tools Overview
                </h2>
                <p className="text-sm text-gray-600 mt-1">Access all financial calculation tools</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="group flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{tool.title}</p>
                      <p className="text-sm text-gray-500">{tool.stats}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
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
