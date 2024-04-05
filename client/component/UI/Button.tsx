import React from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  disabled?: boolean;
  variant?: "secondary" | "danger";
  children: React.ReactNode;
}

const Button = ({
  onClick,
  type,
  className,
  disabled,
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
