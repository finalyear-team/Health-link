"use client";

import React from "react";
import { Container } from "@/component";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/component";

const SignUp = () => {
  const router = useRouter();

  const handleSelection = (choice: string) => {
    router.push(`/sign-up/${choice}`);
  };
  return (
    <div className="bg-container">
      <Header />
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
                variant={"outline"}
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
              <Button onClick={() => handleSelection("patient")}>
                A Patient
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default SignUp;
