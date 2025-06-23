import React from 'react';

interface Insight {
  title: string;
  description: string;
  color: 'green' | 'blue' | 'orange' | 'purple' | 'red' | 'cyan' | 'indigo';
}

interface KeyInsightsProps {
  insights: Insight[];
  className?: string;
}

const colorClasses = {
  green: 'bg-green-50 border-green-200',
  blue: 'bg-blue-50 border-blue-200',
  orange: 'bg-orange-50 border-orange-200',
  purple: 'bg-purple-50 border-purple-200',
  red: 'bg-red-50 border-red-200',
  cyan: 'bg-cyan-50 border-cyan-200',
  indigo: 'bg-indigo-50 border-indigo-200'
};

const dotColors = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
  cyan: 'bg-cyan-500',
  indigo: 'bg-indigo-500'
};

const KeyInsights: React.FC<KeyInsightsProps> = ({ insights, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${className}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">💡</span>
        Key Insights
      </h3>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={`flex items-start space-x-3 p-3 rounded-lg border ${colorClasses[insight.color]}`}
          >
            <div className={`w-3 h-3 ${dotColors[insight.color]} rounded-full mt-1 flex-shrink-0`}></div>
            <div>
              <p className="text-gray-900 font-medium">{insight.title}</p>
              <p className="text-gray-700 text-sm">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyInsights;
