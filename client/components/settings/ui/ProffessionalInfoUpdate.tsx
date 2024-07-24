import React, { useState } from "react";
import { Formik, Form } from "formik";
import { validateProffessionalEditInfo } from "@/utils/validationSchema";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import EducationPopover from "@/components/form/popOver/EducationPopover";
import SpecializationPopover from "@/components/form/popOver/SpecializationPopover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { UPDATE_USER } from "@/graphql/mutations/userMutations";
import { useMutation } from "@apollo/client";

const ProffessionalInfoUpdate = () => {
  const { user } = useAuth();
  const EducationalBackground = JSON.parse(user?.EducationalBackground || "{}")
  const { toast } = useToast();
  const [specializationValue, setSpecializationValue] = useState(EducationalBackground.Specialization || "");
  const [educationValue, setEducationValue] = useState(EducationalBackground.Degree || "");

  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER)

  const ProfessionalInitialValues = {
    institution: EducationalBackground.Institution,
    educationValue,
    specializationValue: EducationalBackground?.Specialization,
    graduationYear: EducationalBackground.GraduationYear,
    license: user?.LicenseNumber.toString(),
    experiance: user?.ExperienceYears,
    consultationFee: user?.ConsultationFee,
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };

  const handleProffestionalInfo = async (values: any, { setSubmitting }: any) => {
    try {
      await updateUser({
        variables: {
          updateUserInput: {
            UserID: user?.UserID,
            DoctorDetails: {
              Speciality: specializationValue,
              LicenseNumber: values.license,
              ExperienceYears: values.experiance,
              ConsultationFee: parseFloat(values.consultationFee),
              EducationalBackground: {
                Institution: values.institution,
                Degree: educationValue,
                Specialization: specializationValue,
                GraduationYear: values.graduationYear
              }
            }
          }
        }
      })
      toast({
        title: "Information Updated",
        variant: "success",
        description: "Your information has been updated successfully",
      });
      setSubmitting(false);
    } catch (error) {
      toast({
        title: "Information Updated",
        variant: "error",
        description: "Failed to update",
      });
      setSubmitting(false);

    }
    // values.consultationFee
    // values.educationValue = educationValue
    // values.specializationValue = specializationValue
    // values.experiance
    // values.graduationYear
    // values.institution
    // values.license

    setSubmitting(false);
  };

  return (
    <CardContent className="space-y-2">
      <Formik
        initialValues={ProfessionalInitialValues}
        onSubmit={handleProffestionalInfo}
        validationSchema={validateProffessionalEditInfo}
      >
        {({ isValid, isSubmitting, resetForm }) => (
          <Form className="space-y-6" action="#" method="POST">
            <div>
              {/* institution */}
              <div className="mt-3">
                <Input
                  name="institution"
                  type="text"
                  placeholder="Academic Institution"
                  label="Academic Institution"
                  className="max-w-xs"
                />
              </div>
              <div className="flex space-x-5 flex-wrap">
                {/* Educational qualification/Degree */}
                <div className="mt-3 flex items-start flex-col">
                  <label className="text-sm font-medium">
                    Education Qualification
                  </label>
                  <EducationPopover
                    educationValue={educationValue}
                    setEducationValue={setEducationValue}
                  />
                </div>
                {/* specialization form */}
                <div className="mt-3 flex items-start flex-col">
                  <label className="text-sm font-medium">Specialization</label>
                  <SpecializationPopover
                    specializationValue={specializationValue}
                    setSpecializationValue={setSpecializationValue}
                  />
                </div>
              </div>
              <div className="flex space-x-5 flex-wrap">
                {/*  Graduation Year */}
                <div className="mt-3">
                  <Input
                    name="graduationYear"
                    type="number"
                    onKeyDown={handleKeyDown}
                    placeholder="Graduation Year"
                    label="Graduation year"
                  />
                </div>
                {/* license */}
                <div className="mt-3">
                  <Input
                    name="license"
                    type="number"
                    onKeyDown={handleKeyDown}
                    placeholder="License Number"
                    label="License Number"
                  />
                </div>
              </div>
              <div className="flex space-x-5 flex-wrap">
                {/* experiance */}
                <div className="mt-3">
                  <Input
                    name="experiance"
                    type="number"
                    onKeyDown={handleKeyDown}
                    placeholder="Experiance Year"
                    label="Experiance Year"
                  />
                </div>
                {/* consultation fee */}
                <div className="mt-3">
                  <Input
                    name="consultationFee"
                    type="number"
                    onKeyDown={handleKeyDown}
                    placeholder="Charge(per Hour)"
                    label="Consultation Charge"
                  />
                </div>
              </div>
            </div>

            <Button disabled={!isValid} type="submit">
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                ""
              )}
              Save info
            </Button>
            <Button className="ml-2" type="button" onClick={() => resetForm()}>
              Reset
            </Button>
          </Form>
        )}
      </Formik>
    </CardContent>
  );
};

export default ProffessionalInfoUpdate;
