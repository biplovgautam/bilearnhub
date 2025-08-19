'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { getAuthErrorMessage, extractErrorCode } from '../../utils/authErrors';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import LottiePlayer from '../../components/ui/LottiePlayer';
import Navbar from '../../components/layout/Navbar';
import { educationAnimations } from '../../utils/lottie';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (isSignUp && password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      let result;
      if (isSignUp) {
        result = await signUpWithEmail(email, password);
      } else {
        result = await signInWithEmail(email, password);
      }

      if (result.error) {
        const errorCode = extractErrorCode(result.error);
        setError(getAuthErrorMessage(errorCode));
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      if (result.error) {
        const errorCode = extractErrorCode(result.error);
        setError(getAuthErrorMessage(errorCode));
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Google auth error:', err);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Animation and Info */}
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {isSignUp ? 'Join BiLearnHub' : 'Welcome Back'}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {isSignUp 
                      ? 'Create your account and start your learning journey today'
                      : 'Sign in to continue your learning journey'
                    }
                  </p>
                </div>

                <div className="flex justify-center">
                  <LottiePlayer
                    src={educationAnimations.books}
                    style={{ height: '400px', width: '400px' }}
                    className="drop-shadow-lg"
                  />
                </div>

                <div className="hidden lg:block text-center space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Join thousands of learners worldwide
                  </p>
                  <div className="flex justify-center space-x-8 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Free</div>
                      <div className="text-gray-500">Forever</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Open</div>
                      <div className="text-gray-500">Source</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">Community</div>
                      <div className="text-gray-500">Driven</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Auth Form */}
              <div className="max-w-md mx-auto w-full">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {isSignUp ? 'Create Account' : 'Sign In'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {isSignUp ? 'Join the BiLearnHub community' : 'Access your learning dashboard'}
                    </p>
                  </div>

                  {/* Google Sign In */}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    className="w-full mb-6"
                  >
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </Button>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with email</span>
                    </div>
                  </div>

                  {/* Email/Password Form */}
                  <form onSubmit={handleEmailAuth} className="space-y-6">
                    <Input
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      required
                    />

                    <Input
                      type="password"
                      label="Password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      showPasswordToggle
                      required
                    />

                    {isSignUp && (
                      <Input
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                        showPasswordToggle
                        required
                      />
                    )}

                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex">
                          <svg className="h-5 w-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <p className="ml-3 text-sm text-red-700 dark:text-red-400">{error}</p>
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      loading={loading}
                      className="w-full"
                    >
                      {isSignUp ? 'Create Account' : 'Sign In'}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={toggleMode}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                      {isSignUp 
                        ? 'Already have an account? Sign in' 
                        : "Don't have an account? Sign up"
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
