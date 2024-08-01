"use client";
import Container from "@/components/container/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { SignIn, useSignIn } from "@clerk/nextjs";
import { MdCircle } from "react-icons/md";
import React from "react";
import { Formik, Form } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { signIn } from "@/Services/authService";


const LoginPage = () => {
  const [error, setError] = useState(null);
  // const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  // validation for the input fields

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("*Email is required!"),
    password: Yup.string()
      .min(8, "*Password must be at least 8 characters")
      .max(20, "*Password must be at most 20 characters")
      .required("*Password is required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      ),
  });

  //initializing the values
  const initialValues = {
    email: "",
    password: "",
  };

  //handilng the submit
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {

      const user = await signIn(values.email, values.password)
      if (user)
        router.push("/dashboard");

      // const result = await signIn.create({
      //   identifier: values.email,
      //   password: values.password,
      // });
      // console.log(result)
      // if (result.status === "complete") {
      //   await setActive({ session: result.createdSessionId });
      //   router.push("/dashboard");
      // } else {
      //   console.log(result);
      // }
    } catch (err: any) {
      setError(err.response.data.message)
      // setError(err.errors[0].longMessage);
    }

    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="bg-login-light dark:bg-login-dark bg-cover bg-center">
      <Header />
      <Container>
        <div className="custom-container bg-white dark:bg-dark-700 mt-8">
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
            validationSchema={validationSchema}
          >
            {({ isValid, isSubmitting }) => (
              <Form className="mt-8 space-y-4" action="#" method="POST">
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

                  {/* password */}
                  <div className="pb-6">
                    <Input
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      label="Password"
                    />
                  </div>
                  <div className="pb-4">
                    {error && <p className="text-xs text-red-600">{error}</p>}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  {/* <div className="flex items-center">
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
                  </div> */}

                  {/* <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-main font-medium text-primary-600 hover:text-primary-700"
                    >
                      Forgot your password?
                    </Link>
                  </div> */}
                </div>

                <div>
                  <Button className="w-full" type="submit">
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      ""
                    )}{" "}
                    Login
                  </Button>

                  <div className="text-sm mt-4 text-center">
                    Don&apos;t have an account?
                    <Link
                      href="/sign-up"
                      className="font-main font-medium text-primary-600 hover:text-primary-700"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default LoginPage;
