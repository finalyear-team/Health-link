"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import useUserStore from "@/store/userStore";

export const useVerifyOTP = () => {
  const { toast } = useToast();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const router = useRouter();
  const userInformation = useUserStore((state) => state.user);
  const setUserInformation = useUserStore((state) => state.setUserInformation);

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

        // here you can add the user to the database
        // use userInformation to get the user information
        // like userInformation?.firstName, the names for the values, you can get them in the types/index.ts file
        // you can also use the setUserInformation() to set any values into the store

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
