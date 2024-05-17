// // GenderSelect.tsx
// import React from 'react';

// const GenderSelect = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary-600"
//     >
//       <option value="">Select Gender</option>
//       <option value="male">Male</option>
//       <option value="female">Female</option>
//     </select>
//   );
// };

// export default GenderSelect;

import React from "react";
import { Field, ErrorMessage } from "formik";

interface GenderSelectorProps {
  label?: string;
  name: string;
}

const GenderSelect = ({ label, name }: GenderSelectorProps) => {
  return (
    <div>
      <label htmlFor={name} className="font-main text-sm text-dark-700 font-medium">
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
