import React from "react";
import { Formik, Form } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { validatePersEditInfo } from "@/utils/validationSchema";
import { useToast } from "@/components/ui/use-toast";
import { CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations/userMutations";

const PersonalInfoUpdate = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER)
  console.log(user)

  const initialValues = {
    firstName: user?.FirstName,
    lastName: user?.LastName,
    userName: user?.Username,
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await updateUser({
        variables: {
          updateUserInput: {
            UserID: user?.UserID,
            FirstName: values.firstName,
            LastName: values.lastName,
            Username: values.userName
          }
        }
      })

      toast({
        title: "Information Updated",
        variant: "success",
        description: "Your information has been updated successfully",
      });
      setSubmitting(false);
    } catch (error) {
      toast({
        title: "Information Updated",
        variant: "error",
        description: "Failed to update",
      });
      setSubmitting(false);


    }

    // await user?.update({
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    // });

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
              {isSubmitting || loading ? (
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
