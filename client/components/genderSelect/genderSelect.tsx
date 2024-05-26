import React from "react";
import { Field, ErrorMessage } from "formik";

interface GenderSelectorProps {
  label?: string;
  name: string;
}

const GenderSelect = ({ label, name }: GenderSelectorProps) => {
  return (
    <div>
      <label htmlFor={name} className="font-main text-sm text-dark-700 dark:text-slate-50 font-medium">
        {label}
      </label>
      <Field as="select" id={name} name={name} className="custome-input text-dark-300 text-sm">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Field>
      <ErrorMessage name={name} component="div" className="input__error" />
    </div>
  );
};

export default GenderSelect;
