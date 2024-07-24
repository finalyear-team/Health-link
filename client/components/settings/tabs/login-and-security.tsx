"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Formik, Form } from "formik";
import { validatePassEditInfo } from "@/utils/validationSchema";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import useAuth from "@/hooks/useAuth";

const LoginAndSecurity = ({ value }: { value: string }) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const passInititalValues = {
    previousPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handlePasswordSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    console.log(values);
    const currentPassword = values.previousPassword;
    const newPassword = values.newPassword;

    if (!user) return;

    try {
      await user.updatePassword({
        currentPassword,
        newPassword,
      });
      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
        variant: "success",
      });
    } catch (err) {
      console.error("Error updating password:", err);
      toast({
        title: "Error updating password",
        description: "Please check your current password and try again.",
        variant: "destructive",
      });
    }

    setSubmitting(false);
    resetForm();
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
                <div className="flex flex-wrap space-x-5">
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
