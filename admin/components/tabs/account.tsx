"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

import { TabsContent } from "@/components/ui/tabs";
import { Formik, Form, Field } from "formik";

import { Loader2 } from "lucide-react";
// import { EmailAddressResource } from "@clerk/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
// import { codeValidation } from "@/utils/validationSchema";
import { DialogClose } from "@radix-ui/react-dialog";
import PersonalInfoUpdate from "../layout/ui/PersonalInfoUpdate";
import ContactInfoUpdate from "../layout/ui/ContactInfoUpdate";
// import { useUser, useClerk } from "@clerk/nextjs";

const Account = ({
  value,
  isPatient,
}: {
  value: string;
  isPatient: boolean;
}) => {
  // ========== for updating email ==========
  // const [code, setCode] = React.useState("");
  // const [isVerifying, setIsVerifying] = React.useState(false);
  // const [successful, setSuccessful] = React.useState(false);
  // const { user } = useUser();
  // const clerk = useClerk();
  // const [emailObj, setEmailObj] = React.useState<
  //   EmailAddressResource | undefined
  // >();
  // const codeInitial = { code: "" };
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
    // setIsVerifying(false);
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
          setIsVerifying={false}
          // setEmailObj={setEmailObj}
        />
        {/* for accepting the OTP code sent to the email */}
       
      </Card>
    </TabsContent>
  );
};

export default Account;
