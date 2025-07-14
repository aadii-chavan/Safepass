import React from 'react';
import { EmergencyProfile } from '../../types';
import { User, Heart, Phone, Shield, MapPin, Calendar, Droplets, Clock, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

interface ProfilePreviewProps {
  profile: EmergencyProfile;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({ profile }) => {
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 mb-8 text-center shadow-2xl border border-red-500">
          <div className="flex items-center justify-center mb-3">
            <AlertTriangle className="w-8 h-8 mr-3" />
            <h1 className="text-3xl font-bold">EMERGENCY MEDICAL INFORMATION</h1>
            <AlertTriangle className="w-8 h-8 ml-3" />
          </div>
          <p className="text-red-100 text-lg">This information is provided for emergency medical assistance only</p>
        </div>

        {/* Personal Information */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Personal Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Full Name
              </h3>
              <p className="text-2xl font-bold text-blue-600">{profile.fullName}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                Age
              </h3>
              <p className="text-2xl font-bold text-purple-600">
                {calculateAge(profile.dateOfBirth)} years old
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="font-bold text-slate-800 mb-3">Gender</h3>
              <p className="text-2xl font-bold text-emerald-600">{profile.gender}</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                <Droplets className="w-4 h-4 mr-2 text-red-500" />
                Blood Group
              </h3>
              <p className="text-3xl font-bold text-red-600">{profile.bloodGroup}</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                Location
              </h3>
              <p className="text-xl font-bold text-amber-600">{profile.generalLocation}</p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                <Heart className="w-4 h-4 mr-2 text-indigo-600" />
                Organ Donor
              </h3>
              <p className="text-xl font-bold text-indigo-600 flex items-center">
                {profile.isOrganDonor ? (
                  <>
                    <CheckCircle className="w-6 h-6 mr-2" />
                    Yes
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    No
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Medical Information</h2>
            <div className="ml-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">CRITICAL</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profile.allergies && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-6 rounded-2xl">
                <h3 className="font-bold text-red-800 mb-3 flex items-center text-lg">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  ALLERGIES
                </h3>
                <p className="text-red-700 whitespace-pre-wrap text-base leading-relaxed">{profile.allergies}</p>
              </div>
            )}
            
            {profile.medications && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-2xl">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center text-lg">
                  <Activity className="w-5 h-5 mr-2" />
                  CURRENT MEDICATIONS
                </h3>
                <p className="text-blue-700 whitespace-pre-wrap text-base leading-relaxed">{profile.medications}</p>
              </div>
            )}
            
            {profile.medicalConditions && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 p-6 rounded-2xl">
                <h3 className="font-bold text-amber-800 mb-3 flex items-center text-lg">
                  <Heart className="w-5 h-5 mr-2" />
                  MEDICAL CONDITIONS
                </h3>
                <p className="text-amber-700 whitespace-pre-wrap text-base leading-relaxed">{profile.medicalConditions}</p>
              </div>
            )}
            
            {profile.disabilities && profile.privacy.showDisabilities && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-2xl">
                <h3 className="font-bold text-purple-800 mb-3 flex items-center text-lg">
                  <User className="w-5 h-5 mr-2" />
                  DISABILITIES/SPECIAL NEEDS
                </h3>
                <p className="text-purple-700 whitespace-pre-wrap text-base leading-relaxed">{profile.disabilities}</p>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Emergency Contacts</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profile.emergencyContacts.map((contact, index) => (
              <div key={contact.id} className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6">
                <h3 className="font-bold text-emerald-800 text-xl mb-4 flex items-center">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  {contact.name}
                </h3>
                <div className="space-y-3">
                  <p className="text-emerald-700 text-base">
                    <span className="font-semibold">Relationship:</span> {contact.relationship}
                  </p>
                  <p className="text-emerald-700 text-base">
                    <span className="font-semibold">Primary Phone:</span> 
                    <a href={`tel:${contact.primaryPhone}`} className="ml-2 underline hover:text-emerald-800 font-mono text-lg">
                      {contact.primaryPhone}
                    </a>
                  </p>
                  {contact.alternatePhone && (
                    <p className="text-emerald-700 text-base">
                      <span className="font-semibold">Alternate Phone:</span>
                      <a href={`tel:${contact.alternatePhone}`} className="ml-2 underline hover:text-emerald-800 font-mono text-lg">
                        {contact.alternatePhone}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Healthcare Provider */}
        {(profile.privacy.showDoctorInfo || profile.preferredHospital) && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Healthcare Provider</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.preferredHospital && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-3 flex items-center text-lg">
                    <Shield className="w-5 h-5 mr-2" />
                    Preferred Hospital
                  </h3>
                  <p className="text-blue-700 text-xl font-semibold">{profile.preferredHospital}</p>
                </div>
              )}
              
              {profile.privacy.showDoctorInfo && profile.doctorName && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-3 flex items-center text-lg">
                    <User className="w-5 h-5 mr-2" />
                    Primary Physician
                  </h3>
                  <p className="text-blue-700 text-xl font-semibold">{profile.doctorName}</p>
                  {profile.doctorContact && (
                    <p className="text-blue-600 mt-2">
                      <a href={`tel:${profile.doctorContact}`} className="underline hover:text-blue-800 font-mono text-lg">
                        {profile.doctorContact}
                      </a>
                    </p>
                  )}
                </div>
              )}
              
              {profile.privacy.showInsurance && profile.healthInsurance && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-3 flex items-center text-lg">
                    <Shield className="w-5 h-5 mr-2" />
                    Health Insurance
                  </h3>
                  <p className="text-blue-700 text-xl font-semibold">{profile.healthInsurance}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl p-8 text-center shadow-2xl">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold">SafePass</h3>
          </div>
          <div className="flex items-center justify-center mb-3">
            <Clock className="w-4 h-4 mr-2 text-slate-300" />
            <span className="text-slate-300">Last Updated: {new Date(profile.updatedAt).toLocaleString()}</span>
          </div>
          <p className="text-slate-300 text-lg mb-2">Emergency Identity System</p>
          <p className="text-xs text-slate-400">
            This information is provided for emergency medical assistance only
          </p>
        </div>
      </div>
    </div>
  );
};