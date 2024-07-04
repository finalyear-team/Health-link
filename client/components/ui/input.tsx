import * as React from "react";
import { Field, ErrorMessage } from "formik";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "./button";

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
  accept?: string;
  showError?: boolean;
  optional?: boolean;
  onChange?: (even: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, optional, className, name, type, ...rest }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };

    return (
      <div>
        {type === "checkbox" ? (
          <Field id={name} name={name} type={type} {...rest} />
        ) : null}
        <label
          htmlFor={name}
          className="font-main text-sm text-dark-700 dark:text-slate-50 font-medium"
        >
          {label ? (
            <div>
              {label}{" "}
              {optional ? (
                <span>(optional) </span>
              ) : (
                <span className="text-sm text-red-600"> * </span>
              )}
            </div>
          ) : (
            ""
          )}
        </label>

        {type !== "checkbox" ? (
          <div className="relative">
            <Field
              id={name}
              name={name}
              type={showPassword ? "text" : type}
              {...rest}
              className={cn(
                "flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus:ring-primary-600 focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
                className
              )}
            />
            {type === "password" && (
              <Button
                type="button"
                variant={"empty"}
                size={"icon"}
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        ) : null}
        <ErrorMessage name={name} component="div" className="input__error" />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
