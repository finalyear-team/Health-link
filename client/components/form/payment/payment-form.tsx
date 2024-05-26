import React from "react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import useAppointmentStore from "@/store/appointmentStore";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Formik, Form } from "formik";
import { validatePaymentInformation } from "@/utils/validationSchema";

const PaymentForm = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const selectedDoctor = useAppointmentStore((state) => state.selectedDoctor);

  const initalValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const handleSubmit = (e: any, { setSubmitting }: any) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Appointment Confirmed",
        description: `Thank you ${user?.firstName}! Your appointment with Dr. ${selectedDoctor?.name} has been successfully booked. We look forward to seeing you on [Appointment Date] at [Appointment Time].Please visit your Appointment page for details.`,
        variant: "success",
      });
      setSubmitting(false);
    }, 2000);
  };
  return (
    <div className="min-h-screen flex">
      <div className="p-6 rounded-lg w-full max-w-md">
        <h2 className="flex space-x-3 text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100">
          <CreditCard className="w-6 h-6 mr-2" /> Payment Form
        </h2>
        <Formik
          initialValues={initalValues}
          onSubmit={handleSubmit}
          validationSchema={validatePaymentInformation}
          enableReinitialize
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  label="Enter First Name"
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  label="Enter Last Name"
                />
              </div>
              <div className="mb-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  label="Enter Email"
                />
              </div>
              <div className="mb-4">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone Number"
                  label="Enter Phone Number"
                />
              </div>
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  ""
                )}
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PaymentForm;
