import Container from "@/components/container/container";
import { Formik, Form } from "formik";
import GenderSelect from "@/components/genderSelect/genderSelect";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLocalStorage from "@/hooks/useLocalStorage";
import { validationSchemaPersInfo } from "@/utils/validationSchema";
import { Loader2 } from "lucide-react";
import useUserStore from "@/store/userStore";

const BasicInfoForm = ({ onNext }: { onNext: () => void }) => {
  const setUserInformation = useUserStore((state) => state.setUserInformation);
  const [storedValues, setStoredValues] = useLocalStorage("personalInfo", {
    firstName: "",
    lastName: "",
    userName: "",
    DOB: "",
    gender: "",
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    // setting the values in the store
    setUserInformation(values);
    // Simulate delay for demonstration purposes
    setTimeout(() => {
      setStoredValues(values);
      setSubmitting(false);
      onNext();
    }, 1000);
  };

  return (
    <Container>
      <div className="custom-container flex flex-col lg:flex-row items-center justify-center lg:space-x-8">
        <div className="lg:w-1/2">
          <MdCircle size={50} color="#C4C4C4" />
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50">
            Create Your Account
          </h2>
          <h2 className="text-base font-bold text-primary-600">
            Personal Information (1/3)
          </h2>
          <Formik
            initialValues={storedValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchemaPersInfo}
            enableReinitialize
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
                  {/* Date of Birth */}
                  <div className="mt-3">
                    <Input
                      name="DOB"
                      type="date"
                      placeholder="Enter DOB"
                      label="Date of Birth"
                      className="text-sm placeholder-gray-400"
                    />
                  </div>
                  {/* Gender */}
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
                    <Button disabled={!isValid || isSubmitting} type="submit">
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        ""
                      )}{" "}
                      Next
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="lg:w-1/2">
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
