"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GET_SIGNEDIN_USER } from "@/graphql/queries/userQueries";
import { useQuery } from "@apollo/client";
import { refreshAccessToken } from "@/Services/authService";

const publicRoutes = ["/sign-in"];

const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/public'); 

  const { data, loading, error } = useQuery(GET_SIGNEDIN_USER, {
    onError: () => { /* Handle query errors here if needed */ },
  });

  const [user, setUser] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const handleAuth = async () => {
      if (data && data.GetSignedInUser) {
        setIsSignedIn(true);
        setUser(data.GetSignedInUser);
      } else if (!isPublicRoute) {
        try {
          const refreshedUser = await refreshAccessToken();
          if (refreshedUser) {
            setIsSignedIn(true);
            setUser(refreshedUser);
          } else {
            router.push("/sign-in");
          }
        } catch (error) {
          router.push("/sign-in");
        }
      }
    };
    handleAuth();
  }, [data, error, pathname, isPublicRoute]);

  return {
    user,
    isSignedIn,
    isLoaded: !loading,
  };
};

export default useAuth;
