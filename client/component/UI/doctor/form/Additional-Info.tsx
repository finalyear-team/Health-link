import Container from "../../container";
import Input from "../../Input";
import Button from "../../Button";
import { Formik, Form } from "formik";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { InfinitySpin } from "react-loader-spinner";

const SpecializationForm = ({ onBack }: { onBack: () => void }) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

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
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    localStorage.setItem("professionalInfo", JSON.stringify(values));

    const item1 = localStorage.getItem("personalInfo");
    const item2 = localStorage.getItem("contactInfo");
    const item3 = localStorage.getItem("professionalInfo");

    // console.log(item1, item2, item3);

    // Parse the string back into an array of objects
    if (item1 && item2 && item3) {
      console.log("item1:", item1, "item2:", item2, "item3:", item3);

      const personalInfo: Array<{
        firstName: string;
        lastName: string;
        userName: string;
        DOB: Date;
        gender: string;
      }> = JSON.parse(item1);
      const contactInfo: Array<{
        email: string;
        password: string;
        phone: string;
        address: string;
      }> = JSON.parse(item2);
      const professionalInfo: Array<{
        specialization: string;
        consultationFee: number;
        education: string;
        license: string;
        experiance: number;
      }> = JSON.parse(item3);

      // Access a specific properties

      const firstName = personalInfo[0]?.firstName;
      const lastName = personalInfo[0]?.lastName;
      const email = contactInfo[0]?.email;
      const password = contactInfo[0]?.password;

      // router.push("/dashboard/doctor");

      if (!isLoaded) {
        return;
      }

      try {
        await signUp.create({
          firstName: firstName,
          lastName: lastName,
          emailAddress: email,
          password: password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        //Change UI

        setPendingVerification(true);
      } catch (error) {
        console.log(error);
      }

      localStorage.removeItem("personalInfo");
      localStorage.removeItem("contactInfo");
      localStorage.removeItem("professionalInfo");

      setSubmitting(false);
    }
  };

  //verify email
  const onPressVerify = async (e: any) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <Container>
      {!pendingVerification && (
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
                  <div className="flex items-center justify-evenly w-full space-x-6 my-2">
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
                        {isSubmitting ? (
                          <InfinitySpin width="50" color="#4fa94d" />
                        ) : (
                          "Finish"
                        )}
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
      )}
      {pendingVerification && (
        <form onSubmit={onPressVerify} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="verification-code" className="sr-only">
                Verification Code
              </label>
              <input
                id="verification-code"
                name="verification-code"
                type="text"
                autoComplete="off"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Verification Code
            </button>
          </div>
        </form>
      )}
    </Container>
  );
};

export default SpecializationForm;
