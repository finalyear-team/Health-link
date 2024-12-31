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
import { useVerifyOTP } from "@/hooks/useVerifyOTP";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

const otpSchema = z.object({
  code: z.string()
})


const VerifyAccount = ({ error }: { error: string }) => {
  const { onPressVerify, error: verifyError, completed } = useVerifyOTP();
  const codeInitial = { code: "" };
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: ""
    },
  })






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
          onSubmit={form.handleSubmit(onPressVerify)}
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
            {(error || verifyError) && (
              <p className="text-xs text-red-600">{error || verifyError}</p>
            )}
          </div>
          <Button
            disabled={completed}
            type="submit"
          >
            {completed ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              ""
            )}{" "}
            Submit Verification Code
          </Button>
        </form>

      </Form>
    </div>
  );
};

export default VerifyAccount;
