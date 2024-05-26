"use client";

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";

export const useSubmit = (setStoredValues: any, role: string) => {
  const [pendingVerification, setPendingVerification] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { isLoaded, signUp } = useSignUp();
  const [error, setError] = useState("");

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setStoredValues(values);

    let item1, item2, item3;

    if (role === 'provider') {
      item1 = localStorage.getItem("personalInfo");
      item2 = localStorage.getItem("contactInfo");
      item3 = localStorage.getItem("professionalInfo");
    } else if (role === 'patient') {
      item1 = localStorage.getItem("patient_personalInfo");
      item2 = localStorage.getItem("patient_contactInfo");
      item3 = localStorage.getItem("patient_additionalInfo");
    }


    if (item1 && item2 && item3) {
      const parsedPersonal = JSON.parse(item1);
      const parsedContact = JSON.parse(item2);
      const parsedProfessional = JSON.parse(item3);

      const firstName = parsedPersonal.firstName;
      const lastName = parsedPersonal.lastName;
      const email = parsedContact.email;
      const password = parsedContact.password;

      if (!isLoaded) {
        return;
      }

      try {
        await signUp.create({
          firstName: firstName,
          lastName: lastName,
          emailAddress: email,
          password: password,
          unsafeMetadata: {
            role: role,
          },
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        setCompleted(true);
        setPendingVerification(true);
      } catch (error: any) {
        console.log("The Error is as follows: ", error);
        setError(error.errors[0].longMessage);
      }

      if (role === 'provider') {
        localStorage.removeItem("personalInfo");
        localStorage.removeItem("contactInfo");
        localStorage.removeItem("professionalInfo");
      } else if (role === 'patient') {
        localStorage.removeItem("patient_personalInfo");
        localStorage.removeItem("patient_contactInfo");
        localStorage.removeItem("patient_additionalInfo");
      }

      setSubmitting(false);
      
    }
  };

  return { handleSubmit, error, pendingVerification, completed };
};
