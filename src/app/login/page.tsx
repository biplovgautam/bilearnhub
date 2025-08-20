'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { getAuthErrorMessage, extractErrorCode } from '../../utils/authErrors';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import LottiePlayer from '../../components/ui/LottiePlayer';
import DotLottiePlayer from '../../components/ui/DotLottiePlayer';
import Navbar from '../../components/layout/Navbar';
import { educationAnimations } from '../../utils/lottie';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1); // Step 1: Email, Step 2: Password
  const [email, setEmail] = useState('');
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [emailChecking, setEmailChecking] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  // Smoother redirect if already logged in
  useEffect(() => {
    if (user && !redirecting) {
      setRedirecting(true);
      const t = setTimeout(() => {
        router.replace('/dashboard');
      }, 350); // brief delay for fade animation
      return () => clearTimeout(t);
    }
  }, [user, redirecting, router]);

  // Email availability check with debounce
  const checkEmailAvailability = useCallback(async (email: string) => {
    if (!email || !email.includes('@')) return;
    
    setEmailChecking(true);
    try {
      // Simulate API call - replace with actual Firebase check
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo, randomly determine availability (replace with actual logic)
      const available = !email.includes('taken@');
      setEmailAvailable(available);
    } catch (error) {
      console.error('Email check error:', error);
      setEmailAvailable(null);
    } finally {
      setEmailChecking(false);
    }
  }, []);

  // Debounce email checking
  useEffect(() => {
    if (!isSignUp || !email) {
      setEmailAvailable(null);
      return;
    }

    const timer = setTimeout(() => {
      checkEmailAvailability(email);
    }, 500);

    return () => clearTimeout(timer);
  }, [email, isSignUp, checkEmailAvailability]);

  // Reset signup step when switching modes
  useEffect(() => {
    if (!isSignUp) {
      setSignUpStep(1);
      setEmailAvailable(null);
      setEmailChecking(false);
    }
  }, [isSignUp]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // For signup, handle step-by-step process
    if (isSignUp) {
      if (signUpStep === 1) {
        // Step 1: Email validation
        if (!email || !email.includes('@')) {
          setError('Please enter a valid email address');
          return;
        }
        if (emailAvailable === false) {
          setError('This email is already registered');
          return;
        }
        if (emailAvailable === null) {
          setError('Please wait for email verification');
          return;
        }
        // Move to step 2
        setSignUpStep(2);
        return;
      }

      if (signUpStep === 2) {
        // Step 2: Password validation and signup
        if (!password || !confirmPassword) {
          setError('Please fill in all password fields');
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }
      }
    } else {
      // Login validation
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
    }

    setLoading(true);

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
    setSignUpStep(1);
    setEmailAvailable(null);
  };

  const goBackToStep1 = () => {
    setSignUpStep(1);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  // Optional small shimmer while redirecting
  if (redirecting) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-background"
      >
        <div className="relative">
          <div 
            className="h-16 w-16 rounded-2xl animate-pulse shadow-xl bg-accent"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-8 w-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle className="opacity-30" cx="12" cy="12" r="10" strokeWidth="4" />
              <path className="opacity-80" strokeWidth="4" strokeLinecap="round" d="M12 2a10 10 0 018.66 5" />
            </svg>
          </div>
        </div>
        <p 
          className="mt-8 font-medium tracking-wide text-secondary"
        >
          Redirecting to your dashboard...
        </p>
      </div>
    );
  }

  // Decide animation sources
  const animationSrc = educationAnimations.reading;
  const newSignupAnimation = "https://lottie.host/c5fcb778-fcaf-4cb3-8430-a5926f6ae649/KhQb6JkJUg.lottie";

  return (
    <>
      <Navbar />
      <div 
        className="min-h-screen pt-16 bg-background"
      >
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
              {/* Animation / Info Column */}
              <div className={`space-y-8 transition-all duration-700 ease-in-out transform ${
                isSignUp 
                  ? 'lg:order-2 lg:translate-x-0' 
                  : 'lg:order-1 lg:translate-x-0'
              }`}> 
                <div className="text-center lg:text-left">
                  <h1 
                    className="text-3xl lg:text-4xl font-bold mb-4 text-text"
                  >
                    {isSignUp ? 'Join BiLearnHub' : 'Welcome Back'}
                  </h1>
                  <p className="text-lg text-secondary">
                    {isSignUp 
                      ? 'Create your account and start your learning journey today'
                      : 'Sign in to continue your learning journey'
                    }
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-4 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity bg-accent" style={{ opacity: 0.1 }} />
                    {/* Animation - Different for signup vs login */}
                    <div className="rounded-3xl overflow-hidden">
                      {isSignUp ? (
                        <DotLottiePlayer
                          key="signup-anim"
                          src={newSignupAnimation}
                          style={{ height: '450px', width: '450px' }}
                          className="drop-shadow-xl"
                          loop={true}
                          autoplay={true}
                        />
                      ) : (
                        <LottiePlayer
                          key="login-anim"
                          src={animationSrc}
                          style={{ height: '320px', width: '320px' }}
                          className="drop-shadow-xl"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block text-center space-y-4">
                  <p className="text-secondary">
                    Join thousands of learners worldwide
                  </p>
                  <div className="flex justify-center space-x-8 text-sm">
                    <div className="text-center">
                      <div 
                        className="text-2xl font-bold text-accent"
                      >
                        Free
                      </div>
                      <div className="text-secondary">Forever</div>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-2xl font-bold text-accent"
                      >
                        Open
                      </div>
                      <div className="text-secondary">Source</div>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-2xl font-bold text-accent"
                      >
                        Community
                      </div>
                      <div className="text-secondary">Driven</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auth Form Column */}
              <div className={`max-w-md mx-auto w-full transition-all duration-700 ease-in-out transform ${
                isSignUp 
                  ? 'lg:order-1 lg:translate-x-0' 
                  : 'lg:order-2 lg:translate-x-0'
              }`}> 
                <div 
                  className="relative backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)] p-8 border overflow-hidden transition-all duration-500 bg-primary border-secondary"
                  style={{
                    opacity: '0.95'
                  }}
                >
                  <div className="pointer-events-none absolute -top-32 -right-24 h-64 w-64 rounded-full blur-3xl bg-accent" style={{ opacity: '0.1' }} />
                  <div className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full blur-3xl bg-primary" style={{ opacity: '0.1' }} />
                  <div className="text-center mb-8">
                    <div className="h-10 relative">
                      <h2 
                        key={isSignUp ? (signUpStep === 1 ? 'email-step' : 'password-step') : 'signin'} 
                        className="text-2xl font-bold absolute inset-0 flex items-center justify-center animate-fade-in text-text"
                      >
                        {isSignUp 
                          ? signUpStep === 1 
                            ? 'Create Account' 
                            : 'Set Password'
                          : 'Sign In'
                        }
                      </h2>
                    </div>
                    <p 
                      className="mt-2 text-secondary"
                    >
                      {isSignUp 
                        ? signUpStep === 1 
                          ? 'Enter your email to get started'
                          : 'Choose a secure password'
                        : 'Access your learning dashboard'
                      }
                    </p>
                    {isSignUp && (
                      <div className="flex justify-center mt-4">
                        <div className="flex space-x-2">
                          <div className={`h-2 w-8 rounded-full transition-colors ${signUpStep === 1 ? 'bg-accent' : 'bg-secondary/30'}`} />
                          <div className={`h-2 w-8 rounded-full transition-colors ${signUpStep === 2 ? 'bg-accent' : 'bg-secondary/30'}`} />
                        </div>
                      </div>
                    )}
                  </div>
                  <style jsx global>{`
                    .animate-fade-in {animation: fade-in .4s ease;}
                    .animate-slide-fade {animation: slide-fade .45s ease;}
                    .form-slide-enter {animation: slide-in-right .6s ease;}
                    .form-slide-exit {animation: slide-out-left .6s ease;}
                    @keyframes fade-in {from {opacity:0; transform:translateY(4px);} to {opacity:1; transform:translateY(0);} }
                    @keyframes slide-fade {from {opacity:0; transform:translateY(12px);} to {opacity:1; transform:translateY(0);} }
                    @keyframes slide-in-right {from {opacity:0; transform:translateX(30px);} to {opacity:1; transform:translateX(0);} }
                    @keyframes slide-out-left {from {opacity:1; transform:translateX(0);} to {opacity:0; transform:translateX(-30px);} }
                  `}</style>

                  {/* Dynamic Form Content */}
                  <form onSubmit={handleEmailAuth} className="space-y-6 animate-slide-fade">
                    {/* Email Step (Login or Signup Step 1) */}
                    {(!isSignUp || signUpStep === 1) && (
                      <div className="space-y-4">
                        <div className="relative">
                          <Input
                            type="email"
                            label="Email Address"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                          />
                          {isSignUp && email && (
                            <div className="mt-2 flex items-center text-sm">
                              {emailChecking ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent mr-2"></div>
                                  <span className="text-secondary">Checking availability...</span>
                                </>
                              ) : emailAvailable === true ? (
                                <>
                                  <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-green-500">Email available</span>
                                </>
                              ) : emailAvailable === false ? (
                                <>
                                  <svg className="h-4 w-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-red-500">Email already taken</span>
                                </>
                              ) : null}
                            </div>
                          )}
                        </div>
                        
                        {!isSignUp && (
                          <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            showPasswordToggle
                            required
                          />
                        )}
                      </div>
                    )}

                    {/* Password Step (Signup Step 2) */}
                    {isSignUp && signUpStep === 2 && (
                      <div className="space-y-4">
                        <div className="flex items-center mb-4">
                          <button
                            type="button"
                            onClick={goBackToStep1}
                            className="flex items-center text-accent hover:text-accent/80 transition-colors"
                          >
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to email
                          </button>
                          <div className="ml-4 text-sm text-secondary">
                            {email}
                          </div>
                        </div>
                        
                        <Input
                          type="password"
                          label="Password"
                          placeholder="Choose a password"
                          value={password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                          showPasswordToggle
                          required
                        />
                        
                        <Input
                          type="password"
                          label="Confirm Password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                          showPasswordToggle
                          required
                        />
                      </div>
                    )}

                    {error && (
                      <div 
                        className="border rounded-lg p-4"
                        style={{
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          borderColor: 'rgba(239, 68, 68, 0.3)'
                        }}
                      >
                        <div className="flex">
                          <svg className="h-5 w-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <p className="ml-3 text-sm text-red-700">{error}</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 pt-2">
                      <Button
                        type="submit"
                        variant="accent"
                        size="lg"
                        loading={loading}
                        className="w-full"
                      >
                        {isSignUp 
                          ? signUpStep === 1 
                            ? 'Continue' 
                            : 'Create Account'
                          : 'Sign In'
                        }
                      </Button>
                    </div>
                  </form>

                  {/* Google Sign In moved below */}
                  <div className="mt-8">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 flex items-center">
                        <div 
                          className="w-full border-t border-secondary"
                        />
                      </div>
                      <div className="relative flex justify-center text-xs tracking-wide uppercase font-medium">
                        <span 
                          className="px-3 py-1 rounded-full backdrop-blur bg-primary text-secondary"
                        >
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleGoogleAuth}
                      disabled={loading}
                      className="w-full group"
                    >
                      <span className="inline-flex items-center">
                        <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                      </span>
                    </Button>
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      onClick={toggleMode}
                      className="font-medium transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 hover:after:w-full after:transition-all text-accent after:bg-accent"
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
