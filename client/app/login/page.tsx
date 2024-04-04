"use client";

import { Button, Input } from "@/component";
import { FcGoogle } from "react-icons/fc";
import { MdCircle } from "react-icons/md";
import React, { useState } from "react";

import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");

  const clickHandle = () => {
    console.log("Button is clicked!");
  };
  const InputChangeHandler = (e: string) => {
    console.log(e);
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-white  sm:px-6 lg:px-8 dark:bg-dark-700">
      <div className="max-w-xl w-full border border-solid shadow-sm border-stroke dark:border-gray-700 dark:text-gray-100 py-12 px-4 rounded-lg space-y-4">
        <span className="flex justify-center">
          <MdCircle size={50} className="text-gray-300" />
        </span>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black dark:text-gray-100 font-main">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="">
            {/* email */}
            <div className="py-6">
              <label
                htmlFor="email-address"
                className="font-main text-base text-dark"
              >
                Email address
              </label>
              <Input
                id="email-address"
                type="text"
                name="email"
                autoComplete="email"
                onChange={InputChangeHandler}
                // value={email}
                placeholder="Enter your email"
                className="appearance-none h-12 relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-500 focus:z-10 sm:text-sm"
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

              <Input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                onChange={InputChangeHandler}
                // value={email}
                placeholder="Enter your password"
                className="appearance-none h-12 relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="font-main ml-2 block text-gray-900 dark:text-gray-100"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-main font-medium text-primary-600 hover:text-primary-700"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              className="font-main w-full text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={clickHandle}
              // disabled={true}
            >
              Log in
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <Button
            className="font-main border border-solid hover:bg-primary-50 dark:hover:bg-dark-600 border-dark-200 w-full text-base font-semibold rounded text-dark focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={clickHandle}
            // disabled={true}
          >
            <FcGoogle size={30} /> Continue with Google
          </Button>
        </div>
      </div>
        <div className="space-x-3 mt-2 text-sm text-gray-700 dark:text-gray-300">
          <Link href='#' >Help</Link>
          <Link href='#'>Privacy</Link>
          <Link href='#'>Terms</Link>
        </div>
    </div>
  );
};

export default LoginPage;
