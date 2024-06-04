"use server"
import { auth } from "@clerk/nextjs/server";


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

 export const tokenProvider=async()=>{
    try {
    const UserID=auth().userId
    console.log(UserID)
    const response=await fetchWithRetry("http://localhost:4000/stream-chat/token",{
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               UserID,
            }),
            credentials: "include"
    })   
    const token=await response.json() 
    console.log(token)  

    return token

    } catch (error) {
        
    }
}