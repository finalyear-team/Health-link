"use client"

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const PatDashboard = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // when the component mounted it directly redirect based on the user rolee
    if (user && user.unsafeMetadata && user.unsafeMetadata.role) {
      if (user.unsafeMetadata.role === "provider") {
        router.push("/dashboard/doctor");
      } else {
        router.push("/dashboard/patient");
      }
    }
  }, [user, router]);

  return null; // Render nothing
};

export default PatDashboard;
