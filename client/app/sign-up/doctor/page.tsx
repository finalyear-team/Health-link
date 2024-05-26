"use client";
import { useState } from "react";
import BasicInfoForm from "@/components/form/doctor/Personal-Info";
import ContactInfoForm from "@/components/form/doctor/Contact-Info";
import SpecializationForm from "@/components/form/doctor/Additional-Info";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const DoctorSignUp = () => {
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
      <div className="container flex items-center justify-center flex-col mx-auto relative">
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
        {step === 1 && <BasicInfoForm onNext={handleNext} />}
        {step === 2 && (
          <ContactInfoForm onNext={handleNext} onBack={handleBack} />
        )}
        {step === 3 && <SpecializationForm onBack={handleBack} />}
      </div>
      <Footer />
    </div>
  );
};

export default DoctorSignUp;
