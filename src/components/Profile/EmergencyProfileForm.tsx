import React, { useState } from 'react';
import { User, Heart, Phone, Shield, MapPin, Calendar, Droplets, Camera, Plus, Trash2, Save, AlertTriangle } from 'lucide-react';
import { EmergencyContact, EmergencyProfile } from '../../types';

interface EmergencyProfileFormProps {
  onSave: (profile: Omit<EmergencyProfile, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'publicUrl'>) => void;
  initialData?: Partial<EmergencyProfile>;
}

export const EmergencyProfileForm: React.FC<EmergencyProfileFormProps> = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    gender: initialData?.gender || '',
    bloodGroup: initialData?.bloodGroup || '',
    allergies: initialData?.allergies || '',
    medications: initialData?.medications || '',
    medicalConditions: initialData?.medicalConditions || '',
    disabilities: initialData?.disabilities || '',
    isOrganDonor: initialData?.isOrganDonor || false,
    preferredHospital: initialData?.preferredHospital || '',
    doctorName: initialData?.doctorName || '',
    doctorContact: initialData?.doctorContact || '',
    healthInsurance: initialData?.healthInsurance || '',
    generalLocation: initialData?.generalLocation || '',
    emergencyContacts: initialData?.emergencyContacts || [{
      id: '1',
      name: '',
      relationship: '',
      primaryPhone: '',
      alternatePhone: ''
    }],
    privacy: initialData?.privacy || {
      showDoctorInfo: true,
      showInsurance: false,
      showExactLocation: false,
      showDisabilities: true
    }
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const addEmergencyContact = () => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, {
        id: Date.now().toString(),
        name: '',
        relationship: '',
        primaryPhone: '',
        alternatePhone: ''
      }]
    }));
  };

  const removeEmergencyContact = (id: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter(contact => contact.id !== id)
    }));
  };

  const updateEmergencyContact = (id: string, field: keyof EmergencyContact, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map(contact =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header with medical imagery */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3">Emergency Profile</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Create a comprehensive emergency profile to help first responders and medical professionals assist you effectively during emergencies.
          </p>
        </div>
        
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-3 h-8 bg-gradient-to-b from-emerald-500 to-blue-600 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-slate-800">Complete Your Information</h2>
          </div>
          <p className="text-slate-600 ml-7">All information is encrypted and only shared based on your privacy preferences.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-white" />
              </div>
              Personal Information
            </h3>
            
            {/* Profile Picture Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Profile Picture</label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center">
                  <Camera className="w-8 h-8 text-slate-500" />
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Upload Photo</span>
                  </button>
                  <p className="text-xs text-slate-500 mt-1">Helps first responders identify you</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Date of Birth *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-slate-900"
                  required
                >
                  <option value="">Select Gender</option>
                  {genders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Blood Group *</label>
                <div className="relative">
                  <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600 w-5 h-5" />
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData(prev => ({ ...prev, bloodGroup: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-slate-900"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-3">General Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.generalLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, generalLocation: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-slate-900"
                    placeholder="City, State"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 border border-red-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-3">
                <Heart className="w-5 h-5 text-white" />
              </div>
              Medical Information
              <div className="ml-3 flex items-center">
                <AlertTriangle className="w-4 h-4 text-amber-500 mr-1" />
                <span className="text-xs text-amber-600 font-medium">Critical for Emergency Response</span>
              </div>
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Known Allergies</label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white text-slate-900"
                  rows={3}
                  placeholder="List any known allergies (medications, foods, etc.)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Current Medications</label>
                <textarea
                  value={formData.medications}
                  onChange={(e) => setFormData(prev => ({ ...prev, medications: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white text-slate-900"
                  rows={3}
                  placeholder="List current medications and dosages"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Medical Conditions</label>
                <textarea
                  value={formData.medicalConditions}
                  onChange={(e) => setFormData(prev => ({ ...prev, medicalConditions: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white text-slate-900"
                  rows={3}
                  placeholder="Chronic conditions, past surgeries, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Disabilities</label>
                <textarea
                  value={formData.disabilities}
                  onChange={(e) => setFormData(prev => ({ ...prev, disabilities: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white text-slate-900"
                  rows={2}
                  placeholder="Any disabilities or special needs"
                />
                <div className="mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.privacy.showDisabilities}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, showDisabilities: e.target.checked }
                      }))}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-sm text-slate-600">Show disabilities on public profile</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isOrganDonor}
                  onChange={(e) => setFormData(prev => ({ ...prev, isOrganDonor: e.target.checked }))}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label className="ml-2 text-sm font-semibold text-slate-700">I am an organ donor</label>
              </div>
            </div>
          </div>

          {/* Healthcare Provider */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              Healthcare Provider
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Preferred Hospital</label>
                <input
                  type="text"
                  value={formData.preferredHospital}
                  onChange={(e) => setFormData(prev => ({ ...prev, preferredHospital: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white text-slate-900"
                  placeholder="Hospital name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Doctor's Name</label>
                <input
                  type="text"
                  value={formData.doctorName}
                  onChange={(e) => setFormData(prev => ({ ...prev, doctorName: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white text-slate-900"
                  placeholder="Primary physician"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Doctor's Contact</label>
                <input
                  type="tel"
                  value={formData.doctorContact}
                  onChange={(e) => setFormData(prev => ({ ...prev, doctorContact: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white text-slate-900"
                  placeholder="Phone number"
                />
                <div className="mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.privacy.showDoctorInfo}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, showDoctorInfo: e.target.checked }
                      }))}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-sm text-slate-600">Show doctor info on public profile</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Health Insurance</label>
                <input
                  type="text"
                  value={formData.healthInsurance}
                  onChange={(e) => setFormData(prev => ({ ...prev, healthInsurance: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white text-slate-900"
                  placeholder="Insurance provider (optional)"
                />
                <div className="mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.privacy.showInsurance}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, showInsurance: e.target.checked }
                      }))}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-sm text-slate-600">Show insurance on public profile</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-3">
                <Phone className="w-5 h-5 text-white" />
              </div>
              Emergency Contacts
            </h3>
            
            {formData.emergencyContacts.map((contact, index) => (
              <div key={contact.id} className="bg-white rounded-2xl p-6 mb-6 border border-amber-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-800 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    Emergency Contact {index + 1}
                  </h4>
                  {formData.emergencyContacts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmergencyContact(contact.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Name *</label>
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => updateEmergencyContact(contact.id, 'name', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Relationship *</label>
                    <input
                      type="text"
                      value={contact.relationship}
                      onChange={(e) => updateEmergencyContact(contact.id, 'relationship', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white text-slate-900"
                      placeholder="e.g., Spouse, Parent, Sibling"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Primary Phone *</label>
                    <input
                      type="tel"
                      value={contact.primaryPhone}
                      onChange={(e) => updateEmergencyContact(contact.id, 'primaryPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Alternate Phone</label>
                    <input
                      type="tel"
                      value={contact.alternatePhone}
                      onChange={(e) => updateEmergencyContact(contact.id, 'alternatePhone', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white text-slate-900"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addEmergencyContact}
              className="w-full py-4 px-6 border-2 border-dashed border-amber-300 rounded-xl text-amber-700 hover:border-amber-500 hover:text-amber-800 hover:bg-amber-50 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Add Another Emergency Contact</span>
            </button>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-emerald-700 hover:to-blue-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Save className="w-5 h-5" />
              Save Emergency Profile
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};