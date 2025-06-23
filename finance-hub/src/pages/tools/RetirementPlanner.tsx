import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calculator, TrendingUp, DollarSign, Calendar, Target, PiggyBank } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { ToolPageHeader, ToolFormSection, ToolResultCard } from '../../components/tools';

interface RetirementFormData {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  inflationRate: number;
  retirementGoal: number;
}

interface RetirementResult {
  totalSavings: number;
  monthlyRetirementIncome: number;
  yearsOfRetirement: number;
  shortfall: number;
  recommendedMonthlyContribution: number;
}

const calculateRetirement = (data: RetirementFormData): RetirementResult => {
  const yearsToRetirement = data.retirementAge - data.currentAge;
  const monthsToRetirement = yearsToRetirement * 12;
  const monthlyReturn = data.expectedReturn / 100 / 12;
  const yearsOfRetirement = 85 - data.retirementAge; // Assume living to 85
  
  // Future value of current savings
  const futureCurrentSavings = data.currentSavings * Math.pow(1 + data.expectedReturn / 100, yearsToRetirement);
  
  // Future value of monthly contributions
  const futureContributions = data.monthlyContribution * 
    ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn);
  
  const totalSavings = futureCurrentSavings + futureContributions;
  
  // Monthly retirement income (4% withdrawal rule adjusted for inflation)
  const withdrawalRate = 0.04 / 12;
  const monthlyRetirementIncome = totalSavings * withdrawalRate;
  
  // Calculate shortfall
  const monthlyGoal = data.retirementGoal / 12;
  const shortfall = Math.max(0, monthlyGoal - monthlyRetirementIncome);
  
  // Recommended monthly contribution to meet goal
  const additionalNeeded = data.retirementGoal - totalSavings;
  const recommendedMonthlyContribution = additionalNeeded > 0 ? 
    (additionalNeeded / ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn)) + data.monthlyContribution :
    data.monthlyContribution;
  
  return {
    totalSavings,
    monthlyRetirementIncome,
    yearsOfRetirement,
    shortfall,
    recommendedMonthlyContribution
  };
};

