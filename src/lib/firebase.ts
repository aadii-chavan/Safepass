import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { EmergencyProfile } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyC880g98hUP8tdxTwqjhW72vxbXeshL9Qs",
  authDomain: "my-life-id.firebaseapp.com",
  projectId: "my-life-id",
  storageBucket: "my-life-id.firebasestorage.app",
  messagingSenderId: "773090033758",
  appId: "1:773090033758:web:f382bdbadebe2aacd7f4cf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Debug Firebase initialization
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase initialized with config:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    apiKey: firebaseConfig.apiKey ? '***' : 'MISSING'
  });
}

// Firestore service functions
export const profileService = {
  // Save or update a profile
  async saveProfile(profile: EmergencyProfile): Promise<void> {
    const profileRef = doc(db, 'profiles', profile.id);
    await setDoc(profileRef, {
      ...profile,
      createdAt: profile.createdAt instanceof Date ? profile.createdAt.toISOString() : profile.createdAt,
      updatedAt: profile.updatedAt instanceof Date ? profile.updatedAt.toISOString() : profile.updatedAt
    });
  },

  // Get profile by user ID
  async getProfileByUserId(userId: string): Promise<EmergencyProfile | null> {
    const profilesRef = collection(db, 'profiles');
    const q = query(profilesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    } as EmergencyProfile;
  },

  // Get profile by public URL
  async getProfileByPublicUrl(publicUrl: string): Promise<EmergencyProfile | null> {
    const profilesRef = collection(db, 'profiles');
    const q = query(profilesRef, where('publicUrl', '==', publicUrl));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    } as EmergencyProfile;
  },

  // Update profile
  async updateProfile(profileId: string, updates: Partial<EmergencyProfile>): Promise<void> {
    const profileRef = doc(db, 'profiles', profileId);
    await updateDoc(profileRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  },

  // Delete profile
  async deleteProfile(profileId: string): Promise<void> {
    const profileRef = doc(db, 'profiles', profileId);
    await deleteDoc(profileRef);
  }
};

// User service for creating user documents
export const userService = {
  async createUser(uid: string, email: string) {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      uid,
      email,
      createdAt: new Date().toISOString(),
    });
  },
};