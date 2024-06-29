"use client";

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import useUserStore from "@/store/userStore";
import { SignUp, registerDoctorDetails } from "@/Services/authService";
import Password from "@/components/settings/tabs/password";
import { Email, PhoneNumber } from "@clerk/nextjs/server";
import { Gender, UserType } from "@/types/types";
import { uploadFile } from "@/utils/fileUpload";
import { app } from "@/firebase/firebase";

export const useSubmit = (setStoredValues: any, role: string, selectedFiles?: any[] | null) => {

  const [pendingVerification, setPendingVerification] = useState(false);
  const [completed, setCompleted] = useState(false);
  // const { isLoaded, signUp } = useSignUp();
  const [error, setError] = useState("");
  const setUserInformation = useUserStore((state) => state.setUserInformation);
  const user = useUserStore((state) => state.user);


  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    // storing values in the zustands store
    setUserInformation(values);

    setStoredValues(values);

    let item1, item2, item3;

    if (role === "provider") {
      item1 = localStorage.getItem("personalInfo");
      item2 = localStorage.getItem("contactInfo");
      item3 = localStorage.getItem("professionalInfo");
    } else if (role === "patient") {
      item1 = localStorage.getItem("patient_personalInfo");
      item2 = localStorage.getItem("patient_contactInfo");
      item3 = localStorage.getItem("patient_additionalInfo");
    }


    if (item1 && item2 && item3) {
      const parsedPersonal = JSON.parse(item1);
      const parsedContact = JSON.parse(item2);
      const parsedProfessional = JSON.parse(item3);

      // const firstName = parsedPersonal.firstName;
      // const lastName = parsedPersonal.lastName;
      // const email = parsedContact.email;
      // const password = parsedContact.password;

      // if (!isLoaded) {
      //   return;
      // }


      try {
        let certificateUrls: string[] = []
        if (selectedFiles && selectedFiles?.length > 0) {
          const uploadedUrls = selectedFiles.map(async (file) => uploadFile(file, "certification"))
          certificateUrls = await Promise.all(uploadedUrls)
          console.log(certificateUrls)
        }
        const { user: registeredUser, access_token, refresh_token } = await SignUp({
          Username: user?.userName,
          FirstName: user?.firstName,
          LastName: user?.lastName,
          Email: user?.email,
          Password: user?.password,
          PhoneNumber: user?.phone,
          Address: user?.address,
          DateOfBirth: user?.DOB,
          Gender: user?.gender,
          Role: role === "provider" ? UserType.DOCTOR : UserType.PATIENT
        })


        if (registeredUser.Role === UserType.DOCTOR) {
          const doctorDetails = await registerDoctorDetails({
            UserID: registeredUser.UserID,
            Speciality: parsedProfessional.specialization,
            ConsultationFee: parsedProfessional.consultationFee,
            LicenseNumber: parsedProfessional.license,
            ExperienceYears: parsedProfessional.experiance,
            EducationalBackground: {
              Institution: parsedProfessional.institution,
              Degree: parsedProfessional.education,
              Specialization: parsedProfessional.specialization,
              GraduationYear: parsedProfessional.graduationYear,
              AdditionalCertifications: certificateUrls
            },
          }
          )
        }

        // await signUp.create({
        //   firstName: firstName,
        //   lastName: lastName,
        //   emailAddress: email,
        //   password: user?.password,
        //   unsafeMetadata: {
        //     role: role,
        //   },
        // });

        // await signUp.prepareEmailAddressVerification({
        //   strategy: "email_code",
        // });


        setCompleted(true);
        setPendingVerification(true);
      } catch (error: any) {
        console.log(error)

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
