'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { googleProvider } from '../lib/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);

  const createUserProfile = async (provider = 'email') => {
    try {
      const createProfile = httpsCallable(functions, 'createUserProfile');
      await createProfile({ provider });
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  const updateLastSignIn = async () => {
    try {
      const updateSignIn = httpsCallable(functions, 'updateLastSignIn');
      await updateSignIn();
    } catch (error) {
      console.error('Error updating last sign-in:', error);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await updateLastSignIn();
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  };

  const signUpWithEmail = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile('email');
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if this is a new user
      const isNewUser = result._tokenResponse?.isNewUser;
      
      if (isNewUser) {
        await createUserProfile('google');
      } else {
        await updateLastSignIn();
      }
      
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  };

  return {
    user,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logout
  };
};
