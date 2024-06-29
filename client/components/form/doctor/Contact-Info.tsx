"use client";

import Container from "@/components/container/container";
import { Formik, Form } from "formik";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLocalStorage from "@/hooks/useLocalStorage";
import { validationSchemaContInfo } from "@/utils/validationSchema";
import { Loader2 } from "lucide-react";
import useUserStore from "@/store/userStore";
import client from "@/graphql/apollo-client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries/userQueries";
import { useState } from "react";


const ContactInfoForm = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const setUserInformation = useUserStore((state) => state.setUserInformation);
  const [emailChecking, setEmailChecking] = useState(false)
  const [error, setError] = useState<string | null>()
  const [storedValues, setStoredValues] = useLocalStorage("contactInfo", {
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    console.log("additional infor loadeds")
    // Removing the password from local storage
    try {
      const { password, ...valuesWithoutPassword } = values;

      const { data, loading } = await client.query({
        query: GET_USER_BY_EMAIL,
        variables: {
          Email: values.email
        }

      })
      setEmailChecking(loading)

      if (data.GetUserByEmail) {
        setError("Email already registered. please use different email address")
        client.clearStore()
        return
      }

      setUserInformation(values);

      setTimeout(() => {
        setStoredValues(valuesWithoutPassword);
        setSubmitting(false);
        onNext();
      }, 1000);

    } catch (error) {

    }
    // Removing the password from local storage
    // const { password, ...valuesWithoutPassword } = values;

    // // setting the values into the store
    // setUserInformation(values);

    // setTimeout(() => {
    //   setStoredValues(valuesWithoutPassword);
    //   setSubmitting(false);
    //   onNext();
    // }, 1000);
  };

  return (
    <Container>
      <div className="custom-container flex flex-col lg:flex-row items-center justify-center lg:space-x-8">
        <div className="lg:w-1/2">
          <MdCircle size={50} color="#C4C4C4" />
          <h2 className="text-2xl font-extrabold text-dark-700 dark:text-slate-50">
            Create Your Account
          </h2>
          <h2 className="text-base font-bold text-primary-600">
            Contact Information (2/3)
          </h2>
          <Formik
            initialValues={storedValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchemaContInfo}
            enableReinitialize
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
                    {error && <p className="text-red-600 text-sm">
                      {error}
                    </p>}
                  </div>
                  {/* Password */}
                  <div className="mt-3">
                    <Input
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      autoComplete="on"
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
                    <Button type="button" variant={"outline"} onClick={onBack}>
                      Back
                    </Button>
                  </div>
                  <div>
                    <Button type="submit">
                      {isSubmitting || emailChecking ? (
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

export default ContactInfoForm;
