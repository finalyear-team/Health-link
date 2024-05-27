"use client";

import { useState } from "react";
import Container from "@/components/container/container";
import { Formik, Form } from "formik";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLocalStorage from "@/hooks/useLocalStorage";
import { validationSchemaAddInfo } from "@/utils/validationSchema";
import { useSubmit } from "@/hooks/useSubmit";
import VerifyAccount from "@/components/layout/VerifyAccount";
import EducationPopover from "../popOver/EducationPopover";
import SpecializationPopover from "../popOver/SpecializationPopover";
import { Loader2 } from "lucide-react";

const SpecializationForm = ({ onBack }: { onBack: () => void }) => {
  const [specializationValue, setSpecializationValue] = useState("");
  const [educationValue, setEducationValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };

  const [storedValues, setStoredValues] = useLocalStorage("professionalInfo", {
    specialization: specializationValue,
    consultationFee: educationValue,
    education: "",
    license: "",
    experiance: "",
    agreedToTerms: true,
    institution: "",
    additionalInfo: null,
    graduationYear: "",
  });

  const {
    handleSubmit,
    error: submitError,
    pendingVerification,
    completed,
  } = useSubmit(setStoredValues, "provider");

  return (
    <Container>
      {!pendingVerification && (
        <div className="custom-container flex flex-col lg:flex-row items-center justify-center lg:space-x-8 my-6">
          <div className="lg:w-1/2">
            <MdCircle size={50} color="#C4C4C4" />
            <h2 className="text-2xl font-extrabold text-dark-700 dark:text-slate-50">
              Complete Your Account
            </h2>
            <h2 className="text-base font-bold text-primary-600">
              Professional Information (3/3)
            </h2>
            <Formik
              initialValues={storedValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchemaAddInfo}
              enableReinitialize
            >
              {({ isValid, isSubmitting }) => (
                <Form className="mt-8 space-y-6" action="#" method="POST">
                  {/* institution */}
                  <div className="mt-3">
                    <Input
                      name="institution"
                      type="text"
                      placeholder="Academic Institution"
                      label="Enter Your Academic Institution"
                    />
                  </div>
                  {/* Educational qualification/Degree */}
                  <div className="mt-3 flex space-x-2">
                    <EducationPopover
                      educationValue={educationValue}
                      setEducationValue={setEducationValue}
                    />
                    {!educationValue ? (
                      <span className="input__error mr-3">*</span>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* specialization form */}
                  <div className="mt-3 flex space-x-2">
                    <SpecializationPopover
                      specializationValue={specializationValue}
                      setSpecializationValue={setSpecializationValue}
                    />
                    {!specializationValue ? (
                      <span className="input__error mr-3">*</span>
                    ) : (
                      ""
                    )}
                  </div>
                  {/*  Graduation Year */}
                  <div className="mt-3">
                    <Input
                      name="graduationYear"
                      type="number"
                      onKeyDown={handleKeyDown}
                      placeholder="Graduation Year"
                      label="Enter your Graduation year"
                    />
                  </div>
                  {/* license */}
                  <div className="mt-3">
                    <Input
                      name="license"
                      type="number"
                      onKeyDown={handleKeyDown}
                      placeholder="License Number"
                      label="License Number"
                    />
                  </div>
                  {/* experiance */}
                  <div className="mt-3">
                    <Input
                      name="experiance"
                      type="number"
                      onKeyDown={handleKeyDown}
                      placeholder="Experiance Year"
                      label="Experiance Year"
                    />
                  </div>
                  {/* consultation fee */}
                  <div className="mt-3">
                    <Input
                      name="consultationFee"
                      type="number"
                      onKeyDown={handleKeyDown}
                      placeholder="Enter Charge(per Hour)"
                      label="Consultation Charge"
                    />
                  </div>
                  {/* Additional Certification */}
                  <div className="mt-3">
                    <Input
                      name="additionalInfo"
                      type="file"
                      placeholder="Additional Certification"
                      label="Drop any Certification"
                      optional={true}
                    />
                  </div>
                  <div className="mt-3">
                    <Input
                      name="agreedToTerms"
                      type="checkbox"
                      label=" I agree to the Terms and Conditions of HealthLink"
                    />
                  </div>
                  <div className="py-4">
                    {submitError && (
                      <p className="text-xs text-red-600">{submitError}</p>
                    )}
                  </div>
                  <div className="space_buttons">
                    <div>
                      <Button
                        variant={"outline"}
                        type="button"
                        onClick={onBack}
                      >
                        Back
                      </Button>
                    </div>
                    <div>
                      <Button
                        disabled={
                          !isValid ||
                          isSubmitting ||
                          !specializationValue ||
                          !educationValue ||
                          completed
                        }
                        type="submit"
                      >
                        {isSubmitting || completed ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          ""
                        )}{" "}
                        Finish
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/image/professional_information.svg"
              alt="right-side"
              width={300}
              height={300}
              className="auto"
            />
          </div>
        </div>
      )}

      {pendingVerification && <VerifyAccount error={submitError} />}
    </Container>
  );
};

export default SpecializationForm;
