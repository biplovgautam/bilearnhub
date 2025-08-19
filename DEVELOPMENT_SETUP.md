# BiLearnHub Development Setup Guide

This guide provides step-by-step instructions to set up the BiLearnHub student app for development and deployment.

## Prerequisites

Before starting, ensure you have:
- Node.js (v18 or higher) installed
- npm or yarn package manager
- Git installed
- A Firebase account
- A Vercel account (for deployment)

## Step 1: Project Setup

### Clone and Install Dependencies
```bash
# Clone the repository
git clone https://github.com/biplovgautam/bilearnhub.git
cd bilearnhub

# Install project dependencies
npm install

# Install Firebase CLI globally
npm install -g firebase-tools

# Install Cloud Functions dependencies
cd functions
npm install
cd ..
```

## Step 2: Firebase Project Setup

### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `bilearnhub` (or your preferred name)
4. Enable Google Analytics (optional)
5. Create project

### Configure Firebase Services

#### Enable Authentication
```bash
# In Firebase Console:
# 1. Go to Authentication > Sign-in method
# 2. Enable "Email/Password" provider
# 3. Enable "Google" provider
# 4. Add authorized domains:
#    - localhost
#    - bilearnhub.biplovgautam.com.np
#    - your-vercel-domain.vercel.app
```

#### Set up Firestore Database
```bash
# In Firebase Console:
# 1. Go to Firestore Database
# 2. Click "Create database"
# 3. Start in "test mode" (we'll add security rules later)
# 4. Choose a location (e.g., us-central1)
```

#### Enable Storage
```bash
# In Firebase Console:
# 1. Go to Storage
# 2. Click "Get started"
# 3. Start in "test mode"
# 4. Choose the same location as Firestore
```

### Initialize Firebase in Project
```bash
# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select the following options:
# ☑ Firestore: Configure security rules and indexes files for Firestore
# ☑ Functions: Configure a Cloud Functions directory and its files  
# ☑ Hosting: Configure files for Firebase Hosting and (optionally) GitHub Action deploys
# ☑ Storage: Configure a security rules file for Cloud Storage

# Use existing project: bilearnhub (or your project name)
# Accept default options for all services
```

## Step 3: Environment Configuration

### Create Environment File
```bash
# Copy the example environment file
cp .env.local.example .env.local

# Edit .env.local with your Firebase configuration
nano .env.local
```

### Get Firebase Configuration
```bash
# In Firebase Console:
# 1. Go to Project Settings (gear icon)
# 2. Scroll down to "Your apps"
# 3. Click "Add app" > Web
# 4. Register app with nickname "BiLearnHub Student"
# 5. Copy the configuration object
```

### Update .env.local
```bash
# Replace with your actual Firebase config values
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456789012abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_TEACHER_APP_URL=https://teach.bilearnhub.biplovgautam.com.np
```

## Step 4: Deploy Firebase Services

### Deploy Firestore Security Rules
```bash
# Deploy security rules
firebase deploy --only firestore:rules

# Verify rules are active in Firebase Console
```

### Deploy Cloud Functions
```bash
# Navigate to functions directory
cd functions

# Install dependencies (if not done already)
npm install

# Deploy functions
firebase deploy --only functions

# Go back to project root
cd ..
```

### Test Cloud Functions
```bash
# Test functions locally (optional)
firebase emulators:start --only functions,firestore

# In another terminal, test the app
npm run dev
```

## Step 5: Development Server

### Start Development Server
```bash
# Start the Next.js development server
npm run dev

# The app will be available at http://localhost:3000
```

### Test Authentication Flow
1. Visit http://localhost:3000
2. Click "Join as Student"
3. Test both email/password and Google sign-up
4. Verify user profile creation in Firestore
5. Test login and dashboard access

## Step 6: Vercel Deployment

### Connect to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set up project settings
```

### Configure Environment Variables in Vercel
```bash
# In Vercel Dashboard:
# 1. Go to your project settings
# 2. Navigate to "Environment Variables"
# 3. Add all variables from .env.local
# 4. Set environment: Production, Preview, Development
```

### Set up Custom Domain
```bash
# In Vercel Dashboard:
# 1. Go to your project settings
# 2. Navigate to "Domains"
# 3. Add custom domain: bilearnhub.biplovgautam.com.np
# 4. Configure DNS with your domain provider:
#    - Add CNAME record: bilearnhub -> cname.vercel-dns.com
```

### Deploy Production
```bash
# Deploy to production
vercel --prod

# Update Firebase authorized domains
# Add your Vercel domain to Firebase Authentication
```

## Step 7: Post-Deployment Configuration

### Update Firebase Authorized Domains
```bash
# In Firebase Console:
# 1. Go to Authentication > Settings > Authorized domains
# 2. Add your Vercel domain: your-project.vercel.app
# 3. Add your custom domain: bilearnhub.biplovgautam.com.np
```

### Test Production Deployment
1. Visit your deployed app
2. Test all authentication flows
3. Verify Firestore data creation
4. Test responsive design on mobile devices

## Development Commands

### Daily Development
```bash
# Start development server
npm run dev

# Lint code
npm run lint

# Build for production
npm run build

# Start production server locally
npm start
```

### Firebase Commands
```bash
# Deploy everything
firebase deploy

# Deploy only functions
firebase deploy --only functions

# Deploy only Firestore rules
firebase deploy --only firestore:rules

# Deploy only hosting
firebase deploy --only hosting

# View function logs
firebase functions:log

# Start local emulators
firebase emulators:start
```

### Vercel Commands
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs [deployment-url]

# List all deployments
vercel ls
```

## Troubleshooting

### Common Issues

#### Authentication Errors
```bash
# Check Firebase configuration
# Verify authorized domains
# Check environment variables

# Test with emulators
firebase emulators:start --only auth,functions,firestore
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run build
```

#### Function Deployment Issues
```bash
# Check Node.js version in functions/package.json
# Verify Firebase CLI version
firebase --version

# Redeploy functions
cd functions
npm install
firebase deploy --only functions
```

#### Environment Variable Issues
```bash
# Verify all required variables are set
echo $NEXT_PUBLIC_FIREBASE_API_KEY

# Check Vercel environment variables
vercel env ls
```

### Getting Help

- **Firebase Documentation**: https://firebase.google.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Documentation**: https://vercel.com/docs
- **Project Issues**: https://github.com/biplovgautam/bilearnhub/issues

## Security Checklist

- [ ] Environment variables are not committed to Git
- [ ] Firebase security rules are properly configured
- [ ] HTTPS is enforced in production
- [ ] Authorized domains are correctly set
- [ ] User data access is properly restricted
- [ ] Error messages don't expose sensitive information

## Performance Optimization

### After Deployment
```bash
# Analyze bundle size
npm run build

# Test performance with Lighthouse
# Optimize images and assets
# Enable Vercel Analytics
```

### Monitoring
- Set up Firebase Analytics
- Monitor Cloud Function performance
- Track user authentication success rates
- Monitor Firestore usage and costs

---

**Note**: This setup guide assumes you're using the provided codebase. Adjust paths and configurations based on your specific setup.
