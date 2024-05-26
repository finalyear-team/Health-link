"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const useVerifyOTP = () => {
  const { toast } = useToast();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

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
