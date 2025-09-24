import React from "react";

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  // Base styles that apply to all buttons
  const baseStyles = "px-6 py-3 font-semibold rounded-xl shadow transition";

  // Different styles for each button variant
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-yellow-400 text-green-900 hover:bg-yellow-500",
    outline:
      "border border-white text-white hover:bg-white hover:text-green-700",
  };

  // Select the correct variant style, defaulting to 'primary'
  const variantStyles = variants[variant] || variants.primary;

  return (
    <button
      // Corrected Syntax: Using a template literal with backticks ``
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
