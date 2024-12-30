"use client"
import Container from "@/components/container/container";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import useUserStore from "@/store/userStore";
import client from "@/graphql/apollo-client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries/userQueries";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";

import PhoneInput from "react-phone-number-input"
import 'react-phone-number-input/style.css'
import { E164Number } from "libphonenumber-js/core"

export const ContantInfoSchema = z
  .object({
    password: z
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

    email: z
      .string()
      .email({ message: "Invalid email" })
      .nonempty({ message: "*Email is required!" }),

    address: z
      .string()
      .nonempty({ message: "*Address is required" }),

    phone: z
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
  const setUserInformation = useUserStore((state) => state.setUserInformation);
  const [error, setError] = useState<string | null>()
  const [emailChecking, setEmailChecking] = useState(false)
  const [storedValues, setStoredValues] = useLocalStorage(
    "patient_contactInfo",
    {
      email: user ? user.Email : "",
      password: "",
      phone: "",
      address: "",
    }
  );

  const form = useForm<z.infer<typeof ContantInfoSchema>>({
    resolver: zodResolver(ContantInfoSchema),
    defaultValues: {
      email: user ? user.Email : "",
      password: "",
      // confirmPassword: "",
      phone: "",
      address: "",
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log("additional infor loadeds")
    try {
      const { password, ...valuesWithoutPassword } = values;

      const { data, loading } = await client.query({
        query: GET_USER_BY_EMAIL,
        variables: {
          Email: values.email
        }

      })
      console.log(data)
      setEmailChecking(loading)

      if (data.GetUserByEmail) {
        setError("Email already registered. please use different email address")
        return
      }

      setUserInformation(values);

      setTimeout(() => {
        setStoredValues(valuesWithoutPassword);
        setSubmitting(false);
        onNext();
      }, 1000);

    } catch (error) {

    }
    // const { password, ...valuesWithoutPassword } = values;

    // // setting the values into the store
    // setUserInformation(values);

    // setTimeout(() => {
    //   setStoredValues(valuesWithoutPassword);
    //   setSubmitting(false);
    //   onNext();
    // }, 1000);
  };

  return (
    <div className="mt-5 flex flex-col lg:flex-row items-center justify-center lg:space-x-8   p-4">
      <div className="min-w-[50%] border rounded-lg p-8 ">
        <h2 className="text-base font-bold text-primary-600">
          Contact Information
        </h2>
        <Form  {...form}>
          <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)} method="POST">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-800 text-md font-medium">Email</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Your First name" className="shad-input w-full md:w-[75%]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex md:flex-row flex-col gap-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-gray-800 text-md font-medium">Password</FormLabel>
                    <FormControl className="">
                      <div className="relative  w-full md:w-3/4">
                        <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="shad-input  " {...field} />
                        <button type="button" className="absolute top-1/4 right-1 text-gray-700 z-10" onClick={() => setShowPassword(!showPassword)} >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-gray-800 text-md font-medium">Phone number</FormLabel>
                  <PhoneInput defaultCountry="ET"
                    placeholder={"0900000000/0700000000"}
                    onChange={field.onChange}
                    international withCountryCallingCode
                    value={field.value as E164Number | undefined}
                    className="shad-input w-full md:w-[75%] bg-white  rounded-md p-2 " />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-gray-800 text-md font-medium">Address</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Address" className="shad-input  w-full md:w-[75%] " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space_buttons">
              <div>
                <Button variant={"outline"} type="button" onClick={onBack} className="bg-slate-800 hover:bg-slate-700 text-white hover:text-white">
                  Back
                </Button>
              </div>
              <div>
                <Button disabled={isSubmitting || emailChecking} type="submit" className="border bg-white hover:bg-white text-gray-800 border-gray-600  hover:border-gray-800  ">
                  {isSubmitting || emailChecking ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    ""
                  )}{" "}
                  Next
                </Button>
              </div>
            </div>
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
