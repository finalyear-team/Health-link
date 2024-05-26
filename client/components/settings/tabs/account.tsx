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
import { Formik, Form } from "formik";
import {
  validatePersEditInfo,
  validateContEditInfo,
} from "@/utils/validationSchema";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";

const Account = ({ value }: { value: string }) => {
  const { user } = useUser();
  const { toast } = useToast();

  const personalInitialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    userName: "alexo",
  };

  const ContactInitialValues = {
    email: user?.emailAddresses,
    phone: "0901020304",
    address: "A.A",
  };

  const handlePersonalSubmit = async (values: any, { setSubmitting }: any) => {
    await user?.update({
      firstName: "John",
      lastName: "Doe",
    });
    // show toast
    toast({
      title: "Information Updated",
      variant: "success",
      description: "Your information has been updated successfully",
    });
    setSubmitting(false);
  };
  const handleContactSubmit = (values: any) => {};
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          {/* <CardTitle>Account</CardTitle> */}
          <span className="text-primary-700 font-medium">
            Personal Information
          </span>
          <hr />
        </CardHeader>
        <CardContent className="">
          <Formik
            initialValues={personalInitialValues}
            onSubmit={handlePersonalSubmit}
            validationSchema={validatePersEditInfo}
          >
            {({ isValid, isSubmitting }) => (
              <Form className="space-y-6" action="#" method="POST">
                <div className="flex items-center space-x-5">
                  <Input label="First Name" name="firstName" type="text" />
                  <Input label="Last Name" name="lastName" type="text" />
                  <Input label="User Name" name="userName" type="text" />
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
                          Save info
                        </Button>
                      </div>
                    ) : (
                      "Save info"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardHeader>
          <span className="text-primary-700 font-medium">
            Contact Information
          </span>
          <hr />
        </CardHeader>
        <CardContent className="space-y-2">
          <Formik
            initialValues={ContactInitialValues}
            onSubmit={handleContactSubmit}
            validationSchema={validateContEditInfo}
          >
            {({ isValid, isSubmitting }) => (
              <Form className="space-y-6" action="#" method="POST">
                <div className="flex items-center space-x-5">
                  <Input label="Email" name="email" type="email" />
                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    type="number"
                  />
                  <Input label="Address" name="phone" type="text" />
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
                          Save info
                        </Button>
                      </div>
                    ) : (
                      "Save info"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter>{/* <Button>Save changes</Button> */}</CardFooter>
      </Card>
    </TabsContent>
  );
};

export default Account;
