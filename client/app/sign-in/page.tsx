"use client";
import Container from "@/components/container/container";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MdCircle } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import logo from "@/public/image/brand/logo-icon.svg"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
// import { signIn } from "@/Services/authService";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";


const validationSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email"),
  password: z.string()
    .min(8, "*Password must be at least 8 characters")
    .max(20, "*Password must be at most 20 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
    ),
});

const initialValues = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  })





  const onSubmit = async (values: z.infer<typeof validationSchema>) => {

    try {
      // setIsSubmitting(true)
      // const user = await signIn(values.email, values.password)
      // if (user)
      // router.push("/dashboard");


    } catch (err: any) {
      setIsSubmitting(false)
      console.log(err)
    }

    // setSubmitting(false);
    // resetForm();
  };

  return (
    <div className="w-screen overflow-x-hidden flex h-screen  bg-white text-gray-900 max-h-screen">
      <div className="mt-10 flex-1 flex flex-col px-16 h-[calc(100vh-2.5rem)] overflow-y-auto space-y-4 hide-scrollbar">
        <div className="self-center p-4  border borde-green-500 rounded-full">
          <Image src={logo} alt="logo" width={1000} height={1000} className="w-fit" />
        </div>
        <div>
          <h2 className="mt-6 text-center  text-slate-800 text-2xl  font-extrabold">
            Sign in to HealthLink
          </h2>
        </div>

        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10   space-y-8">
            <div className="">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-lg font-normal">Email</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter Your Email" className="shad-input " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}

              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-5 ">
                    <FormLabel className="text-lg font-normal">Password</FormLabel>
                    <FormControl className="" >
                      <Input type="password" placeholder="Enter your password"  {...field} className="shad-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



            </div>

            <div className="flex items-center justify-between text-sm">
              {/* <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600  focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="font-main ml-2 block text-gray-900 dark:text-gray-100"
                    >
                      Remember me
                    </label>
                  </div> */}

              {/* <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-main font-medium text-primary-600 hover:text-primary-700"
                    >
                      Forgot your password?
                    </Link>
                  </div> */}
            </div>

            <div>
              <Button className="w-full shad-form-btn" type="submit">
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  ""
                )}{" "}
                Login
              </Button>

              <div className="text-sm mt-4 text-center">
                Don&apos;t have an account?
                <Link
                  href="/sign-up"
                  className="font-main font-medium text-primary-600 hover:text-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </Form>
        <Separator className="" />
        <Button className="w-full h-10 flex justify-center items-center gap-4  border border-gray-600 hover:border-gray-900 p-2" type="button">
          <FcGoogle className="text-2xl" />
          <p>Continue with Google</p>
        </Button>

      </div>
      <div className="hidden mt-10 lg:flex flex-col justify-center min-w-[50%]">
        lkdjflaksjdf
      </div>
    </div>
  );
};

export default LoginPage;
