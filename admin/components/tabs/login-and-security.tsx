"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Formik, Form } from "formik";
import { validatePassEditInfo } from "@/utils/validationSchema";
import { useToast } from "@/components/ui/use-toast";
import { UPDATE_PASSWORD } from "@/graphql/mutations/userMutations";
import { useMutation } from "@apollo/client";
import useAuth from "@/hooks/useAuth";
import Loading from "@/common/Loader/Loading";

const LoginAndSecurity = ({ value }: { value: string }) => {
  const { user, isLoaded } = useAuth();
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  const { toast } = useToast();

  if (!isLoaded || !user) {
    return (
      <div className="w-full flex items-center justify-center p-6">
        <Loading />
      </div>
    );
  }

  const passInititalValues = {
    previousPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handlePasswordSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    setSubmitting(true);
    try {
      const { data } = await updatePassword({
        variables: {
          UserID: user?.UserID,
          CurrentPassword: values.previousPassword,
          NewPassword: values.newPassword,
        },
      });

      toast({
        title: "Success",
        description: "Password updated successfully!",
        // variant: "success",
      });
      resetForm();
    } catch (error : any) {
      toast({
        title: "Error",
        description:  error.message || "Failed to update password. Please try again.",
        // variant: "error",
      });
    }
    setSubmitting(false);
  };

  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <span className="text-primary-700 font-medium">Password</span>
          <hr />
        </CardHeader>
        <CardContent className="">
          <Formik
            initialValues={passInititalValues}
            onSubmit={handlePasswordSubmit}
            validationSchema={validatePassEditInfo}
          >
            {({ isValid, isSubmitting }) => (
              <Form className="space-y-6" action="#" method="POST">
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  <Input
                    label="Current Password"
                    name="previousPassword"
                    type="password"
                  />
                  <Input
                    label="New Password"
                    name="newPassword"
                    type="password"
                  />
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />
                </div>

                <Button disabled={!isValid} type="submit">
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    ""
                  )}{" "}
                  Save password
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default LoginAndSecurity;
