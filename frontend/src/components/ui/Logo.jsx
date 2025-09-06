import React from 'react';

const Logo = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Main logo container */}
      <div className="w-full h-full bg-gradient-sage rounded-full flex items-center justify-center shadow-lg">
        {/* Leaf icon */}
        <svg 
          className="w-2/3 h-2/3 text-white" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75S7 14 17 8z"/>
        </svg>
        
        {/* Decorative ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
        <div className="absolute inset-1 rounded-full border border-white/10"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-terracotta-400 rounded-full animate-pulse-slow"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-moss-400 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
    </div>
  );
};

export default Logo;
