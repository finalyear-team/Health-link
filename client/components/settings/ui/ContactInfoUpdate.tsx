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
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries/userQueries";
import { Email } from "@clerk/nextjs/server";
import client from "@/graphql/apollo-client";
import { sendEmail } from "@/Services/authService";

const ContactInfoUpdate = ({ setIsVerifying, setEmailObj }: any) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [queryError, setQueryError] = useState("")


  const initialValues = {
    email: user?.Email,
    phone: user?.PhoneNumber,
    address: user?.Address,
  };

  // handle the update of contact information
  const handleContactSubmit = async (values: any, { setSubmitting }: any) => {
    setQueryError("")
    const email = values.email;
    console.log(email)
    if (!email)
      return
    const { data: getUserByEmail, loading, error: queryEmailError } = await client.query({
      query: GET_USER_BY_EMAIL,
      variables: {
        Email: email
      }
    })

    if (getUserByEmail.GetUserByEmail) {
      setQueryError("Email already existed.... please use different email")
      return
    }
    try {
      const response = await sendEmail(email, user?.FirstName)
      console.log(response.data)

      // if (response.data)
      //   setIsVerifying(true)s
      // Get all unverified email addresses
      // const unverifiedEmails = user?.emailAddresses.filter(
      //   (email) => !email.verification.status
      // );

      // Delete each unverified email address
      // if (unverifiedEmails) {
      //   for (const email of unverifiedEmails) {
      //     await email.destroy();
      //   }
      console.log("All unverified emails deleted: ", email);
      // }

      // Add an unverified email address to user
      // const res = await user?.createEmailAddress({ email });

      // Ensure res is not undefined before proceeding
      // if (!res) {
      //   // throw new Error("Failed to create email address");
      // }

      // Reload user to get updated User object
      // await user?.reload();

      // Find the email address that was just added
      // const emailAddress = user?.emailAddresses.find((a) => a.id === res.id);
      // Create a reference to the email address that was just added
      // setEmailObj(emailAddress);

      // Send the user an email with the verification code
      // emailAddress?.prepareVerification({ strategy: "email_code" });

      // Set to true to display second form
      // and capture the OTP code
      // setIsVerifying(true);
    } catch (err) {
      toast({
        title: "Information Updated",
        variant: "error",
        description: "Failed to verify your email please try again.",
      });
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
        {({ isValid, isSubmitting, resetForm }) => (
          <Form className="space-y-6">
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col gap-2 ">
                <Input label="Email" name="email" type="email" />
                {queryError && <p className="text-sm text-red-600">{queryError}</p>}
              </div>
              <Input label="Phone Number" name="phone" type="number" />
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
            <Button className="ml-2" type="button" onClick={() => resetForm()}>
              Reset
            </Button>
          </Form>
        )}
      </Formik>
    </CardContent>
  );
};

export default ContactInfoUpdate;
