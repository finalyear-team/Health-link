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


export interface UserRegister {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  DOB: Date;
  gender: string;
  email: string;
  password: string;
  phone: string;
  address: string;
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