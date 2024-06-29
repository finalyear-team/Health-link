import Container from "@/components/container/container";
import { Formik, Form } from "formik";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validationSchemaContInfo } from "@/utils/validationSchema";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Loader2 } from "lucide-react";
import useUserStore from "@/store/userStore";
import client from "@/graphql/apollo-client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries/userQueries";
import { useState } from "react";

const ContactInfo = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const setUserInformation = useUserStore((state) => state.setUserInformation);
  const [error, setError] = useState<string | null>()
  const [emailChecking, setEmailChecking] = useState(false)
  const [storedValues, setStoredValues] = useLocalStorage(
    "patient_contactInfo",
    {
      email: "",
      password: "",
      phone: "",
      address: "",
    }
  );

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
      <div className="custom-container flex items-center justify-center flex-wrap space-x-5 my-8">
        <div>
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
                      {isSubmitting ? (
                        <div>
                          <Button disabled={!isValid} type="submit">
                            {isSubmitting ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              ""
                            )}{" "}
                            Next
                          </Button>
                        </div>
                      ) : (
                        "Next"
                      )}
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
