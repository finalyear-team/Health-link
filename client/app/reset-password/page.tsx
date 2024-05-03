"use client";

import React from "react";
import { Button, Input } from "@/component";
import { MdArrowBack, MdCircle } from "react-icons/md";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Container } from "@/component";

const ResetPassword = () => {
  //validation for the input field
  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .required("Password is required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      ),
    confirm: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required!"),
  });

  //initializing the value
  const initialValues = {
    password: "",
    confirm: "",
  };

  //handilng the submit
  const handleReset = (values: any, { setSubmitting, resetForm }: any) => {
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
            Reset Password
          </h2>
          <h4 className="text-base font-medium mt-2 font-main text-center text-primary-600">
            Set a strong password to secure your account!
          </h4>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleReset}
          validationSchema={ResetPasswordSchema}
        >
          {({ isValid, isSubmitting }) => (
            <Form className="mt-8 space-y-6" action="#" method="POST">
              <div className="">
                {/* email */}
                <div className="py-6">
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    label="New Password"
                  />
                </div>
                <div className="pb-6">
                  <Input
                    name="confirm"
                    type="password"
                    placeholder="Confirm password"
                    label="Confirm Password"
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
                  {isSubmitting ? "Submitting..." : "Reset Password"}
                </Button>
                <Link
                  href={"/login"}
                  className="flex justify-center items-center flex-row mt-2 font-main text-black text-sm font-medium dark:text-gray-100 "
                >
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

export default ResetPassword;
