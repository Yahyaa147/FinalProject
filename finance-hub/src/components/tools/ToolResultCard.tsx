import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ToolResultCardProps {
  title: string;
  icon?: LucideIcon;
  gradient?: string;
  children: React.ReactNode;
  className?: string;
}

const ToolResultCard: React.FC<ToolResultCardProps> = ({
  title,
  icon: Icon,
  gradient = "from-blue-50 to-indigo-50",
  children,
  className = ""
}) => {
  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-6 border border-opacity-50 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        {Icon && (
          <div className="bg-white/50 rounded-lg p-2">
            <Icon className="h-5 w-5 text-gray-700" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default ToolResultCard;
