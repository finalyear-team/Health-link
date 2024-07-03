import { create } from 'zustand';

interface VideoCallInfoStore {
    appointmentId: string | null;
    doctorId: string | null;
    patientId: string | null;
    appointmentDate: string | null;
    appointmentTime: string | null;
    room: string | null;
    isVideoCallActive: boolean;
    setVideoCallInfo: (appointmentId: string, doctorId: string, patientId: string, appointmentDate: string, appointmentTime: string) => void;
    setRoom: (room: string) => void;
    activateVideoCall: () => void;
    deactivateVideoCall: () => void;
    clearVideoCallInfo: () => void;
}

const useVideoCallInfoStore = create<VideoCallInfoStore>((set) => ({
    appointmentId: null,
    doctorId: null,
    patientId: null,
    appointmentDate: null,
    appointmentTime: null,
    room: null,
    isVideoCallActive: false,
    setVideoCallInfo: (appointmentId, doctorId, patientId, appointmentDate, appointmentTime) => {
        set((state) => ({ appointmentId, doctorId, patientId, appointmentDate, appointmentTime }))
    }
    ,
    setRoom: (room) => set({ room }),
    activateVideoCall: () => set({ isVideoCallActive: true }),
    deactivateVideoCall: () => set({ isVideoCallActive: false }),
    clearVideoCallInfo: () => set((state) => ({
        appointmentId: null,
        doctorId: null,
        patientId: null,
        appointmentDate: null,
        appointmentTime: null,
        room: null,
        isVideoCallActive: false
    }))
}));

export default useVideoCallInfoStore;
