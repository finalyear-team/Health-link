import Container from "@/components/container/container";
import { Formik, Form } from "formik";
import GenderSelect from "@/components/genderSelect/genderSelect";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PersonalInfo = ({
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
    const storedBasicInfo = localStorage.getItem("patient_personalInfo");
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
    console.log(values)
    localStorage.setItem("patient_personalInfo", JSON.stringify(values));
    setSubmitting(false);
    onNext();
  };

  return (
    <Container>
      <div className="custom-container flex items-center justify-center flex-wrap space-x-5 my-8">
        <div>
          <MdCircle size={50} color="#C4C4C4" />
          <h2 className="text-2xl font-extrabold text-dark-700">
            Create Your Account
          </h2>
          <h2 className="text-base font-bold text-primary-600">
            Personal Information (1/3)
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
                  {/* User Name */}
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
                <div className="space_buttons">
                  <div>
                    <Button variant={"outline"} type="button">
                      <Link href="/sign-up">Back</Link>
                    </Button>
                  </div>
                  <div>
                    <Button disabled={!isValid} type="submit">
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

export default PersonalInfo;
