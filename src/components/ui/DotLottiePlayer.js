'use client';

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const DotLottiePlayer = ({ 
  src, 
  loop = true, 
  autoplay = true, 
  style = {}, 
  className = '',
  ...props 
}) => {
  return (
    <DotLottieReact
      src={src}
      loop={loop}
      autoplay={autoplay}
      style={style}
      className={className}
      {...props}
    />
  );
};

export default DotLottiePlayer;
