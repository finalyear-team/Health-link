import Container from "../../container";
import Input from "../../Input";
import Button from "../../Button";
import { Formik, Form } from "formik";
import validationSchema from "@/utils/validationSchema";
import { MdCircle } from "react-icons/md";
import Image from "next/image";

// components/SpecializationForm.tsx
import { useState } from "react";

const SpecializationForm = ({
  onBack,
  onFinish,
}: {
  onBack: () => void;
  onFinish: () => void;
}) => {
  const LoginSchema = validationSchema;

  const initialValues = {
    profilePicture: "",
    specialization: "",
    consultationFee: "",
    education: "",
    license: "",
    experiance: "",
  };

  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    values.preventDefault();
    // Store values in global state or context
    console.log("Form values:", values);
    setSubmitting(false);
    resetForm();
    onFinish();
  };

  return (
    <Container>
      <div className="custom-container flex items-center justify-center flex-wrap space-x-5">
        <div className="w-1/3">
          <MdCircle size={50} color="#C4C4C4" />
          <h2 className="text-2xl font-extrabold text-dark-700">
            Create Your Account
          </h2>
          <h2 className="text-base font-bold text-primary-600">
            Professional Information
          </h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={LoginSchema}
          >
            {({ isValid, isSubmitting }) => (
              <Form className="mt-8 space-y-6" action="#" method="POST">
                <div className="">
                  <div className="">
                    <Input
                      name="profilePicture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      label="Profile Picture"
                    />
                  </div>

                  {/* specialization */}
                  <div className="mt-3">
                    <Input
                      name="specialization"
                      type="text"
                      placeholder="Enter specialization"
                      label="Specialization"
                    />
                  </div>
                  {/* consultation fee */}
                  <div className="mt-3">
                    <Input
                      name="consultationFee"
                      type="number"
                      placeholder="Enter fee(per Hour)"
                      label="Consultation Fee"
                    />
                  </div>

                  {/* education*/}
                  <div className="mt-3">
                    <Input
                      name="education"
                      type="text"
                      placeholder="Educational Qualification"
                      label="Date of Educational Qualification"
                    />
                  </div>
                  {/* license number */}
                  <div className="mt-3">
                    <Input
                      name="license"
                      type="number"
                      placeholder="License Number"
                      label="License Number"
                    />
                  </div>
                  {/* experiance year */}
                  <div className="mt-3">
                    <Input
                      name="experiance"
                      type="number"
                      placeholder="Experiance Year"
                      label="Experiance Year"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="w-2/3">
          <Image
            src="/image/professional_information.svg"
            alt="right-side"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className="flex items-center justify-evenly w-full mt-2">
        <div>
          <Button
            className="font-main w-fit text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            type="button"
            onClick={onBack}
          >
            Back
          </Button>
        </div>
        <div>
          <Button
            className="font-main w-fit text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            type="submit"
          >
            Finish
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SpecializationForm;