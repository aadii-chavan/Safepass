import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { EmergencyProfile } from '../../types';
import { QRCodeGenerator } from './QRCodeGenerator';
import { ProfilePreview } from './ProfilePreview';
import { Edit, Eye, QrCode, LogOut, Clock, Share2, Heart, Users, Shield, Activity, AlertCircle, CheckCircle, Droplets, AlertTriangle } from 'lucide-react';
import { EmergencyProfileForm } from '../Profile/EmergencyProfileForm';
import { profileService } from '../../lib/firebase';

export const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState<EmergencyProfile | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (currentUser?.uid) {
        try {
          const userProfile = await profileService.getProfileByUserId(currentUser.uid);
          if (userProfile) {
            setProfile(userProfile);
          }
        } catch (error) {
          console.error('Error loading profile:', error);
          // Fallback to localStorage for demo purposes
          const savedProfile = localStorage.getItem(`profile_${currentUser.uid}`);
          if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
          }
        }
      }
    };

    loadProfile();
  }, [currentUser]);

  const handleSaveProfile = async (profileData: Omit<EmergencyProfile, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'publicUrl'>) => {
    const newProfile: EmergencyProfile = {
      ...profileData,
      id: profile?.id || `profile_${Date.now()}`,
      userId: currentUser?.uid || '',
      createdAt: profile?.createdAt || new Date(),
      updatedAt: new Date(),
      publicUrl: profile?.publicUrl || `u/${Math.random().toString(36).substr(2, 9)}`
    };

    try {
      await profileService.saveProfile(newProfile);
      setProfile(newProfile);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      // Fallback to localStorage for demo purposes
      localStorage.setItem(`profile_${currentUser?.uid}`, JSON.stringify(newProfile));
      setProfile(newProfile);
      setShowForm(false);
    }
  };

  const copyPublicUrl = () => {
    if (profile) {
      const url = `${window.location.origin}/${profile.publicUrl}`;
      navigator.clipboard.writeText(url);
      alert('Public URL copied to clipboard!');
    }
  };

  if (showForm) {
    return <EmergencyProfileForm onSave={handleSaveProfile} initialData={profile || undefined} />;
  }

  if (showPreview && profile) {
    return (
      <div>
        <div className="bg-white border-b border-gray-200 p-4">
          <button
            onClick={() => setShowPreview(false)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>
        <ProfilePreview profile={profile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">SafePass Dashboard</h1>
                  <p className="text-slate-600">Welcome back, {currentUser?.email}</p>
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!profile ? (
          /* No Profile State */
          <div className="text-center py-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Create Your Emergency Profile</h2>
              <p className="text-slate-600 mb-8 text-lg">
                Set up your emergency information to help first responders assist you in case of an emergency.
              </p>
              
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Medical Info</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Emergency Contacts</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <QrCode className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">QR Code Access</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Edit className="w-5 h-5" />
                <span>Create Profile</span>
              </button>
            </div>
          </div>
        ) : (
          /* Profile Exists */
          <div className="space-y-8">
            {/* Profile Summary Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-white">{profile.fullName.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">{profile.fullName}</h2>
                    <p className="text-slate-600 flex items-center mt-2">
                      <Clock className="w-4 h-4 mr-2" />
                      Last updated: {new Date(profile.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-700">Blood Group</h3>
                    <Droplets className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="text-3xl font-bold text-red-600">{profile.bloodGroup}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-700">Emergency Contacts</h3>
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{profile.emergencyContacts.length}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-700">Organ Donor</h3>
                    <Heart className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-600 flex items-center">
                    {profile.isOrganDonor ? (
                      <>
                        <CheckCircle className="w-6 h-6 mr-2" />
                        Yes
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-6 h-6 mr-2" />
                        No
                      </>
                    )}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-700">Profile Status</h3>
                    <Activity className="w-5 h-5 text-amber-600" />
                  </div>
                  <p className="text-xl font-bold text-amber-600 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Active
                  </p>
                </div>
              </div>

              {/* Medical Alerts */}
              {(profile.allergies || profile.medications || profile.medicalConditions) && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100 mb-6">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    Critical Medical Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {profile.allergies && (
                      <div>
                        <h4 className="font-semibold text-red-800 text-sm mb-1">Allergies</h4>
                        <p className="text-red-700 text-sm">{profile.allergies.substring(0, 50)}...</p>
                      </div>
                    )}
                    {profile.medications && (
                      <div>
                        <h4 className="font-semibold text-red-800 text-sm mb-1">Medications</h4>
                        <p className="text-red-700 text-sm">{profile.medications.substring(0, 50)}...</p>
                      </div>
                    )}
                    {profile.medicalConditions && (
                      <div>
                        <h4 className="font-semibold text-red-800 text-sm mb-1">Conditions</h4>
                        <p className="text-red-700 text-sm">{profile.medicalConditions.substring(0, 50)}...</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* QR Code Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                    <QrCode className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">QR Code</h3>
                </div>
                <p className="text-slate-600 mb-6">Generate and download your emergency QR code for quick access</p>
                <button
                  onClick={() => setShowQRCode(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                >
                  Generate QR Code
                </button>
              </div>

              {/* Preview Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-3">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Preview</h3>
                </div>
                <p className="text-slate-600 mb-6">See how your public emergency profile appears to first responders</p>
                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                >
                  Preview Profile
                </button>
              </div>

              {/* Share Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3">
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Share</h3>
                </div>
                <p className="text-slate-600 mb-6">Copy your public profile URL to share with trusted contacts</p>
                <button
                  onClick={copyPublicUrl}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                >
                  Copy URL
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQRCode && profile && (
        <QRCodeGenerator
          profile={profile}
          onClose={() => setShowQRCode(false)}
        />
      )}
    </div>
  );
};