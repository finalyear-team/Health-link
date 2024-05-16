"use client"

import { UserButton, useUser } from "@clerk/nextjs";
import Container from "@/components/container/container";


const DoctorDahboard = () => {
  const {user, isSignedIn} = useUser();
  return (
    <Container>
      <div> Hello Dr. {isSignedIn ? user.firstName : ''}</div>
      <UserButton showName afterSignOutUrl="/sign-in"/>
    </Container>
  );
};

export default DoctorDahboard;
