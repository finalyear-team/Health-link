"use client";

import Container from "../../container";
import { Formik, Form, Field } from "formik";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { InfinitySpin } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";


const SpecializationForm = ({ onBack }: { onBack: () => void }) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    // profilePicture: Yup.mixed().required("Profile picture is required"),
    specialization: Yup.string().required("Specialization is required"),
    consultationFee: Yup.number()
      .typeError("Consultation fee must be a number")
      .required("Consultation fee is required")
      .positive("Consultation fee must be a positive amount"),
    education: Yup.string().required("Education information is required"),
    license: Yup.string()
      .matches(/^\d{10}$/, "License number must be 10 digits")
      .required("License number is required"),
    experiance: Yup.number()
      .typeError("Experience must be a number")
      .positive("Experience must be a positive number")
      .integer("Experience must be a whole number")
      .required("Experience is required"),
    agreedToTerms: Yup.boolean()
      .required("You must agree to the terms and conditions")
      .test(
        "agreed",
        "You must agree to the terms and conditions",
        (value) => value === true
      ),
  });

  const codeValidation = Yup.object().shape({
    code: Yup.string()
      .matches(/^[0-9]{6,6}$/, "Must be a 6-digit number")
      .required("This field is required"),
  });

  const codeInitial = {
    code: "",
  };

  const [storedValues, setStoredValues] = useState<any>(() => {
    const storedBasicInfo = localStorage.getItem("professionalInfo");
    return storedBasicInfo
      ? JSON.parse(storedBasicInfo)
      : {
          specialization: "",
          consultationFee: "",
          education: "",
          license: "",
          experiance: "",
          agreedToTerms: true,
        };
  });

  const router = useRouter();
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    localStorage.setItem("professionalInfo", JSON.stringify(values));

    const item1 = localStorage.getItem("personalInfo");
    const item2 = localStorage.getItem("contactInfo");
    const item3 = localStorage.getItem("professionalInfo");

    if (item1 && item2 && item3) {
      // Parse the string back into an array of objects
      const parsedPersonal = JSON.parse(item1);
      const parsedContact = JSON.parse(item2);
      const parsedProfessional = JSON.parse(item3);

      //access elements from the parsed object
      const firstName = parsedPersonal.firstName;
      const lastName = parsedPersonal.lastName;
      const email = parsedContact.email;
      const password = parsedContact.password;

      //check if it is loading
      if (!isLoaded) {
        return;
      }

      // Create a new user
      try {
        await signUp.create({
          firstName: firstName,
          lastName: lastName,
          emailAddress: email,
          password: password,
          unsafeMetadata: {
            role: "provider",
          },
        });

        // Send email verification
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        //Change UI
        setPendingVerification(true);
      } catch (error: any) {
        console.log("The Error is as follows: ", error);
        setError(error.errors[0].longMessage);
      }

      // remove stored valuse from localstorage
      localStorage.removeItem("personalInfo");
      localStorage.removeItem("contactInfo");
      localStorage.removeItem("professionalInfo");

      //set submitting false for Formic
      setSubmitting(false);
    }
  };

  //verify email
  const onPressVerify = async (e: any) => {
    // e.preventDefault();

    //check if it is loading
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: e.code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard/doctor");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].longMessage);
    }
  };

  return (
    <Container>
      {!pendingVerification && (
        <div className="custom-container flex items-center justify-center flex-wrap space-x-5 my-8">
          <div className="w-1/3">
            <MdCircle size={50} color="#C4C4C4" />
            <h2 className="text-2xl font-extrabold text-dark-700">
              Complete Your Account
            </h2>
            <h2 className="text-base font-bold text-primary-600">
              Professional Information (3/3)
            </h2>
            <Formik
              initialValues={storedValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ isValid, isSubmitting }) => (
                <Form className="mt-8 space-y-6" action="#" method="POST">
                  <div className="">
                    {/* profile picture */}
                    {/* <div className="">
                    <Input
                      name="profilePicture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      label="Profile Picture"
                    />
                  </div> */}

                    {/* specialization */}
                    <div className="mt-3">
                      <Input
                        name="specialization"
                        type="text"
                        placeholder="Enter specialization"
                        label="Specialization"
                      />
                    </div>
                    {/* consultation fee */}
                    <div className="mt-3">
                      <Input
                        name="consultationFee"
                        type="number"
                        placeholder="Enter fee(per Hour)"
                        label="Consultation Fee"
                      />
                    </div>

                    {/* education*/}
                    <div className="mt-3">
                      <Input
                        name="education"
                        type="text"
                        placeholder="Educational Qualification"
                        label="Date of Educational Qualification"
                      />
                    </div>
                    {/* license number */}
                    <div className="mt-3">
                      <Input
                        name="license"
                        type="number"
                        placeholder="License Number"
                        label="License Number"
                      />
                    </div>
                    {/* experiance year */}
                    <div className="mt-3">
                      <Input
                        name="experiance"
                        type="number"
                        placeholder="Experiance Year"
                        label="Experiance Year"
                      />
                    </div>
                    {/* agree to the terms */}
                    <div className="mt-3">
                      <Input
                        name="agreedToTerms"
                        type="checkbox"
                        label=" I agree to the Terms and Conditions of HealthLink"
                      />
                    </div>
                    <div className="py-4">
                      {error && <p className="text-xs text-red-600">{error}</p>}
                    </div>
                  </div>
                  <div className="space_buttons">
                    <div>
                      <Button
                        variant={"outline"}
                        type="button"
                        onClick={onBack}
                      >
                        Back
                      </Button>
                    </div>
                    <div>
                      <Button disabled={!isValid || isSubmitting} type="submit">
                        {isSubmitting ? (
                          <div className="mr-4">
                            <InfinitySpin width="32" color="#1b1f2f" />
                          </div>
                        ) : (
                          "Finish"
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="w-2/3">
            <Image
              src="/image/professional_information.svg"
              alt="right-side"
              width={300}
              height={300}
              className="auto"
            />
          </div>
        </div>
      )}

      {pendingVerification && (
        <div className="verify_container ">
          <Image
            src="/image/brand/logo-icon.svg"
            alt="Logo"
            width={70}
            height={70}
            className="auto"
          />
          <h1 className="text-3xl text-center font-extrabold text-dark-700 my-4">
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
                <label className="font-main text-sm text-dark-700 font-medium mt-3">
                  Enter the Verification code sent to your Email.
                </label>

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

                <div className="py-4">
                  {error && <p className="text-xs text-red-600">{error}</p>}
                </div>
                <Button disabled={!isValid || isSubmitting} type="submit">
                  {isSubmitting ? (
                    <div className="mr-4">
                      <InfinitySpin width="32" color="#1b1f2f" />
                    </div>
                  ) : (
                    "Submit Verification Code"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </Container>
  );
};

export default SpecializationForm;
