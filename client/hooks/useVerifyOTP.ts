"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@apollo/client";
import { REGISTER_DOCTOR } from "@/graphql/mutations/userMutations";

export const useVerifyOTP = () => {
  const { toast } = useToast();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const router = useRouter();
  const [DoctorRegister,{data,error:mutationError}]=useMutation(REGISTER_DOCTOR)


  const onPressVerify = async (e: any) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: e.code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await DoctorRegister({
          variables: {
            DoctorDetailInput: {
              UserDetails: {
                UserID: completeSignUp.createdUserId,
                FirstName: "Alemu",
                LastName: "Luis",
                Username: "Alemu@001",
                Email: "alhamdu2001yajbo@gmail.com",
                DateOfBirth: "2024-05-20T12:00:00Z",
                Role: "doctor",
                Bio: "doctor with passion",
                Gender: "Male"
              },
              Speciality: "General Practitioner", // This should be outside of UserDetails
              ExperienceYears: 12, // This should be outside of UserDetails
              LicenseNumber: "12332" // This should be outside of UserDetails
            }
          }
        });

        setCompleted(true);
        await setActive({ session: completeSignUp.createdSessionId });
        toast({
          title: "Welcome to HealthLink!",
          description:"We're excited to have you on board. Let's get started on your journey to better health!",
          variant: "success",
        });
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].longMessage);
      toast({
        title: "Error Creating Your Account!",
        description:"Please try Again!",
        variant: "error",
      });
    }
  };

  return { onPressVerify, error , completed };
};
