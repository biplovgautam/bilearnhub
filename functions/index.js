const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { setGlobalOptions } = require('firebase-functions/v2');

// Set global options
setGlobalOptions({ maxInstances: 10 });

// Initialize Firebase Admin
const app = initializeApp();
const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Cloud Function triggered when a new user is created
 * Creates a student profile in Firestore
 */
exports.onUserCreate = onDocumentCreated('users/{userId}', async (event) => {
  try {
    const userId = event.params.userId;
    const userData = event.data?.data();
    
    if (!userData) {
      console.error('No user data found');
      return;
    }

    // Create student profile in Firestore
    const studentProfile = {
      email: userData.email,
      role: 'student',
      enrolledCourses: [],
      progress: {},
      linkedTeacherUID: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      displayName: userData.displayName || null,
      photoURL: userData.photoURL || null,
      preferences: {
        notifications: true,
        theme: 'light',
        language: 'en'
      },
      stats: {
        coursesCompleted: 0,
        totalLearningTime: 0,
        streakDays: 0,
        lastActiveDate: new Date()
      }
    };

    await db.collection('student_profiles').doc(userId).set(studentProfile);
    console.log(`Student profile created for user: ${userId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error creating student profile:', error);
    throw new HttpsError('internal', 'Failed to create student profile');
  }
});

/**
 * Cloud Function to create user document when user signs up
 * This is called from the client after successful authentication
 */
exports.createUserProfile = onCall(async (request) => {
  try {
    const { auth: authContext, data } = request;
    
    if (!authContext) {
      throw new HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { uid, email, displayName, photoURL } = authContext;
    
    // Check if user document already exists
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.exists) {
      return { success: true, message: 'User profile already exists' };
    }

    // Create user document
    const userData = {
      email: email,
      displayName: displayName || null,
      photoURL: photoURL || null,
      role: 'student',
      provider: data?.provider || 'email',
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: authContext.token?.email_verified || false,
      lastSignIn: new Date()
    };

    await db.collection('users').doc(uid).set(userData);
    console.log(`User document created for: ${uid}`);
    
    return { success: true, message: 'User profile created successfully' };
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw new HttpsError('internal', 'Failed to create user profile');
  }
});

/**
 * Cloud Function to update user's last sign-in time
 */
exports.updateLastSignIn = onCall(async (request) => {
  try {
    const { auth: authContext } = request;
    
    if (!authContext) {
      throw new HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { uid } = authContext;
    
    // Update last sign-in time in both collections
    const batch = db.batch();
    
    const userRef = db.collection('users').doc(uid);
    const studentRef = db.collection('student_profiles').doc(uid);
    
    batch.update(userRef, { 
      lastSignIn: new Date(),
      updatedAt: new Date()
    });
    
    batch.update(studentRef, { 
      'stats.lastActiveDate': new Date(),
      updatedAt: new Date()
    });
    
    await batch.commit();
    
    return { success: true };
  } catch (error) {
    console.error('Error updating last sign-in:', error);
    throw new HttpsError('internal', 'Failed to update last sign-in');
  }
});

/**
 * Cloud Function to enroll user in a course
 */
exports.enrollInCourse = onCall(async (request) => {
  try {
    const { auth: authContext, data } = request;
    
    if (!authContext) {
      throw new HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { uid } = authContext;
    const { courseId } = data;
    
    if (!courseId) {
      throw new HttpsError('invalid-argument', 'Course ID is required');
    }

    const studentRef = db.collection('student_profiles').doc(uid);
    const studentDoc = await studentRef.get();
    
    if (!studentDoc.exists) {
      throw new HttpsError('not-found', 'Student profile not found');
    }

    const studentData = studentDoc.data();
    const enrolledCourses = studentData.enrolledCourses || [];
    
    // Check if already enrolled
    if (enrolledCourses.includes(courseId)) {
      throw new HttpsError('already-exists', 'Already enrolled in this course');
    }

    // Add course to enrolled courses
    enrolledCourses.push(courseId);
    
    await studentRef.update({
      enrolledCourses: enrolledCourses,
      [`progress.${courseId}`]: {
        startDate: new Date(),
        completedLessons: [],
        currentLesson: null,
        progressPercentage: 0,
        lastAccessDate: new Date()
      },
      updatedAt: new Date()
    });
    
    return { success: true, message: 'Successfully enrolled in course' };
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw new HttpsError('internal', 'Failed to enroll in course');
  }
});
