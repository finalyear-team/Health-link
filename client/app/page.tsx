"use client";

// import Image from "next/image";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { MdOutlineSearch, MdOutlineArrowForward } from "react-icons/md";
// import Features from "@/components/Landing-common/Features";
// import features from "@/public/data/feature";
// import TopDoctors from "@/components/Landing-common/TopDoctors";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import Link from "next/link";
// import users from "@/public/data/users";

// export default function Home() {
//   // const SearchProfile = Yup.object().shape({
//   //   FirstName: Yup.string().required("Email is required!"),
//   //   LastName: Yup.string().required("Password is required!"),
//   // });

//   const filteredUsers = users.slice(0, 6);
//   //initializing the value
//   const initialValues = {
//     FirstName: "",
//     LastName: "",
//   };

//   // handilng the submit
//   const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
//     console.log("Form values:", values);
//     setSubmitting(false);
//     resetForm();
//   };

//   return (
//     <div>
//       <Header />
//       <div className="relative w-full">
//         <div>
//           <Image
//             src="/image/bg.jpg"
//             alt="Front-page_doctor"
//             width={400}
//             height={400}
//             priority
//             className="w-full h-full object-cover object-center filter blur-sm mt-10"
//           />
//         </div>
//         <div className="absolute left-5 font-main" style={{ top: "10%" }}>
//           <div className="text-2xl md:text-4xl lg:text-6xl text-secondary-600 font-bold">
//             Your Bridge to Health
//           </div>
//           <div className="text-md sm:text-lg md:text-xl lg:text-4xl font-bold text-primary-600 mt-4 ">
//             Where Care Meets Convenience
//           </div>
//           <Formik
//             initialValues={initialValues}
//             onSubmit={handleSubmit}
//             // validationSchema={SearchProfile}
//           >
//             {({ isValid, isSubmitting }) => (
//               <Form className="mt-1 space-y-6" action="#" method="POST">
//                 <div className="flex flex-wrap items-center text-base space-y-1 space-x-1">
//                   <div className="flex items-center justify-center space-x-1">
//                     <div className="">
//                       <Input
//                         name="FirstName"
//                         type="text"
//                         placeholder="First Name"
//                       />
//                     </div>
//                     <div className="">
//                       <Input
//                         name="LastName"
//                         type="text"
//                         placeholder="Last Name"
//                       />
//                     </div>
//                   </div>
//                   <div className="">
//                     <Button size="lg" type="submit">
//                       {isSubmitting ? "Submitting..." : "Search My Profile  "}
//                       <MdOutlineSearch className="mr-l h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//           <div className="pt-1">
//             <Button type="submit" size="lg" variant={"secondary"}>
//               <Link
//                 href={"/sign-up/doctor"}
//                 className="flex items-center justify-center"
//               >
//                 Are You A Doctor
//                 <MdOutlineArrowForward className="mr-l h-4 w-4" />{" "}
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* features */}
//       <div>
//         <div className="font-main font-bold text-slate-900 dark:text-slate-50 text-center text-3xl mt-5">
//           Insights to Our Features
//         </div>
//         <div className="flex flex-wrap justify-center mt-3">
//           {features.map(
//             (
//               feature: {
//                 title: string;
//                 description: string;
//                 icon: string;
//               },
//               index
//             ) => (
//               <Features
//                 key={index}
//                 title={feature.title}
//                 description={feature.description}
//                 icon={feature.icon}
//               />
//             )
//           )}
//         </div>
//       </div>
//       {/* Top Doctors */}
//       <div>
//         <div className="font-main font-bold text-dark-700 dark:text-slate-50 text-center text-3xl mt-5">
//           Our Top Doctors
//         </div>
//         <TopDoctors items={filteredUsers} />
//       </div>
//       <Footer />
//     </div>
//   );
// }

import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import users from "@/public/data/users";
import { Activity, Lightbulb, Quote, Tags } from "lucide-react";
import Features from "@/components/Landing-common/Features";
import features from "@/public/data/feature";
import Footer from "@/components/layout/Footer";
import TopDoctors from "@/components/Landing-common/TopDoctors";

