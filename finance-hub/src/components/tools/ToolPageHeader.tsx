import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ToolPageHeaderProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  iconBgGradient: string;
  headerBgGradient: string;
  accentColor: string;
  rightIcon?: LucideIcon;
  rightIconLabel?: string;
}

const ToolPageHeader: React.FC<ToolPageHeaderProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  iconBgGradient,
  headerBgGradient,
  accentColor,
  rightIcon: RightIcon,
  rightIconLabel
}) => {
  return (
    <div className={`bg-gradient-to-r ${headerBgGradient} rounded-2xl p-8 border border-opacity-50`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`bg-gradient-to-r ${iconBgGradient} rounded-xl p-3`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className={`${accentColor} font-medium`}>{subtitle}</p>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            {description}
          </p>
        </div>
        {RightIcon && (
          <div className="hidden lg:block">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <RightIcon className={`h-12 w-12 ${accentColor} mx-auto mb-2`} />
              {rightIconLabel && (
                <p className="text-sm text-gray-600 text-center">{rightIconLabel}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolPageHeader;
