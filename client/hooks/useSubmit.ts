"use client";

import { Dispatch, SetStateAction, useState } from "react";
import useUserStore from "@/store/userStore";
import { SignUp, registerDoctorDetails } from "@/Services/authService";
import { UserType } from "@/types/types";
import { uploadFile } from "@/utils/fileUpload";

export const useSubmit = (
  setStoredValues: any,
  role: string,
  setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  selectedFiles?: any[] | null,
) => {
  const [pendingVerification, setPendingVerification] = useState(false);
  const [completed, setCompleted] = useState(false);
  // const { isLoaded, signUp } = useSignUp();
  const [error, setError] = useState("");
  const setUserInformation = useUserStore((state) => state.setUserInformation);
  const user = useUserStore((state) => state.user);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setUserInformation(values);
    setStoredValues(values);
    console.log(user)
    try {
      // let certificateUrls: string[] = [];
      // if (selectedFiles && selectedFiles?.length > 0) {
      //   const uploadedUrls = selectedFiles.map(async (file) =>
      //     uploadFile(file, "certification")
      //   );
      //   certificateUrls = await Promise.all(uploadedUrls);
      //   console.log(certificateUrls);
      // }
      const {
        user: registeredUser,
        access_token,
        refresh_token,
      } = await SignUp({
        FirstName: user?.firstName,
        LastName: user?.lastName,
        Email: user?.email,
        Password: user?.password,
        PhoneNumber: user?.phone,
        Address: user?.address,
        DateOfBirth: user?.DOB,
        Gender: user?.gender,
        isSocialAccount: false,
        Role: role === "provider" ? UserType.DOCTOR : UserType.PATIENT,
        CurrentMedication: values?.currentMedication,
        PastMedicalHisotry: values?.pastMedicalHistory,
        FamilyMedicalHistory: values?.familyMedicalHistory,
        Allergies: values?.allergies,
        MedicalInfoConsent: values?.medicalInfoConsent,
        PrivacyPolicyConsent: values?.privacyPolicyConsent
      });

      // if (registeredUser.Role === UserType.DOCTOR) {
      //   const doctorDetails = await registerDoctorDetails({
      //     UserID: registeredUser.UserID,
      //     Speciality: parsedProfessional.specialization,
      //     ConsultationFee: parsedProfessional.consultationFee,
      //     LicenseNumber: parsedProfessional.license,
      //     ExperienceYears: parsedProfessional.experiance,
      //     EducationalBackground: {
      //       Institution: parsedProfessional.institution,
      //       Degree: parsedProfessional.education,
      //       Specialization: parsedProfessional.specialization,
      //       GraduationYear: parsedProfessional.graduationYear,
      //       AdditionalCertifications: certificateUrls,
      //     },
      //   });
      // }

      setCompleted(true);
      setPendingVerification(true);
    } catch (error: any) {
      console.log(error);

      console.log("The Error is as follows: ", error);
      setError(error.errors[0].longMessage);
    }

    if (role === "provider") {
      localStorage.removeItem("personalInfo");
      localStorage.removeItem("contactInfo");
      localStorage.removeItem("professionalInfo");
    } else if (role === "patient") {
      localStorage.removeItem("patient_personalInfo");
      localStorage.removeItem("patient_contactInfo");
      localStorage.removeItem("patient_additionalInfo");
    }

    setIsSubmitting(false);
  }
  // };

  return { handleSubmit, error, pendingVerification, completed };
};
