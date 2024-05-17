import Container from "@/components/container/container";
import { Formik, Form } from "formik";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import * as Yup from "yup";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ContactInfo = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "*Password must be at least 8 characters")
      .max(20, "*Password must be at most 20 characters")
      .required("*Password is required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      ),
    email: Yup.string().email("Invalid email").required("*Email is required!"),
    address: Yup.string().required("*Address is required"),
    phone: Yup.string()
      .matches(
        /^\+251[79]\d{8}$|^(07|09)\d{8}$/,
        "*Invalid Ethiopian phone number"
      )
      .required("*Phone number is required"),
  });

  const [storedValues, setStoredValues] = useState<any>(() => {
    const storedBasicInfo = localStorage.getItem("patient_contactInfo");
    return storedBasicInfo
      ? JSON.parse(storedBasicInfo)
      : {
          email: "",
          password: "",
          phone: "",
          address: "",
        };
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    localStorage.setItem("patient_contactInfo", JSON.stringify(values));
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
            Contact Information (2/3)
          </h2>
          <Formik
            initialValues={storedValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isValid, isSubmitting }) => (
              <Form className="mt-8 space-y-6" action="#" method="POST">
                <div className="">
                  {/* Email */}
                  <div className="">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      label="Email"
                    />
                  </div>
                  {/* Password */}
                  <div className="mt-3">
                    <Input
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      label="Password"
                    />
                  </div>
                  {/* Phone Number */}
                  <div className="mt-3">
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Enter Phone"
                      label="Phone Number"
                    />
                  </div>
                  {/* Address */}
                  <div className="mt-3">
                    <Input
                      name="address"
                      type="text"
                      placeholder="Enter Address"
                      label="Address"
                    />
                  </div>
                </div>
                <div className="space_buttons">
                  <div>
                    <Button variant={"outline"} type="button" onClick={onBack}>
                      Back
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
            src="/image/contact_information.svg"
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

export default ContactInfo;