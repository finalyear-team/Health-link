import { AppointmentStatus, Gender, NotificationType, UserStatus, UserType } from "./types";

export interface DoctorProfile {
  id: number;
  profilePicture: string;
  name: string;
  username: string;
  type: string;
  followers: number;
  following: number;
  rating: number;
  speciality: string;
  experience: number;
  hourlyRate: number;
  isFollowing?: boolean;
  onUnFollow?: () => void
  onFollow?: () => void;
  onMakeAppointment?: (profile: DoctorProfile) => void;
  profile?: DoctorProfile;
}

export interface AppointmentType {
  id: string;
  appointmentDate: string;
  appointmentTime: string;
  doctorId: string;
  patientId: string;
  duration?: number;
  name: string;
  photo: string;
  purpose: string;
  status: string;
  gender: Gender
  role: UserType
}

// updated user interface to be consistent with the backend user Data
export interface UserRegister {
  UserID: string;
  FirstName: string;
  LastName: string;
  Username: string;
  DateOfBirth: Date;
  Gender: Gender;
  Email: string;
  Password: string;
  PhoneNumber: string;
  Address: string;
  ProfilePicture: string;
  Role: UserType;
  OTPSecret: string;
  CurrentMedication: string;
  PastMedicalHisotry: string;
  FamilyMedicalHistory: string;
  Allergies: string;
  MedicalInfoConsent: boolean;
  PrivacyPolicyConsent: boolean;
  ConsentVersion: string;
  ConsentDate: Date;
  Status: UserStatus;
  Verified: boolean;
  isSocialAccount: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
  LastLogin: Date;

}

// export interface UserRegister {
//   id: string;
//   firstName: string;
//   lastName: string;
//   userName: string;
//   DOB: Date;
//   gender: Gender;
//   email: string;
//   password: string;
//   phone: string;
//   address: string;
//   role: UserType,
//   currentMedication: string
//   allergies: string
//   familyMedicalHistory: string
//   pastMedicalHistory: string
//   medicalInfoConsent: boolean,
//   privacyPolicyConsent: boolean,
//   specialization: string;
//   education: string;
//   consultationFee: number;
//   license: number;
//   experiance: number;
//   agreedToTerms: true;
//   institution: string;
//   additionalInfo?: File | undefined;
//   graduationYear: number;
// }

export interface PopoverNotification {
  NotificationID: string;
  UserID: string;
  Message: string;
  CreatedAt: string;
  UpdatedAt: string;
  Link: string;
  Type: NotificationType;
  Status: "read" | "unread";
}

export interface NotificationCardProps {
  patientName: string;
  date: Date;
  time: string;
  reason: string;
  details: string;
}
export interface AppointmentNotification {
  patientName: string;
  date: string;
  age: string,
  appointmentId: string,
  doctorName: string,
  doctorId: string
  role: UserType,
  gender: Gender
  time: string;
  status: AppointmentStatus
  reason: string;
  details: string;
  appointmentDate: string;
  appointmentTime: string;
}
export interface User {

}