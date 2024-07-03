"use client";

import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { codeValidation } from "@/utils/validationSchema";
import { useVerifyOTP } from "@/hooks/useVerifyOTP";

const VerifyAccount = ({ error }: { error: string }) => {
  const { onPressVerify, error: verifyError, completed } = useVerifyOTP();
  const codeInitial = { code: "" };



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
      <Formik
        initialValues={codeInitial}
        onSubmit={onPressVerify}
        validationSchema={codeValidation}
      >
        {({ isValid, isSubmitting }) => (
          <Form
            className="my-8 space-y-6 flex flex-col items-center justify-center"
            action="#"
            method="POST"
          >
            <label className="font-main text-sm text-dark-700 dark:text-slate-200 font-medium mt-3">
              Enter the Verification code sent to your Email.
            </label>
            <Field name="code">
              {({ field, form }: any) => (
                <InputOTP
                  {...field}
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  onChange={(value) => form.setFieldValue(field.name, value)}
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            </Field>
            <div className="py-4">
              {(error || verifyError) && (
                <p className="text-xs text-red-600">{error || verifyError}</p>
              )}
            </div>
            <Button
              disabled={!isValid || isSubmitting || completed}
              type="submit"
            >
              {isSubmitting || completed ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                ""
              )}{" "}
              Submit Verification Code
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyAccount;
