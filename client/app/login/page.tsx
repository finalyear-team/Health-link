"use client";

import { Button } from "@/component";
import { FcGoogle } from "react-icons/fc";
import { MdCircle } from "react-icons/md";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Container } from "@/component";

const LoginPage = () => {
  //validation for the input fields
  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .required("Password is required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      ),
    email: Yup.string().email("Invalid email").required("Email is required!"),
  });

  //initializing the values
  const initialValues = {
    email: "",
    password: "",
  };

  //handilng the submit
  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    console.log("Form values:", values);

    setSubmitting(false);
    resetForm();
  };

  return (
    // <div className="min-h-screen flex items-center justify-center flex-col bg-white  sm:px-6 lg:px-8 dark:bg-dark-700">
    <Container>
      <div className="custom-container">
        <span className="flex justify-center">
          <MdCircle size={50} className="text-gray-300" />
        </span>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black dark:text-gray-100 font-main">
            Sign in to your account
          </h2>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={LoginSchema}
        >
          {({ isValid, isSubmitting }) => (
            <Form className="mt-8 space-y-6" action="#" method="POST">
              <div className="">
                {/* email */}
                <div className="py-6">
                  <label
                    htmlFor="email-address"
                    className="font-main text-base text-dark"
                  >
                    Email address
                  </label>
                  <Field
                    type="text"
                    id="email-address"
                    name="email"
                    placeholder="Enter your email"
                    className="appearance-none dark:placeholder-gray-100 h-12 relative w-full px-3 py-2 border border-gray-600 placeholder-dark-500 dark:bg-dark-500 dark:text-gray-100 text-gray-900 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="text-red-500 font-main text-sm italic mt-1"
                  />
                </div>

                {/* password */}
                <div className="pb-6">
                  <label
                    htmlFor="password"
                    className="font-main text-base text-dark "
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="appearance-none dark:bg-dark-500 dark:text-gray-100 h-12 relative w-full px-3 py-2 border dark:placeholder-gray-100 border-gray-600 placeholder-dark-500 text-gray-900 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="text-red-500 font-main text-sm italic mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600  focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="font-main ml-2 block text-gray-900 dark:text-gray-100"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-main font-medium text-primary-600 hover:text-primary-700"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  disabled={!isValid}
                  className={`font-main w-full text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                  ${true ? "disabled:bg-gray-300" : ""}`}
                  type="submit"
                >
                  {isSubmitting ? "Submitting..." : "Login"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-6">
          <Button className="font-main border border-solid hover:bg-primary-50 dark:hover:bg-dark-600 border-dark-200 w-full text-base font-semibold rounded text-dark focus:outline-none focus:ring-2 focus:ring-offset-2">
            <FcGoogle size={30} /> Continue with Google
          </Button>
        </div>
      </div>
      <div className="space-x-3 mt-2 text-sm text-gray-700 dark:text-gray-300">
        <Link href="#">Help</Link>
        <Link href="#">Privacy</Link>
        <Link href="#">Terms</Link>
      </div>
    </Container>
    //div
  );
};

export default LoginPage;
