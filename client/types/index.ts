import { Gender, UserType } from "./types";

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
  onFollow?: () => void;
  onMakeAppointment?: (profile: DoctorProfile) => void;
  profile?: DoctorProfile;
}

export interface AppointmentType {
  id: string;
  appointmentDate: string;
  appointmentTime: string;
  doctorId: string;
  doctorName: string;
  doctorPhoto: string;
  purpose: string;
  status: string;
}

// updated user interface to be consistent with the backend user Data
export interface UserRegister {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  DOB: Date;
  gender: Gender;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserType;
  specialization: string;
  education: string;
  consultationFee: number;
  license: number;
  experiance: number;
  agreedToTerms: true;
  institution: string;
  additionalInfo?: File | undefined;
  graduationYear: number;
}

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

export enum NotificationType {
  newAppointment,
  cancelAppointment,
  acceptAppointment,
  newPost,
  newForumQuestion,
  newForumAnswer,
  newChat,
  newVideoCall,
  newComment
}