import React from "react";
import { Formik, Form } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { validatePersEditInfo } from "@/utils/validationSchema";
// import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { CardContent } from "@/components/ui/card";

const PersonalInfoUpdate = () => {
  // const { user } = useUser();
  const { toast } = useToast();

  const initialValues = {
    // firstName: user?.firstName,
    // lastName: user?.lastName,
    // userName: "",
    firstName: "abebe",
    lastName: "kebede",
    userName: "lala"
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    // await user?.update({
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    // });
    // toast({
    //   title: "Information Updated",
    //   variant: "success",
    //   description: "Your information has been updated successfully",
    // });
    // setSubmitting(false);
  };

  return (
    <CardContent className="space-y-2">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // validationSchema={validatePersEditInfo}
      >
        {({ isValid, isSubmitting, resetForm }) => (
          <Form className="space-y-6">
            <div className="flex space-x-5 flex-wrap">
              <Input label="First Name" name="firstName" type="text" />
              <Input label="Last Name" name="lastName" type="text" />
              <Input label="User Name" name="userName" type="text" />
            </div>

            <Button disabled={!isValid} type="submit">
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                ""
              )}
              Save info
            </Button>
            <Button className="ml-2" type="button" onClick={() => resetForm()}>
              Reset
            </Button>
          </Form>
        )}
      </Formik>
    </CardContent>
  );
};

export default PersonalInfoUpdate;
