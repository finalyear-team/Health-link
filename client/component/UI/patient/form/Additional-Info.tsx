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

const AdditionalInfo = ({ onBack }: { onBack: () => void }) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    // profilePicture: Yup.mixed().required("Profile picture is required"),
    agreedToTerms: Yup.boolean()
      .required("You must agree to the terms and conditions")
      .test(
        "agreed",
        "You must agree to the terms and conditions",
        (value) => value === true
      ),
  });

  const codeValidation = Yup.object().shape({
    code: Yup.string()
      .matches(/^[0-9]{6,6}$/, "Must be a 6-digit number")
      .required("This field is required"),
  });

  const codeInitial = {
    code: "",
  };

  const [storedValues, setStoredValues] = useState<any>(() => {
    const storedBasicInfo = localStorage.getItem("patient_additionalInfo");
    return storedBasicInfo
      ? JSON.parse(storedBasicInfo)
      : {
          agreedToTerms: true,
        };
  });

  const router = useRouter();
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    localStorage.setItem("patient_additionalInfo", JSON.stringify(values));

    const item1 = localStorage.getItem("patient_personalInfo");
    const item2 = localStorage.getItem("patient_contactInfo");
    const item3 = localStorage.getItem("patient_additionalInfo");

    if (item1 && item2 && item3) {
      // Parse the string back into an array of objects
      const parsedPersonal = JSON.parse(item1);
      const parsedContact = JSON.parse(item2);
      const parsedProfessional = JSON.parse(item3);

      //access elements from the parsed object
      const firstName = parsedPersonal.firstName;
      const lastName = parsedPersonal.lastName;
      const email = parsedContact.email;
      const password = parsedContact.password;

      //check if it is loading
      if (!isLoaded) {
        return;
      }

      // Create a new user
      try {
        await signUp.create({
          firstName: firstName,
          lastName: lastName,
          emailAddress: email,
          password: password,
          unsafeMetadata: {
            role: "patient",
          },
        });

        // Send email verification
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        //Change UI
        setPendingVerification(true);
      } catch (error: any) {
        console.log("Error: ", error);
        setError(error.error[0].longMessage);
      }

      // remove stored valuse from localstorage
      localStorage.removeItem("patient_personalInfo");
      localStorage.removeItem("patient_contactInfo");
      localStorage.removeItem("patient_additionalInfo");

      //set submitting false for Formic
      setSubmitting(false);
    }
  };

  //verify email
  const onPressVerify = async (e: any) => {
    // e.preventDefault();

    //check if it is loading
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: e.code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard/patient");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].longMessage);
    }
  };

  return (
    <Container>
      {!pendingVerification && (
        <div className="custom-container flex items-center justify-center flex-wrap space-x-5 my-8">
          <div className="w-1/3">
            <MdCircle size={50} color="#C4C4C4" />
            <h2 className="text-2xl font-extrabold text-dark-700">
              Complete Your Account
            </h2>
            <h2 className="text-base font-bold text-primary-600">
              Professional Information (3/3)
            </h2>
            <Formik
              initialValues={storedValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ isValid, isSubmitting }) => (
                <Form className="mt-8 space-y-6" action="#" method="POST">
                  <div className="">
                    {/* <div className="">
                          <Input
                            name="profilePicture"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            label="Profile Picture"
                          />
                        </div> */}
                    {/* agree to the terms */}
                    <div className="mt-3">
                      <Input
                        name="agreedToTerms"
                        type="checkbox"
                        label=" I agree to the Terms and Conditions of HealthLink"
                      />
                    </div>
                    <div className="py-4">
                      {error && <p className="text-xs text-red-600">{error}</p>}
                    </div>
                  </div>
                  <div className="space_buttons">
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
                        className="font-main w-fit text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        type="submit"
                      >
                        {isSubmitting ? (
                          <div className="mr-4">
                            <InfinitySpin width="70" color="#1e90ff" />
                          </div>
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
      {/* {pendingVerification && (
        <form onSubmit={onPressVerify} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <MdCircle size={50} color="#C4C4C4" />
            <h2 className="text-2xl font-extrabold text-dark-700">
              Complete Your Account
            </h2>
            <h2 className="text-base font-bold text-primary-600">
              Professional Information (3/3)
            </h2>
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
                className="custome-input"
                // className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="font-main w-fit text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:text-dark-200"
              // className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Verification Code
            </Button>
          </div>
        </form>
      )} */}
      {pendingVerification && (
        <div>
          <h2 className="text-2xl text-center font-extrabold text-dark-700 mb-5">
            Verify Your Account
          </h2>

          <Formik
            initialValues={codeInitial}
            onSubmit={onPressVerify}
            validationSchema={codeValidation}
          >
            {({ isValid, isSubmitting }) => (
              <Form className="my-8 space-y-6" action="#" method="POST">
                <Input
                  name="code"
                  type="text"
                  autoComplete="off"
                  placeholder="Verification Code"
                  label="Enter the Verification code sent to your Email."
                />
                <div className="py-4">
                  {error && <p className="text-xs text-red-600">{error}</p>}
                </div>
                <Button
                  disabled={!isValid || isSubmitting}
                  className={`font-main w-full text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                                ${
                                  true
                                    ? "disabled:bg-gray-300 disabled:text-dark-200"
                                    : ""
                                }`}
                  type="submit"
                >
                  {isSubmitting ? (
                    <div className="mr-4">
                      <InfinitySpin width="70" color="#1e90ff" />
                    </div>
                  ) : (
                    "Submit Verification Code"
                  )}
                </Button>
                {/* {error && <p className="text-xs text-red-600">{error}</p>} */}
              </Form>
            )}
          </Formik>
        </div>
      )}
    </Container>
  );
};

export default AdditionalInfo;
