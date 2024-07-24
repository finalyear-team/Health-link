import React from "react";
import { Formik, Form } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { validateContEditInfo } from "@/utils/validationSchema";
import { useToast } from "@/components/ui/use-toast";
import { CardContent } from "@/components/ui/card";
import { UPDATE_USER } from "@/graphql/mutations/userMutations";
import { useMutation } from "@apollo/client";
import useAuth from "@/hooks/useAuth";
import Loading from "@/common/Loader/Loading";

const ContactInfoUpdate = () => {
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
    email: user?.Email,
    phone: user?.PhoneNumber,
    address: user?.Address,
  };

  // handle the update of contact information
  const handleContactSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    await updateUser({
      variables: {
        updateUserInput: {
          UserID: user?.UserID,
          Email: values.email,
          PhoneNumber: values.phone,
          Address: values.address,
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
        onSubmit={handleContactSubmit}
        validationSchema={validateContEditInfo}
      >
        {({ isValid, isSubmitting, resetForm }) => (
          <Form className="space-y-6">
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <Input label="Email" name="email" type="email" />
              <Input label="Phone Number" name="phone" type="number" />
              <Input label="Address" name="address" type="text" />
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

export default ContactInfoUpdate;
