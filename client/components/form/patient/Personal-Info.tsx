
import Image from "next/image";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUserStore from "@/store/userStore";
import { FormFieldTypes, Gender, UserType } from "@/types/types";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { SelectItem } from "@/components/ui/select";
import CustomFormField from "@/components/shared/CustomeFormField";
import FormButton from "@/components/shared/FormButton";
import Link from "next/link";
import { personalInfoSchema } from "@/utils/validationSchema";




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

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user ? user.FirstName : "",
      lastName: user ? user.LastName : "",
      DOB: storedValues?.DOB ? new Date(storedValues?.DOB) : new Date(),
      gender: storedValues?.gender ? storedValues?.gender : undefined,
      role: UserType.PATIENT
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)


  const onSubmit = async (values: z.infer<typeof personalInfoSchema>) => {

    setIsSubmitting(true)

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
              <CustomFormField
                control={form.control}
                label="Legal First name"
                name="firstName"
                placeholder="Enter your first name"
                fieldType={FormFieldTypes.INPUT}
              />
              <CustomFormField
                control={form.control}
                label="Legal Last name"
                name="lastName"
                placeholder="Enter your last name"
                fieldType={FormFieldTypes.INPUT}
              />
            </div>
            {/* Date of Birth */}
            <CustomFormField
              control={form.control}
              label="Date of Birth"
              name="DOB"
              fieldType={FormFieldTypes.DATE_PICKER}
            />

            <CustomFormField
              control={form.control}
              label="Gender"
              name="gender"
              placeholder="select gender"
              fieldType={FormFieldTypes.SELECT}
            >
              <>
                <SelectItem className="shad-select-item" value={Gender.MALE}>Male</SelectItem>
                <SelectItem className="shad-select-item" value={Gender.FEMALE}>FEMALE</SelectItem>
              </>
            </CustomFormField>
            <FormButton Next="Next" onBack={onBack} disabled={isSubmitting}>
              <Link href="/sign-up">Back</Link>
            </FormButton>
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
