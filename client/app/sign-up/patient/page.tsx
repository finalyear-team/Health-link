"use client";

import { useState } from "react";
import AdditionalInfo from "@/component/UI/patient/form/Additional-Info";
import ContactInfo from "@/component/UI/patient/form/Contact-Info";
import PersonalInfo from "@/component/UI/patient/form/Personal-Info";

const PatientSignUp = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Doctor Sign Up</h1>
      {/* Progress bar */}
      <div className="bg-gray-200 w-full h-4 rounded-full my-8">
        <div
          className={`bg-blue-500 h-full rounded-full transition-all duration-300 ease-in-out w-${
            (step - 1) * 33
          }`}
        />
      </div>
      {/* Render forms based on current step */}
      {step === 1 && <PersonalInfo onNext={handleNext} onBack={handleBack} />}
      {step === 2 && (
        <ContactInfo onNext={handleNext} onBack={handleBack} />
      )}
      {step === 3 && <AdditionalInfo onBack={handleBack} />}
    </div>
  );
};

export default PatientSignUp;
