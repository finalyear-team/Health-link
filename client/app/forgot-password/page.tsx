"use client";

import React from "react";
import { Button, Input } from "@/component";
import { MdArrowBack, MdCircle } from "react-icons/md";
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
    <Container>
      <div className="max-w-md w-full border border-solid shadow-sm border-stroke dark:border-gray-700 dark:text-gray-100 py-12 px-4 rounded-lg space-y-4">
        <span className="flex justify-center">
          <MdCircle size={50} className="text-gray-300" />
        </span>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black dark:text-gray-100 font-main">
            Forgot Password
          </h2>
          <h4 className="text-base mt-2 font-main font-medium text-primary-600 text-center">
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
                  <Input
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    label="Email address"
                  />
                </div>
              </div>
              <div>
                <Button
                  disabled={!isValid}
                  className={`font-main w-full text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                ${true ? "disabled:bg-gray-300 disabled:text-dark-200" : ""}`}
                  type="submit"
                >
                  {isSubmitting ? "Submitting..." : "Forgot Password"}
                </Button>
                  <Link href={"/login"} className="flex justify-center items-center flex-row mt-2 font-main text-black text-sm font-medium dark:text-gray-100 ">
                    <span>
                      {" "}
                      <MdArrowBack />{" "}
                    </span>
                    <span> Back to Login </span>
                  </Link>
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
