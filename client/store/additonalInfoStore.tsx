import { create } from 'zustand';

interface AppointmentStore {
  specializationValues: string;
  setSpecializationValue: (value : string) => void;
}

const useSpecializationStore = create<AppointmentStore>((set) => ({
    specializationValues: "",
    setSpecializationValue: (value) => set((state) => ({  specializationValues: value })),
}));

export default useSpecializationStore;
