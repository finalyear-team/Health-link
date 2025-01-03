"use client"
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { GET_SIGNEDIN_USER } from '@/graphql/queries/userQueries';
import { useQuery } from '@apollo/client';
import { refreshAccessToken } from '@/Services/authService';
import useUserStore from '@/store/userStore';

const publicRoutes = [
    "/sign-up",
    "/forgot-password",
    "/accessibility",
    "/blogs",
    "/faqs",
    "/feedback",
    "/partners",
    "/privacy-policy",
    "/security",
    "/terms-of-services",
]

const useAuth = () => {
    const router = useRouter();
    const setUserInformation = useUserStore((state) => state.setUserInformation);

    const { data, loading, error } = useQuery(GET_SIGNEDIN_USER)

    const [user, setUser] = useState()
    const [isSignedIn, setIsSignedIn] = useState(false)

    const pathname = usePathname();

    const isPublicRoute = pathname === "/" || publicRoutes.some(route => pathname.startsWith(route));

    console.log(isPublicRoute)


    useEffect(() => {
        const refreshToken = async () => {
            if (data && data.GetSignedInUser)
                setIsSignedIn(true)
            if (error?.message === "Unauthorized") {
                try {
                    const { user } = await refreshAccessToken()

                    if (user) {
                        setIsSignedIn(true)
                        setUserInformation(user)
                        setUser(user)
                    }
                } catch (error: any) {
                    if (error.response.status === 401 && !isPublicRoute) {
                        console.log("come on man")
                        router.push("/sign-in")
                    }
                }
            }

        }
        refreshToken()
    }, [data, error])


    useEffect(() => {
        if (data && !data.GetSignedInUser && !isPublicRoute) {
            router.push('/sign-in');
        }
    }, []);


    return {
        user: data?.GetSignedInUser || user,
        isSignedIn,
        isLoading: loading
    };
};

export default useAuth;
