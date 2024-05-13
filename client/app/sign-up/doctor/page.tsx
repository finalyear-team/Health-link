"use client";
import { useState } from "react";
import BasicInfoForm from "@/component/UI/doctor/form/Personal-Info";
import ContactInfoForm from "@/component/UI/doctor/form/Contact-Info";
import SpecializationForm from "@/component/UI/doctor/form/Additional-Info";
import { Header, Footer } from "@/component";

const DoctorSignUp = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div>
      <Header />
      <div className="container flex items-center justify-center flex-col mx-auto relative">
        <h1 className="text-2xl font-semibold mb-4">Doctor Sign Up</h1>
        {/* Progress bar */}
        <div className="progress-bar-container">
          <div className="progress-bar-wrapper">
            <div className="bg-gray-200 h-2 ">
              <div
                className="bg-primary-600 h-full transition-all duration-300 ease-in-out"
                style={{ width: `${step * 33}%` }}
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
