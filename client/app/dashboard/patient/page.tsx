"use client"

import { UserButton, useUser } from "@clerk/nextjs";
import { Container } from "@/component";

const PatientDahboard = () => {
  const { user, isSignedIn } = useUser();
  return (
    <Container>
      <div> Hello Mr. {isSignedIn ? user.firstName : ""} </div>
      <UserButton showName afterSignOutUrl="/sign-in"/>
    </Container>
  );
};

export default PatientDahboard;
