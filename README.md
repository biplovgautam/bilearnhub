# BiLearnHub - Open Source Learning Management System

BiLearnHub is a modern, open-source Learning Management System (LMS) built with Next.js, Firebase, and Tailwind CSS. It consists of two separate applications: one for students and one for teachers, providing a comprehensive learning platform where anyone can learn or teach.

## 🌟 Features

### Student App (This Repository)
- **Modern UI/UX**: Clean, responsive design with dark/light mode support
- **Authentication**: Google OAuth and email/password authentication
- **Student Dashboard**: Personalized learning dashboard with progress tracking
- **Course Enrollment**: Browse and enroll in courses
- **Progress Tracking**: Track learning progress and achievements
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Lottie Animations**: Smooth, engaging animations throughout the app

### Tech Stack
- **Frontend**: Next.js 15.4.6, React 19, TypeScript
- **Styling**: Tailwind CSS with dark mode support
- **Authentication**: Firebase Auth (Google OAuth, Email/Password)
- **Database**: Firestore
- **Storage**: Firebase Storage
- **Animations**: Lottie animations via @lottiefiles/react-lottie-player
- **Deployment**: Vercel
- **Backend**: Firebase Cloud Functions

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Vercel account (for deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/biplovgautam/bilearnhub.git
   cd bilearnhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Google and Email/Password providers)
   - Create a Firestore database
   - Enable Storage
   - Add your domain to authorized domains in Authentication settings

4. **Configure environment variables**
   - Copy `.env.local` and update with your Firebase config:
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   NEXT_PUBLIC_TEACHER_APP_URL=https://teach.bilearnhub.biplovgautam.com.np
   ```

5. **Set up Firestore Security Rules**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize Firebase in your project
   firebase init
   
   # Deploy Firestore rules
   firebase deploy --only firestore:rules
   ```

6. **Deploy Cloud Functions**
   ```bash
   # Navigate to functions directory
   cd functions
   npm install
   
   # Deploy functions
   firebase deploy --only functions
   ```

7. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 App Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Hero/landing page
│   ├── login/page.tsx     # Authentication page
│   ├── dashboard/page.tsx # Student dashboard
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   └── LottiePlayer.js
│   ├── layout/
│   │   └── Navbar.js      # Navigation with theme toggle
│   └── HeroSection.js     # Landing page hero
├── context/
│   └── ThemeContext.js    # Dark/light mode context
├── hooks/
│   └── useAuth.js         # Firebase auth hook
├── lib/
│   └── firebase.js        # Firebase configuration
└── utils/
    ├── lottie.js          # Lottie animation utilities
    └── authErrors.js      # Auth error handling
```

## 🔧 Configuration

### Firebase Setup
1. **Authentication Providers**:
   - Enable Google OAuth
   - Enable Email/Password authentication
   - Add authorized domains: `localhost`, `bilearnhub.biplovgautam.com.np`

2. **Firestore Collections**:
   - `users`: User account information
   - `student_profiles`: Student-specific data and progress
   - `courses`: Course information (for future implementation)
   - `progress`: Learning progress tracking

3. **Security Rules**: See `firestore.rules` for detailed security configuration

### Vercel Deployment

1. **Connect Repository**:
   - Import your GitHub repository to Vercel
   - Configure build settings (Next.js preset)

2. **Environment Variables**:
   - Add all Firebase configuration variables
   - Set `NEXT_PUBLIC_TEACHER_APP_URL` for teacher app redirect

3. **Domain Configuration**:
   - Add custom domain: `bilearnhub.biplovgautam.com.np`
   - Configure DNS settings with your domain provider

## 🎨 Customization

### Theme Configuration
The app supports both light and dark modes with automatic system preference detection. Theme preference is persisted in localStorage.

### Styling
- Uses Tailwind CSS for styling
- Custom gradient components for modern appearance
- Responsive design with mobile-first approach

### Animations
- Lottie animations for enhanced user experience
- Fallback components for failed animation loads
- Performance optimized with lazy loading

## 🔐 Security

- **Authentication**: Firebase Auth with secure session management
- **Authorization**: Firestore security rules restrict data access
- **Data Protection**: User data is isolated and protected
- **Environment Variables**: Sensitive config stored securely

## 📈 Future Features

- [ ] Course creation and management
- [ ] Video streaming capabilities
- [ ] Interactive assignments and quizzes
- [ ] Real-time chat and discussions
- [ ] Certificate generation
- [ ] Progress analytics
- [ ] Mobile app (React Native)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌐 Links

- **Student App**: [bilearnhub.biplovgautam.com.np](https://bilearnhub.biplovgautam.com.np)
- **Teacher App**: [teach.bilearnhub.biplovgautam.com.np](https://teach.bilearnhub.biplovgautam.com.np)
- **GitHub**: [github.com/biplovgautam/bilearnhub](https://github.com/biplovgautam/bilearnhub)

## 💬 Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Join our community discussions on GitHub
- **Email**: Contact the maintainer at [your-email@example.com]

---

**Built with ❤️ by the BiLearnHub community**
