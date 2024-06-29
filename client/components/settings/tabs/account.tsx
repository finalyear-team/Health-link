"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

import { TabsContent } from "@/components/ui/tabs";
import { Formik, Form, Field } from "formik";

import { Loader2 } from "lucide-react";
import { EmailAddressResource } from "@clerk/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { codeValidation } from "@/utils/validationSchema";
import { DialogClose } from "@radix-ui/react-dialog";
import PersonalInfoUpdate from "../ui/PersonalInfoUpdate";
import ContactInfoUpdate from "../ui/ContactInfoUpdate";
import ProffessionalInfoUpdate from "../ui/ProffessionalInfoUpdate";
import { useUser, useClerk } from "@clerk/nextjs";

const Account = ({ value }: { value: string }) => {
  // ========== for updating email ==========
  // const [code, setCode] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [successful, setSuccessful] = React.useState(false);
  const { user } = useUser();
  const clerk = useClerk();
  const [emailObj, setEmailObj] = React.useState<
    EmailAddressResource | undefined
  >();
  const codeInitial = { code: "" };
  // =======================================

  // Handle the submission of the verification form
  const verifyCode = async (values: any, { setSubmitting }: any) => {
    const code = values.code;
    console.log(values.code);
    console.log(code);
    // try {
    //   // Verify that the code entered matches the code sent to the user
    //   const emailVerifyAttempt = await emailObj?.attemptVerification({ code });

    //   if (emailVerifyAttempt?.verification.status === "verified") {
    //     setSuccessful(true);

    //     // remove the fist email linked to the account
    //     // if (firstEmail) {
    //     //   firstEmail.destroy();
    //     // }
    //     toast({
    //       title: "Contact Information Updated",
    //       variant: "success",
    //       description: "Your Contact information has been updated successfully",
    //     });
    //   } else {
    //     console.error(JSON.stringify(emailVerifyAttempt, null, 2));
    //   }
    // } catch (err) {
    //   console.error(JSON.stringify(err, null, 2));
    // }
    setSubmitting(false);
  };

  const handleCancelUpdate = async () => {
    // if (!user) return;

    // // Find the unverified email address
    // const unverifiedEmail = user.emailAddresses.find(
    //   (email: EmailAddress) => email.verification.status !== "verified"
    // );

    // if (unverifiedEmail) {
    //   try {
    //     // Remove the unverified email address
    //     await clerk.deleteEmailAddress(unverifiedEmail.id);
    //     // Reload user to get updated User object
    //     await user.reload();
    //   } catch (err) {
    //     console.error(JSON.stringify(err, null, 2));
    //   }
    // }
    setIsVerifying(false);
  };

  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          {/* <CardTitle>Account</CardTitle> */}
          <span className="text-primary-700 font-medium">
            Personal Information
          </span>
          <hr />
        </CardHeader>

        <PersonalInfoUpdate />
        <CardHeader>
          <span className="text-primary-700 font-medium">
            Contact Information
          </span>
          <hr />
        </CardHeader>

        <ContactInfoUpdate
          setIsVerifying={setIsVerifying}
          setEmailObj={setEmailObj}
        />
        {/* for accepting the OTP code sent to the email */}
        {isVerifying && !successful ? (
          <Formik
            initialValues={codeInitial}
            onSubmit={verifyCode}
            validationSchema={codeValidation}
          >
            {({ isValid, isSubmitting }) => (
              <Form action="#" method="POST">
                <Dialog defaultOpen>
                  <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                      <DialogTitle>Verify Your Email</DialogTitle>
                      <DialogDescription>
                        We&apos;ve sent a verification code to your new email
                        address. Please enter the code below to confirm your
                        identity.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Field name="code">
                        {({ field, form }: any) => (
                          <InputOTP
                            {...field}
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                            onChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                          >
                            <InputOTPGroup>
                              {[...Array(6)].map((_, index) => (
                                <InputOTPSlot key={index} index={index} />
                              ))}
                            </InputOTPGroup>
                          </InputOTP>
                        )}
                      </Field>
                      <div className="flex justify-end gap-2">
                        {/* <DialogClose asChild> */}
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto"
                          // type="button"
                          onClick={handleCancelUpdate}
                        >
                          Cancel
                        </Button>
                        {/* </DialogClose> */}
                        <Button
                          className="w-full sm:w-auto"
                          disabled={!isValid}
                          type="submit"
                        >
                          {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            ""
                          )}
                          Verify
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </Form>
            )}
          </Formik>
        ) : (
          ""
        )}

        <CardHeader>
          <span className="text-primary-700 font-medium">
            Professional Information
          </span>
          <hr />
        </CardHeader>

        <ProffessionalInfoUpdate />
      </Card>
    </TabsContent>
  );
};

export default Account;
