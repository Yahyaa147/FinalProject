import React from 'react';

interface StatusBadge {
  text: string;
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'default';
  icon?: React.ReactNode;
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  badges?: StatusBadge[];
  rightContent?: React.ReactNode;
  backgroundGradient?: string;
  accentGradient?: string;
  animationDelay?: number;
}

const PageHeader = ({
  title,
  subtitle,
  icon,
  badges,
  rightContent,
  backgroundGradient = 'from-gray-900 via-blue-900 to-purple-900',
  accentGradient = 'from-blue-400 via-purple-400 to-pink-400',
  animationDelay = 200
}: PageHeaderProps) => {
  // Common CSS classes for gradients and decorative elements
  const containerClasses = `bg-gradient-to-r ${backgroundGradient} rounded-2xl p-8 shadow-2xl border border-gray-700/50 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden`;
  const titleClasses = "text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2";
  
  const getBadgeStyles = React.useCallback((variant: StatusBadge['variant'] = 'default') => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500/20 border-blue-400/30 text-blue-200';
      case 'success':
        return 'bg-green-500/20 border-green-400/30 text-green-200';
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-400/30 text-yellow-200';      case 'info':
        return 'bg-purple-500/20 border-purple-400/30 text-purple-200';
      default:
        return 'bg-gray-500/20 border-gray-400/30 text-gray-200';
    }
  }, []);

  return (
    <div className="mb-8 animate-fade-in-up">
      <div className={containerClasses}>
        {/* Animated background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-50"></div>
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${accentGradient}`}></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Icon Section */}
            {icon && (
              <div className="relative">
                <div className={`bg-gradient-to-r ${accentGradient} rounded-2xl p-4 shadow-lg`}>
                  {icon}
                </div>
                <div className={`absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r ${accentGradient} rounded-full animate-pulse`}></div>
              </div>
            )}
            
            {/* Title and Content Section */}
            <div>              <h1 className={titleClasses}>
                {title}
              </h1><p className="text-lg text-gray-300 animate-fade-in-up font-medium" style={{animationDelay: `${animationDelay}ms`}}>
                {subtitle}
              </p>
                {/* Status Badges - Only show if there are badges to display */}
              {badges && badges.length > 0 && (
                <div className="mt-4 flex items-center space-x-4 animate-fade-in-up flex-wrap gap-2" style={{animationDelay: `${animationDelay * 2}ms`}}>
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-2 rounded-full px-4 py-2 border ${getBadgeStyles(badge.variant)}`}
                    >
                      {badge.icon}
                      <span className="text-sm font-medium">{badge.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Content Section */}
          {rightContent && (
            <div className="hidden md:flex items-center space-x-4">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PageHeader);
