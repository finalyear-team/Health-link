
interface VideoSession {
    roomId: string
    patientId: string,
    doctorId: string,
    start_time: Date,
    end_time: Date
    setSesion: (patientId: string, doctorId: string) => void
}