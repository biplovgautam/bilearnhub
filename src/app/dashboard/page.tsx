'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import LottiePlayer from '../../components/ui/LottiePlayer';
import Navbar from '../../components/layout/Navbar';
import { educationAnimations } from '../../utils/lottie';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-background"
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 border-accent"
          ></div>
          <p className="text-secondary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <>
      <Navbar />
      <div 
        className="min-h-screen pt-16 bg-background"
      >
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h1 
                className="text-4xl lg:text-5xl font-bold mb-4 text-text"
              >
                Welcome to Your Dashboard
              </h1>
              <p 
                className="text-xl text-secondary"
              >
                Ready to start your learning journey, {user.displayName || user.email?.split('@')[0]}?
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* User Profile Card */}
              <div className="lg:col-span-2">
                <div 
                  className="rounded-2xl shadow-xl p-8 border"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <div className="flex items-center space-x-6 mb-8">
                    <div 
                      className="h-20 w-20 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--accent)' }}
                    >
                      <span className="text-2xl font-bold text-white">
                        {user.displayName 
                          ? user.displayName.charAt(0).toUpperCase()
                          : user.email?.charAt(0).toUpperCase()
                        }
                      </span>
                    </div>
                    <div>
                      <h2 
                        className="text-2xl font-bold"
                        style={{ color: 'var(--text)' }}
                      >
                        {user.displayName || 'Student'}
                      </h2>
                      <p style={{ color: 'var(--secondary)' }}>{user.email}</p>
                      <span 
                        className="inline-block px-3 py-1 text-sm rounded-full mt-2"
                        style={{
                          backgroundColor: 'var(--accent)',
                          color: 'white'
                        }}
                      >
                        Student
                      </span>
                    </div>
                  </div>

                  {/* Profile Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div 
                      className="text-center p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--input-bg)' }}
                    >
                      <div 
                        className="text-2xl font-bold"
                        style={{ color: 'var(--accent)' }}
                      >
                        0
                      </div>
                      <div 
                        className="text-sm"
                        style={{ color: 'var(--secondary)' }}
                      >
                        Courses Enrolled
                      </div>
                    </div>
                    <div 
                      className="text-center p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--input-bg)' }}
                    >
                      <div 
                        className="text-2xl font-bold"
                        style={{ color: 'var(--accent)' }}
                      >
                        0%
                      </div>
                      <div 
                        className="text-sm"
                        style={{ color: 'var(--secondary)' }}
                      >
                        Progress
                      </div>
                    </div>
                    <div 
                      className="text-center p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--input-bg)' }}
                    >
                      <div 
                        className="text-2xl font-bold"
                        style={{ color: 'var(--accent)' }}
                      >
                        0
                      </div>
                      <div 
                        className="text-sm"
                        style={{ color: 'var(--secondary)' }}
                      >
                        Certificates
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-4">
                    <h3 
                      className="text-lg font-semibold"
                      style={{ color: 'var(--text)' }}
                    >
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button
                        variant="accent"
                        className="justify-start p-4 h-auto"
                        onClick={() => {/* TODO: Navigate to course browse */}}
                      >
                        <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <div className="text-left">
                          <div className="font-medium">Browse Courses</div>
                          <div className="text-sm opacity-90">Find your next learning adventure</div>
                        </div>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="justify-start p-4 h-auto"
                        onClick={() => {/* TODO: Navigate to profile settings */}}
                      >
                        <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <div className="text-left">
                          <div className="font-medium">Edit Profile</div>
                          <div className="text-sm opacity-75">Update your information</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Animation Card */}
                <div 
                  className="rounded-2xl shadow-xl p-6 border"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <h3 
                    className="text-lg font-semibold mb-4"
                    style={{ color: 'var(--text)' }}
                  >
                    Your Learning Journey
                  </h3>
                  <div className="flex justify-center">
                    <LottiePlayer
                      src={educationAnimations.study}
                      style={{ height: '200px', width: '200px' }}
                    />
                  </div>
                  <p 
                    className="text-sm text-center mt-4"
                    style={{ color: 'var(--secondary)' }}
                  >
                    Every expert was once a beginner. Start your journey today!
                  </p>
                </div>

                {/* Account Actions */}
                <div 
                  className="rounded-2xl shadow-xl p-6 border"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <h3 
                    className="text-lg font-semibold mb-4"
                    style={{ color: 'var(--text)' }}
                  >
                    Account
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {/* TODO: Navigate to settings */}}
                    >
                      <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {/* TODO: Navigate to help */}}
                    >
                      <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Help & Support
                    </Button>
                    
                    <hr 
                      className="my-4"
                      style={{ borderColor: 'var(--border)' }}
                    />
                    
                    <Button
                      variant="danger"
                      className="w-full justify-start"
                      onClick={handleSignOut}
                    >
                      <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="mt-12">
              <div 
                className="rounded-2xl shadow-xl p-8 border"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border)'
                }}
              >
                <h3 
                  className="text-2xl font-bold mb-6"
                  style={{ color: 'var(--text)' }}
                >
                  Recent Activity
                </h3>
                <div className="text-center py-12">
                  <svg 
                    className="h-16 w-16 mx-auto mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--muted)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h4 
                    className="text-lg font-medium mb-2"
                    style={{ color: 'var(--text)' }}
                  >
                    No activity yet
                  </h4>
                  <p 
                    className="mb-6"
                    style={{ color: 'var(--secondary)' }}
                  >
                    Start exploring courses to see your learning progress here.
                  </p>
                  <Button variant="accent">
                    Explore Courses
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
