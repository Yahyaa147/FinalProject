import React from 'react';

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  onClick?: () => void;
}

interface QuickActionsProps {
  title: string;
  actions: QuickAction[];
  className?: string;
}

const bgClasses = {
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  purple: 'bg-purple-100',
  orange: 'bg-orange-100',
  red: 'bg-red-100'
};

const QuickActions: React.FC<QuickActionsProps> = ({ title, actions, className = '' }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          button: 'hover:bg-blue-50 hover:border-blue-300',
          text: 'group-hover:text-blue-700',
          icon: 'group-hover:bg-blue-200',
          arrow: 'group-hover:text-blue-500'
        };
      case 'green':
        return {
          button: 'hover:bg-green-50 hover:border-green-300',
          text: 'group-hover:text-green-700',
          icon: 'group-hover:bg-green-200',
          arrow: 'group-hover:text-green-500'
        };
      case 'purple':
        return {
          button: 'hover:bg-purple-50 hover:border-purple-300',
          text: 'group-hover:text-purple-700',
          icon: 'group-hover:bg-purple-200',
          arrow: 'group-hover:text-purple-500'
        };
      case 'orange':
        return {
          button: 'hover:bg-orange-50 hover:border-orange-300',
          text: 'group-hover:text-orange-700',
          icon: 'group-hover:bg-orange-200',
          arrow: 'group-hover:text-orange-500'
        };
      case 'red':
        return {
          button: 'hover:bg-red-50 hover:border-red-300',
          text: 'group-hover:text-red-700',
          icon: 'group-hover:bg-red-200',
          arrow: 'group-hover:text-red-500'
        };
      default:
        return {
          button: 'hover:bg-blue-50 hover:border-blue-300',
          text: 'group-hover:text-blue-700',
          icon: 'group-hover:bg-blue-200',
          arrow: 'group-hover:text-blue-500'
        };
    }
  };

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg border border-blue-200/50 ${className}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">⚡</span>
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => {
          const colors = getColorClasses(action.color);
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`w-full text-left p-4 bg-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200 group ${colors.button}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`${bgClasses[action.color]} rounded-full p-2 transition-colors ${colors.icon}`}>
                    <span className="text-lg">{action.icon}</span>
                  </div>
                  <div>
                    <div className={`font-medium text-gray-900 transition-colors ${colors.text}`}>
                      {action.title}
                    </div>
                    <div className="text-sm text-gray-600">{action.description}</div>
                  </div>
                </div>
                <svg 
                  className={`h-5 w-5 text-gray-400 transform group-hover:translate-x-1 transition-all ${colors.arrow}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
