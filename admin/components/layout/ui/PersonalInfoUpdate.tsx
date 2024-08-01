import React from "react";
import { Formik, Form } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { validatePersEditInfo } from "@/utils/validationSchema";
import { useToast } from "@/components/ui/use-toast";
import { CardContent } from "@/components/ui/card";
import { UPDATE_USER } from "@/graphql/mutations/userMutations";
import { GET_USER } from "@/graphql/queries/userQueries";
import { useMutation } from "@apollo/client";
import useAuth from "@/hooks/useAuth";
import Loading from "@/common/Loader/Loading";

const PersonalInfoUpdate = () => {
  const { user, isLoaded } = useAuth();
  const [updateUser] = useMutation(UPDATE_USER);

  const { toast } = useToast();

  if (!isLoaded || !user) {
    return (
      <div className="w-full flex items-center justify-center p-6">
        <Loading />
      </div>
    );
  }

  const initialValues = {
    firstName: user?.FirstName,
    lastName: user?.LastName,
    userName: user?.Username,
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);

    await updateUser({
      variables: {
        updateUserInput: {
          UserID: user?.UserID,
          FirstName: values.firstName,
          LastName: values.lastName,
          Username: values.userName,
        },
      },
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your information has been updated successfully",
        });
      })
      .catch((error) => {
        console.error("Error updating profile picture:", error);
        toast({
          title: "Failed",
          description: "Failed to update Your information, try again!",
        });
      });
    setSubmitting(false);
  };

  return (
    <CardContent className="space-y-2">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validatePersEditInfo}
      >
        {({ isValid, isSubmitting, resetForm }) => (
          <Form className="space-y-6">
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
