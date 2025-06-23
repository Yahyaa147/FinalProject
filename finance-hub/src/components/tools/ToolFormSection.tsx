import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ToolFormSectionProps {
  title: string;
  icon: LucideIcon;
  iconBgGradient: string;
  children: React.ReactNode;
  className?: string;
}

const ToolFormSection: React.FC<ToolFormSectionProps> = ({
  title,
  icon: Icon,
  iconBgGradient,
  children,
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className={`bg-gradient-to-r ${iconBgGradient} rounded-lg p-2`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default ToolFormSection;
