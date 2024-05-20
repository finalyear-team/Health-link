// import Container from "@/components/container/container";
// import { Formik, Form } from "formik";
// import { MdCircle } from "react-icons/md";
// import Image from "next/image";
// import * as Yup from "yup";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const ContactInfoForm = ({
//   onNext,
//   onBack,
// }: {
//   onNext: () => void;
//   onBack: () => void;
// }) => {
//   const validationSchema = Yup.object().shape({
//     password: Yup.string()
//       .min(8, "*Password must be at least 8 characters")
//       .max(20, "*Password must be at most 20 characters")
//       .required("*Password is required!")
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
//         "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
//       ),
//     email: Yup.string().email("Invalid email").required("*Email is required!"),
//     address: Yup.string().required("*Address is required"),
//     phone: Yup.string()
//       .matches(
//         /^\+251[79]\d{8}$|^(07|09)\d{8}$/,
//         "*Invalid Ethiopian phone number"
//       )
//       .required("*Phone number is required"),
//   });

//   const [storedValues, setStoredValues] = useState<any>(() => {
//     const storedBasicInfo = localStorage.getItem("contactInfo");
//     return storedBasicInfo
//       ? JSON.parse(storedBasicInfo)
//       : {
//           email: "",
//           password: "",
//           phone: "",
//           address: "",
//         };
//   });

//   const handleSubmit = (values: any, { setSubmitting }: any) => {
//     localStorage.setItem("contactInfo", JSON.stringify(values));
//     setSubmitting(false);
//     onNext();
//   };

//   return (
//     <Container>
//       <div className="custom-container flex items-center justify-center flex-wrap space-x-5 my-8">
//         <div>
//           <MdCircle size={50} color="#C4C4C4" />
//           <h2 className="text-2xl font-extrabold text-dark-700">
//             Create Your Account
//           </h2>
//           <h2 className="text-base font-bold text-primary-600">
//             Contact Information (2/3)
//           </h2>
//           <Formik
//             initialValues={storedValues}
//             onSubmit={handleSubmit}
//             validationSchema={validationSchema}
//           >
//             {({ isValid, isSubmitting }) => (
//               <Form className="mt-8 space-y-6" action="#" method="POST">
//                 <div className="">
//                   {/* Email */}
//                   <div className="">
//                     <Input
//                       name="email"
//                       type="email"
//                       placeholder="Enter Email"
//                       label="Email"
//                     />
//                   </div>
//                   {/* Password */}
//                   <div className="mt-3">
//                     <Input
//                       name="password"
//                       type="password"
//                       placeholder="Enter Password"
//                       autoComplete="on"
//                       label="Password"
//                     />
//                   </div>
//                   {/* Phone Number */}
//                   <div className="mt-3">
//                     <Input
//                       name="phone"
//                       type="tel"
//                       placeholder="Enter Phone"
//                       label="Phone Number"
//                     />
//                   </div>
//                   {/* Address */}
//                   <div className="mt-3">
//                     <Input
//                       name="address"
//                       type="text"
//                       placeholder="Enter Address"
//                       label="Address"
//                     />
//                   </div>
//                 </div>
//                 <div className="space_buttons">
//                   <div>
//                     <Button
//                       // className="font-main w-fit text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//                       type="button"
//                       variant={"outline"}
//                       onClick={onBack}
//                     >
//                       Back
//                     </Button>
//                   </div>
//                   <div>
//                     <Button
//                       disabled={!isValid}
//                       // className="font-main w-fit text-base font-semibold rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//                       type="submit"
//                     >
//                       {isSubmitting ? "Submitting..." : "Next"}
//                     </Button>
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//         <div>
//           <Image
//             src="/image/contact_information.svg"
//             alt="right-side"
//             width={300}
//             height={300}
//             className="auto"
//           />
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default ContactInfoForm;

import Container from "@/components/container/container";
import { Formik, Form } from "formik";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLocalStorage from "@/hooks/useLocalStorage";
import { validationSchemaContInfo } from "@/utils/validationSchema";
import { Loader2 } from "lucide-react";

const ContactInfoForm = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const [storedValues, setStoredValues] = useLocalStorage("contactInfo", {
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
      setStoredValues(values);
      setSubmitting(false);
      onNext();
    }, 1000);
  };

  return (
    <Container>
      <div className="custom-container flex flex-col lg:flex-row items-center justify-center lg:space-x-8">
        <div className="lg:w-1/2">
          <MdCircle size={50} color="#C4C4C4" />
          <h2 className="text-2xl font-extrabold text-dark-700 dark:text-slate-50">
            Create Your Account
          </h2>
          <h2 className="text-base font-bold text-primary-600">
            Contact Information (2/3)
          </h2>
          <Formik
            initialValues={storedValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchemaContInfo}
            enableReinitialize
          >
            {({ isValid, isSubmitting }) => (
              <Form className="mt-8 space-y-6" action="#" method="POST">
                <div className="">
                  {/* Email */}
                  <div className="">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      label="Email"
                    />
                  </div>
                  {/* Password */}
                  <div className="mt-3">
                    <Input
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      autoComplete="on"
                      label="Password"
                    />
                  </div>
                  {/* Phone Number */}
                  <div className="mt-3">
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Enter Phone"
                      label="Phone Number"
                    />
                  </div>
                  {/* Address */}
                  <div className="mt-3">
                    <Input
                      name="address"
                      type="text"
                      placeholder="Enter Address"
                      label="Address"
                    />
                  </div>
                </div>
                <div className="space_buttons">
                  <div>
                    <Button type="button" variant={"outline"} onClick={onBack}>
                      Back
                    </Button>
                  </div>
                  <div>
                    <Button disabled={!isValid} type="submit">
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        ''
                      )}{" "}
                      Next
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="/image/contact_information.svg"
            alt="right-side"
            width={300}
            height={300}
            className="auto"
          />
        </div>
      </div>
    </Container>
  );
};

export default ContactInfoForm;
