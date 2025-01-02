"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import { confrimEmailOTP } from "@/Services/authService";
import Link from "next/link";

const otpSchema = z.object({
  code: z.string()
})


const VerifyAccount = ({ UserID }: { UserID?: string }) => {
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: ""
    },
  })
  const { toast } = useToast();
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const router = useRouter();
  const userInformation = useUserStore((state) => state.user);
  const setUserInformation = useUserStore((state) => state.setUserInformation);

  const onsubmit = async (value: z.infer<typeof otpSchema>) => {
    try {
      console.log(userInformation);

      const signedInUser = await confrimEmailOTP(value.code, UserID || userInformation?.UserID as string)


      setCompleted(true);
      if (signedInUser) {
        setUserInformation(signedInUser)
        router.push("/dashboard")
      };
    }
    catch (err: any) {
      console.log(err)
      console.error(JSON.stringify(err, null, 2));
      setError(err.message);
      toast({
        title: "Error Creating Your Account!",
        description: "Please try Again!",
        variant: "error",
      });
    }
  };

  return (
    <div className="verify_container ">
      <Image
        src="/image/brand/logo-icon.svg"
        alt="Logo"
        width={70}
        height={70}
        className="auto"
      />
      <h1 className="text-3xl text-center font-extrabold text-dark-700 my-4 dark:text-slate-50">
        Verify Your Account
      </h1>
      <Form {...form}>
        <form
          className="my-8 space-y-6 flex flex-col items-center justify-center"
          action="#"
          method="POST"
          onSubmit={form.handleSubmit(onsubmit)}
        >
          <label className="font-main text-sm text-dark-700 dark:text-slate-200 font-medium mt-3">
            Enter the Verification code sent to your Email.
          </label>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <InputOTP
                    {...field}
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    onChange={(value) => field.onChange(value)}
                  >
                    <InputOTPGroup>
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-4">
            {(error) && (
              <p className="text-xs text-red-600">{error || error}</p>
            )}
          </div>
          <Button
            disabled={completed}
            type="submit"
            className="bg-primary-600 text-white text-sm font-semibold"
          >
            {completed ? (
              <Loader2 className="mr-2  h-4 w-4 animate-spin" />
            ) : (
              ""
            )}{" "}
            Submit Verification Code
          </Button>
          <div className="flex justify-between items-center">
            <Link href={"/sign-in"} className="text-sm font-medium">Back to  Login</Link>

          </div>
        </form>


      </Form>
    </div>
  );
};

export default VerifyAccount;
