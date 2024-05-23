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

const fetchRoom = async (id: string, token: string) => {
    try {
        const response = await fetch(`https://api.100ms.live/v2/rooms/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log(response)
        if (!response.ok)
            throw new Error("request failed")
        return response.json()
    } catch (error) {
        console.log(error)
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
    try {
        const response = await fetch(`http://localhost:4000/video-call/create-room`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ RoomID:room.roomId,RoomName:room.name,HostID:doctor, MemberID:patient ,AppointmentDate,AppointmentTime}),
            credentials: "include",
        },);
        if (!response.ok)
            throw new Error("request failed")
        return response.json()
    } catch (error) {
        console.log(error)
        throw new Error("something")    }

}


export const createCall = async ({ doctor, patient, appointmentDate, appointmentTime }: any) => {
    try {
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
            room = await fetchRoom(createdRoom.id, authToken.token)
            return room
        }
        else {
            room = await newRoom(authToken.token)
            console.log(room)
            const createdRoom = await addNewRoom(room, doctor, patient, appointmentDate, appointmentTime)
            console.log(createdRoom)
            return room
        }

    } catch (error) {
        console.log(error)
    }
}
