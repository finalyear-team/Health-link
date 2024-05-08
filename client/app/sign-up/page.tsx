"use client";

import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Container, Input, Button } from "@/component";
import * as Yup from "yup";
import { MdArrowBack, MdCircle } from "react-icons/md";
import MultiStepForm from "@/component/UI/doctor/form/multiStepForm";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Passwords must match")
//     .required("Required"),
// });

const SignUp = () => {
  // const [step, setStep] = useState(1);

  // const nextStep = () => {
  //   setStep(step + 1);
  // };

  // const prevStep = () => {
  //   setStep(step - 1);
  // };

  // const handleSubmit = ({ values, actions }: any) => {
  //   // Handle form submission
  //   console.log(values);
  // };
  const router = useRouter();

  const handleSelection = (choice: string) => {
    // Redirect based on user's choice
    router.push(`/sign-up/${choice}`);
  };
  return (
    // <div className="bg-gray-100 min-h-screen flex justify-center items-center">
    //   <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
    //     <h1 className="text-3xl font-semibold mb-4">Create Account</h1>
    <Container>
      <div className="custom-container font-main">
        <h2 className="text-xl font-extrabold text-dark-700 font-main">
          Create an Account
        </h2>
        <span className="text-sm font-normal">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary-600 font-medium">
            Sign In
          </Link>{" "}
          Instead.
        </span>
        <h2 className="mt-6 text-3xl font-extrabold text-secondary-600 italic font-main">
          Are You
        </h2>
        <div className="flex items-center justify-between space-x-5">
            <div className="flex flex-col">
              <Image
                src="/image/I am doctor.svg"
                alt="doctor"
                width={200}
                height={200}
                className="mb-4"
              />
              <Button
                onClick={() => handleSelection("doctor")}
                className="text-dark-700 px-5 focus:ring-primary-500 rounded border-stroke border hover:bg-gray-50 hover:shadow-sm"
              >
                A Doctor
              </Button>
            </div>
            <div className="flex flex-col justify-end">
              <Image
                src="/image/I am patient.svg"
                alt="patient"
                width={200}
                height={200}
                className="mb-4"
              />
              <Button
                onClick={() => handleSelection("patient")}
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded hover:shadow-sm"
              >
                A Patient
              </Button>
            </div>
        </div>
      </div>
      {/* <MultiStepForm /> */}

      {/* <div className="custom-container bg-white bg-opacity-50 backdrop-blur-sm">
        <span className="flex justify-center">
          <MdCircle size={50} className="text-gray-300" />
        </span>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black dark:text-gray-100 font-main">
            Create your account
          </h2>
          <h4 className="text-base mt-2 font-main font-medium text-primary-600 text-center">
            Empower your healthcare journey by Joining us.
          </h4>
        </div>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className='space-y-4'>
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="Enter First name"
                    label="First Name"
                  />
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Enter Last name"
                    label="Last Name"
                  />
                  <Input
                    name="dob"
                    type="date"
                    placeholder="Enter Date of Birth"
                    label="Date of Birth"
                  />
                </div>
              )}
              {step === 2 && (
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                    label="Email address"
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your Password"
                    label="Password"
                  />
                  <Input
                    name="phone"
                    type="number"
                    placeholder="Enter your Phone"
                    label="Phone number"
                  />
                </div>
              )}
              {step === 3 && (
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                    label="Email address"
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your Password"
                    label="Password"
                  />
                  <Input
                    name="phone"
                    type="number"
                    placeholder="Enter your Phone"
                    label="Phone number"
                  />
                </div>
              )}
              <div className="mt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    className="custom-btn"
                  >
                    <MdArrowBack /> Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="custom-btn"
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="custom-btn">
                    Submit
                  </Button>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div> */}
    </Container>
  );
};

export default SignUp;
