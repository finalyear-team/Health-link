"use client";

import React from "react";
import { Container, Button } from "@/component";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();

  const handleSelection = (choice: string) => {
    router.push(`/sign-up/${choice}`);
  };
  return (
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
          </Container>
  );
};

export default SignUp;
