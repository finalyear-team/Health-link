"use client";

import { useUser } from "@clerk/nextjs";
import Container from "@/components/container/container";

const DoctorDahboard = () => {
  const { user, isSignedIn } = useUser();
  return (
    <Container>
      <div className="text-3xl font-bold">
        {" "}
        Hello Dr. {isSignedIn ? user.firstName : ""}
      </div>
    </Container>
  );
};

export default DoctorDahboard;
