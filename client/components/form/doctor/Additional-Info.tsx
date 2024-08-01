"use client";

import React, { useState } from "react";
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
import { formatBytes, validateFiles } from "@/utils/fileinputValidator";
import CertificateFileList from "@/components/shared/CertificateFileList";
import CertificateDialog from "@/components/settings/ui/CertificateDialog";
import { validateCertificateInputs } from "@/utils/validationSchema";
import { Label } from "@/components/ui/label";

const SpecializationForm = ({ onBack }: { onBack: () => void }) => {
  const [specializationValue, setSpecializationValue] = useState("");
  const [educationValue, setEducationValue] = useState("");
  const [fileErrors, setFileErrors] = useState<string | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(true);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };

  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

  let certInitialValues = {
    name: certificateFile?.name.split(".").slice(0, -1).join(".") || "",
    description: "",
    issueDate: new Date(""),
    certificateId: "",
  };

  const handleCertificateRemove = (removedFile: File) => {
    const remainingFiles = selectedFiles?.filter(
      (file) => removedFile.name != file.name && removedFile.size != file.size
    );
    setSelectedFiles(remainingFiles || null);
    certInitialValues = {
      name: "",
      description: "",
      issueDate: new Date(""),
      certificateId: "",
    };
    setCertificateFile(null);
  };

  const handleCertificateChange = (values: any) => {
    console.log("upload certificate");
    console.log("This is the original values: ", certificateFile); //this is the file's original values
    console.log("This is the values from the input: ", values.type); // this is my custome values from the inputs
    const file = certificateFile;
    // const currentFiles = event.target.files && Array.from(event.target.files);

    // Check if file is not null
    if (file !== null) {
      const { name, certificateId, issueDate, description } = values;
      const type = file.type;
      const size = file.size;
      const updatedCertificate = {
        ...file,
        name,
        certificateId,
        issueDate,
        description,
        type,
        size,
      };

      console.log("This is updated values :", updatedCertificate);

      const validFiles = validateFiles(
        selectedFiles,
        updatedCertificate,
        setSelectedFiles,
        setFileErrors
      );

      // Close the modal after submitting
      setDialogOpen(false);
    }
  };

  const [storedValues, setStoredValues] = useLocalStorage("professionalInfo", {
    // consultationFee: "",
    license: "",
    experiance: "",
    agreedToTerms: true,
    institution: "",
    // additionalInfo causes a warning message in the console if no value is assigned to it
    // Warning: `value` prop on `input` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.
    additionalInfo: "",

    graduationYear: "",
  });

  const {
    handleSubmit,
    error: submitError,
    pendingVerification,
    completed,
  } = useSubmit(setStoredValues, "provider", selectedFiles);

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
              initialValues={{
                ...storedValues,
                specialization: specializationValue,
                education: educationValue,
              }}
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
                  {/* <div className="mt-3">
                    <Input
                      name="consultationFee"
                      type="number"
                      onKeyDown={handleKeyDown}
                      placeholder="Enter Charge(per Hour)"
                      label="Consultation Charge"
                    />
                  </div> */}
                  {/* Additional Certification */}
                  {/* <div className="mt-3 ">
                    <Input
                      name="additionalInfo"
                      type="file"
                      accept=""
                      placeholder="Additional Certification"
                      label="Drop any Certification"
                      optional={true}
                      onChange={handleCertificateChange}
                    />
                    {fileErrors && (
                      <p className="text-red-600 text-sm">{fileErrors}</p>
                    )}
                    {selectedFiles && selectedFiles.length > 0 && (
                      <CertificateFileList
                        SelectedFiles={selectedFiles}
                        handleFileRemove={handleCertificateRemove}
                        formatBytes={formatBytes}
                      />
                    )}
                  </div> */}

                  {/* <div className="flex flex-col">
                    <Label className="mb-2">Add Certificate (optional)</Label>
                    <CertificateDialog
                      type="create"
                      initialValues={certInitialValues}
                      onSubmit={handleCertificateChange}
                      certificateFile={certificateFile}
                      setCertificateFile={setCertificateFile}
                      formatBytes={formatBytes}
                      validateCertificateInputs={validateCertificateInputs}
                      open={true}
                    />
                    {fileErrors && (
                      <p className="text-red-600 text-sm">{fileErrors}</p>
                    )}
                    {selectedFiles && selectedFiles.length > 0 && (
                      <CertificateFileList
                        SelectedFiles={selectedFiles}
                        handleFileRemove={handleCertificateRemove}
                        formatBytes={formatBytes}
                      />
                    )}
                  </div> */}

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
