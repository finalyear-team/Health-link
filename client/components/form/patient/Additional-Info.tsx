import Container from "@/components/container/container";
import { Formik, Form } from "formik";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validationSchemaAgreeToTerms } from "@/utils/validationSchema";
import VerifyAccount from "@/components/layout/VerifyAccount";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSubmit } from "@/hooks/useSubmit";
import { Loader2 } from "lucide-react";

const AdditionalInfo = ({ onBack }: { onBack: () => void }) => {
  const [storedValues, setStoredValues] = useLocalStorage(
    "patient_additionalInfo",
    {
      agreedToTerms: true,
    }
  );



  const {
    handleSubmit,
    error: submitError,
    pendingVerification,
    completed,
  } = useSubmit(setStoredValues, "patient");

  return (
    <Container>
      {!pendingVerification && (
        <div className="custom-container flex items-center justify-center flex-wrap space-x-5 my-8">
          <div className="w-1/3">
            <MdCircle size={50} color="#C4C4C4" />
            <h2 className="text-2xl font-extrabold text-dark-700 dark:text-slate-50">
              Complete Your Account
            </h2>
            <h2 className="text-base font-bold text-primary-600">
              Professional Information (3/3)
            </h2>
            <Formik
              initialValues={storedValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchemaAgreeToTerms}
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
                      {submitError && (
                        <p className="text-xs text-red-600">{submitError}</p>
                      )}
                    </div>
                  </div>
                  <div className="space_buttons">
                    <div>
                      <Button
                        variant={"outline"}
                        type="button"
                        onClick={onBack}
                      >
                        Back
                      </Button>
                    </div>
                    <div>
                      <Button
                        disabled={!isValid || isSubmitting || completed}
                        type="submit"
                      >
                        {isSubmitting || completed ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          ""
                        )}{" "}
                        Finish
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

      {pendingVerification && <VerifyAccount error={submitError} />}
    </Container>
  );
};

export default AdditionalInfo;
