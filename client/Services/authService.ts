import { UserType } from "@/types/types"
import axios from "axios";
import { redirect } from "next/navigation";

export const signIn = async (Email: string, Password: string) => {
    try {
        const response = await axios.post(
            "http://localhost:4000/auth/signin",
            { Email, Password },
            {
                withCredentials: true, // Send cookies with the request
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error during sign in:", error);
        throw error;
    }
};

export const sendEmail = async (email: string, firstName: string) => {
    try {
        console.log(email)
        const response = await axios.post(
            "http://localhost:4000/auth/send-email",
            { email, firstName },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export const SignUp = async (signUpInput: any) => {
    console.log("from signup service");
    console.log(signUpInput);

    try {
        const response = await axios.post(
            "http://localhost:4000/auth/register",
            signUpInput,
            {
                withCredentials: true, // Send cookies with the request
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.data;
        await sendEmail(data.user.Email, data.user.Username);
        return data;
    } catch (error) {
        console.error("Error during sign up:", error);
        throw error;
    }
};

export const registerDoctorDetails = async (doctorDetailsInput: any) => {
    try {
        const response = await axios.post(
            "http://localhost:4000/auth/doctor-details",
            doctorDetailsInput,
            {
                withCredentials: true, // Send cookies with the request
                headers: {
                    "Content-Type": "application/json",
                },
            })
        const user = await response.data
        return user

    } catch (error) {
        throw error

    }
}

export const confrimEmailOTP = async (email: string, otp: string) => {
    try {
        const response = await axios.post(
            "http://localhost:4000/auth/verify-otp",
            { email, otp },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error;
    }
};

export const refreshAccessToken = async () => {
    try {
        const response = await axios.post(
            `http://localhost:4000/auth/refresh`,
            {},
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );


        console.log('Refresh token successful:', response.data);

        return response.data;

    } catch (error: any) {
        // Handle errors
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
};

export const signout = async (): Promise<boolean | undefined> => {
    try {
        const response = await axios.get(`http://localhost:4000/auth/sign-out`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.data;
        return true
    } catch (error) {
        console.error('There was a problem with the signout request:', error);
    }
}
