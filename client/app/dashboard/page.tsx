"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/types";
import { useQuery } from "@apollo/client";
import { GET_SIGNEDIN_USER } from "@/graphql/queries/userQueries";
import { refreshAccessToken } from "@/Services/authService";
import useAuth from "@/hooks/useAuth";

const PatDashboard = () => {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useAuth()



  useEffect(() => {
    console.log(user)
    // when the component mounted it directly redirect based on the user rolee
    // if (user && user.unsafeMetadata && user.unsafeMetadata.role) {
    //   if (user.unsafeMetadata.role === "provider") {
    //     router.push("/dashboard/doctor");
    //   } else {
    //     router.push("/dashboard/patient");
    //   }
    // }


    if ((user && user.Role === UserType.DOCTOR) || (user && user.Role === UserType.DOCTOR))
      router.push("/dashboard/doctor");

    if ((user && user.Role === UserType.PATIENT))
      router.push("/dashboard/patient");


  }, [user, router]);

  return null; // Render nothing
};

export default PatDashboard;
