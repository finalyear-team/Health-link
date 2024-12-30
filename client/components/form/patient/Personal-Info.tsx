import Container from "@/components/container/container";
import GenderSelect from "@/components/genderSelect/genderSelect";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validationSchemaPersInfo } from "@/utils/validationSchema";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Loader2 } from "lucide-react";
import useUserStore from "@/store/userStore";
import { Gender, UserType } from "@/types/types";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";



import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const nameregex = /^[a-zA-Z]+(?:[\s'-][a-zA-Z]+)*$/

const personalInfoSchema = z.object({
  firstName: z.string().regex(nameregex, {
    message: "Invalid name"
  }).nonempty("First name is required"),
  lastName: z.string().regex(nameregex, {
    message: "Invalid name"
  }).nonempty("First name is required"),
  DOB: z.date({ message: "Date of birth is required" }).refine((value) => {
    console.log("from form", value)
    if (!value) return false; // If no value is provided
    const today = new Date();
    const birthDate = new Date(value);

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age >= 18;
  }, { message: "You must be at least 18 years old to register." }),

  gender: z.enum([Gender.FEMALE, Gender.MALE], { message: "This field is required" }),
  role: z.enum([UserType.PATIENT, UserType.DOCTOR])
});


const PersonalInfo = ({
  onNext,
  onBack,
  user
}: {
  onNext: () => void;
  onBack: () => void;
  user?: any
}) => {
  const setUserInformation = useUserStore((state) => state.setUserInformation);

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user ? user.FirstName : "",
      lastName: user ? user.LastName : "",
      DOB: new Date(),
      gender: undefined,
      role: UserType.PATIENT
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [storedValues, setStoredValues] = useLocalStorage(
    "patient_personalInfo",
    {
      firstName: user ? user.FirstName : "",
      lastName: user ? user.LastName : "",
      DOB: "",
      gender: "",
      role: UserType.PATIENT
    }
  );

  const onSubmit = async (values: z.infer<typeof personalInfoSchema>) => {

    setIsSubmitting(true)
    console.log("come on bro")
    console.log(values)
    setUserInformation(values);

    setTimeout(() => {
      setStoredValues(values);
      setIsSubmitting(false);
      onNext();
    }, 1000);

  };


  return (
    <div className="mt-5 flex flex-col lg:flex-row items-center justify-center lg:space-x-8   p-4">
      <div className="border rounded-lg p-8 ">
        <h2 className="text-base font-bold text-primary-600">
          Personal Information
        </h2>
        <h4 className="text-gray-800 text-sm font-normal">Please use your legal name for accuracy and convenience.</h4>
        <Form {...form} >

          <form className="mt-8 space-y-4 " onSubmit={form.handleSubmit(onSubmit)} >
            {/* First Name */}
            <div className="flex md:flex-row flex-col gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-800 text-md font-medium">Legal First Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter Your First name" className="shad-input " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}

              />
              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-800 text-md font-medium">Legal Last name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter Your Last name" className="shad-input  " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}

              />
            </div>
            {/* Date of Birth */}
            <FormField
              control={form.control}
              name="DOB"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-gray-800 text-md font-medium">Date of Birth</FormLabel>
                  <FormControl>
                    <DatePicker
                      name="DOB"
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      placeholderText="dd/MM/yyyy"
                      dateFormat={"dd/MM/yyyy"}
                      wrapperClassName="date-picker"
                      className="shad-input rounded-md p-4 text-sm"
                    />

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 text-md font-medium">Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full md:w-[75%] shad-select-trigger">
                        <SelectValue placeholder="select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="shad-select-content">
                      <SelectItem className="shad-select-item" value={Gender.MALE}>Male</SelectItem>
                      <SelectItem className="shad-select-item" value={Gender.FEMALE}>FEMALE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space_buttons">
              <div>
                <Button variant={"outline"} type="button" onClick={onBack} className="bg-slate-800 hover:bg-slate-700 text-white hover:text-white">
                  <Link href="/sign-up">Back</Link>
                </Button>
              </div>
              <div>
                <Button disabled={isSubmitting} type="submit" className="border bg-white hover:bg-white text-gray-800 border-gray-600  hover:border-gray-800  ">
                  {isSubmitting ? (
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
          src="/image/progress.svg"
          alt="right-side"
          width={300}
          height={300}
          className="auto"
          priority
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
