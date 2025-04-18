import React from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: React.FC<CheckboxProps> = ({
  className = "",
  ...props
}) => {
  return (
    <input
      type="checkbox"
      className={`w-4 h-4 rounded-sm text-purple-600 focus:ring-purple-500 bg-[#2a2a2a] border-gray-600 ${className}`}
      {...props}
    />
  );
};
