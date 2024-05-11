"use client";
import { useState } from "react";
import BasicInfoForm from "@/component/UI/doctor/form/Personal-Info";
import ContactInfoForm from "@/component/UI/doctor/form/Contact-Info";
import SpecializationForm from "@/component/UI/doctor/form/Additional-Info";

const DoctorSignUp = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="container flex items-center justify-center flex-col mx-auto relative">
      <h1 className="text-2xl font-semibold mb-4">Doctor Sign Up</h1>
      {/* Progress bar */}
      <div className="bg-gray-200 w-1/2 h-2 rounded-full mt-4">
        <div
          className="bg-primary-600 h-full rounded-full transition-all duration-300 ease-in-out" style={{ width: `${(step - 1) * 33}%` }}
        />
      </div>
      {/* Render forms based on current step */}
      {step === 1 && <BasicInfoForm onNext={handleNext} onBack={handleBack} />}
      {step === 2 && (
        <ContactInfoForm onNext={handleNext} onBack={handleBack} />
      )}
      {step === 3 && (
        <SpecializationForm onBack={handleBack} />
      )}
    </div>
  );
};

export default DoctorSignUp;
