import Container from "../../container";
import Input from "../../Input";
import Button from "../../Button";
import { Formik, Form } from "formik";
import validationSchema from "@/utils/validationSchema";
import GenderSelect from "@/component/genderSelect/genderSelect";
import { MdCircle } from "react-icons/md";
import Image from "next/image";

const ContactInfoForm = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const LoginSchema = validationSchema;

  const initialValues = {
    email: "",
    password: "",
    phone: "",
    address: "",
  };

  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    values.preventDefault();
    // Store values in global state or context
    console.log("Form values:", values);
    setSubmitting(false);
    resetForm();
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
            Contact Information
          </h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={LoginSchema}
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
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ContactInfoForm;