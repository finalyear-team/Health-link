"use client";

import React from "react";
import { Button, Input } from "@/component";
import { MdCircle } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Container } from "@/component";

const forgetPassword = () => {
  //validation for the input field
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required!"),
  });

  //initializing the value
  const initialValues = {
    email: "",
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
      <div className="max-w-xl w-full border border-solid shadow-sm border-stroke dark:border-gray-700 dark:text-gray-100 py-12 px-4 rounded-lg space-y-4">
        <span className="flex justify-center">
          <MdCircle size={50} className="text-gray-300" />
        </span>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black dark:text-gray-100 font-main">
            Forgot Password
          </h2>
          <h4 className="text-base mt-2 font-main text-center">
            we will send you an email to verify your account!
          </h4>
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
                    className="appearance-none h-12 relative w-full px-3 py-2 border border-gray-600 dark:placeholder-gray-100 placeholder-dark-500 dark:bg-dark-500 dark:text-gray-100 text-gray-900 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="text-red-500 font-main text-sm italic mt-1"
                  />
                </div>
              </div>
              <div>
                <Button
                  disabled={!isValid}
                  className={`font-main w-full text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                ${true ? "disabled:bg-gray-300" : ""}`}
                  type="submit"
                >
                  {isSubmitting ? "Submitting..." : "Forgot Password"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="space-x-3 mt-2 text-sm text-gray-700 dark:text-gray-300">
        <Link href="#">Help</Link>
        <Link href="#">Privacy</Link>
        <Link href="#">Terms</Link>
      </div>
    </Container>
  );
};

export default forgetPassword;
