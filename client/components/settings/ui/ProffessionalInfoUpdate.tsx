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

const ProffessionalInfoUpdate = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [specializationValue, setSpecializationValue] = useState("");
  const [educationValue, setEducationValue] = useState("");

  const ProfessionalInitialValues = {
    institution: "",
    educationValue,
    specializationValue,
    graduationYear: "",
    license: "1231122133",
    experiance: "",
    consultationFee: "",
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };

  const handleProffestionalInfo = (values: any, { setSubmitting }: any) => {
    console.log(values, specializationValue, educationValue);
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
        {({ isValid, isSubmitting }) => (
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
          </Form>
        )}
      </Formik>
    </CardContent>
  );
};

export default ProffessionalInfoUpdate;
