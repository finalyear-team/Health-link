"use client";

import { useState } from "react";
import AdditionalInfo from "@/components/form/patient/Additional-Info";
import ContactInfo from "@/components/form/patient/Contact-Info";
import PersonalInfo from "@/components/form/patient/Personal-Info";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PatientSignUp = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="bg-container">
      <Header />
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Doctor Sign Up</h1>
        {/* Progress bar */}
        <div className="progress-bar-container">
          <div className="progress-bar-wrapper">
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
        {/* Render forms based on current step */}
        {step === 1 && <PersonalInfo onNext={handleNext} onBack={handleBack} />}
        {step === 2 && <ContactInfo onNext={handleNext} onBack={handleBack} />}
        {step === 3 && <AdditionalInfo onBack={handleBack} />}
      </div>
      <Footer />
    </div>
  );
};

export default PatientSignUp;
