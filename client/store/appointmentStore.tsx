import { create } from 'zustand';
import { DoctorProfile } from '../types';

interface AppointmentStore {
  selectedDoctor: DoctorProfile | null;
  selectedAppointment: any;
  AppointmentForm: boolean;
  showVideoChat: boolean;
  setShowVideoChat: () => void,
  cancelVideoChat: () => void,
  showAppointmentForm: () => void;
  cancelAppointmentForm: () => void;
  selectDoctor: (doctor: DoctorProfile) => void;
  clearSelection: () => void;
  selectAppointment: (appointment: any) => void;
  clearSelectedAppointment: () => void;
}

const useAppointmentStore = create<AppointmentStore>((set) => ({
  selectedDoctor: null,
  selectedAppointment: null,
  showVideoChat: false,
  AppointmentForm: false,
  setShowVideoChat: () => set((state) => ({ showVideoChat: true })),
  cancelVideoChat: () => set((state) => ({ showVideoChat: false })),
  showAppointmentForm: () => set((state) => ({ AppointmentForm: true })),
  cancelAppointmentForm: () => set((state) => ({ AppointmentForm: false })),
  selectDoctor: (doctor) => set((state) => ({ selectedDoctor: doctor })),
  clearSelection: () => set({ selectedDoctor: null, selectedAppointment: null }),
  selectAppointment: (appointment) => set({ selectedAppointment: appointment }),
  clearSelectedAppointment: () => set({ selectedAppointment: null }),
}));

export default useAppointmentStore;
