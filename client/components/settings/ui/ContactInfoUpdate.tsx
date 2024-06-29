import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { validateContEditInfo } from "@/utils/validationSchema";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { EmailAddressResource } from "@clerk/types";
import { CardContent } from "@/components/ui/card";

const ContactInfoUpdate = ({ setIsVerifying, setEmailObj }: any) => {
  const { user } = useUser();
  const { toast } = useToast();

  const initialValues = {
    email:
      user?.emailAddresses.filter(
        (email) => email.verification.status === "verified"
      )[0]?.emailAddress || "",
    phone: "0901020304",
    address: "A.A",
  };

  // handle the update of contact information
  const handleContactSubmit = async (values: any, { setSubmitting }: any) => {
    const email = values.email;

    try {
      // Get all unverified email addresses
      const unverifiedEmails = user?.emailAddresses.filter(
        (email) => !email.verification.status
      );

      // Delete each unverified email address
      if (unverifiedEmails) {
        for (const email of unverifiedEmails) {
          await email.destroy();
        }
        console.log("All unverified emails deleted: ", email);
      }

      // Add an unverified email address to user
      const res = await user?.createEmailAddress({ email });

      // Ensure res is not undefined before proceeding
      if (!res) {
        throw new Error("Failed to create email address");
      }

      // Reload user to get updated User object
      await user?.reload();

      // Find the email address that was just added
      const emailAddress = user?.emailAddresses.find((a) => a.id === res.id);
      // Create a reference to the email address that was just added
      setEmailObj(emailAddress);

      // Send the user an email with the verification code
      emailAddress?.prepareVerification({ strategy: "email_code" });

      // Set to true to display second form
      // and capture the OTP code
      setIsVerifying(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
    setSubmitting(false);
  };
  return (
    <CardContent className="space-y-2">
      <Formik
        initialValues={initialValues}
        onSubmit={handleContactSubmit}
        validationSchema={validateContEditInfo}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="flex space-x-5">
              <Input label="Email" name="email" type="email" />
              <Input label="Phone Number" name="phoneNumber" type="number" />
              <Input label="Address" name="address" type="text" />
            </div>
            <Button disabled={!isValid} type="submit">
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                ""
              )}
              Save info
            </Button>
          </Form>
        )}
      </Formik>
    </CardContent>
  );
};

export default ContactInfoUpdate;
