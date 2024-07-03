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

const checkRoom = async (id: string, token: string) => {
    try {
        console.log(token)
        const response = await fetchWithRetry(`https://api.100ms.live/v2/rooms/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok)
            throw new Error("request failed")
        const room = await response.json()
        console.log(room)
        return room
    } catch (error) {
        throw new Error("something")

    }
}

const generateRoomName = () => {
    const randomString = (length: number): string => {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    return `${randomString(3)}-${randomString(3)}-${randomString(3)}`;
}

const newRoom = async (token: string) => {
    try {
        const roomName = generateRoomName()
        const response = await fetch(`https://api.100ms.live/v2/rooms`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: roomName
            })
        });
        if (!response.ok)
            throw new Error("request failed")
        return response.json()
    } catch (error) {
        console.log(error)
        throw new Error("something")
    }
}

const addNewRoom = async (room: any, doctor: string, patient: string, AppointmentDate: string, AppointmentTime: string) => {
    console.log(room)
    try {
        const response = await fetch(`http://localhost:4000/video-call/create-room`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ RoomID: room.id, RoomName: room.name, HostID: doctor, MemberID: patient, AppointmentDate, AppointmentTime }),
            credentials: "include",
        },);
        if (!response.ok)
            throw new Error("request failed")
        return response.json()
    } catch (error) {
        console.log(error)
        throw new Error("something")
    }

}


export const getRoom = async ({ doctor, patient, appointmentDate, appointmentTime }: any) => {
    try {
        console.log(doctor, patient)

        let room: any
        const response = await fetchWithRetry(`http://localhost:4000/video-call/get-room?Doctor=${doctor}&Patient=${patient}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        },
        )
        if (!response.ok)
            throw new Error("Request failed!")

        const { createdRoom, authToken } = await response.json()

        if (createdRoom) {
            room = await checkRoom(createdRoom.RoomID, authToken.token)
            return { room, hostToken: createdRoom.HostAuthToken, memberToken: createdRoom.Members[0].MemberAuthToken }
        }
        else {
            room = await newRoom(authToken.token)
            const createdRoom = await addNewRoom(room, doctor, patient, appointmentDate, appointmentTime)
            return { room, hostToken: createdRoom.HostAuthToken, memberToken: createdRoom.Members[0].MemberAuthToken }
        }

    } catch (error) {
        console.log(error)
    }
}

const getManagementToken = async (): Promise<string | undefined> => {
    try {
        const response = await fetch("http://localhost:4000/video-call/management-token", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        },
        )
        if (!response.ok)
            throw new Error("Request failed!")
        const token = await response.json()
        console.log(token)
        return token

    } catch (error) {
        console.log(error)

    }
}


// get Session

export const getVideoSession = async (roomId: string, doctorId: string, patientId: string, start_time: Date, end_time: Date) => {
    try {
        const token = await getManagementToken()
        if (!token)
            throw new Error("Invalid token")
        const sessions = await fetch(`https://api.100ms.live/v2/sessions?room_id=${roomId}&after=${start_time}&before=${end_time}`, {

            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            credentials: "include",
        })

    } catch (error) {
        throw error

    }

}
