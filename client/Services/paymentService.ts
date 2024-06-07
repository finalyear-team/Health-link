


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

export const payPayment = async () => {
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