import React from 'react';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'secondary' | 'danger';
  children: React.ReactNode;
}

const Button = ({ onClick, className, disabled, children } : ButtonProps) => {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
