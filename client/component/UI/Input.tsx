"use client";

import React from "react";
import { Field, ErrorMessage } from "formik";

interface InputProps {
  label?: string;
  value?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  type: string;
  name: string;
  idd?: string;
  autoComplete?: string;
}

const Input = ({ label, name, type, ...rest }: InputProps) => {
  return (
    <div>
      <label htmlFor={name} className="font-main text-base text-dark">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        {...rest}
        className="custome-input"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="input__error"
      />
    </div>
  );
};

export default Input;
