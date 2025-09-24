import React from "react";

export const Card = ({ children, className = "" }) => {
  // Base styles for all cards
  const baseCardStyles = "p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-md";

  return (
    // Corrected Syntax: Using a template literal with backticks ``
    <div className={`${baseCardStyles} ${className}`}>
      {children}
    </div>
  );
};
