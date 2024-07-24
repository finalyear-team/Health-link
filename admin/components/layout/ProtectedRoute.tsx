"use client";

import { ReactNode, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import PageLoader from "@/common/Loader/PageLoader";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, isLoaded, router]);

  // if (!isLoaded || !isSignedIn)
  //   return (
  //     <div className="w-full h-full flex items-center justify-center mt-8">
  //       <PageLoader />
  //     </div>
  //   );

  return <>{children}</>;
};

export default ProtectedRoute;
