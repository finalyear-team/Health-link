import Container from "../../container";
import Input from "../../Input";
import { Formik, Form } from "formik";
import GenderSelect from "@/component/genderSelect/genderSelect";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import Button from "../../Button";
import { useState } from "react";
import * as Yup from "yup";

const BasicInfoForm = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("*First Name is required"),
    lastName: Yup.string().required("*Last Name is required"),
    userName: Yup.string().required("*User Name is required"),
    DOB: Yup.date().required("*Date of Birth is required").nullable(),
    gender: Yup.string()
      .oneOf(["male", "female"])
      .required("*Gender is required"),
  });

  const [storedValues, setStoredValues] = useState<any>(() => {
    const storedBasicInfo = localStorage.getItem("personalInfo");
    return storedBasicInfo
      ? JSON.parse(storedBasicInfo)
      : {
          firstName: "",
          lastName: "",
          userName: "",
          DOB: "",
          gender: "",
        };
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    localStorage.setItem("personalInfo", JSON.stringify(values));
    setSubmitting(false);
    onNext();
  };

  return (
    <Container>
      <div className="custom-container flex items-center justify-center flex-wrap space-x-5">
        <div>
          <MdCircle size={50} color="#C4C4C4" />
          <h2 className="text-2xl font-extrabold text-dark-700">
            Create Your Account
          </h2>
          <h2 className="text-base font-bold text-primary-600">
            Personal Information
          </h2>
          <Formik
            initialValues={storedValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isValid, isSubmitting }) => (
              <Form className="mt-8 space-y-6" action="#" method="POST">
                <div className="">
                  {/* First Name */}
                  <div className="">
                    <Input
                      name="firstName"
                      type="text"
                      placeholder="Enter firstName"
                      label="First Name"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="mt-3">
                    <Input
                      name="lastName"
                      type="text"
                      placeholder="Enter lastName"
                      label="Last Name"
                    />
                  </div>
                  {/* username */}
                  <div className="mt-3">
                    <Input
                      name="userName"
                      type="text"
                      placeholder="Enter userName"
                      label="User Name"
                    />
                  </div>
                  {/* date of birth */}
                  <div className="mt-3">
                    <Input
                      name="DOB"
                      type="date"
                      placeholder="Enter DOB"
                      label="Date of Birth"
                      className="text-sm placeholder-gray-400"
                    />
                  </div>
                  {/* gender */}
                  <div className="mt-3">
                    <GenderSelect name="gender" label="Gender" />
                  </div>
                </div>
                <div className="flex items-center justify-evenly w-full mt-2">
                  <div>
                    <Button
                      className="font-main w-fit text-base font-semibold rounded disabled:bg-gray-300 disabled:text-dark-200"
                      type="button"
                      disabled={true}
                      onClick={onBack}
                    >
                      Back
                    </Button>
                  </div>
                  <div>
                    <Button
                      disabled={!isValid}
                      className="font-main w-fit text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:text-dark-200"
                      type="submit"
                    >
                      {isSubmitting ? "Submitting..." : "Next"}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <Image
            src="/image/progress.svg"
            alt="right-side"
            width={300}
            height={300}
            className="auto"
            priority
          />
        </div>
      </div>
    </Container>
  );
};

export default BasicInfoForm;
