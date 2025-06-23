import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  PieChart,
  BarChart3,
  Target,
  ArrowRight
} from 'lucide-react';
import { calculateCompoundInterest, formatCurrency } from '../../utils/helpers';
import type { CompoundInterestFormData } from '../../types';
import type { CompoundInterestResult } from '../../utils/helpers';
import { ToolPageHeader, ToolFormSection, ToolResultCard } from '../../components/tools';

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
    <div className="space-y-8">
      {/* Header Section */}
      <ToolPageHeader
        title="Compound Interest Calculator"
        subtitle="Watch your money grow exponentially"
        description="Calculate how your investments can grow over time with the power of compound interest. See the magic of exponential growth in action."
        icon={Calculator}
        iconBgGradient="from-blue-500 to-indigo-600"
        headerBgGradient="from-blue-50 to-indigo-50"
        accentColor="text-blue-600"
        rightIcon={TrendingUp}
        rightIconLabel="Exponential Growth"
      />      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Calculator Form */}
        <div className="xl:col-span-1">
          <ToolFormSection
            title="Investment Parameters"
            icon={DollarSign}
            iconBgGradient="from-green-500 to-emerald-600"
          >
            
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
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    {...register('annualRate', { 
                      required: 'Interest rate is required',
                      min: { value: 0, message: 'Rate must be positive' },
                      max: { value: 100, message: 'Rate cannot exceed 100%' }
                    })}
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="7"
                  />
                </div>
                {errors.annualRate && (
                  <p className="text-red-600 text-sm mt-1">{errors.annualRate.message}</p>
                )}
              </div>

              {/* Time Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Period (Years)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    {...register('years', { 
                      required: 'Time period is required',
                      min: { value: 1, message: 'Must be at least 1 year' },
                      max: { value: 50, message: 'Cannot exceed 50 years' }
                    })}
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="10"
                  />
                </div>
                {errors.years && (
                  <p className="text-red-600 text-sm mt-1">{errors.years.message}</p>
                )}
              </div>

              {/* Compound Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compounding Frequency
                </label>
                <select
                  {...register('compoundFrequency')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Calculator className="h-5 w-5" />
                <span>Calculate Growth</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </ToolFormSection>
        </div>        {/* Results Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Live Preview */}
          {previewResult && (
            <ToolResultCard
              title="Live Preview"
              icon={Target}
              gradient="from-green-50 to-emerald-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border border-green-200/50">
                  <p className="text-sm text-gray-600 mb-1">Final Balance</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(previewResult.totalAmount)}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-green-200/50">
                  <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(previewResult.totalInterest)}</p>
                </div>                <div className="bg-white rounded-xl p-4 border border-green-200/50">
                  <p className="text-sm text-gray-600 mb-1">Total Contributions</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(previewResult.totalContributions)}</p>
                </div>
              </div>
            </ToolResultCard>
          )}          {/* Detailed Results */}
          {result && (
            <ToolResultCard
              title="Detailed Results"
              icon={BarChart3}
              gradient="from-gray-50 to-gray-100"
            >
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50">
                  <PieChart className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Final Balance</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(result.totalAmount)}</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200/50">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Total Interest Earned</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(result.totalInterest)}</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200/50">
                  <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Total Contributions</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(result.totalContributions)}</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200/50">
                  <Calculator className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Growth Multiple</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {((result.totalAmount / result.totalContributions) || 1).toFixed(2)}x
                  </p>
                </div>
              </div>

              {/* Breakdown Chart Placeholder */}
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Investment Breakdown</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(watchedValues.principal || 0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Monthly Contributions:</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency((watchedValues.monthlyContribution || 0) * (watchedValues.years || 0) * 12)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <span className="text-gray-600">Interest Earned:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(result.totalInterest)}</span>
                  </div>                  <div className="flex items-center justify-between border-t pt-4">
                    <span className="text-lg font-semibold text-gray-900">Total Final Amount:</span>
                    <span className="text-lg font-bold text-blue-600">{formatCurrency(result.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </ToolResultCard>
          )}          {/* Tips Section */}
          <ToolResultCard
            title="Compound Interest Tips"
            icon={Target}
            gradient="from-yellow-50 to-amber-50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-700"><strong>Start Early:</strong> Time is your greatest asset in compound interest.</p>
                <p className="text-sm text-gray-700"><strong>Consistency:</strong> Regular contributions matter more than large lump sums.</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-700"><strong>Higher Frequency:</strong> Monthly compounding beats annual compounding.</p>
                <p className="text-sm text-gray-700"><strong>Patience:</strong> The magic happens in the later years of your investment.</p>
              </div>
            </div>
          </ToolResultCard>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
