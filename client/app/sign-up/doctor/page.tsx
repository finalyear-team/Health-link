"use client";
import { useState } from "react";
import BasicInfoForm from "@/component/UI/doctor/form/Personal-Info";
import ContactInfoForm from "@/component/UI/doctor/form/Contact-Info";
import SpecializationForm from "@/component/UI/doctor/form/Additional-Info";
import { Button } from "@/component";

const DoctorSignUp = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFinish = () => {
    console.log("Doctor account creation finished!");
    // You can navigate to another page or perform any other action upon completion
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Doctor Sign Up</h1>
      {/* Progress bar */}
      <div className="bg-gray-200 w-full h-4 rounded-full my-4">
        <div
          className={`bg-blue-500 h-full rounded-full transition-all duration-300 ease-in-out w-${
            (step - 1) * 33
          }`}
        />
      </div>
      {/* Render forms based on current step */}
      {step === 1 && <BasicInfoForm onNext={handleNext} onBack={handleBack} />}
      {step === 2 && (
        <ContactInfoForm onNext={handleNext} onBack={handleBack} />
      )}
      {step === 3 && (
        <SpecializationForm onFinish={handleFinish} onBack={handleBack} />
      )}
      {/* Navigation buttons */}
      {/* <div className="flex justify-evenly space-x-4">
        {step > 1 && (
          <Button
            className="font-main w-fit text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={handleBack}
            type="submit"
          >
            Back
          </Button>
        )}
        {step < 3 ? (
          <Button
            className="font-main w-fit text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={handleNext}
            type="submit"
          >
            Next
          </Button>
        ) : (
          <button onClick={handleFinish}>Finish</button>
        )}
      </div> */}
    </div>
  );
};

export default DoctorSignUp;
