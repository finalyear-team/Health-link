import Container from "../../container";
import Input from "../../Input";
import Button from "../../Button";
import { Formik, Form } from "formik";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SpecializationForm = ({ onBack }: { onBack: () => void }) => {
  const validationSchema = Yup.object().shape({
    // profilePicture: Yup.mixed().required("Profile picture is required"),
    specialization: Yup.string().required("Specialization is required"),
    consultationFee: Yup.number()
      .typeError("Consultation fee must be a number")
      .required("Consultation fee is required")
      .positive("Consultation fee must be a positive amount"),
    education: Yup.string().required("Education information is required"),
    license: Yup.string()
      .matches(/^\d{10}$/, "License number must be 10 digits")
      .required("License number is required"),
    experiance: Yup.number()
      .typeError("Experience must be a number")
      .positive("Experience must be a positive number")
      .integer("Experience must be a whole number")
      .required("Experience is required"),
    agreedToTerms: Yup.boolean()
      .required("You must agree to the terms and conditions")
      .test(
        "agreed",
        "You must agree to the terms and conditions",
        (value) => value === true
      ),
  });

  const [storedValues, setStoredValues] = useState<any>(() => {
    const storedBasicInfo = localStorage.getItem("professionalInfo");
    return storedBasicInfo
      ? JSON.parse(storedBasicInfo)
      : {
          specialization: "",
          consultationFee: "",
          education: "",
          license: "",
          experiance: "",
          agreedToTerms: true,
        };
  });

  const router = useRouter();
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    localStorage.setItem("professionalInfo", JSON.stringify(values));

    const item1 = localStorage.getItem("personalInfo");
    const item2 = localStorage.getItem("contactInfo");
    const item3 = localStorage.getItem("professionalInfo");

    console.log(item1, item2, item3);

    localStorage.removeItem("personalInfo");
    localStorage.removeItem("contactInfo");
    localStorage.removeItem("professionalInfo");

    setSubmitting(false);
    router.push("/dashboard/doctor");
  };

  return (
    <Container>
      <div className="custom-container flex items-center justify-center flex-wrap space-x-5">
        <div className="w-1/3">
          <MdCircle size={50} color="#C4C4C4" />
          <h2 className="text-2xl font-extrabold text-dark-700">
            Complete Your Account
          </h2>
          <h2 className="text-base font-bold text-primary-600">
            Professional Information
          </h2>
          <Formik
            initialValues={storedValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isValid, isSubmitting }) => (
              <Form className="mt-8 space-y-6" action="#" method="POST">
                <div className="">
                  {/* profile picture */}
                  {/* <div className="">
                    <Input
                      name="profilePicture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      label="Profile Picture"
                    />
                  </div> */}

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
                  {/* agree to the terms */}
                  <div className="mt-3">
                    <Input
                      name="agreedToTerms"
                      type="checkbox"
                      label=" I agree to the Terms and Conditions of HealthLink"
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
                      disabled={!isValid || isSubmitting}
                      className="font-main w-fit text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:text-dark-200"
                      type="submit"
                    >
                      {isSubmitting ? "Submitting" : "Finish"}
                    </Button>
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
            className="auto"
          />
        </div>
      </div>
    </Container>
  );
};

export default SpecializationForm;
