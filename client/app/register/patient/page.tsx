"use client";

import { useEffect, useState } from "react";
import AdditionalInfo from "@/components/form/patient/Additional-Info";
import ContactInfo from "@/components/form/patient/Contact-Info";
import PersonalInfo from "@/components/form/patient/Personal-Info";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries/userQueries";
import client from "@/graphql/apollo-client";
import { toast } from "@/components/ui/use-toast";
import logo from "@/public/image/brand/logo-icon.svg"
import Image from "next/image";
import Link from "next/link";

const PatientSignUp = () => {
  const [step, setStep] = useState(1);
  const patientId = useSearchParams().get("patientId")
  const router = useRouter()

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { UserID: patientId },
    client,
    skip: !patientId
  })

  

  if (error) {
    toast({
      title: "Registration error",
      description: `something went wrong . please  try again`,
      variant: "error",
    });
    router.push("/sign-in")
  }




  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };



  return (
    <>
      {!loading &&
        <div className="bg-white">
          <div className="mx-auto bg-white">

            {/* Progress bar */}
            <div className="progress-bar-container bg-white">
              <div className="progress-bar-wrapper bg-white">
                <div className="bg-gray-200 h-1 ">
                  <div
                    className="bg-primary-600 h-full transition-all duration-300 ease-in-out rounded-r-lg"
                    style={{ width: `${step * 34}%` }}
                  />
                </div>
              </div>
              <style jsx>{`
        .progress-bar-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 999;
        }

        .progress-bar-wrapper {
          width: 100%;
          margin: 0 auto;
        }

        @keyframes progressAnimation {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .bg-primary-600 {
          animation: progressAnimation 1s forwards;
          transform-origin: left;
        }
      `}</style>
            </div>
            <div className="w-full flex flex-col justify-center align-middle items-center gap-10 pt-5 bg-white">
              <Link href={"/"}>
                <Image src={logo} alt="logo" width={1000} height={1000} className="w-fit" />
              </Link>
              <h2 className="mt-6 text-center  text-slate-800 text-4xl  font-bold">
                Create an account
              </h2>
            </div>
            {step === 1 && <PersonalInfo onNext={handleNext} onBack={handleBack} user={data && data?.GetUser} />}
            {step === 2 && <ContactInfo onNext={handleNext} onBack={handleBack} />}
            {step === 3 && <AdditionalInfo onBack={handleBack} />}

            <div className="text-md mt-4 mb-4 text-center">
              Already have an account?
              <Link
                href="/sign-up"
                className="font-medium underline   hover:text-blue-600"
              >
                Login
              </Link>
            </div>
          </div>


          <Footer />
        </div>
      }

    </>
  );
};

export default PatientSignUp;
