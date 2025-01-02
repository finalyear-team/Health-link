"use client"
import Image from "next/image";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSubmit } from "@/hooks/useSubmit";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form";
import { useState } from "react";
import CustomFormField from "@/components/shared/CustomeFormField";
import { FormFieldTypes } from "@/types/types";
import FormButton from "@/components/shared/FormButton";
import VerifyAccount from "@/components/layout/VerifyAccount";

export const MedicalInfoSchema = z
  .object({
    CurrentMedication: z.string().optional(),

    Allergies: z.string().optional(),

    FamilyMedicalHistory: z.string().optional(),

    PastMedicalHistory: z.string().optional(),

    MedicalInfoConsent: z.boolean().optional(),

    PrivacyPolicyConsent: z.boolean().refine((val) => val === true, {
      message: "You must agree to the privacy policy.",
    }),

  })


const AdditionalInfo = ({ onBack }: { onBack: () => void }) => {
  const [storedValues, setStoredValues] = useLocalStorage(
    "patient_additionalInfo",
    {
      CurrentMedication: "",
      Allergies: "",
      FamilyMedicalHistory: "",
      PastMedicalHistory: "",
      MedicalInfoConsent: false,
      PrivacyPolicyConsent: false
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof MedicalInfoSchema>>({
    resolver: zodResolver(MedicalInfoSchema),
    defaultValues: {
      CurrentMedication: storedValues.CurrentMedication ? storedValues.CurrentMedication : "",
      Allergies: storedValues.Allergies ? storedValues.Allergies : "",
      FamilyMedicalHistory: storedValues.FamilyMedicalHistory ? storedValues.FamilyMedicalHistory : "",
      PastMedicalHistory: storedValues.PastMedicalHistory ? storedValues.PastMedicalHistory : "",
      MedicalInfoConsent: false,
      PrivacyPolicyConsent: false,
    },
  })


  const {
    handleSubmit,
    error: submitError,
    pendingVerification,
    completed,
  } = useSubmit(setStoredValues, "patient", setIsSubmitting);

  return (
    <>
    
        <div className="w-full mt-5 flex flex-col lg:flex-row items-center justify-center lg:space-x-8 p-4">
          {submitError &&
            <p className="text-center text-red-500">{submitError}</p>
          }
          <div className="min-w-[50%] border rounded-lg p-8 ">
            <h2 className="text-base font-bold text-primary-600">
              Medical information
            </h2>
            <Form  {...form}>
              <form className="w-full mt-8 space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex flex-col lg:flex-row gap-4 ">

                  <CustomFormField
                    control={form.control}
                    label="Current Medication (if any)"
                    name="CurrentMedication"
                    placeholder=""
                    fieldType={FormFieldTypes.TEXTAREA}
                    className="w-full md:w-[75%]"
                  />
                  <CustomFormField
                    control={form.control}
                    label="Allergies (if any)"
                    name="Allergies"
                    placeholder=""
                    fieldType={FormFieldTypes.TEXTAREA}
                    className="w-full md:w-[75%]"
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-4 ">
                  <CustomFormField
                    control={form.control}
                    label="Family Medical History"
                    name="FamilyMedicalHistory"
                    placeholder=""
                    fieldType={FormFieldTypes.TEXTAREA}
                    className="w-full md:w-[75%]"
                  />
                  <CustomFormField
                    control={form.control}
                    label="Past Medical History"
                    name="PastMedicalHistory"
                    placeholder=""
                    fieldType={FormFieldTypes.TEXTAREA}
                    className="w-full md:w-[75%]"
                  />
                </div>

                <CustomFormField
                  control={form.control}
                  label="By checking this box, I consent to the sharing of my medical information with Health-Link providers to facilitate healthcare services."
                  name="MedicalInfoConsent"
                  placeholder=""
                  fieldType={FormFieldTypes.CHECKBOX}
                  className="w-full md:w-[75%]"
                />
                <CustomFormField
                  control={form.control}
                  label="I agree to the privacy policy."
                  name="PrivacyPolicyConsent"
                  fieldType={FormFieldTypes.CHECKBOX}
                  className="w-full md:w-[75%]"
                />

                <div className="py-4">
                  {submitError && (
                    <p className="text-xs text-red-600">{submitError}</p>
                  )}
                </div>
                <FormButton onBack={onBack} Next="Finish" disabled={completed || isSubmitting} />
              </form>
            </Form>
          </div>
          <div className="">
            <Image
              src="/image/professional_information.svg"
              alt="right-side"
              width={300}
              height={300}
              className="auto"
            />
          </div>
        </div>

     
    </>
  );
};

export default AdditionalInfo;
