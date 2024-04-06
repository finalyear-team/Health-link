import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface InputProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  type: string;
  name: string;
  id: string;
  autoComplete?: string;
}

const Input = ({
  id,
  type,
  name,
  value,
  onChange,
  className,
  disabled,
  placeholder,
  autoComplete,
}: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      autoComplete={autoComplete}
      onChange={handleChange}
      disabled={disabled}
      className={`custom-input ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
