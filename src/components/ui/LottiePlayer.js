'use client';

import React from 'react';
import { LottiePlayer } from '../../utils/lottie';

const LottiePlayerComponent = ({ 
  src, 
  autoplay = true, 
  loop = true, 
  speed = 1,
  style = { height: '300px', width: '300px' },
  className = '',
  fallback = null,
  ...props 
}) => {
  const [hasError, setHasError] = React.useState(false);

  const handleEvent = (event) => {
    if (event === 'error') {
      setHasError(true);
    }
  };

  if (hasError && fallback) {
    return fallback;
  }

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}
        style={style}
      >
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM6 6v12h12V6H6zm3 3a1 1 0 112 0v6a1 1 0 11-2 0V9zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V9z" />
          </svg>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Animation unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <LottiePlayer
      src={src}
      autoplay={autoplay}
      loop={loop}
      speed={speed}
      style={style}
      className={className}
      onEvent={handleEvent}
      {...props}
    />
  );
};

export default LottiePlayerComponent;
