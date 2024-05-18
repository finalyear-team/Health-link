"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Container from "@/components/container/container";

const PatientDahboard = () => {
  const { user, isSignedIn } = useUser();
  return (
    <Container>
      <div className="text-3xl font-bold">
        {" "}
        Hello Mr. {isSignedIn ? user.firstName : ""}
      </div>
    </Container>
  );
};

export default PatientDahboard;
