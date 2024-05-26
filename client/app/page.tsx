"use client";

import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdOutlineSearch, MdOutlineArrowForward } from "react-icons/md";
import Features from "@/components/Landing-common/Features";
import features from "@/public/data/feature";
import TopDoctors from "@/components/Landing-common/TopDoctors";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import users from "@/public/data/users";

export default function Home() {
  // const SearchProfile = Yup.object().shape({
  //   FirstName: Yup.string().required("Email is required!"),
  //   LastName: Yup.string().required("Password is required!"),
  // });

  const filteredUsers = users.slice(0, 6);
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
        <div>
          <Image
            src="/image/bg.jpg"
            alt="Front-page_doctor"
            width={400}
            height={400}
            priority
            className="w-full h-full object-cover object-center filter blur-sm mt-10"
          />
        </div>
        <div className="absolute left-5 font-main" style={{ top: "10%" }}>
          <div className="text-2xl md:text-4xl lg:text-6xl text-secondary-600 font-bold">
            Your Bridge to Health
          </div>
          <div className="text-md sm:text-lg md:text-xl lg:text-4xl font-bold text-primary-600 mt-4 ">
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
                    <Button size="lg" type="submit">
                      {isSubmitting ? "Submitting..." : "Search My Profile  "}
                      <MdOutlineSearch className="mr-l h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="pt-1">
            <Button type="submit" size="lg" variant={"secondary"}>
              <Link
                href={"/sign-up/doctor"}
                className="flex items-center justify-center"
              >
                Are You A Doctor
                <MdOutlineArrowForward className="mr-l h-4 w-4" />{" "}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 
     <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row mt-10 rounded-lg bg-dark-700 bg-opacity-10">
      //  right side content
        <div className="lg:w-3/4 lg:pr-8 ">
          <Image
            src="/image/bg1.jpg"
            alt="bg"
            className="rounded-lg auto shadow-lg"
            width={500}
            height={400}
            priority
          />
        </div>
        //  Left side content 
        <div className="lg:w-1/2 lg:pr-8 flex flex-col justify-center">
          <h1 className="text-6xl font-bold mb-4 text-secondary-700">
            Your bridge to health
          </h1>
          <div className="text-xl sm:text-xl md:text-2xl lg:text-4xl font-bold text-primary-600 ">
            Where Care Meets Convenience
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            // validationSchema={SearchProfile}
          >
            {({ isValid, isSubmitting }) => (
              <Form className="mt-1 space-y-6" action="#" method="POST">
                <div className="flex flex-col mb-4">
                  <div className="flex items-center  gap-2 mb-2">
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
                    <Button size="lg" type="submit">
                      Search My Profile
                      <MdOutlineSearch className="mr-l h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="w-full flex items-center">
            <Button type="submit" size="lg" variant={"secondary"} className="glow">
              <Link
                href={"/sign-up/doctor"}
                className="flex items-center justify-center"
              >
                Are You A Doctor
                <MdOutlineArrowForward className="mr-l h-4 w-4" />{" "}
              </Link>
            </Button>
          </div>
        </div>
      </div>
*/}

      {/* features */}
      <div>
        <div className="font-main font-bold text-slate-900 dark:text-slate-50 text-center text-3xl mt-5">
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
        <div className="font-main font-bold text-dark-700 dark:text-slate-50 text-center text-3xl mt-5">
          Our Top Doctors
        </div>
        <TopDoctors items={filteredUsers} />
      </div>
      <Footer />
    </div>
  );
}
