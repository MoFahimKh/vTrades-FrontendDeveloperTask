import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className = "",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-[#8854C0] text-white hover:bg-purple-700",
    outline: "border border-gray-600 text-white hover:bg-gray-800",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className} bg-[#8854C0]`}
      {...props}
    />
  );
};
