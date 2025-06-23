import React from 'react';

interface AnalyticsMetric {
  value: string | number;
  label: string;
  sublabel?: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

interface CategoryAnalyticsProps {
  metrics: AnalyticsMetric[];
  className?: string;
}

const CategoryAnalytics: React.FC<CategoryAnalyticsProps> = ({ metrics, className = '' }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          value: 'text-blue-600',
          label: 'text-blue-700',
          sublabel: 'text-blue-500'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          value: 'text-green-600',
          label: 'text-green-700',
          sublabel: 'text-green-500'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          value: 'text-purple-600',
          label: 'text-purple-700',
          sublabel: 'text-purple-500'
        };
      case 'orange':
        return {
          bg: 'bg-orange-50',
          value: 'text-orange-600',
          label: 'text-orange-700',
          sublabel: 'text-orange-500'
        };
      default:
        return {
          bg: 'bg-blue-50',
          value: 'text-blue-600',
          label: 'text-blue-700',
          sublabel: 'text-blue-500'
        };
    }
  };

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${className}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">📈</span>
        Category Analytics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const colors = getColorClasses(metric.color);
          return (
            <div key={index} className={`text-center p-4 rounded-lg ${colors.bg}`}>
              <div className={`text-2xl font-bold ${colors.value}`}>
                {metric.value}
              </div>
              <div className={`text-sm ${colors.label}`}>
                {metric.label}
              </div>
              {metric.sublabel && (
                <div className={`text-xs mt-1 ${colors.sublabel}`}>
                  {metric.sublabel}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryAnalytics;