const RetirementPlanner = () => {
  const [result, setResult] = useState<RetirementResult | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<RetirementFormData>({
    defaultValues: {
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 50000,
      monthlyContribution: 1000,
      expectedReturn: 7,
      inflationRate: 3,
      retirementGoal: 1000000
    },
    mode: 'onChange'
  });

  const watchedValues = watch();

  const onSubmit = (data: RetirementFormData) => {
    const calculationResult = calculateRetirement(data);
    setResult(calculationResult);
  };

  // Calculate preview in real-time
  const previewResult = isValid ? calculateRetirement(watchedValues) : null;
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <ToolPageHeader
        title="Retirement Planner"
        subtitle="Plan your secure financial future"
        description="Plan your retirement with our comprehensive calculator. See how much you need to save and if you're on track to meet your retirement goals."
        icon={PiggyBank}
        iconBgGradient="from-green-500 to-emerald-600"
        headerBgGradient="from-green-50 to-emerald-50"
        accentColor="text-green-600"
        rightIcon={Target}
        rightIconLabel="Future Planning"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div>
          <ToolFormSection
            title="Retirement Parameters"
            icon={Calculator}
            iconBgGradient="from-blue-500 to-indigo-600"
          >
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Age Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Age
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    {...register('currentAge', { 
                      required: 'Current age is required',
                      min: { value: 18, message: 'Age must be at least 18' },
                      max: { value: 80, message: 'Age cannot exceed 80' }
                    })}
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="30"
                  />
                </div>
                {errors.currentAge && (
                  <p className="text-red-600 text-sm mt-1">{errors.currentAge.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retirement Age
                </label>
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    {...register('retirementAge', { 
                      required: 'Retirement age is required',
                      min: { value: 50, message: 'Retirement age must be at least 50' },
                      max: { value: 80, message: 'Retirement age cannot exceed 80' }
                    })}
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="65"
                  />
                </div>
                {errors.retirementAge && (
                  <p className="text-red-600 text-sm mt-1">{errors.retirementAge.message}</p>
                )}
              </div>
            </div>

            {/* Current Savings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Retirement Savings
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  step="1000"
                  {...register('currentSavings', { 
                    required: 'Current savings amount is required',
                    min: { value: 0, message: 'Amount must be positive' }
                  })}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="50000"
                />
              </div>
              {errors.currentSavings && (
                <p className="text-red-600 text-sm mt-1">{errors.currentSavings.message}</p>
              )}
            </div>

            {/* Monthly Contribution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Contribution
              </label>
              <div className="relative">
                <PiggyBank className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  step="50"
                  {...register('monthlyContribution', { 
                    required: 'Monthly contribution is required',
                    min: { value: 0, message: 'Amount must be positive' }
                  })}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1000"
                />
              </div>
              {errors.monthlyContribution && (
                <p className="text-red-600 text-sm mt-1">{errors.monthlyContribution.message}</p>
              )}
            </div>

            {/* Expected Return and Inflation */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Annual Return (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('expectedReturn', { 
                    required: 'Expected return is required',
                    min: { value: 0, message: 'Return must be positive' },
                    max: { value: 20, message: 'Return cannot exceed 20%' }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="7"
                />
                {errors.expectedReturn && (
                  <p className="text-red-600 text-sm mt-1">{errors.expectedReturn.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inflation Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('inflationRate', { 
                    required: 'Inflation rate is required',
                    min: { value: 0, message: 'Rate must be positive' },
                    max: { value: 10, message: 'Rate cannot exceed 10%' }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="3"
                />
                {errors.inflationRate && (
                  <p className="text-red-600 text-sm mt-1">{errors.inflationRate.message}</p>
                )}
              </div>
            </div>

            {/* Retirement Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retirement Savings Goal
              </label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  step="10000"
                  {...register('retirementGoal', { 
                    required: 'Retirement goal is required',
                    min: { value: 100000, message: 'Goal must be at least $100,000' }
                  })}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1000000"
                />
              </div>
              {errors.retirementGoal && (
                <p className="text-red-600 text-sm mt-1">{errors.retirementGoal.message}</p>
              )}
            </div>            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
              disabled={!isValid}
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate Retirement Plan</span>
            </button>
          </form>
          </ToolFormSection>
        </div>        {/* Results */}
        <div className="space-y-6">
          {/* Live Preview */}
          {previewResult && (
            <ToolResultCard
              title="Live Preview"
              icon={TrendingUp}
              gradient="from-blue-50 to-purple-50"
            >
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Projected Retirement Savings</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(previewResult.totalSavings)}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Monthly Retirement Income</div>
                  <div className="text-xl font-bold text-green-600">
                    {formatCurrency(previewResult.monthlyRetirementIncome)}
                  </div>
                </div>
                
                {previewResult.shortfall > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-sm text-red-600 mb-1">Monthly Shortfall</div>
                    <div className="text-lg font-bold text-red-600">
                      {formatCurrency(previewResult.shortfall)}
                    </div>
                    <div className="text-xs text-red-600 mt-1">
                      Consider increasing contributions to {formatCurrency(previewResult.recommendedMonthlyContribution)}/month
                    </div>
                  </div>                )}
              </div>
            </ToolResultCard>
          )}          {/* Detailed Results */}
          {result && (
            <ToolResultCard
              title="Detailed Analysis"
              icon={Target}
              gradient="from-gray-50 to-gray-100"
            >
              
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-600 mb-1">Years to Retirement</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {watchedValues.retirementAge - watchedValues.currentAge}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-600 mb-1">Retirement Duration</div>
                    <div className="text-2xl font-bold text-green-600">
                      {result.yearsOfRetirement} years
                    </div>
                  </div>
                </div>

                {/* Goal Assessment */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Goal Assessment</h4>
                  {result.shortfall === 0 ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="font-medium text-green-900">On Track!</div>
                      </div>
                      <div className="text-sm text-green-700 mt-1">
                        You're on track to meet your retirement goal with your current savings plan.
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="font-medium text-yellow-900">Needs Adjustment</div>
                      </div>
                      <div className="text-sm text-yellow-700 mt-1">
                        Consider increasing your monthly contribution to {formatCurrency(result.recommendedMonthlyContribution)} 
                        to meet your retirement goal.
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommendations */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Recommendations</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      • Maximize employer 401(k) matching if available
                    </div>
                    <div className="text-sm text-gray-600">
                      • Consider increasing contributions by 1% annually
                    </div>
                    <div className="text-sm text-gray-600">
                      • Diversify investments based on your risk tolerance
                    </div>
                    <div className="text-sm text-gray-600">
                      • Review and adjust plan annually
                    </div>                  </div>
                </div>
              </div>
            </ToolResultCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetirementPlanner;
