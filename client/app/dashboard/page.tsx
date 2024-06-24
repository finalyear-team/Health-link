"use client"

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const PatDashboard = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // when the component mounted it directly redirects based on the user rolee
    if (user && user.unsafeMetadata && user.unsafeMetadata.role) {
      if (user.unsafeMetadata.role === "provider") {
        router.push("/dashboard/doctor/feed");
      } else {
        router.push("/dashboard/patient/feed");
      }
    }
  }, [user, router]);

  return null; // Render nothing
};

export default PatDashboard;
