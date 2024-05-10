import Container from "../../container";
import Input from "../../Input";
import Button from "../../Button";
import { Formik, Form } from "formik";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdditionalInfo = ({ onBack }: { onBack: () => void }) => {
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

  const [storedValues, setStoredValues] = useState<any>(() => {
    const storedBasicInfo = localStorage.getItem("patient_additionalInfo");
    return storedBasicInfo
      ? JSON.parse(storedBasicInfo)
      : {
          agreedToTerms: true,
        };
  });

  const router = useRouter();
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    localStorage.setItem("patient_additionalInfo", JSON.stringify(values));

    const item1 = localStorage.getItem("patient_personalInfo");
    const item2 = localStorage.getItem("patient_contactInfo");
    const item3 = localStorage.getItem("patient_additionalInfo");

    console.log(item1, item2, item3);

    localStorage.removeItem("patient_personalInfo");
    localStorage.removeItem("patient_contactInfo");
    localStorage.removeItem("patient_additionalInfo");

    setSubmitting(false);
    router.push("/dashboard/patient");
    // onFinish();
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
                      className="font-main w-fit text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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

export default AdditionalInfo;
