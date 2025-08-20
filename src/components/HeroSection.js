'use client';

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from './ui/Button';
import LottiePlayer from './ui/LottiePlayer';
import { educationAnimations } from '../utils/lottie';

const HeroSection = () => {
  const { user } = useAuth();

  const handleStudentRedirect = () => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  };

  const handleTeacherRedirect = () => {
    window.location.href = 'https://teach.bilearnhub.biplovgautam.com.np/login';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-text">
                Welcome to{' '}
                <span className="text-accent">
                  BiLearnHub
                </span>
              </h1>
              <p className="text-xl lg:text-2xl leading-relaxed text-secondary">
                An Open-Learning Platform where anyone can learn or teach
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-text">
                Join our community of learners and educators. Create courses, share knowledge, 
                and grow together in a platform built by the community, for the community.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <svg 
                    className="h-5 w-5 text-accent" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-secondary">100% Free & Open Source</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg 
                    className="h-5 w-5 text-accent" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-secondary">Interactive Learning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg 
                    className="h-5 w-5 text-accent" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-secondary">Community Driven</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                variant="primary"
                size="lg"
                onClick={handleStudentRedirect}
                className="flex-1 sm:flex-none group overflow-hidden relative"
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {user ? 'Go to Dashboard' : 'Join as Student'}
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={handleTeacherRedirect}
                className="flex-1 sm:flex-none"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Join as Teacher
              </Button>
            </div>
          </div>

          {/* Right Column - Animation */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg">
              <div className="relative group">
                <div className="absolute -inset-4 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity bg-accent" style={{ opacity: 0.1 }} />
                <div className="rounded-3xl overflow-hidden">
                  <LottiePlayer
                    src={educationAnimations.reading}
                    style={{ height: '500px', width: '100%' }}
                    className="drop-shadow-2xl"
                    fallback={
                      <div className="h-[500px] w-full bg-primary border border-secondary rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <svg 
                            className="h-24 w-24 mx-auto mb-4 text-accent" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <h3 className="text-xl font-semibold text-text">
                            Learning & Teaching
                          </h3>
                          <p className="text-secondary">Empowering Education</p>
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div 
          className="mt-20 pt-20 border-t border-secondary"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div 
                className="text-3xl lg:text-4xl font-bold text-accent"
              >
                100%
              </div>
              <div 
                className="mt-2 text-secondary"
              >
                Open Source
              </div>
            </div>
            <div>
              <div 
                className="text-3xl lg:text-4xl font-bold text-accent"
              >
                ∞
              </div>
              <div 
                className="mt-2 text-secondary"
              >
                Possibilities
              </div>
            </div>
            <div>
              <div 
                className="text-3xl lg:text-4xl font-bold text-accent"
              >
                0$
              </div>
              <div 
                className="mt-2 text-secondary"
              >
                Cost
              </div>
            </div>
            <div>
              <div 
                className="text-3xl lg:text-4xl font-bold text-accent"
              >
                24/7
              </div>
              <div 
                className="mt-2 text-secondary"
              >
                Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
