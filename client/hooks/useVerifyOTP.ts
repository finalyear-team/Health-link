"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import useUserStore from "@/store/userStore";
import { REGISTER_DOCTOR, REGISTER_USER } from "@/graphql/mutations/userMutations";
import { useMutation } from "@apollo/client";

export const useVerifyOTP = () => {
  const { toast } = useToast();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const router = useRouter();
  const userInformation = useUserStore((state) => state.user);
  const setUserInformation = useUserStore((state) => state.setUserInformation);
  const [registerDoctor,{data:doctorData,error:registerDoctorError,}]=useMutation(REGISTER_DOCTOR)
  const [registerPatient,{data:patientData,error:registerPatientError}]=useMutation(REGISTER_USER)
 console.log(userInformation)

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
        console.log(completeSignUp.unsafeMetadata.role)
         const userDetails={
          UserID:completeSignUp.createdUserId,
          FirstName:userInformation?.firstName,
          LastName:userInformation?.lastName,
          Username:userInformation?.userName,
          Email: completeSignUp.emailAddress,
          DateOfBirth:userInformation?.DOB,
          Gender:userInformation?.gender,
         }
        if( completeSignUp.unsafeMetadata.role==="provider")
            registerDoctor({variables:{DoctorDetailInput:{
               UserDetails:{
                ...userDetails,
                Role:userInformation?.role||"doctor",
               },
               Speciality:userInformation?.specialization,
               ExperienceYears:userInformation?.experiance,
               LicenseNumber:userInformation?.license,
               EducationalBackground:{
                Institution: userInformation?.institution,
                Degree:userInformation?.education,
                Specialization: userInformation?.specialization,
                GraduationYear: userInformation?.graduationYear 
               } 
            }}})
          
            if( completeSignUp.unsafeMetadata.role==="patient")
                registerPatient({variables:{RegisterInput:{
                  ...userDetails,
                  Role:"patient",
                 
              }}})        
        
        setCompleted(true);
        await setActive({ session: completeSignUp.createdSessionId });
        console.log(doctorData)
        console.log(patientData)
        toast({
          title: "Welcome to HealthLink!",
          description:"We're excited to have you on board. Let's get started on your journey to better health!",
          variant: "success",
        });
        if(doctorData||patientData)
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.log(err)
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
