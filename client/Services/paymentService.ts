"use server"

import { useAuth } from "@clerk/nextjs";
import { UserRoundIcon } from "lucide-react";

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

 export const payPayment=async(UserID:string,AppointmentID:string)=>{
    try {
    const token=await fetchWithRetry("http://localhost:4000/payment/pay",{
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               UserID,
               AppointmentID
            }),
            credentials: "include"
    })       

    } catch (error) {
        throw error

        
    }
}