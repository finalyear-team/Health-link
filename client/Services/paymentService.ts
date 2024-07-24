import { differenceInHours, differenceInMinutes } from "date-fns";



const fetchWithRetry = async (url: string, options: any) => {
    const MAX_RETRIES = 4;
    let error = new Error("something went wrong");
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            return await fetch(url, options);
        } catch (err: any) {
            error = err;
        }
    }
    console.error("Fetch failed after max retries", { url, options });
    throw error;
};
interface CreatePaymentInput {
    DoctorID: string
    PatientID: string
    RoomID: string
    AppointmentDate: Date
}

interface GetVideoSessionInput {
    DoctorID: string,
    PatientID: string,
    RoomID: string,
    AppointmentDate: Date,

}
export const getVideoSesssion = async () => {
    const start_time = new Date("Jul 4 2024, 13:47:00").toISOString()
    try {
        const response = await fetchWithRetry(`https://api.100ms.live/v2/sessions?room_id=6686af42ea4db1bc8561267d&after=${start_time}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjEwODE1NTIsImV4cCI6MTcyMTY4NjM1MiwianRpIjoiM2M5NjU2ZmQtMWVkOC00MGQ0LTgwNjctMjgxZmM0YmE0MmY5IiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE3MjEwODE1NTIsImFjY2Vzc19rZXkiOiI2NjM0YTE2Y2EzZjFjNGM2MGY0NjNjNTgifQ.z26EwDt6n3BKlwGQb_z_5qBfb05yp7oT8oYW7tCu3Cc"
            },
            Credential: "include"

        })
        const data = await response.json()
        console.log(data.data.map((session: any) => {
            const peers = Object.values(session.peers)
            console.log(peers.map((peer: any) => (differenceInHours(peer.left_at, peer.joined_at))))

        }))
    } catch (error) {
        console.log(error)
    }

}

export const payPayment = async (AppointmentID: string, DoctorID: string, PatientID: string) => {

    // const data=JSON.stringify({
    //     PatientID,
    //     DoctorID,
    //     AppointmentID,
    //     Amount    })
    try {
        const response = await fetchWithRetry("http://localhost:4000/payment/pay", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify({
            //     UserID,
            //     AppointmentID
            // }),
            credentials: "include"
        })


    } catch (error) {
        throw error


    }
}