const Home = () => {
  const filteredUsers = users.slice(0, 6);
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        {/* front-page */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
          <Image
            src="/image/bg.jpg"
            alt="Doctor consulting patient via video call"
            width={400}
            height={400}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary-foreground">
                    Connecting You to Quality Healthcare, Anytime, Anywhere
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    HealthLink is a cutting-edge telemedicine service that
                    provides 24/7 access to top doctors for all your medical
                    needs.
                  </p>
                </div>
                <Link
                  href="/sign-up/patient"
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Button>Get Started Now</Button>
                </Link>
                <Link
                  href="/sign-up/doctor"
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Button variant={"secondary"}>Are You Doctor?</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* features */}
        <section className="w-full py-6 ">
          <div className="w-full flex items-center justify-center text-2xl font-bold text-center px-3 text-primary-600 dark:text-primary-700 sticky top-11 bg-slate-800">
            <Activity className="w-6 h-6 mr-2" /> HealthLink
          </div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex flex-col items-center justify-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-foreground">
                  Revolutionizing Healthcare, One Consultation at a Time
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  HealthLink is a cutting-edge telemedicine service that
                  provides 24/7 access to top doctors for all your medical
                  needs. From general consultations to mental health support and
                  chronic disease management, we&apos;re here to help you
                  achieve your best health.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12 ">
              <Image
                src="/image/work.svg"
                alt="How HealthLink Works"
                width={100}
                height={100}
                className="mx-auto rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="z-0 flex flex-col justify-center space-y-4 border-l border-primary-700 dark:border-slate-50">
                <ul className="ml-3 grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-primary-600 dark:text-primary-700">
                        Sign Up or Log In
                      </h3>
                      <p className="text-muted-foreground">
                        Create an account or log in to access our secure
                        telemedicine platform.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-primary-600 dark:text-primary-700">
                        Choose a Doctor
                      </h3>
                      <p className="text-muted-foreground">
                        Browse our directory of top doctors and select the one
                        that best fits your needs.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-primary-600 dark:text-primary-700">
                        Start Your Consultation
                      </h3>
                      <p className="text-muted-foreground">
                        Connect with your doctor via secure video call and
                        discuss your health concerns.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-primary-600 dark:text-primary-700">
                        Receive Your Treatment Plan
                      </h3>
                      <p className="text-muted-foreground">
                        Get a personalized treatment plan, including any
                        necessary prescriptions, and start your path to better
                        health.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* our services */}
        <section className="w-full py-6 ">
          <div className="w-full flex items-center justify-center mb-2 text-2xl font-bold text-center px-3 text-primary-600 dark:text-primary-700 sticky top-11 bg-slate-800">
            <Lightbulb className="w-6 h-6 mr-2" /> Features
          </div>
          <div className="container px-4 md:px-6">
            <div className="space-y-2 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-foreground">
                Comprehensive Medical Care at Your Fingertips
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                HealthLink offers a wide range of medical services to meet all
                your healthcare needs, from general consultations to mental
                health support and chronic disease management.
              </p>
            </div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <Card className="bg-muted p-6 rounded-xl">
                <CardHeader>
                  <Hospital className="h-8 w-8 text-primary-600 dark:text-primary-700" />
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold text-primary-foreground">
                    General Consultations
                  </h3>
                  <p className="text-muted-foreground">
                    Get prompt, high-quality care for a wide range of
                    non-emergency medical conditions.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted p-6 rounded-xl">
                <CardHeader>
                  <Brain className="h-8 w-8 text-primary" />
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold text-primary-foreground">
                    Mental Health Support
                  </h3>
                  <p className="text-muted-foreground">
                    Access licensed therapists and counselors for your emotional
                    well-being.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted p-6 rounded-xl">
                <CardHeader>
                  <Hospital className="h-8 w-8 text-primary-600 dark:text-primary-700" />
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold text-primary-foreground">
                    Chronic Disease Management
                  </h3>
                  <p className="text-muted-foreground">
                    Get personalized care and support for managing long-term
                    health conditions.
                  </p>
                </CardContent>
              </Card>
            </div> */}
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
        </section>

        {/* Testimonials */}
        <section className="w-full py-6">
          <div className="w-full flex items-center justify-center mb-2 text-2xl font-bold text-center px-3 text-primary-600 dark:text-primary-700 sticky top-11 bg-slate-800">
            <Quote className="w-6 h-6 mr-2" /> Testimonials
          </div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-foreground">
                Hear from Our Satisfied Patients
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed text-center lg:text-base/relaxed xl:text-xl/relaxed">
                Our patients rave about the convenience, quality, and
                professionalism of our telemedicine services.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <Card className="bg-background p-6 rounded-xl">
                <CardHeader>
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>P1</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground italic">
                    &quot;HealthLink has been a game-changer for me. I can now
                    access top-quality medical care from the comfort of my own
                    home. The doctors are knowledgeable and compassionate, and
                    the entire process is so convenient.&quot;
                  </blockquote>
                  <div className="mt-4 text-primary-foreground font-bold">
                    Sarah, 35
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-background p-6 rounded-xl">
                <CardHeader>
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>P2</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground italic">
                    &quot;I was hesitant to try telemedicine at first, but
                    HealthLink has completely changed my mind. The doctors are
                    just as attentive and thorough as in-person visits, and I
                    love the convenience of being able to get care on my own
                    schedule.&quot;
                  </blockquote>
                  <div className="mt-4 text-primary-foreground font-bold">
                    Michael, 42
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-background p-6 rounded-xl">
                <CardHeader>
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>P3</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground italic">
                    &quot;I&apos;ve been using HealthLink for over a year now,
                    and it&apos;s been a lifesaver. The doctors are always
                    available, the prescriptions are delivered quickly, and the
                    overall experience is just so much better than traditional
                    healthcare.&quot;
                  </blockquote>
                  <div className="mt-4 text-primary-foreground font-bold">
                    Emily, 28
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* top doctors */}
        <section className="w-full py-6">
          <div className="w-full flex items-center justify-center mb-2 text-2xl font-bold h-20 text-center px-3 text-primary-600 dark:text-primary-700 sticky top-12 bg-slate-800">
            <Tags className="w-6 h-6 mr-2" /> Our Doctors
          </div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-foreground">
                Meet Our Exceptional Doctors
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our team of highly skilled and experienced doctors are dedicated
                to providing you with the best possible care.
              </p>
            </div>
            <TopDoctors items={filteredUsers} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
