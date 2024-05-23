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
  id: number;
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string;
  purpose: string;
  status: string;
}
