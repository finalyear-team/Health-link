"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdArrowBack, MdCircle } from "react-icons/md";
import { Formik, Form } from "formik";
import Link from "next/link";
import Container from "@/components/container/container";
import { InfinitySpin } from "react-loader-spinner";

import * as Yup from "yup";

const ResetPassword = () => {
  //validation for the input field
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "*Password must be at least 8 characters")
      .max(20, "*Password must be at most 20 characters")
      .required("*Password is required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      ),
    email: Yup.string().email("Invalid email").required("*Email is required!"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password")], "*Passwords must match")
      .required("*Confirm Password is required!"),
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
    <div>
      <Container>
        <div className="max-w-md w-full border border-solid shadow-sm border-stroke dark:border-gray-700 dark:text-gray-100 py-12 px-4 rounded-lg space-y-4 bg-white bg-opacity-50 backdrop-blur-sm">
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
            validationSchema={validationSchema}
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
                  <Button disabled={!isValid} className="w-full" type="submit">
                    {isSubmitting ? (
                      <div className="mr-4">
                        <InfinitySpin width="40" color="#1b1f2f" />
                      </div>
                    ) : (
                      "Reset Password"
                    )}
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
      </Container>
    </div>
  );
};

export default ResetPassword;
