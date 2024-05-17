"use client";

import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input, Button } from "@/component";
import { MdOutlineSearch, MdOutlineArrowForward } from "react-icons/md";
import Features from "@/component/Landing-common/Features";
import features from "@/public/data/feature";
import TopDoctors from "@/component/Landing-common/TopDoctors";
import {Header, Footer} from '@/component';
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
      <Header />
      <div className="relative w-full">
        <Image
          src="/image/bg.jpg"
          alt="Front-page_doctor"
          width={400}
          height={400}
          priority
          className="w-full h-full object-cover object-center filter blur-sm mt-10"
        />
        <div className="absolute left-5 font-main" style={{ top: "10%" }}>
          <div className="text-2xl md:text-4xl lg:text-6xl text-secondary-600 font-bold">
            Your Bridge to Health
          </div>
          <div className="text-md sm:text-lg md:text-xl lg:text-4xl font-bold text-primary-600 ">
            Where Care Meets Convenience
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            // validationSchema={SearchProfile}
          >
            {({ isValid, isSubmitting }) => (
              <Form className="mt-1 space-y-6" action="#" method="POST">
                <div className="flex flex-wrap items-center text-base space-y-1 space-x-1">
                  <div className="flex items-center justify-center space-x-1">
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
                  </div>
                  <div className="">
                    <Button
                      className="font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
          <div className="pt-1">
            <Button
              className="font-main w-fit text-base font-medium rounded text-white bg-dark-600 hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-500"
              type="submit"
            >
              Are You A Doctor
              <MdOutlineArrowForward size={25} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
      {/* features */}
      <div>
        <div className="font-main font-bold text-dark-700 text-center text-3xl mt-5">
          Insights to Our Features
        </div>
        <div className="flex flex-wrap justify-center mt-3">
          {features.map(
            (
              feature: {
                title: string;
                description: string;
                icon: string;
              },
              index
            ) => (
              <Features
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            )
          )}
        </div>
      </div>
      {/* Top Doctors */}
      <div>
        <div className="font-main font-bold text-dark-700 text-center text-3xl mt-5">
          Our Top Doctors
        </div>
        <TopDoctors />
      </div>
      <Footer />
    </div>
  );
};


