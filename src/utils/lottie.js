'use client';

import { Player } from '@lottiefiles/react-lottie-player';

// Utility function to load and display Lottie animations
export const LottiePlayer = ({ 
  src, 
  autoplay = true, 
  loop = true, 
  speed = 1,
  style = {},
  className = '',
  onEvent = () => {},
  ...props 
}) => {
  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      src={src}
      speed={speed}
      style={style}
      className={className}
      onEvent={onEvent}
      {...props}
    />
  );
};

// Pre-configured education-themed Lottie animations
export const educationAnimations = {
  learning: 'https://lottie.host/4b5e3a2b-f8a6-4e7d-9b2c-1234567890ab/learning.json',
  books: 'https://lottie.host/8c9d4f3e-a1b2-4c5d-8e9f-0123456789ab/books.json',
  graduation: 'https://assets3.lottiefiles.com/packages/lf20_touohxv0.json',
  study: 'https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json',
  loading: 'https://assets9.lottiefiles.com/packages/lf20_szlepuo0.json',
  // Free LottieFiles alternatives
  education: 'https://assets2.lottiefiles.com/packages/lf20_DMgKk1.json',
  reading: 'https://assets1.lottiefiles.com/packages/lf20_1a8dx7zj.json',
  online_learning: 'https://assets4.lottiefiles.com/packages/lf20_qp1q7mct.json'
};

export default LottiePlayer;
