"use client"
import Image from "next/image";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUserStore from "@/store/userStore";
import client from "@/graphql/apollo-client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries/userQueries";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form";
import { useState } from "react";

import 'react-phone-number-input/style.css'
import FormButton from "@/components/shared/FormButton";
import CustomFormField from "@/components/shared/CustomeFormField";
import { FormFieldTypes } from "@/types/types";
import { PhoneNumber } from "react-phone-number-input";

export const ContantInfoSchema = z
  .object({
    Password: z
      .string()
      .min(8, { message: "*Password must be at least 8 characters" })
      .max(20, { message: "*Password must be at most 20 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/, {
        message:
          "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
      })
      .nonempty({ message: "*Password is required!" }),

    // confirmPassword: z
    //   .string()
    //   .nonempty({ message: "*Confirm password is required!" }),

    Email: z
      .string()
      .email({ message: "Invalid email" })
      .nonempty({ message: "*Email is required!" }),

    Address: z
      .string()
      .nonempty({ message: "*Address is required" }),

    PhoneNumber: z
      .string()
      .regex(/^\+251[79]\d{8}$|^(07|09)\d{8}$/, {
        message: "*Invalid Ethiopian phone number",
      })
      .nonempty({ message: "*Phone number is required" }),
  })
// refine((data) => data.password === data.confirmPassword, {
//   message: "*Passwords must match",
//   path: ["confirmPassword"], // The error will appear under `confirmPassword`
// });

const ContactInfo = ({
  onNext,
  onBack,
  user
}: {
  onNext: () => void;
  onBack: () => void;
  user?: any
}) => {
  console.log(user)
  const setUserInformation = useUserStore((state) => state.setUserInformation);
  const [error, setError] = useState<string | null>()
  const [emailChecking, setEmailChecking] = useState(false)
  const [storedValues, setStoredValues] = useLocalStorage(
    "patient_contactInfo",
    {
      Email: user ? user.Email : "",
      PhoneNumber: "",
      Address: "",
    }
  );

  const form = useForm<z.infer<typeof ContantInfoSchema>>({
    resolver: zodResolver(ContantInfoSchema),
    defaultValues: {
      Email: user ? user.Email : "",
      Password: "",
      // confirmPassword: "",
      PhoneNumber: storedValues.PhoneNumber ? storedValues.PhoneNumber : "",
      Address: storedValues.Address ? storedValues.Address : "",
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log("additional infor loadeds")
    try {
      const { password, ...valuesWithoutPassword } = values;

      const { data, loading } = await client.query({
        query: GET_USER_BY_EMAIL,
        variables: {
          Email: values.Email
        }

      })
      console.log(data)
      setEmailChecking(loading)

      if (data?.GetUserByEmail && data.GetUserByEmail.Email && !data.GetUserByEmail.isSocialAccount) {
        setError("Email already registered. please use different email Address")
        return
      }

      setUserInformation(values);

      setTimeout(() => {
        setStoredValues(valuesWithoutPassword);
        setIsSubmitting(false);
        onNext();
      }, 1000);

    } catch (error) {
      console.log(error)

    }

  };

  return (
    <div className="mt-5 flex flex-col lg:flex-row items-center justify-center lg:space-x-8   p-4">
      <div className="min-w-[50%] w-full  lg:w-auto border rounded-lg p-8 ">
        <h2 className="text-base font-bold text-primary-600">
          Contact Information
        </h2>
        <Form  {...form}>
          <form className="w-full mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)} method="POST">
            {error && <p className="text-red-500 font-medium text-md">{error}</p>}
            <CustomFormField
              control={form.control}
              label="Email"
              name="Email"
              placeholder="Enter your email Address"
              fieldType={FormFieldTypes.INPUT}
              className="w-full md:w-[75%]"
            />

            <CustomFormField
              control={form.control}
              label="Password"
              name="Password"
              placeholder="Enter new password"
              fieldType={FormFieldTypes.PASSWORD}
              className="w-full md:w-[75%]"
            />

            {/* Password */}
            {/* <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-800 text-md font-medium">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="password" placeholder="Enter your password" className="shad-input  " {...field} />
                        <button type="button" className="absolute top-1/4 right-1 text-gray-700 z-10" >
                          <EyeOff />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

            <CustomFormField
              control={form.control}
              label="PhoneNumber Number"
              name="PhoneNumber"
              fieldType={FormFieldTypes.PHONE_INPUT}
              className="w-full md:w-[75%]"
            />

            {/* Address */}
            <CustomFormField
              control={form.control}
              label="Address"
              name="Address"
              placeholder="Enter your Address"
              fieldType={FormFieldTypes.INPUT}
              className="w-full md:w-[75%]"
            />

            <FormButton Next="Next" onBack={onBack} disabled={isSubmitting || emailChecking} />
          </form>
        </Form>
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
  );
};

export default ContactInfo;
