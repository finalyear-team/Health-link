import { create } from 'zustand';
import { DoctorProfile } from '@/types';

interface AppointmentStore {
  selectedDoctor: DoctorProfile | null;
  AppointmentForm: boolean;
  showAppointmentForm: () => void;
  cancelAppointmentForm: () => void;
  selectDoctor: (doctor: any) => void;
  clearSelection: () => void;
}

const useAppointmentStore = create<AppointmentStore>((set) => ({
  selectedDoctor: null,
  AppointmentForm: false,
  showAppointmentForm: () => set((state) => ({ AppointmentForm: true })),
  cancelAppointmentForm: () => set((state) => ({ AppointmentForm: false })),
  selectDoctor: (doctor) => set((state) => ({ selectedDoctor: doctor })),
  clearSelection: () => set({ selectedDoctor: null }),
}));

export default useAppointmentStore;
