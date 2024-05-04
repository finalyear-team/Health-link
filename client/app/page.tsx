"use client";

import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input, Button } from "@/component";
import { MdOutlineSearch, MdOutlineArrowForward } from "react-icons/md";
import Features from "@/component/Landing-common/Features";
export default function Home() {
  // const SearchProfile = Yup.object().shape({
  //   FirstName: Yup.string().required("Email is required!"),
  //   LastName: Yup.string().required("Password is required!"),
  // });
  //initializing the value
  const initialValues = {
    FirstName: "",
    LastName: "",
  };

  // handilng the submit
  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    console.log("Form values:", values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div>
      <div className="relative w-full">
        <Image
          src="/bg.jpg"
          alt="Front-page_doctor"
          width={400}
          height={400}
          className="w-full h-full object-cover object-center filter blur-sm"
        />
        <div className="absolute left-5 font-main" style={{ top: "17%" }}>
          <div className="text-2xl md:text-4xl lg:text-6xl text-secondary-600 font-bold  border-solid border-white border-2 p-3">
            Your Bridge to Health
          </div>
          <div className="text-lg md:text-xl lg:text-4xl p-2 font-bold text-primary-600 mt-3">
            Where Care Meets Convenience
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            // validationSchema={SearchProfile}
          >
            {({ isValid, isSubmitting }) => (
              <Form className="mt-1 space-y-6" action="#" method="POST">
                <div className="flex flex-wrap items-center justify-start lg:space-x-3 md:space-x-2 sm:space-x-1 sm:space-y-1 text-base sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                  <div className="">
                    <Input
                      name="FirstName"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="">
                    <Input
                      name="LastName"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="">
                    <Button
                      className="font-main text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      type="submit"
                    >
                      {isSubmitting ? "Submitting..." : "Search My Profile  "}
                      <MdOutlineSearch size={25} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="">
            <Button
              className="font-main text-base font-medium rounded text-white bg-dark-600 hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-500"
              type="submit"
            >
              Are You A Doctor
              <MdOutlineArrowForward size={25} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
      {/* <div>
        <Features />
      </div> */}
      
    </div>
  );
}
