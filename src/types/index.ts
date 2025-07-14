export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  primaryPhone: string;
  alternatePhone?: string;
}

export interface EmergencyProfile {
  id: string;
  userId: string;
  // Personal Information
  fullName: string;
  profilePictureUrl?: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  allergies: string;
  medications: string;
  medicalConditions: string;
  disabilities: string;
  isOrganDonor: boolean;
  preferredHospital: string;
  doctorName: string;
  doctorContact: string;
  healthInsurance?: string;
  generalLocation: string;
  
  // Emergency Contacts
  emergencyContacts: EmergencyContact[];
  
  // Privacy Settings
  privacy: {
    showDoctorInfo: boolean;
    showInsurance: boolean;
    showExactLocation: boolean;
    showDisabilities: boolean;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  publicUrl: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}