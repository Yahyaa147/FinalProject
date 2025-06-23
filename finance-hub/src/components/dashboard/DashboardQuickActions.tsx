import React from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  link: string;
  icon: LucideIcon;
  gradient: string;
  onClick?: () => void;
}

interface DashboardQuickActionsProps {
  actions: QuickAction[];
  title?: string;
  className?: string;
}

const DashboardQuickActions: React.FC<DashboardQuickActionsProps> = ({ 
  actions, 
  title = "Quick Actions",
  className = "" 
}) => {
  return (
    <div className={className}>      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center transition-colors duration-300">
        <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mr-3"></div>
        {title}
      </h2>      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const content = (
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-32 flex flex-col justify-center items-center text-center">
              <div className={`${action.gradient} rounded-lg p-3 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm leading-tight transition-colors duration-300">{action.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">{action.description}</p>
            </div>
          );

          if (action.onClick) {
            return (
              <button
                key={index}
                onClick={action.onClick}
                className="text-left w-full"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={index}
              to={action.link}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardQuickActions;
