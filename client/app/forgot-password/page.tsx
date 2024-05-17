"use client";

import React, { useState } from "react";
import { Button, Input } from "@/component";
import { MdArrowBack, MdCircle } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { Container } from "@/component";
import * as Yup from "yup";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner";
import { Header, Footer } from "@/component";

const ForgetPassword = () => {
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  const forgotValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("*Email is required!"),
  });

  const resetValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "*Password must be at least 8 characters")
      .max(20, "*Password must be at most 20 characters")
      .required("*Password is required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      ),
    confirm: Yup.string()
      .oneOf([Yup.ref("password")], "*Passwords must match")
      .required("*Confirm Password is required!"),
    code: Yup.string()
      .matches(/^[0-9]{6,6}$/, "Must be a 6-digit number")
      .required("This field is required"),
  });

  //initializing the value
  const forgotInitialValues = {
    email: "",
  };

  const resetinItialValues = {
    password: "",
    confirm: "",
    code: "",
  };

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push("/dashboard");
  }

  // Send the password reset code to the user's email
  async function create(values: any, { setSubmitting, resetForm }: any) {
    // e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: values.email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the its corresponding page
  async function reset(values: any, { setSubmitting, resetForm }: any) {
    // e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: values.code,
        password: values.password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
          setError("");
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError("");
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <div>
      <Header />
      <Container>
        <div className="max-w-md w-full border border-solid shadow-sm border-stroke dark:border-gray-700 dark:text-gray-100 py-12 px-4 rounded-lg space-y-4 bg-white bg-opacity-50 backdrop-blur-sm">
          <span className="flex justify-center">
            <MdCircle size={50} className="text-gray-300" />
          </span>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-black dark:text-gray-100 font-main">
              Forgot Password
            </h2>
            <h4 className="text-base mt-2 font-main font-medium text-primary-600 text-center">
              We will send you a code to your email to verify your account!
            </h4>
          </div>
          {!successfulCreation && (
            <Formik
              initialValues={forgotInitialValues}
              onSubmit={!successfulCreation ? create : reset}
              validationSchema={forgotValidationSchema}
            >
              {({ isValid, isSubmitting }) => (
                <div>
                  <Form className="mt-4 space-y-6" action="#" method="POST">
                    <div>
                      <div className="">
                        {/* email */}
                        <div className="py-6">
                          <Input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            label="Email address"
                          />
                        </div>
                      </div>
                      <div>
                        <Button
                          disabled={!isValid || isSubmitting}
                          className={`font-main w-full text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                                  ${
                                    true
                                      ? "disabled:bg-gray-300 disabled:text-dark-200"
                                      : ""
                                  } `}
                          type="submit"
                        >
                          {isSubmitting ? (
                            <div className="mr-4">
                              <InfinitySpin width="70" color="#1e90ff" />
                            </div>
                          ) : (
                            "Forgot Password"
                          )}
                        </Button>
                        <Link
                          href={"/sign-in"}
                          className="flex justify-center items-center flex-row mt-2 font-main text-black text-sm font-medium dark:text-gray-100 "
                        >
                          <span>
                            {" "}
                            <MdArrowBack />{" "}
                          </span>
                          <span> Back to Login </span>
                        </Link>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          )}
          {successfulCreation && (
            <Formik
              initialValues={resetinItialValues}
              onSubmit={!successfulCreation ? create : reset}
              validationSchema={resetValidationSchema}
            >
              {({ isValid, isSubmitting }) => (
                <Form className="mt-8 space-y-6" action="#" method="POST">
                  <>
                    <Input
                      name="code"
                      type="number"
                      label="Enter the password reset code that was sent to your email"
                      placeholder="Enter your Code"
                    />
                    <div className="mb-4">
                      <Input
                        name="password"
                        type="password"
                        label="New Password"
                      />
                    </div>

                    <div className="mb-4">
                      <Input
                        name="confirm"
                        type="password"
                        label="Confirm Password"
                      />
                    </div>
                    <div className="pb-4">
                      {error && <p className="text-xs text-red-600">{error}</p>}
                    </div>
                    <Button
                      disabled={!isValid || isSubmitting}
                      className={`font-main w-full text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                                ${
                                  true
                                    ? "disabled:bg-gray-300 disabled:text-dark-200"
                                    : ""
                                }`}
                      type="submit"
                    >
                      {isSubmitting ? (
                        <div className="mr-4">
                          <InfinitySpin width="70" color="#1e90ff" />
                        </div>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default ForgetPassword;
