import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EmergencyProfile } from '../../types';
import { ProfilePreview } from '../Dashboard/ProfilePreview';
import { AlertCircle } from 'lucide-react';
import { profileService } from '../../lib/firebase';

export const PublicProfile: React.FC = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const [profile, setProfile] = useState<EmergencyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!profileId) {
        setError('Invalid profile URL');
        setLoading(false);
        return;
      }

      try {
        const publicUrl = `u/${profileId}`;
        const profileData = await profileService.getProfileByPublicUrl(publicUrl);
        
        if (profileData) {
          setProfile(profileData);
          setLoading(false);
        } else {
          // Fallback to localStorage for demo purposes
          const allKeys = Object.keys(localStorage);
          const profileKeys = allKeys.filter(key => key.startsWith('profile_'));
          
          for (const key of profileKeys) {
            const savedProfile = localStorage.getItem(key);
            if (savedProfile) {
              const parsedProfile = JSON.parse(savedProfile);
              if (parsedProfile.publicUrl === publicUrl) {
                setProfile(parsedProfile);
                setLoading(false);
                return;
              }
            }
          }
          
          setError('Profile not found');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Error loading profile');
        setLoading(false);
      }
    };

    loadProfile();
  }, [profileId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Loading Emergency Profile</h2>
          <p className="text-slate-600">Please wait while we retrieve the emergency information...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Profile Not Found</h1>
          <p className="text-slate-600 mb-8 text-lg">
            The emergency profile you're looking for doesn't exist or has been removed.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-700 font-medium">
              🚨 If this is an emergency, please contact emergency services directly at 911
            </p>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            If this is an emergency, please contact emergency services directly.
          </p>
        </div>
      </div>
    );
  }

  return <ProfilePreview profile={profile} />;
};