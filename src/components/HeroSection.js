'use client';

import React from 'react';
import Button from './ui/Button';
import LottiePlayer from './ui/LottiePlayer';
import { educationAnimations } from '../utils/lottie';

const HeroSection = () => {
  const handleStudentRedirect = () => {
    window.location.href = '/login';
  };

  const handleTeacherRedirect = () => {
    window.location.href = 'https://teach.bilearnhub.biplovgautam.com.np/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BiLearnHub
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                An open-source Learning Management System where anyone can learn or teach
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-400">
                Join our community of learners and educators. Create courses, share knowledge, 
                and grow together in a platform built by the community, for the community.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>100% Free & Open Source</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Interactive Learning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Community Driven</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                variant="gradient"
                size="lg"
                onClick={handleStudentRedirect}
                className="flex-1 sm:flex-none"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Join as Student
              </Button>
              
              <Button
                variant="outline"
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
              <LottiePlayer
                src={educationAnimations.learning}
                style={{ height: '500px', width: '100%' }}
                className="drop-shadow-2xl"
                fallback={
                  <div className="h-[500px] w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="h-24 w-24 mx-auto text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Learning & Teaching</h3>
                      <p className="text-gray-600 dark:text-gray-400">Empowering Education</p>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-20 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">100%</div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">Open Source</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400">∞</div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">Possibilities</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">0$</div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">Cost</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400">24/7</div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
